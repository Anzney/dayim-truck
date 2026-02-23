"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  ChevronRight,
  Download,
  ExternalLink,
  Search,
  ArrowUpDown
} from 'lucide-react'
import { anomalyAlerts, vehiclePerformance } from '@/data/fuel-analytics'

interface MiniSparklineProps {
  data: number[];
  color: string;
}

const MiniSparkline = ({ data, color }: MiniSparklineProps) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max === min ? 1 : max - min;
  const width = 80;
  const height = 20;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
};

const FuelTablesSection = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 px-6 py-4 pb-12">
      {/* Fuel Anomaly Alerts */}
      <Card className="bg-card/40 backdrop-blur-sm border-muted">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <AlertTriangle className="size-4 text-destructive" />
            Fuel Anomaly Alerts
          </CardTitle>
          <Button variant="outline" size="sm" className="h-8 text-[11px] gap-1.5 border-muted">
            View All Alerts <ChevronRight className="size-3" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b border-muted/50">
                  <th className="text-left font-medium pb-3 pr-4">Vehicle ID</th>
                  <th className="text-left font-medium pb-3 pr-4">Alert Date</th>
                  <th className="text-left font-medium pb-3 pr-4">Details</th>
                  <th className="text-right font-medium pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/30">
                {anomalyAlerts.map((alert, i) => (
                  <tr key={i} className="group hover:bg-muted/20 transition-colors">
                    <td className="py-4 pr-4 font-bold text-foreground">{alert.id}</td>
                    <td className="py-4 pr-4 opacity-70 text-[12px]">{alert.date}</td>
                    <td className="py-4 pr-4 opacity-90 text-[12px] max-w-[200px] truncate">{alert.details}</td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-destructive font-bold text-[11px]">
                        <AlertTriangle className="size-3" />
                        {alert.status.toUpperCase()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Fuel Performance */}
      <Card className="bg-card/40 backdrop-blur-sm border-muted">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-semibold">Vehicle Fuel Performance</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-muted">
              <Search className="size-3.5" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-[11px] gap-1.5 border-muted bg-primary text-primary-foreground">
              View Full Layout <ExternalLink className="size-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b border-muted/50">
                  <th className="text-left font-medium pb-3 pr-4">Vehicle ID</th>
                  <th className="text-left font-medium pb-3 pr-4">Fuel Used</th>
                  <th className="text-left font-medium pb-3 pr-4">Avg Mileage</th>
                  <th className="text-left font-medium pb-3 pr-4">Cost Per KM</th>
                  <th className="text-left font-medium pb-3 pr-4 whitespace-nowrap">Idle Time</th>
                  <th className="text-right font-medium pb-3">Anomalies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/30">
                {vehiclePerformance.map((item, i) => (
                  <tr key={i} className="group hover:bg-muted/20 transition-colors">
                    <td className="py-4 pr-4 font-bold text-foreground">{item.id}</td>
                    <td className="py-4 pr-4 font-mono font-medium">{item.fuel}</td>
                    <td className="py-4 pr-4 opacity-80">{item.mileage}</td>
                    <td className="py-4 pr-4 font-mono text-primary font-bold">{item.cost}</td>
                    <td className="py-4 pr-4 text-[12px]">
                      <div className="flex items-center gap-3">
                        <span className="opacity-70 w-12">{item.idle}</span>
                        <MiniSparkline
                          data={item.trend}
                          color={item.mileage.includes('18') ? 'var(--primary)' : item.mileage.includes('14') ? 'hsl(var(--destructive))' : 'var(--color-chart-2)'}
                        />
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className={`flex items-center justify-end font-bold rounded-full size-6 ml-auto ${item.alerts > 0 ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                        {item.alerts}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-muted/50 pt-4">
            <Button variant="ghost" size="sm" className="text-[11px] gap-1.5 text-muted-foreground hover:text-foreground">
              <Download className="size-3" /> View Full Export
            </Button>
            <div className="flex gap-1">
              {[1, 2, 3].map(p => (
                <Button key={p} variant={p === 1 ? 'outline' : 'ghost'} size="sm" className={`h-7 w-7 p-0 text-xs ${p === 1 ? 'border-primary text-primary' : ''}`}>{p}</Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FuelTablesSection
