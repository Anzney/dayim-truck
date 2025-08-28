import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Sparkles, TrendingDown, TrendingUp, Lightbulb, Maximize2, CircleCheck, Truck, TriangleAlert } from 'lucide-react'
import DonutChart from "../donut-chart"
import FleetMaintenance from './fleet-maintenance'

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
    <div className='grid grid-cols-2 gap-4'>
      <div className='p-4 rounded-2xl border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-netural-800/40 dark:backdrop-blur-2xl'>
        <p className='font-semibold text-muted-foreground'>Total Fleets</p>
        <p className='text-4xl tabular-nums font-mono font-bold dark:text-[#e2e2e2] '>24</p>
        <p className="text-sm mt-6">
          Overall fleet strength across operations
        </p>
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

      <div className='p-4 rounded-2xl border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-netural-800/40 dark:backdrop-blur-2xl'>
        <p className='font-semibold text-muted-foreground'>Vehicle Off Road</p>
        <div className='flex justify-between items-start'>
          <p className='text-4xl space-y-1.5 tabular-nums font-mono font-bold dark:text-[#e2e2e2] '>4</p>
          <div className='py-0.5 px-1 border flex gap-1 items-center rounded'>
            <TrendingUp className='size-4'/>
            <p className='text-xs '>10%</p>
          </div>
        </div>
        <p className="text-sm   mt-6 tracking-tight">
          Avg. downtime this month is 10% higher. 
        </p>
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
        </HoverCard> */}
      </div>

      <div className='p-4 rounded-2xl flex flex-col justify-between border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-netural-800/40 dark:backdrop-blur-2xl'>
        <div className=''>
          <p className='font-semibold text-muted-foreground'>Rental Consumption</p>
          <div className='flex justify-between items-start'>
            <p className='text-4xl space-y-1.5 tabular-nums font-mono tracking-tight font-bold dark:text-[#e2e2e2] '>4,000<span className='text-xl'>km</span></p>
            {/* <div className='py-0.5 px-1 border flex gap-1 items-center rounded'>
              <TrendingUp className='size-4'/>
              <p className='text-xs  '>20%</p>
            </div> */}
          </div>
        </div>
        
        <div className=''>
          <div className='flex items-center justify-center'>
            <DonutChart percentage={75} color={'#F59E0B'} width={160} height={90} thickness={20} labelText="used" />
          </div>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center mt-2 gap-2 cursor-pointer py-1 pl-1 pr-2 rounded-xl w-max bg-gradient-to-r from-amber-200 to-amber-300">
                <div className='bg-white rounded-full p-1'>
                  <Sparkles className='size-3 text-black' />
                </div>
                <p className='text-[10px] font-mono tracking-tight text-black'>AI Insights</p>
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
      </div>

      <div className='p-4 flex flex-col justify-between rounded-2xl border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-netural-800/40 dark:backdrop-blur-2xl'>
        <div>
          <p className='font-semibold text-muted-foreground'>Spoilage Risk</p>
          
          <div className='mt-2 p-2 rounded-lg flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div className='h-2 w-2 rounded-full bg-emerald-400'></div>
              <p className='font-mono text-xs'>Low Risk</p>
              <p className='font-mono text-xs font-bold ml-auto flex items-center gap-1 dark:text-[#e2e2e2]'>14</p>
            </div>

            <div className='flex items-center gap-2'>
              <div className='h-2 w-2 rounded-full bg-amber-400'></div>
              <p className='font-mono text-xs'>Med Risk</p>
              <p className='font-mono text-xs font-bold ml-auto flex items-center gap-1 dark:text-[#e2e2e2]'>4</p>
            </div>

            <div className='flex items-center gap-2'>
              <div className='h-2 w-2 rounded-full bg-red-400'></div>
              <p className='font-mono text-xs'>High Risk</p>
              <p className='font-mono text-xs font-bold ml-auto flex items-center gap-1 dark:text-[#e2e2e2]'>2</p>
            </div>
          </div>
        </div>

        <div>
          <div className='w-full flex items-center mt-4 gap-1'>
            <div className='h-8 w-[70%] bg-emerald-400 rounded-tl-sm rounded-bl-sm'></div>
            <div className='h-8 w-[20%] bg-amber-400'></div>
            <div className="h-8 w-[10%] bg-red-400 rounded-tr-sm rounded-br-sm"></div>
          </div>

          {/* <div className='flex items-center justify-center'>
            <DonutChart percentage={78} color={'#0b94f5'} width={160} height={90} thickness={20} />
          </div> */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center mt-3 gap-2 cursor-pointer py-1 pl-1 pr-2 rounded-xl w-max bg-gradient-to-r from-amber-200 to-amber-300">
                <div className='bg-white rounded-full p-1'>
                  <Sparkles className='size-3 text-black' />
                </div>
                <p className='text-[10px] font-mono tracking-tight text-black'>AI Insights</p>
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
                  <p className='text-sm  tracking-tight'>
                    AI predicts 85% of cargo trips this week will remain fully stable.
                  </p>
                  <p className='text-sm   tracking-tight mb-1'>
                    Truck T-102 shows 22% higher spoilage risk this trip.
                  </p>
                  <p className='text-sm   tracking-tight mb-1'>
                    Humidity spike detected in Truck T-56 cargo freshness may drop in 6 hrs.
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

   

        <div className='col-span-2'>
          <FleetMaintenance />
        </div>

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