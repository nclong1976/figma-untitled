import { useEffect, useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

// Per-user wallet. New users get a wallet auto-created at 0 on first load.
// Balance is the source of truth for money across Home / Profile / Gameplay.
export function useWallet() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(0);
  const [ready, setReady] = useState(false);

  const load = useCallback(() => {
    if (!user) { setWallet(null); setBalance(0); setReady(true); return; }
    base44.entities.Wallet.filter({ userId: user.id })
      .then(async (list) => {
        if (list && list.length > 0) {
          setWallet(list[0]);
          setBalance(Number(list[0].balance) || 0);
        } else {
          try {
            const w = await base44.entities.Wallet.create({ userId: user.id, userEmail: user.email, balance: 0 });
            setWallet(w); setBalance(0);
          } catch (e) {
            const l = await base44.entities.Wallet.filter({ userId: user.id }).catch(() => []);
            setWallet(l[0] || null); setBalance(Number(l[0]?.balance) || 0);
          }
        }
        setReady(true);
      })
      .catch(() => setReady(true));
  }, [user]);

  useEffect(() => {
    load();
    if (!user) return;
    const unsub = base44.entities.Wallet.subscribe(() => load());
    return () => unsub && unsub();
  }, [user, load]);

  const update = useCallback(async (newBalance) => {
    if (!wallet) return;
    const nb = +Number(newBalance).toFixed(2);
    try {
      await base44.entities.Wallet.update(wallet.id, { balance: nb });
      setBalance(nb);
    } catch (e) { load(); }
  }, [wallet, load]);

  return { balance, wallet, ready, update, reload: load };
}