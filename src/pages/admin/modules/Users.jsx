import React, { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, Lock, Unlock, Eye, Wallet, Bell, Trash2, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { Panel, TableWrap, Th, Td, Empty, Badge, inputCls, ConfirmDialog } from "../ui";
import { localListUsers } from "@/lib/localAuth";

const PAGE = 8;

const IconBtn = ({ children, onClick, title, danger }) => (
  <button title={title} onClick={onClick} className={`p-1.5 rounded-lg hover:bg-white/10 ${danger ? "text-red-300 hover:bg-red-500/15" : "text-white/70"}`}>{children}</button>
);
const Row = ({ label, value }) => (
  <div className="flex justify-between gap-3 py-1.5 border-b border-white/5">
    <span className="text-white/50 text-sm">{label}</span>
    <span className="text-white text-sm text-right">{value}</span>
  </div>
);

export default function Users() {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [detail, setDetail] = useState(null);
  const [edit, setEdit] = useState(null);
  const [bal, setBal] = useState("");
  const [reason, setReason] = useState("");
  const [del, setDel] = useState(null);
  const [invite, setInvite] = useState(false);
  const [iEmail, setIEmail] = useState("");
  const [iRole, setIRole] = useState("user");

  const load = async () => {
    let bUsers = [];
    try { bUsers = await base44.entities.User.list(); } catch { /* ignore */ }
    const lUsers = localListUsers();
    const byEmail = new Map();
    bUsers.forEach((u) => byEmail.set((u.email || "").toLowerCase(), u));
    lUsers.forEach((u) => byEmail.set((u.email || "").toLowerCase(), u));
    setUsers(Array.from(byEmail.values()));
  };
  useEffect(() => {
    load();
    const handler = () => load();
    window.addEventListener("local-users-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("local-users-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const filtered = useMemo(() => users.filter((u) => {
    if (filter === "active" && u.locked) return false;
    if (filter === "locked" && !u.locked) return false;
    if (q.trim()) { const s = q.toLowerCase(); if (!((u.full_name || "").toLowerCase().includes(s) || (u.email || "").toLowerCase().includes(s))) return false; }
    return true;
  }), [users, q, filter]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const rows = filtered.slice(page * PAGE, page * PAGE + PAGE);

  const toggleLock = async (u) => {
    try { await base44.entities.User.update(u.id, { locked: !u.locked }); toast({ title: !u.locked ? "Đã khoá" : "Đã mở khoá" }); load(); }
    catch (e) { toast({ title: "Lỗi", description: e.message, variant: "destructive" }); }
  };
  const saveBalance = async () => {
    const amt = parseFloat(bal); if (!amt) return toast({ title: "Nhập số tiền hợp lệ", variant: "destructive" });
    const nb = +((edit.balance || 0) + amt).toFixed(2);
    try { await base44.entities.User.update(edit.id, { balance: nb }); toast({ title: `Đã ${amt >= 0 ? "cộng" : "trừ"} ${Math.abs(amt)} coin` }); setEdit(null); setBal(""); setReason(""); load(); }
    catch { toast({ title: "Lỗi", variant: "destructive" }); }
  };
  const notify = async (u) => {
    try { await base44.entities.NotificationLog.create({ title: "Thông báo từ Admin", body: `Gửi tới ${u.email}`, audience: "segment", target: u.email, status: "sent" }); toast({ title: "Đã gửi thông báo", description: u.email }); }
    catch { toast({ title: "Lỗi gửi", variant: "destructive" }); }
  };
  const remove = async () => {
    try { await base44.entities.User.delete(del.id); toast({ title: "Đã xoá người dùng" }); setDel(null); load(); }
    catch (e) { toast({ title: "Lỗi", description: e.message, variant: "destructive" }); }
  };
  const doInvite = async () => {
    if (!iEmail) return toast({ title: "Nhập email", variant: "destructive" });
    try { await base44.users.inviteUser(iEmail, iRole); toast({ title: "Đã gửi lời mời", description: iEmail }); setInvite(false); setIEmail(""); }
    catch (e) { toast({ title: "Lỗi", description: e.message, variant: "destructive" }); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold">Quản lý người dùng</h1>
        <Button size="sm" className="ml-auto bg-gradient-to-r from-[#7033ff] to-[#4b00ff] text-white" onClick={() => setInvite(true)}><UserPlus className="w-4 h-4 mr-1" /> Mời người dùng</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input className={`${inputCls} pl-9`} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm theo tên / email…" />
        </div>
        <select className={`${inputCls} sm:w-44`} value={filter} onChange={(e) => { setFilter(e.target.value); setPage(0); }}>
          <option value="all" className="bg-[#161936]">Tất cả</option>
          <option value="active" className="bg-[#161936]">Đang hoạt động</option>
          <option value="locked" className="bg-[#161936]">Đã khoá</option>
        </select>
      </div>

      <Panel className="overflow-hidden">
        <TableWrap>
          <thead className="bg-white/[0.03]"><tr><Th>Tên</Th><Th>Email</Th><Th>SĐT</Th><Th>Số dư</Th><Th>Trạng thái</Th><Th>Đăng ký</Th><Th className="text-right">Hành động</Th></tr></thead>
          <tbody>
            {rows.length === 0 ? <Empty colSpan={7} /> : rows.map((u) => (
              <tr key={u.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                <Td className="font-medium text-white">{u.full_name || "—"}</Td>
                <Td className="text-white/70">{u.email}</Td>
                <Td className="text-white/50">—</Td>
                <Td>{(u.balance || 0).toLocaleString()} <span className="text-white/40 text-[11px]">coin</span></Td>
                <Td><Badge tone={u.locked ? "red" : "green"}>{u.locked ? "Đã khoá" : "Hoạt động"}</Badge></Td>
                <Td className="text-white/50 text-[12px]">{u.created_date ? new Date(u.created_date).toLocaleDateString("vi-VN") : "—"}</Td>
                <Td>
                  <div className="flex items-center justify-end gap-1">
                    <IconBtn title="Chi tiết" onClick={() => setDetail(u)}><Eye size={16} /></IconBtn>
                    <IconBtn title={u.locked ? "Mở khoá" : "Khoá"} onClick={() => toggleLock(u)}>{u.locked ? <Unlock size={16} /> : <Lock size={16} />}</IconBtn>
                    <IconBtn title="Số dư" onClick={() => { setEdit(u); setBal(""); setReason(""); }}><Wallet size={16} /></IconBtn>
                    <IconBtn title="Gửi thông báo" onClick={() => notify(u)}><Bell size={16} /></IconBtn>
                    <IconBtn title="Xoá" danger onClick={() => setDel(u)}><Trash2 size={16} /></IconBtn>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <div className="flex items-center justify-between px-3 py-2 text-[12px] text-white/50">
          <span>{filtered.length} người dùng</span>
          <div className="flex items-center gap-1">
            <button disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
            <span>{page + 1} / {pages}</span>
            <button disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)} className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </Panel>

      <Dialog open={!!detail} onOpenChange={(v) => !v && setDetail(null)}>
        <DialogContent className="bg-[#161936] border-white/15 text-white max-w-md">
          <DialogHeader><DialogTitle>Chi tiết người dùng</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-0">
              <Row label="Tên" value={detail.full_name || "—"} />
              <Row label="Email" value={detail.email} />
              <Row label="Vai trò" value={<Badge tone={detail.role === "admin" ? "purple" : "neutral"}>{detail.role}</Badge>} />
              <Row label="Số dư" value={`${(detail.balance || 0).toLocaleString()} coin`} />
              <Row label="Trạng thái" value={<Badge tone={detail.locked ? "red" : "green"}>{detail.locked ? "Đã khoá" : "Hoạt động"}</Badge>} />
              <Row label="Đăng ký" value={detail.created_date ? new Date(detail.created_date).toLocaleString("vi-VN") : "—"} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!edit} onOpenChange={(v) => !v && setEdit(null)}>
        <DialogContent className="bg-[#161936] border-white/15 text-white max-w-sm">
          <DialogHeader><DialogTitle>Điều chỉnh số dư</DialogTitle></DialogHeader>
          {edit && <p className="text-sm text-white/60">{edit.email} · hiện có {(edit.balance || 0).toLocaleString()} coin</p>}
          <input className={inputCls} type="number" value={bal} onChange={(e) => setBal(e.target.value)} placeholder="Số tiền (dương: cộng, âm: trừ)" />
          <input className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Lý do" />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEdit(null)} className="text-white/70 hover:text-white">Huỷ</Button>
            <Button className="bg-gradient-to-r from-[#7033ff] to-[#4b00ff] text-white" onClick={saveBalance}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={invite} onOpenChange={setInvite}>
        <DialogContent className="bg-[#161936] border-white/15 text-white max-w-sm">
          <DialogHeader><DialogTitle>Mời người dùng</DialogTitle></DialogHeader>
          <input className={inputCls} value={iEmail} onChange={(e) => setIEmail(e.target.value)} placeholder="Email" />
          <select className={inputCls} value={iRole} onChange={(e) => setIRole(e.target.value)}>
            <option value="user" className="bg-[#161936]">Người dùng</option>
            <option value="admin" className="bg-[#161936]">Quản trị viên</option>
          </select>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setInvite(false)} className="text-white/70 hover:text-white">Huỷ</Button>
            <Button className="bg-gradient-to-r from-[#ffab40] to-[#e67e22] text-white" onClick={doInvite}>Mời</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!del} onOpenChange={(v) => !v && setDel(null)} title="Xoá người dùng" desc={`Bạn có chắc muốn xoá ${del?.email}? Hành động này không thể hoàn tác.`} confirmText="Xoá" onConfirm={remove} />
    </div>
  );
}