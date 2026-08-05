import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Send } from "lucide-react";
import { Image } from "@/components/ui/image";
import { base44 } from "@/api/base44Client";

export default function SupportChat({ open, onOpenChange }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const endRef = useRef(null);

  const load = () => {
    if (!user) return;
    base44.entities.Message.filter({ userId: user.id }).then(setMessages).catch(() => {});
  };
  useEffect(() => {
    load();
    if (!user) return;
    const unsub = base44.entities.Message.subscribe(() => load());
    return () => unsub && unsub();
  }, [user, open]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  const sorted = [...messages].sort((a, b) => new Date(a.created_date) - new Date(b.created_date));

  const sendText = async () => {
    if (!text.trim() || !user) return;
    try { await base44.entities.Message.create({ userId: user.id, userEmail: user.email, senderRole: "user", body: text.trim() }); setText(""); } catch {}
  };

  const sendImage = async (e) => {
    const file = e.target.files?.[0]; e.target.value = ""; if (!file || !user) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await base44.entities.Message.create({ userId: user.id, userEmail: user.email, senderRole: "user", image: file_url });
    } catch {}
    setUploading(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="bg-[#1e1832] border-[#323b51] text-white rounded-t-2xl p-0 h-[75vh] flex flex-col">
        <SheetHeader className="px-4 py-3 border-b border-[#323b51] text-left">
          <SheetTitle className="text-[#bd9c59] text-base">Hỗ trợ trực tuyến · CSKH 24/7</SheetTitle>
        </SheetHeader>

        {!user ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="text-sm text-white/70">Vui lòng đăng nhập để nhắn tin với đội hỗ trợ.</p>
            <Button className="bg-[#bd9c59] text-[#1e1832] hover:bg-[#cfb06a]" onClick={() => base44.auth.redirectToLogin(window.location.pathname)}>Đăng nhập</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
              {sorted.length === 0 && <p className="text-center text-white/40 text-sm py-8">Chào bạn, đội ngũ CSKH 24/7 sẵn sàng hỗ trợ. Bạn cần giúp gì ạ?</p>}
              {sorted.map((m) => (
                <div key={m.id} className={`flex ${m.senderRole === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.senderRole === "user" ? "bg-[#bd9c59] text-[#1e1832]" : "bg-[#2a2040] text-white"}`}>
                    {m.image ? <Image src={m.image} alt="chat" fittingType="fit" className="rounded-lg w-40 max-h-48" /> : (m.body || "")}
                  </div>
                </div>
              ))}
              {uploading && <p className="text-center text-xs text-white/50">Đang gửi ảnh...</p>}
              <div ref={endRef} />
            </div>
            <div className="flex items-center gap-2 px-3 py-3 border-t border-[#323b51]">
              <button onClick={() => fileRef.current?.click()} disabled={uploading} className="p-2 text-[#bd9c59] disabled:opacity-50" aria-label="Gửi ảnh"><ImageIcon className="w-5 h-5" /></button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={sendImage} />
              <Input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendText()} placeholder="Nhập tin nhắn..." className="bg-[#2a2040] border-[#3a2d52]" />
              <Button onClick={sendText} size="icon" className="bg-[#bd9c59] text-[#1e1832] hover:bg-[#cfb06a]"><Send className="w-4 h-4" /></Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}