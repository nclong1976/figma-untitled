import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import AwardCard from "@/components/awards/AwardCard";
import PullToRefresh from "@/components/awards/PullToRefresh";
import { useLiveDraws } from "@/components/awards/useLiveDraws";
import { GAMES } from "@/components/awards/gamesData";

export default function ContainerAug4CodiaStudio() {
  const navigate = useNavigate();
  const { draws, lastUpdate, refreshing, refresh } = useLiveDraws();
  const fmt = (ts) => new Date(ts).toLocaleTimeString("vi-VN");

  return (
    <main className="max-w-[616px] w-full mx-auto relative h-[100dvh] overflow-hidden bg-[#0A0E1A] flex flex-col font-sans">
      {/* Deep-space starfield / nebulae overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(124,199,255,0.12),transparent_42%),radial-gradient(circle_at_82%_28%,rgba(255,215,0,0.10),transparent_45%),radial-gradient(circle_at_50%_92%,rgba(124,255,203,0.10),transparent_48%)]" />

      {/* Header with live indicator */}
      <header className="relative z-20 px-4 h-14 flex items-center justify-between border-b border-white/10 bg-[#0A0E1A]/80 backdrop-blur-md shrink-0">
        <h1 className="text-white font-bold text-base">Giải Thưởng</h1>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-white/50 text-[11px]">Cập nhật {fmt(lastUpdate)}</span>
        </div>
      </header>

      {/* Scrollable feed with pull-to-refresh */}
      <div className="relative z-10 flex-1 min-h-0">
        <PullToRefresh onRefresh={refresh} refreshing={refreshing}>
          <div className="px-3 py-3 space-y-3 pb-28">
            {GAMES.map((g) => (
              <AwardCard
                key={g.gameId}
                game={g}
                data={draws[g.gameId]}
                onClickChart={(gm) => navigate(`/bieu-do/${gm.gameId}`)}
                onClickDetails={(gm) => navigate(`/ket-qua/${gm.gameId}`)}
              />
            ))}
          </div>
        </PullToRefresh>
      </div>

      <BottomNav />
    </main>
  );
}