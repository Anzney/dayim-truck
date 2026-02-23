"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Fuel, Truck, Gauge, Zap, LucideIcon } from 'lucide-react'
import { fuelKpis } from '@/data/fuel-analytics'
import { KpiData } from '@/types/fuel-analytics'

interface KpiCardProps extends KpiData {
  icon: LucideIcon;
}

const KpiCard = ({ title, value, subtext, trend, icon: Icon, color, gaugeValue }: KpiCardProps) => {
  const colorMap: Record<string, string> = {
    blue: "border-primary/30 bg-primary/5 text-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]",
    red: "border-destructive/30 bg-destructive/5 text-destructive shadow-[0_0_15px_rgba(var(--destructive),0.1)]",
    green: "border-primary/30 bg-primary/5 text-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]",
    yellow: "border-amber-500/30 bg-amber-500/5 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
    gold: "border-orange-400/30 bg-orange-400/5 text-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.1)]"
  }

  const iconColorMap: Record<string, string> = {
    blue: "bg-primary/20",
    red: "bg-destructive/20",
    green: "bg-primary/20",
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
            <span className={`flex items-center text-xs font-bold ${trend.type === 'up' ? 'text-primary' : 'text-destructive'}`}>
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
  const icons: Record<number, LucideIcon> = {
    0: Fuel,
    1: Truck,
    2: Gauge,
    3: Truck,
    4: Zap
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 px-6 py-4">
      {fuelKpis.map((kpi, idx) => (
        <KpiCard
          key={idx}
          {...kpi}
          icon={icons[idx]}
        />
      ))}
    </div>
  )
}

export default FuelKpiSection
