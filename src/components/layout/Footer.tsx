import Link from 'next/link'
import { SITE_CONFIG, NAV_ITEMS, CONTACT_INFO } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold text-foreground">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="mt-4 text-sm text-foreground-secondary leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 space-y-2">
              <p className="text-sm text-foreground-tertiary">
                <span className="text-foreground-secondary">전화:</span>{' '}
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-accent transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </p>
              <p className="text-sm text-foreground-tertiary">
                <span className="text-foreground-secondary">이메일:</span>{' '}
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-accent transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          {NAV_ITEMS.filter((item) => item.children).slice(0, 3).map((item) => (
            <div key={item.href}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {item.title}
              </h3>
              <ul className="space-y-3">
                {item.children?.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="text-sm text-foreground-tertiary hover:text-foreground transition-colors"
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground-tertiary">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.links.company}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-foreground-tertiary hover:text-foreground transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className="text-sm text-foreground-tertiary hover:text-foreground transition-colors"
              >
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
