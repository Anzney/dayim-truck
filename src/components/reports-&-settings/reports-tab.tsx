"use client";

import { FileText, Download } from "lucide-react";
import { motion } from "framer-motion";

const reports = [
  {
    title: "Fleet Performance Summary",
    description: "Monthly overview of fleet KPIs",
    type: "PDF",
  },
  {
    title: "Fuel Consumption Report",
    description: "Detailed fuel analytics by vehicle",
    type: "CSV",
  },
  {
    title: "Driver Safety Report",
    description: "Safety scores and violation summary",
    type: "PDF",
  },
  {
    title: "Maintenance Cost Analysis",
    description: "Breakdown of maintenance expenses",
    type: "PDF",
  },
  {
    title: "Trip History Export",
    description: "Complete trip logs with route data",
    type: "CSV",
  },
];

export function ReportsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report, index) => (
        <motion.div
          key={report.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)] overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-[40px] rounded-full -mr-12 -mt-12 transition-all duration-500 group-hover:bg-primary/10" />

          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <span className="text-[10px] font-bold text-muted-foreground px-2 py-1 bg-secondary rounded-md uppercase tracking-wider group-hover:text-primary group-hover:bg-primary/10 transition-all">
              {report.type}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {report.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            {report.description}
          </p>

          <button className="flex items-center gap-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors group/btn">
            <Download className="h-4 w-4 transition-transform group-hover/btn:-translate-y-1" />
            Generate Report
          </button>
        </motion.div>
      ))}
    </div>
  );
}
