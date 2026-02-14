
export interface Trend {
  value: string;
  type: 'up' | 'down';
}

export interface AnomalyAlert {
  id: string;
  date: string;
  details: string;
  status: string;
  severity: 'high' | 'medium' | 'low';
}

export interface VehiclePerformance {
  id: string;
  fuel: string;
  mileage: string;
  cost: string;
  idle: string;
  alerts: number;
  trend: number[];
}

export interface ConsumptionData {
  name: string;
  used: number;
  cost: number;
}

export interface BudgetData {
  name: string;
  budget: number;
  actual: number;
}

export interface DistributionData {
  name: string;
  value: number;
  color: string;
}

export interface VendorData {
  name: string;
  visits: number;
  amount: string;
  trend: string;
}

export interface KpiData {
  title: string;
  value: string;
  subtext: string;
  trend?: Trend;
  color: 'blue' | 'red' | 'green' | 'yellow' | 'gold';
  gaugeValue?: number;
}
