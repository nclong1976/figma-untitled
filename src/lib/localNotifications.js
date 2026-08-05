// Hệ thống thông báo cục bộ per-user (localStorage) — clean slate khi đăng ký.
import { localListUsers } from "@/lib/localAuth";

const inboxKey = (userId) => `stargame_notif_${userId}`;
const ADMIN_LOG_KEY = "stargame_notif_adminlog";

const listeners = new Map(); // userId -> Set<cb>

const read = (userId) => {
  if (!userId) return [];
  try { return JSON.parse(localStorage.getItem(inboxKey(userId))) || []; } catch { return []; }
};
const write = (userId, list) => {
  try { localStorage.setItem(inboxKey(userId), JSON.stringify(list.slice(0, 100))); } catch { /* ignore */ }
  emit(userId);
};
const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const emit = (userId) => { listeners.get(userId)?.forEach((cb) => cb()); };

export const getNotifications = (userId) => read(userId);

export const pushNotification = (userId, n) => {
  if (!userId) return null;
  const item = { id: genId(), time: new Date().toISOString(), read: false, type: "info", ...n };
  write(userId, [item, ...read(userId)]);
  return item.id;
};

export const markRead = (userId, id) =>
  write(userId, read(userId).map((n) => (n.id === id ? { ...n, read: true } : n)));
export const markAllRead = (userId) =>
  write(userId, read(userId).map((n) => ({ ...n, read: true })));
export const removeNotification = (userId, id) =>
  write(userId, read(userId).filter((n) => n.id !== id));
export const clearAll = (userId) => write(userId, []);

// Gửi tới mọi người dùng (broadcast).
export const broadcastNotification = (n) => {
  localListUsers().forEach((u) => pushNotification(u.id, { ...n, audience: "all" }));
  logAdmin({ ...n, audience: "all", target: "" });
};

// Gửi đích danh theo username (account).
export const sendToUser = (account, n) => {
  const acc = String(account || "").trim().toLowerCase();
  const u = localListUsers().find((x) => x.account.toLowerCase() === acc);
  if (!u) return false;
  pushNotification(u.id, { ...n, audience: "user" });
  logAdmin({ ...n, audience: "user", target: u.account });
  return true;
};

// Thông báo cho các tài khoản quản trị (dùng khi người dùng nạp tiền…).
export const notifyAdmins = (n) => {
  localListUsers()
    .filter((u) => u.role === "admin")
    .forEach((a) => pushNotification(a.id, { ...n, audience: "admin" }));
};

// Nhật ký thông báo admin đã gửi.
export const getAdminLog = () => {
  try { return JSON.parse(localStorage.getItem(ADMIN_LOG_KEY)) || []; } catch { return []; }
};
const logAdmin = (entry) => {
  const item = { id: genId(), time: new Date().toISOString(), ...entry };
  const list = getAdminLog();
  try { localStorage.setItem(ADMIN_LOG_KEY, JSON.stringify([item, ...list].slice(0, 100))); } catch { /* ignore */ }
  return item;
};
export const removeAdminLog = (id) => {
  const list = getAdminLog().filter((n) => n.id !== id);
  try { localStorage.setItem(ADMIN_LOG_KEY, JSON.stringify(list)); } catch { /* ignore */ }
};

// Lắng nghe thay đổi inbox của một user.
export const subscribe = (userId, cb) => {
  if (!userId) return () => {};
  if (!listeners.has(userId)) listeners.set(userId, new Set());
  listeners.get(userId).add(cb);
  return () => listeners.get(userId)?.delete(cb);
};