import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { DEMO_USERS, getRecord, adjustBalance, setLock, setTxStatus, addBank, setProfileName } from "@/lib/adminStore";
import { ArrowLeft, Lock, Unlock, Plus, Minus, Landmark, History, ClipboardList, ScrollText, Wallet } from "lucide-react";

export default function AdminUserDetail() {
  const { id } = useParams();
  const { user: admin } = useAuth();
  const { toast } = useToast();
  const [tick, setTick] = useState(0);
  const [realUser, setRealUser] = useState(null);
  const [name, setName] = useState("");
  const [adjAmount, setAdjAmount] = useState("");
  const [adjReason, setAdjReason] = useState("");
  const [bankType, setBankType] = useState("bank");
  const [bankLabel, setBankLabel] = useState("");

  useEffect(() => {
    const demo = DEMO_USERS.find((u) => u.id === id);
    if (demo) { setRealUser(demo); setName(demo.full_name); return; }
    base44.entities.User.list().then((list) => {
      const u = list.find((x) => x.id === id);
      if (u) { setRealUser(u); setName(u.full_name || ""); }
    }).catch(() => {});
  }, [id]);

  const rec = useMemo(() => getRecord(id), [id, tick]);
  const display = realUser?.full_name || realUser?.email || id;

  const doAdjust = (dir) => {
    const amt = parseFloat(adjAmount);
    if (!amt || amt <= 0) return toast({ title: "Nhập số tiền hợp lệ", variant: "destructive" });
    adjustBalance(id, dir * amt, adjReason, admin?.email || "admin");
    setAdjAmount(""); setAdjReason("");
    setTick((t) => t + 1);
    toast({ title: `Đã ${dir > 0 ? "cộng" : "trừ"} ${amt} coin` });
  };

  const doTx = (txId, status) => {
    setTxStatus(id, txId, status, admin?.email || "admin");
    setTick((t) => t + 1);
    toast({ title: status === "approved" ? "Đã duyệt lệnh" : "Đã từ chối lệnh" });
  };

  const doLock = () => {
    setLock(id, !rec.locked, admin?.email || "admin");
    setTick((t) => t + 1);
  };

  const saveName = async () => {
    const demo = DEMO_USERS.find((u) => u.id === id);
    if (demo) setProfileName(id, name);
    else if (realUser) { try { await base44.entities.User.update(realUser.id, { full_name: name }); } catch { /* ignore */ } }
    setTick((t) => t + 1);
    toast({ title: "Đã lưu thông tin" });
  };

  const doAddBank = () => {
    if (!bankLabel.trim()) return toast({ title: "Nhập thông tin tài khoản", variant: "destructive" });
    addBank(id, { type: bankType, label: bankLabel });
    setBankLabel("");
    setTick((t) => t + 1);
    toast({ title: "Đã thêm tài khoản liên kết" });
  };

  return (
    <main className="min-h-[100dvh] bg-[#0A0E1A] text-white">
      <header className="sticky top-0 z-20 bg-[#0A0E1A]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link to="/admin" className="p-1.5 rounded-lg hover:bg-white/10"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="font-bold text-base">Chi tiết người dùng</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Profile header + edit */}
        <section className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF8A00] flex items-center justify-center text-[#1a1300] font-bold text-lg">
              {(display || "?").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{display}</p>
              <p className="text-[11px] text-white/50 truncate">{realUser?.email}</p>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${realUser?.role === "admin" ? "bg-[#FFD700]/20 text-[#FFD700]" : "bg-white/10 text-white/60"}`}>{realUser?.role || "user"}</span>
            </div>
            <button onClick={doLock} className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 ${rec.locked ? "bg-red-500/20 text-red-300" : "bg-emerald-500/15 text-emerald-300"}`}>
              {rec.locked ? <><Lock className="w-3.5 h-3.5" /> Đã khoá</> : <><Unlock className="w-3.5 h-3.5" /> Hoạt động</>}
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Họ tên"
              className="flex-1 h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-sm outline-none focus:border-[#FFD700]/40" />
            <button onClick={saveName} className="px-3 h-9 rounded-lg bg-[#FFD700] text-[#1a1300] text-xs font-semibold">Lưu</button>
          </div>
        </section>

        {/* Balance + adjust tool */}
        <section className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2"><Wallet className="w-4 h-4 text-[#FFD700]" /><h2 className="text-sm font-semibold">Số dư</h2></div>
          <p className="text-2xl font-bold text-[#FFD700]">{rec.balance.toLocaleString()} <span className="text-sm text-white/50">coin</span></p>
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex gap-2">
              <input value={adjAmount} onChange={(e) => setAdjAmount(e.target.value)} type="number" placeholder="Số tiền" className="flex-1 h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-sm outline-none" />
              <input value={adjReason} onChange={(e) => setAdjReason(e.target.value)} placeholder="Lý do" className="flex-1 h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-sm outline-none" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => doAdjust(1)} className="flex-1 h-9 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1"><Plus className="w-4 h-4" /> Cộng số dư</button>
              <button onClick={() => doAdjust(-1)} className="flex-1 h-9 rounded-lg bg-red-500/20 text-red-300 text-xs font-semibold flex items-center justify-center gap-1"><Minus className="w-4 h-4" /> Trừ số dư</button>
            </div>
          </div>
        </section>

        {/* Linked banks */}
        <section className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2"><Landmark className="w-4 h-4 text-[#FFD700]" /><h2 className="text-sm font-semibold">Ngân hàng liên kết</h2></div>
          <div className="space-y-1.5">
            {rec.banks.map((b) => (
              <div key={b.id} className="flex items-center gap-2 text-sm">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/60">{b.type === "bank" ? "Ngân hàng" : "Crypto"}</span>
                <span className="flex-1 truncate">{b.label}</span>
                <span className="text-[10px] text-emerald-300">{b.status}</span>
              </div>
            ))}
            {rec.banks.length === 0 && <p className="text-[12px] text-white/40">Chưa liên kết</p>}
          </div>
          <div className="mt-2 flex gap-2">
            <select value={bankType} onChange={(e) => setBankType(e.target.value)} className="h-9 px-2 rounded-lg bg-white/5 border border-white/10 text-xs outline-none">
              <option value="bank" className="bg-[#0A0E1A]">Ngân hàng</option>
              <option value="crypto" className="bg-[#0A0E1A]">Crypto</option>
            </select>
            <input value={bankLabel} onChange={(e) => setBankLabel(e.target.value)} placeholder="VCB · 1234 / USDT · 0x…" className="flex-1 h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-sm outline-none" />
            <button onClick={doAddBank} className="px-3 h-9 rounded-lg bg-[#FFD700] text-[#1a1300] text-xs font-semibold">Thêm</button>
          </div>
        </section>

        {/* Deposit/Withdraw approvals */}
        <section className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2"><ClipboardList className="w-4 h-4 text-[#FFD700]" /><h2 className="text-sm font-semibold">Duyệt nạp / rút</h2></div>
          <div className="space-y-1.5">
            {rec.txs.map((t) => (
              <div key={t.id} className="flex items-center gap-2 text-sm">
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${t.type === "deposit" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>{t.type === "deposit" ? "Nạp" : "Rút"}</span>
                <span className="flex-1 truncate text-white/80">{t.amount} coin · {t.method} · {t.time}</span>
                {t.status === "pending" ? (
                  <span className="flex gap-1">
                    <button onClick={() => doTx(t.id, "approved")} className="px-2 h-7 rounded bg-emerald-500/20 text-emerald-300 text-[11px]">Duyệt</button>
                    <button onClick={() => doTx(t.id, "rejected")} className="px-2 h-7 rounded bg-red-500/20 text-red-300 text-[11px]">Từ chối</button>
                  </span>
                ) : (
                  <span className={`text-[10px] ${t.status === "approved" ? "text-emerald-300" : "text-red-300"}`}>{t.status}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bet history */}
        <section className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2"><History className="w-4 h-4 text-[#FFD700]" /><h2 className="text-sm font-semibold">Lịch sử cược</h2></div>
          <div className="space-y-1.5">
            {rec.bets.map((b) => (
              <div key={b.id} className="flex items-center gap-2 text-sm">
                <span className="flex-1 truncate text-white/80">{b.game} · kỳ {b.period}</span>
                <span className="text-white/60">{b.amount} coin</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${b.status === "win" ? "bg-emerald-500/20 text-emerald-300" : b.status === "loss" ? "bg-red-500/20 text-red-300" : "bg-white/10 text-white/60"}`}>{b.status}</span>
                <span className="text-[10px] text-white/40">{b.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Admin action log */}
        <section className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2"><ScrollText className="w-4 h-4 text-[#FFD700]" /><h2 className="text-sm font-semibold">Nhật ký thao tác Admin</h2></div>
          {rec.logs.length === 0 ? (
            <p className="text-[12px] text-white/40">Chưa có thao tác</p>
          ) : (
            <div className="space-y-1.5">
              {rec.logs.map((l) => (
                <div key={l.id} className="text-[12px] border-b border-white/5 pb-1.5">
                  <p><span className="font-medium text-[#FFD700]">{l.action}</span> · <span className="text-white/60">{l.detail}</span></p>
                  <p className="text-[10px] text-white/40">{l.by} · {l.time}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}