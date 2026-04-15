export default function Impacto({ dict }: { dict: Record<string, any> }) {
  const { impacto } = dict
  const stats: { value: string; label: string }[] = impacto.stats ?? []

  return (
    <section id="impacto" aria-label="O impacto invisível">
      <div className="section-inner">
        <p className="eyebrow">{impacto.eyebrow}</p>
        <h2 className="section-title">
          {impacto.titleNormal}
          <br />
          {impacto.titleEm}
        </h2>
        <p className="lead-text">{impacto.body}</p>

        <div className="stat-rows">
          {stats.map((stat, i) => (
            <div className="stat-row" key={`imp-${i}`}>
              <span className="pct">{stat.value}</span>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        {impacto.violenceTitle && (
          <div className="highlight-box">
            <h3>{impacto.violenceTitle}</h3>
            <p>{impacto.violenceText}</p>
          </div>
        )}

        <div className="closing-statement">
          <span className="closing-italic">{impacto.closingTitle}</span>
          <p>{impacto.closingText}</p>
        </div>

        <p className="sources-line" style={{ marginTop: '36px' }}>
          {impacto.sourceText}
        </p>
      </div>
    </section>
  )
}
