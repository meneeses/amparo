import { getDictionary } from '../../dictionaries'
import type { Locale } from '../../i18n-config'

import Header from '../../components/Header'
import Hero from '../../components/Hero'
import Problema from '../../components/Problema'
import Missao from '../../components/Missao'
import ComoAjudar from '../../components/ComoAjudar'
import ContactForm from '../../components/ContactForm'
import Footer from '../../components/Footer'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <>
      <Header dict={dict} lang={lang as Locale} />
      <main>
        <Hero dict={dict} />
        <Problema dict={dict} />
        <Missao dict={dict} />
        <ComoAjudar dict={dict} />
        <ContactForm dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  )
}
