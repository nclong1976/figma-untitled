import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import GoogleIcon from "@/components/GoogleIcon";
import { toast } from "@/components/ui/use-toast";
import { safeReturnTo } from "@/lib/authReturnTo";
import { promoteAdminUser } from "@/functions/promoteAdminUser";
import SupportChat from "@/components/profile/SupportChat";
import { Image } from "@/components/ui/image";
import {
  Eye, EyeOff, Loader2, Mail, Lock, User, KeyRound, Gem, Send, MessageCircle,
  Shield, ChevronLeft, X, Headphones } from
"lucide-react";

// --- validators ---
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
const isStrong = (v) => (v || "").length >= 6;

const fieldCls = "h-12 pl-10 pr-10 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/35 focus-visible:ring-[#ff4d4f]/40 focus-visible:border-[#ff4d4f]/50";
const LANGS = ["Vietnam", "中文", "繁體", "日本語", "Русский", "English", "Malay"];

function Field({ icon: Icon, id, label, type = "text", value, onChange, placeholder, error, helper, right, autoComplete }) {
  return (
    <div className="space-y-1">
      {label && <Label htmlFor={id} className="text-white/70 text-[13px]">{label}</Label>}
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" aria-hidden="true" />
        <Input
          id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
          autoComplete={autoComplete} className={fieldCls} />
        
        {right}
      </div>
      {helper && !error && <p className="text-[11px] text-white/40 pl-1">{helper}</p>}
      {error && <p className="text-[#ff6b6b] text-[11px] pl-1">{error}</p>}
    </div>);

}

export default function AuthCard({ mode = "login" }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(mode);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [remember, setRemember] = useState(true);
  const [lang, setLang] = useState("Vietnam");
  const [supportOpen, setSupportOpen] = useState(false);

  // sign-in
  const [liEmail, setLiEmail] = useState("");
  const [liPw, setLiPw] = useState("");
  const [liErr, setLiErr] = useState({});

  // sign-up
  const [suEmail, setSuEmail] = useState("");
  const [suPw, setSuPw] = useState("");
  const [suPw2, setSuPw2] = useState("");
  const [suPay, setSuPay] = useState("");
  const [captchaCode] = useState(() => String(Math.floor(1000 + Math.random() * 9000)));
  const [suCaptcha, setSuCaptcha] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [suErr, setSuErr] = useState({});

  // OTP step
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const returnTo = safeReturnTo();

  const onGoogle = () => base44.auth.loginWithProvider("google", returnTo);
  const onSoon = () => toast({ title: "Sắp hỗ trợ", description: "Phương thức đăng nhập này sẽ ra mắt soon." });

  // ---- sign in ----
  const submitLogin = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!isEmail(liEmail)) errs.email = "Email không đúng định dạng";
    if (!liPw) errs.password = "Vui lòng nhập mật khẩu";
    setLiErr(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(liEmail, liPw);
      if (remember) localStorage.setItem("rememberLogin", "1");
      let role = "user";
      try {const me = await base44.auth.me();role = me?.role || "user";} catch {/* ignore */}
      if (liEmail === "admin@sand.com" && role !== "admin") {
        try {await promoteAdminUser();role = "admin";} catch {/* ignore */}
      }
      window.location.href = role === "admin" ? "/admin" : returnTo;
    } catch (err) {
      // Test admin: nếu tài khoản admin@sand.com chưa tồn tại, tự khởi tạo + nâng quyền
      if (liEmail === "admin@sand.com" && liPw === "121212") {
        try {
          setSuEmail(liEmail);
          await base44.auth.register({ email: liEmail, password: liPw });
          setShowOtp(true);
          toast({ title: "Khởi tạo tài khoản admin", description: `Mã xác nhận đã gửi tới ${liEmail} — nhập mã để kích hoạt admin` });
        } catch (regErr) {
          toast({ title: "Không thể khởi tạo admin", description: regErr.message || "Tài khoản đã tồn tại với mật khẩu khác", variant: "destructive" });
        }
      } else {
        toast({ title: "Đăng nhập thất bại", description: err.message || "Email hoặc mật khẩu không đúng", variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  // ---- sign up ----
  const validateSignup = () => {
    const errs = {};
    if (!isEmail(suEmail)) errs.email = "Email không đúng định dạng";
    if (!isStrong(suPw)) errs.password = "Mật khẩu tối thiểu 6 ký tự";
    if (suPw !== suPw2) errs.confirm = "Mật khẩu không khớp";
    if (!suPay) errs.pay = "Vui lòng đặt mật khẩu thanh toán";
    if (suCaptcha !== captchaCode) errs.captcha = "Mã CAPTCHA không đúng";
    if (!agreed) errs.terms = "Vui lòng đồng ý điều khoản";
    return errs;
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    const errs = validateSignup();
    setSuErr(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      await base44.auth.register({ email: suEmail, password: suPw });
      setShowOtp(true);
      toast({ title: "Mã xác nhận đã gửi", description: `Kiểm tra email ${suEmail}` });
    } catch (err) {
      toast({ title: "Đăng ký thất bại", description: err.message || "Không thể tạo tài khoản", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email: suEmail, otpCode });
      if (result?.access_token) base44.auth.setToken(result.access_token);
      try {await base44.auth.updateMe({ full_name: suEmail.split("@")[0] });} catch {/* non-critical */}
      let role = "user";
      if (suEmail === "admin@sand.com") {
        try {await promoteAdminUser();role = "admin";} catch {/* non-critical */}
      }
      window.location.href = role === "admin" ? "/admin" : returnTo;
    } catch (err) {
      toast({ title: "Xác minh thất bại", description: err.message || "Mã không hợp lệ", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      await base44.auth.resendOtp(suEmail);
      toast({ title: "Đã gửi lại mã", description: "Kiểm tra email của bạn" });
    } catch (err) {
      toast({ title: "Không gửi được mã", description: err.message, variant: "destructive" });
    }
  };

  const EyeToggle = ({ show, onToggle }) =>
  <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/45 hover:text-white/80" aria-label="Hiện mật khẩu">
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>;


  // ---- OTP step ----
  if (showOtp) {
    return (
      <Shell>
        <Brand />
        <div className="rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md p-5 mt-5">
          <h2 className="text-white font-bold text-lg">Xác minh email</h2>
          <p className="text-white/55 text-[13px] mt-1">Mã đã gửi tới <span className="text-[#ff4d4f]">{suEmail}</span></p>
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
            <button onClick={resendOtp} className="text-[#ff4d4f] font-medium hover:underline">Gửi lại</button>
          </p>
        </div>
        <SupportButton onClick={() => setSupportOpen(true)} />
        <SupportChat open={supportOpen} onOpenChange={setSupportOpen} />
      </Shell>);

  }

  return (
    <Shell>
      {/* Top bar */}
      <div className="flex items-center">
        <button onClick={() => navigate("/")} className="p-1.5 -ml-1.5 rounded-lg hover:bg-white/10"><ChevronLeft className="w-5 h-5 text-white/70" /></button>
        <h1 className={`flex-1 text-center text-white font-semibold text-[16px] ${tab === "register" ? "" : "opacity-0"}`}>Đăng ký miễn phí</h1>
        <button onClick={() => navigate("/")} className="p-1.5 -mr-1.5 rounded-lg hover:bg-white/10"><X className="w-5 h-5 text-white/70" /></button>
      </div>

      <Brand />

      {/* Tabs */}
      <div className="mt-6 flex items-center gap-6 border-b border-white/10">
        {[
        { id: "login", label: "Đăng nhập tài khoản" },
        { id: "register", label: "Đăng ký tài khoản" }].
        map((t) =>
        <button key={t.id} onClick={() => setTab(t.id)} className={`pb-2.5 text-[14px] font-semibold relative transition-colors ${tab === t.id ? "text-white" : "text-white/45"}`}>
            {t.label}
            {tab === t.id && <span className="absolute left-0 right-0 -bottom-px h-[2px] rounded-full bg-[#ff4d4f]" />}
          </button>
        )}
      </div>

      <div className="mt-5">
        {tab === "login" ?
        <form onSubmit={submitLogin} className="space-y-3.5">
            <Field id="li-email" icon={User} type="email" value={liEmail} onChange={(e) => setLiEmail(e.target.value)} placeholder="Nhập tên tài khoản" error={liErr.email} autoComplete="email" helper="Vui lòng nhập email hợp lệ" />
            <Field id="li-pw" icon={Lock} type={showPw ? "text" : "password"} value={liPw} onChange={(e) => setLiPw(e.target.value)} placeholder="Nhập mật khẩu" error={liErr.password} autoComplete="current-password" right={<EyeToggle show={showPw} onToggle={() => setShowPw(!showPw)} />} />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-white/60 text-[12px] cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-[#ff4d4f] w-4 h-4 rounded" />
                Ghi nhớ đăng nhập
              </label>
              <Link to="/forgot-password" className="text-[12px] text-[#ff4d4f] hover:underline">Quên mật khẩu?</Link>
            </div>
            <CTA type="submit" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Đăng nhập
            </CTA>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/35 text-[11px]">hoặc</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <button type="button" onClick={onGoogle} className="w-full h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center gap-2 active:scale-95 transition-transform">
              <GoogleIcon className="w-4 h-4" />
              <span className="text-white/85 text-[13px] font-medium">Tiếp tục với Google</span>
            </button>
          </form> :

        <form onSubmit={submitSignup} className="space-y-3">
            <Field id="su-email" icon={User} type="email" value={suEmail} onChange={(e) => setSuEmail(e.target.value)} placeholder="Nhập tên tài khoản" error={suErr.email} autoComplete="email" helper="Vui lòng nhập 6–20 chữ cái, số hoặc tổ hợp" />
            <Field id="su-pw" icon={Lock} type={showPw ? "text" : "password"} value={suPw} onChange={(e) => setSuPw(e.target.value)} placeholder="Nhập mật khẩu" error={suErr.password} autoComplete="new-password" helper="Vui lòng nhập tổ hợp chữ cái và số từ 6 đến 16 chữ số" right={<EyeToggle show={showPw} onToggle={() => setShowPw(!showPw)} />} />
            <Field id="su-pw2" icon={Lock} type={showPw2 ? "text" : "password"} value={suPw2} onChange={(e) => setSuPw2(e.target.value)} placeholder="Vui lòng nhập lại mật khẩu" error={suErr.confirm} autoComplete="new-password" helper="Vui lòng nhập tổ hợp chữ cái và số từ 6 đến 16 chữ số" right={<EyeToggle show={showPw2} onToggle={() => setShowPw2(!showPw2)} />} />
            <Field id="su-pay" icon={Lock} type={showPay ? "text" : "password"} value={suPay} onChange={(e) => setSuPay(e.target.value)} placeholder="Đặt mật khẩu thanh toán" error={suErr.pay} helper="Vui lòng nhập tổ hợp chữ cái và số từ 6 đến 16 chữ số" right={<EyeToggle show={showPay} onToggle={() => setShowPay(!showPay)} />} />

            {/* Captcha */}
            <div className="space-y-1">
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input value={suCaptcha} onChange={(e) => setSuCaptcha(e.target.value)} placeholder="Vui lòng nhập CAPTCHA" className="h-12 pl-10 pr-28 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/35 focus-visible:ring-[#ff4d4f]/40" />
                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-2 rounded-lg bg-black/70 flex items-center gap-1 select-none">
                  {captchaCode.split("").map((d, i) =>
                <span key={i} className="font-serif text-white text-[15px] font-bold" style={{ transform: `rotate(${(i % 2 ? 1 : -1) * 8}deg)`, color: i % 2 ? "#ffd1d1" : "#fff" }}>{d}</span>
                )}
                </div>
              </div>
              {suErr.captcha && <p className="text-[#ff6b6b] text-[11px] pl-1">{suErr.captcha}</p>}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 cursor-pointer pt-1">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="accent-[#ff4d4f] w-4 h-4 mt-0.5 rounded shrink-0" />
              <span className="text-white/70 text-[12px] leading-snug">
                Tôi trên 18 tuổi và đồng ý chấp nhận{" "}
                <span className="text-[#5b9bff] hover:underline">Điều khoản đăng ký</span>
              </span>
            </label>
            {suErr.terms && <p className="text-[#ff6b6b] text-[11px] pl-6 -mt-2">{suErr.terms}</p>}

            <CTA type="submit" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Đăng ký ngay
            </CTA>
          </form>
        }
      </div>

      {/* Language selector */}
      <div className="mt-auto pt-6">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
          {LANGS.map((l) =>
          <button key={l} onClick={() => setLang(l)} className={`text-[12px] transition-colors ${lang === l ? "text-[#ff4d4f] font-medium" : "text-white/45 hover:text-white/70"}`}>{l}</button>
          )}
        </div>
      </div>

      <SupportButton onClick={() => setSupportOpen(true)} />
      <SupportChat open={supportOpen} onOpenChange={setSupportOpen} />
    </Shell>);

}

function CTA({ children, ...props }) {
  return (
    <button {...props} className="w-full h-12 rounded-xl bg-[#ff4d4f] text-white font-bold text-[15px] shadow-[0_8px_24px_rgba(255,77,79,0.35)] active:scale-[0.98] transition-transform disabled:opacity-60 flex items-center justify-center">
      {children}
    </button>);

}

function SupportButton({ onClick }) {
  return (
    <button onClick={onClick} aria-label="Hỗ trợ" className="fixed right-4 bottom-5 z-30 w-12 h-12 rounded-full bg-gradient-to-br from-[#ff8a3c] to-[#ff4d4f] flex items-center justify-center shadow-[0_8px_24px_rgba(255,77,79,0.45)] active:scale-95 transition-transform">
      <Headphones className="w-6 h-6 text-white" />
    </button>);

}

function Shell({ children }) {
  return (
    <main className="max-w-[480px] w-full mx-auto h-[100dvh] relative overflow-hidden bg-[#0b0e1e] flex flex-col font-sans">
      <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/2d647052e_df779bc59113d334ec43d855e61f1ce5.jpg" alt="" className="absolute inset-0 z-0 w-full h-full object-cover" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0b0e1e]/55 via-[#0b0e1e]/40 to-[#0b0e1e]/85" />

      <div className="relative z-10 flex-1 flex flex-col px-5 py-5 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </main>);
}

function Brand() {
  return (
    <div className="flex flex-col items-center text-center mt-6">
      <div className="w-24 h-24 relative">
        <Image src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/b018f6134_image-Photoroom.png"

        alt="Sands logo"
        fittingType="fit"
        className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]" />
        
      </div>
    </div>);

}