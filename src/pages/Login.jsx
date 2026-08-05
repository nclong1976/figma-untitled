import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { toast } from "@/components/ui/use-toast";
import { safeReturnTo } from "@/lib/authReturnTo";

// Ánh xạ tài khoản đăng nhập → email SDK.
// Bỏ qua kiểm tra định dạng Gmail / OTP: tài khoản admin (admin, admin1) → email admin thật,
// các tài khoản khác tự sinh email ảo (không yêu cầu OTP).
const emailForSdk = (account) => {
  const v = (account || "").trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return v;
  const lower = v.toLowerCase();
  if (lower === "admin" || lower === "admin1") return "admin1@sand.com";
  return `${v}@app.internal`;
};

export default function Login() {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const returnTo = safeReturnTo();

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(emailForSdk(account), password);
      let role = "user";
      try { const me = await base44.auth.me(); role = me?.role || "user"; } catch { /* ignore */ }
      // Role-Based Routing: admin → /admin, user → /
      window.location.href = role === "admin" ? "/admin" : returnTo;
    } catch (err) {
      toast({ title: "Đăng nhập thất bại", description: err.message || "Tài khoản hoặc mật khẩu không đúng", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-[522px] w-full mx-auto relative min-h-[100dvh] bg-figma-secondary-3 overflow-clip flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/a1e41f56e_8e57852e5_bbfe3ea5762a00d0bb1b98d9859463bbeecc46eb.png"
          className="w-full h-full object-cover object-center"
          alt="Background" />
      </div>

      {/* Close Button */}
      <button onClick={() => navigate("/")} className="absolute top-[23px] right-[37px] z-50 w-[26px] h-[27px] hover:opacity-80 transition-opacity">
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/75d035fb2_18e996b2e_64090f98cf035c5f5975ac0c7f8e2362ce58829b.png"
          className="w-full h-full object-cover"
          alt="Close" />
      </button>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-[clamp(22px,17.2vw,90px)] mx-auto w-[160px] h-[98px] relative z-10">
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/5f910c917_a00955335_c67e9b462e30a2799bc999ea206489547cc5fcae.png"
          className="w-full h-full object-cover"
          alt="Logo" />
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-[clamp(29px,22.2vw,116px)] w-full max-w-[253px] mx-auto flex justify-between relative z-10">
        <div onClick={() => {}} className="flex flex-col items-center w-[138px] shrink-0 gap-[3px] cursor-pointer">
          <p className="text-figma-21 font-normal font-paragraph leading-figma-29 text-[#b73e42]">Đăng Nhập</p>
        </div>
        <div onClick={() => navigate("/register")} className="flex flex-col items-center w-[112px] shrink-0 gap-[5px] cursor-pointer hover:opacity-80 transition-opacity">
          <p className="text-[clamp(14px,4.6vw,24px)] font-normal font-paragraph leading-[1.1667] text-[#c3c5cb]">Đăng Ký</p>
        </div>

        {/* Underlines */}
        <div className="absolute top-[70px] left-[4px] flex items-end pointer-events-none">
          <img
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/acd084a13_16a80644a_407fafb2a75746391b05e5fab7d65b8b52c934b6.png"
            className="w-[105px] h-[3px] object-cover"
            alt="" />
          <img
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/af1915759_8c114ce02_5b1e95bd73877137432205202ba0d599834eb753.png"
            className="w-[160px] h-1.5 object-cover"
            alt="" />
        </div>
      </motion.div>

      {/* Form */}
      <form onSubmit={submit} className="mt-[clamp(16px,6.9vw,36px)] w-[calc(100%-32px)] max-w-[444px] mx-auto flex flex-col gap-[clamp(16px,6.1vw,32px)] relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-figma-primary-2 rounded-[27px] shadow-[inset_0_0_0_2px_#b8b4b9] w-full h-[61px] flex items-center px-[31px] gap-[20px] focus-within:shadow-[inset_0_0_0_2px_#b73e42] transition-shadow">
          <img
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/0275c983d_f1d7826e6_1289de38208ea60c36c32778edfbdb4094cfc6d9.png"
            className="w-[22px] h-[26px] object-cover shrink-0"
            alt="User" />
          <input
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="Nhập tên tài khoản"
            autoComplete="username"
            className="bg-transparent outline-none w-full text-figma-21 font-normal font-paragraph leading-figma-28 text-white placeholder:text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-figma-primary-2 rounded-[27px] shadow-[inset_0_0_0_1px_#bcb9be] w-full h-[61px] flex items-center px-[31px] gap-[20px] focus-within:shadow-[inset_0_0_0_2px_#b73e42] transition-shadow">
          <img
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/f72ff3113_aba98cb86_11373047ec794e8892e07f1f381f23dba7139b01.png"
            className="w-[24px] h-[25px] object-cover shrink-0"
            alt="Password" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            autoComplete="current-password"
            className="bg-transparent outline-none w-full text-figma-21 font-normal font-paragraph leading-figma-28 text-white placeholder:text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]" />
        </motion.div>

        <motion.button
          type="submit"
          disabled={loading}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-[#fd4441] rounded-[4px_3px_0px_0px] shadow-[inset_0_0_0_1px_#cf7879] w-full h-[59px] flex items-center justify-center hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70">
          <span className="text-[clamp(14px,4.6vw,24px)] font-bold font-paragraph leading-[1.25] text-figma-text-8-7">
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </span>
        </motion.button>
      </form>

      {/* Languages */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-[27px] w-[calc(100%-32px)] max-w-[444px] mx-auto flex flex-wrap justify-center items-center gap-x-[7px] gap-y-[10px] relative z-10">
        <span className="text-figma-21 font-normal font-paragraph leading-figma-23 text-figma-text-3-7 cursor-pointer hover:text-white transition-colors">Vietnam</span>
        <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/b87107527_ca4e13486_6defe463931abcf3d4e5294a4817b4a033b0f8c8.png" className="w-1 h-5 object-cover" alt="" />
        <span className="text-figma-21 font-normal font-figma-noto-sans-sc leading-figma-25 text-figma-text-6-7 cursor-pointer hover:text-white transition-colors">中文</span>
        <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/21d911068_ec9682fa5_0ef4284feeca83779bc06552bed8e66480ba1203.png" className="w-1 h-[21px] object-cover" alt="" />
        <span className="text-figma-21 font-normal font-figma-noto-sans-sc leading-figma-26 text-figma-text-5-7 cursor-pointer hover:text-white transition-colors">繁體</span>
        <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/3141c9624_a4337beaa_45873f4b28e350d46bf2330977174092c97fc6f5.png" className="w-0.5 h-[18px] object-cover" alt="" />
        <span className="text-figma-21 font-normal font-figma-noto-sans-sc leading-figma-26 text-figma-text-4-7 cursor-pointer hover:text-white transition-colors">日本語</span>
        <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/04aa4edec_8a26fbbb1_22ecb10ae6187dbe95fe4a486726143bc6638c0c.png" className="w-[5px] h-5 object-cover" alt="" />
        <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/461ad2675_591423ee2_7f410533dafe5112c7c844169d454afa3e2099cb.png" className="w-[5px] h-5 object-cover" alt="" />
        <span className="text-figma-20 font-medium font-figma-inter leading-figma-26 text-figma-text-3-7 cursor-pointer hover:text-white transition-colors">Русский</span>
        <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/a7e439b39_01ecedd2c_37e7c0302de279d65f7d5c2e90d2361187f9ae96.png" className="w-[5px] h-[21px] object-cover" alt="" />
        <span className="text-figma-21 font-normal font-paragraph leading-figma-26 text-[#5b555a] cursor-pointer hover:text-white transition-colors">English</span>
        <div className="basis-full h-0"></div>
        <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/8d3b9d92a_78365a36c_e3cb690ef6ba4d1ba60c7cc09156fc102f639c6b.png" className="w-0.5 h-[19px] object-cover" alt="" />
        <span className="text-figma-21 font-normal font-paragraph leading-figma-25 text-figma-text-1-7 cursor-pointer hover:text-white transition-colors">Malay</span>
      </motion.div>

      {/* Bottom Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-[28px] w-[calc(100%-32px)] max-w-[444px] mx-auto relative z-10 pb-[17px]">
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/07eeee787_467927617_437516a0b1897435a7fa238c5b66960e3084426a.png"
          className="w-full h-auto object-cover overflow-clip"
          alt="Marina Bay Sands" />
      </motion.div>
    </main>
  );
}