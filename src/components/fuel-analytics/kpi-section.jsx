"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Fuel, Truck, Gauge, Zap } from 'lucide-react'

const KpiCard = ({ title, value, subtext, trend, icon: Icon, color, percentage, gaugeValue }) => {
  const colorMap = {
    blue: "border-blue-500/30 bg-blue-500/5 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
    red: "border-red-500/30 bg-red-500/5 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
    green: "border-emerald-500/30 bg-emerald-500/5 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
    yellow: "border-amber-500/30 bg-amber-500/5 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
    gold: "border-orange-400/30 bg-orange-400/5 text-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.1)]"
  }

  const iconColorMap = {
    blue: "bg-blue-500/20",
    red: "bg-red-500/20",
    green: "bg-emerald-500/20",
    yellow: "bg-amber-500/20",
    gold: "bg-orange-400/20"
  }

  return (
    <Card className={`relative overflow-hidden border transition-all duration-300 hover:scale-[1.02] ${colorMap[color] || colorMap.blue}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium opacity-80">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-foreground">{value}</h3>
          </div>
          <div className={`p-2 rounded-lg ${iconColorMap[color] || iconColorMap.blue}`}>
            <Icon className="size-5" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {trend && (
            <span className={`flex items-center text-xs font-bold ${trend.type === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
              {trend.type === 'up' ? <ArrowUpRight className="size-3 mr-0.5" /> : <ArrowDownRight className="size-3 mr-0.5" />}
              {trend.value}
            </span>
          )}
          <span className="text-xs opacity-60 text-foreground">{subtext}</span>
        </div>

        {gaugeValue !== undefined && (
          <div className="mt-6 relative h-24 flex items-end justify-center">
            <div className="w-full h-1 bg-black/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-current transition-all duration-1000"
                style={{ width: `${gaugeValue}%` }}
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <span className="text-2xl font-black text-foreground">{gaugeValue}%</span>
              <div className="w-24 h-12 border-t-4 border-l-4 border-r-4 border-current rounded-t-full opacity-20 absolute top-2 transform -rotate-0"></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const FuelKpiSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 px-6 py-4">
      <KpiCard
        title="Total Fuel Used"
        value="1,240 L"
        subtext="vs Last Month"
        trend={{ value: "10.3%", type: "down" }}
        icon={Fuel}
        color="blue"
        gaugeValue={65}
      />
      <KpiCard
        title="Total Fuel Cost"
        value="₹74,500"
        subtext="Budget vs Actual"
        trend={{ value: "6.4%", type: "up" }}
        icon={Truck}
        color="red"
      />
      <KpiCard
        title="Avg Mileage"
        value="17.4 km/l"
        subtext="vs Industry Avg: 15 km/l"
        icon={Gauge}
        color="green"
        gaugeValue={82}
      />
      <KpiCard
        title="Cost Per KM"
        value="₹4.62"
        subtext="Rate per KM"
        icon={Truck}
        color="yellow"
        gaugeValue={45}
      />
      <KpiCard
        title="Fuel Efficiency Score"
        value="73%"
        subtext="Health Status"
        icon={Zap}
        color="gold"
        gaugeValue={73}
      />
    </div>
  )
}

export default FuelKpiSection
