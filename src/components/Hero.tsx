import Link from 'next/link'

export default function Hero({ dict }: { dict: Record<string, any> }) {
  const { hero } = dict

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-content">
        <p className="section-eyebrow animate">{hero.eyebrow}</p>

        <h1 id="hero-title" className="animate delay-1">
          {hero.title1}
          <br />
          {hero.title2}
          <br />
          <em>{hero.titleEm}</em>
        </h1>

        <p className="hero-sub animate delay-2">{hero.subtitle}</p>

        <div className="hero-actions animate delay-3">
          <Link href="#cadastro" className="btn-primary">
            {hero.ctaPrimary}
          </Link>
          <Link href="#missao" className="btn-secondary">
            {hero.ctaSecondary}
          </Link>
        </div>

        <div className="hero-stats animate delay-4" role="list" aria-label="Estatísticas">
          {[
            { value: hero.stat1Value, label: hero.stat1Label },
            { value: hero.stat2Value, label: hero.stat2Label },
            { value: hero.stat3Value, label: hero.stat3Label },
          ].map((stat) => (
            <div className="hero-stat" key={stat.label} role="listitem">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
