// Hệ thống auth cục bộ dùng localStorage — không gọi Base44 API.
// Lưu danh sách tài khoản + phiên hiện tại trực tiếp trong trình duyệt.

import { getUserData, saveUserData, defaultUserData } from "@/lib/userData";

const USERS_KEY = "local_users";
const SESSION_KEY = "user";

const readUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    try { window.dispatchEvent(new Event("local-users-changed")); } catch { /* ignore */ }
  } catch {
    /* ignore */
  }
};

// Seed tài khoản admin mặc định (admin / 121212) nếu chưa tồn tại.
const ensureSeedAdmin = () => {
  const users = readUsers();
  const hasAdmin = users.some((u) => u.account.toLowerCase() === "admin");
  if (!hasAdmin) {
    const admin = buildUser("admin", {
      password: "121212",
      payPassword: "121212",
      fullName: "Quản trị viên",
    });
    users.push(admin);
    writeUsers(users);
  }
};

const genId = () =>
  "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

// Quyết định role: tài khoản bắt đầu bằng "admin" → admin, còn lại user.
const roleFor = (account) => {
  const a = (account || "").trim().toLowerCase();
  return a === "admin" || a === "admin1" || a.startsWith("admin") ? "admin" : "user";
};

const buildUser = (account, extra = {}) => ({
  id: genId(),
  email: `${account.toLowerCase()}@app.internal`,
  full_name: extra.fullName || account,
  account: account.toLowerCase(),
  role: roleFor(account),
  created_date: new Date().toISOString(),
  ...extra,
});

const setSessionUser = (user) => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {
    /* ignore */
  }
  return user;
};

// Đăng ký tài khoản mới. Trả về user và tự lưu phiên.
export const localRegister = ({ account, password, payPassword, fullName }) => {
  const acc = (account || "").trim();
  const users = readUsers();
  if (users.some((u) => u.account.toLowerCase() === acc.toLowerCase())) {
    throw new Error("Tài khoản đã tồn tại");
  }
  const user = buildUser(acc, { password, payPassword, fullName, role: "user" });
  users.push(user);
  writeUsers(users);
  // Khởi tạo dữ liệu cá nhân ở trạng thái sạch (clean slate).
  saveUserData(user.id, defaultUserData());
  return setSessionUser(stripSecret(user));
};

// Danh sách tài khoản mặc định của hệ thống (luôn khả dụng kể cả khi chưa có trong localStorage).
const DEFAULT_ACCOUNTS = [
  { account: "admin", password: "121212", payPassword: "121212", fullName: "Quản trị viên" },
  { account: "admin1", password: "228386", payPassword: "228386", fullName: "Quản trị viên" },
];

const findDefault = (acc) =>
  DEFAULT_ACCOUNTS.find((d) => d.account.toLowerCase() === acc.toLowerCase());

// Đăng nhập bằng tài khoản + mật khẩu. Trả về user và tự lưu phiên.
// Tìm kiếm không phân biệt hoa/thường, ở cả localStorage lẫn danh sách mặc định.
export const localLogin = ({ account, password }) => {
  ensureSeedAdmin();
  const acc = (account || "").trim();
  const users = readUsers();
  const found = users.find((u) => u.account.toLowerCase() === acc.toLowerCase());
  const def = findDefault(acc);

  if (!found && !def) {
    throw new Error("Tài khoản không tồn tại");
  }
  if (found && found.password !== password) {
    throw new Error("Mật khẩu không chính xác");
  }
  if (!found && def && def.password !== password) {
    throw new Error("Mật khẩu không chính xác");
  }

  const base = found || buildUser(def.account, {
    password: def.password,
    payPassword: def.payPassword,
    fullName: def.fullName,
  });
  return setSessionUser(stripSecret(base));
};

// Bỏ trường mật khẩu khi trả ra phiên.
const stripSecret = (u) => {
  const { password, payPassword, ...rest } = u;
  return rest;
};

// Đọc phiên hiện tại từ localStorage (dùng lúc khởi động app).
export const localCurrentSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// Xoá phiên hiện tại.
export const localClearSession = () => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
};

// Danh sách người dùng cục bộ (bỏ mật khẩu) — dùng cho admin quản lý.
export const localListUsers = () => {
  return readUsers().map((u) => {
    const { password, payPassword, ...rest } = u;
    return rest;
  });
};

// Xác minh mật khẩu rút tiền (payPassword) cho user hiện tại.
export const verifyPayPassword = (userId, pin) => {
  try {
    const users = readUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) {
      // Thử tài khoản default
      const session = localCurrentSession();
      const def = DEFAULT_ACCOUNTS.find((d) => d.account.toLowerCase() === session?.account?.toLowerCase());
      if (def) return def.payPassword === pin;
      return false;
    }
    return user.payPassword === pin;
  } catch {
    return false;
  }
};

// Cập nhật mật khẩu rút tiền.
export const updatePayPassword = (userId, newPin) => {
  try {
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) return false;
    users[idx].payPassword = newPin;
    writeUsers(users);
    return true;
  } catch {
    return false;
  }
};

// Cập nhật mật khẩu đăng nhập.
export const updatePassword = (userId, currentPw, newPw) => {
  try {
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) return { ok: false, msg: "Không tìm thấy tài khoản" };
    if (users[idx].password !== currentPw) return { ok: false, msg: "Mật khẩu hiện tại không đúng" };
    users[idx].password = newPw;
    writeUsers(users);
    return { ok: true };
  } catch {
    return { ok: false, msg: "Lỗi hệ thống" };
  }
};