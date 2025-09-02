'use client'

import React, { useState } from 'react'
import PageHeader from '@/components/customer-support/page-header'
import TicketCreationForm from '@/components/customer-support/ticket-creation-form'
import TicketAnalytics from '@/components/customer-support/ticket-analytics'
import TicketHistoryTable from '@/components/customer-support/ticket-history-table'
import NotificationToast from '@/components/customer-support/notification-toast'
import { 
  mockTickets, 
  ticketStatusData, 
  ticketCategoryData, 
  getStatusColor, 
  getPriorityColor,
  generateTicketId 
} from '@/lib/customer-support-data'

export default function CustomerSupportPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleFormSubmit = (data) => {
    // Simulate form submission
    console.log('Form data:', data)
    console.log('Selected file:', selectedFile)
    
    // Show success toast
    const ticketId = generateTicketId()
    setToastMessage(`Ticket created successfully! Ticket ID: ${ticketId}`)
    setShowToast(true)
    
    // Hide toast after 5 seconds
    setTimeout(() => setShowToast(false), 5000)
    
    // Reset file selection
    setSelectedFile(null)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Toast Notification */}
      <NotificationToast 
        show={showToast} 
        message={toastMessage} 
        onClose={() => setShowToast(false)} 
      />
      
      {/* Header */}
      <PageHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create New Ticket Section */}
        <div className="lg:col-span-1">
          <TicketCreationForm 
            onSubmit={handleFormSubmit}
            onFileChange={handleFileChange}
            selectedFile={selectedFile}
          />
        </div>

        {/* Analytics Section */}
        <div className="lg:col-span-2">
          <TicketAnalytics 
            ticketStatusData={ticketStatusData}
            ticketCategoryData={ticketCategoryData}
          />
        </div>
      </div>

      {/* Ticket History Section */}
      <TicketHistoryTable 
        tickets={mockTickets}
        getStatusColor={getStatusColor}
        getPriorityColor={getPriorityColor}
      />
    </div>
  )
}
