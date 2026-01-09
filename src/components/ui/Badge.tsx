import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        // Variants
        variant === 'default' && 'bg-background-elevated text-foreground-secondary',
        variant === 'accent' && 'bg-accent/20 text-accent',
        variant === 'success' && 'bg-success/20 text-success',
        variant === 'warning' && 'bg-warning/20 text-warning',
        variant === 'error' && 'bg-error/20 text-error',
        // Sizes
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-3 py-1 text-sm',
        className
      )}
    >
      {children}
    </span>
  )
}
