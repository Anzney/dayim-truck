"use client";

import React from "react";
import { Search, Download, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { StatsCards } from "./stats-cards";
import { ConsumptionTrend } from "./consumption-trend";
import { ExpenseBreakdown } from "./expense-breakdown";
import { CostVsRevenueChart } from "./cost-revenue-chart";
import { RecentRefueling } from "./recent-refueling";
import { AddFuelEntryModal } from "./add-fuel-entry-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function FuelAndCostsDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEntry = (entry: any) => {
    console.log("Adding new fuel entry:", entry);
    // In a real app, this would update central state or call an API
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 pt-2 pb-6 space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          Fuel & Cost Management
        </motion.h1>

        <div className="flex items-center gap-3">
          <div className="relative w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <Input
              placeholder="Search vehicles..."
              className="pl-10 bg-muted/50 border-border focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all rounded-xl hover:bg-muted h-9 shrink-0"
            />
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="bg-muted/50 border-border hover:bg-secondary text-muted-foreground gap-2 rounded-xl transition-all h-9">
              <Download className="size-4" />
              Export Report
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-bold rounded-xl shadow-lg shadow-primary/20 transition-all h-9 text-slate-900"
            >
              <Plus className="size-4" />
              Add Entry
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <StatsCards />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ConsumptionTrend />
        </div>
        <div className="lg:col-span-1">
          <ExpenseBreakdown />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CostVsRevenueChart />
        </div>
        <div className="lg:col-span-1">
          <RecentRefueling />
        </div>
      </div>

      <AddFuelEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddEntry}
      />
    </div>
  );
}
