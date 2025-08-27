import React from 'react'
import { Button } from '../../../components/ui/button'
import { Send } from 'lucide-react'

const DayimGPT = () => {
  return (
    <div className='h-[calc(100vh-64px)] w-full flex items-center flex-col justify-center px-4'>
      <p className='text-4xl md:text-5xl   font-bold text-center'>Welcome to DayimGPT</p>

      <div className='w-full max-w-3xl mt-10'>
        <div className='border rounded-xl overflow-hidden bg-background/50'>
          <div className='p-4'>
            <textarea
              placeholder='Write a question'
              className='h-24 w-full resize-none bg-transparent outline-none text-base md:text-sm placeholder:text-muted-foreground'
            />
          </div>
          <div className='flex items-center justify-end border-t px-3 py-2 gap-2'>
            <Button className='' variant='default' size='sm'>Send <Send /></Button>
          </div>
        </div>
      </div>

      <div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
        <Button className='' variant='outline' size='sm'>Give me all the truck details that are idle today?</Button>
        <Button className='' variant='outline' size='sm'>Tell me about cost to delivery ratio of truck?</Button>
        <Button className='' variant='outline' size='sm'>What are your analysis on Fuel Theft?</Button>
        <Button className='' variant='outline' size='sm'>Tell me about the fuel level of trucks?</Button>
        <Button className='' variant='outline' size='sm'>Which is the best truck with most fuel efficiency?</Button>
      </div>
    </div>
  )
}

export default DayimGPT
