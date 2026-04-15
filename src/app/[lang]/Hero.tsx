import Link from 'next/link'

export default function Hero({ dict }: { dict: Record<string, any> }) {
  const { hero } = dict

  return (
    <section id="hero" aria-label="Seção principal">
      <div className="hero-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=1920&auto=format&fit=crop&q=85"
          alt="Mulher olhando para a luz, representando esperança"
          id="hero-img"
        />
      </div>
      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="eyebrow" id="hero-eyebrow">{hero.eyebrow}</p>

        <h1 className="hero-title" id="hero-title" aria-label={`${hero.title1} ${hero.title2} ${hero.titleEm}`}>
          <span className="word-wrap"><span className="word">{hero.title1.split(' ')[0]}</span></span>
          <span className="word-wrap"><span className="word">&nbsp;{hero.title1.split(' ')[1] || ''}</span></span>
          <br />
          <span className="word-wrap"><span className="word">{hero.title2.split(' ')[0]}</span></span>
          <span className="word-wrap"><span className="word">&nbsp;{hero.title2.split(' ')[1] || ''}</span></span>
          <span className="word-wrap"><span className="word">&nbsp;{hero.title2.split(' ')[2] || ''}</span></span>
          <br />
          <span className="word-wrap line-sozinha"><span className="word">{hero.titleEm}</span></span>
        </h1>

        <p className="hero-subtitle" id="hero-subtitle">{hero.subtitle}</p>

        <div className="hero-buttons" id="hero-buttons">
          <Link href="#cadastro" className="btn-primary">{hero.ctaPrimary}</Link>
          <Link href="#realidade" className="btn-ghost">{hero.ctaSecondary}</Link>
        </div>
      </div>

      <div className="scroll-hint" id="scroll-hint" aria-hidden="true">
        <div className="scroll-hint-bar" id="scroll-bar" />
        <span className="scroll-hint-label">rolar</span>
      </div>
    </section>
  )
}
