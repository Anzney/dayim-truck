"use client"

import React from 'react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap } from 'lucide-react'
import { consumptionData, budgetData, distributionData, vendorData } from '@/data/fuel-analytics'

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-sm font-bold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: <span className="font-mono">{entry.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

const FuelChartsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-6 py-4">
      {/* Fuel Consumption Trend */}
      <Card className="lg:col-span-8 bg-card/40 backdrop-blur-sm border-muted">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-base font-semibold">Fuel Consumption Trend</CardTitle>
          <div className="flex bg-muted/30 p-1 rounded-md">
            <Button variant="ghost" size="sm" className="h-7 text-xs px-3">Daily</Button>
            <Button variant="secondary" size="sm" className="h-7 text-xs px-3 shadow-sm">Weekly</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={consumptionData}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: 'currentColor', opacity: 0.5 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: 'currentColor', opacity: 0.5 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                <Line
                  type="monotone"
                  dataKey="used"
                  name="Total Fuel Used"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--background))' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="cost"
                  name="Cost Per KM"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Budget vs Actual */}
      <Card className="lg:col-span-4 bg-card/40 backdrop-blur-sm border-muted">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-base font-semibold">Budget vs Actual</CardTitle>
          <span className="text-emerald-500 font-bold text-sm">₹4,500 Under</span>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: 'currentColor', opacity: 0.5 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: 'currentColor', opacity: 0.5 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="budget" name="Budget" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="actual" name="Actual" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Fuel Type Distribution */}
      <Card className="lg:col-span-4 bg-card/40 backdrop-blur-sm border-muted">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Fuel Type Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="h-[220px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">54%</span>
              <span className="text-[10px] opacity-50 uppercase tracking-widest font-semibold">Diesel</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 w-full px-4">
            {distributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="size-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs opacity-70">{item.name}</span>
                <span className="text-xs font-bold ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vendor Analysis Table */}
      <div className="lg:col-span-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Rapid Table Preview */}
          <Card className="bg-card/40 backdrop-blur-sm border-muted">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Fuel Vendor Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vendorData.map((vendor, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors border border-transparent hover:border-muted">
                    <span className="text-sm font-medium">{vendor.name}</span>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="opacity-50">{vendor.visits} visits</span>
                      <span className="font-bold">{vendor.amount}</span>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-xs text-primary">View All Vendors</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 backdrop-blur-sm border-muted border-dashed flex flex-col items-center justify-center p-6 text-center">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="size-6 text-primary" />
            </div>
            <h4 className="font-bold mb-1">Anomaly Alerts</h4>
            <p className="text-xs opacity-60 mb-4">4 Unresolved fuel drops detected in last 24h</p>
            <Button size="sm" variant="destructive" className="shadow-lg shadow-destructive/20">Action Required</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default FuelChartsSection
