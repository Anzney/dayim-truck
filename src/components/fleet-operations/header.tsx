"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FleetHeaderProps {
  onAddClick: () => void;
}

const FleetHeader = ({ onAddClick }: FleetHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fleet Operations</h1>
        <div className="flex items-center gap-4">
          <Button
            onClick={onAddClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-6 rounded-xl hover:scale-105 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="size-5" />
            Add Vehicle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FleetHeader;
