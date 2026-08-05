import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { getGameConfig, CHIPS, computeDrawLabels } from "./gameConfig";
import { getTier } from "@/components/lobby/lobbyData";
import Ball from "./Ball";
import { ChevronLeft, History, Search, User, Lock, ChevronDown } from "lucide-react";
import { Image } from "@/components/ui/image";
import { getGameById } from "@/components/home/homeData";

const randomDraw = (count) => Array.from({ length: count }, () => Math.floor(Math.random() * 10));

export default function GamePlayScreen({ gameId, tier, variantId }) {
  const config = useMemo(() => getGameConfig(gameId), [gameId]);
  const variant = useMemo(() => (variantId ? getGameById(variantId) : undefined), [variantId]);
  const displayTitle = variant?.title || config.name;
  const thumb = variant?.bg;
  const tierLabel = getTier(tier)?.label;
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
  const [showHistory, setShowHistory] = useState(false);

  const bettingClosed = countdown <= 0;

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
    <main className="max-w-[619px] w-full mx-auto h-[100dvh] relative flex flex-col overflow-hidden bg-[#0A0E1A] font-sans select-none">
      {/* Deep-space overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_18%_8%,rgba(124,199,255,0.10),transparent_40%),radial-gradient(circle_at_84%_16%,rgba(255,215,0,0.06),transparent_42%)]" />

      {/* Top header */}
      <header className="relative z-20 shrink-0 h-11 flex items-center justify-between px-3 bg-[#0A0E1A]/90 backdrop-blur-md border-b border-white/10">
        <button onClick={() => navigate(-1)} className="shrink-0"><ChevronLeft className="w-6 h-6 text-white/85" /></button>
        <div className="flex-1 flex items-center justify-center gap-2 px-2 min-w-0">
          {thumb && (
            <div className="w-7 h-7 rounded-md overflow-hidden shrink-0 ring-1 ring-white/15">
              <Image src={thumb} alt="" fittingType="fill" className="w-full h-full" />
            </div>
          )}
          <h1 className="text-white font-bold text-[15px] truncate">{displayTitle}</h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="hover:opacity-80"><Search className="w-5 h-5 text-white/85" /></button>
          <button className="hover:opacity-80"><User className="w-5 h-5 text-white/85" /></button>
        </div>
      </header>

      {/* Live status bar */}
      <section className="relative z-10 shrink-0 px-3 py-1.5 bg-[#0d1226] border-b border-white/10">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-[#d99] text-[11px] shrink-0">{tierLabel ? `${tierLabel} · ` : ""}Kỳ {period}</p>
          <div className="flex items-center gap-1 flex-wrap">
            {drawn.map((n, i) => <Ball key={i} number={n} size={20} />)}
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-[11px] shrink-0">
            <span className="text-white/55">Tổng</span>
            <span className="bg-[#e4b060] text-[#7a3a1a] font-bold px-1.5 py-0.5 rounded">{labels.sum}</span>
            <span className="text-[#FFD700] font-semibold">{labels.big}</span>
            <span className="text-white/70">{labels.parity}</span>
          </div>
        </div>
        <div className="flex justify-end mt-1">
          <span className="text-[#f0a0a4] text-[11px]">Số dư: <b className="text-white">{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</b></span>
        </div>
      </section>

      {/* Active draw bar */}
      <section className="relative z-20 shrink-0 h-10 flex items-center px-3 bg-[#0d1226] border-b border-white/10">
        <p className="text-[#f0a0a4] text-[13px] font-semibold">{period + 1}</p>
        <div className="ml-2 px-2 py-0.5 rounded-md bg-[#cc0000] text-white text-[13px] font-bold tabular-nums">{mm}:{ss}</div>
        <p className="ml-2 text-white/70 text-[12px]">Đặt cược</p>
        <button onClick={() => setShowHistory((v) => !v)} className="ml-auto flex items-center gap-1 text-[#ffb070] text-[12px]">
          Historical draw
          <History className="w-4 h-4" />
        </button>

        {showHistory && (
          <div className="absolute top-11 right-2 z-30 w-[240px] max-h-[240px] overflow-y-auto bg-[#1b1b3a]/95 rounded-lg border border-white/10 p-2 space-y-1.5 backdrop-blur-md [&::-webkit-scrollbar]:hidden">
            {history.length === 0 && <p className="text-white/60 text-xs text-center py-2">Chưa có lịch sử</p>}
            {history.map((h, i) => {
              const l = computeDrawLabels(h.drawn, config.bigThreshold);
              return (
                <div key={i} className="flex items-center gap-2 bg-white/5 rounded-md p-1.5">
                  <span className="text-[#f0a0a4] text-[10px] shrink-0 w-[68px] truncate">{h.period}</span>
                  <div className="flex gap-1 flex-wrap">{h.drawn.map((n, j) => <Ball key={j} number={n} size={18} />)}</div>
                  <span className="text-[#e39662] text-[10px] ml-auto">{l.big} · {l.parity}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Betting matrix */}
      <section className="relative z-10 flex-1 min-h-0 flex bg-[#f4f4f4]">
        <aside className="w-[88px] shrink-0 flex flex-col bg-[#f0f0f0] border-r border-[#e0e0e0]">
          {config.tabs.map((t) => {
            const active = t.id === activeTabId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTabId(t.id)}
                className={`flex-1 min-h-[60px] flex items-center justify-center transition-colors ${active ? "bg-[#ff6600]" : "hover:bg-[#e8e8e8]"}`}
              >
                <p className={`text-[14px] font-semibold leading-tight text-center px-1 ${active ? "text-white" : "text-[#8c8c8c]"}`}>{t.label}</p>
              </button>
            );
          })}
        </aside>

        <div className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <div className="h-9 flex items-center justify-center bg-[#e8e8e8] border-b border-[#dcdcdc] sticky top-0 z-10">
            <p className="text-[15px] font-bold text-[#b62d34]">{activeTab.label}</p>
          </div>
          {activeTab.sections.map((sec, si) => (
            <div key={si} className="grid gap-[1px] bg-[#ececec]" style={{ gridTemplateColumns: `repeat(${Math.min(sec.columns, 5)},minmax(0,1fr))` }}>
              {sec.items.map((item, i) => {
                const sel = selectedCells.some((s) => s.tabId === activeTab.id && s.label === item.label);
                return (
                  <button
                    key={i}
                    onClick={() => !bettingClosed && toggleCell(activeTab.id, activeTab.label, item)}
                    className={`flex flex-col items-center justify-center h-[64px] bg-white transition-colors ${sel ? "bg-[#ffe9d6] ring-2 ring-[#ff6600] inset-shadow" : "hover:bg-[#fafafa]"}`}
                  >
                    <p className={`text-[13px] font-semibold leading-tight ${sel ? "text-[#ff6600]" : "text-[#333]"}`}>{item.label}</p>
                    <p className="text-[11px] text-[#999] mt-0.5">{item.odds}</p>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Betting control bar */}
      <footer className="relative z-20 shrink-0 bg-[#ff6600] px-2.5 pt-1.5 pb-2">
        <div className="flex items-center justify-between">
          <p className="text-white text-[12px] font-medium truncate max-w-[55%]">{statusText}</p>
          <div className="flex items-center gap-1">
            <p className="text-white text-[12px] font-semibold">Đặt cược nhanh</p>
            <ChevronDown className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        <div className="flex justify-between gap-1 px-0.5 mt-1.5">
          {tierChips.map((c) => (
            <button
              key={c}
              onClick={() => { setSelectedChip(c); setBetAmount(c); }}
              className="relative w-[44px] h-[44px] flex items-center justify-center transition-transform active:scale-95"
            >
              <span className={`absolute inset-0 rounded-full ${selectedChip === c ? "bg-[#FFD700] ring-2 ring-white" : "bg-[#7a3d00] ring-1 ring-[#a85a00]"}`} />
              <span className={`relative z-10 text-[12px] font-bold ${selectedChip === c ? "text-[#5a2d00]" : "text-[#ffd9a0]"}`}>{c}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 mt-1.5">
          <p className="text-white text-[12px] shrink-0">Số tiền:</p>
          <input
            type="number"
            min="0"
            value={betAmount}
            onChange={(e) => setBetAmount(Math.max(0, Number(e.target.value)))}
            className="flex-1 h-9 rounded-lg bg-white px-2 text-center text-[#333] text-[13px] font-semibold outline-none min-w-0"
          />
          <button onClick={handleAdd} className="h-9 px-2.5 rounded-lg bg-[#4a097f] text-white text-[12px] font-semibold shrink-0">Mua hàng</button>
          <button onClick={handleReset} className="h-9 px-2.5 rounded-lg bg-[#cc0000] text-white text-[12px] font-semibold shrink-0">Đặt lại</button>
        </div>

        <button
          onClick={handlePlace}
          disabled={bettingClosed}
          className="mt-1.5 w-full h-11 rounded-xl bg-[#ff7a1a] text-white font-bold text-[15px] shadow-lg active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          Đặt cược
        </button>
      </footer>

      {bettingClosed && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/55 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2 text-white">
            <Lock className="w-8 h-8 text-[#FFD700]" />
            <p className="font-bold text-sm">Đang chờ kỳ tiếp theo</p>
          </div>
        </div>
      )}
    </main>
  );
}