import React from "react";
import RoomCard from "./RoomCard";
import { TIERS } from "./lobbyData";

function SkeletonSection() {
  return (
    <div className="mb-7">
      <div className="h-6 w-40 rounded bg-white/10 animate-pulse mb-3" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[112px] rounded-2xl bg-white/10 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function GameSection({ game, balance, onSelect, loading }) {
  if (loading) return <SkeletonSection />;
  return (
    <div className="mb-7">
      <h2 className="text-white font-bold text-lg mb-3 px-1">{game.title}</h2>
      <div className="flex flex-col gap-4">
        {TIERS.map((tier) => (
          <RoomCard key={tier.id} game={game} tier={tier} balance={balance} onClick={() => onSelect(game, tier)} />
        ))}
      </div>
    </div>
  );
}