import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import GoogleIcon from "@/components/GoogleIcon";
import { toast } from "@/components/ui/use-toast";
import { safeReturnTo } from "@/lib/authReturnTo";
import {
  Eye, EyeOff, Loader2, Mail, Lock, User, Phone, Gift, KeyRound, Gem, Send, MessageCircle,
} from "lucide-react";

// --- validators ---
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
const isPhone = (v) => /^[0-9+]{10,13}$/.test(v || "");
const isStrong = (v) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(v || "");
const isName = (v) => /^[A-Za-z][A-Za-z0-9 ]{1,}$/.test(v || "");

const fieldCls = "h-12 pl-10 pr-10 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/35 focus-visible:ring-[#FFD700]/60 focus-visible:border-[#FFD700]/40";

function SocialButtons({ onGoogle, onSoon }) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      <button type="button" onClick={onGoogle} className="h-11 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
        <GoogleIcon className="w-4 h-4" />
        <span className="text-white/80 text-[12px] font-medium">Google</span>
      </button>
      <button type="button" onClick={onSoon} className="h-11 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
        <Send className="w-4 h-4 text-[#29A9EA]" />
        <span className="text-white/80 text-[12px] font-medium">Telegram</span>
      </button>
      <button type="button" onClick={onSoon} className="h-11 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
        <MessageCircle className="w-4 h-4 text-[#06C755]" />
        <span className="text-white/80 text-[12px] font-medium">Line</span>
      </button>
    </div>
  );
}

function Field({ icon: Icon, id, label, type = "text", value, onChange, placeholder, error, right, autoComplete }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-white/70 text-[13px]">{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" aria-hidden="true" />
        <Input
          id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
          autoComplete={autoComplete} className={fieldCls}
        />
        {right}
      </div>
      {error && <p className="text-[#ff6b6b] text-[11px] pl-1">{error}</p>}
    </div>
  );
}

export default function AuthCard({ mode = "login" }) {
  const [tab, setTab] = useState(mode); // "login" | "register"
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [remember, setRemember] = useState(true);

  // sign-in
  const [liEmail, setLiEmail] = useState("");
  const [liPw, setLiPw] = useState("");
  const [liErr, setLiErr] = useState({});

  // sign-up
  const [suName, setSuName] = useState("");
  const [suUser, setSuUser] = useState("");
  const [suPhone, setSuPhone] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPw, setSuPw] = useState("");
  const [suPw2, setSuPw2] = useState("");
  const [suRef, setSuRef] = useState("");
  const [suErr, setSuErr] = useState({});

  // OTP step (register)
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
      try { const me = await base44.auth.me(); role = me?.role || "user"; } catch { /* ignore */ }
      window.location.href = role === "admin" ? "/admin" : returnTo;
    } catch (err) {
      toast({ title: "Đăng nhập thất bại", description: err.message || "Email hoặc mật khẩu không đúng", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // ---- sign up ----
  const validateSignup = () => {
    const errs = {};
    if (!isName(suName)) errs.name = "Họ tên chỉ gồm chữ cái không dấu";
    if (!suUser.trim()) errs.username = "Vui lòng nhập tên đăng nhập";
    if (!isPhone(suPhone)) errs.phone = "Số điện thoại không hợp lệ";
    if (!isEmail(suEmail)) errs.email = "Email không đúng định dạng";
    if (!isStrong(suPw)) errs.password = "Mật khẩu ≥ 8 ký tự, gồm chữ, số và ký tự đặc biệt";
    if (suPw !== suPw2) errs.confirm = "Mật khẩu không khớp";
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
      try { await base44.auth.updateMe({ full_name: suName }); } catch { /* non-critical */ }
      window.location.href = returnTo;
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

  const EyeToggle = ({ show, onToggle }) => (
    <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/45 hover:text-white/80" aria-label="Hiện mật khẩu">
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  // ---- OTP step ----
  if (showOtp) {
    return (
      <Shell>
        <Brand />
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-5 mt-5">
          <h2 className="text-white font-bold text-lg">Xác minh email</h2>
          <p className="text-white/55 text-[13px] mt-1">Mã đã gửi tới <span className="text-[#FFD700]">{suEmail}</span></p>
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
    );
  }

  return (
    <Shell>
      <Brand />

      {/* Tab switcher */}
      <div className="mt-6 grid grid-cols-2 p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        {[
          { id: "login", label: "Đăng nhập" },
          { id: "register", label: "Đăng ký" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`h-10 rounded-xl text-[14px] font-semibold transition-all ${
              tab === t.id ? "bg-gradient-to-r from-[#FFD700] to-[#FF8A00] text-[#1a1300] shadow-[0_4px_16px_rgba(255,165,0,0.35)]" : "text-white/55 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-5 mt-4">
        {tab === "login" ? (
          <form onSubmit={submitLogin} className="space-y-4">
            <Field
              id="li-email" label="Email / Số điện thoại" icon={Mail}
              type="email" value={liEmail} onChange={(e) => setLiEmail(e.target.value)}
              placeholder="you@example.com" error={liErr.email} autoComplete="email"
            />
            <Field
              id="li-pw" label="Mật khẩu" icon={Lock}
              type={showPw ? "text" : "password"} value={liPw} onChange={(e) => setLiPw(e.target.value)}
              placeholder="••••••••" error={liErr.password} autoComplete="current-password"
              right={<EyeToggle show={showPw} onToggle={() => setShowPw(!showPw)} />}
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-white/65 text-[12px] cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-[#FFD700] w-4 h-4" />
                Ghi nhớ đăng nhập
              </label>
              <Link to="/forgot-password" className="text-[12px] text-[#FFD700] hover:underline">Quên mật khẩu?</Link>
            </div>
            <CTA type="submit" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Đăng Nhập
            </CTA>
          </form>
        ) : (
          <form onSubmit={submitSignup} className="space-y-3.5">
            <Field id="su-name" label="Họ và tên" icon={User} value={suName} onChange={(e) => setSuName(e.target.value)} placeholder="Nguyen Van A" error={suErr.name} />
            <Field id="su-user" label="Tên đăng nhập" icon={KeyRound} value={suUser} onChange={(e) => setSuUser(e.target.value)} placeholder="nguyenvana" error={suErr.username} />
            <Field id="su-phone" label="Số điện thoại" icon={Phone} value={suPhone} onChange={(e) => setSuPhone(e.target.value)} placeholder="09xxxxxxxx" error={suErr.phone} />
            <Field id="su-email" label="Email" icon={Mail} type="email" value={suEmail} onChange={(e) => setSuEmail(e.target.value)} placeholder="you@example.com" error={suErr.email} autoComplete="email" />
            <Field id="su-pw" label="Mật khẩu" icon={Lock} type={showPw ? "text" : "password"} value={suPw} onChange={(e) => setSuPw(e.target.value)} placeholder="••••••••" error={suErr.password} autoComplete="new-password" right={<EyeToggle show={showPw} onToggle={() => setShowPw(!showPw)} />} />
            <Field id="su-pw2" label="Nhập lại mật khẩu" icon={Lock} type={showPw2 ? "text" : "password"} value={suPw2} onChange={(e) => setSuPw2(e.target.value)} placeholder="••••••••" error={suErr.confirm} autoComplete="new-password" right={<EyeToggle show={showPw2} onToggle={() => setShowPw2(!showPw2)} />} />
            <Field id="su-ref" label="Mã giới thiệu (tuỳ chọn)" icon={Gift} value={suRef} onChange={(e) => setSuRef(e.target.value)} placeholder="ABC123" />
            <CTA type="submit" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Đăng Ký Ngay
            </CTA>
          </form>
        )}
      </div>

      <div className="flex items-center gap-3 mt-5 mb-3">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/40 text-[11px]">hoặc tiếp tục với</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
      <SocialButtons onGoogle={onGoogle} onSoon={onSoon} />
      <p className="text-center text-white/35 text-[11px] mt-5">
        Bằng việc tiếp tục, bạn đồng ý với Điều khoản & Chính sách bảo mật.
      </p>
    </Shell>
  );
}

function CTA({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full h-12 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF8A00] text-[#1a1300] font-bold text-[15px] shadow-[0_8px_24px_rgba(255,165,0,0.35)] active:scale-[0.98] transition-transform disabled:opacity-60 flex items-center justify-center"
    >
      {children}
    </button>
  );
}

function Shell({ children }) {
  return (
    <main className="max-w-[480px] w-full mx-auto h-[100dvh] relative overflow-hidden bg-[#0A0E1A] flex flex-col font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_18%_12%,rgba(124,199,255,0.14),transparent_42%),radial-gradient(circle_at_82%_18%,rgba(255,215,0,0.10),transparent_45%),radial-gradient(circle_at_50%_92%,rgba(124,255,203,0.10),transparent_48%)]" />
      <div className="relative z-10 flex-1 flex flex-col px-5 py-6 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </main>
  );
}

function Brand() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FF8A00] flex items-center justify-center shadow-[0_8px_24px_rgba(255,165,0,0.4)]">
        <Gem className="w-7 h-7 text-[#1a1300]" />
      </div>
      <h1 className="text-white font-bold text-xl mt-3 tracking-wide">STARGAME</h1>
      <p className="text-white/50 text-[12px] mt-1">Trải nghiệm cá cược đỉnh cao</p>
    </div>
  );
}