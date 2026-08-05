import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Send, Trash2, Users, User } from "lucide-react";
import { Panel, TableWrap, Th, Td, Empty, Badge, inputCls } from "../ui";
import { broadcastNotification, sendToUser, getAdminLog, removeAdminLog } from "@/lib/localNotifications";

export default function Notifications() {
  const { toast } = useToast();
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("all");
  const [target, setTarget] = useState("");

  const load = () => setList(getAdminLog());
  useEffect(() => { load(); }, []);

  const send = async () => {
    if (!title.trim()) return toast({ title: "Nhập tiêu đề thông báo", variant: "destructive" });
    const payload = { type: "info", title: title.trim(), body: body.trim() };
    if (audience === "all") {
      broadcastNotification(payload);
      toast({ title: "Đã gửi thông báo tới toàn bộ người dùng", variant: "success" });
    } else {
      if (!target.trim()) return toast({ title: "Nhập username người nhận", variant: "destructive" });
      const ok = sendToUser(target.trim(), payload);
      if (!ok) return toast({ title: "Không tìm thấy người dùng này", variant: "destructive" });
      toast({ title: `Đã gửi thông báo tới ${target.trim()}`, variant: "success" });
    }
    setTitle(""); setBody(""); setTarget(""); setAudience("all"); load();
  };

  const remove = (id) => { removeAdminLog(id); load(); };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Quản lý thông báo</h1>
      <div className="grid lg:grid-cols-3 gap-4">
        <Panel className="p-4 lg:col-span-1 space-y-3 h-fit">
          <p className="text-sm font-semibold">Tạo thông báo mới</p>
          <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề" />
          <textarea className={`${inputCls} h-24 py-2 resize-none`} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Nội dung" />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAudience("all")}
              className={`flex-1 h-10 rounded-lg border flex items-center justify-center gap-1.5 text-sm ${audience === "all" ? "border-fuchsia-500 bg-fuchsia-500/15 text-white" : "border-white/15 bg-white/5 text-white/60"}`}
            >
              <Users size={15} /> Tất cả
            </button>
            <button
              type="button"
              onClick={() => setAudience("user")}
              className={`flex-1 h-10 rounded-lg border flex items-center justify-center gap-1.5 text-sm ${audience === "user" ? "border-fuchsia-500 bg-fuchsia-500/15 text-white" : "border-white/15 bg-white/5 text-white/60"}`}
            >
              <User size={15} /> Đích danh
            </button>
          </div>
          {audience === "user" && (
            <input className={inputCls} value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Username người nhận" />
          )}
          <Button className="w-full bg-gradient-to-r from-[#7033ff] to-[#4b00ff] text-white" onClick={send}>
            <Send size={16} className="mr-1" /> Gửi thông báo
          </Button>
        </Panel>

        <Panel className="lg:col-span-2 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 text-sm font-semibold">Lịch sử đã gửi</div>
          <TableWrap>
            <thead className="bg-white/[0.03]"><tr><Th>Tiêu đề</Th><Th>Đối tượng</Th><Th>Thời gian</Th><Th></Th></tr></thead>
            <tbody>
              {list.length === 0 ? <Empty colSpan={4} /> : list.map((n) => (
                <tr key={n.id} className="border-t border-white/5">
                  <Td><div><p className="text-white">{n.title}</p><p className="text-[11px] text-white/45">{n.body}</p></div></Td>
                  <Td><Badge tone={n.audience === "all" ? "purple" : "blue"}>{n.audience === "all" ? "Tất cả" : n.target}</Badge></Td>
                  <Td className="text-white/50 text-[12px]">{new Date(n.time).toLocaleString("vi-VN")}</Td>
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