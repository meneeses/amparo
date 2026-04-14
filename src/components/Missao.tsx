export default function Missao({ dict }: { dict: Record<string, any> }) {
  const { missao } = dict

  const cards = [
    { icon: missao.card1Icon, title: missao.card1Title, text: missao.card1Text },
    { icon: missao.card2Icon, title: missao.card2Title, text: missao.card2Text },
    { icon: missao.card3Icon, title: missao.card3Title, text: missao.card3Text },
    { icon: missao.card4Icon, title: missao.card4Title, text: missao.card4Text },
    { icon: missao.card5Icon, title: missao.card5Title, text: missao.card5Text },
    { icon: missao.card6Icon, title: missao.card6Title, text: missao.card6Text },
  ]

  return (
    <section className="missao" id="missao" aria-labelledby="missao-title">
      <div className="container">
        <p className="section-eyebrow">{missao.eyebrow}</p>
        <h2 id="missao-title" className="section-title">
          {missao.titleNormal} <em>{missao.titleEm}</em>
        </h2>
        <p className="section-body">{missao.body}</p>

        <blockquote className="missao-quote">
          <p>{missao.quoteText}</p>
          <cite>{missao.quoteCite}</cite>
        </blockquote>

        <div className="missao-cards-grid" role="list">
          {cards.map((card) => (
            <article className="missao-card" key={card.title} role="listitem">
              <div className="missao-card-icon" aria-hidden="true">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
