import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/I18nContext";
import { useAuth } from "@/lib/AuthContext";
import LanguageSwitcher from "@/components/home/LanguageSwitcher";

// Trang mở đầu (splash): chạm vào màn hình → chuyển sang /login.
// Nếu người dùng đã đăng nhập, tự chuyển thẳng tới dashboard.
export default function Splash() {
  const navigate = useNavigate();
  const { t, lang, setLang } = useI18n();
  const { isAuthenticated, authChecked } = useAuth();

  useEffect(() => {
    if (authChecked && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [authChecked, isAuthenticated, navigate]);

  const enter = () => {
    // Ép path là chuỗi hợp lệ để tránh lỗi 404 /[object Object].
    navigate("/login", { replace: true });
  };

  return (
    <main
      onClick={enter}
      className="relative max-w-md w-full mx-auto min-h-[100dvh] overflow-hidden bg-[#0A0E1A] cursor-pointer select-none">
      
      {/* Nền video sảnh casino */}
      <video
        src="https://media.base44.com/videos/public/6a729d033f9d0f63f381a6c6/c8bcb15f5_6faa31b965e5d1deaeb62d0f29225b5b.mp4"
        poster="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/e57f331cd_708f7e507_e87283081c2ffaf4802a737a4f6e0a1d686d3b3c.png"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/75" />

      {/* Nội dung giữa */}
      








































      

      {/* Bộ chuyển ngôn ngữ — chặn sự kiện click để không bị kích hoạt enter */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
        
        <LanguageSwitcher lang={lang} onChange={setLang} />
      </div>
    </main>);

}