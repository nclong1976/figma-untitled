import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Upload } from "lucide-react";
import { Panel, TableWrap, Th, Td, Empty, inputCls, ConfirmDialog } from "../ui";

const DEFAULT_TIERS = [
  { id: "so", label: "Sơ cấp", min: 100, max: 999, atomLimit: 1000 },
  { id: "trung", label: "Trung cấp", min: 1000, max: 4999, atomLimit: 5000 },
  { id: "cao", label: "Cao cấp", min: 5000, max: 19999, atomLimit: 20000 },
  { id: "sieucap", label: "Siêu cấp", min: 20000, max: 100000, atomLimit: 100000 },
];

export default function GameHalls() {
  const { toast } = useToast();
  const [halls, setHalls] = useState([]);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);

  const load = () => base44.entities.GameHall.list("sortOrder").then(setHalls).catch(() => {});
  useEffect(() => { load(); }, []);

  const openNew = () => setEdit({ name: "", image: "", enabled: true, playCount: 0, sortOrder: halls.length + 1, tiers: DEFAULT_TIERS.map((t) => ({ ...t })) });
  const openEdit = (h) => setEdit({ ...h, tiers: (h.tiers && h.tiers.length ? h.tiers : DEFAULT_TIERS).map((t) => ({ ...t })) });

  const onUpload = async (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    try { const { file_url } = await base44.integrations.Core.UploadFile({ file: f }); setEdit((s) => ({ ...s, image: file_url })); toast({ title: "Đã tải ảnh" }); }
    catch { toast({ title: "Tải ảnh lỗi", variant: "destructive" }); }
  };

  const save = async () => {
    if (!edit.name) return toast({ title: "Nhập tên sảnh", variant: "destructive" });
    try {
      if (edit.id) await base44.entities.GameHall.update(edit.id, edit);
      else await base44.entities.GameHall.create(edit);
      toast({ title: "Đã lưu sảnh" }); setEdit(null); load();
    } catch (e) { toast({ title: "Lỗi", description: e.message, variant: "destructive" }); }
  };

  const toggle = async (h) => { try { await base44.entities.GameHall.update(h.id, { enabled: !h.enabled }); load(); } catch {} };
  const move = async (h, dir) => {
    const idx = halls.findIndex((x) => x.id === h.id); const sw = halls[idx + dir]; if (!sw) return;
    try { await base44.entities.GameHall.update(h.id, { sortOrder: sw.sortOrder }); await base44.entities.GameHall.update(sw.id, { sortOrder: h.sortOrder }); load(); } catch {}
  };
  const remove = async () => { try { await base44.entities.GameHall.delete(del.id); toast({ title: "Đã xoá sảnh" }); setDel(null); load(); } catch {} };

  const setTier = (i, key, val) => setEdit((s) => {
    const t = [...s.tiers]; t[i] = { ...t[i], [key]: key === "label" || key === "id" ? val : Number(val) }; return { ...s, tiers: t };
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold">Quản lý sảnh chơi</h1>
        <Button size="sm" className="ml-auto bg-gradient-to-r from-[#7033ff] to-[#4b00ff] text-white" onClick={openNew}><Plus className="w-4 h-4 mr-1" /> Thêm sảnh</Button>
      </div>

      <Panel className="overflow-hidden">
        <TableWrap>
          <thead className="bg-white/[0.03]"><tr><Th>#</Th><Th>Sảnh</Th><Th>Trạng thái</Th><Th>Lượt chơi</Th><Th>Thứ tự</Th><Th className="text-right">Hành động</Th></tr></thead>
          <tbody>
            {halls.length === 0 ? <Empty colSpan={6} /> : halls.map((h, i) => (
              <tr key={h.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                <Td className="text-white/40">{i + 1}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    {h.image ? <img src={h.image} alt="" className="w-9 h-9 rounded-lg object-cover" /> : <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7033ff] to-[#4b00ff]" />}
                    <span className="font-medium text-white">{h.name}</span>
                  </div>
                </Td>
                <Td><Switch checked={!!h.enabled} onCheckedChange={() => toggle(h)} /></Td>
                <Td>{(h.playCount || 0).toLocaleString()}</Td>
                <Td>
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-white/10 disabled:opacity-30" disabled={i === 0} onClick={() => move(h, -1)}><ArrowUp size={14} /></button>
                    <button className="p-1 rounded hover:bg-white/10 disabled:opacity-30" disabled={i === halls.length - 1} onClick={() => move(h, 1)}><ArrowDown size={14} /></button>
                  </div>
                </Td>
                <Td>
                  <div className="flex justify-end gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/70" onClick={() => openEdit(h)}><Pencil size={16} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-500/15 text-red-300" onClick={() => setDel(h)}><Trash2 size={16} /></button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Panel>

      <Dialog open={!!edit} onOpenChange={(v) => !v && setEdit(null)}>
        <DialogContent className="bg-[#161936] border-white/15 text-white max-w-lg">
          <DialogHeader><DialogTitle>{edit?.id ? "Sửa sảnh" : "Thêm sảnh"}</DialogTitle></DialogHeader>
          {edit && (
            <div className="space-y-3">
              <input className={inputCls} value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} placeholder="Tên sảnh" />
              <div className="flex gap-2">
                <input className={inputCls} value={edit.image} onChange={(e) => setEdit({ ...edit, image: e.target.value })} placeholder="URL ảnh" />
                <label className="h-9 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-sm flex items-center gap-1 cursor-pointer whitespace-nowrap"><Upload size={16} /> Tải lên<input type="file" className="hidden" accept="image/*" onChange={onUpload} /></label>
              </div>
              <div className="flex items-center gap-2"><span className="text-sm text-white/65">Bật sảnh</span><Switch checked={!!edit.enabled} onCheckedChange={(v) => setEdit({ ...edit, enabled: v })} /></div>
              <div>
                <p className="text-sm font-semibold mb-2">Cấp độ đặt cược (giới hạn "Nguyên tử")</p>
                <div className="space-y-2">
                  {edit.tiers.map((t, i) => (
                    <div key={i} className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <input className={inputCls} value={t.label} onChange={(e) => setTier(i, "label", e.target.value)} placeholder="Cấp" />
                      <input className={inputCls} type="number" value={t.min} onChange={(e) => setTier(i, "min", e.target.value)} placeholder="Min" />
                      <input className={inputCls} type="number" value={t.max} onChange={(e) => setTier(i, "max", e.target.value)} placeholder="Max" />
                      <input className={inputCls} type="number" value={t.atomLimit} onChange={(e) => setTier(i, "atomLimit", e.target.value)} placeholder="Nguyên tử" />
                      <input className={inputCls} value={t.id} onChange={(e) => setTier(i, "id", e.target.value)} placeholder="id" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEdit(null)} className="text-white/70 hover:text-white">Huỷ</Button>
            <Button className="bg-gradient-to-r from-[#7033ff] to-[#4b00ff] text-white" onClick={save}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!del} onOpenChange={(v) => !v && setDel(null)} title="Xoá sảnh" desc={`Xoá "${del?.name}"?`} confirmText="Xoá" onConfirm={remove} />
    </div>
  );
}