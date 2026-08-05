import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getGameConfig, CHIPS } from "./gameConfig";
import GameHeader from "./GameHeader";
import PreviousDrawBar from "./PreviousDrawBar";
import CountdownBar from "./CountdownBar";
import BettingGrid from "./BettingGrid";
import BetControlBar from "./BetControlBar";

const randomDraw = (count) => Array.from({ length: count }, () => Math.floor(Math.random() * 10));

export default function GamePlayScreen({ gameId }) {
  const config = useMemo(() => getGameConfig(gameId), [gameId]);
  const { toast } = useToast();

  const [activeTabId, setActiveTabId] = useState(config.tabs[0].id);
  const activeTab = config.tabs.find((t) => t.id === activeTabId) || config.tabs[0];

  const [selectedCells, setSelectedCells] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedChip, setSelectedChip] = useState(CHIPS[0]);
  const [betAmount, setBetAmount] = useState(0);
  const [balance, setBalance] = useState(1000.0);

  const [period, setPeriod] = useState(1897430);
  const [countdown, setCountdown] = useState(config.roundSeconds);
  const [drawn, setDrawn] = useState(() => randomDraw(config.drawCount));
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          setHistory((h) => [{ period, drawn }, ...h].slice(0, 20));
          setDrawn(randomDraw(config.drawCount));
          setPeriod((p) => p + 1);
          return config.roundSeconds;
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
    if (selectedCells.length === 0) {
      toast({ title: "Chưa chọn cách chơi", description: "Vui lòng chọn ô cược trước.", variant: "destructive" });
      return;
    }
    if (!betAmount || betAmount <= 0) {
      toast({ title: "Chưa nhập tiền cược", variant: "destructive" });
      return;
    }
    setTickets((prev) => [...prev, ...selectedCells.map((s) => ({ label: s.label, odds: s.odds, amount: betAmount, tabLabel: s.tabLabel }))]);
    setSelectedCells([]);
    toast({ title: "Đã thêm vào vé", description: `+${selectedCells.length} lựa chọn` });
  };

  const handleReset = () => {
    setSelectedCells([]);
    setTickets([]);
    setBetAmount(0);
  };

  const handlePlace = () => {
    const toSubmit = tickets.length > 0
      ? tickets
      : selectedCells.map((s) => ({ label: s.label, odds: s.odds, amount: betAmount, tabLabel: s.tabLabel }));
    if (toSubmit.length === 0) {
      toast({ title: "Vui lòng chọn cách chơi", variant: "destructive" });
      return;
    }
    const total = toSubmit.reduce((a, t) => a + (t.amount || 0), 0);
    if (!total || total <= 0) {
      toast({ title: "Chưa nhập tiền cược", variant: "destructive" });
      return;
    }
    if (total > balance) {
      toast({ title: "Số dư không đủ", description: `Cần ${total} · có ${balance.toFixed(2)}`, variant: "destructive" });
      return;
    }
    setBalance((b) => b - total);
    setTickets([]);
    setSelectedCells([]);
    setBetAmount(0);
    toast({ title: "Đặt cược thành công", description: `${toSubmit.length} vé · ${total} coin · kỳ ${period}` });
  };

  return (
    <main className="max-w-[619px] w-full mx-auto relative min-h-screen bg-figma-primary flex flex-col font-figma-inter overflow-x-clip">
      <div className="absolute top-[65px] left-0 w-full h-[calc(100%-65px)] z-0 pointer-events-none">
        <img
          className="w-full h-full object-cover object-top"
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/b3ec45952_2ef298ae8_90a4a2b8bed20f3db0913ebfe258e757b44c736a.png"
          alt="Background"
        />
      </div>

      <GameHeader gameName={config.name} />

      <PreviousDrawBar period={period} balance={balance} drawn={drawn} threshold={config.bigThreshold} />

      <CountdownBar currentPeriod={period} countdown={countdown} history={history} threshold={config.bigThreshold} />

      <section className="relative z-10 w-full flex-1 flex bg-[#f4f4f4] min-h-[420px]">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/c5278c3cc_3e6bad3c7_a79699bbeeb6c2ab5109427e961fd4289d5189fb.png"
            alt="Grid Background"
          />
        </div>
        <aside className="relative z-10 w-[122px] shrink-0 flex flex-col bg-[#f0f0f0] border-r border-[#e0e0e0]">
          {config.tabs.map((t) => {
            const active = t.id === activeTabId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTabId(t.id)}
                className={`w-full h-[75px] flex items-center justify-center transition-colors ${active ? "bg-[#fe6400] shadow-[inset_0_0_0_1px_#f06a14]" : "hover:bg-[#e8e8e8]"}`}
              >
                <p className={`text-[clamp(14px,4.04vw,25px)] font-normal font-figma-instrument-sans leading-[1.16] ${active ? "text-[#f4d5b2]" : "text-[#8c8c8b]"}`}>{t.label}</p>
              </button>
            );
          })}
        </aside>
        <BettingGrid tab={activeTab} selectedCells={selectedCells} onToggle={toggleCell} />
      </section>

      <BetControlBar
        chips={CHIPS}
        selectedChip={selectedChip}
        onSelectChip={(c) => { setSelectedChip(c); setBetAmount(c); }}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        onAdd={handleAdd}
        onReset={handleReset}
        onPlace={handlePlace}
        statusText={statusText}
        ticketCount={tickets.length}
      />
    </main>
  );
}