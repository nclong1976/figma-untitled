import React, { useEffect, useMemo, useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Image as ImageIcon, Send, Search } from "lucide-react";
import { Panel, inputCls } from "../ui";
import { Image as Img } from "@/components/ui/image";

export default function Chat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [q, setQ] = useState("");
  const fileRef = useRef(null);
  const endRef = useRef(null);

  const load = () => {
    base44.entities.Message.list().then(setMessages).catch(() => {});
    base44.entities.User.list().then(setUsers).catch(() => {});
  };
  useEffect(() => {
    load();
    const unsub = base44.entities.Message.subscribe(() => load());
    return () => unsub && unsub();
  }, []);

  const conversations = useMemo(() => {
    const map = new Map();
    messages.forEach((m) => {
      const ex = map.get(m.userId);
      if (!ex || new Date(m.created_date) > new Date(ex.last)) {
        map.set(m.userId, { userId: m.userId, userEmail: m.userEmail, last: m.created_date, lastBody: m.body || (m.image ? "📷 Hình ảnh" : "") });
      }
    });
    return Array.from(map.values()).sort((a, b) => new Date(b.last) - new Date(a.last));
  }, [messages]);

  const filteredUsers = useMemo(() => users.filter((u) => !q || (u.email || "").toLowerCase().includes(q.toLowerCase())), [users, q]);

  const thread = useMemo(() => messages.filter((m) => m.userId === activeUser?.id).sort((a, b) => new Date(a.created_date) - new Date(b.created_date)), [messages, activeUser]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [thread.length, activeUser]);

  const send = async () => {
    if (!activeUser || !text.trim()) return;
    try { await base44.entities.Message.create({ userId: activeUser.id, userEmail: activeUser.email, senderRole: "admin", body: text.trim() }); setText(""); }
    catch { toast({ title: "Lỗi gửi", variant: "destructive" }); }
  };

  const sendImage = async (e) => {
    const f = e.target.files?.[0]; e.target.value = ""; if (!f || !activeUser) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: f });
      await base44.entities.Message.create({ userId: activeUser.id, userEmail: activeUser.email, senderRole: "admin", image: file_url });
    } catch { toast({ title: "Lỗi gửi ảnh", variant: "destructive" }); }
    setUploading(false);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Nhắn tin với người dùng</h1>
      <div className="grid lg:grid-cols-3 gap-4 h-[calc(100dvh-180px)] min-h-[420px]">
        <Panel className="lg:col-span-1 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input className={`${inputCls} pl-8`} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm người dùng…" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length > 0 && <p className="px-3 pt-2 pb-1 text-[10px] uppercase text-white/40">Cuộc hội thoại</p>}
            {conversations.map((c) => (
              <button key={c.userId} onClick={() => setActiveUser({ id: c.userId, email: c.userEmail })} className={`w-full text-left px-3 py-2.5 border-b border-white/5 hover:bg-white/5 ${activeUser?.id === c.userId ? "bg-white/10" : ""}`}>
                <p className="text-sm text-white truncate">{c.userEmail}</p>
                <p className="text-[11px] text-white/45 truncate">{c.lastBody}</p>
              </button>
            ))}
            <p className="px-3 pt-2 pb-1 text-[10px] uppercase text-white/40">Tất cả người dùng</p>
            {filteredUsers.map((u) => (
              <button key={u.id} onClick={() => setActiveUser(u)} className={`w-full text-left px-3 py-2.5 border-b border-white/5 hover:bg-white/5 ${activeUser?.id === u.id ? "bg-white/10" : ""}`}>
                <p className="text-sm text-white truncate">{u.full_name || u.email}</p>
                <p className="text-[11px] text-white/45 truncate">{u.email}</p>
              </button>
            ))}
          </div>
        </Panel>

        <Panel className="lg:col-span-2 overflow-hidden flex flex-col">
          {activeUser ? (
            <>
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-sm font-semibold text-white">{activeUser.full_name || activeUser.email}</p>
                <p className="text-[11px] text-white/45">{activeUser.email}</p>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                {thread.length === 0 && <p className="text-center text-white/40 text-sm py-8">Chưa có tin nhắn. Hãy gửi lời chào!</p>}
                {thread.map((m) => (
                  <div key={m.id} className={`flex ${m.senderRole === "admin" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.senderRole === "admin" ? "bg-gradient-to-br from-[#7033ff] to-[#4b00ff] text-white" : "bg-white/10 text-white"}`}>
                      {m.image ? <Img src={m.image} alt="" fittingType="fit" className="rounded-lg w-44 max-h-52" /> : (m.body || "")}
                    </div>
                  </div>
                ))}
                {uploading && <p className="text-center text-xs text-white/50">Đang gửi ảnh...</p>}
                <div ref={endRef} />
              </div>
              <div className="flex items-center gap-2 px-3 py-3 border-t border-white/10">
                <button onClick={() => fileRef.current?.click()} disabled={uploading} className="p-2 text-[#ffab40] disabled:opacity-50"><ImageIcon className="w-5 h-5" /></button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={sendImage} />
                <input className={inputCls} value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Nhập tin nhắn..." />
                <button onClick={send} className="h-9 px-3 rounded-lg bg-gradient-to-r from-[#ffab40] to-[#e67e22] text-white flex items-center gap-1 text-sm"><Send size={16} /></button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-white/40 text-sm">Chọn một người dùng để bắt đầu trò chuyện</div>
          )}
        </Panel>
      </div>
    </div>
  );
}