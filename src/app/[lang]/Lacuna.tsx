export default function Lacuna({ dict }: { dict: Record<string, any> }) {
  const { lacuna } = dict

  return (
    <section id="lacuna" aria-label="A lacuna brasileira">
      <div className="section-inner">
        <p className="eyebrow">{lacuna.eyebrow}</p>
        <h2 className="section-title">
          {lacuna.titleNormal}
          <br />
          {lacuna.titleEm}
        </h2>
        <p className="lead-text">{lacuna.body}</p>

        <div className="comparison-grid">
          <div className="comparison-block">
            <div className="comparison-flag">🇺🇸</div>
            <span className="comparison-number">{lacuna.compareUsNum}</span>
            <p>{lacuna.compareUsText}</p>
          </div>
          <div className="comparison-block">
            <div className="comparison-flag">🇧🇷</div>
            <span className="comparison-number" style={{ color: 'var(--rose)' }}>
              {lacuna.compareBrNum}
            </span>
            <p>{lacuna.compareBrText}</p>
          </div>
        </div>

        <div className="big-blockquote">
          <q>{lacuna.quote}</q>
          <cite>— {lacuna.quoteAuthor}</cite>
        </div>

        {lacuna.initiativesTitle && (
          <div className="lacuna-sub">
            <h3>{lacuna.initiativesTitle}</h3>
            <p>{lacuna.initiativesText}</p>
          </div>
        )}

        {lacuna.susTitle && (
          <div className="lacuna-sub">
            <h3>{lacuna.susTitle}</h3>
            <p>{lacuna.susText}</p>
          </div>
        )}
      </div>
    </section>
  )
}
