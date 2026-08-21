"use client";

import { useEffect, useState } from "react";
import { Bell, Mail, Sparkles, Tag } from "lucide-react";

const NOTIFICATION_DEFAULTS = [
  {
    id: "orderUpdates",
    icon: Bell,
    title: "Order Updates",
    description: "Receive updates about your orders and deliveries.",
    enabled: true,
  },
  {
    id: "promotions",
    icon: Tag,
    title: "Promotions & Offers",
    description: "Get notified about exclusive deals and discounts.",
    enabled: true,
  },
  {
    id: "newsletter",
    icon: Mail,
    title: "Newsletter",
    description: "Receive our newsletter with the latest updates.",
    enabled: false,
  },
  {
    id: "recommendations",
    icon: Sparkles,
    title: "Product Recommendations",
    description: "Get personalized product recommendations.",
    enabled: true,
  },
];

const NOTIFICATIONS_STORAGE_KEY = "sellexa-notifications";

export default function NotificationPreferences() {
  const [notifications, setNotifications] = useState(
    NOTIFICATION_DEFAULTS
  );
  const [mounted, setMounted] = useState(false);

  // Load saved notification preferences
  useEffect(() => {
    try {
      const saved = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setNotifications((previous) =>
            previous.map((item) => {
              const match = parsed.find(
                (entry) => entry?.id === item.id
              );

              return match
                ? { ...item, enabled: Boolean(match.enabled) }
                : item;
            })
          );
        }
      }
    } catch (error) {
      console.error(
        "Failed to load notification preferences:",
        error
      );
    }

    setMounted(true);
  }, []);

  // Persist notification preferences
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify(
        notifications.map(({ id, enabled }) => ({ id, enabled }))
      )
    );
  }, [notifications, mounted]);

  const toggleNotification = (id: string) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div
      id="notifications"
      className="flex-1 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6"
    >
      <h2 className="text-[15px] font-semibold">
        Notification Preferences
      </h2>
      <p className="mt-0.5 text-[13px] text-zinc-500">
        Choose how you want to receive updates and alerts.
      </p>

      <div className="mt-5 divide-y divide-zinc-100">
        {notifications.map(
          ({ id, icon: Icon, title, description, enabled }) => (
            <div
              key={id}
              className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0"
            >
              <Icon
                size={17}
                strokeWidth={1.8}
                className="shrink-0 text-zinc-400"
              />

              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-900">
                  {title}
                </p>
                <p className="mt-0.5 text-[12.5px] text-zinc-500">
                  {description}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={enabled}
                aria-label={`Toggle ${title}`}
                onClick={() => toggleNotification(id)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  enabled ? "bg-black" : "bg-zinc-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition ${
                    enabled ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
