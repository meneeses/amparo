export default function QuoteSection() {
  return (
    <section id="quote-section" aria-label="Citação de impacto">
      <div className="quote-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&auto=format&fit=crop&q=85"
          alt="Mãos entrelaçadas em apoio"
          id="quote-img"
        />
      </div>
      <div className="quote-overlay" />
      <div className="quote-content">
        <p className="quote-text">
          O Brasil <span className="lilac">debate.</span>
          <br />
          Mas quem está lá
          <br />
          quando ela mais precisa?
        </p>
      </div>
    </section>
  )
}
