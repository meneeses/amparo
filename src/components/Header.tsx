import Link from 'next/link'

import type { Locale } from '../i18n-config'

export default function Header({ dict, lang }: { dict: any, lang: Locale }) {
  return (
    <nav>
      <Link href="#" className="nav-logo">
        {dict.nav.logo}
      </Link>
      
      <div className="nav-right">
        <div className="lang-switcher">
          <Link href="/pt" className={lang === 'pt' ? 'active' : ''} title="Português">
            <img src="https://flagcdn.com/w40/br.png" alt="Brasil" width="22" style={{ borderRadius: '3px', display: 'block' }} />
          </Link>
          <Link href="/en" className={lang === 'en' ? 'active' : ''} title="English">
            <img src="https://flagcdn.com/w40/us.png" alt="USA" width="22" style={{ borderRadius: '3px', display: 'block' }} />
          </Link>
        </div>
        <Link href="#cadastro" className="nav-cta">
          {dict.nav.cta}
        </Link>
      </div>
    </nav>
  )
}
