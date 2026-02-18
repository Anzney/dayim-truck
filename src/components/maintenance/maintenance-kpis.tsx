"use client";

import { Calendar, AlertTriangle, CheckCircle, Wrench } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconColor: string;
  borderColor: string;
}

function KPICard({ title, value, icon: Icon, iconColor, borderColor }: KPICardProps) {
  return (
    <div className={`rounded-2xl border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl p-5 flex items-center justify-between group hover:scale-[1.02] transition-all duration-300 shadow-lg`}>
      <div className="space-y-1">
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold dark:text-[#e2e2e2] text-foreground">{value}</p>
      </div>
      <div className={`p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-border transition-colors duration-300 ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}

export function MaintenanceKPIs() {
  const kpis = [
    {
      title: "Scheduled Services",
      value: 3,
      icon: Calendar,
      iconColor: "text-blue-500",
      borderColor: "border-blue-500",
    },
    {
      title: "Overdue",
      value: 1,
      icon: AlertTriangle,
      iconColor: "text-red-500",
      borderColor: "border-red-500",
    },
    {
      title: "Completed (Month)",
      value: 2,
      icon: CheckCircle,
      iconColor: "text-green-500",
      borderColor: "border-green-500",
    },
    {
      title: "Active Fault Codes",
      value: 3,
      icon: Wrench,
      iconColor: "text-amber-500",
      borderColor: "border-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
}
