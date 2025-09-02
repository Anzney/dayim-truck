'use client'

import React from 'react'
import { CheckCircle } from 'lucide-react'

const NotificationToast = ({ show, message, onClose }) => {
  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5" />
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-green-700 hover:text-green-900 transition-colors"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default NotificationToast
