"use client";

import { useState } from "react";
import { X, User, Truck, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (driver: { name: string; vehicle: string }) => void;
}

export function AddDriverModal({ isOpen, onClose, onAdd }: AddDriverModalProps) {
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("None");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, vehicle: vehicle === "None" ? "" : vehicle });
    setName("");
    setVehicle("None");
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
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-card border border-white/5 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden dark:bg-gradient-to-br dark:from-neutral-800 dark:to-neutral-900 backdrop-blur-2xl"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16 rounded-full" />

            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Add New Driver</h2>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 ml-1">Full Name *</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jane Smith"
                    className="w-full bg-input border border-white/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-slate-600 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 ml-1">Assign Vehicle (optional)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Truck className="h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  </div>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full bg-input border border-white/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl py-4 pl-12 pr-10 text-foreground outline-none transition-all duration-300 appearance-none"
                  >
                    <option value="None">— None —</option>
                    <option value="TRK-001">TRK-001</option>
                    <option value="TRK-002">TRK-002</option>
                    <option value="TRK-003">TRK-003</option>
                    <option value="TRK-004">TRK-004</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-slate-500" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Add Driver
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
