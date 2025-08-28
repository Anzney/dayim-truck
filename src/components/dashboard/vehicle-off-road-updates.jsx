"use client"
import React from 'react'
import { AlertTriangle, Wrench, Car, Clock, Calendar, ChevronRight, Truck } from 'lucide-react'

// Sample data for vehicle off-road incidents
const offRoadIncidents = [
  {
    id: 1,
    vehicleId: "123-ABC",
    type: "Breakdown",
    status: "critical", // critical, progress, near-completion
    progress: "Clutch and brake pad replaced, waiting for ground clearance",
    lastUpdate: "25/08/2025",
    expectedResolution: "30/08/2025",
    progressPercentage: 75,
    tag: "Breakdown"
  },

  {
    id: 2,
    vehicleId: "890-PQR",
    type: "Scheduled",
    status: "near-completion",
    progress: "Cooling system check completed, final road test ongoing",
    lastUpdate: "26/08/2025",
    expectedResolution: "28/08/2025",
    progressPercentage: 90,
    tag: "Maintenance"
  },

  {
    id: 3,
    vehicleId: "567-XYZ",
    type: "Accident",
    status: "progress",
    progress: "Police report submitted, insurance claim under process",
    lastUpdate: "17/08/2025",
    expectedResolution: "Pending confirmation",
    progressPercentage: 40,
    tag: "Accident"
  },

  {
    id: 4,
    vehicleId: "456-DEF",
    type: "Breakdown",
    status: "critical",
    progress: "Engine diagnostic complete, awaiting replacement parts",
    lastUpdate: "24/08/2025",
    expectedResolution: "02/09/2025",
    progressPercentage: 30,
    tag: "Breakdown"
  },
]

const getStatusIcon = (status) => {
  switch (status) {
    case 'critical':
      return <AlertTriangle className="size-4 text-red-500" />
    case 'progress':
      return <Clock className="size-4 text-yellow-500" />
    case 'near-completion':
      return <Truck className="size-4 text-green-500" />
    default:
      return <Wrench className="size-4 text-gray-500" />
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'critical':
      return 'border-l-red-500 bg-red-50/50 dark:bg-red-900/20'
    case 'progress':
      return 'border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/20'
    case 'near-completion':
      return 'border-l-green-500 bg-green-50/50 dark:bg-green-900/20'
    default:
      return 'border-l-gray-500 bg-gray-50/50 dark:bg-gray-900/20'
  }
}

const getTagColor = (tag) => {
  switch (tag) {
    case 'Breakdown':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    case 'Accident':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
    case 'Maintenance':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  }
}

const VehicleOffRoadUpdates = () => {
  return (
    <div className='border rounded-2xl p-3 min-h-[52vh] xl:h-[52vh] flex flex-col dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl'>
      {/* Header */}
      <div className='flex items-center justify-between pb-3 mb-3 border-b flex-shrink-0'>
        <div>
          <h2 className='font-bold text-lg tracking-tight flex items-center gap-2'>
            <Truck className="size-5 text-blue-600" />
            Vehicle Off-Road Updates
          </h2>
          <p className='text-xs text-muted-foreground mt-1'>Live incidents & progress tracking</p>
        </div>
      </div>

      {/* Content - Scrollable List */}
      <div className='flex flex-col gap-3 overflow-y-auto flex-1 min-h-0'>
        {offRoadIncidents.map((incident) => (
          <div 
            key={incident.id}
            className={`border-l-4 rounded-lg rounded-l-none p-3 transition-all duration-200 hover:shadow-sm cursor-pointer ${getStatusColor(incident.status)}`}
          >
            {/* Main Content Row */}
            <div className='flex items-start justify-between gap-3'>
              <div className='flex items-start gap-3 flex-1'>
                
                {/* Vehicle Info & Progress */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-1'>
                    <span className='font-semibold text-sm'>{incident.vehicleId}</span>
                    <span className='text-muted-foreground text-xs'>|</span>
                    <span className='text-sm font-medium'>{incident.type}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(incident.tag)}`}>
                      {incident.tag}
                    </span>
                  </div>
                  
                  <p className='text-sm text-[#444] dark:text-[#e0e0e0] mb-2 tracking-tight'>
                    {incident.progress}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className='mb-2'>
                    <div className='flex justify-between text-xs text-muted-foreground mb-1'>
                      <span>Progress</span>
                      <span>{incident.progressPercentage}%</span>
                    </div>
                    <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5'>
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          incident.status === 'critical' ? 'bg-red-500' :
                          incident.status === 'progress' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${incident.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Date Info */}
                  <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='size-3' />
                      <span>Updated: {incident.lastUpdate}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Clock className='size-3' />
                      <span>ETA: {incident.expectedResolution}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status Icon */}
                <div className='mt-0.5'>
                  {getStatusIcon(incident.status)}
                </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer - Static */}
      <div className='mt-4 pt-3 border-t text-center flex-shrink-0'>
        <p className='text-xs text-muted-foreground'>
          Showing {offRoadIncidents.length} active incidents
        </p>
      </div>
    </div>
  )
}

export default VehicleOffRoadUpdates
