import React from 'react'
import { Users, Star, AlertTriangle, Clock, TrendingUp } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  trend?: string
  icon: React.ReactNode
  iconBg: string
}

const StatCard = ({ title, value, trend, icon, iconBg }: StatCardProps) => (
  <div className="bg-card p-6 rounded-xl border flex justify-between items-start hover:scale-[1.02] transition-transform cursor-pointer">
    <div>
      <p className="text-muted-foreground text-sm font-medium mb-2">{title}</p>
      <div className="flex items-end gap-2">
        <h3 className="text-3xl font-bold text-foreground">{value}</h3>
        {trend && (
          <div className="flex items-center text-green-400 text-xs mb-1">
            <TrendingUp size={12} className="mr-1" />
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
    <div className={`p-3 rounded-xl ${iconBg} bg-opacity-10 text-xl`}>
      {icon}
    </div>
  </div>
)

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Total Drivers"
        value="6"
        icon={<Users className="text-[#00D1FF]" />}
        iconBg="bg-[#00D1FF]"
      />
      <StatCard
        title="Avg Safety Score"
        value="89"
        trend="3 pts"
        icon={<Star className="text-[#FBB63F]" />}
        iconBg="bg-[#FBB63F]"
      />
      <StatCard
        title="Total Violations"
        value="11"
        icon={<AlertTriangle className="text-[#FF4D4D]" />}
        iconBg="bg-[#FF4D4D]"
      />
      <StatCard
        title="Avg Hours/Driver"
        value="1633"
        icon={<Clock className="text-[#00D1FF]" />}
        iconBg="bg-[#00D1FF]"
      />
    </div>
  )
}

export default StatsCards
