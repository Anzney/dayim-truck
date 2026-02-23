"use client";

import { Calendar, Clock, CheckCircle, Wrench } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconColor: string;
  borderColor: string;
}

function KPICard({ title, value, icon: Icon, iconColor, borderColor }: KPICardProps) {
  return (
    <div className={`rounded-2xl border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl p-4 flex items-center justify-between group hover:scale-[1.02] transition-all duration-300 shadow-md`}>
      <div className="space-y-0.5">
        <p className="text-muted-foreground text-xs font-medium">{title}</p>
        <p className="text-2xl font-bold dark:text-foreground text-foreground">{value}</p>
      </div>
      <div className={`p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-border transition-colors duration-300 ${iconColor}`}>
        <Icon className="w-4 h-4" />
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
      iconColor: "text-primary",
      borderColor: "border-primary",
    },
    {
      title: "Overdue",
      value: 1,
      icon: Clock, // Replaced AlertTriangle with Clock
      iconColor: "text-destructive",
      borderColor: "border-destructive",
    },
    {
      title: "Completed (Month)",
      value: 2,
      icon: CheckCircle,
      iconColor: "text-primary",
      borderColor: "border-primary",
    },
    {
      title: "Active Fault Codes",
      value: 3,
      icon: Wrench,
      iconColor: "text-chart-4",
      borderColor: "border-chart-4",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
}
