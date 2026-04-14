import type { Metadata } from 'next'
import { i18n, type Locale } from '../../i18n-config'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Amparo — Cada vida merece acolhimento',
  description: 'O Amparo é um movimento que conecta mulheres em situação de vulnerabilidade a centros de apoio.',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  )
}
