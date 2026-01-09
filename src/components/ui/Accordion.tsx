'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpen?: string
  allowMultiple?: boolean
  className?: string
}

export function Accordion({
  items,
  defaultOpen,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(
    defaultOpen ? [defaultOpen] : []
  )

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)

        return (
          <div
            key={item.id}
            className="rounded-lg border border-border bg-background-secondary overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className={cn(
                'flex w-full items-center justify-between px-5 py-4',
                'text-left text-foreground font-medium',
                'transition-colors duration-200',
                'hover:bg-background-tertiary focus-ring',
                isOpen && 'bg-background-tertiary'
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span>{item.title}</span>
              <svg
                className={cn(
                  'h-5 w-5 text-foreground-tertiary transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id={`accordion-content-${item.id}`}
              className={cn(
                'grid transition-all duration-200 ease-in-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-4 text-sm text-foreground-secondary leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
