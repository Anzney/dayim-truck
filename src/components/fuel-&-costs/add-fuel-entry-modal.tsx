"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddFuelEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (entry: { vehicle: string; gallons: string; cost: string; station: string }) => void;
}

const vehicles = [
  "V-001 — Freightliner Cascadia",
  "V-002 — Volvo VNL 860",
  "V-003 — Peterbilt 579",
  "V-004 — Kenworth T680",
  "V-005 — Mack Anthem",
  "V-006 — International LT",
];

export function AddFuelEntryModal({ isOpen, onClose, onAdd }: AddFuelEntryModalProps) {
  const [vehicle, setVehicle] = useState(vehicles[0]);
  const [gallons, setGallons] = useState("");
  const [cost, setCost] = useState("");
  const [station, setStation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ vehicle, gallons, cost, station });
    // Reset state
    setGallons("");
    setCost("");
    setStation("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-card border border-border rounded-[24px] p-8 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Add Fuel Entry</h2>
              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Vehicle Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Vehicle</label>
                <div className="relative group">
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full appearance-none bg-muted/50 border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-xl py-3 px-4 text-foreground outline-none transition-all cursor-pointer group-hover:border-primary/30"
                  >
                    {vehicles.map((v) => (
                      <option key={v} value={v} className="bg-card">
                        {v}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none group-hover:text-primary transition-colors" />
                </div>
              </div>

              {/* Gallons & Cost Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Gallons</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 120"
                    value={gallons}
                    onChange={(e) => setGallons(e.target.value)}
                    className="w-full bg-muted/50 border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-xl py-3 px-4 text-foreground placeholder:text-muted-foreground/50 outline-none transition-all group-hover:border-primary/30 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Cost ($)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 360"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full bg-muted/50 border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-xl py-3 px-4 text-foreground placeholder:text-muted-foreground/50 outline-none transition-all group-hover:border-primary/30 font-medium"
                  />
                </div>
              </div>

              {/* Station */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Station</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shell I-10"
                  value={station}
                  onChange={(e) => setStation(e.target.value)}
                  className="w-full bg-muted/50 border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-xl py-3 px-4 text-foreground placeholder:text-muted-foreground/50 outline-none transition-all group-hover:border-primary/30 font-medium"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01, translateY: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all text-base tracking-wide text-slate-900"
              >
                Add Entry
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
