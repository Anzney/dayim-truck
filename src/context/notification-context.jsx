"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

const alertCards = [
  {
    id: 1,
    title: "Truck #12 showing abnormal temperature rise — cargo spoilage risk.",
    timestamp: new Date().toISOString(),
    read: false
  },
  {
    id: 2,
    title: "Predictive model flags Truck #7 for engine failure within 5 days.",
    timestamp: new Date().toISOString(),
    read: false
  },
  {
    id: 3,
    title: "Unusual fuel drop detected in Truck #19 — investigate possible leakage.",
    timestamp: new Date().toISOString(),
    read: false
  },
  {
    id: 4,
    title: "Brake wear alert: Truck #5 requires maintenance in next 200 km.",
    timestamp: new Date().toISOString(),
    read: false
  }
]

export const NotificationProvider = ({ children }) => {
  const [alerts, setAlerts] = useState(alertCards)
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false)
  const [hasSeenNotifications, setHasSeenNotifications] = useState(false)

  // Check if user has seen notifications before
  useEffect(() => {
    const seen = localStorage.getItem('hasSeenNotifications')
    setHasSeenNotifications(seen === 'true')
  }, [])

  // Auto-open notification center on first visit if there are unread alerts
  useEffect(() => {
    const unreadAlerts = alerts.filter(alert => !alert.read)
    if (unreadAlerts.length > 0 && !hasSeenNotifications) {
      setIsNotificationCenterOpen(true)
    }
  }, [alerts, hasSeenNotifications])

  const markAsRead = (alertId) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    )
  }

  const markAllAsRead = () => {
    setAlerts(prev => 
      prev.map(alert => ({ ...alert, read: true }))
    )
  }

  const closeNotificationCenter = () => {
    setIsNotificationCenterOpen(false)
    setHasSeenNotifications(true)
    localStorage.setItem('hasSeenNotifications', 'true')
  }

  const openNotificationCenter = () => {
    setIsNotificationCenterOpen(true)
  }

  const unreadCount = alerts.filter(alert => !alert.read).length

  const value = {
    alerts,
    unreadCount,
    isNotificationCenterOpen,
    hasSeenNotifications,
    markAsRead,
    markAllAsRead,
    closeNotificationCenter,
    openNotificationCenter,
    setIsNotificationCenterOpen
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}


