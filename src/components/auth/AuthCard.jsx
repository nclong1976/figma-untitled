import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { toast } from "@/components/ui/use-toast";
import { safeReturnTo } from "@/lib/authReturnTo";
import {
  Eye, EyeOff, Loader2, Lock, User, Shield, ArrowLeft, X, Headphones, Gem,
} from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

// --- validators ---
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
const isPhone = (v) => /^[0-9]{6,15}$/.test(v || "");
const isUsername = (v) => /^[A-Za-z0-9]{6,20}$/.test(v || "");
const isValidAccount = (v) => isUsername(v) || isEmail(v) || isPhone(v);
const isAlnum = (v) => /^[A-Za-z0-9]{8,16}$/.test(v || "");
// SDK yêu cầu email để tạo Auth User → tự tạo email ảo khi người dùng nhập username/phone
const emailForSdk = (account) => (isEmail(account) ? account : `${account}@app.internal`);

function genCaptcha() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function WhiteField({ icon: Icon, type = "text", value, onChange, placeholder, right, autoComplete, id }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9a9a]" />
      <input
        id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete}
        className="w-full h-12 pl-11 pr-10 rounded-xl bg-white text-[#222] placeholder:text-[#a0a0a0] text-sm outline-none focus:ring-2 focus:ring-[#ff4d4f]/40"
      />
      {right}
    </div>
  );
}

function Helper({ ok, err, children }) {
  return <p className={`text-[11px] mt-1.5 px-1 ${err ? "text-[#ff8a8a]" : "text-white/40"}`}>{err || children}</p>;
}

function CTA({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full h-12 rounded-xl bg-[#ff4d4f] text-white font-bold text-[15px] shadow-[0_8px_24px_rgba(255,77,79,0.35)] active:scale-[0.98] transition-transform disabled:opacity-60 flex items-center justify-center"
    >
      {children}
    </button>
  );
}

function Shell({ children, onBack, title }) {
  const navigate = useNavigate();
  return (
    <main className="max-w-[480px] w-full mx-auto min-h-[100dvh] relative overflow-hidden bg-[#0f1225] flex flex-col font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_18%_8%,rgba(124,159,255,0.18),transparent_40%),radial-gradient(circle_at_85%_15%,rgba(255,215,0,0.10),transparent_42%),radial-gradient(circle_at_50%_95%,rgba(124,255,203,0.10),transparent_45%)]" />
      <div className="relative z-20 h-14 flex items-center px-4">
        {onBack ? (
          <button onClick={onBack} className="p-1.5 text-white/70 hover:text-white"><ArrowLeft className="w-5 h-5" /></button>
        ) : <span className="w-8" />}
        {title && <p className="absolute left-1/2 -translate-x-1/2 text-white font-semibold text-sm">{title}</p>}
        <button onClick={() => navigate("/")} className="ml-auto p-1.5 text-white/70 hover:text-white"><X className="w-5 h-5" /></button>
      </div>
      <div className="relative z-10 flex-1 flex flex-col px-5 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-4">
        {children}
      </div>
    </main>
  );
}

function Brand() {
  return (
    <div className="flex flex-col items-center text-center mt-1">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FF8A00] flex items-center justify-center shadow-[0_6px_20px_rgba(255,165,0,0.4)]">
        <Gem className="w-6 h-6 text-[#1a1300]" />
      </div>
      <h1 className="text-2xl font-bold mt-2 bg-gradient-to-r from-[#FFD700] to-[#FFC56c] bg-clip-text text-transparent tracking-wide">Sands</h1>
    </div>
  );
}

function Tabs({ mode }) {
  const navigate = useNavigate();
  const tabs = [
    { id: "login", label: "Đăng nhập tài khoản", path: "/login" },
    { id: "register", label: "Đăng ký tài khoản", path: "/register" },
  ];
  return (
    <div className="mt-5 flex border-b border-white/10">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => navigate(t.path)}
          className={`flex-1 pb-2.5 text-[13px] font-medium transition-colors relative ${mode === t.id ? "text-white" : "text-white/45 hover:text-white/70"}`}
        >
          {t.label}
          {mode === t.id && <span className="absolute left-1/2 -translate-x-1/2 bottom-[-1px] w-10 h-[3px] rounded-full bg-[#ff4d4f]" />}
        </button>
      ))}
    </div>
  );
}

function LanguageLinks() {
  const langs = ["Vietnam", "中文", "繁體", "日本語", "Русский", "English", "Malay"];
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-4">
      {langs.map((l, i) => (
        <button key={l} className={`text-[11px] ${i === 0 ? "text-[#FFD700]" : "text-white/45 hover:text-white"}`}>{l}</button>
      ))}
    </div>
  );
}

function MarinaFooter() {
  return (
    <img
      src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/e57f331cd_708f7e507_e87283081c2ffaf4802a737a4f6e0a1d686d3b3c.png"
      alt=""
      className="w-full h-32 object-cover rounded-2xl mt-5 opacity-90"
    />
  );
}

function SupportFab({ onClick }) {
  return (
    <button onClick={onClick} className="fixed bottom-5 right-5 z-30 w-12 h-12 rounded-full bg-gradient-to-br from-[#ff8a3d] to-[#ff5722] flex items-center justify-center shadow-[0_6px_20px_rgba(255,87,34,0.45)] active:scale-95 transition-transform">
      <Headphones className="w-5 h-5 text-white" />
    </button>
  );
}

export default function AuthCard({ mode = "login" }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  // sign-in
  const [liAccount, setLiAccount] = useState("");
  const [liPw, setLiPw] = useState("");
  const [liErr, setLiErr] = useState({});

  // sign-up (Tên tài khoản / Số điện thoại / Email)
  const [suAccount, setSuAccount] = useState("");
  const [suPw, setSuPw] = useState("");
  const [suPw2, setSuPw2] = useState("");
  const [suTxPw, setSuTxPw] = useState("");
  const [captcha, setCaptcha] = useState(genCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [agree, setAgree] = useState(false);
  const [suErr, setSuErr] = useState({});

  // OTP verification step
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const returnTo = safeReturnTo();

  // ---- handleLogin (Role-Based Routing) ----
  const submitLogin = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!isValidAccount(liAccount)) errs.account = "Vui lòng nhập tên tài khoản hợp lệ";
    if (!liPw) errs.password = "Vui lòng nhập mật khẩu";
    setLiErr(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(emailForSdk(liAccount), liPw);
      let role = "user";
      try { const me = await base44.auth.me(); role = me?.role || "user"; } catch { /* ignore */ }
      // Role-Based Routing: admin → /admin, user → /
      window.location.href = role === "admin" ? "/admin" : returnTo;
    } catch (err) {
      toast({ title: "Đăng nhập thất bại", description: err.message || "Email hoặc mật khẩu không đúng", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // ---- handleSignup ----
  const validateSignup = () => {
    const errs = {};
    if (!isValidAccount(suAccount)) errs.account = "Tên tài khoản 6–20 chữ cái/số (hoặc email/SĐT)";
    if (!isAlnum(suPw)) errs.password = "Mật khẩu 8–16 chữ cái và số";
    if (suPw !== suPw2) errs.confirm = "Mật khẩu không khớp";
    if (!isAlnum(suTxPw)) errs.tx = "Mật khẩu thanh toán 8–16 chữ cái và số";
    if (captchaInput !== captcha) errs.captcha = "Mã xác nhận không đúng";
    if (!agree) errs.terms = "Vui lòng đồng ý điều khoản";
    return errs;
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    const errs = validateSignup();
    setSuErr(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      const email = emailForSdk(suAccount);
      await base44.auth.register({ email, password: suPw });
      setShowOtp(true);
      toast({ title: "Mã xác nhận đã gửi", description: isEmail(suAccount) ? `Kiểm tra email ${suAccount}` : "Đã gửi mã xác nhận" });
    } catch (err) {
      toast({ title: "Đăng ký thất bại", description: err.message || "Không thể tạo tài khoản", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email: emailForSdk(suAccount), otpCode });
      if (result?.access_token) base44.auth.setToken(result.access_token);
      let role = "user";
      try { const me = await base44.auth.me(); role = me?.role || "user"; } catch { /* ignore */ }
      window.location.href = role === "admin" ? "/admin" : returnTo;
    } catch (err) {
      toast({ title: "Xác minh thất bại", description: err.message || "Mã không hợp lệ", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      await base44.auth.resendOtp(emailForSdk(suAccount));
      toast({ title: "Đã gửi lại mã", description: "Kiểm tra email của bạn" });
    } catch (err) {
      toast({ title: "Không gửi được mã", description: err.message, variant: "destructive" });
    }
  };

  const EyeToggle = ({ show, onToggle }) => (
    <button type="button" onClick={onToggle} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9a9a9a] hover:text-[#222]" aria-label="Hiện mật khẩu">
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  const onSupport = () => toast({ title: "Hỗ trợ 24/7", description: "Vui lòng đăng nhập để chat với CSKH." });

  // ---- OTP verification step ----
  if (showOtp) {
    return (
      <>
        <Shell>
          <Brand />
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-5 mt-6">
            <h2 className="text-white font-bold text-lg">Xác minh email</h2>
            <p className="text-white/55 text-[13px] mt-1">Mã đã gửi tới <span className="text-[#FFD700]">{isEmail(suAccount) ? suAccount : emailForSdk(suAccount)}</span></p>
            <div className="flex justify-center my-5">
              <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} autoFocus autoComplete="one-time-code">
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} className="border-white/20 bg-white/5 text-white" />)}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <CTA onClick={verifyOtp} disabled={loading || otpCode.length < 6}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Xác nhận
            </CTA>
            <p className="text-center text-white/55 text-[12px] mt-4">
              Không nhận được mã?{" "}
              <button onClick={resendOtp} className="text-[#FFD700] font-medium hover:underline">Gửi lại</button>
            </p>
          </div>
        </Shell>
        <SupportFab onClick={onSupport} />
      </>
    );
  }

  if (mode === "register") {
    return (
      <>
        <Shell onBack={() => navigate("/login")} title="Đăng ký miễn phí">
          <Tabs mode={mode} />
          <form onSubmit={submitSignup} className="mt-5 space-y-3">
            <div>
              <WhiteField id="su-account" icon={User} value={suAccount} onChange={(e) => setSuAccount(e.target.value)} placeholder="Tên tài khoản / SĐT / Email" autoComplete="username" />
              <Helper err={suErr.account}>Tên tài khoản 6–20 chữ cái và số (không ký tự đặc biệt)</Helper>
            </div>
            <div>
              <WhiteField id="su-pw" icon={Lock} type={showPw ? "text" : "password"} value={suPw} onChange={(e) => setSuPw(e.target.value)} placeholder="Nhập mật khẩu" autoComplete="new-password" right={<EyeToggle show={showPw} onToggle={() => setShowPw(!showPw)} />} />
              <Helper err={suErr.password}>Vui lòng nhập tổ hợp chữ cái và số từ 8 đến 16 chữ số</Helper>
            </div>
            <div>
              <WhiteField id="su-pw2" icon={Lock} type={showPw2 ? "text" : "password"} value={suPw2} onChange={(e) => setSuPw2(e.target.value)} placeholder="Vui lòng nhập lại mật khẩu" autoComplete="new-password" right={<EyeToggle show={showPw2} onToggle={() => setShowPw2(!showPw2)} />} />
              <Helper err={suErr.confirm}>Vui lòng nhập tổ hợp chữ cái và số từ 8 đến 16 chữ số</Helper>
            </div>
            <div>
              <WhiteField id="su-tx" icon={Lock} type="password" value={suTxPw} onChange={(e) => setSuTxPw(e.target.value)} placeholder="Đặt mật khẩu thanh toán" />
              <Helper err={suErr.tx}>Vui lòng nhập tổ hợp chữ cái và số từ 8 đến 16 chữ số</Helper>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <WhiteField id="su-cap" icon={Shield} value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} placeholder="Vui lòng nhập CAPTCHA" />
              </div>
              <button type="button" onClick={() => setCaptcha(genCaptcha())} title="Đổi mã" className="h-12 w-28 rounded-xl bg-white flex items-center justify-center gap-1 select-none shrink-0">
                {captcha.split("").map((d, i) => (
                  <span key={i} className="text-lg font-bold" style={{ transform: `rotate(${(i % 2 ? 1 : -1) * 9}deg)`, color: `hsl(${i * 47} 45% 35%)`, fontFamily: "monospace" }}>{d}</span>
                ))}
              </button>
            </div>
            {suErr.captcha && <p className="text-[11px] text-[#ff8a8a] px-1">{suErr.captcha}</p>}

            <label className="flex items-start gap-2 text-[12px] text-white/70 pt-1">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-[#ff4d4f] w-4 h-4 rounded shrink-0" />
              <span>Tôi trên 18 tuổi và đồng ý chấp nhận <span className="text-[#3399ff]">Điều khoản đăng ký</span></span>
            </label>
            {suErr.terms && <p className="text-[11px] text-[#ff8a8a] px-1 -mt-1">{suErr.terms}</p>}

            <CTA type="submit" disabled={loading} className="mt-1">
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Đăng ký ngay
            </CTA>
          </form>
        </Shell>
        <SupportFab onClick={onSupport} />
      </>
    );
  }

  // ---- login ----
  return (
    <>
      <Shell>
        <Brand />
        <Tabs mode={mode} />
        <form onSubmit={submitLogin} className="mt-6 space-y-3">
          <div>
            <WhiteField id="li-account" icon={User} type="text" value={liAccount} onChange={(e) => setLiAccount(e.target.value)} placeholder="Tên tài khoản / SĐT / Email" autoComplete="username" />
            {liErr.account && <p className="text-[11px] text-[#ff8a8a] mt-1.5 px-1">{liErr.account}</p>}
          </div>
          <div>
            <WhiteField id="li-pw" icon={Lock} type={showPw ? "text" : "password"} value={liPw} onChange={(e) => setLiPw(e.target.value)} placeholder="Nhập mật khẩu" autoComplete="current-password" right={<EyeToggle show={showPw} onToggle={() => setShowPw(!showPw)} />} />
            {liErr.password && <p className="text-[11px] text-[#ff8a8a] mt-1.5 px-1">{liErr.password}</p>}
          </div>
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-[12px] text-[#3399ff] hover:underline">Quên mật khẩu?</Link>
          </div>
          <CTA type="submit" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Đăng nhập
          </CTA>
        </form>

        <LanguageLinks />
        <MarinaFooter />
      </Shell>
      <SupportFab onClick={onSupport} />
    </>
  );
}