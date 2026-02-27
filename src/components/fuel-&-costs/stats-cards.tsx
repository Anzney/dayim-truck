"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { fuelStats as stats } from "@/data/fuel-costs";

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          whileHover={{
            scale: 1.02,
            translateY: -5,
            transition: { duration: 0.2 }
          }}
          className="group relative"
        >
          <Card className="bg-card/50 border-border backdrop-blur-xl overflow-hidden hover:border-primary/30 transition-colors duration-300">
            <CardContent className="p-6 min-h-[140px] flex flex-col justify-center">
              <div className="flex justify-between items-start w-full">
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2 text-foreground group-hover:text-primary transition-colors">
                    {stat.value}
                  </h3>
                  <div className="mt-2 min-h-[1.25rem]">
                    {stat.change ? (
                      <p className={`text-xs flex items-center gap-1 ${stat.isNegative ? "text-red-400" : "text-emerald-400"}`}>
                        {stat.isNegative ? "↓" : "↑"} {stat.change}
                      </p>
                    ) : (
                      <div className="h-[1.25rem]" /> // Spacer to maintain card height
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgIcon} ring-1 ring-border group-hover:ring-primary/50 transition-all duration-300 shrink-0 ml-2`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-opacity duration-500 rounded-2xl pointer-events-none" />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
