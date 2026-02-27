"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

import { recentRefuelingData as refuelingData } from "@/data/fuel-costs";

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
                  <span className="text-sm font-bold text-foreground">SAR {item.price}</span>
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
