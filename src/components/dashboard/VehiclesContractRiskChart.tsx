import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface RawData {
  vehicle: string;
  usage: number;
}

interface ChartData extends RawData {
  percentage: number;
  color: string;
}

interface VehiclesContractRiskChartProps {
  data: RawData[];
  contractLimit?: number;
}

// Main component function
function VehiclesContractRiskChart({
  data,
  contractLimit = 5000
}: VehiclesContractRiskChartProps) {

  // Filter data to only show vehicles near or exceeding contract limit (≥80%)
  const filteredData = data.filter(row => row.usage >= 0.8 * contractLimit);

  // If no data passes filter, show compact message
  if (filteredData.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500">
        <Badge variant="secondary" className="text-sm">
          No vehicles near contract limit
        </Badge>
      </div>
    );
  }

  // Process data to add percentage calculations
  const chartData: ChartData[] = filteredData.map(row => {
    const percentage = (row.usage / contractLimit) * 100;
    let color: string;

    if (percentage > 100) {
      color = '#ef4444'; // Red for exceeded
    } else if (percentage >= 80) {
      color = '#F59E0B'; // Yellow/Orange for near limit
    } else {
      color = '#10b981'; // Green for normal
    }

    return {
      vehicle: row.vehicle,
      usage: row.usage,
      percentage: Math.round(percentage),
      color
    };
  });

  const chartHeight = 100;

  return (
    <TooltipProvider>
      <div className="w-full px-4">
        {/* Chart container */}
        <div className="w-full space-y-3">

          {/* Chart with Grid */}
          <div className="relative" style={{ height: `${chartHeight + 20}px` }}>
            {/* Cartesian Grid Lines */}
            <div className="absolute left-10 right-0 flex flex-col gap-10 justify-between" style={{ height: `${chartHeight * 0.8}px`, marginTop: '10px' }}>
              {[100, 80, 60, 40, 20, 0].map((percentage) => (
                <div key={percentage} className="w-full border-t border-gray-200 dark:border-neutral-700 border-dashed relative">
                  <span className="absolute -left-10 -top-2 text-xs text-muted-foreground">
                    {percentage}%
                  </span>
                </div>
              ))}
            </div>

            {/* Chart Container */}
            <div className="flex items-end justify-between ml-10" style={{ height: `${chartHeight + 158}px` }}>

              {/* Bars */}
              <div className="flex items-end justify-between space-x-1 flex-1">
                {chartData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {/* Progress Bar Container */}
                        <div
                          className="relative w-6 cursor-pointer"
                          style={{ height: `${chartHeight * 0.8}px` }}
                        >
                          {/* Background bar (100% limit) - Light gray */}
                          <div
                            className="absolute bottom-0 left-0 w-full bg-gray-200 dark:bg-neutral-800 rounded-sm"
                            style={{
                              height: `${chartHeight * 2.1}px`, // 80% of chart height represents 100%
                              minHeight: '8px'
                            }}
                          ></div>

                          {/* Progress bar - Colored based on usage */}
                          <div
                            className="absolute bottom-0 left-0 w-full rounded-sm transition-all duration-300 ease-in-out"
                            style={{
                              height: `${(item.percentage / 100) * (chartHeight * 2.1)}px`,
                              backgroundColor: item.color,
                              minHeight: '8px'
                            }}
                          ></div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-center">
                          <div className="font-semibold mb-1">{item.vehicle}</div>
                          <div>Used: {item.usage.toLocaleString()} km</div>
                          <div>Contract: {contractLimit.toLocaleString()} km</div>
                          <div className="font-medium">{item.percentage}% utilized</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>

                    {/* Only show truck number */}
                    <span className="text-xs font-medium text-muted-foreground text-center">
                      {item.vehicle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default VehiclesContractRiskChart;
