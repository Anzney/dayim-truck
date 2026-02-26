import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Sparkles, Truck, Gauge, Thermometer } from 'lucide-react'
import FleetMaintenance from './fleet-maintenance'
import VehicleOffRoadUpdates from './vehicle-off-road-updates'
import CompactMap from './compact-map'
import VehiclesContractRiskChart from './VehiclesContractRiskChart'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import FullDonutChart from '../ui/full-donut-chart'
import LoadUtilizationChart from './load-utilization-chart'
import ActiveIdleTimeChart from './active-idle-time-chart'

const maintenanceData = {
  totalFleet: 20,
  goodCondition: 14,
  mediumRisk: 4,
  highRisk: 2,
  chartData: [
    { name: 'Good Condition', value: 14, color: 'var(--primary)' },
    { name: 'Medium Risk', value: 4, color: 'var(--color-chart-4)' },
    { name: 'High Risk', value: 2, color: 'hsl(var(--destructive))' },
  ]
}

const KpiHeaderCards = () => {
  return (
    <div className='grid grid-cols-2 flex-1 gap-4 max-h-[calc(100svh-100px)] overflow-y-scroll'>
      {/* KPI Card 1 */}
      <div className='rounded-2xl border backdrop-blur-3xl dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl flex-shrink-0'>
        <div className='p-4'>
          <div className='flex  items-center justify-between'>
            <div className='flex gap-4 items-center'>
              <div className='border rounded-lg p-3 bg-gray-100 dark:bg-neutral-900'>
                <Truck className='size-4 text-muted-foreground' />
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Total Fleets</p>
                <p className='tabular-nums text-lg font-bold dark:text-foreground'>24</p>
              </div>
            </div>
            <Button className="p-3" variant="outline" size="default">See All</Button>
          </div>

          <div className='w-full flex items-center mt-4 gap-1'>
            <div className='h-3 w-[70%] bg-primary rounded-sm  flex items-center justify-center text-white font-bold text-shadow' />
            <div className='h-3 w-[15%] bg-amber-500 rounded-sm flex items-center justify-center text-white font-bold text-shadow' />
            <div className="h-3 w-[10%] bg-destructive rounded-sm flex items-center justify-center text-white font-bold text-shadow" />
          </div>
        </div>
        <div className='p-3 border-t flex items-center justify-center'>
          <div className='rounded-lg flex flex-wrap gap-4'>
            <div className='flex items-center gap-1'>
              <div className='h-2 w-2 rounded-full bg-primary'></div>
              <p className='  text-xs tracking-tight'>In use</p>
              <p className='  text-xs font-bold ml-auto flex items-center gap-1 dark:text-foreground'>18</p>
            </div>

            <div className='flex items-center gap-1'>
              <div className='h-2 w-2 rounded-full bg-amber-500'></div>
              <p className='  text-xs tracking-tight'>Upcoming Service</p>
              <p className='  text-xs font-bold ml-auto flex items-center gap-1 dark:text-foreground'>2</p>
            </div>

            <div className='flex items-center gap-1'>
              <div className='h-2 w-2 rounded-full bg-destructive'></div>
              <p className='  text-xs tracking-tight'>Vehicle Off Road</p>
              <p className='  text-xs font-bold ml-auto flex items-center gap-1 dark:text-foreground'>4</p>
            </div>
          </div>
        </div>
      </div>
      {/* KPI Card 3 */}
      <div className='p-4 rounded-2xl flex flex-col row-span-2  justify-between border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl'>
        <div className=''>
          <div className='flex items-center justify-between border-b'>
            <div className='flex items-center gap-4 mb-4'>
              <div className='border rounded-lg p-3 bg-gray-100 dark:bg-neutral-900'>
                <Gauge className='size-5 text-muted-foreground ' />
              </div>
              <div>
                <p className='text-base'>Rental Usage Status</p>
                <p className='text-sm text-muted-foreground'>KM/Month/Vehicle - 5000KM</p>
              </div>
            </div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer p-1 rounded-xl w-max bg-gradient-to-r from-amber-200 to-amber-300">
                  <div className='bg-white rounded-full p-1'>
                    <Sparkles className='size-3 text-black' />
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between gap-4">
                  <div className="space-y-1">
                    <div className='flex items-center gap-2 mb-2'>
                      <Sparkles className='size-5' />
                      <h4 className='  font-bold text-sm'>
                        DayimGPT Insights
                      </h4>
                    </div>
                    <p className='text-sm   tracking-tight mb-1'>
                      At your current usage rate (350 km/day), you will exceed your rental limit in 3 days.
                    </p>
                    <p className='text-sm   tracking-tight mb-1'>
                      If you exceed by 500 km, estimated extra rental charges ~$2,500.
                    </p>
                    <p className='text-sm   tracking-tight'>
                      Consider upgrading rental contract to unlimited km to save ~$8,000/month.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className='flex justify-center items-center mt-4 pb-6'>
            <VehiclesContractRiskChart
              data={[
                { vehicle: "8446-BGB", usage: 4200 },
                { vehicle: "8935-BGB", usage: 5100 },
                { vehicle: "8477-BGB", usage: 4950 },
                { vehicle: "8569-BGB", usage: 4350 },
                { vehicle: "4039-NEB", usage: 4450 },
                { vehicle: "4297-NEB", usage: 4850 }
              ]}
              contractLimit={5000}
            />
          </div>
        </div>
      </div>
      {/* KPI Card 4 */}
      <div className='p-4 flex items-start justify-between rounded-2xl border backdrop-blur-3xl dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl flex-shrink-0'>
        <div className=''>
          <div className='flex  items-center justify-between mb-4'>
            <div className='flex gap-4 items-center'>
              <div className='border rounded-lg p-3 bg-gray-100 dark:bg-neutral-900'>
                <Thermometer className='size-4 text-muted-foreground' />
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Cargo Temperature</p>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between mt-4 pr-6'>
            <div className='flex items-center gap-4 justify-between'>
              <div className='rounded-lg flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <div className='h-2 w-2 rounded-full bg-[#10B981]'></div>
                  <p className='  text-xs tracking-tight'>Good Condition</p>
                  <p className='  text-xs font-bold ml-4 flex items-center gap-1 dark:text-foreground'>14</p>
                </div>

                <div className='flex items-center gap-2'>
                  <div className='h-2 w-2 rounded-full bg-amber-400'></div>
                  <p className='  text-xs tracking-tight'>Medium Spoilage Risk</p>
                  <p className='  text-xs font-bold ml-auto flex items-center gap-1 dark:text-foreground'>4</p>
                </div>

                <div className='flex items-center gap-2'>
                  <div className='h-2 w-2 rounded-full bg-red-400'></div>
                  <p className='  text-xs tracking-tight'>High Spoilage Risk</p>
                  <p className='  text-xs font-bold ml-auto flex items-center gap-1 dark:text-foreground'>2</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FullDonutChart
          data={maintenanceData.chartData}
          width={195}
          height={195}
          innerRadius={50}
          outerRadius={80}
        />
      </div>

      <div className='border rounded-2xl h-[40vh] overflow-hidden flex flex-col'>
        <LoadUtilizationChart />
      </div>

      <div className='border rounded-2xl h-[40vh] overflow-hidden flex flex-col'>
        <ActiveIdleTimeChart />
      </div>

      <div className='col-span-2'>
        <CompactMap />
      </div>
    </div>
  )
}

export default KpiHeaderCards