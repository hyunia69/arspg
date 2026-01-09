import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200',
          'focus-ring disabled:opacity-50 disabled:pointer-events-none',
          // Variants
          variant === 'primary' && [
            'bg-accent text-white',
            'hover:bg-accent-hover hover:shadow-glow',
            'active:scale-[0.98]',
          ],
          variant === 'secondary' && [
            'bg-background-elevated text-foreground',
            'hover:bg-background-tertiary',
            'border border-border',
          ],
          variant === 'outline' && [
            'bg-transparent text-foreground',
            'border border-border hover:border-border-secondary',
            'hover:bg-background-tertiary',
          ],
          variant === 'ghost' && [
            'bg-transparent text-foreground-secondary',
            'hover:text-foreground hover:bg-background-tertiary',
          ],
          variant === 'link' && [
            'bg-transparent text-accent underline-offset-4',
            'hover:underline',
          ],
          // Sizes
          size === 'sm' && 'h-9 px-4 text-sm rounded-lg',
          size === 'md' && 'h-11 px-6 text-sm rounded-lg',
          size === 'lg' && 'h-12 px-8 text-base rounded-xl',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
