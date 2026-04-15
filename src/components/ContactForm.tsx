'use client'

import { useState, useCallback, useRef, type FormEvent, type ChangeEvent } from 'react'

interface FormFields {
  nome: string
  email: string
  whatsapp: string
  cidade: string
  tipo: string
  mensagem: string
}


type FieldErrors = Partial<Record<keyof FormFields, string>>

const INITIAL: FormFields = { nome: '', email: '', whatsapp: '', cidade: '', tipo: '', mensagem: '' }

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

function sanitize(v: string): string { return v.replace(/<[^>]*>/g, '').trim() }

function maskPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const MAX: Record<keyof FormFields, number> = {
  nome: 120, email: 254, whatsapp: 15, cidade: 100, tipo: 50, mensagem: 1000,
}

const COOLDOWN = 5_000

export default function ContactForm({ dict }: { dict: Record<string, any> }) {
  const { form } = dict
  const [data, setData] = useState<FormFields>(INITIAL)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const lastSubmit = useRef(0)
  const [honey, setHoney] = useState('')

  const update = useCallback(
    (field: keyof FormFields) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        let value = e.target.value
        if (field === 'whatsapp') value = maskPhone(value)
        if (value.length > MAX[field]) value = value.slice(0, MAX[field])
        setData((p) => ({ ...p, [field]: value }))
        setErrors((p) => { if (!p[field]) return p; const n = { ...p }; delete n[field]; return n })
        setSubmitError(false)
      },
    []
  )

  const validate = (): boolean => {
    const e: FieldErrors = {}
    if (!sanitize(data.nome)) e.nome = 'Campo obrigatório'
    else if (sanitize(data.nome).length < 2) e.nome = 'Mínimo 2 caracteres'
    const email = sanitize(data.email).toLowerCase()
    if (!email) e.email = 'Campo obrigatório'
    else if (!EMAIL_RE.test(email)) e.email = 'E-mail inválido'
    if (!data.tipo) e.tipo = 'Selecione uma opção'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (honey) return
    const now = Date.now()
    if (now - lastSubmit.current < COOLDOWN) return
    lastSubmit.current = now
    if (!validate()) return

    setSubmitting(true)
    setSubmitError(false)

    const payload = {
      nome: sanitize(data.nome),
      email: sanitize(data.email).toLowerCase(),
      whatsapp: data.whatsapp,
      cidade: sanitize(data.cidade),
      como_ajudar: sanitize(data.tipo),
      mensagem: sanitize(data.mensagem),
      _subject: `Novo cadastro Amparo: ${sanitize(data.nome)}`,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (res.ok) setSuccess(true)
      else { setSubmitError(true); setSubmitting(false) }
    } catch { setSubmitError(true); setSubmitting(false) }
  }

  return (
    <section id="cadastro" aria-label="Formulário de cadastro">
      <div className="cadastro-bg-word" aria-hidden="true">AMPARO</div>
      <div className="section-inner">
        <p className="eyebrow">{form.eyebrow}</p>
        <h2 className="section-title">
          {form.titleNormal}
          <br />
          <span className="italic-lilac">{form.titleEm}</span>
        </h2>
        <p className="lead-text">{form.body}</p>

        <div className="form-wrap">
          {success ? (
            <div className="form-success" role="status" aria-live="polite" style={{ display: 'block' }}>
              <div className="success-check" aria-hidden="true">✓</div>
              <p className="success-title">{form.successTitle}</p>
              <p className="success-text">{form.successText}</p>
            </div>
          ) : (
            <form id="amparo-form" onSubmit={handleSubmit} noValidate autoComplete="on">
              {/* Honeypot */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                <label htmlFor="website">Website</label>
                <input id="website" name="_gotcha" type="text" tabIndex={-1} value={honey} onChange={(e) => setHoney(e.target.value)} autoComplete="off" />
              </div>

              <div className="form-row">
                <div className={`form-group${errors.nome ? ' error' : ''}`}>
                  <label htmlFor="f-nome">{form.fieldName} *</label>
                  <input id="f-nome" type="text" placeholder={form.placeName} value={data.nome} onChange={update('nome')} maxLength={MAX.nome} required autoComplete="name" aria-required="true" aria-invalid={!!errors.nome} />
                  {errors.nome && <span className="form-error" role="alert">{errors.nome}</span>}
                </div>
                <div className={`form-group${errors.email ? ' error' : ''}`}>
                  <label htmlFor="f-email">{form.fieldEmail} *</label>
                  <input id="f-email" type="email" placeholder={form.placeEmail} value={data.email} onChange={update('email')} maxLength={MAX.email} required autoComplete="email" aria-required="true" aria-invalid={!!errors.email} />
                  {errors.email && <span className="form-error" role="alert">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="f-whatsapp">{form.fieldWhatsapp}</label>
                  <input id="f-whatsapp" type="tel" placeholder={form.placeWhatsapp} value={data.whatsapp} onChange={update('whatsapp')} maxLength={MAX.whatsapp} autoComplete="tel" inputMode="numeric" />
                </div>
                <div className="form-group">
                  <label htmlFor="f-cidade">{form.fieldCity}</label>
                  <input id="f-cidade" type="text" placeholder={form.placeCity} value={data.cidade} onChange={update('cidade')} maxLength={MAX.cidade} />
                </div>
              </div>

              <div className="form-row full">
                <div className={`form-group${errors.tipo ? ' error' : ''}`}>
                  <label htmlFor="f-tipo">{form.fieldRole} *</label>
                  <select id="f-tipo" value={data.tipo} onChange={update('tipo')} required aria-required="true" aria-invalid={!!errors.tipo}>
                    <option value="">{form.roleDefault}</option>
                    <option value="voluntario">{form.role1}</option>
                    <option value="investidor">{form.role2}</option>
                    <option value="centro">{form.role3}</option>
                    <option value="divulgar">{form.role4}</option>
                    <option value="outros">{form.role5}</option>
                  </select>
                  {errors.tipo && <span className="form-error" role="alert">{errors.tipo}</span>}
                </div>
              </div>

              <div className="form-row full">
                <div className="form-group">
                  <label htmlFor="f-mensagem">{form.fieldMessage}</label>
                  <textarea id="f-mensagem" placeholder={form.placeMessage} value={data.mensagem} onChange={update('mensagem')} maxLength={MAX.mensagem} />
                </div>
              </div>

              {submitError && (
                <p className="form-error" role="alert" style={{ textAlign: 'center', marginBottom: '8px' }}>
                  Erro ao enviar. Tente novamente.
                </p>
              )}

              <button type="submit" className="btn-submit" disabled={submitting} aria-busy={submitting}>
                {submitting ? 'Enviando...' : form.submitBtn}
              </button>
              <p className="form-note">{form.note}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
