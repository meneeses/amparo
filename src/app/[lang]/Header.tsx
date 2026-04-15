'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Locale } from '../i18n-config'

export default function Header({ dict, lang }: { dict: Record<string, any>; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Navegação principal">
      <Link href={`/${lang}`} className="nav-logo" aria-label="Amparo — página inicial">
        Amparo.
      </Link>
      <div className="nav-right">
        <span className="nav-flags" aria-label="Idiomas disponíveis">
          <Link href="/pt" aria-label="Português">🇧🇷</Link>
          {' '}
          <Link href="/en" aria-label="English">🇺🇸</Link>
        </span>
        <Link href="#cadastro" className="nav-cta">{dict.nav.cta}</Link>
      </div>
    </nav>
  )
}
