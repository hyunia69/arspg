'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-foreground bg-background-elevated'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-background-tertiary'
                  )}
                >
                  {item.title}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.href && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="glass rounded-lg py-2 min-w-[180px] shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-4 py-2 text-sm transition-colors',
                            pathname === child.href
                              ? 'text-accent bg-accent/10'
                              : 'text-foreground-secondary hover:text-foreground hover:bg-background-tertiary'
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="primary" size="sm" asChild>
              <Link href="/contact">무료 상담임</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-background-tertiary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <nav className="container-custom py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === item.href
                      ? 'text-foreground bg-background-elevated'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-background-tertiary'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'block px-4 py-2 text-sm rounded-lg transition-colors',
                          pathname === child.href
                            ? 'text-accent'
                            : 'text-foreground-tertiary hover:text-foreground-secondary'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-border">
              <Button variant="primary" size="sm" className="w-full" asChild>
                <Link href="/contact">무료 상담</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
