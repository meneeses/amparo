'use client'

import {
  useState,
  useCallback,
  useRef,
  type FormEvent,
  type ChangeEvent,
} from 'react'

/* ── Types ── */
interface FormFields {
  nome: string
  email: string
  whatsapp: string
  cidade: string
  tipo: string
  mensagem: string
}

type FieldErrors = Partial<Record<keyof FormFields, string>>

const INITIAL: FormFields = {
  nome: '',
  email: '',
  whatsapp: '',
  cidade: '',
  tipo: '',
  mensagem: '',
}

/* ── Validation helpers ── */
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

function sanitize(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim()
}

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

/* ── Component ── */
export default function ContactForm({ dict }: { dict: Record<string, any> }) {
  const { form } = dict
  const [data, setData] = useState<FormFields>(INITIAL)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const lastSubmit = useRef(0)
  const [honey, setHoney] = useState('')

  const updateField = useCallback(
    (field: keyof FormFields) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        let value = e.target.value
        if (field === 'whatsapp') value = maskPhone(value)
        if (value.length > MAX[field]) value = value.slice(0, MAX[field])
        setData((prev) => ({ ...prev, [field]: value }))
        setErrors((prev) => {
          if (!prev[field]) return prev
          const next = { ...prev }
          delete next[field]
          return next
        })
      },
    []
  )

  const validate = (): boolean => {
    const e: FieldErrors = {}
    const nome = sanitize(data.nome)
    if (!nome) e.nome = 'Campo obrigatório'
    else if (nome.length < 2) e.nome = 'Mínimo 2 caracteres'
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
    const payload: FormFields = {
      nome: sanitize(data.nome),
      email: sanitize(data.email).toLowerCase(),
      whatsapp: data.whatsapp.replace(/\D/g, ''),
      cidade: sanitize(data.cidade),
      tipo: sanitize(data.tipo),
      mensagem: sanitize(data.mensagem),
    }

    try {
      // TODO: Replace with API call — server must re-validate, check CSRF, rate-limit by IP
      void payload
      await new Promise((r) => setTimeout(r, 800))
      setSuccess(true)
    } catch {
      setSubmitting(false)
    }
  }

  const field = (
    id: keyof FormFields,
    label: string,
    type: string,
    placeholder: string,
    opts: { required?: boolean; autoComplete?: string; full?: boolean; inputMode?: string } = {}
  ) => (
    <div className={`form-group${opts.full ? ' full' : ''}${errors[id] ? ' error' : ''}`}>
      <label htmlFor={id}>{label}{opts.required ? ' *' : ''}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={data[id]}
        onChange={updateField(id)}
        maxLength={MAX[id]}
        autoComplete={opts.autoComplete}
        inputMode={opts.inputMode as any}
        aria-required={opts.required || undefined}
        aria-invalid={!!errors[id] || undefined}
        aria-describedby={errors[id] ? `err-${id}` : undefined}
      />
      {errors[id] && <span id={`err-${id}`} className="form-error" role="alert">{errors[id]}</span>}
    </div>
  )

  return (
    <section className="form-section" id="cadastro" aria-labelledby="form-title">
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="section-eyebrow" style={{ justifyContent: 'center' }}>{form.eyebrow}</p>
        <h2 id="form-title" className="section-title">{form.titleNormal} <em>{form.titleEm}</em></h2>
        <p className="section-body" style={{ margin: '0 auto' }}>{form.body}</p>

        <div className="form-wrapper">
          {success ? (
            <div className="form-success" role="status" aria-live="polite">
              <div className="form-success-icon" aria-hidden="true">🌿</div>
              <h3>{form.successTitle}</h3>
              <p>{form.successText}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate autoComplete="on">
              {/* Honeypot anti-spam */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} value={honey} onChange={(e) => setHoney(e.target.value)} autoComplete="off" />
              </div>

              <div className="form-grid">
                {field('nome', form.fieldName, 'text', form.placeName, { required: true, autoComplete: 'name' })}
                {field('email', form.fieldEmail, 'email', form.placeEmail, { required: true, autoComplete: 'email' })}
                {field('whatsapp', form.fieldWhatsapp, 'tel', form.placeWhatsapp, { autoComplete: 'tel', inputMode: 'numeric' })}
                {field('cidade', form.fieldCity, 'text', form.placeCity, { autoComplete: 'address-level2' })}

                <div className={`form-group full${errors.tipo ? ' error' : ''}`}>
                  <label htmlFor="tipo">{form.fieldRole} *</label>
                  <select id="tipo" value={data.tipo} onChange={updateField('tipo')} aria-required="true" aria-invalid={!!errors.tipo || undefined} aria-describedby={errors.tipo ? 'err-tipo' : undefined}>
                    <option value="">{form.roleDefault}</option>
                    <option value="voluntario">{form.role1}</option>
                    <option value="investidor">{form.role2}</option>
                    <option value="centro">{form.role3}</option>
                    <option value="divulgar">{form.role4}</option>
                    <option value="outros">{form.role5}</option>
                  </select>
                  {errors.tipo && <span id="err-tipo" className="form-error" role="alert">{errors.tipo}</span>}
                </div>

                <div className="form-group full">
                  <label htmlFor="mensagem">{form.fieldMessage}</label>
                  <textarea id="mensagem" placeholder={form.placeMessage} value={data.mensagem} onChange={updateField('mensagem')} maxLength={MAX.mensagem} rows={4} />
                </div>
              </div>

              <button type="submit" className="form-submit" disabled={submitting} aria-busy={submitting}>
                {submitting ? '...' : form.submitBtn}
              </button>
              <p className="form-note">{form.note}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
