import React, { useEffect, useMemo, useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Image as ImageIcon, Send, Search } from "lucide-react";
import { Panel, inputCls } from "../ui";
import { Image as Img } from "@/components/ui/image";
import { getChatMessages, getConversations, addChatMessage, subscribeChat } from "@/lib/localChat";
import { localListUsers } from "@/lib/localAuth";

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
    setMessages(getChatMessages());
    setUsers(localListUsers());
  };

  useEffect(() => {
    load();
    const unsub = subscribeChat(load);
    return () => unsub && unsub();
  }, []);

  const conversations = useMemo(() => getConversations(), [messages]);

  const filteredUsers = useMemo(
    () => users.filter((u) => !q || (u.full_name || u.email || u.account || "").toLowerCase().includes(q.toLowerCase())),
    [users, q]
  );

  const thread = useMemo(
    () => messages.filter((m) => m.userId === activeUser?.id).sort((a, b) => new Date(a.created_date) - new Date(b.created_date)),
    [messages, activeUser]
  );

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [thread.length, activeUser]);

  const send = () => {
    if (!activeUser || !text.trim()) return;
    addChatMessage({
      userId: activeUser.id,
      userEmail: activeUser.email,
      userName: activeUser.full_name || activeUser.account,
      senderRole: "admin",
      body: text.trim(),
    });
    setText("");
  };

  const sendImage = (e) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f || !activeUser) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      addChatMessage({
        userId: activeUser.id,
        userEmail: activeUser.email,
        userName: activeUser.full_name || activeUser.account,
        senderRole: "admin",
        image: reader.result,
      });
      setUploading(false);
    };
    reader.onerror = () => { setUploading(false); toast({ title: "Lỗi gửi ảnh", variant: "destructive" }); };
    reader.readAsDataURL(f);
  };

  const pickUser = (u) => setActiveUser({ id: u.id, email: u.email, full_name: u.full_name || u.account, account: u.account });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Quản lý tin nhắn / Hỗ trợ Client</h1>
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
              <button key={c.userId} onClick={() => setActiveUser({ id: c.userId, email: c.userEmail, full_name: c.userName })} className={`w-full text-left px-3 py-2.5 border-b border-white/5 hover:bg-white/5 ${activeUser?.id === c.userId ? "bg-white/10" : ""}`}>
                <p className="text-sm text-white truncate">{c.userName || c.userEmail}</p>
                <p className="text-[11px] text-white/45 truncate">{c.lastBody}</p>
              </button>
            ))}
            <p className="px-3 pt-2 pb-1 text-[10px] uppercase text-white/40">Tất cả người dùng</p>
            {filteredUsers.map((u) => (
              <button key={u.id} onClick={() => pickUser(u)} className={`w-full text-left px-3 py-2.5 border-b border-white/5 hover:bg-white/5 ${activeUser?.id === u.id ? "bg-white/10" : ""}`}>
                <p className="text-sm text-white truncate">{u.full_name || u.account}</p>
                <p className="text-[11px] text-white/45 truncate">{u.email}</p>
              </button>
            ))}
            {filteredUsers.length === 0 && conversations.length === 0 && (
              <p className="px-3 py-4 text-xs text-white/40">Chưa có người dùng nào.</p>
            )}
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