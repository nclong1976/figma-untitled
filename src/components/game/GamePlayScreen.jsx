import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getGameConfig, CHIPS, computeDrawLabels } from "./gameConfig";
import { getTier } from "@/components/lobby/lobbyData";
import GameHeader from "./GameHeader";
import PreviousDrawBar from "./PreviousDrawBar";
import CountdownBar from "./CountdownBar";
import Ball from "./Ball";
import { Lock, ChevronDown } from "lucide-react";

const randomDraw = (count) => Array.from({ length: count }, () => Math.floor(Math.random() * 10));

export default function GamePlayScreen({ gameId, tier }) {
  const config = useMemo(() => getGameConfig(gameId), [gameId]);
  const { toast } = useToast();

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

  const mm = String(Math.floor(countdown / 60)).padStart(1, "0");
  const ss = String(countdown % 60).padStart(2, "0");

  return (
    <main className="max-w-[619px] w-full mx-auto h-[100dvh] relative flex flex-col overflow-hidden bg-[#1a1a1a]">
      {/* Top header */}
      <GameHeader gameName={config.name} />

      {/* Live status bar */}
      <PreviousDrawBar period={period} balance={balance} drawn={drawn} threshold={config.bigThreshold} />

      {/* Active draw bar */}
      <CountdownBar currentPeriod={period} countdown={countdown} history={history} threshold={config.bigThreshold} />

      {/* Betting matrix: sidebar + white grid */}
      <section className="relative z-10 flex-1 min-h-0 flex bg-[#f4f4f4]">
        <aside className="w-[96px] shrink-0 flex flex-col bg-[#f0f0f0] border-r border-[#e0e0e0]">
          {config.tabs.map((t) => {
            const active = t.id === activeTabId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTabId(t.id)}
                className={`flex-1 min-h-[64px] flex items-center justify-center transition-colors ${active ? "bg-[#ff6600]" : "hover:bg-[#e8e8e8]"}`}
              >
                <p className={`text-[15px] font-semibold leading-tight text-center ${active ? "text-white" : "text-[#8c8c8c]"}`}>{t.label}</p>
              </button>
            );
          })}
        </aside>

        <div className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <div className="h-10 flex items-center justify-center bg-[#e8e8e8] border-b border-[#dcdcdc] sticky top-0 z-10">
            <p className="text-[16px] font-bold text-[#b62d34]">{activeTab.label}</p>
          </div>
          {activeTab.sections.map((sec, si) => (
            <div key={si} className="grid gap-[1px] bg-[#ececec]" style={{ gridTemplateColumns: `repeat(${Math.min(sec.columns, 5)},minmax(0,1fr))` }}>
              {sec.items.map((item, i) => {
                const sel = selectedCells.some((s) => s.tabId === activeTab.id && s.label === item.label);
                return (
                  <button
                    key={i}
                    onClick={() => !bettingClosed && toggleCell(activeTab.id, activeTab.label, item)}
                    className={`flex flex-col items-center justify-center h-[78px] bg-white transition-colors ${sel ? "bg-[#ffe9d6] ring-2 ring-[#ff6600] inset-shadow" : "hover:bg-[#fafafa]"}`}
                  >
                    <p className={`text-[15px] font-semibold leading-tight ${sel ? "text-[#ff6600]" : "text-[#333]"}`}>{item.label}</p>
                    <p className="text-[13px] text-[#999] mt-1">{item.odds}</p>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Betting control bar (orange) */}
      <footer className="relative z-20 shrink-0 bg-[#ff6600] px-2.5 pt-2 pb-2">
        <div className="flex items-center justify-between">
          <p className="text-white text-[13px] font-medium truncate">{statusText}</p>
          <div className="flex items-center gap-1">
            <p className="text-white text-[13px] font-semibold">Đặt cược nhanh</p>
            <ChevronDown className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="flex justify-between px-1 mt-2">
          {tierChips.map((c) => (
            <button
              key={c}
              onClick={() => { setSelectedChip(c); setBetAmount(c); }}
              className={`relative w-[52px] h-[52px] flex items-center justify-center transition-transform active:scale-95`}
            >
              <span className={`absolute inset-0 rounded-full ${selectedChip === c ? "bg-[#FFD700] ring-2 ring-white" : "bg-[#7a3d00] ring-1 ring-[#a85a00]"}`} />
              <span className={`relative z-10 text-[14px] font-bold ${selectedChip === c ? "text-[#5a2d00]" : "text-[#ffd9a0]"}`}>{c}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <p className="text-white text-[14px] shrink-0">Số tiền cược:</p>
          <input
            type="number"
            min="0"
            value={betAmount}
            onChange={(e) => setBetAmount(Math.max(0, Number(e.target.value)))}
            className="flex-1 h-11 rounded-lg bg-white px-3 text-center text-[#333] text-[15px] font-semibold outline-none"
          />
          <button onClick={handleAdd} className="h-11 px-3 rounded-lg bg-[#4a097f] text-white text-[14px] font-semibold">Mua hàng</button>
          <button onClick={handleReset} className="h-11 px-3 rounded-lg bg-[#cc0000] text-white text-[14px] font-semibold">Đặt lại</button>
        </div>

        <button
          onClick={handlePlace}
          disabled={bettingClosed}
          className="mt-2 w-full h-12 rounded-xl bg-[#ff6600] border border-[#ff8c33] text-white font-bold text-[16px] shadow-lg active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          Đặt cược
        </button>
      </footer>

      {/* Betting-closed overlay */}
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