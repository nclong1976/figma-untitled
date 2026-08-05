import React, { useEffect, useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const TITLE = { deposit: "Hồ sơ nạp tiền", withdraw: "Hồ sơ rút tiền", both: "Hồ sơ nạp / rút" };

const STATUS = {
  pending: { label: "Chờ duyệt", cls: "bg-amber-500/20 text-amber-300" },
  processing: { label: "Đang xử lý", cls: "bg-amber-500/20 text-amber-300" },
  completed: { label: "Thành công", cls: "bg-emerald-500/20 text-emerald-300" },
  rejected: { label: "Từ chối", cls: "bg-red-500/20 text-red-300" },
};

export default function TxHistoryModal({ open, onOpenChange, mode }) {
  const { user } = useAuth();
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !user) return;
    setLoading(true);
    base44.entities.Transaction.filter({ userId: user.id }, "-created_date", 100)
      .then((list) => setTxs(list))
      .catch(() => setTxs([]))
      .finally(() => setLoading(false));
  }, [open, user]);

  const list = useMemo(() => txs.filter((t) => mode === "both" || t.type === mode), [txs, mode]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[460px] bg-[#1e1832] border-[#323b51] text-white rounded-2xl">
        <DialogHeader><DialogTitle className="text-[#bd9c59]">{TITLE[mode] || "Lịch sử giao dịch"}</DialogTitle></DialogHeader>
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {loading && <p className="text-center text-white/50 py-6 text-sm">Đang tải...</p>}
          {!loading && list.length === 0 && <p className="text-center text-white/50 py-6 text-sm">Chưa có giao dịch</p>}
          {list.map((t) => {
            const st = STATUS[t.status] || STATUS.pending;
            const time = new Date(t.created_date).toLocaleString("vi-VN");
            return (
              <div key={t.id} className="bg-[#2a2040] rounded-lg px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">{(t.id || "").slice(-10)}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm">{t.type === "deposit" ? "Nạp" : "Rút"} · {t.method || "-"}</span>
                  <span className={`text-sm font-semibold ${t.type === "deposit" ? "text-emerald-400" : "text-amber-400"}`}>
                    {t.type === "deposit" ? "+" : "-"}{t.amount}
                  </span>
                </div>
                <div className="text-[11px] text-white/50 mt-0.5">{time}</div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}