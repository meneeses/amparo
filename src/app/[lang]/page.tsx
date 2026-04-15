import { getDictionary } from '../../dictionaries'
import type { Locale } from '../../i18n-config'

import CustomCursor from '../../components/CustomCursor'
import Header from '../../components/Header'
import Hero from '../../components/Hero'
import Stats from '../../components/Stats'
import Dados from '../../components/Dados'
import QuoteSection from '../../components/QuoteSection'
import Impacto from '../../components/Impacto'
import Lacuna from '../../components/Lacuna'
import Missao from '../../components/Missao'
import ComoAjudar from '../../components/ComoAjudar'
import ContactForm from '../../components/ContactForm'
import Footer from '../../components/Footer'
import GsapAnimations from '../../components/GsapAnimations'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <>
      <a href="#main-content" className="skip-link">Pular para o conteúdo</a>
      <CustomCursor />
      <Header dict={dict} lang={lang as Locale} />
      <main id="main-content">
        <Hero dict={dict} />
        <Stats dict={dict} />
        <Dados dict={dict} />
        <QuoteSection />
        <Impacto dict={dict} />
        <Lacuna dict={dict} />
        <Missao dict={dict} />
        <ComoAjudar dict={dict} />
        <ContactForm dict={dict} />
      </main>
      <Footer dict={dict} />
      <GsapAnimations />
    </>
  )
}
