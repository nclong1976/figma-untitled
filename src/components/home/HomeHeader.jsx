import React from "react";
import { Headphones, Menu as MenuIcon } from "lucide-react";

export default function HomeHeader({ onChat, onMenu }) {
  return (
    <header className="relative w-full min-h-[37px] flex flex-col items-center justify-center shrink-0">
      <img
        src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/113475db5_42023f32b_8814f9fc52211a9a6147fc0078db9f9503eba721.png"
        alt="Header Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative z-10 flex flex-col items-center mt-1">
        <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/eb69c374c_645c88250_4e121c95b33117e8ce7ec88128a7f79b89007876.png" alt="Crown Logo" className="w-[26px] h-[13px] object-cover" />
        <p className="text-figma-17 font-normal font-heading leading-figma-14 text-[#7f7161] mt-0.5">Sands</p>
      </div>
      <div className="absolute top-1 right-2 z-20 flex items-center gap-1">
        <button onClick={onChat} aria-label="Hỗ trợ" className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#7f7161] transition-colors">
          <Headphones className="w-4 h-4" />
        </button>
        <button onClick={onMenu} aria-label="Menu" className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#7f7161] transition-colors">
          <MenuIcon className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}