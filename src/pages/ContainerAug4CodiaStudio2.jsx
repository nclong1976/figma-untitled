import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { useNotifications } from "@/lib/NotificationContext";
import NotificationBell from "@/components/NotificationBell";
import BottomNav from "@/components/BottomNav";
import ProfileCard from "@/components/profile/ProfileCard";
import QuickMenuCard from "@/components/profile/QuickMenuCard";
import ActionCards from "@/components/profile/ActionCards";
import LogoutButton from "@/components/profile/LogoutButton";
import SettingsModal from "@/components/profile/SettingsModal";
import BetHistoryModal from "@/components/profile/BetHistoryModal";
import TxHistoryModal from "@/components/profile/TxHistoryModal";
import LinkAccountModal from "@/components/profile/LinkAccountModal";
import SupportChat from "@/components/profile/SupportChat";
import WithdrawModal from "@/components/profile/WithdrawModal";
import { seedBets, seedTxs, seedLinked, MIN_TURNOVER } from "@/components/profile/profileData";

export default function ContainerAug4CodiaStudio2() {
  const { toast } = useToast();
  const { push } = useNotifications();
  const [user, setUser] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [profit, setProfit] = useState(0);
  const [bets] = useState(seedBets);
  const [txs, setTxs] = useState(seedTxs);
  const [linked, setLinked] = useState(seedLinked);
  const [turnover] = useState(1500);

  const [openSettings, setOpenSettings] = useState(false);
  const [openBet, setOpenBet] = useState(false);
  const [txMode, setTxMode] = useState(null);
  const [openLink, setOpenLink] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => { base44.auth.me().then(setUser).catch(() => {}); }, []);

  // Simulated realtime balance/profit fluctuation
  useEffect(() => {
    const t = setInterval(() => {
      setProfit((p) => {
        const np = +(p + (Math.random() * 4 - 2)).toFixed(2);
        setBalance(+(1000 + np).toFixed(2));
        return np;
      });
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const copyId = async () => {
    const id = user?.id ? user.id.slice(-6) : "000000";
    try {
      await navigator.clipboard.writeText(id);
      toast({ title: "Đã sao chép ID", description: id });
    } catch {
      toast({ title: "Không thể sao chép ID", variant: "destructive" });
    }
  };

  const addLinked = (acct) => {
    setLinked((l) => [acct, ...l]);
    toast({ title: "Liên kết tài khoản thành công" });
  };

  const submitWithdraw = ({ amount, bank, pin }) => {
    if (amount > balance) return toast({ title: "Số dư không đủ", variant: "destructive" });
    if (turnover < MIN_TURNOVER) return toast({ title: "Chưa đủ số vòng cược tối thiểu", variant: "destructive" });
    setTxs((t) => [{
      txid: "WD" + Date.now(),
      type: "withdraw",
      amount,
      bank: bank?.bankName,
      status: "processing",
      time: new Date().toLocaleString("vi-VN"),
    }, ...t]);
    setBalance((b) => +(b - amount).toFixed(2));
    toast({ title: "Gửi yêu cầu rút tiền thành công", description: `${amount} coin · ${bank?.bankName}` });
    push({ type: "balance", title: "Rút tiền thành công", body: `-${amount} coin · ${bank?.bankName}` });
    setOpenWithdraw(false);
  };

  return (
    <main className="max-w-[503px] w-full mx-auto relative overflow-clip" style={{ fontFamily: "Roboto, sans-serif" }}>
      <div className="relative w-full">
        <img
          src="https://media.base44.com/images/public/6a729d033f9d0f63f381a6c6/61e389800_9bfeffd96_07a3de8dd600878de86f2c73376a64fa24558e67.png"
          alt="background"
          className="w-full object-cover object-center absolute inset-0 h-full"
          style={{ zIndex: 0 }}
        />

        <div className="relative z-10 flex flex-col w-full pb-24">
          <div className="absolute top-2 right-2 z-30"><NotificationBell /></div>
          <ProfileCard
            user={user}
            balance={balance}
            profit={profit}
            hidden={hidden}
            onToggleHidden={() => setHidden((h) => !h)}
            onCopyId={copyId}
            onSettings={() => setOpenSettings(true)}
          />

          <QuickMenuCard
            onBetHistory={() => setOpenBet(true)}
            onTx={(mode) => setTxMode(mode)}
            onLink={() => setOpenLink(true)}
          />

          <ActionCards
            onSupport={() => setOpenChat(true)}
            onDeposit={() => setOpenChat(true)}
            onWithdraw={() => setOpenWithdraw(true)}
          />

          <LogoutButton />
        </div>

        <BottomNav />
      </div>

      <SettingsModal open={openSettings} onOpenChange={setOpenSettings} onToast={toast} />
      <BetHistoryModal open={openBet} onOpenChange={setOpenBet} bets={bets} />
      <TxHistoryModal open={!!txMode} onOpenChange={(v) => !v && setTxMode(null)} txs={txs} mode={txMode || "both"} />
      <LinkAccountModal open={openLink} onOpenChange={setOpenLink} onAdd={addLinked} linked={linked} />
      <SupportChat open={openChat} onOpenChange={setOpenChat} />
      <WithdrawModal
        open={openWithdraw}
        onOpenChange={setOpenWithdraw}
        balance={balance}
        minTurnover={MIN_TURNOVER}
        turnover={turnover}
        linked={linked}
        onSubmit={submitWithdraw}
      />
    </main>
  );
}