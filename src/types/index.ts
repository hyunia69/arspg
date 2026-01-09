// Re-export database types
export type {
  Database,
  Tables,
  TablesInsert,
  TablesUpdate,
  Notice,
  FAQ,
  Inquiry,
  Partner,
  CompanyHistory,
  NoticeInsert,
  FAQInsert,
  InquiryInsert,
  PartnerInsert,
  CompanyHistoryInsert,
  InquiryType,
  InquiryStatus,
  FAQCategory,
} from '@/lib/supabase/types'

// Navigation types
export interface NavItem {
  title: string
  href: string
  children?: NavItem[]
}

// Component props types
export interface HeroProps {
  headline?: string
  subheadline?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  image?: string
}

export interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

export interface FeaturesProps {
  title?: string
  subtitle?: string
  features?: Feature[]
  layout?: 'grid' | 'list'
}

export interface PricingPlan {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: {
    text: string
    href: string
  }
}

export interface PricingProps {
  title?: string
  subtitle?: string
  plans?: PricingPlan[]
}
