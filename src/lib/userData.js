import { useState, useEffect } from "react";

// Kho dữ liệu cá nhân theo user (localStorage) — trạng thái sạch khi đăng ký.
const key = (userId) => `userdata_${userId}`;

export const defaultUserData = () => ({
  balance: 0,
  profit: 0,
  bets: [],
  txs: [],
  linked: [],
  turnover: 0,
  withdrawRequests: [], // Đơn rút tiền đang chờ admin duyệt
});

const listeners = new Set();

export const getUserData = (userId) => {
  if (!userId) return defaultUserData();
  try {
    const raw = localStorage.getItem(key(userId));
    if (!raw) {
      const d = defaultUserData();
      localStorage.setItem(key(userId), JSON.stringify(d));
      return d;
    }
    return { ...defaultUserData(), ...JSON.parse(raw) };
  } catch {
    return defaultUserData();
  }
};

export const saveUserData = (userId, data) => {
  if (!userId) return;
  try { localStorage.setItem(key(userId), JSON.stringify(data)); } catch { /* ignore */ }
  listeners.forEach((l) => l(userId));
};

export const updateUserData = (userId, patch) => {
  const cur = getUserData(userId);
  const next = typeof patch === "function" ? patch(cur) : { ...cur, ...patch };
  saveUserData(userId, next);
  return next;
};

export const subscribeUserData = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

// React hook tiện lợi cho component.
export const useUserData = (userId) => {
  const [data, setData] = useState(() => getUserData(userId));
  useEffect(() => {
    setData(getUserData(userId));
    const unsub = subscribeUserData((uid) => {
      if (!userId || uid === userId) setData(getUserData(userId));
    });
    return unsub;
  }, [userId]);
  const update = (patch) => updateUserData(userId, patch);
  return { data, update };
};