import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Sparkles, Wrench, Clock, AlertTriangle, CheckCircle, Calendar, TrendingUp, Truck, Bot } from 'lucide-react'
import FullDonutChart from '../ui/full-donut-chart'

const maintenanceData = {
  totalFleet: 24,
  operational: 16,
  inMaintenance: 2,
  upcomingService: 4,
  returningSoon: 2,
  chartData: [
    { name: 'Operational', value: 16, color: '#10B981' },
    { name: 'In Maintenance', value: 2, color: '#F59E0B' },
    { name: 'Upcoming Service', value: 4, color: '#EF4444' },
    { name: 'Returning Soon', value: 2, color: '#3B82F6' }
  ]
}

const upcomingMaintenance = [
  {
    id: 1,
    truckId: 'T-102',
    serviceType: 'Engine Oil Change',
    dueDate: '2 days',
    priority: 'Medium',
    estimatedCost: '$450'
  },
  {
    id: 2,
    truckId: 'T-087',
    serviceType: 'Brake System Check',
    dueDate: '5 days',
    priority: 'High',
    estimatedCost: '$1,200'
  },
  {
    id: 3,
    truckId: 'T-156',
    serviceType: 'Tire Replacement',
    dueDate: '8 days',
    priority: 'Low',
    estimatedCost: '$800'
  },
  {
    id: 4,
    truckId: 'T-203',
    serviceType: 'Transmission Service',
    dueDate: '12 days',
    priority: 'Medium',
    estimatedCost: '$2,100'
  }
]

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
  const operationalPercentage = Math.round((maintenanceData.operational / maintenanceData.totalFleet) * 100)

  return (
    <div className='border rounded-2xl p-3 h-[62vh] overflow-y-scroll dark:bg-gradient-to-br dark:from-neutral-700/30 dark:from-70% dark:to-blue-900/40 dark:backdrop-blur-2xl'>
      <div className='flex items-center justify-between pb-2 mb-3'>
        <h2 className='font-bold text-lg tracking-tight flex items-center gap-2 w-full'>
          <Wrench className='size-5 text-blue-600' />
          Fleet Maintenance
        </h2>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex shrink-0 items-center gap-2 cursor-pointer p-1 rounded-xl w-max bg-gradient-to-r from-blue-200 to-blue-300">
              <div className='bg-white rounded-full p-1'>
                <Sparkles className='size-3 text-black' />
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between gap-6">
              <div className="space-y-1">
                <div className='flex items-center gap-2 mb-2'>
                  <Sparkles className='size-5'/>
                  <h4 className='font-bold text-sm'>
                    DayimGPT Maintenance Insights
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
          {/* <div className='bg-white rounded-lg p-3 border shadow-sm'>
            <div className='flex items-center justify-between mb-2'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='size-4 text-green-500' />
                <p className='text-sm font-semibold'>Fleet Health</p>
              </div>
              <p className='text-2xl font-bold text-green-600'>{operationalPercentage}%</p>
            </div>
            <p className='text-xs text-muted-foreground'>
              {maintenanceData.operational} of {maintenanceData.totalFleet} trucks operational
            </p>
          </div> */}
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
                  <p className='text-sm  font-bold dark:text-[#e2e2e2]'>{item.value} trucks</p>
                </div>
              </div>
            ))}
          </div>
          {/* <div className='border p-2 border-blue-400 rounded-lg bg-gradient-to-b from-blue-50 to-blue-100 text-blue-600'>
            <p className='flex items-center gap-2 text-sm'><Bot className='size-4'/> AI Insight</p>
            <p className='text-sm tracking-tight'>In next 48 hrs 1 vehicle is ready to be use</p>
          </div> */}
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
