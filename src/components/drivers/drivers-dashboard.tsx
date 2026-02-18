import React from 'react'
import DriverHeader from './header'
import StatsCards from './stats-cards'
import DriverProfiles from './driver-profiles'
import FleetBehavior from './fleet-behavior'
import HoursTracking from './hours-tracking'

const DriversDashboard = () => {
  return (
    <div className="p-8 bg-background min-h-screen text-foreground">
      <DriverHeader />
      <StatsCards />

      <div className="flex flex-col lg:flex-row gap-8">
        <DriverProfiles />
        <FleetBehavior />
      </div>

      <HoursTracking />
    </div>
  )
}

export default DriversDashboard
