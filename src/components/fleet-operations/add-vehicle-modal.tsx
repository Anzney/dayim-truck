"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (vehicle: { name: string; plate: string; location: string }) => void;
}

export function AddVehicleModal({ isOpen, onClose, onAdd }: AddVehicleModalProps) {
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, plate, location });
    setName("");
    setPlate("");
    setLocation("");
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
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-lg bg-card border border-border rounded-[32px] p-10 shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Add New Vehicle</h2>
              <button
                onClick={onClose}
                className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-muted-foreground ml-1">Vehicle Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Freightliner Cascadia"
                  className="w-full bg-muted/50 border border-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl py-5 px-6 text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 text-lg shadow-inner"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-muted-foreground ml-1">License Plate *</label>
                <input
                  type="text"
                  required
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  placeholder="e.g. TX-1234"
                  className="w-full bg-muted/50 border border-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl py-5 px-6 text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 text-lg shadow-inner"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-muted-foreground ml-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Houston, TX"
                  className="w-full bg-muted/50 border border-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl py-5 px-6 text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 text-lg shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 rounded-2xl shadow-[0_10px_30px_rgba(var(--primary),0.3)] hover:shadow-[0_15px_40px_rgba(var(--primary),0.5)] transition-all duration-300 transform hover:-translate-y-1 text-lg active:scale-95 text-slate-900"
              >
                Add Vehicle
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
