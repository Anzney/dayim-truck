"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

interface ScheduleServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (service: { vehicle: string; serviceType: string; date: string; cost: string }) => void;
}

export function ScheduleServiceModal({ isOpen, onClose, onSchedule }: ScheduleServiceModalProps) {
  const [vehicle, setVehicle] = useState("V-001 — Freightliner Cascadia");
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    if (isOpen) {
      console.log("MODAL RENDER: isOpen is TRUE");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule({ vehicle, serviceType, date, cost });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md" style={{ zIndex: 999999 }}>
      <div
        className="relative w-full max-w-lg bg-card border-2 border-primary rounded-[2.5rem] p-10 shadow-2xl text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Schedule New Service</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">Vehicle</label>
            <div className="relative">
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full bg-input border border-white/20 rounded-2xl py-4 px-4 text-foreground appearance-none outline-none focus:border-primary"
              >
                <option value="V-001 — Freightliner Cascadia">V-001 — Freightliner Cascadia</option>
                <option value="V-002 — Kenworth T680">V-002 — Kenworth T680</option>
                <option value="V-003 — Peterbilt 579">V-003 — Peterbilt 579</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">Service Type</label>
            <input
              type="text"
              required
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              placeholder="e.g. Oil Change"
              className="w-full bg-input border border-white/20 rounded-2xl py-4 px-4 text-foreground outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-input border border-white/20 rounded-2xl py-4 px-4 text-foreground outline-none focus:border-primary [color-scheme:dark]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">Est. Cost ($)</label>
              <input
                type="number"
                required
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="450"
                className="w-full bg-input border border-white/20 rounded-2xl py-4 px-4 text-foreground outline-none focus:border-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-primary/50"
          >
            Schedule Service
          </button>
        </form>
      </div>
    </div>
  );
}
