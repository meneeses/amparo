import Link from 'next/link'

export default function ComoAjudar({ dict }: { dict: Record<string, any> }) {
  const { ajudar } = dict

  const cards: { num: string; title: string; text: string; link: string }[] =
    ajudar.cards ?? [
      { num: ajudar.card1Num, title: ajudar.card1Title, text: ajudar.card1Text, link: ajudar.card1Link },
      { num: ajudar.card2Num, title: ajudar.card2Title, text: ajudar.card2Text, link: ajudar.card2Link },
      { num: ajudar.card3Num, title: ajudar.card3Title, text: ajudar.card3Text, link: ajudar.card3Link },
    ].filter((c) => c.num)

  return (
    <section className="ajudar" id="ajudar" aria-labelledby="ajudar-title">
      <div className="container">
        <p className="section-eyebrow">{ajudar.eyebrow}</p>
        <h2 id="ajudar-title" className="section-title">
          {ajudar.titleNormal} <em>{ajudar.titleEm}</em>
        </h2>
        <p className="section-body">{ajudar.body}</p>

        <div className="ajudar-grid" role="list">
          {cards.map((card, index) => (
            <article className="ajudar-card" key={`ajudar-${index}`} role="listitem">
              <div className="ajudar-card-number" aria-hidden="true">{card.num}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <Link href="#cadastro" className="ajudar-card-link">{card.link}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
