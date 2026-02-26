"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Fuel, MapPin, Gauge, User } from "lucide-react";

const fleetData = [
  { id: "V-001", vehicle: "Freightliner Cascadia", plate: "TX-4521", status: "Active", driver: "John Miller", mileage: "142,500 mi", fuel: 78, fuelColor: "text-emerald-500", barColor: "bg-emerald-500" },
  { id: "V-002", vehicle: "Peterbilt 579", plate: "CA-8834", status: "In Trip", driver: "Sarah Chen", mileage: "98,200 mi", fuel: 45, fuelColor: "text-amber-500", barColor: "bg-amber-500" },
  { id: "V-003", vehicle: "Kenworth T680", plate: "FL-2219", status: "Maintenance", driver: "—", mileage: "210,300 mi", fuel: 92, fuelColor: "text-emerald-500", barColor: "bg-emerald-500" },
  { id: "V-004", vehicle: "Volvo VNL 860", plate: "NY-6677", status: "Active", driver: "Mike Johnson", mileage: "55,800 mi", fuel: 61, fuelColor: "text-emerald-500", barColor: "bg-emerald-500" },
  { id: "V-005", vehicle: "Mack Anthem", plate: "IL-3301", status: "Inactive", driver: "—", mileage: "178,900 mi", fuel: 100, fuelColor: "text-emerald-500", barColor: "bg-emerald-500" },
  { id: "V-006", vehicle: "International LT", plate: "GA-9945", status: "In Trip", driver: "Lisa Park", mileage: "67,400 mi", fuel: 33, fuelColor: "text-amber-500", barColor: "bg-amber-500" },
  { id: "V-007", vehicle: "Western Star 5700", plate: "OH-1128", status: "Active", driver: "David Brown", mileage: "123,700 mi", fuel: 88, fuelColor: "text-emerald-500", barColor: "bg-emerald-500" },
  { id: "V-008", vehicle: "Freightliner M2", plate: "PA-5563", status: "Warning", driver: "Tom Wilson", mileage: "195,400 mi", fuel: 12, fuelColor: "text-red-500", barColor: "bg-red-500" },
];

const FleetCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {fleetData.map((item) => (
        <div
          key={item.id}
          className="group bg-card/30 rounded-2xl p-5 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer backdrop-blur-sm relative overflow-hidden"
        >
          {/* Status Badge in Corner */}
          <div className="absolute top-0 right-0 p-3">
            <div className={cn(
              "size-2 rounded-full",
              item.status === "Active" && "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
              item.status === "In Trip" && "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]",
              item.status === "Maintenance" && "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]",
              item.status === "Inactive" && "bg-slate-400",
              item.status === "Warning" && "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
            )} />
          </div>

          <div className="flex flex-col h-full">
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1 block">ID: {item.id}</span>
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{item.vehicle}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="size-3" /> {item.plate}
              </p>
            </div>

            <div className="space-y-4 flex-grow">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="size-4" />
                  <span>Driver</span>
                </div>
                <span className="font-medium">{item.driver}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Gauge className="size-4" />
                  <span>Mileage</span>
                </div>
                <span className="font-medium">{item.mileage}</span>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Fuel className="size-4" />
                    <span>Fuel Level</span>
                  </div>
                  <span className={cn("font-bold text-xs", item.fuelColor)}>{item.fuel}%</span>
                </div>
                <div className="w-full h-1.5 bg-background/50 rounded-full overflow-hidden border border-border/20">
                  <div
                    className={cn("h-full transition-all duration-1000", item.barColor)}
                    style={{ width: `${item.fuel}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <button className="flex-1 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-xs font-bold py-2 rounded-lg transition-all border border-primary/20">
                View Details
              </button>
              <button className="flex-1 bg-card hover:bg-accent text-foreground text-xs font-bold py-2 rounded-lg transition-all border border-border/50">
                Assign
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FleetCards;
