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
    <div className={`bg-[#0b0e14] border-l-4 ${borderColor} p-5 rounded-xl flex items-center justify-between group hover:bg-[#161b22] transition-all duration-300 transform hover:-translate-y-1 shadow-lg`}>
      <div className="space-y-1">
        <p className="text-[#94a3b8] text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`p-3 rounded-xl bg-opacity-10 transition-colors duration-300 ${iconColor}`}>
        <Icon className="w-6 h-6" />
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
      iconColor: "text-[#00d1ff]",
      borderColor: "border-[#00d1ff]",
    },
    {
      title: "Overdue",
      value: 1,
      icon: AlertTriangle,
      iconColor: "text-[#ff4d4f]",
      borderColor: "border-[#ff4d4f]",
    },
    {
      title: "Completed (Month)",
      value: 2,
      icon: CheckCircle,
      iconColor: "text-[#52c41a]",
      borderColor: "border-[#52c41a]",
    },
    {
      title: "Active Fault Codes",
      value: 3,
      icon: Wrench,
      iconColor: "text-[#faad14]",
      borderColor: "border-[#faad14]",
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
