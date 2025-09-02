'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useForm } from 'react-hook-form'
import { Plus, FileText } from 'lucide-react'

const TicketCreationForm = ({ onSubmit, onFileChange, selectedFile }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const handleFormSubmit = (data) => {
    onSubmit(data)
    reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Ticket
        </CardTitle>
        <CardDescription>
          Submit a new support ticket for assistance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select {...register('category')}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">Bug</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="feature-request">Feature Request</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...register('description', { required: 'Description is required' })}
              placeholder="Describe your issue or request..."
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachment">Attachment (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                onChange={onFileChange}
                className="cursor-pointer"
              />
              {selectedFile && (
                <Badge variant="secondary" className="text-xs">
                  {selectedFile.name}
                </Badge>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Submit Ticket
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default TicketCreationForm
