import React, { useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TX_STATUS } from "./profileData";

const TITLE = { deposit: "Hồ sơ nạp tiền", withdraw: "Hồ sơ rút tiền", both: "Hồ sơ nạp / rút" };

export default function TxHistoryModal({ open, onOpenChange, txs, mode }) {
  const list = useMemo(() => txs.filter((t) => mode === "both" || t.type === mode), [txs, mode]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[460px] bg-[#1e1832] border-[#323b51] text-white rounded-2xl">
        <DialogHeader><DialogTitle className="text-[#bd9c59]">{TITLE[mode] || "Lịch sử giao dịch"}</DialogTitle></DialogHeader>
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {list.length === 0 && <p className="text-center text-white/50 py-6 text-sm">Chưa có giao dịch</p>}
          {list.map((t) => {
            const s = TX_STATUS[t.status];
            return (
              <div key={t.txid} className="bg-[#2a2040] rounded-lg px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">{t.txid}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${s.cls}`}>{s.label}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm">{t.type === "deposit" ? "Nạp" : "Rút"} · {t.bank}</span>
                  <span className={`text-sm font-semibold ${t.type === "deposit" ? "text-emerald-400" : "text-amber-400"}`}>
                    {t.type === "deposit" ? "+" : "-"}{t.amount}
                  </span>
                </div>
                <div className="text-[11px] text-white/50 mt-0.5">{t.time}{t.status === "rejected" && ` · ${t.reason}`}</div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}