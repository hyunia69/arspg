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
            'bg-white text-black',
            'hover:bg-white/90',
            'active:scale-[0.98]',
          ],
          variant === 'secondary' && [
            'bg-white/[0.06] text-white',
            'hover:bg-white/[0.1]',
            'border border-white/[0.08]',
          ],
          variant === 'outline' && [
            'bg-transparent text-white',
            'border border-white/[0.15] hover:border-white/[0.3]',
            'hover:bg-white/[0.04]',
          ],
          variant === 'ghost' && [
            'bg-transparent text-white/60',
            'hover:text-white hover:bg-white/[0.04]',
          ],
          variant === 'link' && [
            'bg-transparent text-white/70 underline-offset-4',
            'hover:text-white hover:underline',
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
