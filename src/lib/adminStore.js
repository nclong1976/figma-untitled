// localStorage-backed admin data layer (overlays real User entity).
// Keeps the admin panel fully functional in preview without extra entities.

const KEY = "stargame_admin_v1";

export const DEMO_USERS = [
  { id: "demo-1", full_name: "Nguyễn Văn An", email: "annguyen@example.com", role: "user", created_date: "2026-07-12T08:00:00Z" },
  { id: "demo-2", full_name: "Trần Thị Bình", email: "binhtran@example.com", role: "user", created_date: "2026-07-20T10:30:00Z" },
  { id: "demo-3", full_name: "Lê Hoàng Cường", email: "cuonglee@example.com", role: "user", created_date: "2026-08-01T14:12:00Z" },
];

const seedRecord = () => ({
  balance: Math.round(500 + Math.random() * 9500),
  locked: false,
  banks: [
    { id: "bk1", type: "bank", label: "VCB · 7931", status: "linked" },
    { id: "bk2", type: "crypto", label: "USDT (TRC20) · TNf9…k9", status: "linked" },
  ],
  bets: [
    { id: "B001", game: "May mắn 28", period: "20260805-101", amount: 200, status: "win", time: "2026-08-04 21:03" },
    { id: "B002", game: "PK10", period: "20260805-098", amount: 500, status: "loss", time: "2026-08-04 20:55" },
    { id: "B003", game: "Xổ số", period: "20260805-077", amount: 100, status: "pending", time: "2026-08-05 09:10" },
  ],
  txs: [
    { id: "TX01", type: "deposit", amount: 1000, method: "VCB", status: "pending", time: "2026-08-05 11:20" },
    { id: "TX02", type: "withdraw", amount: 500, method: "USDT TRC20", status: "pending", time: "2026-08-05 12:01" },
    { id: "TX03", type: "deposit", amount: 2000, method: "VCB", status: "approved", time: "2026-08-04 18:40" },
  ],
  logs: [],
});

const raw = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || { records: {} }; } catch { return { records: {} }; }
};
const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* ignore */ } };

export const getRecord = (id) => {
  const s = raw();
  if (!s.records[id]) { s.records[id] = seedRecord(); save(s); }
  return s.records[id];
};

const mutate = (id, fn) => {
  const s = raw();
  if (!s.records[id]) s.records[id] = seedRecord();
  fn(s.records[id]);
  save(s);
  return s.records[id];
};

const now = () => new Date().toLocaleString("vi-VN");

export const addLog = (id, entry) => mutate(id, (r) => {
  r.logs = [{ id: "L" + Date.now(), time: now(), ...entry }, ...(r.logs || [])].slice(0, 100);
});

export const adjustBalance = (id, delta, reason, adminEmail) => {
  mutate(id, (r) => { r.balance = Math.max(0, +(r.balance + delta).toFixed(2)); });
  addLog(id, { by: adminEmail, action: delta >= 0 ? "Cộng số dư" : "Trừ số dư", detail: `${delta >= 0 ? "+" : ""}${delta} coin${reason ? " · " + reason : ""}` });
};

export const setLock = (id, locked, adminEmail) => {
  mutate(id, (r) => { r.locked = locked; });
  addLog(id, { by: adminEmail, action: locked ? "Khoá tài khoản" : "Mở khoá tài khoản", detail: locked ? "Đã khoá" : "Đã mở khoá" });
};

export const setTxStatus = (id, txId, status, adminEmail) => {
  const rec = getRecord(id);
  const tx = (rec.txs || []).find((t) => t.id === txId);
  if (!tx) return;
  mutate(id, (r) => {
    const t = (r.txs || []).find((x) => x.id === txId);
    if (t) t.status = status;
  });
  addLog(id, { by: adminEmail, action: `Duyệt lệnh ${tx.type === "deposit" ? "nạp" : "rút"}`, detail: `${tx.amount} coin · ${status === "approved" ? "Duyệt" : "Từ chối"}` });
};

export const addBank = (id, bank) => mutate(id, (r) => {
  r.banks = [{ id: "bk" + Date.now(), status: "linked", ...bank }, ...(r.banks || [])];
});

export const setProfileName = (id, name) => mutate(id, (r) => { r.nameOverride = name; });