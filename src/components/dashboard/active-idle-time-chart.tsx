import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ActiveIdleTimeChart = () => {
  // Sample data - you can replace this with your actual data
  const data = [
    { day: "Mon", active: 12, idle: 6 },
    { day: "Tue", active: 10, idle: 8 },
    { day: "Wed", active: 14, idle: 4 },
    { day: "Thu", active: 11, idle: 7 },
    { day: "Fri", active: 13, idle: 5 },
    { day: "Sat", active: 8, idle: 10 },
    { day: "Sun", active: 6, idle: 12 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const activeHours = payload[0]?.value || 0;
      const idleHours = payload[1]?.value || 0;
      const totalHours = activeHours + idleHours;

      return (
        <div className="bg-white p-4 border rounded-xl shadow-xl backdrop-blur-sm">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm text-emerald-600">
              Active Hours: <span className="font-semibold">{activeHours}h</span>
            </p>
            <p className="text-sm text-amber-600">
              Idle Hours: <span className="font-semibold">{idleHours}h</span>
            </p>
            <p className="text-sm text-gray-600 border-t pt-1">
              Total: <span className="font-semibold">{totalHours}h</span>
            </p>
            <p className="text-sm text-blue-600">
              Efficiency: <span className="font-semibold">{Math.round((activeHours / totalHours) * 100)}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex items-center justify-center gap-6 mt-4">
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full p-4 rounded-2xl flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="text-lg font-semibold">Active vs Idle Time</h3>
        <div className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
          View More
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="idleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              opacity={0.1}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickMargin={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickMargin={8}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <Area
              type="monotone"
              dataKey="active"
              stackId="1"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#activeGradient)"
              name="Active Hours"
            />
            <Area
              type="monotone"
              dataKey="idle"
              stackId="1"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#idleGradient)"
              name="Idle Hours"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActiveIdleTimeChart;
