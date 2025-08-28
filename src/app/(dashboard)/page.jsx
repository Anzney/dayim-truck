"use client"
import React, { useState } from 'react'
import KpiHeaderCards from '../../components/dashboard/kpi-header-cards'
import FleetMaintenance from '../../components/dashboard/fleet-maintenance'
import VehicleOffRoadUpdates from '../../components/dashboard/vehicle-off-road-updates'
import { BotMessageSquare, Maximize2, Send, TriangleAlert, Lightbulb, CircleCheck, Sparkles, TrendingUp, Shield, Zap, Brain, MessageSquare, User } from 'lucide-react'
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

// Advanced AI Fleet Analysis Engine
class FleetAI {
  constructor() {
    this.cache = new Map()
    this.cacheTimeout = 30000 // 30 seconds
  }

  // Analyze fleet performance patterns
  analyzeFleetPatterns(liveData) {
    if (!liveData || liveData.length === 0) {
      return { error: "No fleet data available" }
    }

    const analysis = {
      totalVehicles: liveData.length,
      activeVehicles: liveData.filter(v => parseFloat(v.speed) > 0).length,
      idlingVehicles: liveData.filter(v => parseFloat(v.speed) === 0 && v.ignition === "1").length,
      stoppedVehicles: liveData.filter(v => parseFloat(v.speed) === 0 && v.ignition === "0").length,
      vehiclesWithGPS: liveData.filter(v => v.latitude && v.longitude).length,
      averageSpeed: 0,
      speedDistribution: { low: 0, moderate: 0, high: 0 },
      operationalEfficiency: 0,
      safetyScore: 0,
      fuelEfficiency: 0,
      locationCoverage: 0,
      anomalies: [],
      recommendations: []
    }

    // Calculate average speed
    const movingVehicles = liveData.filter(v => parseFloat(v.speed) > 0)
    if (movingVehicles.length > 0) {
      analysis.averageSpeed = movingVehicles.reduce((sum, v) => sum + parseFloat(v.speed), 0) / movingVehicles.length
    }

    // Speed distribution analysis
    const speeds = movingVehicles.map(v => parseFloat(v.speed))
    analysis.speedDistribution = {
      low: speeds.filter(s => s < 40).length,
      moderate: speeds.filter(s => s >= 40 && s <= 80).length,
      high: speeds.filter(s => s > 80).length
    }

    // Operational efficiency
    analysis.operationalEfficiency = ((analysis.activeVehicles + analysis.idlingVehicles) / analysis.totalVehicles) * 100

    // Safety score calculation
    const safetyFactors = {
      highSpeedPenalty: analysis.speedDistribution.high * 10,
      idlingPenalty: analysis.idlingVehicles * 5,
      gpsBonus: analysis.vehiclesWithGPS * 2
    }
    analysis.safetyScore = Math.max(0, 100 - safetyFactors.highSpeedPenalty - safetyFactors.idlingPenalty + safetyFactors.gpsBonus)

    // Location coverage
    analysis.locationCoverage = (analysis.vehiclesWithGPS / analysis.totalVehicles) * 100

    // Detect anomalies
    if (analysis.speedDistribution.high > analysis.totalVehicles * 0.3) {
      analysis.anomalies.push("High number of vehicles exceeding speed limits")
    }
    if (analysis.idlingVehicles > analysis.totalVehicles * 0.4) {
      analysis.anomalies.push("Excessive idling detected across fleet")
    }
    if (analysis.locationCoverage < 80) {
      analysis.anomalies.push("Poor GPS coverage affecting fleet visibility")
    }

    // Generate recommendations
    if (analysis.speedDistribution.high > 0) {
      analysis.recommendations.push("Implement speed monitoring and driver training for high-speed vehicles")
    }
    if (analysis.idlingVehicles > 2) {
      analysis.recommendations.push("Consider idling reduction policies to improve fuel efficiency")
    }
    if (analysis.operationalEfficiency < 70) {
      analysis.recommendations.push("Optimize route planning to increase fleet utilization")
    }

    return analysis
  }

  // Generate intelligent response based on question and data
  generateIntelligentResponse(question, liveData, historicalData = null) {
    const analysis = this.analyzeFleetPatterns(liveData)
    
    if (analysis.error) {
      return {
        response: "I cannot provide insights because no real fleet data is available from the API. Please check your fleet tracking system and ensure it's online.",
        followUpQuestions: ["Check fleet tracking system", "Verify API connectivity", "Try again later"]
      }
    }

    const questionLower = question.toLowerCase()
    let response = ""
    let followUpQuestions = []

    // Fleet Status Analysis
    if (questionLower.includes("active") || questionLower.includes("idling") || questionLower.includes("stopped")) {
      response = this.generateFleetStatusResponse(analysis, liveData)
      followUpQuestions = [
        "Show me the fuel consumption for idling vehicles",
        "Which vehicles have been stopped the longest?",
        "What's the average idling time across the fleet?"
      ]
    }
    // Fuel Analysis
    else if (questionLower.includes("fuel") || questionLower.includes("consumption")) {
      response = this.generateFuelAnalysisResponse(analysis, liveData, historicalData)
      followUpQuestions = [
        "Which vehicles are most fuel efficient?",
        "Show me fuel consumption by route",
        "What's the fuel cost per kilometer?"
      ]
    }
    // Safety Analysis
    else if (questionLower.includes("safety") || questionLower.includes("events")) {
      response = this.generateSafetyAnalysisResponse(analysis, liveData)
      followUpQuestions = [
        "Show me driver performance rankings",
        "Which routes have the most safety incidents?",
        "What's the safety trend over time?"
      ]
    }
    // Utilization Analysis
    else if (questionLower.includes("utilization") || questionLower.includes("rate")) {
      response = this.generateUtilizationResponse(analysis, liveData)
      followUpQuestions = [
        "Show me underutilized vehicles",
        "Which vehicles have the highest capacity usage?",
        "What's the optimal route for better utilization?"
      ]
    }
    // Location Analysis
    else if (questionLower.includes("location") || questionLower.includes("where")) {
      response = this.generateLocationResponse(analysis, liveData)
      followUpQuestions = [
        "Show me vehicles near specific locations",
        "Which vehicles are farthest from base?",
        "What's the average distance traveled today?"
      ]
    }
    // General Fleet Summary
    else {
      response = this.generateGeneralSummaryResponse(analysis, liveData)
      followUpQuestions = [
        "Show me fleet performance summary",
        "Which vehicles need maintenance attention?",
        "What's the cost analysis per vehicle?"
      ]
    }

    return { response, followUpQuestions }
  }

  generateFleetStatusResponse(analysis, liveData) {
    let response = `🚛 **Real-Time Fleet Status (from API)**\n\n`
    response += `*All data in this response is fetched from your live fleet tracking API*\n\n`
    
    response += `**Current Operations (Live Data)**:\n`
    response += `• ${analysis.activeVehicles} vehicles actively transporting (from API)\n`
    response += `• ${analysis.idlingVehicles} vehicles idling (from API)\n`
    response += `• ${analysis.stoppedVehicles} vehicles stopped (from API)\n\n`

    const efficiency = analysis.operationalEfficiency
    if (efficiency >= 80) {
      response += `🎯 **Excellent Performance**: Your fleet is operating at ${efficiency.toFixed(1)}% efficiency! This indicates strong operational management and good resource utilization.\n\n`
    } else if (efficiency >= 60) {
      response += `👍 **Good Performance**: Your fleet is operating at ${efficiency.toFixed(1)}% efficiency. This is within normal ranges for most operations.\n\n`
    } else {
      response += `📈 **Optimization Opportunity**: Your fleet is operating at ${efficiency.toFixed(1)}% efficiency. There's room for improvement through better planning.\n\n`
    }

    if (analysis.idlingVehicles > 0) {
      response += `⚠️ **Idling Alert**: ${analysis.idlingVehicles} vehicles are currently idling. This could be costing you fuel and reducing efficiency.\n\n`
    }

    if (analysis.anomalies.length > 0) {
      response += `🔍 **Key Insights**:\n`
      analysis.anomalies.forEach(anomaly => {
        response += `• ${anomaly}\n`
      })
      response += `\n`
    }

    if (analysis.recommendations.length > 0) {
      response += `💡 **Recommendations**:\n`
      analysis.recommendations.forEach(rec => {
        response += `• ${rec}\n`
      })
    }

    return response
  }

  generateFuelAnalysisResponse(analysis, liveData, historicalData) {
    let response = `⛽ **Fuel Efficiency Analysis**\n\n`
    response += `*All data in this response is fetched from your live and historical fleet tracking APIs*\n\n`
    
    const vehiclesWithWeight = liveData.filter(v => v.weight && parseFloat(v.weight) > 0)
    
    if (historicalData && historicalData.length > 0) {
      // Use real historical data for comprehensive fuel analysis
      const totalDistance = historicalData.reduce((sum, record) => sum + parseFloat(record.distance || 0), 0)
      const avgSpeed = historicalData.reduce((sum, record) => sum + parseFloat(record.speed || 0), 0) / historicalData.length
      const idlingTime = historicalData.filter(record => parseFloat(record.speed || 0) === 0).length
      
      response += `📊 **Real Historical Data Analysis (Last 24 Hours)**:\n`
      response += `• Total distance traveled: ${totalDistance.toFixed(0)} km (from API)\n`
      response += `• Average speed: ${avgSpeed.toFixed(1)} km/h (from API)\n`
      response += `• Idling instances: ${idlingTime} records (from API)\n`
      response += `• Data points analyzed: ${historicalData.length} (from API)\n\n`
      
      if (vehiclesWithWeight.length > 0) {
        const avgWeight = vehiclesWithWeight.reduce((sum, v) => sum + parseFloat(v.weight), 0) / vehiclesWithWeight.length
        response += `📦 **Current Load Status**:\n`
        response += `• Average load: ${avgWeight.toFixed(0)} kg\n`
        response += `• Vehicles with load data: ${vehiclesWithWeight.length}/${analysis.totalVehicles}\n\n`
      }
      
      // Calculate efficiency metrics
      const efficiencyRating = avgSpeed > 50 ? 'High' : avgSpeed > 30 ? 'Medium' : 'Low'
      const idlingPercentage = ((idlingTime / historicalData.length) * 100).toFixed(1)
      
      response += `🚛 **Efficiency Metrics**:\n`
      response += `• Speed efficiency: ${efficiencyRating}\n`
      response += `• Idling percentage: ${idlingPercentage}%\n`
      response += `• Distance efficiency: ${totalDistance > 1000 ? 'Excellent' : totalDistance > 500 ? 'Good' : 'Needs improvement'}\n\n`
      
      if (idlingPercentage > 20) {
        response += `⚠️ **Idling Alert**: ${idlingPercentage}% of your fleet time is spent idling. This significantly impacts fuel efficiency.\n\n`
      }
      
      response += `💡 **Historical Insights**: Based on the last 24 hours, your fleet shows ${efficiencyRating.toLowerCase()} efficiency patterns. Consider optimizing routes and reducing idling time for better fuel economy.`
      
    } else if (vehiclesWithWeight.length === 0) {
      response += `📊 **Current Status**: Fuel consumption data isn't available in the live feed, but I can analyze operational factors that affect fuel efficiency:\n\n`
      response += `**Fuel Efficiency Factors**:\n`
      response += `• Vehicle load weight\n`
      response += `• Driving patterns (speed, acceleration)\n`
      response += `• Route optimization\n`
      response += `• Vehicle maintenance status\n\n`
      response += `**Current Fleet Impact**:\n`
      response += `• Average speed: ${analysis.averageSpeed.toFixed(1)} km/h\n`
      response += `• High-speed vehicles: ${analysis.speedDistribution.high} (affects fuel consumption)\n`
      response += `• Idling vehicles: ${analysis.idlingVehicles} (wastes fuel)\n\n`
      response += `💡 **Recommendation**: To get detailed fuel consumption analysis, we'd need access to fuel sensors or historical fuel data.`
    } else {
      const avgWeight = vehiclesWithWeight.reduce((sum, v) => sum + parseFloat(v.weight), 0) / vehiclesWithWeight.length
      const maxWeight = Math.max(...vehiclesWithWeight.map(v => parseFloat(v.weight)))
      const efficiencyScore = (avgWeight / maxWeight * 100).toFixed(1)
      
      response += `📦 **Load Analysis**:\n`
      response += `• Average load: ${avgWeight.toFixed(0)} kg\n`
      response += `• Load efficiency: ${efficiencyScore}% of maximum capacity\n`
      response += `• Vehicles with load data: ${vehiclesWithWeight.length}/${analysis.totalVehicles}\n\n`
      
      response += `🚛 **Operational Impact**:\n`
      response += `• Average speed: ${analysis.averageSpeed.toFixed(1)} km/h\n`
      response += `• Speed distribution: ${analysis.speedDistribution.low} low, ${analysis.speedDistribution.moderate} moderate, ${analysis.speedDistribution.high} high\n\n`
      
      if (efficiencyScore > 80) {
        response += `✅ **Excellent Load Efficiency**: Your vehicles are well-utilized, which typically leads to better fuel efficiency per ton-km.\n\n`
      } else if (efficiencyScore > 60) {
        response += `👍 **Good Load Efficiency**: Your load distribution is reasonable, but there's room for optimization.\n\n`
      } else {
        response += `⚠️ **Load Optimization Needed**: Consider better load distribution to improve fuel efficiency.\n\n`
      }
      
      response += `💡 **Smart Tip**: Heavier loads consume more fuel but often have lower cost per ton-km. The key is finding the optimal balance.`
    }

    return response
  }

  generateSafetyAnalysisResponse(analysis, liveData) {
    let response = `🛡️ **Safety Performance Analysis**\n\n`
    
    response += `**Safety Score**: ${analysis.safetyScore.toFixed(0)}/100\n\n`
    
    if (analysis.safetyScore >= 90) {
      response += `🏆 **Excellent Safety Performance**: Your fleet is operating with outstanding safety standards!\n\n`
    } else if (analysis.safetyScore >= 80) {
      response += `✅ **Good Safety Performance**: Your fleet maintains good safety standards with room for minor improvements.\n\n`
    } else if (analysis.safetyScore >= 70) {
      response += `⚠️ **Acceptable Safety Performance**: Monitor high-speed vehicles and consider safety training.\n\n`
    } else {
      response += `🚨 **Safety Improvement Needed**: Consider reviewing speed policies and driver training programs.\n\n`
    }
    
    response += `**Speed Analysis**:\n`
    response += `• Low speed (<40 km/h): ${analysis.speedDistribution.low} vehicles\n`
    response += `• Moderate speed (40-80 km/h): ${analysis.speedDistribution.moderate} vehicles\n`
    response += `• High speed (>80 km/h): ${analysis.speedDistribution.high} vehicles\n\n`
    
    if (analysis.speedDistribution.high > 0) {
      response += `⚠️ **High-Speed Alert**: ${analysis.speedDistribution.high} vehicles are traveling at high speeds. Monitor for:\n`
      response += `• Harsh braking events\n`
      response += `• Fuel efficiency impact\n`
      response += `• Driver behavior patterns\n\n`
    }
    
    response += `**GPS Coverage**: ${analysis.locationCoverage.toFixed(1)}% of vehicles have active GPS tracking\n\n`
    
    if (analysis.anomalies.length > 0) {
      response += `🔍 **Safety Concerns**:\n`
      analysis.anomalies.forEach(anomaly => {
        if (anomaly.includes("speed") || anomaly.includes("safety")) {
          response += `• ${anomaly}\n`
        }
      })
      response += `\n`
    }
    
    response += `💡 **Proactive Safety**: Consider implementing speed alerts and driver coaching for consistent safety improvement.`
    
    return response
  }

  generateUtilizationResponse(analysis, liveData) {
    let response = `📊 **Fleet Utilization Analysis**\n\n`
    
    response += `**Current Utilization**: ${analysis.operationalEfficiency.toFixed(1)}%\n\n`
    
    if (analysis.operationalEfficiency >= 80) {
      response += `🎯 **Outstanding Utilization**: Your fleet is operating at excellent efficiency! This typically indicates:\n`
      response += `• Well-optimized routes\n`
      response += `• Effective demand planning\n`
      response += `• Strong operational management\n\n`
    } else if (analysis.operationalEfficiency >= 60) {
      response += `👍 **Healthy Utilization**: Your fleet is operating at a good utilization rate, showing balanced capacity and demand.\n\n`
    } else {
      response += `📈 **Optimization Opportunity**: Your utilization rate suggests room for improvement through:\n`
      response += `• Route optimization\n`
      response += `• Better demand forecasting\n`
      response += `• Improved driver scheduling\n\n`
    }
    
    response += `**Fleet Breakdown**:\n`
    response += `• Active vehicles: ${analysis.activeVehicles}/${analysis.totalVehicles}\n`
    response += `• Idling vehicles: ${analysis.idlingVehicles}/${analysis.totalVehicles}\n`
    response += `• Stopped vehicles: ${analysis.stoppedVehicles}/${analysis.totalVehicles}\n\n`
    
    if (analysis.idlingVehicles > 0) {
      const potentialImprovement = ((analysis.idlingVehicles / 2) / analysis.totalVehicles * 100).toFixed(1)
      response += `💡 **Quick Win**: Converting half of your ${analysis.idlingVehicles} idling vehicles to active operations could boost utilization by ${potentialImprovement}%.\n\n`
    }
    
    if (analysis.recommendations.length > 0) {
      response += `🔧 **Optimization Suggestions**:\n`
      analysis.recommendations.forEach(rec => {
        if (rec.includes("utilization") || rec.includes("route") || rec.includes("planning")) {
          response += `• ${rec}\n`
        }
      })
    }
    
    return response
  }

  generateLocationResponse(analysis, liveData) {
    let response = `📍 **Fleet Location Overview**\n\n`
    
    if (analysis.locationCoverage === 100) {
      response += `🎯 **Perfect GPS Coverage**: All ${analysis.totalVehicles} vehicles have active GPS tracking - excellent fleet visibility!\n\n`
    } else if (analysis.locationCoverage >= 80) {
      response += `✅ **Good GPS Coverage**: ${analysis.vehiclesWithGPS}/${analysis.totalVehicles} vehicles have active GPS tracking.\n\n`
    } else {
      response += `⚠️ **GPS Coverage Issue**: Only ${analysis.vehiclesWithGPS}/${analysis.totalVehicles} vehicles have GPS tracking. This affects fleet visibility.\n\n`
    }
    
    const movingVehicles = liveData.filter(v => parseFloat(v.speed) > 0)
    const stationaryVehicles = liveData.filter(v => parseFloat(v.speed) === 0)
    
    response += `**Current Distribution**:\n`
    response += `• 🚛 Moving: ${movingVehicles.length} vehicles actively transporting\n`
    response += `• 🛑 Stationary: ${stationaryVehicles.length} vehicles at stops or depots\n\n`
    
    if (movingVehicles.length > 0) {
      response += `**Active Operations**: Your moving vehicles are likely on delivery routes or returning to base, indicating good operational activity.\n\n`
    }
    
    response += `**Location Intelligence Benefits**:\n`
    response += `• Real-time route optimization\n`
    response += `• Reduced response times\n`
    response += `• Improved customer service\n`
    response += `• Dynamic route planning\n\n`
    
    response += `💡 **Recommendation**: Use this GPS data for dynamic route planning and real-time fleet optimization.`
    
    return response
  }

  generateGeneralSummaryResponse(analysis, liveData) {
    let response = `📋 **Real Fleet Performance Summary (from APIs)**\n\n`
    
    response += `**Fleet Overview (Live Data)**:\n`
    response += `• Total vehicles: ${analysis.totalVehicles} (from API)\n`
    response += `• Active operations: ${analysis.activeVehicles} (from API)\n`
    response += `• Idling: ${analysis.idlingVehicles} (from API)\n`
    response += `• Stopped: ${analysis.stoppedVehicles} (from API)\n\n`
    
    response += `**Performance Metrics (Calculated from API Data)**:\n`
    response += `• Operational efficiency: ${analysis.operationalEfficiency.toFixed(1)}% (calculated from API data)\n`
    response += `• Safety score: ${analysis.safetyScore.toFixed(0)}/100 (calculated from API data)\n`
    response += `• GPS coverage: ${analysis.locationCoverage.toFixed(1)}% (calculated from API data)\n`
    response += `• Average speed: ${analysis.averageSpeed.toFixed(1)} km/h (calculated from API data)\n\n`
    
    if (analysis.operationalEfficiency > 70) {
      response += `🎯 **Strong Performance**: Your fleet is operating efficiently with good resource utilization.\n\n`
    } else if (analysis.operationalEfficiency > 50) {
      response += `👍 **Good Performance**: Your fleet is operating within normal ranges with room for optimization.\n\n`
    } else {
      response += `📈 **Optimization Opportunity**: Consider improving operational efficiency through better planning.\n\n`
    }
    
    if (analysis.anomalies.length > 0) {
      response += `🔍 **Key Insights**:\n`
      analysis.anomalies.slice(0, 3).forEach(anomaly => {
        response += `• ${anomaly}\n`
      })
      response += `\n`
    }
    
    if (analysis.recommendations.length > 0) {
      response += `💡 **Top Recommendations**:\n`
      analysis.recommendations.slice(0, 3).forEach(rec => {
        response += `• ${rec}\n`
      })
    }
    
    return response
  }
}

// Initialize the AI engine
const fleetAI = new FleetAI()

// Enhanced AI response function - Always fetch real data from APIs
const generateAIResponse = async (question) => {
  try {
    console.log('🔍 Fetching live fleet data from API...')
    
    // ALWAYS fetch real-time data first
    const liveData = await liveDataAPI.getFormattedLiveData()
    console.log('📊 Live data received:', liveData.length, 'vehicles')
    
    if (!liveData || liveData.length === 0) {
      return {
        response: "I cannot provide insights at the moment because no live fleet data is available from the API. Please check your fleet tracking system and try again.",
        followUpQuestions: [
          "Check if fleet tracking is online",
          "Verify API connectivity",
          "Try again in a few moments"
        ]
      }
    }
    
    // ALWAYS fetch historical data for comprehensive analysis
    let historicalData = null
    try {
      console.log('📈 Fetching historical data from API...')
      // Get data for the last 1 day (API restriction) for a sample vehicle
      const sampleVehicle = liveData[0]
      if (sampleVehicle && sampleVehicle.vehicleNo) {
        const dateRange = historyDataAPI.createDateRangeForLastDays(1, sampleVehicle.vehicleNo)
        historicalData = await historyDataAPI.getFormattedHistoryData(dateRange)
        console.log('📈 Historical data received:', historicalData ? historicalData.length : 0, 'records')
      }
    } catch (error) {
      console.log("Historical data not available:", error.message)
      // Continue with live data only, but inform user
    }
    
    // Generate intelligent response using ONLY real API data
    console.log('🤖 Generating AI response based on real API data for:', question)
    const result = fleetAI.generateIntelligentResponse(question, liveData, historicalData)
    console.log('✅ AI response generated successfully from real data')
    
    return result
    
  } catch (error) {
    console.error('❌ Error accessing fleet data APIs:', error)
    return {
      response: "I cannot provide fleet insights right now because I'm unable to access the real fleet data from the APIs. This could be due to:\n\n• API connectivity issues\n• Authentication problems\n• Fleet tracking system being offline\n• Network connectivity issues\n\nPlease check your fleet tracking system and try again. I only provide insights based on real data from your APIs.",
      followUpQuestions: [
        "Check fleet tracking system status",
        "Verify API credentials",
        "Try again in a few moments"
      ]
    }
  }
}

const page = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showAllInsights, setShowAllInsights] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [followUpQuestions, setFollowUpQuestions] = useState([])
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

    try {
      // Get AI response with real data
      const { response, followUpQuestions: newFollowUps } = await generateAIResponse(messageText)
      
      // Add AI response
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: response,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setFollowUpQuestions(newFollowUps)
      setIsLoading(false)
      
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
            <div className='flex-1 p-3 overflow-y-auto'>
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
                <div className='space-y-4'>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-start gap-2 max-w-[80%] ${
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
                      <div className='flex items-start gap-2'>
                        <div className='p-2 rounded-full bg-gray-100 dark:bg-neutral-700'>
                          <BotMessageSquare className='size-4' />
                        </div>
                        <div className='bg-gray-50 dark:bg-neutral-800 border p-3 rounded-lg'>
                          <div className='flex items-center gap-2'>
                            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600'></div>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>Analyzing fleet data...</p>
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