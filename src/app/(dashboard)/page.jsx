"use client"
import React, { useState } from 'react'
import KpiHeaderCards from '../../components/dashboard/kpi-header-cards'
import FleetMaintenance from '../../components/dashboard/fleet-maintenance'
import VehicleOffRoadUpdates from '../../components/dashboard/vehicle-off-road-updates'
import { BotMessageSquare, Maximize2, Send, TriangleAlert, Lightbulb, CircleCheck, Sparkles, TrendingUp, Shield, Zap, Brain, MessageSquare, User, Loader } from 'lucide-react'
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

// Mock AI response function - in real implementation, this would call your API
const generateAIResponse = (question) => {
  const responses = {
    "Which vehicles are currently active, idling, or stopped?": "Based on real-time data, I can see:\n\n• **Active Vehicles**: 8 vehicles currently in motion\n• **Idling Vehicles**: 3 vehicles (IDs: V-001, V-005, V-012) with echoIdlingevent > 0\n• **Stopped Vehicles**: 2 vehicles (IDs: V-003, V-008) with distance unchanged for 2+ hours\n\n**Recommendation**: Consider reducing idling time to improve fuel efficiency.",
    "Show me fuel consumption trend over the last 30 days": "**Fuel Consumption Analysis (Last 30 Days):**\n\n• **Average fuelPerX**: 12.5 L/100km across fleet\n• **Most Efficient**: Vehicle V-007 (9.8 L/100km)\n• **Least Efficient**: Vehicle V-015 (16.2 L/100km)\n• **Trend**: 8% improvement in fuel efficiency compared to previous month\n\n**Insight**: Route optimization has reduced fuel consumption by 12% on long-haul trips.",
    "Which vehicles have the most safety events?": "**Safety Events Analysis:**\n\n**Harsh Braking Leaders:**\n• V-009: 15 events (needs driver training)\n• V-013: 12 events\n\n**Harsh Acceleration:**\n• V-006: 8 events\n• V-011: 7 events\n\n**Idling Events:**\n• V-001: 23 excessive idling instances\n• V-005: 18 instances\n\n**Recommendation**: Schedule safety training for drivers of V-009 and V-006.",
    "What is the fleet utilization rate?": "**Fleet Utilization Analysis:**\n\n• **Average Weight Factor**: 0.78 (78% capacity utilization)\n• **Distance Efficiency**: 92% of vehicles operating at optimal capacity\n• **Load Distribution**: Well-balanced across fleet\n\n**Top Performers:**\n• V-004: 94% utilization\n• V-008: 91% utilization\n\n**Areas for Improvement:**\n• V-012: 65% utilization (under-utilized)\n• V-015: 58% utilization (needs route optimization)",
    "Where are my vehicles located right now?": "**Current Vehicle Locations:**\n\n• **V-001**: 24.7136°N, 46.6753°E (Riyadh - Active)\n• **V-002**: 21.2703°N, -157.8083°W (Jeddah - In Transit)\n• **V-003**: 26.4207°N, 50.0888°E (Dammam - Stopped)\n• **V-004**: 24.7136°N, 46.6753°E (Riyadh - Loading)\n• **V-005**: 21.2703°N, -157.8083°W (Jeddah - Idling)\n\n**Map View**: All vehicles are within operational zones with good GPS signal strength."
  }
  
  return responses[question] || "I'm analyzing your fleet data to provide insights. Please allow me a moment to process the current information and provide you with detailed analytics based on the available vehicle metrics including fuel consumption, safety events, and utilization rates."
}

const page = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showAllInsights, setShowAllInsights] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { alerts } = useNotification()

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question)
    startChat(question.question)
  }

  const startChat = (question) => {
    setChatStarted(true)
    setMessages([])
    sendMessage(question)
  }

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(messageText),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!chatStarted) {
      startChat(inputValue)
    } else {
      sendMessage(inputValue)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
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
        <div className='border max-h-[34vh] h-[32.5vh] rounded-2xl p-3 overflow-y-scroll col-span-2 dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl'>
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
              <div className='text-center py-3 mt-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800/50 rounded-lg transition-colors' onClick={handleShowAllInsights}>
                <p className='text-xs text-muted-foreground hover:text-foreground transition-colors'>
                  +{aiInsights.length - 3} more insights available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/3 flex-shrink-0">
        <div className='min-h-[80vh] w-full'>
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
            <div className='flex-1 p-3 overflow-y-auto min-w-0'>
              {!chatStarted ? (
                <div className='space-y-3'>
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
              ) : (
                /* Chat Messages */
                <div className='space-y-4 min-h-[200px]'>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-start gap-2 max-w-[80%] min-w-[200px] ${
                          message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <div className={`p-2 rounded-full ${
                          message.type === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 dark:bg-neutral-700'
                        }`}>
                          {message.type === 'user' ? (
                            <User className='size-4' />
                          ) : (
                            <BotMessageSquare className='size-4' />
                          )}
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-50 dark:bg-neutral-800 border'
                          }`}
                        >
                          <p className={`text-sm whitespace-pre-line ${
                            message.type === 'user' ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                          }`}>
                            {message.content}
                          </p>
                          <p className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className='flex justify-start'>
                      <div className='flex items-start gap-2 min-w-[200px]'>
                        <div className='p-2 rounded-full bg-gray-100 dark:bg-neutral-700'>
                          <BotMessageSquare className='size-4' />
                        </div>
                        <div className='bg-gray-50 dark:bg-neutral-800 border p-3 rounded-lg min-w-[180px]'>
                          <div className='flex items-center gap-2'>
                            <Loader className='size-4 animate-spin' />
                            <p className='text-sm text-gray-600 dark:text-gray-400'>Analyzing fleet data...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className='p-3 border-t'>
              <div className='flex items-center gap-2'>
                <Input 
                  type="text"
                  placeholder={chatStarted ? "Ask me anything about your fleet..." : "Ask me anything about your fleet..."}
                  className='flex-1'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <Button 
                  size="icon" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className='size-4 text-white' />
                </Button>
              </div>
              {selectedQuestion && !chatStarted && (
                <p className='text-xs text-muted-foreground mt-1 flex items-center gap-1'>
                  <Sparkles className='size-3' />
                  Selected: {selectedQuestion.question}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page