export default function Footer({ dict }: { dict: Record<string, any> }) {
  const { footer } = dict

  return (
    <footer>
      <span className="footer-logo">Amparo.</span>
      <p className="footer-tagline">{footer.slogan}</p>
      <p className="footer-copy">{footer.copy}</p>
    </footer>
  )
}
