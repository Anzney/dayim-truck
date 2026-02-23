"use client"
import React from 'react'
import { Bell, X, Check, TriangleAlert } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { useNotification, Alert } from '../context/notification-context'

const NotificationPopover = () => {
  const {
    alerts,
    unreadCount,
    isNotificationCenterOpen,
    markAsRead,
    markAllAsRead,
    closeNotificationCenter,
    setIsNotificationCenterOpen
  } = useNotification()

  return (
    <Popover open={isNotificationCenterOpen} onOpenChange={setIsNotificationCenterOpen}>
      <PopoverTrigger asChild>
        <div className='border rounded-2xl flex items-center gap-2 p-0.5 cursor-pointer relative'>
          <div className='p-1.5 border rounded-full relative'>
            <Bell className='size-4' />
            {unreadCount > 0 && (
              <div className='absolute -top-[1px] -right-[1px] w-2 h-2 bg-destructive rounded-full flex items-center justify-center' />
            )}
          </div>
          <p className='text-sm pr-2'>
            {unreadCount > 0 ? `${unreadCount} Alert${unreadCount > 1 ? 's' : ''}` : 'No Alerts'}
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <TriangleAlert className="size-5 text-destructive" />
              <h3 className="font-semibold text-lg">AI Generated Alerts</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeNotificationCenter}
              className="h-8 w-8"
            >
              <X className="size-4" />
            </Button>
          </div>

          {/* Alerts List */}
          <div className="max-h-80 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <Bell className="size-8 mx-auto mb-2 opacity-50" />
                <p>No alerts at the moment</p>
              </div>
            ) : (
              <div className="p-2">
                {alerts.map((alert: Alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 mb-2 rounded-lg border transition-colors ${alert.read
                      ? 'border-border bg-muted/30'
                      : 'border-destructive/40 bg-destructive/5'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className={`text-sm ${alert.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                          {alert.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {!alert.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => markAsRead(alert.id)}
                          className="h-6 w-6 shrink-0"
                        >
                          <Check className="size-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {alerts.length > 0 && unreadCount > 0 && (
            <div className="p-3 border-t bg-gray-50/50 dark:bg-gray-800/50">
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                className="w-full"
              >
                <Check className="size-4 mr-2" />
                Mark All as Read
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default NotificationPopover
