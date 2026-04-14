export default function Footer({ dict }: { dict: Record<string, any> }) {
  const { footer } = dict

  return (
    <footer role="contentinfo">
      <div className="container">
        <div className="footer-logo" aria-hidden="true">Amparo.</div>
        <p className="footer-slogan">{footer.slogan}</p>
        <p>{footer.copy}</p>
      </div>
    </footer>
  )
}
