import Link from 'next/link'

export default function ComoAjudar({ dict }: { dict: any }) {
  return (
    <section className="ajudar" id="ajudar">
      <div className="container text-center">
        <div className="section-label">{dict.ajudar.label}</div>
        <h2 className="section-title">
          {dict.ajudar.titleNormal}
          <br />
          <em>{dict.ajudar.titleEm}</em>
        </h2>
        <p className="section-body mb-0" style={{ margin: '0 auto' }}>
          {dict.ajudar.body}
        </p>
        <div className="ajudar-grid">
          <Link href="#cadastro" className="ajudar-card">
            <div className="ajudar-icon orange">🙌</div>
            <h3>{dict.ajudar.card1Title}</h3>
            <p>{dict.ajudar.card1Text}</p>
            <span className="card-link">{dict.ajudar.card1Link}</span>
          </Link>
          <Link href="#cadastro" className="ajudar-card">
            <div className="ajudar-icon blue">💼</div>
            <h3>{dict.ajudar.card2Title}</h3>
            <p>{dict.ajudar.card2Text}</p>
            <span className="card-link">{dict.ajudar.card2Link}</span>
          </Link>
          <Link href="#cadastro" className="ajudar-card">
            <div className="ajudar-icon green">🏠</div>
            <h3>{dict.ajudar.card3Title}</h3>
            <p>{dict.ajudar.card3Text}</p>
            <span className="card-link">{dict.ajudar.card3Link}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
