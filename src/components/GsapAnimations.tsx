'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gsap: any
    ScrollTrigger: any
  }
}

export default function GsapAnimations() {
  useEffect(() => {
    const gsap = window.gsap
    const ScrollTrigger = window.ScrollTrigger
    if (!gsap || !ScrollTrigger) return

    gsap.registerPlugin(ScrollTrigger)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ── Custom Cursor ───────────────────────────────────── */
    if (window.matchMedia('(pointer: fine)').matches) {
      const dot = document.getElementById('cursor-dot')
      const ring = document.getElementById('cursor-ring')
      if (dot && ring) {
        let mx = 0, my = 0, rx = 0, ry = 0

        document.addEventListener('mousemove', (e: MouseEvent) => {
          mx = e.clientX
          my = e.clientY
          gsap.set(dot, { x: mx, y: my })
        })

        function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

        function animCursor() {
          rx = lerp(rx, mx, 0.12)
          ry = lerp(ry, my, 0.12)
          gsap.set(ring, { x: rx, y: ry })
          requestAnimationFrame(animCursor)
        }
        animCursor()

        document.querySelectorAll('a, button, .participate-card, .pillar-card').forEach((el) => {
          el.addEventListener('mouseenter', () => {
            gsap.to(ring, { width: 52, height: 52, borderColor: 'rgba(155,114,207,0.9)', duration: 0.3 })
          })
          el.addEventListener('mouseleave', () => {
            gsap.to(ring, { width: 34, height: 34, borderColor: 'rgba(155,114,207,0.6)', duration: 0.3 })
          })
        })
      }
    }

    /* ── Hero entrance ───────────────────────────────────── */
    if (!prefersReducedMotion) {
      gsap.set('#hero-eyebrow', { opacity: 0 })
      gsap.set('.hero-title .word', { opacity: 0, y: 32 })
      gsap.set('#hero-subtitle', { opacity: 0, y: 20 })
      gsap.set('#hero-buttons', { opacity: 0, y: 16 })
      gsap.set('#scroll-hint', { opacity: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to('#hero-eyebrow', { opacity: 1, duration: 0.6 })
        .to('.hero-title .word', { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 }, '-=0.2')
        .to('#hero-subtitle', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .to('#hero-buttons', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to('#scroll-hint', { opacity: 1, duration: 0.6 }, '-=0.2')

      /* Scroll hint loop */
      gsap.to('#scroll-bar', {
        scaleY: 0.3,
        transformOrigin: 'top',
        duration: 1.0,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })

      /* Parallax images */
      gsap.to('#hero-img', {
        y: '18%',
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.to('#quote-img', {
        y: '18%',
        ease: 'none',
        scrollTrigger: { trigger: '#quote-section', start: 'top bottom', end: 'bottom top', scrub: true },
      })

      gsap.to('#missao-img', {
        y: '18%',
        ease: 'none',
        scrollTrigger: { trigger: '#missao', start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }

    /* ── Generic reveal on scroll ────────────────────────── */
    function revealOnScroll(selector: string) {
      const els = document.querySelectorAll(selector)
      if (!els.length) return

      els.forEach((el) => {
        if (!prefersReducedMotion) gsap.set(el, { opacity: 0, y: 24 })
        ScrollTrigger.create({
          trigger: el,
          start: 'top 72%',
          once: true,
          onEnter: () => {
            if (prefersReducedMotion) return
            gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
          },
        })
      })
    }

    revealOnScroll('.eyebrow')
    revealOnScroll('.section-title')
    revealOnScroll('.lead-text')
    revealOnScroll('.highlight-box')
    revealOnScroll('.closing-statement')
    revealOnScroll('.bible-verse-wrap')
    revealOnScroll('.sources-line')
    revealOnScroll('.lacuna-sub')
    revealOnScroll('.big-blockquote')
    revealOnScroll('.stat-block')

    /* ── Staggered card reveals ──────────────────────────── */
    function staggerReveal(containerSelector: string, cardSelector: string) {
      const cards = document.querySelectorAll(cardSelector)
      if (!cards.length) return
      if (!prefersReducedMotion) gsap.set(cards, { opacity: 0, y: 24 })
      ScrollTrigger.create({
        trigger: containerSelector,
        start: 'top 72%',
        once: true,
        onEnter: () => {
          if (prefersReducedMotion) return
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power2.out' })
        },
      })
    }

    staggerReveal('.data-cards-grid', '.data-card')
    staggerReveal('.stat-rows', '.stat-row')
    staggerReveal('.participate-cards', '.participate-card')
    staggerReveal('.pillars-grid', '.pillar-card')
    staggerReveal('.comparison-grid', '.comparison-block')

    /* ── Quote text reveal ───────────────────────────────── */
    const quoteText = document.querySelector('.quote-text')
    if (quoteText && !prefersReducedMotion) {
      gsap.set(quoteText, { opacity: 0, y: 28 })
      ScrollTrigger.create({
        trigger: '#quote-section',
        start: 'top 65%',
        once: true,
        onEnter: () => gsap.to(quoteText, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }),
      })
    }

    /* ── Bible verse line animation ──────────────────────── */
    const verseLine = document.getElementById('verse-line')
    const bibleVerse = document.getElementById('bible-verse')
    if (verseLine && bibleVerse && !prefersReducedMotion) {
      gsap.set(verseLine, { scaleX: 0, transformOrigin: 'left' })
      gsap.set(bibleVerse, { opacity: 0, y: 16 })
      ScrollTrigger.create({
        trigger: '.bible-verse-wrap',
        start: 'top 72%',
        once: true,
        onEnter: () => {
          const vtl = gsap.timeline()
          vtl.to(verseLine, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' })
            .to(bibleVerse, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.1')
        },
      })
    }

    /* ── Form reveal ─────────────────────────────────────── */
    const formWrap = document.querySelector('.form-wrap')
    if (formWrap && !prefersReducedMotion) {
      gsap.set(formWrap, { opacity: 0, y: 24 })
      ScrollTrigger.create({
        trigger: formWrap,
        start: 'top 72%',
        once: true,
        onEnter: () => gsap.to(formWrap, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }),
      })
    }

    /* ── Animated counter: 87mil ──────────────────────────── */
    const countEl = document.getElementById('count-87')
    if (countEl) {
      if (!prefersReducedMotion) gsap.set(countEl, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: countEl,
        start: 'top 72%',
        once: true,
        onEnter: () => {
          if (prefersReducedMotion) { countEl.textContent = '87 mil'; return }
          gsap.to(countEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
          const obj = { val: 0 }
          gsap.to(obj, {
            val: 87000,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              const v = Math.round(obj.val)
              countEl.textContent = v >= 1000 ? Math.round(v / 1000) + ' mil' : v.toString()
            },
            onComplete: () => { countEl.textContent = '87 mil' },
          })
        },
      })
    }

    /* ── Cleanup ──────────────────────────────────────────── */
    return () => {
      ScrollTrigger.getAll().forEach((t: any) => t.kill())
    }
  }, [])

  return null
}
