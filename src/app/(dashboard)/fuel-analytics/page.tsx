"use client"

import React from 'react'
import FuelAnalyticsHeader from '@/components/fuel-analytics/header'
import FuelKpiSection from '@/components/fuel-analytics/kpi-section'
import FuelChartsSection from '@/components/fuel-analytics/charts-section'
import FuelTablesSection from '@/components/fuel-analytics/tables-section'
import { ScrollArea } from '@/components/ui/scroll-area'

const FuelAnalyticsPage = () => {
  return (
    <div className="flex flex-col bg-background h-[calc(100vh-56px)] overflow-y-auto">
      <FuelAnalyticsHeader />

      <div className="flex-1">
        <div className="max-w-[1600px] mx-auto space-y-2 p-4 pb-12">
          <FuelKpiSection />
          <FuelChartsSection />
          <FuelTablesSection />
        </div>
      </div>
    </div>
  )
}

export default FuelAnalyticsPage
