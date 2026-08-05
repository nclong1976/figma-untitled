import React, { useState, useRef, useEffect } from "react";
import { Bell, Trash2, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNotifications } from "@/lib/NotificationContext";

const DOT = { result: "bg-[#FFD700]", balance: "bg-emerald-400", info: "bg-sky-400", admin: "bg-fuchsia-400", success: "bg-emerald-400", warning: "bg-amber-400" };

export default function NotificationBell({ iconColor = "text-white/85" }) {
  const { notifications, unread, markAllRead, markRead, remove, clear } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Thông báo"
      >
        <Bell className={`w-4 h-4 ${iconColor}`} />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-9 z-50 w-[290px] max-h-[380px] overflow-y-auto rounded-xl bg-[#0d1226]/95 border border-white/15 backdrop-blur-md shadow-xl [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 sticky top-0 bg-[#0d1226]/95">
              <p className="text-white text-[13px] font-semibold">Thông báo {unread > 0 && <span className="text-red-400">({unread})</span>}</p>
              <div className="flex items-center gap-2">
                {unread > 0 && (
                  <button onClick={markAllRead} title="Đánh dấu đã đọc" className="text-white/50 hover:text-white"><Check className="w-3.5 h-3.5" /></button>
                )}
                {notifications.length > 0 && (
                  <button onClick={clear} title="Xoá tất cả" className="text-white/50 hover:text-white"><Trash2 className="w-3.5 h-3.5" /></button>
                )}
              </div>
            </div>
            {notifications.length === 0 ? (
              <p className="text-white/40 text-[12px] text-center py-6">Chưa có thông báo</p>
            ) : (
              <AnimatePresence initial={false}>
                {notifications.map((n) => (
                  <motion.div
                    key={n.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, x: 120, height: 0 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.5}
                    onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 70) remove(n.id); }}
                    className={`px-3 py-2 border-b border-white/5 ${!n.read ? "bg-white/[0.03]" : ""}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${DOT[n.type] || DOT.info}`} />
                      <p className="text-white text-[12px] font-medium flex-1 truncate">{n.title}</p>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                    </div>
                    {n.body && <p className="text-white/55 text-[11px] pl-3 mt-0.5">{n.body}</p>}
                    <div className="flex items-center justify-between pl-3 mt-0.5">
                      <p className="text-white/30 text-[10px]">{new Date(n.time).toLocaleTimeString("vi-VN")}</p>
                      {!n.read && (
                        <button onClick={() => markRead(n.id)} className="text-white/40 text-[10px] hover:text-white">Đánh dấu đã đọc</button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}