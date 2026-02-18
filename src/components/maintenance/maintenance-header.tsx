"use client";

import { Download, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MaintenanceHeader() {
  return (
    <div className="space-y-6 mb-6">
      {/* Search Bar Row */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search vehicles, drivers..."
            className="bg-neutral-100 dark:bg-neutral-900 border-border pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff4d4f] rounded-full" />
            <Search className="w-5 h-5 text-[#94a3b8] hidden" /> {/* Placeholder for Bell if needed, but image shows Bell elsewhere */}
          </div>
        </div>
      </div>

      {/* Title and Action Buttons Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Maintenance & Diagnostics</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border bg-neutral-100 dark:bg-neutral-900 text-muted-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-foreground">
            <Download className="w-4 h-4 mr-2" />
            Report
          </Button>
          <Button className="bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md border-none">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Service
          </Button>
        </div>
      </div>
    </div>
  );
}
