'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const TicketHistoryTable = ({ tickets, getStatusColor, getPriorityColor }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ticket History</CardTitle>
        <CardDescription>View and manage all support tickets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.createdDate}</TableCell>
                  <TableCell>{ticket.assignedTo}</TableCell>
                  <TableCell>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="details">
                        <AccordionTrigger className="text-sm">
                          View Details
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="p-4 bg-muted rounded-md">
                            <p className="text-sm text-muted-foreground mb-2">
                              <strong>Description:</strong>
                            </p>
                            <p className="text-sm">{ticket.description}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default TicketHistoryTable
