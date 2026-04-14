export default function Missao({ dict }: { dict: any }) {
  return (
    <section className="missao" id="missao">
      <div className="container">
        <div className="missao-inner">
          <div className="animate">
            <div className="section-label">{dict.missao.label}</div>
            <h2 className="section-title">
              {dict.missao.titleNormal}
              <br />
              <em>{dict.missao.titleEm}</em>
            </h2>
            <p className="section-body">{dict.missao.body}</p>
            <div className="missao-quote">
              <blockquote>{dict.missao.quoteText}</blockquote>
              <cite>{dict.missao.quoteCite}</cite>
            </div>
          </div>
          <div className="missao-visual animate delay-2">
            <div className="missao-card">
              <div className="missao-card-icon">{dict.missao.card1Icon}</div>
              <h4>{dict.missao.card1Title}</h4>
              <p>{dict.missao.card1Text}</p>
            </div>
            <div className="missao-card">
              <div className="missao-card-icon">{dict.missao.card2Icon}</div>
              <h4>{dict.missao.card2Title}</h4>
              <p>{dict.missao.card2Text}</p>
            </div>
            <div className="missao-card">
              <div className="missao-card-icon">{dict.missao.card3Icon}</div>
              <h4>{dict.missao.card3Title}</h4>
              <p>{dict.missao.card3Text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
