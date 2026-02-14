"use client"
import React, { useState, useEffect, useRef } from 'react'
import KpiHeaderCards from '../../components/dashboard/kpi-header-cards'
import FleetMaintenance from '../../components/dashboard/fleet-maintenance'
import VehicleOffRoadUpdates from '../../components/dashboard/vehicle-off-road-updates'
import { BotMessageSquare, Send, Lightbulb, CircleCheck, Sparkles, TrendingUp, Shield, Zap, Brain, MessageSquare, User, Loader } from 'lucide-react'
import { Input } from "../../components/ui/input"
import { Button } from '../../components/ui/button'
import { useNotification } from '../../context/notification-context'
import { aiInsights, dummyFleetResponses, exampleQuestions } from '@/data/dashboard'
import { ExampleQuestion, Message, DummyFleetResponse } from '@/types/dashboard'

const DashboardPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<ExampleQuestion | null>(null)
  const [chatStarted, setChatStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([])
  const [showInsights, setShowInsights] = useState(false)
  const [currentTypingMessage, setCurrentTypingMessage] = useState<number | null>(null)
  const [typingText, setTypingText] = useState('')
  const { alerts } = useNotification()

  // Ref for auto-scrolling chat messages
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
  const findBestResponse = (question: string): DummyFleetResponse => {
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
  const typeWriterEffect = (fullText: string, messageId: number) => {
    let currentIndex = 0
    setTypingText('')
    setCurrentTypingMessage(messageId)

    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypingText(fullText.substring(0, currentIndex + 1))
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

  const handleQuestionClick = (question: ExampleQuestion) => {
    setSelectedQuestion(question)
    startChat(question.question)
  }

  const startChat = (question: string) => {
    setChatStarted(true)
    setMessages([])
    sendMessage(question)
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return

    // Add user message
    const userMessage: Message = {
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
      const aiMessage: Message = {
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
      const errorResponse: Message = {
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFollowUpClick = (followUpQuestion: string) => {
    sendMessage(followUpQuestion)
  }

  const handleShowInsights = () => {
    setShowInsights(true)
    setChatStarted(false) // Reset chat state to show insights instead
  }

  return (
    <div className='p-4 pb-4 flex gap-4 dark:bg-black'>
      <KpiHeaderCards />
      <div className="w-1/3">
        <div className='min-h-[80vh] w-full'>
          <div className='border rounded-2xl h-[87vh] flex flex-col w-full dark:bg-gradient-to-br dark:from-neutral-700/30 dark:to-neutral-800/40 dark:backdrop-blur-2xl'>
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
                          className={`px-3 py-1.5 rounded-full text-xs border transition-all duration-200 ${selectedQuestion?.id === item.id
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-neutral-800'
                            }`}
                        >
                          {item.question}
                        </button>
                      ))}
                    </div>
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
                        className={`flex items-start gap-2 max-w-[80%] min-w-[200px] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}
                      >
                        <div className={`p-2 rounded-full ${message.type === 'user'
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
                          className={`p-3 rounded-lg ${message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-50 dark:bg-neutral-800 border'
                            }`}
                        >
                          <p className={`text-sm whitespace-pre-line ${message.type === 'user' ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                            }`}>
                            {message.type === 'ai' && currentTypingMessage === message.id
                              ? typingText + '|'
                              : message.content
                            }
                          </p>
                          <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
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
                  onKeyDown={handleKeyPress}
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

export default DashboardPage
