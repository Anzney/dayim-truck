"use client"

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'John', hours: 1850 },
  { name: 'Sarah', hours: 1620 },
  { name: 'Mike', hours: 1340 },
  { name: 'Lisa', hours: 1710 },
  { name: 'David', hours: 2100 },
  { name: 'Tom', hours: 1180 },
]

const HoursTracking = () => {
  return (
    <div className="bg-card rounded-xl p-6 border mt-8">
      <h2 className="text-xl font-bold text-foreground mb-8">Hours Tracking</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              domain={[0, 2200]}
              ticks={[0, 550, 1100, 1650, 2200]}
            />
            <Tooltip
              cursor={{ fill: '#ffffff05' }}
              contentStyle={{ backgroundColor: '#1e1e1f', border: 'none', borderRadius: '8px', color: '#fff' }}
            />
            <Bar
              dataKey="hours"
              fill="#00D1FF"
              radius={[4, 4, 0, 0]}
              barSize={120}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default HoursTracking
