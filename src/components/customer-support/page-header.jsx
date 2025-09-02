'use client'

import React from 'react'
import { MessageSquare } from 'lucide-react'

const PageHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <MessageSquare className="h-8 w-8 text-primary" />
      <div>
        <h1 className="text-3xl font-bold">Customer Support</h1>
        <p className="text-muted-foreground">Get help and submit support tickets</p>
      </div>
    </div>
  )
}

export default PageHeader
