"use client";

import { FileText, Users, Settings, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = [
    { id: "reports", label: "Reports", icon: FileText },
    { id: "users", label: "Users & Roles", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2 p-1 bg-secondary/50 rounded-xl w-fit border border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ease-out group relative overflow-hidden",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground font-semibold shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
          >
            <tab.icon className={cn("h-4 w-4", activeTab === tab.id ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary transition-colors")} />
            <span className="relative z-10">{tab.label}</span>
            {activeTab !== tab.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            )}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search vehicles, drivers..."
          className="pl-10 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground h-10 rounded-lg focus-visible:ring-1 focus-visible:ring-primary/50"
        />
      </div>
    </div>
  );
}
