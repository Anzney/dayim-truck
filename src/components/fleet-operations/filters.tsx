"use client";

import React, { useState } from "react";
import { Filter, List, Grid, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const filters = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "trip", label: "Trip" },
  { id: "maintenance", label: "Maintenance" },
  { id: "inactive", label: "Inactive" },
];

interface FleetFiltersProps {
  viewType: "list" | "card";
  onViewChange: (view: "list" | "card") => void;
}

const FleetFilters = ({ viewType, onViewChange }: FleetFiltersProps) => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="flex items-center justify-between mb-4">
      {/* Search Bar and View Toggles on the Left Side */}
      <div className="flex items-center gap-4">
        <div className="relative w-64 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search vehicles, drivers..."
            className="pl-10 bg-card/50 border-none focus-visible:ring-primary/50 h-9"
          />
        </div>

        <div className="flex items-center gap-1 bg-card/50 p-1 rounded-xl border border-border/50 shadow-inner">
          <button
            onClick={() => onViewChange("list")}
            title="Tabular View"
            className={cn(
              "p-1.5 rounded-lg transition-all duration-300",
              viewType === "list"
                ? "bg-primary text-primary-foreground shadow-md scale-105"
                : "text-muted-foreground hover:text-foreground hover:bg-card/80"
            )}
          >
            <List className="size-4" />
          </button>
          <button
            onClick={() => onViewChange("card")}
            title="Card View"
            className={cn(
              "p-1.5 rounded-lg transition-all duration-300",
              viewType === "card"
                ? "bg-primary text-primary-foreground shadow-md scale-105"
                : "text-muted-foreground hover:text-foreground hover:bg-card/80"
            )}
          >
            <Grid className="size-4" />
          </button>
        </div>
      </div>

      {/* Status Filters on the Right Side */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-card/30 text-muted-foreground border border-border/30">
          <Filter className="size-3.5" />
        </div>
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border",
              activeFilter === filter.id
                ? "bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(var(--primary),0.1)]"
                : "bg-card/30 border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FleetFilters;
