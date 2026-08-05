import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import BottomNav from "@/components/BottomNav";
import AnnouncementBar from "@/components/home/AnnouncementBar";
import HomeHeader from "@/components/home/HomeHeader";
import ActionButtons from "@/components/home/ActionButtons";
import CategoryTabs from "@/components/home/CategoryTabs";
import GameSearchBar from "@/components/home/GameSearchBar";
import GameGrid from "@/components/home/GameGrid";
import LanguageSwitcher from "@/components/home/LanguageSwitcher";
import MenuDrawer from "@/components/home/MenuDrawer";
import FloatingChatButton from "@/components/home/FloatingChatButton";
import SupportChat from "@/components/profile/SupportChat";
import { GAMES, CATEGORIES, ANNOUNCEMENTS } from "@/components/home/homeData";
import { makeT } from "@/components/home/i18n";

export default function Home() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [lang, setLang] = useState("vi");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = useMemo(() => makeT(lang), [lang]);

  const games = useMemo(() => {
    let list = GAMES;
    if (category !== "all") list = list.filter((g) => g.category === category);
    if (search.trim()) list = list.filter((g) => g.title.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [category, search]);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), category === "all" && !search ? 700 : 350);
    return () => clearTimeout(id);
  }, [category, search]);

  const openChat = useCallback(() => setChatOpen(true), []);

  const handleGameClick = async (game) => {
    if (game.status === "maintenance") {
      toast({ title: t("maintenance"), description: game.title, variant: "destructive" });
      return;
    }
    try {
      const authed = await base44.auth.isAuthenticated();
      if (!authed) {
        toast({ title: t("need_login") });
        base44.auth.redirectToLogin(window.location.pathname);
        return;
      }
    } catch {
      base44.auth.redirectToLogin(window.location.pathname);
      return;
    }
    navigate(`/choi-game/${game.gameId}`);
  };

  return (
    <main className="max-w-[516px] w-full mx-auto relative min-h-[1062px] bg-background overflow-clip flex flex-col font-sans">
      {/* Global Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="bg-secondary w-full h-full absolute top-0 left-0" />
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/51180f3b5_b60421ada_4b68ef08ef88c5e8b3877cb04357aa802c84a60d.png"
          alt="Starry Background"
          className="absolute top-[190px] left-0 w-full h-[805px] object-cover"
        />
      </div>

      {/* Content Flow */}
      <div className="relative z-10 flex flex-col flex-1 pb-24">
        <HomeHeader onChat={openChat} onMenu={() => setMenuOpen(true)} />

        {/* Hero Image */}
        <div className="w-full min-h-[151px] shrink-0">
          <img
            src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/e57f331cd_708f7e507_e87283081c2ffaf4802a737a4f6e0a1d686d3b3c.png"
            alt="Casino Floor"
            className="w-full h-full object-cover"
          />
        </div>

        <AnnouncementBar announcements={ANNOUNCEMENTS} />

        <ActionButtons t={t} />

        {/* Game Lobby Section */}
        <div className="mt-[18px] flex flex-col shrink-0">
          <div className="flex items-center gap-1.5 px-4 mb-1">
            <img src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/937f70d57_df7f64077_b8189efdff23f45686f10141f8648f32f77ac18c.png" alt="Lobby Icon" className="w-3.5 h-3.5 object-cover" />
            <h2 className="text-figma-14 font-bold font-paragraph leading-figma-15 text-[#6691c0]">{t("lobby")}</h2>
          </div>

          <CategoryTabs categories={CATEGORIES} active={category} onChange={setCategory} t={t} />
          <GameSearchBar onDebouncedChange={setSearch} t={t} />
          <GameGrid games={games} loading={loading} onClick={handleGameClick} t={t} />
        </div>

        <LanguageSwitcher lang={lang} onChange={setLang} />
      </div>

      <FloatingChatButton onClick={openChat} unread={3} />
      <BottomNav />

      <MenuDrawer open={menuOpen} onOpenChange={setMenuOpen} t={t} />
      <SupportChat open={chatOpen} onOpenChange={setChatOpen} />
    </main>
  );
}