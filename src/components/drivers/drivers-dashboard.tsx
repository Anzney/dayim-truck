"use client";

import React, { useState } from 'react'
import DriverHeader from './header'
import StatsCards from './stats-cards'
import DriverProfiles from './driver-profiles'
import FleetBehavior from './fleet-behavior'
import HoursTracking from './hours-tracking'
import { AddDriverModal } from './add-driver-modal'

const DriversDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDriver = (driver: { name: string; vehicle: string }) => {
    console.log("Adding driver:", driver);
  };

  return (
    <div className="pt-4 px-8 pb-8 bg-background min-h-screen text-foreground">
      <DriverHeader onAddClick={() => setIsModalOpen(true)} />
      <StatsCards />

      <div className="flex flex-col lg:flex-row gap-8">
        <DriverProfiles />
        <FleetBehavior />
      </div>

      <HoursTracking />

      <AddDriverModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddDriver}
      />
    </div>
  )
}

export default DriversDashboard
