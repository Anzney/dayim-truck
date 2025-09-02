"use client"
import React, { useState, useEffect, useRef } from 'react'
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

// Dummy AI responses for demonstration
const dummyFleetResponses = [
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

const page = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [chatStarted, setChatStarted] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [followUpQuestions, setFollowUpQuestions] = useState([])
  const [showInsights, setShowInsights] = useState(false)
  const [currentTypingMessage, setCurrentTypingMessage] = useState(null)
  const [typingText, setTypingText] = useState('')
  const { alerts } = useNotification()
  
  // Ref for auto-scrolling chat messages
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when messages change or loading state changes
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    
    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100)
    
    return () => clearTimeout(timeoutId)
  }, [messages, isLoading, currentTypingMessage])

  // Function to find best matching dummy response
  const findBestResponse = (question) => {
    const questionLower = question.toLowerCase()
    
    // Find response with most keyword matches
    let bestMatch = dummyFleetResponses[dummyFleetResponses.length - 1] // default to general response
    let maxMatches = 0
    
    for (const response of dummyFleetResponses) {
      const matches = response.keywords.filter(keyword => 
        questionLower.includes(keyword.toLowerCase())
      ).length
      
      if (matches > maxMatches) {
        maxMatches = matches
        bestMatch = response
      }
    }
    
    return bestMatch
  }

  // Typewriter effect for AI responses
  const typeWriterEffect = (fullText, messageId) => {
    let currentIndex = 0
    setTypingText('')
    setCurrentTypingMessage(messageId)
    
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypingText(prev => fullText.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typeInterval)
        setCurrentTypingMessage(null)
        setTypingText('')
        // Add the complete message to messages
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, content: fullText, isTyping: false }
            : msg
        ))
      }
    }, 30) // Adjust speed here (lower = faster)
    
    return () => clearInterval(typeInterval)
  }

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

    try {
      // Show "Thinking..." for 3 seconds
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Find best matching response
      const bestResponse = findBestResponse(messageText)
      
      // Create AI message with typing indicator
      const aiMessageId = Date.now() + 1
      const aiMessage = {
        id: aiMessageId,
        type: 'ai',
        content: '',
        timestamp: new Date(),
        isTyping: true
      }
      
      setIsLoading(false)
      setMessages(prev => [...prev, aiMessage])
      setFollowUpQuestions(bestResponse.followUps)
      
      // Start typewriter effect
      typeWriterEffect(bestResponse.response, aiMessageId)
      
    } catch (error) {
      console.error('Error in sendMessage:', error)
      const errorResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
      setIsLoading(false)
    }
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

  const handleFollowUpClick = (followUpQuestion) => {
    sendMessage(followUpQuestion)
  }

  const handleShowInsights = () => {
    setShowInsights(true)
    setChatStarted(false) // Reset chat state to show insights instead
  }



  return (
    <div className='p-4 pb-4 flex gap-4 dark:bg-black'>
      
        <KpiHeaderCards />
        {/* <div className="grid grid-cols-2 gap-4">
          <div className='border rounded-2xl p-3 min-h-[24vh] h-[29.5vh] flex flex-col col-span-2 dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl'>
            <div className='flex items-center justify-between pb-3 mb-1 border-b flex-shrink-0'>
              <div>
                <h2 className='font-bold text-lg tracking-tight flex items-center gap-2'>
                  <Lightbulb className='text-amber-400' />
                  AI Insights
                </h2>
               
              </div>
            </div>

            <div className='flex flex-col gap-2 overflow-y-auto flex-1 min-h-0'>
              {
                aiInsights.map((item) => {
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
            </div>
            
            <div className='mt-1 pt-3 border-t text-center flex-shrink-0'>
              <p className='text-xs text-muted-foreground'>
                Showing {aiInsights.length} insights available
              </p>
            </div>
          </div>
        </div> */}
      <div className="w-1/3">
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
                    DayimGPT
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
              {showInsights ? (
                /* AI Insights Display */
                <div className='space-y-3'>
                  <div className='flex items-center justify-between pb-2 border-b'>
                    <div className='flex items-center gap-2'>
                      <Lightbulb className='size-4 text-amber-500' />
                      <h3 className='text-sm font-semibold'>Today's AI Insights</h3>
                    </div>
                    <button 
                      onClick={() => setShowInsights(false)}
                      className='text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    >
                      Back to chat
                    </button>
                  </div>
                  
                  <div className='space-y-3'>
                    {aiInsights.map((insight) => (
                      <div key={insight.id} className='flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-neutral-800 border'>
                        <CircleCheck className='size-4 shrink-0 text-green-500 mt-0.5' />
                        <div className='flex-1'>
                          <p className='text-sm text-gray-900 dark:text-gray-100'>
                            {insight.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className='mt-4 p-3 bg-blue-50 dark:bg-blue-400/20 rounded-lg border border-blue-200 dark:border-blue-200/20'>
                    <p className='text-xs text-blue-700 dark:text-blue-200'>
                      💡 These insights are generated from your fleet's real-time data and help optimize operations, reduce costs, and improve efficiency.
                    </p>
                  </div>
                </div>
              ) : !chatStarted ? (
                <div className='space-y-3'>
                  {/* AI Capabilities */}
                  {/* <div className='grid grid-cols-2 gap-2'>
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
                  </div> */}

                  {/* AI Insights */}
                  <div 
                    onClick={handleShowInsights}
                    className='bg-blue-50 cursor-pointer dark:bg-blue-400/20 rounded-lg p-2 border border-blue-200 dark:border-blue-200/20 hover:bg-blue-100 dark:hover:bg-blue-400/30 transition-colors'
                  >
                    <div className='flex items-center gap-2'>
                      <Sparkles className='size-3 text-blue-600 dark:text-blue-200' />
                      <h3 className='text-xs font-semibold text-blue-800 dark:text-blue-200'>Today's AI Insights</h3>
                    </div>
                    <p className='text-xs text-blue-700 dark:text-blue-200 mt-1'>
                      Click here to get today's fleet-related insights.
                    </p>
                  </div>

                  {/* Example Questions */}
                  <div className='space-y-2 mt-50'>
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
                            {message.type === 'ai' && currentTypingMessage === message.id 
                              ? typingText + '|' 
                              : message.content
                            }
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
                            <p className='text-sm text-gray-600 dark:text-gray-400'>Thinking...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Follow-up Questions */}
                  {followUpQuestions.length > 0 && !isLoading && (
                    <div className='mt-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <Lightbulb className='size-3 text-amber-500' />
                        <h3 className='text-xs font-semibold text-gray-700 dark:text-gray-300'>Suggested follow-up questions:</h3>
                      </div>
                      <div className='flex flex-wrap gap-2'>
                        {followUpQuestions.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleFollowUpClick(question)}
                            className='px-3 py-1.5 rounded-full text-xs border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all duration-200'
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Invisible element for auto-scroll */}
                  <div ref={messagesEndRef} />
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