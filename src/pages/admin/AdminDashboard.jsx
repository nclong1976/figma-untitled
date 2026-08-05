import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { DEMO_USERS, getRecord, setLock } from "@/lib/adminStore";
import { Search, Lock, Unlock, ShieldCheck, Users, Wallet, AlertCircle, LogOut, ArrowLeft } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [realUsers, setRealUsers] = useState([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    base44.entities.User.list().then(setRealUsers).catch(() => setRealUsers([]));
  }, []);

  const rows = useMemo(() => {
    const list = [
      ...realUsers.map((u) => ({ id: u.id, full_name: u.full_name || u.email, email: u.email, role: u.role, real: true })),
      ...DEMO_USERS.map((u) => ({ ...u, real: false })),
    ];
    return list.filter((u) => {
      const rec = getRecord(u.id);
      if (filter === "locked" && !rec.locked) return false;
      if (filter === "active" && rec.locked) return false;
      if (q.trim()) {
        const s = q.toLowerCase();
        if (!(u.full_name?.toLowerCase().includes(s) || u.email?.toLowerCase().includes(s))) return false;
      }
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realUsers, q, filter, tick]);

  const stats = useMemo(() => {
    const all = [...realUsers, ...DEMO_USERS];
    const locked = all.filter((u) => getRecord(u.id).locked).length;
    const pending = all.reduce((n, u) => n + getRecord(u.id).txs.filter((t) => t.status === "pending").length, 0);
    const totalBal = all.reduce((n, u) => n + getRecord(u.id).balance, 0);
    return { total: all.length, locked, pending, totalBal };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realUsers, tick]);

  const toggleLock = (u) => {
    const rec = getRecord(u.id);
    setLock(u.id, !rec.locked, user?.email || "admin");
    setTick((t) => t + 1);
    toast({ title: !rec.locked ? "Đã khoá tài khoản" : "Đã mở khoá tài khoản", description: u.email });
  };

  return (
    <main className="min-h-[100dvh] bg-[#0A0E1A] text-white">
      <header className="sticky top-0 z-20 bg-[#0A0E1A]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#FFD700]" />
          <h1 className="font-bold text-base">Bảng điều khiển Quản trị</h1>
          <div className="ml-auto flex items-center gap-3">
            <Link to="/" className="text-white/60 text-xs hover:text-white flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Trang chủ</Link>
            <button onClick={() => logout()} className="text-white/60 text-xs hover:text-white flex items-center gap-1"><LogOut className="w-4 h-4" /> Thoát</button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">
        <div className="grid grid-cols-4 gap-2">
          <Stat icon={Users} label="Người dùng" value={stats.total} />
          <Stat icon={Lock} label="Đã khoá" value={stats.locked} />
          <Stat icon={AlertCircle} label="Lệnh chờ" value={stats.pending} />
          <Stat icon={Wallet} label="Tổng số dư" value={stats.totalBal.toLocaleString()} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm theo tên hoặc email…"
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-white/35 focus:border-[#FFD700]/40 outline-none" />
          </div>
          <div className="flex gap-2">
            {[["all", "Tất cả"], ["active", "Đang hoạt động"], ["locked", "Đã khoá"]].map(([k, lbl]) => (
              <button key={k} onClick={() => setFilter(k)}
                className={`px-3 py-1.5 rounded-full text-xs ${filter === k ? "bg-[#FFD700] text-[#1a1300] font-semibold" : "bg-white/10 text-white/70"}`}>{lbl}</button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 overflow-hidden">
          {rows.length === 0 ? (
            <p className="text-center text-white/40 text-sm py-8">Không có người dùng phù hợp</p>
          ) : rows.map((u, i) => {
            const rec = getRecord(u.id);
            return (
              <div key={u.id} className={`flex items-center gap-3 px-3 py-3 ${i % 2 ? "bg-white/[0.03]" : ""}`}>
                <button onClick={() => navigate(`/admin/users/${u.id}`)} className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium truncate">{u.full_name}</p>
                  <p className="text-[11px] text-white/50 truncate">{u.email}</p>
                </button>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${u.role === "admin" ? "bg-[#FFD700]/20 text-[#FFD700]" : "bg-white/10 text-white/60"}`}>{u.role}</span>
                <span className="text-xs text-white/80 w-20 text-right">{rec.balance.toLocaleString()} <span className="text-white/40">coin</span></span>
                <button onClick={() => toggleLock(u)} className={`p-1.5 rounded-lg ${rec.locked ? "bg-red-500/20 text-red-300" : "bg-emerald-500/15 text-emerald-300"}`} title={rec.locked ? "Mở khoá" : "Khoá"}>
                  {rec.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </button>
                <Link to={`/admin/users/${u.id}`} className="text-[11px] text-[#FFD700] hover:underline whitespace-nowrap">Chi tiết</Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-2 flex flex-col items-center">
      <Icon className="w-4 h-4 text-[#FFD700] mb-1" />
      <p className="text-sm font-bold leading-none">{value}</p>
      <p className="text-[10px] text-white/50 mt-1">{label}</p>
    </div>
  );
}