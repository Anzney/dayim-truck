"use client";

import { AlertCircle } from "lucide-react";

import { faultCodes } from "@/data/maintenance";

export function ActiveFaultCodes() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground mb-4">Active Fault Codes</h2>
      <div className="space-y-3">
        {faultCodes.map((fault, index) => (
          <div
            key={index}
            className="p-3 rounded-xl bg-secondary/50 border-l-4 border-destructive group hover:bg-secondary transition-all duration-300 transform hover:-translate-x-1 cursor-pointer shadow-sm"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-destructive font-bold text-base">{fault.code}</span>
              <div className="flex items-center gap-4 text-muted-foreground text-[10px] sm:text-xs">
                <span>{fault.vehicle}</span>
                <span>{fault.date}</span>
              </div>
            </div>
            <p className="text-foreground text-sm font-medium group-hover:text-destructive transition-colors line-clamp-1">
              {fault.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
