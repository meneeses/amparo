export default function Footer({ dict }: { dict: any }) {
  return (
    <footer>
      <span className="footer-logo">{dict.nav.logo}</span>
      <p>{dict.footer.slogan}</p>
      <p style={{ marginTop: '1.5rem' }}>{dict.footer.copy}</p>
    </footer>
  )
}
