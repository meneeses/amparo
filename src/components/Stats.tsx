export default function Stats({ dict }: { dict: Record<string, any> }) {
  const { hero } = dict

  return (
    <section id="stats" aria-label="Estatísticas rápidas">
      <div className="stats-grid">
        <div className="stat-block">
          <span className="stat-number" id="count-87" data-count="87000">0</span>
          <p>{hero.stat1Label}</p>
        </div>
        <div className="stat-block">
          <span className="stat-number" style={{ letterSpacing: '-2px' }}>{hero.stat2Value}</span>
          <p>{hero.stat2Label}</p>
        </div>
        <div className="stat-block">
          <span className="stat-number" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>{hero.stat3Value}</span>
          <p>{hero.stat3Label}</p>
        </div>
      </div>
    </section>
  )
}
