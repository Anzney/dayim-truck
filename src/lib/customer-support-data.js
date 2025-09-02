// Mock data for tickets
export const mockTickets = [
  {
    id: 'TKT-001',
    category: 'Bug',
    status: 'Open',
    description: 'Dashboard not loading properly on mobile devices',
    createdDate: '2024-01-15',
    priority: 'High',
    assignedTo: 'Support Team'
  },
  {
    id: 'TKT-002',
    category: 'Billing',
    status: 'In-Progress',
    description: 'Invoice discrepancy for January 2024',
    createdDate: '2024-01-14',
    priority: 'Medium',
    assignedTo: 'Billing Team'
  },
  {
    id: 'TKT-003',
    category: 'Feature Request',
    status: 'Closed',
    description: 'Add dark mode to the application',
    createdDate: '2024-01-10',
    priority: 'Low',
    assignedTo: 'Development Team'
  },
  {
    id: 'TKT-004',
    category: 'Other',
    status: 'Open',
    description: 'General inquiry about new features',
    createdDate: '2024-01-16',
    priority: 'Low',
    assignedTo: 'Support Team'
  }
]

// Mock data for analytics
export const ticketStatusData = [
  { name: 'Open', value: 5, color: '#ef4444' },
  { name: 'In-Progress', value: 3, color: '#f59e0b' },
  { name: 'Closed', value: 7, color: '#10b981' }
]

export const ticketCategoryData = [
  { category: 'Bug', count: 8 },
  { category: 'Billing', count: 5 },
  { category: 'Feature Request', count: 12 },
  { category: 'Other', count: 3 }
]

// Utility functions for styling
export const getStatusColor = (status) => {
  switch (status) {
    case 'Open':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    case 'In-Progress':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'Closed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'Low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

// Generate unique ticket ID
export const generateTicketId = () => {
  return `TKT-${Date.now().toString().slice(-3)}`
}
