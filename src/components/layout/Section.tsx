import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'default' | 'secondary' | 'gradient'
}

export function Section({
  children,
  className,
  id,
  background = 'default',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'section-padding',
        background === 'secondary' && 'bg-background-secondary',
        background === 'gradient' && 'bg-hero-gradient',
        className
      )}
    >
      <div className="container-custom">{children}</div>
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12 lg:mb-16',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-foreground-secondary text-balance">
          {subtitle}
        </p>
      )}
    </div>
  )
}
