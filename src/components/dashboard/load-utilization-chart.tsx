import React from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Legend } from 'recharts';

const LoadUtilizationChart = () => {
  // Sample data showing vehicle counts for underload and overload by weekday
  const data = [
    { day: "Mon", underload: -5, overload: 3 },
    { day: "Tue", underload: -2, overload: 6 },
    { day: "Wed", underload: -4, overload: 2 },
    { day: "Thu", underload: -3, overload: 4 },
    { day: "Fri", underload: -1, overload: 7 },
    { day: "Sat", underload: -6, overload: 1 },
    { day: "Sun", underload: -2, overload: 5 }
  ];

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


  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const underloadCount = Math.abs(payload.find((p: any) => p.dataKey === 'underload')?.value || 0);
      const overloadCount = payload.find((p: any) => p.dataKey === 'overload')?.value || 0;

      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          {underloadCount > 0 && (
            <p className="text-sm text-blue-600">
              Underload Vehicles: <span className="font-semibold">{underloadCount}</span>
            </p>
          )}
          {overloadCount > 0 && (
            <p className="text-sm text-red-600">
              Overload Vehicles: <span className="font-semibold">{overloadCount}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full p-4 rounded-2xl flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="text-lg font-semibold">Load Utilization</h3>
        <div className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
          View More
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#6b7280" opacity={0} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Underload bars (negative values, blue color) */}
            <Bar
              dataKey="underload"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="Underload"
            >
              <LabelList
                dataKey="underload"
                position="top"
                formatter={(value: number) => Math.abs(value)}
                style={{ fontSize: 12, fill: '#6b7280' }}
              />
            </Bar>

            <Legend content={<CustomLegend />} />

            {/* Overload bars (positive values, red color) */}
            <Bar
              dataKey="overload"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              name="Overload"
            >
              <LabelList
                dataKey="overload"
                position="top"
                style={{ fontSize: 12, fill: '#6b7280' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LoadUtilizationChart;
