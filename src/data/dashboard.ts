
import { AiInsight, DummyFleetResponse, ExampleQuestion, AiCapability } from '@/types/dashboard';
import { BotMessageSquare, Maximize2, Send, TriangleAlert, Lightbulb, CircleCheck, Sparkles, TrendingUp, Shield, Zap, Brain, MessageSquare, User, Loader } from 'lucide-react';

export const aiInsights: AiInsight[] = [
  {
    id: 1,
    title: "AI shows 2 routes consuming 20% more fuel cost per delivery."
  },
  {
    id: 2,
    title: "Switching to Truck #12 for Route B reduces delivery cost by $3/km."
  },
  {
    id: 3,
    title: "AI forecasts fleet-wide fuel optimization could cut CO₂ emissions by 14% this quarter."
  },
  {
    id: 4,
    title: "AI identifies 5 drivers who can improve mileage by 12% through smoother driving."
  },
  {
    id: 5,
    title: "Optimized load distribution can save 8% fuel on long hauls."
  },
  {
    id: 6,
    title: "AI predicts 3 trucks will require maintenance within the next 10 days."
  },
];

export const dummyFleetResponses: DummyFleetResponse[] = [
  {
    keywords: ['active', 'status', 'vehicles', 'stopped', 'idling'],
    response: `Based on your current fleet data, here's the live status:

🚛 Active Vehicles: 12 trucks are currently moving
⏸️ Idling Vehicles: 3 trucks are idling (engines on, stationary)
🛑 Stopped Vehicles: 5 trucks are parked with engines off

Key Insights:
• Route efficiency is at 87% - excellent performance
• Average speed across active fleet: 65 km/h
• Truck #7 and #14 have been idling for over 20 minutes
• All vehicles are within designated zones`,
    followUps: ['Show me fuel consumption patterns', 'Which vehicles need maintenance?', 'Optimize routes for idling trucks']
  },
  {
    keywords: ['fuel', 'consumption', 'efficiency', 'cost'],
    response: `Here's your fleet's fuel efficiency analysis:

⛽ Today's Fuel Consumption: 847 liters
📊 Average Efficiency: 6.2 km/L across fleet
💰 Daily Fuel Cost: $1,235

Top Performers:
• Truck #12: 8.1 km/L (best efficiency)
• Truck #5: 7.8 km/L 
• Truck #18: 7.6 km/L

Needs Attention:
• Truck #3: 4.2 km/L (25% below average)
• Truck #9: 4.8 km/L (poor performance on Route C)

Cost Savings Opportunity: Optimizing underperforming vehicles could save $180/day`,
    followUps: ['Show route optimization suggestions', 'Schedule maintenance for poor performers', 'Compare with last month']
  },
  {
    keywords: ['maintenance', 'service', 'repair', 'scheduled'],
    response: `Here's your fleet maintenance overview:

🔧 Upcoming Maintenance: 4 vehicles scheduled this week
⚠️ Overdue Services: 2 trucks need immediate attention
✅ Recently Serviced: 6 trucks completed service in last 7 days

Critical Alerts:
• Truck #7: Brake inspection overdue by 5 days
• Truck #15: Oil change due in 2 days

This Week's Schedule:
• Monday: Truck #12 - Full service
• Wednesday: Truck #8 - Tire rotation
• Friday: Truck #4 - Engine diagnostic

Maintenance Costs: $2,340 planned for this month`,
    followUps: ['Schedule overdue maintenance', 'View maintenance history', 'Set preventive maintenance alerts']
  },
  {
    keywords: ['routes', 'optimization', 'delivery', 'traffic'],
    response: `Route optimization analysis for your fleet:

🗺️ Active Routes: 8 routes currently in progress
⏱️ Average Delivery Time: 45 minutes per stop
🚦 Traffic Impact: 12% delay due to current conditions

Route Performance:
• Route A (City Center): 92% on-time delivery
• Route B (Industrial Zone): 88% efficiency  
• Route C (Suburb): 76% (needs optimization)

AI Recommendations:
• Reroute Truck #6 via Highway 401 (save 15 minutes)
• Combine deliveries for Trucks #9 and #11 (reduce 1 vehicle)
• Avoid downtown core 2-4 PM (peak traffic)

Potential Savings: 2.5 hours daily, $450/week in fuel`,
    followUps: ['Apply suggested route changes', 'View real-time traffic updates', 'Historical route performance']
  },
  {
    keywords: ['drivers', 'performance', 'safety', 'behavior'],
    response: `Driver performance and safety analysis:

👥 Active Drivers: 15 drivers currently on duty
⭐ Safety Score: 94% fleet average (excellent)
🏆 Top Performer: Driver Smith - 98% safety rating

Performance Metrics:
• Average driving score: 87/100
• Hard braking incidents: 3 this week (down 40%)
• Speeding violations: 1 minor incident
• Fuel-efficient driving: 82% adherence

Recognition:
• Driver Johnson: 30 days accident-free
• Driver Williams: Best fuel efficiency this month
• Driver Davis: Highest customer ratings

Training Opportunities: 2 drivers could benefit from eco-driving course`,
    followUps: ['View individual driver reports', 'Schedule driver training', 'Set up safety incentives']
  },
  {
    keywords: ['costs', 'expenses', 'budget', 'financial'],
    response: `Fleet financial overview and cost analysis:

💰 Daily Operating Cost: $3,240
📈 Monthly Projection: $97,200 (8% under budget)
⛽ Fuel: 38% of total costs
🔧 Maintenance: 22% of total costs

Cost Breakdown:
• Fuel: $1,235/day
• Maintenance: $714/day  
• Insurance: $425/day
• Driver wages: $866/day

Savings This Month:
• Route optimization: $1,200 saved
• Preventive maintenance: $800 saved
• Fuel efficiency programs: $650 saved

Budget Status: 8% under monthly budget ($7,800 savings)`,
    followUps: ['View detailed expense report', 'Compare with previous months', 'Set cost reduction targets']
  },
  {
    keywords: ['alerts', 'notifications', 'issues', 'problems'],
    response: `Current fleet alerts and notifications:

🟢 System Status: All critical systems operational
⚠️ Active Alerts: 3 medium priority items
🔴 Critical Issues: None

Recent Alerts:
• Truck #7: GPS signal weak (resolved 15 min ago)
• Truck #12: Scheduled maintenance reminder
• Driver Martinez: Speed limit exceeded briefly

Preventive Alerts:
• Weather warning: Rain expected 3-5 PM
• Route B: Construction starts Monday
• Fuel prices rising 3% next week

All alerts are being monitored and addressed promptly`,
    followUps: ['View alert history', 'Configure alert preferences', 'Set up emergency notifications']
  },
  {
    keywords: ['weather', 'conditions', 'traffic', 'external'],
    response: `Weather and external conditions impact:

🌤️ Current Weather: Partly cloudy, 22°C
🌧️ Forecast: Light rain expected 3-5 PM
💨 Wind: 15 km/h (minimal impact on fuel)

Traffic Conditions:
• Downtown: Heavy congestion
• Highway 401: Moderate traffic
• Industrial routes: Clear

Impact on Operations:
• Rain may slow deliveries by 10-15%
• Route A affected by downtown traffic
• All drivers notified of weather changes

Recommendations:
• Prioritize morning deliveries
• Use covered loading for afternoon routes
• Monitor road conditions closely`,
    followUps: ['View extended weather forecast', 'Check traffic patterns', 'Adjust delivery schedules']
  },
  {
    keywords: ['general', 'help', 'overview', 'status'],
    response: `Welcome! Here's your fleet overview:

🚛 Fleet Status: 20 vehicles total
✅ Operational: 18 vehicles active
🔧 Maintenance: 2 vehicles in service

Today's Highlights:
• 847 km traveled across all vehicles
• 89% on-time delivery rate
• $3,240 total operating costs
• Zero safety incidents

Key Metrics:
• Average speed: 65 km/h
• Fuel efficiency: 6.2 km/L
• Driver satisfaction: 94%
• Customer rating: 4.7/5

System Status: All tracking and monitoring systems online and functioning perfectly`,
    followUps: ['View detailed fleet analytics', 'Check individual vehicle status', 'Review performance trends']
  }
];

export const exampleQuestions: ExampleQuestion[] = [
  {
    id: 1,
    question: "Which vehicles are currently active, idling, or stopped?",
    icon: TrendingUp,
    category: "Live Status"
  },
  {
    id: 2,
    question: "Show me fuel consumption trend over the last 30 days",
    icon: Zap,
    category: "Fuel Analytics"
  },
  {
    id: 3,
    question: "Which vehicles have the most safety events?",
    icon: Shield,
    category: "Safety"
  },
  {
    id: 4,
    question: "What is the fleet utilization rate?",
    icon: Brain,
    category: "Efficiency"
  },
  {
    id: 5,
    question: "Where are my vehicles located right now?",
    icon: MessageSquare,
    category: "Location"
  }
];

export const aiCapabilities: AiCapability[] = [
  {
    icon: Brain,
    title: "Predictive Analytics",
    description: "AI-powered fleet forecasting"
  },
  {
    icon: TrendingUp,
    title: "Route Optimization",
    description: "Smart delivery planning"
  },
  {
    icon: Shield,
    title: "Maintenance Alerts",
    description: "Proactive service scheduling"
  },
  {
    icon: Zap,
    title: "Real-time Insights",
    description: "Live fleet monitoring"
  }
];
