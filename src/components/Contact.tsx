import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const links = [
  {
    label: 'Email', value: 'anityagi8860@gmail.com', href: 'mailto:anityagi8860@gmail.com',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  },
  {
    label: 'Phone', value: '+91 85270 70243', href: 'tel:+918527070243',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  },
  {
    label: 'LinkedIn', value: 'aniket-tyagi', href: 'https://www.linkedin.com/in/aniket-tyagi-1243643a3/',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Advanced Entry Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })

      // Heading Reveal
      tl.fromTo('.anim-heading',
        { opacity: 0, y: 50, rotateX: -15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power4.out', transformStyle: 'preserve-3d' }
      )

      // 3D Staggered Form Fields
      tl.fromTo('.anim-field',
        { opacity: 0, y: 40, rotateX: -10 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        "-=0.6"
      )

      // Magnetic Cards Stagger
      tl.fromTo('.anim-card',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'expo.out' },
        "-=0.8"
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Modal Enter Animation
useEffect(() => {
  if (showModal) {
    const scrollY = window.scrollY

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''

      document.documentElement.style.overflow = ''

      window.scrollTo(0, scrollY)
    }
  }
}, [showModal])

  // Top-Notch Magnetic Hover Logic
  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    gsap.to(target, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' })
  }

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1.2, 0.3)' })
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // =========== ACCESS KEY YAHAN PASTE KARNI HAI ===========
    const accessKey = "YOUR_ACCESS_KEY_HERE"

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          from_name: "anikettyagi.site Contact",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitting(false)
        setShowModal(true)
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setIsSubmitting(false)
        alert("Transmission Failed. Please try again.")
      }
    } catch (error) {
      setIsSubmitting(false)
      alert("Network Error.")
    }
  }

  // Handle Modal Close Animation before unmounting
const closeModal = () => {
  gsap.to(modalRef.current, {
    opacity: 0,
    scale: 0.9,
    y: 20,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      setShowModal(false)
    },
  })
}

  return (
    <section id="contact" ref={sectionRef} className="section" style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border)', padding: '100px 0', background: 'var(--bg)', perspective: '1000px' }}>

      <style>{`
        /* Premium Input Fields */
        .glass-input {
          width: 100%;
          background: color-mix(in srgb, var(--surface) 50%, transparent);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          color: var(--text);
          font-family: inherit;
          font-size: 15px;
          outline: none;
          backdrop-filter: blur(8px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-input::placeholder { color: var(--text-muted); opacity: 0.6; }
        .glass-input:focus {
          border-color: var(--accent);
          background: var(--surface);
          box-shadow: 0 10px 25px color-mix(in srgb, var(--accent) 15%, transparent), inset 0 0 0 1px var(--accent);
          transform: translateY(-2px);
        }

        /* Magnetic Link Cards */
        .magnetic-card {
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 18px;
          background: color-mix(in srgb, var(--surface) 60%, transparent);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          text-decoration: none;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          position: relative;
          overflow: hidden;
          will-change: transform;
        }
        .magnetic-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--accent) 10%, transparent) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.4s; pointer-events: none;
        }
        .magnetic-card:hover {
          border-color: var(--accent);
          box-shadow: 0 20px 40px color-mix(in srgb, var(--bg) 80%, transparent);
          z-index: 10;
        }
        .magnetic-card:hover::before { opacity: 1; }

        /* Modal Overlay */
        .modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 99999;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 24px;

        background: rgba(0,0,0,0.18);

        backdrop-filter: blur(25px) saturate(160%);
        -webkit-backdrop-filter: blur(25px) saturate(160%);
        }
        @keyframes fadeOverlay { to { opacity: 1; } }

        /* SVG Draw Animation for Checkmark */
        @keyframes drawSVG {
          0% { stroke-dasharray: 0, 100; stroke-dashoffset: 0; }
          100% { stroke-dasharray: 100, 100; stroke-dashoffset: 0; }
        }

        /* =========================================
           SMOOTH MESH GRADIENT BACKGROUND
           ========================================= */
        .mesh-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        .mesh-blob {
          position: absolute;
          filter: blur(90px);
          border-radius: 50%;
          animation: floatMesh 20s infinite alternate ease-in-out;
        }
        .mesh-1 {
          top: -10%; left: -10%; width: 50vw; height: 50vw;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent) 15%, transparent) 0%, transparent 70%);
          animation-delay: 0s;
        }
        .mesh-2 {
          bottom: -20%; right: -10%; width: 60vw; height: 60vw;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent) 12%, transparent) 0%, transparent 70%);
          animation-delay: -5s;
        }
        .mesh-3 {
          top: 30%; left: 50%; width: 40vw; height: 40vw;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 60%);
          animation-delay: -10s;
        }
        @keyframes floatMesh {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(8%, 12%) scale(1.1); }
          66% { transform: translate(-10%, 5%) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @media (max-width: 900px) {
            .magnetic-card {padding: 12px !important; }
        }

        @media (min-width: 900px) {
          .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
        }
      `}</style>

      {/* Abstract Mesh Gradient Background */}
      <div className="mesh-bg">
        <div className="mesh-blob mesh-1"></div>
        <div className="mesh-blob mesh-2"></div>
        <div className="mesh-blob mesh-3"></div>
      </div>

      {/* SUCCESS MODAL (Interactive & Animated) */}
      {showModal && (
        <div className="modal-overlay">
<div ref={modalRef} style={{
  width: '100%',
  maxWidth: '460px',

  background: 'rgba(255,255,255,0.08)',

  backdropFilter: 'blur(35px) saturate(180%)',
  WebkitBackdropFilter: 'blur(35px) saturate(180%)',

  border: '1px solid rgba(255,255,255,0.18)',

  borderRadius: '28px',

  padding: '50px 40px',

  textAlign: 'center',

  boxShadow:
    '0 30px 80px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.2)',

  position: 'relative',

  overflow: 'hidden',
}}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent)' }} />

            <div style={{
              width: 72, height: 72, margin: '0 auto 24px', borderRadius: '50%',
              background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent)', boxShadow: '0 0 30px color-mix(in srgb, var(--accent) 20%, transparent)'
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: '100', animation: 'drawSVG 0.8s ease-out forwards' }}>
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>

            <h3 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              Message Received
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.6, marginBottom: 36 }}>
              Your creative payload has been successfully delivered. I will review the details and get back to you shortly.
            </p>

            <button
              onClick={closeModal}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              style={{
                width: '100%', padding: '16px', background: 'var(--accent)',
                color: 'var(--bg)', border: 'none', borderRadius: 'var(--radius-full)',
                fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'box-shadow 0.3s ease',
                boxShadow: '0 10px 25px color-mix(in srgb, var(--accent) 40%, transparent)',
                willChange: 'transform'
              }}
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        <div className="anim-heading" style={{ marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>07 — Contact</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Let&apos;s build <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--text) 0%, var(--accent) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>
              something epic.
            </span>
          </h2>
        </div>

        <div className="contact-grid">

          {/* LEFT: Premium Animated Form */}
          <div style={{ position: 'relative' }}>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="anim-field">
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
                  <input className="glass-input" placeholder="Full Name" value={form.name} onChange={set('name')} required data-gramm="false" />
                </div>
                <div className="anim-field">
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                  <input type="email" className="glass-input" placeholder="youremail@xyz.com" value={form.email} onChange={set('email')} required data-gramm="false" />
                </div>
              </div>
              <div className="anim-field">
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subject</label>
                <input className="glass-input" placeholder="Project Inquiry" value={form.subject} onChange={set('subject')} required data-gramm="false" />
              </div>
              <div className="anim-field">
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</label>
                <textarea className="glass-input" rows={5} placeholder="Tell me about your vision..." value={form.message} onChange={set('message')} required style={{ resize: 'vertical' }} data-gramm="false" />
              </div>

              <div className="anim-field" style={{ marginTop: 0, marginBottom: 30 }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseMove={!isSubmitting ? handleMagneticMove : undefined}
                  onMouseLeave={!isSubmitting ? handleMagneticLeave : undefined}
                  style={{
                    alignSelf: 'flex-start', padding: '16px 36px',
                    background: 'var(--text)', color: 'var(--bg)', border: 'none',
                    borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: 15,
                    display: 'inline-flex', alignItems: 'center', gap: 12,
                    cursor: isSubmitting ? 'wait' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                    boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                    willChange: 'transform'
                  }}
                >
                  {isSubmitting ? 'Transmitting...' : (
                    <>
                      Send Message
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Magnetic Contact Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {links.map(({ label, value, href, icon }) => (
              <a
                key={label}
                href={href}
                className="magnetic-card anim-card"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 'var(--radius-md)', flexShrink: 0,
                  background: 'color-mix(in srgb, var(--accent) 15%, transparent)', color: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 16, color: 'var(--text)', fontWeight: 600 }}>{value}</div>
                </div>
                <div style={{ color: 'var(--accent)', opacity: 0.5 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </a>
            ))}

            {/* Premium Resume Card */}
            <a
              href="/src/imports/AniketTyagi-Resume.pdf"
              download
              className="magnetic-card anim-card"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              style={{
                marginTop: 16,
                background: 'var(--accent)',
                borderColor: 'transparent',
                color: 'var(--bg)',
                boxShadow: '0 15px 30px color-mix(in srgb, var(--accent) 30%, transparent)'
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 'var(--radius-md)', flexShrink: 0,
                background: 'color-mix(in srgb, var(--bg) 20%, transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 2 }}>Download Resume</div>
                <div style={{ fontSize: 13, color: 'color-mix(in srgb, var(--bg) 70%, transparent)', fontFamily: 'Geist Mono, monospace' }}>AniketTyagi-Resume.pdf</div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
