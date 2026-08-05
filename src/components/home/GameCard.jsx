import React, { useState } from "react";
import { motion } from "framer-motion";

export default function GameCard({ game, onClick, t }) {
  const [ripples, setRipples] = useState([]);
  const isMaintenance = game.status === "maintenance";

  const handleTap = (e) => {
    if (isMaintenance) {
      onClick?.(game);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples((r) => [...r, { id, x, y }]);
    setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 600);
    onClick?.(game);
  };

  return (
    <motion.button
      onClick={handleTap}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: isMaintenance ? 1 : 0.97 }}
      className="relative w-full aspect-[130/162] rounded-xl overflow-clip flex flex-col justify-end pb-3 items-center cursor-pointer group">
      
      <img src={game.bg} alt={game.title} className="absolute inset-0 w-full h-full object-cover z-0" />
      {game.overlay && <img src={game.overlay.src} alt="" className={game.overlay.cls} />}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 hidden" />

      {game.badge && !isMaintenance &&
      <span className={`absolute top-1 right-1 z-20 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${game.badge === "hot" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}>
          {game.badge === "hot" ? t("badge_hot") : t("badge_new")}
        </span>
      }

      {isMaintenance &&
      <div className="absolute inset-0 bg-black/55 z-20 flex items-center justify-center">
          <span className="text-[10px] text-white px-2 py-0.5 rounded-full bg-amber-600/90">{t("maintenance_badge")}</span>
        </div>
      }

      <p className={`relative z-20 text-center px-1 ${game.titleClass}`}>{game.title}</p>

      {ripples.map((r) =>
      <motion.span
        key={r.id}
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 2.6, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute rounded-full bg-white/60 z-30 pointer-events-none"
        style={{ left: r.x - 20, top: r.y - 20, width: 40, height: 40 }} />

      )}
    </motion.button>);

}