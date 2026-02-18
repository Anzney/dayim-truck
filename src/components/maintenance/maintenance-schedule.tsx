"use client";

import { Badge } from "@/components/ui/badge";

interface ScheduleItem {
  id: string;
  vehicle: string;
  service: string;
  date: string;
  cost: number;
  status: "Scheduled" | "Overdue" | "Completed";
}

const scheduleData: ScheduleItem[] = [
  { id: "M-001", vehicle: "V-003", service: "Oil Change", date: "2026-02-20", cost: 450, status: "Scheduled" },
  { id: "M-002", vehicle: "V-001", service: "Tire Rotation", date: "2026-02-25", cost: 200, status: "Scheduled" },
  { id: "M-003", vehicle: "V-005", service: "Brake Inspection", date: "2026-03-01", cost: 350, status: "Scheduled" },
  { id: "M-004", vehicle: "V-008", service: "Engine Diagnostic", date: "2026-02-18", cost: 600, status: "Overdue" },
  { id: "M-005", vehicle: "V-002", service: "Transmission Service", date: "2026-02-15", cost: 1200, status: "Completed" },
  { id: "M-006", vehicle: "V-007", service: "AC Repair", date: "2026-02-10", cost: 800, status: "Completed" },
];

const statusStyles = {
  Scheduled: "bg-[#faad14]/10 text-[#faad14] border-[#faad14]/20",
  Overdue: "bg-[#ff4d4f]/10 text-[#ff4d4f] border-[#ff4d4f]/20",
  Completed: "bg-[#52c41a]/10 text-[#52c41a] border-[#52c41a]/20",
};

export function MaintenanceSchedule() {
  return (
    <div className="bg-[#0b0e14] rounded-2xl p-6 shadow-xl border border-[#1e2235]/30">
      <h2 className="text-xl font-bold text-white mb-6">Maintenance Schedule</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#94a3b8] text-sm uppercase tracking-wider border-b border-[#1e2235]/50">
              <th className="pb-4 font-semibold px-4">ID</th>
              <th className="pb-4 font-semibold px-4">Vehicle</th>
              <th className="pb-4 font-semibold px-4">Service</th>
              <th className="pb-4 font-semibold px-4">Date</th>
              <th className="pb-4 font-semibold px-4">Cost</th>
              <th className="pb-4 font-semibold px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e2235]/30">
            {scheduleData.map((item) => (
              <tr
                key={item.id}
                className="group relative hover:bg-[#161b22] transition-all duration-300 cursor-pointer overflow-hidden border-l-2 border-transparent hover:border-[#00d1ff]/50"
              >
                <td className="py-4 px-4 text-[#00d1ff] font-bold group-hover:translate-x-1 transition-transform duration-300">
                  <div className="flex flex-col">
                    <span>M-</span>
                    <span>{item.id.split('-')[1]}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-white font-medium group-hover:text-[#00d1ff] transition-colors">{item.vehicle}</td>
                <td className="py-4 px-4 text-[#94a3b8] group-hover:text-white transition-colors duration-300">
                  {item.service}
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col group-hover:scale-105 transition-transform origin-left text-xs">
                    <span className="text-white font-bold">{item.date.split('-')[0]}</span>
                    <span className="text-[#94a3b8]">{item.date.split('-').slice(1).join('-')}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-white font-black group-hover:text-[#00d1ff] transition-colors">${item.cost}</td>
                <td className="py-4 px-4">
                  <Badge variant="outline" className={`${statusStyles[item.status]} font-bold px-3 py-1 rounded-full transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]`}>
                    {item.status}
                  </Badge>
                </td>
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d1ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
