'use client'

import { useState } from 'react'

export default function ContactForm({ dict }: { dict: any }) {
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    cidade: '',
    tipo: '',
    mensagem: ''
  })

  const handleSubmit = () => {
    if (!formData.nome || !formData.email || !formData.tipo) {
      alert(dict.form.alertError)
      return
    }
    setSuccess(true)
  }

  return (
    <section className="form-section" id="cadastro">
      <div className="container text-center">
        <div className="section-label">{dict.form.label}</div>
        <h2 className="section-title">
          {dict.form.titleNormal}
          <br />
          <em>{dict.form.titleEm}</em>
        </h2>
        <p className="section-body" style={{ margin: '0 auto' }}>
          {dict.form.body}
        </p>
        <div className="form-wrapper">
          {!success ? (
            <div id="form-content">
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="nome">{dict.form.fieldName}</label>
                    <input
                      type="text"
                      id="nome"
                      placeholder={dict.form.placeName}
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{dict.form.fieldEmail}</label>
                    <input
                      type="email"
                      id="email"
                      placeholder={dict.form.placeEmail}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="whatsapp">{dict.form.fieldWhatsapp}</label>
                    <input
                      type="tel"
                      id="whatsapp"
                      placeholder={dict.form.placeWhatsapp}
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cidade">{dict.form.fieldCity}</label>
                    <input
                      type="text"
                      id="cidade"
                      placeholder={dict.form.placeCity}
                      value={formData.cidade}
                      onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    />
                  </div>
                  <div className="form-group full">
                    <label htmlFor="tipo">{dict.form.fieldRole}</label>
                    <select
                      id="tipo"
                      value={formData.tipo}
                      onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    >
                      <option value="">{dict.form.roleDefault}</option>
                      <option>{dict.form.role1}</option>
                      <option>{dict.form.role2}</option>
                      <option>{dict.form.role3}</option>
                      <option>{dict.form.role4}</option>
                      <option>{dict.form.role5}</option>
                    </select>
                  </div>
                  <div className="form-group full">
                    <label htmlFor="mensagem">{dict.form.fieldMessage}</label>
                    <textarea
                      id="mensagem"
                      placeholder={dict.form.placeMessage}
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <button className="form-submit" onClick={handleSubmit}>
                  {dict.form.submitBtn}
                </button>
                <p className="form-note">{dict.form.note}</p>
              </div>
            </div>
          ) : (
            <div className="form-success text-center">
              <div className="success-icon">🌿</div>
              <h3>{dict.form.successTitle}</h3>
              <p>{dict.form.successText}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
