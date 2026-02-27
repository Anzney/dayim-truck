
import {
  AnomalyAlert,
  VehiclePerformance,
  ConsumptionData,
  BudgetData,
  DistributionData,
  VendorData,
  KpiData
} from '@/types/fuel-analytics';
import { Fuel, Truck, Gauge, Zap } from 'lucide-react';

export const anomalyAlerts: AnomalyAlert[] = [
  { id: 'TRK-103', date: '21 Apr 2024', details: 'Sudden Fuel Drop: 18 L', status: 'Unresolved', severity: 'high' },
  { id: 'VIK-238', date: '19 Apr 2024', details: 'Refuel Mismatch 120 L, tank capacity : 55 L', status: 'Warning', severity: 'medium' },
  { id: 'TRK-105', date: '18 Apr 2024', details: 'Sudden Fuel Drop: 26 L', status: 'Unresolved', severity: 'high' },
  { id: 'VAN-469', date: '11 Apr 2024', details: 'Detail detected at CNG Pump: 55 L', status: 'Unresolved', severity: 'high' },
];

export const vehiclePerformance: VehiclePerformance[] = [
  { id: 'TRK-103', fuel: '350 L', mileage: '18.6 km/l', cost: 'SAR 4.79/km', idle: '9.2 hrs', alerts: 1, trend: [40, 60, 45, 80, 55, 90] },
  { id: 'VIK-238', fuel: '195 L', mileage: '17.3 km/l', cost: 'SAR 4.87/km', idle: '6.0 hrs', alerts: 1, trend: [50, 40, 70, 45, 60, 50] },
  { id: 'TRK-108', fuel: '165 L', mileage: '16.0 km/l', cost: 'SAR 4.90/km', idle: '1.4 hrs', alerts: 1, trend: [30, 40, 35, 50, 45, 60] },
  { id: 'TUV-109', fuel: '170 L', mileage: '18.5 km/l', cost: 'SAR 4.99/km', idle: '5.2 hrs', alerts: 0, trend: [60, 55, 65, 70, 68, 75] },
  { id: 'VAN-469', fuel: '150 L', mileage: '14.9 km/l', cost: 'SAR 4.70/km', idle: '6.1 hrs', alerts: 1, trend: [20, 30, 25, 40, 35, 45] },
];

export const consumptionData: ConsumptionData[] = [
  { name: '20.03', used: 120, cost: 4.2 },
  { name: '21.03', used: 150, cost: 4.5 },
  { name: '22.03', used: 140, cost: 4.3 },
  { name: '23.03', used: 180, cost: 4.8 },
  { name: '24.03', used: 170, cost: 4.6 },
  { name: '25.03', used: 200, cost: 5.1 },
  { name: '26.03', used: 190, cost: 4.9 },
];

export const budgetData: BudgetData[] = [
  { name: 'Oct', budget: 4000, actual: 4200 },
  { name: 'Nov', budget: 3000, actual: 2800 },
  { name: 'Dec', budget: 4500, actual: 4800 },
  { name: 'Jan', budget: 3500, actual: 4100 },
];

export const distributionData: DistributionData[] = [
  { name: 'Diesel', value: 54, color: '#3b82f6' },
  { name: 'Petrol', value: 24, color: '#f59e0b' },
  { name: 'CNG', value: 12, color: '#10b821' },
  { name: 'EV', value: 10, color: '#8b5cf6' },
];

export const vendorData: VendorData[] = [
  { name: 'Bugera Fuels', visits: 24, amount: '620 L', trend: '+12%' },
  { name: 'Excel Petrol Pumps', visits: 19, amount: '445 L', trend: '-2%' },
  { name: 'Bharat Filling Station', visits: 16, amount: '300 L', trend: '+5%' },
  { name: 'Express Energy', visits: 10, amount: '210 L', trend: '0%' },
];

export const fuelKpis: KpiData[] = [
  {
    title: "Total Fuel Used",
    value: "1,240 L",
    subtext: "vs Last Month",
    trend: { value: "10.3%", type: "down" },
    color: "blue",
    gaugeValue: 65,
  },
  {
    title: "Total Fuel Cost",
    value: "SAR 74,500",
    subtext: "Budget vs Actual",
    trend: { value: "6.4%", type: "up" },
    color: "red",
  },
  {
    title: "Avg Mileage",
    value: "17.4 km/l",
    subtext: "vs Industry Avg: 15 km/l",
    color: "green",
    gaugeValue: 82,
  },
  {
    title: "Cost Per KM",
    value: "SAR 4.62",
    subtext: "Rate per KM",
    color: "yellow",
    gaugeValue: 45,
  },
  {
    title: "Fuel Efficiency Score",
    value: "73%",
    subtext: "Health Status",
    color: "gold",
    gaugeValue: 73,
  },
];
