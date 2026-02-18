"use client";

import { AlertCircle } from "lucide-react";

interface FaultCode {
  code: string;
  description: string;
  vehicle: string;
  date: string;
}

const faultCodes: FaultCode[] = [
  {
    code: "P0300",
    description: "Random/Multiple Cylinder Misfire",
    vehicle: "V-008",
    date: "2026-02-17",
  },
  {
    code: "P0171",
    description: "System Too Lean (Bank 1)",
    vehicle: "V-003",
    date: "2026-02-16",
  },
  {
    code: "P0420",
    description: "Catalyst System Efficiency Below Threshold",
    vehicle: "V-005",
    date: "2026-02-14",
  },
];

export function ActiveFaultCodes() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground mb-6">Active Fault Codes</h2>
      <div className="space-y-4">
        {faultCodes.map((fault, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border-l-4 border-red-500 group hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-300 transform hover:-translate-x-1 cursor-pointer shadow-sm"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-red-500 font-bold text-base">{fault.code}</span>
              <div className="flex items-center gap-4 text-muted-foreground text-[10px] sm:text-xs">
                <span>{fault.vehicle}</span>
                <span>{fault.date}</span>
              </div>
            </div>
            <p className="text-foreground text-sm font-medium group-hover:text-red-500 transition-colors line-clamp-1">
              {fault.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
