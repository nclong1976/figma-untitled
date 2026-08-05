import React, { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Send } from "lucide-react";
import { Image } from "@/components/ui/image";
import { base44 } from "@/api/base44Client";

export default function SupportChat({ open, onOpenChange }) {
  const [messages, setMessages] = useState([
    { id: "m0", role: "support", type: "text", text: "Chào bạn, đội ngũ CSKH 24/7 sẵn sàng hỗ trợ. Bạn cần giúp gì ạ?", time: "now" },
  ]);
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  const push = (m) => setMessages((prev) => [...prev, m]);
  const reply = () => setTimeout(() => push({ id: "r" + Date.now(), role: "support", type: "text", text: "Cảm ơn bạn, chúng tôi đã tiếp nhận và sẽ phản hồi ngay.", time: "now" }), 900);

  const sendText = () => {
    if (!text.trim()) return;
    push({ id: "u" + Date.now(), role: "user", type: "text", text: text.trim(), time: "now" });
    setText("");
    reply();
  };

  const sendImage = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      push({ id: "u" + Date.now(), role: "user", type: "image", url: file_url, time: "now" });
      reply();
    } catch {
      push({ id: "e" + Date.now(), role: "support", type: "text", text: "Gửi ảnh thất bại, vui lòng thử lại.", time: "now" });
    }
    setUploading(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="bg-[#1e1832] border-[#323b51] text-white rounded-t-2xl p-0 h-[75vh] flex flex-col">
        <SheetHeader className="px-4 py-3 border-b border-[#323b51] text-left">
          <SheetTitle className="text-[#bd9c59] text-base">Hỗ trợ trực tuyến · CSKH 24/7</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-[#bd9c59] text-[#1e1832]" : "bg-[#2a2040] text-white"}`}>
                {m.type === "image" ? (
                  <Image src={m.url} alt="chat" fittingType="fit" className="rounded-lg w-40 max-h-48" />
                ) : (
                  m.text
                )}
              </div>
            </div>
          ))}
          {uploading && <p className="text-center text-xs text-white/50">Đang gửi ảnh...</p>}
          <div ref={endRef} />
        </div>

        <div className="flex items-center gap-2 px-3 py-3 border-t border-[#323b51]">
          <button onClick={() => fileRef.current?.click()} disabled={uploading} className="p-2 text-[#bd9c59] disabled:opacity-50" aria-label="Gửi ảnh">
            <ImageIcon className="w-5 h-5" />
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={sendImage} />
          <Input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendText()} placeholder="Nhập tin nhắn..." className="bg-[#2a2040] border-[#3a2d52]" />
          <Button onClick={sendText} size="icon" className="bg-[#bd9c59] text-[#1e1832] hover:bg-[#cfb06a]"><Send className="w-4 h-4" /></Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}