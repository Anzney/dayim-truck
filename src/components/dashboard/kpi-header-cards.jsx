import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Sparkles, TrendingDown, TrendingUp, Lightbulb, Maximize2, CircleCheck, Truck, TriangleAlert, Thermometer, Gauge, Handshake, CircleCheckBig, History } from 'lucide-react'
import DonutChart from "../donut-chart"
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
    { name: 'Good Condition', value: 14, color: '#10B981' },
    { name: 'Medium Risk', value: 4, color: '#F59E0B' },
    { name: 'High Risk', value: 2, color: '#EF4444' },
  ]
}


const alertCards = [
  {
    id: 1,
    title: "Truck #12 showing abnormal temperature rise — cargo spoilage risk."
  },
  {
    id: 2,
    title: "Predictive model flags Truck #7 for engine failure within 5 days."
  },
  {
    id: 3,
    title: "Unusual fuel drop detected in Truck #19 — investigate possible leakage."
  },
  {
    id: 4,
    title: "Brake wear alert: Truck #5 requires maintenance in next 200 km."
  }
]

const KpiHeaderCards = () => {
  return (
    <div className='grid grid-cols-2 flex-1 gap-4 max-h-[calc(100svh-100px)] overflow-y-scroll'>
      {/* KPI Card 1 */}
      <div className='rounded-2xl border backdrop-blur-3xl dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-netural-800/40 dark:backdrop-blur-2xl flex-shrink-0'>
        <div className='p-4'>
          <div className='flex  items-center justify-between'>
            <div className='flex gap-4 items-center'>
              <div className='border rounded-lg p-3 bg-gray-100 dark:bg-neutral-900'>
                <Truck className='size-4 text-muted-foreground'/>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Total Fleets</p>
                <p className='tabular-nums text-lg font-bold dark:text-[#e2e2e2]'>24</p>
              </div>
            </div>
            <Button className="p-3" variant="outline">See All</Button>
          </div>

          {/* <div className='mt-4 flex items-center gap-2'>
            <Badge variant="success">
              +5%
            </Badge>
            <p className='text-sm'>since last week</p>
          </div> */}
          <div className='w-full flex items-center mt-4 gap-1'>
            <div className='h-3 w-[70%] bg-[#10B981] rounded-sm  flex items-center justify-center text-white font-bold text-shadow'>
              
            </div>
            <div className='h-3 w-[15%] bg-amber-400 rounded-sm flex items-center justify-center text-white font-bold text-shadow'>
              
            </div>
            <div className="h-3 w-[10%] bg-red-400 rounded-sm flex items-center justify-center text-white font-bold text-shadow">
              
            </div>
          </div>
        </div>
        <div className='p-3 border-t flex items-center justify-center'>
          <div className='rounded-lg flex flex-wrap gap-4'>
                <div className='flex items-center gap-1'>
                  <div className='h-2 w-2 rounded-full bg-[#10B981]'></div>
                  <p className='  text-xs tracking-tight'>In use</p>
                  <p className='  text-xs font-bold ml-auto flex items-center gap-1 dark:text-[#e2e2e2]'>18</p>
                </div>

                <div className='flex items-center gap-1'>
                  <div className='h-2 w-2 rounded-full bg-amber-400'></div>
                  <p className='  text-xs tracking-tight'>Upcoming Service</p>
                  <p className='  text-xs font-bold ml-auto flex items-center gap-1 dark:text-[#e2e2e2]'>2</p>
                </div>

                <div className='flex items-center gap-1'>
                  <div className='h-2 w-2 rounded-full bg-red-400'></div>
                  <p className='  text-xs tracking-tight'>Vehicle Off Road</p>
                  <p className='  text-xs font-bold ml-auto flex items-center gap-1 dark:text-[#e2e2e2]'>4</p>
                </div>
              </div>
        </div>
        {/* <p className="text-sm mt-6 2xl:text-2xl">
          Overall fleet strength across operations
        </p> */}
        {/* <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center mt-3 gap-2 cursor-pointer py-1 pl-1 pr-2 rounded-xl w-max bg-gradient-to-r from-amber-200 to-amber-300">
              <div className='bg-white rounded-full p-1'>
                <Sparkles className='size-3' />
              </div>
              <p className='text-[10px]   tracking-tight'>AI Insights</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between gap-4">
              <div className="space-y-1">
                <div className='flex items-center gap-2'>
                  <Sparkles className='size-5'/>
                  <h4 className='  font-bold text-sm'>
                    DayimGPT Insights
                  </h4>
                </div>
                <p className='text-sm   tracking-tight'>
                  3 trucks predicted for maintenance in 2 weeks.
                </p>
                <p className='text-sm   tracking-tight'>
                  79% active, 21% idle fleet today.
                </p>
                <p className='text-sm   tracking-tight'>
                  Expected demand in the next 30 days indicates a requirement of 22 active trucks.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard> */}
      </div>
      {/* KPI Card 3 */}
      <div className='p-4 rounded-2xl flex flex-col row-span-2  justify-between border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-netural-800/40 dark:backdrop-blur-2xl'>
        <div className=''>
          <div className='flex items-center justify-between border-b'>
            <div className='flex items-center gap-4 mb-4'>
              <div className='border rounded-lg p-3 bg-gray-100 dark:bg-neutral-900'>
                <Gauge className='size-5 text-muted-foreground '/>
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
                    <Sparkles className='size-5'/>
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
            {/* <p className='text-4xl space-y-1.5 tabular-nums   tracking-tight font-bold dark:text-[#e2e2e2] '>4K</p> */}
            {/* <div className='py-0.5 px-1 border flex gap-1 items-center rounded'>
              <TrendingUp className='size-4'/>
              <p className='text-xs  '>20%</p>
            </div> */}

            
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

          {/* Compact inline legend */}
            {/* <div className="flex items-center justify-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-amber-500"></div>
                <span className="text-gray-600">Near Limit (≥80%)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-red-500"></div>
                <span className="text-gray-600">{`Breached (>100%)`}</span>
              </div>
            </div> */}

          {/* <div className='flex px-4 justify-between'>
            <div className='flex flex-col items-center justify-center p-5 pb-0'>
              <div className='p-2 rounded-full bg-blue-100'>
                <Handshake className='text-blue-600 '/>
              </div>
              <p className='text-sm mt-4'>Contracted (KM)</p>
              <p className='text-lg font-semibold'>5000</p>
            </div>
            <div className='flex flex-col items-center justify-center p-5 pb-0'>
              <div className='p-2 rounded-full bg-green-100'>
                <CircleCheckBig className='text-green-600 '/>
              </div>
              <p className='text-sm mt-4'>Exceeded Vehicles</p>
              <p className='text-lg font-semibold'>2</p>
            </div>
            <div className='flex flex-col items-center justify-center p-5 pb-0'>
              <div className='p-2 rounded-full bg-gray-100'>
                <History className='text-gray-600 '/>
              </div>
              <p className='text-sm mt-4'>About to Exceed</p>
              <p className='text-lg font-semibold'>4</p>
            </div>
          </div> */}
        </div>
        
        <div className=''>
          
          {/* <div className='w-full flex items-center mt-4 gap-1'>
            <div className='h-8 w-[75%] bg-amber-400 rounded-tl-sm rounded-bl-sm flex items-center justify-center'>
              <p className="text-white text-center text-sm font-bold text-shadow-md">75% used</p>
            </div>
            <div className="h-8 w-[25%] bg-gray-200 rounded-tr-sm rounded-br-sm"></div>
          </div> */}
          
        </div>
      </div>
      {/* KPI Card 4 */}
      <div className='p-4 flex items-start justify-between rounded-2xl border backdrop-blur-3xl dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-netural-800/40 dark:backdrop-blur-2xl flex-shrink-0'>
        <div className=''>
          <div className='flex  items-center justify-between mb-4'>
            <div className='flex gap-4 items-center'>
              <div className='border rounded-lg p-3 bg-gray-100 dark:bg-neutral-900'>
                <Thermometer className='size-4 text-muted-foreground'/>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Cargo Temperature</p>
              </div>
            </div>
            {/* <Button className="p-3" variant="outline">See All</Button> */}
          </div>
            <div className='flex items-center justify-between mt-4 pr-6'>
            <div className='flex items-center gap-4 justify-between'>
              <div className='rounded-lg flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <div className='h-2 w-2 rounded-full bg-[#10B981]'></div>
                  <p className='  text-xs tracking-tight'>Good Condition</p>
                  <p className='  text-xs font-bold ml-4 flex items-center gap-1 dark:text-[#e2e2e2]'>14</p>
                </div>

                <div className='flex items-center gap-2'>
                  <div className='h-2 w-2 rounded-full bg-amber-400'></div>
                  <p className='  text-xs tracking-tight'>Medium Spoilage Risk</p>
                  <p className='  text-xs font-bold ml-auto flex items-center gap-1 dark:text-[#e2e2e2]'>4</p>
                </div>

                <div className='flex items-center gap-2'>
                  <div className='h-2 w-2 rounded-full bg-red-400'></div>
                  <p className='  text-xs tracking-tight'>High Spoilage Risk</p>
                  <p className='  text-xs font-bold ml-auto flex items-center gap-1 dark:text-[#e2e2e2]'>2</p>
                </div>
              </div>
            </div>
            
            {/* <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
              <p className='text-xs font-semibold text-muted-foreground'>Total Fleet</p>
              <p className='text-lg font-bold  '>{maintenanceData.totalFleet}</p>
            </div> */}
          
          </div>
        </div> 

        <FullDonutChart 
          data={maintenanceData.chartData}
          width={195}
          height={195}
          innerRadius={50}
          outerRadius={80}
        />
        
        
        {/* <p className="text-sm mt-6 2xl:text-2xl">
          Overall fleet strength across operations
        </p> */}
        {/* <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center mt-3 gap-2 cursor-pointer py-1 pl-1 pr-2 rounded-xl w-max bg-gradient-to-r from-amber-200 to-amber-300">
              <div className='bg-white rounded-full p-1'>
                <Sparkles className='size-3' />
              </div>
              <p className='text-[10px]   tracking-tight'>AI Insights</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between gap-4">
              <div className="space-y-1">
                <div className='flex items-center gap-2'>
                  <Sparkles className='size-5'/>
                  <h4 className='  font-bold text-sm'>
                    DayimGPT Insights
                  </h4>
                </div>
                <p className='text-sm   tracking-tight'>
                  3 trucks predicted for maintenance in 2 weeks.
                </p>
                <p className='text-sm   tracking-tight'>
                  79% active, 21% idle fleet today.
                </p>
                <p className='text-sm   tracking-tight'>
                  Expected demand in the next 30 days indicates a requirement of 22 active trucks.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard> */}
      </div>

      {/* KPI Card 2 */}
      {/* <div className='p-3 rounded-2xl border  dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-netural-800/40 dark:backdrop-blur-2xl'>
        <p className='font-semibold text-muted-foreground 2xl:text-3xl'>Vehicle Off Road</p>
        <div className='flex justify-between items-start'>
          <p className='text-4xl space-y-1.5 tabular-nums   font-bold dark:text-[#e2e2e2] 2xl:text-6xl'>4</p>
          <div className='py-0.5 px-1 border flex gap-1 items-center rounded'>
            <TrendingUp className='size-4'/>
            <p className='text-xs 2xl:text-xl'>10%</p>
          </div>
        </div>
        <p className="text-sm 2xl:text-2xl mt-6 tracking-tight">
          Avg. downtime this month is 10% higher. 
        </p>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center mt-3 gap-2 cursor-pointer py-1 pl-1 pr-2 rounded-xl w-max bg-gradient-to-r from-amber-200 to-amber-300">
              <div className='bg-white rounded-full p-1'>
                <Sparkles className='size-3' />
              </div>
              <p className='text-[10px]   tracking-tight'>AI Insights</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between gap-4">
              <div className="space-y-1">
                <div className='flex items-center gap-2 mb-2'>
                  <Sparkles className='size-5'/>
                  <h4 className='  font-bold text-sm'>
                    DayimGPT Insights
                  </h4>
                </div>
                <p className='text-sm   tracking-tight inline-block mb-1'>
                  AI suggests predictive maintenance can cut downtime by 18% <TrendingDown className='inline size-4'/>
                </p>
                <p className='text-sm   tracking-tight mb-1'>
                  Up to 2 more vehicles may go off-road this month if patterns continue.
                </p>
                <p className='text-sm   tracking-tight'>
                  Prolonged downtime adds ~6% more CO₂ due to inefficient replacements.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div> */}
      

      <div className='border rounded-2xl h-[40vh] overflow-hidden flex flex-col'>
        <LoadUtilizationChart />
      </div>

      <div className='border rounded-2xl h-[40vh] overflow-hidden flex flex-col'>
        <ActiveIdleTimeChart />
      </div>
      

   
      <div className='col-span-2'>
        <CompactMap />
      </div>

      {/* <div className='col-span-2 row-span-2'>
        <FleetMaintenance />
      </div> */}
      {/* <div className='col-span-2 row-span-2'>
        <VehicleOffRoadUpdates />
      </div> */}

      {/* <div className='p-4 rounded-2xl border bg-gradient-to-br from-transparent from-55% to-90% to-orange-100'>
        <p className='font-semibold   text-muted-foreground'>Driver Behaviour Idx</p>
        <p className='text-4xl space-y-1.5 tabular-nums font-bold'>82<span className='text-lg'>/100</span></p>
        <p className="text-sm   mt-6 tracking-tight">
          AI score of driver discipline and safety.
        </p>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center mt-3 gap-2 cursor-pointer py-1 pl-1 pr-2 rounded-xl w-max bg-gradient-to-r from-amber-200 to-amber-300">
              <div className='bg-white rounded-full p-1'>
                <Sparkles className='size-3' />
              </div>
              <p className='text-[10px]   tracking-tight'>AI Insights</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between gap-4">
              <div className="space-y-1">
                <div className='flex items-center gap-2 mb-2'>
                  <Sparkles className='size-5'/>
                  <h4 className='  font-bold text-sm'>
                    DayimGPT Insights
                  </h4>
                </div>
                <p className='text-sm   tracking-tight mb-1'>
                  2 drivers show frequent harsh braking — potential safety risk.
                </p>
                <p className='text-sm   tracking-tight mb-1'>
                  AI predicts 12% fuel savings if speeding is reduced across fleet.
                </p>
                <p className='text-sm   tracking-tight'>
                  Driver score trend indicates 3 trucks may face higher maintenance this month due to aggressive driving.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div> */}
    </div>
  )
}

export default KpiHeaderCards