export default function Dados({ dict }: { dict: Record<string, any> }) {
  const { dados } = dict
  const cards: { num: string; text: string }[] = dados.cards ?? []

  return (
    <section id="realidade" aria-label="A realidade brasileira">
      <div className="section-inner">
        <p className="eyebrow">{dados.eyebrow}</p>
        <h2 className="section-title">
          {dados.titleNormal}
          <br />
          {dados.titleEm}
        </h2>
        <p className="lead-text">{dados.body}</p>

        <div className="data-cards-grid">
          {cards.map((card, i) => (
            <div className="data-card" key={`dados-${i}`}>
              <span className="stat-number">{card.num}</span>
              <p>{card.text}</p>
            </div>
          ))}
        </div>

        <p className="sources-line">{dados.source}</p>
      </div>
    </section>
  )
}
