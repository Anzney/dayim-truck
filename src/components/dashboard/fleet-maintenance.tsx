import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Sparkles, Wrench } from 'lucide-react'
import FullDonutChart from '../ui/full-donut-chart'

const maintenanceData = {
  totalFleet: 24,
  operational: 16,
  inMaintenance: 2,
  upcomingService: 4,
  returningSoon: 2,
  chartData: [
    { name: 'Operational', value: 16, color: 'var(--primary)' },
    { name: 'In Maintenance', value: 2, color: 'var(--color-chart-4)' },
    { name: 'Upcoming Service', value: 4, color: 'hsl(var(--destructive))' },
    { name: 'Returning Soon', value: 2, color: 'var(--color-chart-2)' }
  ]
}

const aiMaintenanceInsights = [
  {
    id: 1,
    title: "AI predicts Truck T-087 brake pads will need replacement in 5 days based on usage patterns."
  },
  {
    id: 2,
    title: "Preventive maintenance scheduling can reduce downtime by 23% this quarter."
  },
  {
    id: 3,
    title: "Truck T-102 shows 15% higher fuel consumption - engine tune-up recommended."
  },
  {
    id: 4,
    title: "AI suggests batch maintenance for 3 trucks next week to optimize costs by $1,200."
  }
]

const FleetMaintenance = () => {
  return (
    <div className='border rounded-2xl p-3 h-[62vh] overflow-y-scroll dark:bg-gradient-to-br dark:from-neutral-700/30 dark:from-70% dark:to-primary/10 dark:backdrop-blur-2xl'>
      <div className='flex items-center justify-between pb-2 mb-3'>
        <h2 className='font-bold text-lg tracking-tight flex items-center gap-2 w-full'>
          <Wrench className='size-5 text-primary' />
          Fleet Maintenance
        </h2>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex shrink-0 items-center gap-2 cursor-pointer p-1 rounded-xl w-max bg-gradient-to-r from-primary/30 to-primary/50">
              <div className='bg-primary-foreground rounded-full p-1'>
                <Sparkles className='size-3 text-primary' />
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between gap-6">
              <div className="space-y-1">
                <div className='flex items-center gap-2 mb-2'>
                  <Sparkles className='size-5' />
                  <h4 className='font-bold text-sm'>
                    Fleet-Track GPT Maintenance Insights
                  </h4>
                </div>
                {aiMaintenanceInsights.map((insight) => (
                  <p key={insight.id} className='text-sm tracking-tight mb-1'>
                    {insight.title}
                  </p>
                ))}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className='flex h-[calc(100%-8rem)] flex-col gap-14 justify-between'>
        {/* Left Side - Details */}
        <div className='flex-1 space-y-3 flex flex-col justify-between'>
          <div className='space-y-2'>
            {maintenanceData.chartData.map((item, index) => (
              <div key={index} className=''>
                <div className='flex items-center justify-between gap-2'>
                  <div className='flex items-center gap-2'>
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <p className='text-sm '>{item.name}</p>
                  </div>
                  <p className='text-sm  font-bold dark:text-foreground'>{item.value} trucks</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Full Donut Chart */}
        <div className='flex-1 flex items-center justify-center'>
          <div className='relative'>
            <FullDonutChart
              data={maintenanceData.chartData}
              width={200}
              height={200}
              innerRadius={60}
              outerRadius={100}
            />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
              <p className='text-xs font-semibold text-muted-foreground'>Total Fleet</p>
              <p className='text-lg font-bold  '>{maintenanceData.totalFleet}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FleetMaintenance
