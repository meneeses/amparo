export default function Dados({ dict }: { dict: Record<string, any> }) {
  const { dados } = dict

  const cards = [
    { num: dados.card1Num, text: dados.card1Text },
    { num: dados.card2Num, text: dados.card2Text },
    { num: dados.card3Num, text: dados.card3Text },
    { num: dados.card4Num, text: dados.card4Text },
    { num: dados.card5Num, text: dados.card5Text },
    { num: dados.card6Num, text: dados.card6Text },
  ]

  return (
    <section className="dados" id="dados" aria-labelledby="dados-title">
      <div className="container">
        <p className="section-eyebrow">{dados.eyebrow}</p>
        <h2 id="dados-title" className="section-title">
          {dados.titleNormal} <em>{dados.titleEm}</em>
        </h2>
        <p className="section-body">{dados.body}</p>

        <div className="dados-grid" role="list" aria-label="Dados estatísticos">
          {cards.map((card) => (
            <article className="dados-card" key={card.num} role="listitem">
              <div className="dados-card-num" aria-hidden="true">
                {card.num}
              </div>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <p className="dados-source">{dados.source}</p>
      </div>
    </section>
  )
}
