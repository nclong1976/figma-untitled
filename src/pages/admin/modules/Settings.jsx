import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Upload, Save } from "lucide-react";
import { Panel, inputCls } from "../ui";

const KEY = "sands_settings";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };

export default function Settings() {
  const { toast } = useToast();
  const [s, setS] = useState({ announcement: "", banner: "", language: "vi", atomRate: 1, maintenance: false, ...load() });
  const [halls, setHalls] = useState([]);

  useEffect(() => { base44.entities.GameHall.list().then(setHalls).catch(() => {}); }, []);

  const set = (k, v) => setS((p) => ({ ...p, [k]: v }));
  const save = () => { localStorage.setItem(KEY, JSON.stringify(s)); toast({ title: "Đã lưu cài đặt" }); };
  const onUpload = async (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    try { const { file_url } = await base44.integrations.Core.UploadFile({ file: f }); set("banner", file_url); toast({ title: "Đã tải banner" }); }
    catch { toast({ title: "Lỗi", variant: "destructive" }); }
  };
  const toggleHall = async (h) => {
    try { await base44.entities.GameHall.update(h.id, { enabled: !h.enabled }); setHalls((l) => l.map((x) => x.id === h.id ? { ...x, enabled: !x.enabled } : x)); }
    catch {}
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Cài đặt ứng dụng</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel className="p-4 space-y-3">
          <p className="text-sm font-semibold">Trang chủ</p>
          <div>
            <label className="text-[12px] text-white/65">Nội dung thanh thông báo</label>
            <input className={inputCls} value={s.announcement || ""} onChange={(e) => set("announcement", e.target.value)} placeholder="Thông báo chạy trên trang chủ…" />
          </div>
          <div>
            <label className="text-[12px] text-white/65">Ảnh banner</label>
            <div className="flex gap-2">
              <input className={inputCls} value={s.banner || ""} onChange={(e) => set("banner", e.target.value)} placeholder="URL banner" />
              <label className="h-9 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-sm flex items-center gap-1 cursor-pointer whitespace-nowrap"><Upload size={16} /> Tải<input type="file" className="hidden" accept="image/*" onChange={onUpload} /></label>
            </div>
            {s.banner && <img src={s.banner} alt="" className="mt-2 w-full h-28 object-cover rounded-lg" />}
          </div>
          <div>
            <label className="text-[12px] text-white/65">Ngôn ngữ hiển thị</label>
            <select className={inputCls} value={s.language || "vi"} onChange={(e) => set("language", e.target.value)}>
              <option value="vi" className="bg-[#161936]">Tiếng Việt</option>
              <option value="en" className="bg-[#161936]">English</option>
              <option value="zh" className="bg-[#161936]">中文</option>
            </select>
          </div>
        </Panel>

        <Panel className="p-4 space-y-3">
          <p className="text-sm font-semibold">Hệ thống</p>
          <div>
            <label className="text-[12px] text-white/65">Tỷ lệ quy đổi "Nguyên tử"</label>
            <input type="number" className={inputCls} value={s.atomRate ?? 1} onChange={(e) => set("atomRate", Number(e.target.value))} />
          </div>
          <div className="flex items-center justify-between py-1"><span className="text-sm text-white/80">Chế độ bảo trì</span><Switch checked={!!s.maintenance} onCheckedChange={(v) => set("maintenance", v)} /></div>
          <div>
            <p className="text-sm font-semibold mb-2">Bật/tắt sảnh</p>
            <div className="space-y-1.5">
              {halls.map((h) => (
                <div key={h.id} className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-sm text-white/85">{h.name}</span>
                  <Switch checked={!!h.enabled} onCheckedChange={() => toggleHall(h)} />
                </div>
              ))}
              {halls.length === 0 && <p className="text-white/40 text-sm">Chưa có sảnh</p>}
            </div>
          </div>
        </Panel>
      </div>
      <Button className="bg-gradient-to-r from-[#ffab40] to-[#e67e22] text-white" onClick={save}><Save size={16} className="mr-1" /> Lưu cài đặt</Button>
    </div>
  );
}