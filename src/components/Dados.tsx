export default function Dados({ dict }: { dict: Record<string, any> }) {
  const { dados } = dict

  return (
    <section className="dados" id="dados" aria-labelledby="dados-title">
      <div className="container">
        <p className="section-eyebrow">{dados.eyebrow}</p>
        <h2 id="dados-title" className="section-title">
          {dados.titleNormal} <em>{dados.titleEm}</em>
        </h2>
        <p className="section-body">{dados.body}</p>

        <div className="dados-grid" role="list" aria-label="Dados estatísticos">
          {dados.cards.map((card: { num: string; text: string }) => (
            <article className="dados-card" key={card.num} role="listitem">
              <div className="dados-card-num" aria-hidden="true">{card.num}</div>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <p className="dados-source">{dados.source}</p>
      </div>
    </section>
  )
}
