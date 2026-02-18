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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
          <Input
            placeholder="Search vehicles, drivers..."
            className="bg-[#0b0e14] border-[#1e2235] pl-10 text-white placeholder:text-[#94a3b8] focus-visible:ring-[#00d1ff] focus-visible:border-[#00d1ff]"
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
        <h1 className="text-2xl font-bold text-white tracking-tight">Maintenance & Diagnostics</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-[#1e2235] border-none text-[#94a3b8] hover:bg-[#2d334d] hover:text-white transition-all duration-300">
            <Download className="w-4 h-4 mr-2" />
            Report
          </Button>
          <Button className="bg-[#00d1ff] text-[#001529] font-bold hover:bg-[#00b8e6] transition-all duration-300 shadow-[0_0_15px_rgba(0,209,255,0.3)] border-none">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Service
          </Button>
        </div>
      </div>
    </div>
  );
}
