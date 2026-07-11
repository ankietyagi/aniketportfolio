import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const entries = [
  {
    role: 'Front-End Developer[cite: 1]',
    org: 'ANR Software Pvt Ltd[cite: 1]',
    period: 'July 2022 — Present[cite: 1]',
    type: 'Active',
    highlights: [
      'UI design based on the nature of business.[cite: 1]',
      'Suggested for improvements in the current design.[cite: 1]',
      'Created mobile friendly websites.[cite: 1]',
      'Work on PSD to HTML, Figma to HTML etc.[cite: 1]',
      'Working on Jekyll Framework and build many product-based website[cite: 1]'
    ],
    techs: ['HTML', 'CSS', 'JavaScript', 'Figma', 'Jekyll', 'Responsive UI'],
  },
  {
    role: 'Front-End Developer[cite: 1]',
    org: 'Auxesis Infotech Pvt Ltd[cite: 1]',
    period: 'Dec 2020 — June 2022[cite: 1]',
    type: 'Completed',
    highlights: [
      'UI design based on the nature of business.[cite: 1]',
      'Designed web UI as per customer needs.[cite: 1]',
      'Suggested for improvements in the current design.[cite: 1]',
      'Created websites using wireframes like Laravel, Drupal and Angular also.[cite: 1]',
      'Created mobile friendly websites.[cite: 1]',
      'Work on PSD to HTML, Figma to HTML etc.[cite: 1]'
    ],
    techs: ['Laravel', 'Drupal', 'Angular', 'Figma', 'HTML'],
  },
  {
    role: 'Frontend Developer, UI/UX Designer & Graphic Designer[cite: 1]',
    org: 'Enterslice Fintech Pvt. Ltd.[cite: 1]',
    period: 'Dec 2018 — Dec 2020[cite: 1]',
    type: 'Completed',
    highlights: [
      'Gathering all the information from the client.[cite: 1]',
      'Work on PSD to HTML.[cite: 1]',
      'Provide all the work on time.[cite: 1]'
    ],
    techs: ['Photoshop', 'HTML', 'CSS', 'UI/UX', 'Graphics'],
  },
  {
    role: 'Back Office Executive[cite: 1]',
    org: 'SSR Techvision Pvt Ltd[cite: 1]',
    period: 'Aug 2017 — Sept 2018[cite: 1]',
    type: 'Completed',
    highlights: [
      'Gathering and processing research data.[cite: 1]',
      'Performing basic admin duties including printing, sending emails, and ordering office supplies.[cite: 1]',
      'Assisting and coordinating with the sales team.[cite: 1]'
    ],
    techs: ['Admin', 'Data Processing', 'Coordination'],
  },
  {
    role: 'Web Designer Intern[cite: 1]',
    org: 'Benzaitens Group Ltd.[cite: 1]',
    period: 'Aug 2016 — July 2017[cite: 1]',
    type: 'Completed',
    highlights: [
      'Gathered requirements from customer regarding UI design based on the nature of business.[cite: 1]',
      'Designed web UI as per customer needs.[cite: 1]',
      'Suggested for improvements in the current design.[cite: 1]',
      'Created custom graphics sets such as logo designs, banners etc.[cite: 1]',
      'Focused on responsiveness of the websites.[cite: 1]'
    ],
    techs: ['UI Design', 'Graphics', 'Responsive UI'],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exp-heading',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo('.exp-entry',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-list', start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="exp-heading" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>03 — Experience</div>
          <h2 className="section-heading">Where I&apos;ve worked</h2>
        </div>

        <div className="exp-list" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {entries.map(({ role, org, period, type, highlights, techs }) => (
            <div
              key={role + org}
              className="exp-entry card"
              style={{ padding: '28px 28px 24px' }}
            >
              <div style={{ display: 'grid', gap: 20 }}>
                {/* Header row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 4 }}>
                      {/* Removing the literal[cite: 1] text in the UI by splitting it if needed, or keeping it as provided */}
                      {role.replace('[cite: 1]', '')}
                    </h3>
                    <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{org.replace('[cite: 1]', '')}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <span style={{
                      fontFamily: 'Geist Mono, monospace', fontSize: 11,
                      padding: '4px 10px',
                      background: type === 'Active' ? 'var(--accent-soft)' : 'var(--surface-hover)',
                      color: type === 'Active' ? 'var(--accent-text)' : 'var(--text-muted)',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid',
                      borderColor: type === 'Active' ? 'color-mix(in srgb, var(--accent) 20%, transparent)' : 'var(--border)',
                    }}>
                      {type === 'Active' && <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', marginRight: 5, marginBottom: 1 }} />}
                      {type}
                    </span>
                    <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, color: 'var(--text-faint)' }}>{period.replace('[cite: 1]', '')}</span>
                  </div>
                </div>

                <div style={{ height: 1, background: 'var(--border)' }} />

                {/* Highlights */}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {highlights.map(h => (
                    <li key={h} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2, fontSize: 12 }}>›</span>
                      {h.replace('[cite: 1]', '')}
                    </li>
                  ))}
                </ul>

                {/* Techs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {techs.map(t => (
                    <span key={t} style={{
                      fontFamily: 'Geist Mono, monospace',
                      fontSize: 11, padding: '3px 10px',
                      background: 'var(--bg)', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-full)',
                      color: 'var(--text-muted)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
