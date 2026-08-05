import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const NotificationContext = createContext(null);
const KEY = "stargame_notifications";

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(notifications.slice(0, 50))); } catch { /* ignore */ }
  }, [notifications]);

  const push = useCallback((n) => {
    const item = { id: Date.now() + Math.random(), time: new Date().toISOString(), read: false, type: "info", ...n };
    setNotifications((list) => [item, ...list].slice(0, 50));
    return item.id;
  }, []);

  const markAllRead = useCallback(() => setNotifications((l) => l.map((n) => ({ ...n, read: true }))), []);
  const clear = useCallback(() => setNotifications([]), []);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unread, push, markAllRead, clear }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) return { notifications: [], unread: 0, push: () => {}, markAllRead: () => {}, clear: () => {} };
  return ctx;
}