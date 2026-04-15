import Link from 'next/link'

export default function ComoAjudar({ dict }: { dict: Record<string, any> }) {
  const { ajudar } = dict
  const cards: { num: string; title: string; text: string; link: string }[] = ajudar.cards ?? []

  return (
    <section id="participar" aria-label="Como participar">
      <div className="section-inner">
        <p className="eyebrow">{ajudar.eyebrow}</p>
        <h2 className="section-title">
          {ajudar.titleNormal}
          <br />
          {ajudar.titleEm}
        </h2>
        <p className="lead-text">{ajudar.body}</p>

        <div className="participate-cards">
          {cards.map((card, i) => (
            <Link href="#cadastro" className="participate-card" key={`part-${i}`}>
              <span className="card-num">{card.num}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <span className="card-link">{card.link}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
