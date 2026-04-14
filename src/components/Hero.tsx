import Link from 'next/link'

export default function Hero({ dict }: { dict: any }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-eyebrow">{dict.hero.eyebrow}</div>
        <h1>
          {dict.hero.titleNormal1}
          <br />
          {dict.hero.titleNormal2}
          <br />
          <em>{dict.hero.titleEm}</em>
        </h1>
        <p className="hero-sub">{dict.hero.subtitle}</p>
        <div className="hero-actions">
          <Link href="#cadastro" className="btn-primary">
            {dict.hero.ctaPrimary}
          </Link>
          <Link href="#missao" className="btn-secondary">
            {dict.hero.ctaSecondary}
          </Link>
        </div>
        <div className="hero-stat-row">
          <div className="hero-stat">
            <strong>{dict.hero.stat1Value}</strong>
            <span>{dict.hero.stat1Label}</span>
          </div>
          <div className="hero-stat">
            <strong>{dict.hero.stat2Value}</strong>
            <span>{dict.hero.stat2Label}</span>
          </div>
          <div className="hero-stat">
            <strong>{dict.hero.stat3Value}</strong>
            <span>{dict.hero.stat3Label}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
