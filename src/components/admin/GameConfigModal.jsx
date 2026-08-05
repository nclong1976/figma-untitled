import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Percent, ShieldAlert, ArrowRight, Save, X } from "lucide-react";
import { formatMMSS, parseMMSS, updateGameConfig } from "@/lib/gameStore";

export default function GameConfigModal({ open, onOpenChange, game, onSaved }) {
  const [timerStr, setTimerStr] = useState("04:59");
  const [intermission, setIntermission] = useState(10);
  const [odds, setOdds] = useState({
    tai_xiu: 0.98,
    chan_le: 0.98,
    hoa: 95,
    cap_so: 12,
  });

  // Diff confirmation state
  const [showDiffConfirm, setShowDiffConfirm] = useState(false);
  const [diffs, setDiffs] = useState([]);

  useEffect(() => {
    if (game && open) {
      setTimerStr(formatMMSS(game.timerDuration || 299));
      setIntermission(game.intermission || 10);
      setOdds({
        tai_xiu: game.odds?.tai_xiu ?? 0.98,
        chan_le: game.odds?.chan_le ?? 0.98,
        hoa: game.odds?.hoa ?? 95,
        cap_so: game.odds?.cap_so ?? 12,
      });
      setShowDiffConfirm(false);
    }
  }, [game, open]);

  const handleReviewChanges = () => {
    const newTimerSeconds = parseMMSS(timerStr);
    const oldTimerSeconds = game.timerDuration || 299;

    const computedDiffs = [];
    if (newTimerSeconds !== oldTimerSeconds) {
      computedDiffs.push({
        label: "Thời gian ván cược (Timer)",
        oldVal: formatMMSS(oldTimerSeconds),
        newVal: formatMMSS(newTimerSeconds),
      });
    }
    if (Number(intermission) !== (game.intermission || 10)) {
      computedDiffs.push({
        label: "Thời gian nghỉ chuyển ván (Cooldown)",
        oldVal: `${game.intermission || 10} giây`,
        newVal: `${intermission} giây`,
      });
    }

    const currentOdds = game.odds || { tai_xiu: 0.98, chan_le: 0.98, hoa: 95, cap_so: 12 };
    if (Number(odds.tai_xiu) !== currentOdds.tai_xiu) {
      computedDiffs.push({
        label: "Tỷ lệ cược (Tài/Xỉu)",
        oldVal: `1:${currentOdds.tai_xiu}`,
        newVal: `1:${odds.tai_xiu}`,
      });
    }
    if (Number(odds.chan_le) !== currentOdds.chan_le) {
      computedDiffs.push({
        label: "Tỷ lệ cược (Chẵn/Lẻ)",
        oldVal: `1:${currentOdds.chan_le}`,
        newVal: `1:${odds.chan_le}`,
      });
    }
    if (Number(odds.hoa) !== currentOdds.hoa) {
      computedDiffs.push({
        label: "Tỷ lệ cược (Cửa Hòa)",
        oldVal: `1:${currentOdds.hoa}`,
        newVal: `1:${odds.hoa}`,
      });
    }
    if (Number(odds.cap_so) !== currentOdds.cap_so) {
      computedDiffs.push({
        label: "Tỷ lệ cược (Cặp số)",
        oldVal: `1:${currentOdds.cap_so}`,
        newVal: `1:${odds.cap_so}`,
      });
    }

    if (computedDiffs.length === 0) {
      onOpenChange(false);
      return;
    }

    setDiffs(computedDiffs);
    setShowDiffConfirm(true);
  };

  const handleConfirmSave = () => {
    const newTimerSeconds = parseMMSS(timerStr);
    const updated = updateGameConfig(
      game.gameId || game.id,
      {
        timerDuration: newTimerSeconds,
        intermission: Number(intermission),
        odds: {
          tai_xiu: Number(odds.tai_xiu),
          chan_le: Number(odds.chan_le),
          hoa: Number(odds.hoa),
          cap_so: Number(odds.cap_so),
        },
      },
      { adminId: "Admin_Principal", ip: "192.168.1.10" }
    );

    setShowDiffConfirm(false);
    onOpenChange(false);
    onSaved?.(updated);
  };

  if (!game) return null;

  return (
    <>
      {/* Modal 1: Editor Form */}
      <Dialog open={open && !showDiffConfirm} onOpenChange={onOpenChange}>
        <DialogContent className="bg-[#161936] border-white/15 text-white max-w-md w-[95vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#bd9c59] flex items-center gap-2">
              <Clock className="w-4 h-4" /> Cấu hình ván cược & RTP: {game.title || game.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2 max-h-[65vh] overflow-y-auto pr-1">
            {/* Countdown Timer MM:SS */}
            <div className="bg-white/5 p-3 rounded-xl space-y-2 border border-white/10">
              <p className="text-xs font-semibold text-[#bd9c59] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Thời gian ván cược (MM:SS)
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[11px] text-white/60">Thời gian đếm ngược (Format MM:SS)</Label>
                  <Input
                    value={timerStr}
                    onChange={(e) => setTimerStr(e.target.value)}
                    placeholder="04:59"
                    className="bg-[#0A0E1A] border-white/15 text-white font-mono text-center text-lg h-10 mt-1"
                  />
                  <p className="text-[10px] text-white/40 mt-1">Mặc định: 04:59 (299 giây)</p>
                </div>
                <div>
                  <Label className="text-[11px] text-white/60">Thời gian nghỉ (Giây)</Label>
                  <Input
                    type="number"
                    value={intermission}
                    onChange={(e) => setIntermission(e.target.value)}
                    placeholder="10"
                    className="bg-[#0A0E1A] border-white/15 text-white font-mono text-center text-lg h-10 mt-1"
                  />
                  <p className="text-[10px] text-white/40 mt-1">Nghỉ giữa 2 ván cược</p>
                </div>
              </div>
            </div>

            {/* Payout Rates (Manual Odds) */}
            <div className="bg-white/5 p-3 rounded-xl space-y-2 border border-white/10">
              <p className="text-xs font-semibold text-[#bd9c59] flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5" /> Tỷ lệ trả thưởng (Manual Odds)
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-[11px] text-white/60">Cửa Tài / Xỉu (1:x)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={odds.tai_xiu}
                    onChange={(e) => setOdds({ ...odds, tai_xiu: e.target.value })}
                    className="bg-[#0A0E1A] border-white/15 text-white font-mono h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-[11px] text-white/60">Cửa Chẵn / Lẻ (1:x)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={odds.chan_le}
                    onChange={(e) => setOdds({ ...odds, chan_le: e.target.value })}
                    className="bg-[#0A0E1A] border-white/15 text-white font-mono h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-[11px] text-white/60">Cửa Hòa (1:x)</Label>
                  <Input
                    type="number"
                    step="1"
                    value={odds.hoa}
                    onChange={(e) => setOdds({ ...odds, hoa: e.target.value })}
                    className="bg-[#0A0E1A] border-white/15 text-white font-mono h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-[11px] text-white/60">Cửa Cặp số (1:x)</Label>
                  <Input
                    type="number"
                    step="1"
                    value={odds.cap_so}
                    onChange={(e) => setOdds({ ...odds, cap_so: e.target.value })}
                    className="bg-[#0A0E1A] border-white/15 text-white font-mono h-9 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-white/60">
              Hủy
            </Button>
            <Button
              onClick={handleReviewChanges}
              className="bg-gradient-to-r from-[#7033ff] to-[#4b00ff] text-white font-semibold flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Xem thay đổi (Diff)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal 2: Diff Confirmation Pop-up */}
      <Dialog open={showDiffConfirm} onOpenChange={setShowDiffConfirm}>
        <DialogContent className="bg-[#12142d] border-amber-500/30 text-white max-w-md w-[95vw] rounded-2xl p-5 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-amber-400 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" /> Xác nhận lưu cấu hình (Diff View)
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <p className="text-xs text-white/70">
              Vui lòng kiểm tra lại các thông số thay đổi bên dưới trước khi áp dụng lên hệ thống:
            </p>

            <div className="space-y-2 max-h-56 overflow-y-auto">
              {diffs.map((d, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-3 border border-white/10 text-xs space-y-1">
                  <p className="font-semibold text-white/90">{d.label}</p>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-red-400/90 font-mono bg-red-500/10 px-2 py-0.5 rounded">
                      Cũ: {d.oldVal}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                      Mới: {d.newVal}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-white/40 italic">
              * Thao tác này sẽ tự động ghi lại lịch sử vào Nhật ký thao tác (Audit Log).
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setShowDiffConfirm(false)} className="text-white/60">
              Quay lại chỉnh sửa
            </Button>
            <Button
              onClick={handleConfirmSave}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Lưu & Ghi Audit Log
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
