import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Send, Trash2 } from "lucide-react";
import { Panel, TableWrap, Th, Td, Empty, Badge, inputCls } from "../ui";

export default function Notifications() {
  const { toast } = useToast();
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("all");
  const [target, setTarget] = useState("");

  const load = () => base44.entities.NotificationLog.list("-created_date").then(setList).catch(() => {});
  useEffect(() => { load(); }, []);

  const send = async () => {
    if (!title) return toast({ title: "Nhập tiêu đề", variant: "destructive" });
    try {
      await base44.entities.NotificationLog.create({ title, body, audience, target: audience === "all" ? "" : target, status: "sent" });
      toast({ title: "Đã gửi thông báo" }); setTitle(""); setBody(""); setTarget(""); setAudience("all"); load();
    } catch { toast({ title: "Lỗi", variant: "destructive" }); }
  };
  const remove = async (id) => { try { await base44.entities.NotificationLog.delete(id); load(); } catch {} };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Quản lý thông báo</h1>
      <div className="grid lg:grid-cols-3 gap-4">
        <Panel className="p-4 lg:col-span-1 space-y-3 h-fit">
          <p className="text-sm font-semibold">Tạo thông báo mới</p>
          <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề" />
          <textarea className={`${inputCls} h-24 py-2 resize-none`} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Nội dung" />
          <select className={inputCls} value={audience} onChange={(e) => setAudience(e.target.value)}>
            <option value="all" className="bg-[#161936]">Tất cả người dùng</option>
            <option value="role" className="bg-[#161936]">Theo vai trò</option>
            <option value="segment" className="bg-[#161936]">Theo nhóm</option>
          </select>
          {audience !== "all" && <input className={inputCls} value={target} onChange={(e) => setTarget(e.target.value)} placeholder={audience === "role" ? "admin / user" : "vip, low-balance…"} />}
          <Button className="w-full bg-gradient-to-r from-[#7033ff] to-[#4b00ff] text-white" onClick={send}><Send size={16} className="mr-1" /> Gửi thông báo</Button>
        </Panel>

        <Panel className="lg:col-span-2 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 text-sm font-semibold">Lịch sử đã gửi</div>
          <TableWrap>
            <thead className="bg-white/[0.03]"><tr><Th>Tiêu đề</Th><Th>Đối tượng</Th><Th>Trạng thái</Th><Th>Thời gian</Th><Th></Th></tr></thead>
            <tbody>
              {list.length === 0 ? <Empty colSpan={5} /> : list.map((n) => (
                <tr key={n.id} className="border-t border-white/5">
                  <Td><div><p className="text-white">{n.title}</p><p className="text-[11px] text-white/45">{n.body}</p></div></Td>
                  <Td><Badge tone="purple">{n.audience === "all" ? "Tất cả" : n.target || n.audience}</Badge></Td>
                  <Td><Badge tone={n.status === "sent" ? "green" : "amber"}>{n.status}</Badge></Td>
                  <Td className="text-white/50 text-[12px]">{new Date(n.created_date).toLocaleString("vi-VN")}</Td>
                  <Td><button className="p-1.5 rounded-lg hover:bg-red-500/15 text-red-300" onClick={() => remove(n.id)}><Trash2 size={15} /></button></Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Panel>
      </div>
    </div>
  );
}