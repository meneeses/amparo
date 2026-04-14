export default function Footer({ dict }: { dict: any }) {
  return (
    <footer>
      <span className="footer-logo">{dict.footer.slogan.split(' ')[0]}</span>
      <p>{dict.footer.slogan}</p>
      <p style={{ marginTop: '1.5rem' }}>{dict.footer.copy}</p>
    </footer>
  )
}
