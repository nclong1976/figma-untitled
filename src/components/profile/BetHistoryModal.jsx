import React, { useEffect, useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const STATUS = {
  pending: { label: "Đang chờ", cls: "bg-amber-500/20 text-amber-300" },
  win: { label: "Thắng", cls: "bg-emerald-500/20 text-emerald-300" },
  loss: { label: "Thua", cls: "bg-red-500/20 text-red-300" },
};

const FILTERS = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Đang chờ" },
  { key: "win", label: "Thắng" },
  { key: "loss", label: "Thua" },
];

export default function BetHistoryModal({ open, onOpenChange }) {
  const { user } = useAuth();
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open || !user) return;
    setLoading(true);
    base44.entities.Bet.filter({ userId: user.id }, "-created_date", 100)
      .then((list) => setBets(list))
      .catch(() => setBets([]))
      .finally(() => setLoading(false));
  }, [open, user]);

  const list = useMemo(() => bets.filter((b) => {
    const st = b.result || "pending";
    return (filter === "all" || st === filter) &&
      (!q || (b.hallName || "").toLowerCase().includes(q.toLowerCase()) || (b.hallId || "").toLowerCase().includes(q.toLowerCase()));
  }), [bets, filter, q]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[460px] bg-[#1e1832] border-[#323b51] text-white rounded-2xl">
        <DialogHeader><DialogTitle className="text-[#bd9c59]">Lịch sử đặt cược</DialogTitle></DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tra cứu theo trò chơi..." className="pl-9 bg-[#2a2040] border-[#3a2d52]" />
        </div>

        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={`px-3 py-1 rounded-full text-xs ${filter === f.key ? "bg-[#bd9c59] text-[#1e1832]" : "bg-[#2a2040] text-white/70"}`}>{f.label}</button>
          ))}
        </div>

        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
          {loading && <p className="text-center text-white/50 py-6 text-sm">Đang tải...</p>}
          {!loading && list.length === 0 && <p className="text-center text-white/50 py-6 text-sm">Không có cược nào</p>}
          {list.map((b) => {
            const st = STATUS[b.result || "pending"];
            const time = new Date(b.created_date).toLocaleString("vi-VN");
            return (
              <div key={b.id} className="bg-[#2a2040] rounded-lg px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{b.hallName || b.hallId}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                </div>
                <div className="flex items-center justify-between mt-1 text-xs text-white/60">
                  <span>Kỳ {b.period} · {time}</span>
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