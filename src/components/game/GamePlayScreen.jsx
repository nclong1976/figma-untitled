import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { getGameConfig, CHIPS, computeDrawLabels } from "./gameConfig";
import { getTier } from "@/components/lobby/lobbyData";
import Ball from "./Ball";
import { ChevronLeft, Lock } from "lucide-react";

const randomDraw = (count) => Array.from({ length: count }, () => Math.floor(Math.random() * 10));

export default function GamePlayScreen({ gameId, tier }) {
  const config = useMemo(() => getGameConfig(gameId), [gameId]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [activeTabId, setActiveTabId] = useState(config.tabs[0].id);
  const activeTab = config.tabs.find((t) => t.id === activeTabId) || config.tabs[0];

  const [selectedCells, setSelectedCells] = useState([]);
  const [tickets, setTickets] = useState([]);
  const tierChips = useMemo(() => getTier(tier)?.chips || CHIPS, [tier]);
  const [selectedChip, setSelectedChip] = useState(tierChips[0]);
  useEffect(() => { setSelectedChip(tierChips[0]); }, [tierChips]);
  const [betAmount, setBetAmount] = useState(0);
  const [balance, setBalance] = useState(1000.0);

  const [period, setPeriod] = useState(1897430);
  const [countdown, setCountdown] = useState(config.roundSeconds);
  const [drawn, setDrawn] = useState(() => randomDraw(config.drawCount));
  const [history, setHistory] = useState([]);

  const bettingClosed = countdown <= 0;

  // Low-latency countdown: count to 0 (draw + overlay), then reset next tick
  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 0) return config.roundSeconds;
        if (c <= 1) {
          setHistory((h) => [{ period, drawn }, ...h].slice(0, 20));
          setDrawn(randomDraw(config.drawCount));
          setPeriod((p) => p + 1);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [period, drawn, config]);

  const labels = computeDrawLabels(drawn, config.bigThreshold);
  const mm = String(Math.floor(countdown / 60)).padStart(1, "0");
  const ss = String(countdown % 60).padStart(2, "0");

  const toggleCell = useCallback((tabId, tabLabel, item) => {
    setSelectedCells((prev) => {
      const exists = prev.find((s) => s.tabId === tabId && s.label === item.label);
      if (exists) return prev.filter((s) => !(s.tabId === tabId && s.label === item.label));
      return [...prev, { tabId, tabLabel, label: item.label, odds: item.odds }];
    });
  }, []);

  const statusText = tickets.length > 0
    ? `Đã thêm ${tickets.length} vé cược`
    : selectedCells.length > 0
      ? `Đã chọn ${selectedCells.length} cách chơi`
      : "Vui lòng chọn cách chơi";

  const handleAdd = () => {
    if (bettingClosed) return;
    if (selectedCells.length === 0) { toast({ title: "Chưa chọn cách chơi", variant: "destructive" }); return; }
    if (!betAmount || betAmount <= 0) { toast({ title: "Chưa nhập tiền cược", variant: "destructive" }); return; }
    setTickets((prev) => [...prev, ...selectedCells.map((s) => ({ ...s, amount: betAmount }))]);
    setSelectedCells([]);
    toast({ title: "Thêm vé thành công", description: `+${selectedCells.length} lựa chọn` });
  };

  const handleReset = () => { setSelectedCells([]); setTickets([]); setBetAmount(0); };

  const handlePlace = () => {
    if (bettingClosed) { toast({ title: "Đang chờ kỳ tiếp theo", variant: "destructive" }); return; }
    const toSubmit = tickets.length > 0 ? tickets : selectedCells.map((s) => ({ ...s, amount: betAmount }));
    if (toSubmit.length === 0) { toast({ title: "Vui lòng chọn cách chơi", variant: "destructive" }); return; }
    const total = toSubmit.reduce((a, t) => a + (t.amount || 0), 0);
    if (!total || total <= 0) { toast({ title: "Chưa nhập tiền cược", variant: "destructive" }); return; }
    if (total > balance) { toast({ title: "Số dư không đủ", variant: "destructive" }); return; }
    setBalance((b) => b - total);
    setTickets([]); setSelectedCells([]); setBetAmount(0);
    toast({ title: "Đã gửi đơn đặt hàng", description: `${toSubmit.length} vé · ${total} coin · kỳ ${period}` });
  };

  return (
    <main className="w-full max-w-[616px] mx-auto h-[100dvh] relative overflow-hidden bg-[#0A0E1A] flex flex-col font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_15%_10%,rgba(124,199,255,0.10),transparent_40%),radial-gradient(circle_at_85%_18%,rgba(255,215,0,0.06),transparent_42%)]" />

      {/* Compact header — title, balance, last draw, dynamic labels, countdown */}
      <header className="relative z-20 shrink-0 px-3 pt-2 pb-2 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="shrink-0"><ChevronLeft className="w-6 h-6 text-white/80" /></button>
          <h1 className="text-white font-bold text-sm flex-1 truncate">{config.name}</h1>
          <div className="text-right shrink-0">
            <p className="text-[#FFD700] text-[10px] leading-none">Số dư</p>
            <p className="text-white font-bold text-xs tabular-nums">{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="shrink-0 ml-1 px-2 py-1 rounded-md bg-[#ca0a1b] text-white font-bold text-xs tabular-nums">{mm}:{ss}</div>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-white/50 text-[10px] mr-1 shrink-0">Kỳ {period}</span>
          {drawn.map((n, i) => <Ball key={i} number={n} size={20} />)}
          <span className="ml-auto flex items-center gap-1.5 text-[10px] shrink-0">
            <span className="text-white/50">Tổng</span>
            <span className="bg-[#e4b060] text-[#7a3a1a] font-bold px-1.5 py-0.5 rounded">{labels.sum}</span>
            <span className="text-[#FFD700] font-semibold">{labels.big}</span>
            <span className="text-white/70">{labels.parity}</span>
          </span>
        </div>
      </header>

      {/* Tab selector */}
      <div className="relative z-10 shrink-0 flex gap-1 px-2 py-2 overflow-x-auto bg-[#0f1326] [&::-webkit-scrollbar]:hidden">
        {config.tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTabId(t.id)}
            className={`shrink-0 px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors ${activeTabId === t.id ? "bg-[#fe6400] text-white font-semibold" : "bg-white/5 text-white/60"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Betting matrix — tight grid, label over odds */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-2 pb-2 [&::-webkit-scrollbar]:hidden">
        {activeTab.sections.map((sec, si) => (
          <div key={si} className="grid gap-1.5 mb-2" style={{ gridTemplateColumns: `repeat(${Math.min(sec.columns, 5)},minmax(0,1fr))` }}>
            {sec.items.map((item, i) => {
              const sel = selectedCells.some((s) => s.tabId === activeTab.id && s.label === item.label);
              return (
                <button
                  key={i}
                  onClick={() => !bettingClosed && toggleCell(activeTab.id, activeTab.label, item)}
                  className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-center transition-all ${sel ? "bg-[#FFD700]/15 border border-[#FFD700] shadow-[inset_0_0_6px_rgba(255,215,0,0.4)]" : "bg-white/5 border border-white/10 hover:border-white/20"}`}
                >
                  <p className={`text-white text-xs font-semibold leading-tight ${sel ? "text-[#FFD700]" : ""}`}>{item.label}</p>
                  <p className="text-[#999] text-[10px] leading-tight mt-0.5">{item.odds}</p>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Betting-closed overlay */}
      {bettingClosed && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/55 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2 text-white">
            <Lock className="w-8 h-8 text-[#FFD700]" />
            <p className="font-bold text-sm">Đang chờ kỳ tiếp theo</p>
          </div>
        </div>
      )}

      {/* Compact bet control bar */}
      <footer className="relative z-20 shrink-0 bg-[#0f1326] border-t border-white/10 px-2 pt-2 pb-2">
        <p className="text-center text-[11px] text-[#f1c195] mb-1.5 truncate">{statusText}</p>

        {/* Horizontal quick-chip scroll */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
          {tierChips.map((c) => (
            <button
              key={c}
              onClick={() => { setSelectedChip(c); setBetAmount(c); }}
              className={`snap-start shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold transition-all ${selectedChip === c ? "bg-[#FFD700] text-[#0A0E1A] ring-2 ring-white" : "bg-[#4a3500] text-[#FFD700]/80"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Action ribbon */}
        <div className="flex items-center gap-1.5 h-11">
          <input
            type="number"
            min="0"
            value={betAmount}
            onChange={(e) => setBetAmount(Math.max(0, Number(e.target.value)))}
            className="flex-1 h-11 bg-white/10 border border-white/15 rounded-lg px-2 text-center text-white text-sm outline-none focus:border-[#FFD700]"
            placeholder="Số tiền"
          />
          <button onClick={handleAdd} className="h-11 px-3 rounded-lg bg-[#4a097f] text-[#ddcee4] text-xs font-semibold">Mua hàng</button>
          <button onClick={handleReset} className="h-11 px-3 rounded-lg bg-[#c9101b] text-[#e7bbbc] text-xs font-semibold">Đặt lại</button>
        </div>

        {/* Primary CTA */}
        <button
          onClick={handlePlace}
          disabled={bettingClosed}
          className="mt-1.5 w-full h-12 rounded-xl bg-[#FFD700] text-[#0A0E1A] font-bold text-sm active:scale-[0.98] transition-transform disabled:opacity-40"
        >
          Đặt cược
        </button>
      </footer>
    </main>
  );
}