'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Locale } from '../i18n-config'

interface HeaderProps {
  dict: Record<string, any>
  lang: Locale
}

export default function Header({ dict, lang }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Principal">
      <div className="container nav-inner">
        <Link href={`/${lang}`} className="nav-logo" aria-label="Amparo — Página inicial">
          {dict.nav.logo}<span>.</span>
        </Link>

        <div className="nav-right">
          <div className="lang-switch" aria-label="Idioma">
            <Link
              href="/pt"
              className={lang === 'pt' ? 'active' : ''}
              aria-label="Português"
              aria-current={lang === 'pt' ? 'page' : undefined}
            >
              🇧🇷
            </Link>
            <Link
              href="/en"
              className={lang === 'en' ? 'active' : ''}
              aria-label="English"
              aria-current={lang === 'en' ? 'page' : undefined}
            >
              🇺🇸
            </Link>
          </div>
          <Link href="#cadastro" className="nav-cta">
            {dict.nav.cta}
          </Link>
        </div>
      </div>
    </nav>
  )
}
