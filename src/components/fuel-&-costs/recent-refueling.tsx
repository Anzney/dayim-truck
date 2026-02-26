"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

const refuelingData = [
  { id: "V-002", station: "BP Highway 5", date: "2026-02-14", amount: "95 gal", price: 285 },
  { id: "V-004", station: "Exxon NJ-95", date: "2026-02-13", amount: "110 gal", price: 330 },
  { id: "V-006", station: "Chevron I-75", date: "2026-02-12", amount: "88 gal", price: 264 },
  { id: "V-007", station: "Pilot Columbus", date: "2026-02-11", amount: "135 gal", price: 405 },
  { id: "V-001", station: "Shell Route 66", date: "2026-02-10", amount: "92 gal", price: 276 },
  { id: "V-005", station: "Texaco Express", date: "2026-02-09", amount: "105 gal", price: 315 },
];

export function RecentRefueling() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ scale: 1.01 }}
      className="bg-card/50 border border-border rounded-2xl p-6 backdrop-blur-xl h-full flex flex-col hover:border-primary/20 transition-all duration-500 overflow-hidden group"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Refueling</h3>
        <button className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">View All</button>
      </div>

      <ScrollArea className="flex-1 pr-4 -mr-4">
        <div className="space-y-3">
          {refuelingData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-4 rounded-xl bg-muted/40 border border-border hover:bg-muted/60 hover:border-primary/30 transition-all cursor-pointer group/item"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">
                    {item.id} — <span className="font-normal text-muted-foreground">{item.station}</span>
                  </h4>
                  <p className="text-xs text-muted-foreground/70 font-medium tracking-tight">
                    {item.date} <span className="mx-1">•</span> {item.amount}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-foreground">${item.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}
