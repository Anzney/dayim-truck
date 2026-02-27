import React from "react";
import { Fuel, DollarSign, TrendingUp, Activity } from "lucide-react";

export const fuelStats = [
    {
        title: "Total Fuel Cost",
        value: "SAR 12,900",
        change: "4.8%",
        isNegative: true,
        icon: <Fuel className="size-5 text-primary" />,
        bgIcon: "bg-primary/10",
    },
    {
        title: "Avg Cost/Vehicle",
        value: "SAR 1,612",
        icon: <DollarSign className="size-5 text-emerald-400" />,
        bgIcon: "bg-emerald-500/10",
    },
    {
        title: "Total Expenses",
        value: "SAR 82.5K",
        change: "2.1%",
        isNegative: false,
        icon: <TrendingUp className="size-5 text-primary" />,
        bgIcon: "bg-primary/10",
    },
    {
        title: "Fuel Efficiency",
        value: "6.8 mpg",
        change: "0.3 mpg",
        isNegative: false,
        icon: <Activity className="size-5 text-primary" />,
        bgIcon: "bg-primary/10",
    },
];

export const consumptionTrendData = [
    { name: "Aug", consumption: 12500, baseline: 4200 },
    { name: "Sep", consumption: 11500, baseline: 4500 },
    { name: "Oct", consumption: 13500, baseline: 4300 },
    { name: "Nov", consumption: 12800, baseline: 4100 },
    { name: "Dec", consumption: 11000, baseline: 3800 },
    { name: "Jan", consumption: 13000, baseline: 4400 },
];

export const expenseBreakdownData = [
    { name: "Fuel", value: 42500, color: "var(--primary)" },
    { name: "Maintenance", value: 18200, color: "#fbbf24" },
    { name: "Insurance", value: 12800, color: "#10b981" },
    { name: "Tolls", value: 5600, color: "#a855f7" },
    { name: "Other", value: 3400, color: "#64748b" },
];

export const costRevenueData = [
    { name: "V-001", cost: 4200, revenue: 8500 },
    { name: "V-002", cost: 4800, revenue: 11500 },
    { name: "V-003", cost: 3500, revenue: 5200 },
    { name: "V-004", cost: 6500, revenue: 8800 },
    { name: "V-005", cost: 5800, revenue: 12500 },
    { name: "V-006", cost: 4200, revenue: 7200 },
];

export const recentRefuelingData = [
    { id: "V-002", station: "BP Highway 5", date: "2026-02-14", amount: "95 gal", price: 285 },
    { id: "V-004", station: "Exxon NJ-95", date: "2026-02-13", amount: "110 gal", price: 330 },
    { id: "V-006", station: "Chevron I-75", date: "2026-02-12", amount: "88 gal", price: 264 },
    { id: "V-007", station: "Pilot Columbus", date: "2026-02-11", amount: "135 gal", price: 405 },
    { id: "V-001", station: "Shell Route 66", date: "2026-02-10", amount: "92 gal", price: 276 },
    { id: "V-005", station: "Texaco Express", date: "2026-02-09", amount: "105 gal", price: 315 },
];
