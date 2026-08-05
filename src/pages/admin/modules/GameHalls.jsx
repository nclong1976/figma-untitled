import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Upload, Settings, History, Shield, Clock } from "lucide-react";
import { Panel, TableWrap, Th, Td, Empty, inputCls, ConfirmDialog } from "../ui";
import { GAMES } from "@/components/home/homeData";
import { getGameConfigs, updateGameConfig, formatMMSS } from "@/lib/gameStore";
import GameConfigModal from "@/components/admin/GameConfigModal";
import AuditLogModal from "@/components/admin/AuditLogModal";

const DEFAULT_TIERS = [
  { id: "so", label: "Sơ cấp", min: 100, max: 999, atomLimit: 1000 },
  { id: "trung", label: "Trung cấp", min: 1000, max: 4999, atomLimit: 5000 },
  { id: "cao", label: "Cao cấp", min: 5000, max: 19999, atomLimit: 20000 },
  { id: "sieucap", label: "Siêu cấp", min: 20000, max: 100000, atomLimit: 100000 },
];

const STATUS_BADGES = {
  active: { label: "Hoạt động", cls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  maintenance: { label: "Bảo trì", cls: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  disabled: { label: "Tắt hoàn toàn", cls: "bg-red-500/20 text-red-300 border-red-500/30" },
};

export default function GameHalls() {
  const { toast } = useToast();
  const [halls, setHalls] = useState([]);
  const [gameConfigs, setGameConfigs] = useState(() => getGameConfigs());
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);

  // Modal states for Config and Audit Log
  const [configGame, setConfigGame] = useState(null);
  const [openAuditLog, setOpenAuditLog] = useState(false);

  const load = async () => {
    try {
      const list = await base44.entities.GameHall.list("sortOrder");
      setHalls(list);
    } catch {
      // Fallback local games list
      setHalls(GAMES.map((g, idx) => ({ ...g, name: g.title, enabled: g.status === "active", sortOrder: idx + 1 })));
    }
    setGameConfigs(getGameConfigs());
  };

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

  // Change 3-state Game status (Active / Maintenance / Disabled)
  const handleStatusChange = (gameId, newStatus) => {
    const targetGame = GAMES.find((g) => g.gameId === gameId || g.id === gameId) || { gameId, title: gameId };
    updateGameConfig(
      gameId,
      { status: newStatus },
      { adminId: "Admin_Principal", ip: "192.168.1.10" }
    );
    setGameConfigs(getGameConfigs());
    toast({
      title: `Đã đổi trạng thái "${targetGame.title || gameId}"`,
      description: `Trạng thái mới: ${STATUS_BADGES[newStatus]?.label}`,
      variant: newStatus === "active" ? "success" : "destructive",
    });
  };

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
      {/* Header with buttons */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-xl font-bold text-white">Quản lý sảnh & Cấu hình Trò chơi</h1>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-white/20 text-white/80 hover:bg-white/10"
            onClick={() => setOpenAuditLog(true)}
          >
            <History className="w-4 h-4 mr-1 text-[#bd9c59]" /> Nhật ký thao tác (Audit Log)
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-[#7033ff] to-[#4b00ff] text-white"
            onClick={openNew}
          >
            <Plus className="w-4 h-4 mr-1" /> Thêm sảnh
          </Button>
        </div>
      </div>

      {/* Main Table: Game Status, Countdown Timers, Payout Odds & Actions */}
      <Panel className="overflow-hidden">
        <TableWrap>
          <thead className="bg-white/[0.03]">
            <tr>
              <Th>#</Th>
              <Th>Trò chơi / Sảnh</Th>
              <Th>Trạng thái (3-State)</Th>
              <Th>Thời gian cược (Timer)</Th>
              <Th>Tỷ lệ trả thưởng (RTP/Odds)</Th>
              <Th className="text-right">Hành động</Th>
            </tr>
          </thead>
          <tbody>
            {GAMES.map((g, i) => {
              const cfg = gameConfigs[g.gameId] || gameConfigs[g.id] || {
                gameId: g.gameId,
                status: g.status || "active",
                timerDuration: 299,
                odds: { tai_xiu: 0.98, chan_le: 0.98, hoa: 95, cap_so: 12 },
              };
              const statusInfo = STATUS_BADGES[cfg.status] || STATUS_BADGES.active;

              return (
                <tr key={g.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                  <Td className="text-white/40">{i + 1}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      {g.bg ? (
                        <img src={g.bg} alt="" className="w-9 h-9 rounded-lg object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7033ff] to-[#4b00ff]" />
                      )}
                      <div>
                        <p className="font-medium text-white text-sm">{g.title}</p>
                        <p className="text-[10px] text-white/40 font-mono">ID: {g.gameId}</p>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    {/* 3-State Status Selector */}
                    <select
                      value={cfg.status}
                      onChange={(e) => handleStatusChange(g.gameId, e.target.value)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg outline-none border cursor-pointer ${statusInfo.cls}`}
                    >
                      <option value="active" className="bg-[#12142d] text-emerald-400">🟢 Active (Hoạt động)</option>
                      <option value="maintenance" className="bg-[#12142d] text-amber-400">🟡 Maintenance (Bảo trì)</option>
                      <option value="disabled" className="bg-[#12142d] text-red-400">🔴 Disabled (Tắt hoàn toàn)</option>
                    </select>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-white/80">
                      <Clock className="w-3.5 h-3.5 text-[#bd9c59]" />
                      <span>{formatMMSS(cfg.timerDuration || 299)}</span>
                    </div>
                  </Td>
                  <Td>
                    <div className="text-xs font-mono text-white/70 space-y-0.5">
                      <p>Tài/Xỉu: <span className="text-[#bd9c59]">1:{cfg.odds?.tai_xiu ?? 0.98}</span></p>
                      <p>Hòa: <span className="text-[#bd9c59]">1:{cfg.odds?.hoa ?? 95}</span></p>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex justify-end gap-1.5">
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => setConfigGame({ ...g, ...cfg })}
                        className="bg-[#bd9c59]/10 text-[#bd9c59] border-[#bd9c59]/30 hover:bg-[#bd9c59]/20 text-xs px-2 py-1 flex items-center gap-1"
                        title="Cấu hình Đếm ngược & Payout Odds"
                      >
                        <Settings className="w-3.5 h-3.5" /> Cấu hình
                      </Button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/70" onClick={() => openEdit(g)} title="Sửa thông tin sảnh">
                        <Pencil size={15} />
                      </button>
                    </div>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </TableWrap>
      </Panel>

      {/* Game Edit Modal */}
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

      {/* Game Config & Diff Confirmation Modal */}
      <GameConfigModal
        open={!!configGame}
        onOpenChange={(v) => !v && setConfigGame(null)}
        game={configGame}
        onSaved={() => load()}
      />

      {/* Audit Log Modal */}
      <AuditLogModal
        open={openAuditLog}
        onOpenChange={setOpenAuditLog}
      />
    </div>
  );
}