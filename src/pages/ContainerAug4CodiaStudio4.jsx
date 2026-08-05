import React from "react";
import { useParams } from "react-router-dom";
import GamePlayScreen from "@/components/game/GamePlayScreen";

export default function ContainerAug4CodiaStudio4() {
  const { gameId } = useParams();
  return <GamePlayScreen gameId={gameId} />;
}