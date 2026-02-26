import React from 'react'
import { Users, Star, AlertTriangle, Clock, TrendingUp } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  trend?: string
  icon: React.ReactNode
  iconBg: string
}

const StatCard = ({ title, value, trend, icon }: { title: string, value: string | number, trend?: string, icon: React.ReactNode }) => (
  <div className="rounded-2xl border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl p-5 flex justify-between items-start transition-all cursor-pointer group hover:scale-[1.02]">
    <div className="space-y-1">
      <p className="text-muted-foreground text-sm font-medium">{title}</p>
      <h3 className="text-3xl font-bold dark:text-foreground tracking-tight">{value}</h3>
      {trend && (
        <div className="flex items-center text-primary text-xs font-semibold">
          <TrendingUp size={12} className="mr-1" />
          <span>{trend}</span>
        </div>
      )}
    </div>
    <div className="p-3 rounded-lg bg-gray-100 dark:bg-neutral-900 border text-muted-foreground group-hover:text-primary transition-colors">
      {icon}
    </div>
  </div>
)

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Drivers"
        value="6"
        icon={<Users size={20} />}
      />
      <StatCard
        title="Avg Safety Score"
        value="89"
        trend="3 pts"
        icon={<Star size={20} />}
      />
      <StatCard
        title="Total Violations"
        value="11"
        icon={<AlertTriangle size={20} />}
      />
      <StatCard
        title="Avg Hours/Driver"
        value="1633"
        icon={<Clock size={20} />}
      />
    </div>
  )
}

export default StatsCards
