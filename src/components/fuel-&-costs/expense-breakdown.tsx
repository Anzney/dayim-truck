"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Fuel", value: 42500, color: "var(--primary)" },
  { name: "Maintenance", value: 18200, color: "#fbbf24" },
  { name: "Insurance", value: 12800, color: "#10b981" },
  { name: "Tolls", value: 5600, color: "#a855f7" },
  { name: "Other", value: 3400, color: "#64748b" },
];

export function ExpenseBreakdown() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.01 }}
      className="bg-card/50 border border-border rounded-2xl p-6 backdrop-blur-xl h-full flex flex-col hover:border-primary/20 transition-all duration-500 group relative overflow-hidden"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Expense Breakdown</h3>

      <div className="flex-1 flex flex-col">
        <div className="h-[200px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-muted-foreground text-xs">Total</span>
            <span className="text-foreground font-bold text-lg">$82.5K</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between group/item cursor-pointer">
              <div className="flex items-center gap-3">
                <div
                  className="size-2 rounded-full ring-2 ring-offset-2 ring-offset-card transition-all"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 0 0 2px ${item.color.startsWith('var') ? 'var(--primary-foreground)' : item.color}20`
                  } as React.CSSProperties}
                />
                <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">${item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Background glow shadow */}
      <div className="absolute -bottom-10 -right-10 size-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
    </motion.div>
  );
}
