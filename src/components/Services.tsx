import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { number: '01', title: 'UI/UX Design', desc: 'Clean, polished interfaces shaped around business goals and user behavior.' },
  { number: '02', title: 'PSD / Figma to HTML', desc: 'Converting design files into responsive, functional frontend code.' },
  { number: '03', title: 'Responsive Websites', desc: 'Mobile-friendly websites that look sharp across devices and screen sizes.' },
  { number: '04', title: 'Frontend Development', desc: 'Modern websites built with HTML, CSS, JavaScript, Bootstrap, React, and Laravel-friendly structures.' },
  { number: '05', title: 'Brand & Graphic Support', desc: 'Banners, logos, and custom visual assets that strengthen the web experience.' },
  { number: '06', title: 'Website Improvements', desc: 'Refining current sites with better structure, clarity, and conversion-focused layouts.' },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.srv-heading',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo('.srv-item',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.srv-list', start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="srv-heading" style={{ display: 'grid', gap: 56 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>05 — Services</div>
            <h2 className="section-heading">What I do best</h2>
          </div>

          <div className="srv-list" style={{ display: 'grid', gap: 0, border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {services.map(({ number, title, desc }, i) => (
              <div
                key={number}
                className="srv-item"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr auto',
                  alignItems: 'center',
                  gap: 20,
                  padding: '20px 24px',
                  borderBottom: i < services.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.2s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: 'var(--text-faint)' }}>{number}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text)', marginBottom: 3 }}>{title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-faint)', flexShrink: 0 }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
