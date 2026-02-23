"use client";

import React from "react";
import { cn } from "@/lib/utils";

const fleetData = [
  { id: "V-001", vehicle: "Freightliner Cascadia", plate: "TX-4521", status: "Active", driver: "John Miller", mileage: "142,500 mi", fuel: 78, fuelColor: "bg-emerald-500" },
  { id: "V-002", vehicle: "Peterbilt 579", plate: "CA-8834", status: "In Trip", driver: "Sarah Chen", mileage: "98,200 mi", fuel: 45, fuelColor: "bg-amber-500" },
  { id: "V-003", vehicle: "Kenworth T680", plate: "FL-2219", status: "Maintenance", driver: "—", mileage: "210,300 mi", fuel: 92, fuelColor: "bg-emerald-500" },
  { id: "V-004", vehicle: "Volvo VNL 860", plate: "NY-6677", status: "Active", driver: "Mike Johnson", mileage: "55,800 mi", fuel: 61, fuelColor: "bg-emerald-500" },
  { id: "V-005", vehicle: "Mack Anthem", plate: "IL-3301", status: "Inactive", driver: "—", mileage: "178,900 mi", fuel: 100, fuelColor: "bg-emerald-500" },
  { id: "V-006", vehicle: "International LT", plate: "GA-9945", status: "In Trip", driver: "Lisa Park", mileage: "67,400 mi", fuel: 33, fuelColor: "bg-amber-500" },
  { id: "V-007", vehicle: "Western Star 5700", plate: "OH-1128", status: "Active", driver: "David Brown", mileage: "123,700 mi", fuel: 88, fuelColor: "bg-emerald-500" },
  { id: "V-008", vehicle: "Freightliner M2", plate: "PA-5563", status: "Warning", driver: "Tom Wilson", mileage: "195,400 mi", fuel: 12, fuelColor: "bg-red-500" },
];

const FleetTable = () => {
  return (
    <div className="bg-card/30 rounded-2xl overflow-hidden border border-border/50 shadow-xl backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border/50 text-muted-foreground text-sm uppercase tracking-wider">
            <th className="px-6 py-5 font-medium">ID</th>
            <th className="px-6 py-5 font-medium">Vehicle</th>
            <th className="px-6 py-5 font-medium">Plate</th>
            <th className="px-6 py-5 font-medium">Status</th>
            <th className="px-6 py-5 font-medium">Assigned Driver</th>
            <th className="px-6 py-5 font-medium">Mileage</th>
            <th className="px-6 py-5 font-medium">Fuel</th>
            <th className="px-6 py-5 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fleetData.map((item, index) => (
            <tr
              key={item.id}
              className={cn(
                "group hover:bg-white/5 transition-all duration-200 cursor-pointer",
                index !== fleetData.length - 1 && "border-b border-border/20"
              )}
            >
              <td className="px-6 py-4 font-mono text-primary font-medium">{item.id}</td>
              <td className="px-6 py-4 font-medium group-hover:translate-x-1 transition-transform">{item.vehicle}</td>
              <td className="px-6 py-4 text-muted-foreground">{item.plate}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "size-2 rounded-full",
                    item.status === "Active" && "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
                    item.status === "In Trip" && "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]",
                    item.status === "Maintenance" && "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]",
                    item.status === "Inactive" && "bg-slate-400",
                    item.status === "Warning" && "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                  )} />
                  <span className="text-sm">{item.status}</span>
                </div>
              </td>
              <td className="px-6 py-4">{item.driver}</td>
              <td className="px-6 py-4 text-muted-foreground">{item.mileage}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-1.5 bg-card rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-1000", item.fuelColor)}
                      style={{ width: `${item.fuel}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold w-8">{item.fuel}%</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-tighter">
                  <button className="text-primary hover:text-primary/80 transition-colors hover:underline">Details</button>
                  <button className="text-white/60 hover:text-white transition-colors hover:underline">Assign</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FleetTable;
