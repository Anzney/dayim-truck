import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useTheme } from 'next-themes'

const DonutChart = ({
  percentage = 0,
  color = '#F59E0B',
  trackColor = '#E5E7EB',
  width = 180,
  height = 100,
  thickness = 16,
  showLabel = true,
  className = '',
  labelText
}) => {
  const { theme } = useTheme()
  const safePercentage = Math.max(0, Math.min(100, Number(percentage) || 0))
  
  // Use neutral-700 for dark mode, otherwise use the provided trackColor
  const effectiveTrackColor = theme === 'dark' || theme === 'system' ? '#29292a' : trackColor
  const data = [
    { name: 'filled', value: safePercentage },
    { name: 'remaining', value: 100 - safePercentage }
  ]

  // Radius based on container height/width to fit a semicircle
  const outerRadius = Math.min(width / 2, height)
  const innerRadius = Math.max(0, outerRadius - thickness)

  const labelTop = Math.max(0, height / 2 - 8)

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="100%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            isAnimationActive={true}
            stroke="none"
          >
            <Cell key="filled" fill={color} cornerRadius={0} />
            <Cell key="remaining" fill={effectiveTrackColor} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {showLabel && (
        <div
          className="absolute left-9 translate-y-[90%] text-xl   tracking-tight font-semibold"
          style={{ top: labelTop }}
        >
          {safePercentage}% {labelText}
        </div>
      )}
    </div>
  )
}

export default DonutChart


