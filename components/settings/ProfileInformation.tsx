"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, UserRound } from "lucide-react";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const INITIAL_PROFILE: Profile = {
  firstName: "Aarav",
  lastName: "Sharma",
  email: "aarav.sharma@example.com",
  phone: "+91 98765 43210",
};

const PROFILE_STORAGE_KEY = "sellexa-profile";

const FIELDS: {
  key: keyof Profile;
  label: string;
  icon: typeof UserRound;
  type: string;
}[] = [
  { key: "firstName", label: "First Name", icon: UserRound, type: "text" },
  { key: "lastName", label: "Last Name", icon: UserRound, type: "text" },
  { key: "email", label: "Email Address", icon: Mail, type: "email" },
  { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
];

export default function ProfileInformation() {
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);
  const [draft, setDraft] = useState<Profile>(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load saved profile
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (parsed && typeof parsed === "object") {
          setProfile((previous) => ({ ...previous, ...parsed }));
        }
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    }

    setMounted(true);
  }, []);

  // Persist profile
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile, mounted]);

  const startEditing = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const updateField =
    (field: keyof Profile) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setDraft((previous) => ({
        ...previous,
        [field]: event.target.value,
      }));
    };

  return (
    <div
      id="profile"
      className="flex-1 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6"
    >
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-zinc-100">
          <UserRound size={24} strokeWidth={1.6} className="text-zinc-400" />
        </div>

        <div>
          <h2 className="text-[15px] font-semibold">Profile Information</h2>
          <p className="mt-0.5 text-[13px] text-zinc-500">
            Update your personal details and profile information.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map(({ key, label, icon: Icon, type }) => (
          <div key={key}>
            <p className="text-[13px] font-medium text-zinc-700">{label}</p>

            <div className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3">
              <Icon
                size={16}
                strokeWidth={1.8}
                className="shrink-0 text-zinc-400"
              />

              {isEditing ? (
                <input
                  type={type}
                  value={draft[key] ?? ""}
                  onChange={updateField(key)}
                  className="w-full bg-transparent text-sm font-medium text-zinc-800 outline-none"
                />
              ) : (
                <span className="text-sm font-medium text-zinc-800">
                  {profile[key]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-2 border-t border-zinc-100 pt-5">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-full border border-zinc-200 px-6 py-2.5 text-[13px] font-semibold text-zinc-600 transition hover:bg-zinc-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-black px-6 py-2.5 text-[13px] font-semibold text-white transition hover:bg-black/85"
            >
              Save
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={startEditing}
            className="rounded-full bg-black px-6 py-2.5 text-[13px] font-semibold text-white transition hover:bg-black/85"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
