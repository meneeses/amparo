import type { Metadata } from 'next'
import { i18n, type Locale } from '../../i18n-config'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Amparo — Cada vida merece acolhimento',
  description:
    'O Amparo é um movimento que conecta mulheres em situação de vulnerabilidade a centros de apoio, voluntários, recursos e esperança em todo o Brasil.',
  metadataBase: new URL('https://amparo.org.br'),
  openGraph: {
    title: 'Amparo — Cada vida merece acolhimento',
    description:
      'Movimento nacional de acolhimento a mulheres em situação de vulnerabilidade.',
    locale: 'pt_BR',
    type: 'website',
  },
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
