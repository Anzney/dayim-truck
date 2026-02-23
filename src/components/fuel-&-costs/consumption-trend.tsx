"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Aug", consumption: 12500, baseline: 4200 },
  { name: "Sep", consumption: 11500, baseline: 4500 },
  { name: "Oct", consumption: 13500, baseline: 4300 },
  { name: "Nov", consumption: 12800, baseline: 4100 },
  { name: "Dec", consumption: 11000, baseline: 3800 },
  { name: "Jan", consumption: 13000, baseline: 4400 },
];

export function ConsumptionTrend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.005 }}
      className="w-full h-full bg-card/50 border border-border rounded-2xl p-6 backdrop-blur-xl relative group hover:border-primary/20 transition-all duration-500"
    >
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-semibold text-foreground">Fuel Consumption Trend</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-muted-foreground font-medium">Consumption</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground font-medium">Average</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                color: "var(--foreground)",
              }}
              itemStyle={{ fontSize: "12px" }}
            />
            <Area
              type="monotone"
              dataKey="consumption"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorConsumption)"
              animationDuration={2000}
            />
            <Area
              type="monotone"
              dataKey="baseline"
              stroke="var(--primary)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorBaseline)"
              animationDuration={2500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </motion.div>
  );
}
