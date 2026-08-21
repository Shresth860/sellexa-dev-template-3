"use client";

import { useRouter } from "next/navigation";
import { Bell, LogOut, MapPin, UserRound, Wallet } from "lucide-react";

const NAV_ITEMS = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "address", label: "Address", icon: MapPin },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "notifications", label: "Notifications", icon: Bell },
];

type SettingsSidebarProps = {
  activeSection: string;
  onSectionChange: (id: string) => void;
};

export default function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/auth/login");
  };

  return (
    <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-2">
      <nav className="space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              onSectionChange(id);
            }}
            className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
              activeSection === id
                ? "bg-zinc-100 text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
          >
            <Icon size={16} strokeWidth={1.8} />
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-1 border-t border-zinc-100 pt-1">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900"
        >
          <LogOut size={16} strokeWidth={1.8} />
          Logout
        </button>
      </div>
    </aside>
  );
}
