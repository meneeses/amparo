export default function Lacuna({ dict }: { dict: Record<string, any> }) {
  const { lacuna } = dict

  return (
    <section className="lacuna" id="lacuna" aria-labelledby="lacuna-title">
      <div className="container">
        <p className="section-eyebrow">{lacuna.eyebrow}</p>
        <h2 id="lacuna-title" className="section-title">
          {lacuna.titleNormal} <em>{lacuna.titleEm}</em>
        </h2>
        <p className="section-body">{lacuna.body}</p>

        <div className="lacuna-compare" role="list" aria-label="Comparação de centros de apoio">
          <div className="lacuna-compare-card lacuna-compare-us" role="listitem">
            <span className="lacuna-compare-label">{lacuna.compareUsTitle}</span>
            <div className="lacuna-compare-num">{lacuna.compareUsNum}</div>
            <p>{lacuna.compareUsText}</p>
          </div>
          <div className="lacuna-compare-card lacuna-compare-br" role="listitem">
            <span className="lacuna-compare-label">{lacuna.compareBrTitle}</span>
            <div className="lacuna-compare-num">{lacuna.compareBrNum}</div>
            <p>{lacuna.compareBrText}</p>
          </div>
        </div>

        <blockquote className="lacuna-quote">
          <p>&ldquo;{lacuna.quote}&rdquo;</p>
          <cite>— {lacuna.quoteAuthor}</cite>
        </blockquote>

        <div className="lacuna-initiatives">
          <h3>{lacuna.initiativesTitle}</h3>
          <p>{lacuna.initiativesText}</p>
        </div>

        <div className="lacuna-closing">
          <h3>{lacuna.susTitle}</h3>
          <p>{lacuna.susText}</p>
        </div>
      </div>
    </section>
  )
}
