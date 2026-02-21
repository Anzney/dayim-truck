"use client"

import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

const data = [
  { subject: 'Speed', A: 120, fullMark: 150 },
  { subject: 'Braking', A: 98, fullMark: 150 },
  { subject: 'Cornering', A: 86, fullMark: 150 },
  { subject: 'Acceleration', A: 99, fullMark: 150 },
  { subject: 'Fatigue', A: 85, fullMark: 150 },
  { subject: 'Compliance', A: 65, fullMark: 150 },
]

const FleetBehavior = () => {
  return (
    <div className="rounded-2xl border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl p-6 h-[400px] w-full lg:w-[400px] shadow-xl">
      <h2 className="text-xl font-bold text-foreground mb-6">Fleet Driving Behavior</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#ffffff10" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
            <Radar
              name="Behavior"
              dataKey="A"
              stroke="#0ea5e9"
              fill="#0ea5e9"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default FleetBehavior
