import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const nav = ['About', 'Skills', 'Projects', 'Contact']

export default function Footer() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-inner',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 90%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const scroll = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer ref={ref} style={{ borderTop: '1px solid var(--border)', padding: '40px 0 32px' }}>
      <div className="container footer-inner">
        {/* Top row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 32, marginBottom: 32 }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 8 }}>
              Aniket<span style={{ color: 'var(--accent)' }}>.</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Full Stack Developer crafting modern, performant, and immersive web experiences.
            </p>
          </div>

          {/* Nav */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 4px' }}>
            {nav.map(item => (
              <button
                key={item}
                onClick={() => scroll(item)}
                className="nav-link"
                style={{ background: 'none', border: 'none', cursor: 'none' }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/AniketTyagi-Resume.pdf"
            download
            className="btn btn-primary btn-sm"
            style={{ cursor: 'none', flexShrink: 0 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </div>

        <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, color: 'var(--text-faint)' }}>
            © 2026 Aniket Tyagi. Built with React &amp; Three.js.
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'blink 2s step-end infinite' }} />
            <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, color: 'var(--text-faint)' }}>Open to opportunities</span>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn btn-secondary btn-sm"
            style={{ cursor: 'none' }}
          >
            Back to top
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </footer>
  )
}
