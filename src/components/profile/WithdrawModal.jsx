import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export default function WithdrawModal({ open, onOpenChange, balance, minTurnover, turnover, linked, onSubmit }) {
  const [bankId, setBankId] = useState("");
  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState("");
  const selected = linked.find((a) => a.id === bankId) || null;
  const bankAccounts = linked.filter((a) => a.type === "bank");
  const conditionsMet = balance >= amount && amount > 0 && turnover >= minTurnover;
  const pinOk = /^\d{6}$/.test(pin);

  const submit = () => {
    if (!selected || !conditionsMet || !pinOk) return;
    onSubmit({ amount: Number(amount), bank: selected, pin });
    setBankId(""); setAmount(0); setPin("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[460px] bg-[#1e1832] border-[#323b51] text-white rounded-2xl">
        <DialogHeader><DialogTitle className="text-[#bd9c59]">Rút tiền mặt</DialogTitle></DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-4 h-4 ${balance > 0 ? "text-emerald-400" : "text-red-400"}`} />
              <span>Số dư khả dụng: {balance.toFixed(2)} coin</span>
            </div>
            <div className="flex items-center gap-2">
              {turnover >= minTurnover ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
              <span>Số vòng cược: {turnover}/{minTurnover} {turnover >= minTurnover ? "(đạt)" : "(chưa đạt)"}</span>
            </div>
          </div>

          <div>
            <Label className="text-xs text-white/70">Chọn tài khoản ngân hàng</Label>
            <div className="space-y-1 mt-1 max-h-32 overflow-y-auto">
              {bankAccounts.length === 0 && <p className="text-xs text-white/50 py-2">Chưa liên kết ngân hàng. Vui lòng liên kết trước.</p>}
              {bankAccounts.map((a) => (
                <button key={a.id} onClick={() => setBankId(a.id)} className={`w-full text-left text-sm rounded-lg px-3 py-2 ${bankId === a.id ? "bg-[#bd9c59] text-[#1e1832]" : "bg-[#2a2040] text-white/80"}`}>
                  {a.bankName} · {a.accountNumber}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-xs text-white/70">Số tiền rút</Label>
            <Input type="number" min={0} value={amount} onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))} className="bg-[#2a2040] border-[#3a2d52] mt-1" />
          </div>
          <div>
            <Label className="text-xs text-white/70">Mã PIN rút tiền (6 số)</Label>
            <Input type="password" inputMode="numeric" maxLength={6} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} className="bg-[#2a2040] border-[#3a2d52] mt-1" />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={submit} disabled={!selected || !conditionsMet || !pinOk} className="w-full bg-[#bd9c59] text-[#1e1832] hover:bg-[#cfb06a] disabled:opacity-50">
            Gửi yêu cầu rút tiền
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}