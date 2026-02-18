"use client";

import { MaintenanceHeader } from "./maintenance-header";
import { MaintenanceKPIs } from "./maintenance-kpis";
import { MaintenanceSchedule } from "./maintenance-schedule";
import { ActiveFaultCodes } from "./active-fault-codes";
import { VehicleHealthSummary } from "./vehicle-health-summary";

export function MaintenanceDashboard() {
  return (
    <div className="p-6 space-y-6 min-h-screen bg-background text-foreground">
      <MaintenanceHeader />
      <MaintenanceKPIs />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: Maintenance Schedule */}
        <div className="xl:col-span-7">
          <MaintenanceSchedule />
        </div>

        {/* Right Column: Combined Fault Codes & Health Summary */}
        <div className="xl:col-span-5 rounded-2xl border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl p-6 shadow-xl space-y-8">
          <ActiveFaultCodes />
          <VehicleHealthSummary />
        </div>
      </div>
    </div>
  );
}
