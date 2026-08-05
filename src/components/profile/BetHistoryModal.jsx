import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { BET_STATUS } from "./profileData";

const FILTERS = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Đang chờ" },
  { key: "paid", label: "Đã thanh toán" },
  { key: "draw", label: "Mở thưởng" },
];

export default function BetHistoryModal({ open, onOpenChange, bets }) {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const list = useMemo(
    () => bets.filter((b) =>
      (filter === "all" || b.status === filter) &&
      (!q || b.gameId.toLowerCase().includes(q.toLowerCase()) || b.game.toLowerCase().includes(q.toLowerCase()))
    ),
    [bets, filter, q]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[460px] bg-[#1e1832] border-[#323b51] text-white rounded-2xl">
        <DialogHeader><DialogTitle className="text-[#bd9c59]">Lịch sử đặt cược</DialogTitle></DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tra cứu theo Game ID..." className="pl-9 bg-[#2a2040] border-[#3a2d52]" />
        </div>

        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={`px-3 py-1 rounded-full text-xs ${filter === f.key ? "bg-[#bd9c59] text-[#1e1832]" : "bg-[#2a2040] text-white/70"}`}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
          {list.length === 0 && <p className="text-center text-white/50 py-6 text-sm">Không có cược nào</p>}
          {list.map((b) => {
            const s = BET_STATUS[b.status];
            return (
              <div key={b.id} className="bg-[#2a2040] rounded-lg px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{b.game}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${s.cls}`}>{s.label}</span>
                </div>
                <div className="flex items-center justify-between mt-1 text-xs text-white/60">
                  <span>Game ID: {b.gameId} · {b.time}</span>
                  <span className="text-[#bd9c59]">{b.amount} coin</span>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}