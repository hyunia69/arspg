import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { Services } from '@/components/sections/Services'
import { Partners } from '@/components/sections/Partners'
import { CTA } from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Services />
      <Partners />
      <CTA />
    </>
  )
}
