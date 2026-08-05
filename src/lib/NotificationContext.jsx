import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import * as notif from "@/lib/localNotifications";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id;

  const [notifications, setNotifications] = useState(() => notif.getNotifications(userId));

  useEffect(() => {
    setNotifications(notif.getNotifications(userId));
    if (!userId) return;
    const unsub = notif.subscribe(userId, () => setNotifications(notif.getNotifications(userId)));
    const onStorage = (e) => {
      if (e.key === `stargame_notif_${userId}`) setNotifications(notif.getNotifications(userId));
    };
    window.addEventListener("storage", onStorage);
    return () => { unsub(); window.removeEventListener("storage", onStorage); };
  }, [userId]);

  const push = useCallback((n) => (userId ? notif.pushNotification(userId, n) : null), [userId]);
  const markAllRead = useCallback(() => userId && notif.markAllRead(userId), [userId]);
  const markRead = useCallback((id) => userId && notif.markRead(userId, id), [userId]);
  const remove = useCallback((id) => userId && notif.removeNotification(userId, id), [userId]);
  const clear = useCallback(() => userId && notif.clearAll(userId), [userId]);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unread, push, markAllRead, markRead, remove, clear }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) return { notifications: [], unread: 0, push: () => {}, markAllRead: () => {}, markRead: () => {}, remove: () => {}, clear: () => {} };
  return ctx;
}