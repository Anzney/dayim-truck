"use client";

import { Download, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MaintenanceHeader({ onScheduleClick }: { onScheduleClick: () => void }) {
  return (
    <div className="space-y-4">
      {/* Title, Search Bar and Action Buttons Row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Maintenance & Diagnostics</h1>

        <div className="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search vehicles, drivers..."
              className="bg-input border-border pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary h-9"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none border-border bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground h-9">
              <Download className="w-4 h-4 mr-2" />
              Report
            </Button>
            <Button
              onClick={() => {
                console.log("Button Clicked");
                onScheduleClick();
              }}
              className="flex-1 md:flex-none bg-primary text-primary-foreground font-bold hover:bg-primary/90 shadow-md border-none h-9"
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
