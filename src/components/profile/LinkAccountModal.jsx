import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LinkAccountModal({ open, onOpenChange, onAdd, linked }) {
  const [tab, setTab] = useState("bank");
  const [bank, setBank] = useState({ bankName: "", accountNumber: "", holder: "" });
  const [crypto, setCrypto] = useState({ walletAddress: "" });

  const submit = () => {
    if (tab === "bank") {
      if (!bank.bankName || !bank.accountNumber || !bank.holder) return;
      onAdd({ id: "L" + Date.now(), type: "bank", ...bank });
      setBank({ bankName: "", accountNumber: "", holder: "" });
    } else {
      if (!crypto.walletAddress) return;
      onAdd({ id: "L" + Date.now(), type: "crypto", walletAddress: crypto.walletAddress, network: "USDT-TRC20" });
      setCrypto({ walletAddress: "" });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[460px] bg-[#1e1832] border-[#323b51] text-white rounded-2xl">
        <DialogHeader><DialogTitle className="text-[#bd9c59]">Liên kết tài khoản</DialogTitle></DialogHeader>

        <div className="flex gap-2 mb-3">
          <button onClick={() => setTab("bank")} className={`flex-1 py-2 rounded-lg text-sm ${tab === "bank" ? "bg-[#bd9c59] text-[#1e1832]" : "bg-[#2a2040] text-white/70"}`}>Ngân hàng</button>
          <button onClick={() => setTab("crypto")} className={`flex-1 py-2 rounded-lg text-sm ${tab === "crypto" ? "bg-[#bd9c59] text-[#1e1832]" : "bg-[#2a2040] text-white/70"}`}>Ví Crypto</button>
        </div>

        {linked.length > 0 && (
          <div className="space-y-1 mb-3">
            {linked.map((a) => (
              <div key={a.id} className="text-xs bg-[#2a2040] rounded-lg px-3 py-2 flex justify-between">
                <span>{a.type === "bank" ? `${a.bankName} · ${a.accountNumber}` : `${a.network} · ${a.walletAddress.slice(0, 10)}...`}</span>
                <span className="text-emerald-400">Đã liên kết</span>
              </div>
            ))}
          </div>
        )}

        {tab === "bank" ? (
          <div className="space-y-2">
            <div><Label className="text-xs text-white/70">Tên ngân hàng</Label><Input value={bank.bankName} onChange={(e) => setBank({ ...bank, bankName: e.target.value })} className="bg-[#2a2040] border-[#3a2d52] mt-1" /></div>
            <div><Label className="text-xs text-white/70">Số tài khoản</Label><Input value={bank.accountNumber} onChange={(e) => setBank({ ...bank, accountNumber: e.target.value })} className="bg-[#2a2040] border-[#3a2d52] mt-1" /></div>
            <div><Label className="text-xs text-white/70">Chủ tài khoản</Label><Input value={bank.holder} onChange={(e) => setBank({ ...bank, holder: e.target.value })} className="bg-[#2a2040] border-[#3a2d52] mt-1" /></div>
          </div>
        ) : (
          <div className="space-y-2">
            <div><Label className="text-xs text-white/70">Địa chỉ ví (USDT-TRC20)</Label><Input value={crypto.walletAddress} onChange={(e) => setCrypto({ ...crypto, walletAddress: e.target.value })} placeholder="T..." className="bg-[#2a2040] border-[#3a2d52] mt-1" /></div>
            <p className="text-[11px] text-white/50">Chỉ hỗ trợ mạng TRC20. Vui lòng kiểm tra kỹ địa chỉ.</p>
          </div>
        )}

        <DialogFooter>
          <Button onClick={submit} className="w-full bg-[#bd9c59] text-[#1e1832] hover:bg-[#cfb06a]">Liên kết</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}