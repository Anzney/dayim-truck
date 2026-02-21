"use client";

import { useState } from "react";
import { Header } from "./header";
import { TabNavigation } from "./tab-navigation";
import { ReportsTab } from "./reports-tab";
import { UsersRolesTab } from "./users-roles-tab";
import { SettingsTab } from "./settings-tab";
import { motion, AnimatePresence } from "framer-motion";

export function ReportsSettingsDashboard() {
  const [activeTab, setActiveTab] = useState("reports");

  return (
    <div className="min-h-screen bg-transparent text-foreground pt-4 px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "reports" && <ReportsTab />}
            {activeTab === "users" && <UsersRolesTab />}
            {activeTab === "settings" && <SettingsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
