export default function Missao({ dict }: { dict: Record<string, any> }) {
  const { missao } = dict
  const cards: { icon: string; title: string; text: string }[] = missao.cards ?? []

  return (
    <section id="missao" aria-label="Nossa missão">
      <div className="missao-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&auto=format&fit=crop&q=85"
          alt=""
          aria-hidden="true"
          id="missao-img"
        />
      </div>
      <div className="section-inner">
        <p className="eyebrow">{missao.eyebrow}</p>
        <h2 className="section-title">
          {missao.titleNormal}
          <br />
          {missao.titleEm}
        </h2>

        <div className="bible-verse-wrap">
          <div className="verse-line" id="verse-line" />
          <blockquote className="bible-verse" id="bible-verse">
            <q>{missao.quoteText}</q>
            <cite className="verse-ref">{missao.quoteCite}</cite>
          </blockquote>
        </div>

        <div className="pillars-grid">
          {cards.map((card, i) => (
            <div className="pillar-card" key={`pillar-${i}`}>
              <span className="pillar-icon" aria-hidden="true">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
