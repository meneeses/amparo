export default function Impacto({ dict }: { dict: Record<string, any> }) {
  const { impacto } = dict

  return (
    <section className="impacto" id="impacto" aria-labelledby="impacto-title">
      <div className="container">
        <p className="section-eyebrow">{impacto.eyebrow}</p>
        <h2 id="impacto-title" className="section-title">
          {impacto.titleNormal} <em>{impacto.titleEm}</em>
        </h2>
        <p className="section-body">{impacto.body}</p>

        <div className="impacto-grid" role="list" aria-label="Dados de impacto na saúde mental">
          {impacto.stats.map((stat: { value: string; label: string }) => (
            <div className="impacto-card" key={stat.value} role="listitem">
              <div className="impacto-card-value">{stat.value}</div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="impacto-violence">
          <h3>{impacto.violenceTitle}</h3>
          <p>{impacto.violenceText}</p>
        </div>

        <div className="impacto-closing">
          <h3>{impacto.closingTitle}</h3>
          <p>{impacto.closingText}</p>
        </div>

        <p className="impacto-source">{impacto.sourceText}</p>
      </div>
    </section>
  )
}
