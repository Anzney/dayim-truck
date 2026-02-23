"use client";

import { Bell, Link2, CheckCircle2, XCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const notifications = [
  { id: "fuel", label: "Fuel alerts", enabled: true },
  { id: "maintenance", label: "Maintenance reminders", enabled: true },
  { id: "speed", label: "Speed violations", enabled: true },
  { id: "geofence", label: "Geofence breaches", enabled: true },
  { id: "trip", label: "Trip completion", enabled: true },
];

const integrations = [
  { name: "Google Maps API", status: "Connected", icon: Link2 },
  { name: "Fuel Card API", status: "Not Connected", icon: Link2 },
  { name: "ELD Provider", status: "Connected", icon: Link2 },
  { name: "Accounting Software", status: "Not Connected", icon: Link2 },
];

export function SettingsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Notifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground uppercase tracking-wider">Notifications</h2>
        </div>

        <div className="space-y-6">
          {notifications.map((notif) => (
            <div key={notif.id} className="flex items-center justify-between group">
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                {notif.label}
              </span>
              <Switch
                defaultChecked={notif.enabled}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* API Integrations Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Link2 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground uppercase tracking-wider">API Integrations</h2>
        </div>

        <div className="space-y-4">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-transparent hover:border-primary/30 hover:bg-muted/50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-foreground font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.status === "Connected" ? (
                  <>
                    <span className="text-xs font-bold text-primary">Connected</span>
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </>
                ) : (
                  <>
                    <span className="text-xs font-bold text-muted-foreground">Not Connected</span>
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
