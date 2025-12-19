import { useEffect, useRef } from "react";

export function useReminderNotifications(notes) {
  const notifiedRef = useRef(new Set());

  useEffect(() => {
    // Request notification permission on mount
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Function to check and send notifications
    const checkReminders = () => {
      if (Notification.permission !== "granted") return;

      const now = Date.now();
      notes.forEach((note) => {
        if (!note.reminder) return;

        const reminderKey = `${note.id}-${note.reminder}`;

        // Check if reminder is due and not already notified
        // Allow 5-minute window for past reminders
        if (
          note.reminder <= now &&
          note.reminder > now - 300000 && // Within last 5 minutes
          !notifiedRef.current.has(reminderKey)
        ) {
          notifiedRef.current.add(reminderKey);

          const notification = new Notification("Keep Clone Reminder", {
            body: note.title || note.body || "You have a reminder",
            icon: "/favicon.ico",
            tag: note.id,
            requireInteraction: false
          });

          // Clear notification after 10 seconds
          setTimeout(() => notification.close(), 10000);
        }
      });
    };

    // Check immediately on mount/update
    checkReminders();

    // Check for due reminders every 10 seconds
    const interval = setInterval(checkReminders, 10000);

    return () => clearInterval(interval);
  }, [notes]);

  // Clean up old notified items periodically
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      const activeReminderKeys = new Set(
        notes
          .filter((n) => n.reminder && n.reminder > now - 3600000) // Last hour
          .map((n) => `${n.id}-${n.reminder}`)
      );

      notifiedRef.current = new Set(
        [...notifiedRef.current].filter((key) => activeReminderKeys.has(key))
      );
    }, 3600000); // Clean up every hour

    return () => clearInterval(cleanup);
  }, [notes]);
}
