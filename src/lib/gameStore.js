// Centralized Game Store: manages game statuses, countdown timers, payout odds, and audit logs.
// Provides real-time synchronization across client and admin components.

const STORAGE_KEY = "sands_game_store_config";
const AUDIT_LOG_KEY = "sands_game_audit_log";

// Default game configurations
const DEFAULT_GAME_CONFIGS = {
  "may-man-28": {
    gameId: "may-man-28",
    title: "Hàn Quốc may mắn 28",
    status: "active", // "active" | "maintenance" | "disabled"
    timerDuration: 299, // 04:59 in seconds
    intermission: 10,
    odds: {
      tai_xiu: 0.98,
      chan_le: 0.98,
      hoa: 95,
      cap_so: 12,
    },
  },
  "xoso": {
    gameId: "xoso",
    title: "Thời gian Đài Loan",
    status: "active",
    timerDuration: 299,
    intermission: 10,
    odds: {
      tai_xiu: 0.98,
      chan_le: 0.98,
      hoa: 95,
      cap_so: 12,
    },
  },
  "pk10": {
    gameId: "pk10",
    title: "Đài Loan PK10",
    status: "active",
    timerDuration: 299,
    intermission: 10,
    odds: {
      tai_xiu: 0.98,
      chan_le: 0.98,
      hoa: 95,
      cap_so: 12,
    },
  },
};

const listeners = new Set();

export const getGameConfigs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_GAME_CONFIGS;
    return { ...DEFAULT_GAME_CONFIGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_GAME_CONFIGS;
  }
};

export const getGameConfig = (gameId) => {
  const configs = getGameConfigs();
  return configs[gameId] || {
    gameId,
    title: gameId,
    status: "active",
    timerDuration: 299,
    intermission: 10,
    odds: { tai_xiu: 0.98, chan_le: 0.98, hoa: 95, cap_so: 12 },
  };
};

export const saveGameConfigs = (configs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
  } catch {
    /* ignore */
  }
  listeners.forEach((cb) => cb(configs));
  try {
    window.dispatchEvent(new CustomEvent("game-status-changed", { detail: configs }));
  } catch {
    /* ignore */
  }
};

export const updateGameConfig = (gameId, patch, adminMeta = {}) => {
  const configs = getGameConfigs();
  const oldConfig = configs[gameId] || getGameConfig(gameId);
  const newConfig = { ...oldConfig, ...patch };

  // Write Audit Log
  const diffs = [];
  if (patch.status !== undefined && patch.status !== oldConfig.status) {
    diffs.push({ field: "Trạng thái (Status)", old: oldConfig.status, new: patch.status });
  }
  if (patch.timerDuration !== undefined && patch.timerDuration !== oldConfig.timerDuration) {
    diffs.push({
      field: "Thời gian cược (Timer)",
      old: formatMMSS(oldConfig.timerDuration),
      new: formatMMSS(patch.timerDuration),
    });
  }
  if (patch.odds !== undefined) {
    Object.keys(patch.odds).forEach((k) => {
      if (oldConfig.odds?.[k] !== patch.odds[k]) {
        diffs.push({
          field: `Tỷ lệ cược (${k})`,
          old: `1:${oldConfig.odds?.[k] ?? 0.98}`,
          new: `1:${patch.odds[k]}`,
        });
      }
    });
  }

  if (diffs.length > 0) {
    addAuditLog({
      adminId: adminMeta.adminId || "Admin",
      ip: adminMeta.ip || "127.0.0.1",
      gameId,
      gameTitle: newConfig.title || gameId,
      diffs,
    });
  }

  const updatedConfigs = { ...configs, [gameId]: newConfig };
  saveGameConfigs(updatedConfigs);
  return newConfig;
};

export const subscribeGameStore = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

// ── Audit Logs ──────────────────────────────────────────────
export const getAuditLogs = () => {
  try {
    const raw = localStorage.getItem(AUDIT_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addAuditLog = (entry) => {
  const logItem = {
    id: "log_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    timestamp: new Date().toLocaleString("vi-VN"),
    isoTime: new Date().toISOString(),
    adminId: entry.adminId || "Admin",
    ip: entry.ip || "127.0.0.1",
    gameId: entry.gameId,
    gameTitle: entry.gameTitle,
    diffs: entry.diffs || [],
  };

  const logs = getAuditLogs();
  const nextLogs = [logItem, ...logs].slice(0, 200); // Keep last 200 logs
  try {
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(nextLogs));
  } catch {
    /* ignore */
  }
  return logItem;
};

// Utility: format seconds into MM:SS
export const formatMMSS = (totalSeconds) => {
  const secs = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

// Utility: parse MM:SS string into seconds
export const parseMMSS = (str) => {
  if (!str) return 299;
  const parts = str.split(":");
  if (parts.length === 2) {
    const m = parseInt(parts[0], 10) || 0;
    const s = parseInt(parts[1], 10) || 0;
    return m * 60 + s;
  }
  return parseInt(str, 10) || 299;
};
