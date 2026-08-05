import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "@/lib/NotificationContext";

const DOT = { result: "bg-[#FFD700]", balance: "bg-emerald-400", info: "bg-sky-400" };

export default function NotificationBell({ iconColor = "text-white/85" }) {
  const { notifications, unread, markAllRead, clear } = useNotifications();
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
        onClick={() => { const next = !open; setOpen(next); if (next) markAllRead(); }}
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
      {open && (
        <div className="absolute right-0 top-9 z-50 w-[280px] max-h-[340px] overflow-y-auto rounded-xl bg-[#0d1226]/95 border border-white/15 backdrop-blur-md shadow-xl [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <p className="text-white text-[13px] font-semibold">Thông báo</p>
            {notifications.length > 0 && (
              <button onClick={clear} className="text-white/50 text-[11px] hover:text-white">Xoá tất cả</button>
            )}
          </div>
          {notifications.length === 0 ? (
            <p className="text-white/40 text-[12px] text-center py-6">Chưa có thông báo</p>
          ) : notifications.map((n) => (
            <div key={n.id} className="px-3 py-2 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${DOT[n.type] || DOT.info}`} />
                <p className="text-white text-[12px] font-medium flex-1 truncate">{n.title}</p>
              </div>
              {n.body && <p className="text-white/55 text-[11px] pl-3 mt-0.5">{n.body}</p>}
              <p className="text-white/30 text-[10px] pl-3 mt-0.5">{new Date(n.time).toLocaleTimeString("vi-VN")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}