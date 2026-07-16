import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '../ThemeContext'

const NAV = ['About', 'Skills', 'Projects', 'Contact']

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Navbar() {
  const navRef   = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { theme, toggle }       = useTheme()

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'power3.out' }
    )
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 9000,
        transition: 'all 0.3s ease',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        background: scrolled ? 'color-mix(in srgb, var(--bg) 85%, transparent)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em',
            color: 'var(--text)', background: 'none', border: 'none', cursor: 'none',
          }}
        >
          Aniket<span style={{ color: 'var(--accent)' }}>.</span>
        </button>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {NAV.map(item => (
            <button key={item} className="nav-link" onClick={() => scrollTo(item)}
              style={{ background: 'none', border: 'none', cursor: 'none' }}>
              {item}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 8px' }} />
          <button
            onClick={toggle}
            className="btn btn-ghost btn-sm"
            style={{ cursor: 'none', padding: '7px 10px' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href="/AniketTyagi-Resume.pdf"
            download
            className="btn btn-primary btn-sm"
            style={{ cursor: 'none' }}
          >
            Resume
          </a>
        </div>

        {/* Mobile: theme + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="mobile-nav-controls">
          <button onClick={toggle} className="btn btn-ghost btn-sm" style={{ cursor: 'none', padding: '7px 10px' }}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', cursor: 'none', color: 'var(--text)', padding: 8 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          background: 'var(--bg)',
          borderTop: '1px solid var(--border)',
          padding: '12px 24px 20px',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {NAV.map(item => (
            <button key={item} onClick={() => scrollTo(item)}
              className="nav-link"
              style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'none', width: '100%' }}
            >
              {item}
            </button>
          ))}
          <a
            href="/src/imports/AniketTyagi-Resume.pdf"
            download
            className="btn btn-primary btn-sm"
            style={{ marginTop: 8, cursor: 'none', justifyContent: 'center' }}
          >
            Download Resume
          </a>
        </div>
      )}

      <style>{`
        .desktop-nav { display: none !important; }
        .mobile-nav-controls { display: flex !important; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav-controls { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
