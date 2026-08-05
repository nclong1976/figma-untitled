import React from "react";
import { motion } from "framer-motion";

export default function FloatingChatButton({ onClick, unread = 0 }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="absolute right-4 bottom-[150px] z-50 hover:scale-110 transition-transform"
      aria-label="Live Chat"
    >
      <img
        src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/a6b09cdbe_e305385f5_c124b35ae65b0f408c513d378c99f5419622e3d6.png"
        alt="Live Chat"
        className="w-[46px] h-[43px] object-cover"
      />
      {unread > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-[#191c40]">
          {unread > 99 ? "99+" : unread}
        </span>
      )}
    </motion.button>
  );
}