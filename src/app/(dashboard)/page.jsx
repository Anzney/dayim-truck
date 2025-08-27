"use client"
import React, { useState } from 'react'
import KpiHeaderCards from '../../components/dashboard/kpi-header-cards'
import FleetMaintenance from '../../components/dashboard/fleet-maintenance'
import VehicleOffRoadUpdates from '../../components/dashboard/vehicle-off-road-updates'
import { BotMessageSquare, Maximize2, Send, TriangleAlert, Lightbulb, CircleCheck, Sparkles, TrendingUp, Shield, Zap, Brain, MessageSquare } from 'lucide-react'
import { Input } from "../../components/ui/input"
import { Button } from '../../components/ui/button'
import { useNotification } from '../../context/notification-context'

const aiInsights = [
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
  // {
  //   id: 7,
  //   title: "Preventive servicing now can reduce downtime by 18% this month."
  // }
]

const exampleQuestions = [
  {
    id: 1,
    question: "How can I optimize fuel consumption?",
    icon: TrendingUp,
    category: "Optimization"
  },
  {
    id: 2,
    question: "Which trucks need maintenance soon?",
    icon: Shield,
    category: "Maintenance"
  },
  {
    id: 3,
    question: "Show me route efficiency analysis",
    icon: Zap,
    category: "Analytics"
  },
  {
    id: 4,
    question: "Predict fleet performance next week",
    icon: Brain,
    category: "Prediction"
  }
]

const aiCapabilities = [
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
]

const page = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showAllInsights, setShowAllInsights] = useState(false)
  const { alerts } = useNotification()

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question)
  }

  const handleShowAllInsights = () => {
    setShowAllInsights(true)
  }

  return (
    <div className='p-6 pb-4 flex gap-4'>
      <KpiHeaderCards />
      <div className="grid grid-cols-2 gap-4">
        <div className='col-span-2'>
          <VehicleOffRoadUpdates />
        </div>
        <div className='border max-h-[34vh] rounded-2xl p-3 overflow-y-scroll col-span-2 dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl'>
          <div className='flex items-center justify-between pb-2'>
            <h2 className='font-bold text-lg tracking-tight flex items-center gap-2 w-full'>
              <Lightbulb className='text-amber-400' />
              AI Generated Insights
            </h2>
          </div>
          <div className='flex flex-col gap-2'>
            {
              (showAllInsights ? aiInsights : aiInsights.slice(0, 3)).map((item) => {
                return (
                  <div className='flex items-center gap-2' key={item.id}>
                    <CircleCheck className='size-4 shrink-0 text-green-500'/>
                    <p className='tracking-tight rounded-lg dark:text-[#e2e2e2] text-[15px]'>
                      {item.title}
                    </p>
                  </div>
                )
              })
            }
            {!showAllInsights && aiInsights.length > 3 && (
              <div className='text-center py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800/50 rounded-lg transition-colors' onClick={handleShowAllInsights}>
                <p className='text-xs text-muted-foreground hover:text-foreground transition-colors'>
                  +{aiInsights.length - 3} more insights available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 max-w-1/3">
        <div className='min-h-[80vh] col-span-2 flex-1'>
          <div className='border rounded-2xl h-[87vh] flex flex-col w-full dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-netural-800/40 dark:backdrop-blur-2xl'>
            {/* Header */}
            <div className='flex items-center justify-between p-3 border-b'>
              <div className='flex items-center gap-2'>
                <div className='p-1.5 rounded-lg bg-blue-600'>
                  <BotMessageSquare className='size-4 text-white' />
                </div>
                <div>
                  <h2 className='font-bold text-lg tracking-tight'>
                    DayimGPT Assistant
                  </h2>
                  <p className='text-xs text-muted-foreground'>AI-powered fleet insights</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span className='text-xs font-medium text-green-700'>Online</span>
                </div>
                
              </div>
            </div>

            {/* Main Content Area */}
            <div className='flex-1 p-3 space-y-3 overflow-y-auto'>
              {/* AI Capabilities */}
              <div className='grid grid-cols-2 gap-2'>
                {aiCapabilities.map((capability, index) => (
                  <div key={index} className=' rounded-lg p-2 border'>
                    <div className='flex items-center gap-2'>
                      <div className='p-1 rounded bg-blue-600'>
                        <capability.icon className='size-3 text-white' />
                      </div>
                      <h3 className='text-xs font-semibold'>{capability.title}</h3>
                    </div>
                    <p className='text-xs text-muted-foreground mt-1'>{capability.description}</p>
                  </div>
                ))}
              </div>

              {/* Example Questions */}
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <MessageSquare className='size-3 text-blue-600' />
                  <h3 className='text-sm font-semibold'>Quick questions:</h3>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {exampleQuestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleQuestionClick(item)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition-all duration-200 ${
                        selectedQuestion?.id === item.id
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Status */}
              <div className='bg-blue-50 dark:bg-blue-400/20 rounded-lg p-2 border border-blue-200 dark:border-blue-200/20'>
                <div className='flex items-center gap-2'>
                  <Sparkles className='size-3 text-blue-600 dark:text-blue-200' />
                  <h3 className='text-xs font-semibold text-blue-800 dark:text-blue-200'>Ready to help</h3>
                </div>
                <p className='text-xs text-blue-700 dark:text-blue-200 mt-1'>
                  Ask me anything about your fleet operations
                </p>
              </div>
            </div>

            {/* Input Area */}
            <div className='p-3 border-t'>
              <div className='flex items-center gap-2'>
                <Input 
                  type="text"
                  placeholder="Ask me anything about your fleet..."
                  className='flex-1'
                  value={selectedQuestion?.question || ''}
                  onChange={(e) => setSelectedQuestion(null)}
                />
                <Button 
                  size="icon" 
                  className="bg-blue-600 hover:bg-blue-700" 
                >
                  <Send className='size-4 text-white' />
                </Button>
              </div>
              {selectedQuestion && (
                <p className='text-xs text-muted-foreground mt-1 flex items-center gap-1'>
                  <Sparkles className='size-3' />
                  Selected: {selectedQuestion.question}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <div className='flex'>
          <KpiHeaderCards />
        </div>
        <div className='grid grid-cols-4 gap-4 w-full'>

          <div className='max-h-[66vh] overflow-y-scroll col-span-2 col-start-3'>
            <FleetMaintenance />
          </div>
        </div>
      </div>
      <div className='min-h-[80vh] min-w-1/3 flex-1'>
        <div className='border rounded-2xl min-h-[87vh] flex flex-col w-full justify-between'>
          <div className='flex items-center justify-between p-3 border-b'>
            <h2 className='font-bold text-lg tracking-tight flex items-center gap-2 w-full'>
              <BotMessageSquare />
              DayimGPT Assistant
            </h2>
            <Maximize2 className='size-5' />
          </div>
          <div className='flex items-center gap-2 p-3 border-t'>
            <Input 
              type="text"
              placeholder="Ask me anything..."
            />
            <Button size="icon" className="bg-gradient-to-br from-sky-300 via-blue-500 to-purple-600" >
              <Send />
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default page