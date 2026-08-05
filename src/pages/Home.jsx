import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/AuthContext";
import { useUserData } from "@/lib/userData";
import { useNotifications } from "@/lib/NotificationContext";
import BottomNav from "@/components/BottomNav";
import AnnouncementBar from "@/components/home/AnnouncementBar";
import HomeHeader from "@/components/home/HomeHeader";
import ActionButtons from "@/components/home/ActionButtons";
import CategoryTabs from "@/components/home/CategoryTabs";
import GameSearchBar from "@/components/home/GameSearchBar";
import GameGrid from "@/components/home/GameGrid";
import LanguageSwitcher from "@/components/home/LanguageSwitcher";
import FloatingChatButton from "@/components/home/FloatingChatButton";
import SupportChat from "@/components/profile/SupportChat";
import WithdrawModal from "@/components/profile/WithdrawModal";
import LinkAccountModal from "@/components/profile/LinkAccountModal";
import BetHistoryModal from "@/components/profile/BetHistoryModal";
import { GAMES, CATEGORIES, ANNOUNCEMENTS } from "@/components/home/homeData";
import { useI18n } from "@/lib/I18nContext";
import { MIN_TURNOVER } from "@/components/profile/profileData";
import { resolveInitialTier, getTier } from "@/components/lobby/lobbyData";
import DepositModal from "@/components/profile/DepositModal";
import { notifyAdmins } from "@/lib/localNotifications";
import { getGameConfig } from "@/lib/gameStore";

export default function Home() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { push } = useNotifications();

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

  // Dữ liệu cá nhân per-user (clean slate khi đăng ký)
  const { user: authUser, isAuthenticated } = useAuth();
  const { data, update } = useUserData(authUser?.id);
  const balance = data.balance;
  const linked = data.linked;
  const bets = data.bets;
  const turnover = data.turnover;
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openBet, setOpenBet] = useState(false);
  const [openDeposit, setOpenDeposit] = useState(false);

  const { lang, setLang, t } = useI18n();

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
  }, [category, search, refreshKey]);

  const openChat = useCallback(() => setChatOpen(true), []);

  const handleRefresh = () => {
    setRefreshKey((k) => k + 1);
    setCategory("all");
    setSearch("");
  };

  const handleWithdraw = () => {
    if (!isAuthenticated) {
      toast({ title: t("need_login") });
      return;
    }
    const hasBank = linked.some((a) => a.type === "bank");
    if (!hasBank) {
      toast({ title: t("link_bank_first") });
      setOpenLink(true);
      return;
    }
    setOpenWithdraw(true);
  };

  const submitWithdraw = ({ amount, bank }) => {
    update((d) => ({ ...d, balance: +(d.balance - amount).toFixed(2) }));
    toast({ title: "Gửi yêu cầu rút tiền thành công", description: `${amount} coin · ${bank?.bankName}` });
    push({ type: "balance", title: "Rút tiền thành công", body: `-${amount} coin · ${bank?.bankName}` });
    setOpenWithdraw(false);
  };

  const addLinked = (acct) => {
    update((d) => ({ ...d, linked: [acct, ...d.linked] }));
    toast({ title: "Liên kết tài khoản thành công" });
  };

  // Nạp tiền thành công: cộng dư, ghi giao dịch, toast xanh + thông báo cho người dùng và admin.
  const submitDeposit = ({ amount, method }) => {
    update((d) => ({
      ...d,
      balance: +(d.balance + amount).toFixed(2),
      txs: [{
        txid: "DP" + Date.now(),
        type: "deposit",
        amount,
        method: method === "crypto" ? "USDT" : "Ngân hàng",
        status: "completed",
        time: new Date().toLocaleString("vi-VN"),
      }, ...d.txs],
    }));
    toast({ title: "Nạp tiền thành công", description: `+${amount} coin`, variant: "success" });
    push({ type: "balance", title: "Nạp tiền thành công", body: `+${amount} coin · ${method === "crypto" ? "USDT" : "Ngân hàng"}` });
    // Tự động thông báo cho quản trị về lệnh nạp thành công.
    notifyAdmins({
      type: "admin",
      title: "Yêu cầu nạp tiền thành công",
      body: `${authUser?.account || "Người dùng"} vừa nạp +${amount} coin (${method === "crypto" ? "USDT" : "Ngân hàng"})`,
    });
  };

  const handleGameClick = (game) => {
    const cfg = getGameConfig(game.gameId || game.id);
    const status = game.status === "disabled" || cfg?.status === "disabled" ? "disabled" : (cfg?.status || game.status);

    if (status === "disabled") {
      toast({ title: t("disabled_toast"), variant: "destructive" });
      return;
    }
    if (status === "maintenance") {
      toast({ title: t("maintenance_toast"), variant: "destructive" });
      return;
    }
    if (!isAuthenticated) {
      toast({ title: t("need_login") });
      return;
    }
    const tierId = resolveInitialTier(balance);
    if (balance < getTier(tierId).minBalance) {
      toast({ title: "Số dư không đủ để vào phòng, vui lòng nạp tiền ngay", variant: "destructive" });
      return;
    }
    navigate(`/choi-game/${game.gameId}?tier=${tierId}&g=${game.id}`);
  };

  return (
    <main className="max-w-md w-full mx-auto relative min-h-[100dvh] bg-background overflow-x-hidden flex flex-col font-sans">
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
        <HomeHeader onChat={openChat} onRefresh={handleRefresh} />

        {/* Hero Image */}
        <div className="w-full min-h-[151px] shrink-0">
          <video
            src="https://media.base44.com/videos/public/6a729d033f9d0f63f381a6c6/ac9c0fbcd_6faa31b965e5d1deaeb62d0f29225b5b1.mp4"
            poster="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/e57f331cd_708f7e507_e87283081c2ffaf4802a737a4f6e0a1d686d3b3c.png"
            alt="Casino Floor"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        <AnnouncementBar announcements={ANNOUNCEMENTS} />

        <ActionButtons
          t={t}
          onDeposit={openChat}
          onWithdraw={openChat}
          onHistory={() => setOpenBet(true)}
          onSupport={openChat}
        />

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

      <SupportChat open={chatOpen} onOpenChange={setChatOpen} />
      <WithdrawModal
        open={openWithdraw}
        onOpenChange={setOpenWithdraw}
        balance={balance}
        minTurnover={MIN_TURNOVER}
        turnover={turnover}
        linked={linked}
        onSubmit={submitWithdraw}
      />
      <LinkAccountModal open={openLink} onOpenChange={setOpenLink} onAdd={addLinked} linked={linked} />
      <BetHistoryModal open={openBet} onOpenChange={setOpenBet} bets={bets} />
      <DepositModal open={openDeposit} onOpenChange={setOpenDeposit} balance={balance} linked={linked} onSubmit={submitDeposit} />
    </main>
  );
}