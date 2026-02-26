"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "V-001", cost: 4200, revenue: 8500 },
  { name: "V-002", cost: 4800, revenue: 11500 },
  { name: "V-003", cost: 3500, revenue: 5200 },
  { name: "V-004", cost: 6500, revenue: 8800 },
  { name: "V-005", cost: 5800, revenue: 12500 },
  { name: "V-006", cost: 4200, revenue: 7200 },
];

export function CostVsRevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ scale: 1.005 }}
      className="bg-card/50 border border-border rounded-2xl p-6 backdrop-blur-xl h-full hover:border-primary/20 transition-all duration-500 group"
    >
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-lg font-semibold text-foreground">Cost vs Revenue per Vehicle</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground font-medium">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-red-500" />
            <span className="text-xs text-muted-foreground font-medium">Cost</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              dx={-10}
              domain={[0, 14000]}
              ticks={[0, 3500, 7000, 10500, 14000]}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                color: "var(--foreground)",
              }}
            />
            <Bar
              dataKey="revenue"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              barSize={20}
              className="hover:opacity-80 transition-opacity"
            />
            <Bar
              dataKey="cost"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              barSize={20}
              className="hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
