"use client";

import { Badge } from "@/components/ui/badge";

import { scheduleData } from "@/data/maintenance";

const statusStyles = {
  Scheduled: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Overdue: "bg-destructive/10 text-destructive border-destructive/20",
  Completed: "bg-primary/10 text-primary border-primary/20",
};

export function MaintenanceSchedule() {
  return (
    <div className="rounded-2xl border dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl p-4 shadow-xl">
      <h2 className="text-lg font-bold text-foreground mb-4">Maintenance Schedule</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
              <th className="pb-4 font-semibold px-4 tracking-tighter">ID</th>
              <th className="pb-4 font-semibold px-4">Vehicle</th>
              <th className="pb-4 font-semibold px-4">Service</th>
              <th className="pb-4 font-semibold px-4">Date</th>
              <th className="pb-4 font-semibold px-4">Cost</th>
              <th className="pb-4 font-semibold px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {scheduleData.map((item) => (
              <tr
                key={item.id}
                className="group relative hover:bg-muted/50 transition-all duration-300 cursor-pointer overflow-hidden border-l-2 border-transparent hover:border-primary/50"
              >
                <td className="py-3 px-4 text-primary font-bold group-hover:translate-x-1 transition-transform duration-300">
                  <div className="flex flex-col">
                    <span>M-</span>
                    <span>{item.id.split('-')[1]}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-foreground font-medium group-hover:text-primary transition-colors">{item.vehicle}</td>
                <td className="py-3 px-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {item.service}
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-col group-hover:scale-105 transition-transform origin-left text-xs">
                    <span className="text-foreground font-bold">{item.date.split('-')[0]}</span>
                    <span className="text-muted-foreground">{item.date.split('-').slice(1).join('-')}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-foreground font-black group-hover:text-primary transition-colors">SAR {item.cost}</td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className={`${statusStyles[item.status]} font-bold px-3 py-1 rounded-full transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]`}>
                    {item.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
