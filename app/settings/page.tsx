"use client";

import { useState } from "react";
import Header from "@/components/home/Header";
import HomeFooter from "@/components/home/HomeFooter";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import ProfileInformation from "@/components/settings/ProfileInformation";
import SavedAddresses from "@/components/settings/SavedAddresses";
import Wallet from "@/components/settings/Wallet";
import NotificationPreferences from "@/components/settings/NotificationPreferences";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <main className="min-h-screen bg-[#f5f6f3] text-zinc-900 lg:pt-[72px]">
      <Header />

      <section className="mx-auto w-[calc(100%-24px)] py-8 sm:w-[calc(100%-32px)] sm:py-10">
        <div className="grid gap-6 overflow-x-hidden lg:grid-cols-[3fr_7fr]">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-[-0.045em] text-black sm:text-2xl lg:text-3xl">
              Settings
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Manage your account preferences and stay in control.
            </p>

            <div className="mt-8">
              <SettingsSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>
          </div>

          <div className="flex min-h-[460px] min-w-0 flex-col space-y-6">
            {activeSection === "profile" && <ProfileInformation />}
            {activeSection === "address" && <SavedAddresses />}
            {activeSection === "wallet" && <Wallet />}
            {activeSection === "notifications" && (
              <NotificationPreferences />
            )}
          </div>
        </div>
      </section>

      <HomeFooter />
    </main>
  );
}
