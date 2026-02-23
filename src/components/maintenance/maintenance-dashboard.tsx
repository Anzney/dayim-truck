"use client";

import { useState } from "react";
import { MaintenanceHeader } from "./maintenance-header";
import { MaintenanceKPIs } from "./maintenance-kpis";
import { MaintenanceSchedule } from "./maintenance-schedule";
import { ActiveFaultCodes } from "./active-fault-codes";
import { VehicleHealthSummary } from "./vehicle-health-summary";
import { ScheduleServiceModal } from "./schedule-service-modal";

export function MaintenanceDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("MaintenanceDashboard Rendered, isModalOpen:", isModalOpen);

  const handleSchedule = (service: any) => {
    console.log("Service Scheduled:", service);
    setIsModalOpen(false);
  };

  const openModal = () => {
    console.log("Dashboard: Triggering Open Modal");
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 pt-2 space-y-4 min-h-screen bg-background text-foreground">
      <MaintenanceHeader onScheduleClick={openModal} />
      <MaintenanceKPIs />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
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

      <ScheduleServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSchedule={handleSchedule}
      />
    </div>
  );
}
