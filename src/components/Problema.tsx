export default function Problema({ dict }: { dict: any }) {
  return (
    <section className="problema">
      <div className="container">
        <div className="section-label animate">{dict.problema.label}</div>
        <h2 className="section-title animate delay-1">
          {dict.problema.titleNormal}
          <br />
          <em>{dict.problema.titleEm}</em>
        </h2>
        <p className="section-body animate delay-2">{dict.problema.body}</p>
        <div className="problema-grid animate delay-3">
          <div className="problema-item">
            <div className="problema-item-num">{dict.problema.item1Num}</div>
            <p>{dict.problema.item1Text}</p>
          </div>
          <div className="problema-item">
            <div className="problema-item-num">{dict.problema.item2Num}</div>
            <p>{dict.problema.item2Text}</p>
          </div>
          <div className="problema-item">
            <div className="problema-item-num">{dict.problema.item3Num}</div>
            <p>{dict.problema.item3Text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
