import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const PROJECTS = [
  {
    title: 'AnyConnector',
    category: 'Business Automation Platform',
    tech: ['React', 'Node.js', 'Tailwind', 'Responsive Web'],
    image: '/anyconnector-mockup.svg',
    link: 'https://anyconnector.com/',
  },
  {
    title: 'Plum Accounting',
    category: 'Accounting & Finance Website',
    tech: ['HTML', 'CSS', 'JavaScript', 'Laravel'],
    image: '/plum-accounting-mockup.svg',
    link: 'https://plumaccounting.com/',
  },
  {
    title: 'Plum Payroll',
    category: 'Payroll Solutions Website',
    tech: ['React', 'HTML', 'CSS', 'Responsive Design'],
    image: '/plum-payroll-mockup.svg',
    link: 'https://plumpayroll.com/',
  },
]

interface MouseState {
  x: number
  y: number
  vx: number
  vy: number
}

export default function Projects() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [imageMouse, setImageMouse] = useState({ x: 0, y: 0 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const imageAreaRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const prevMouseRef = useRef({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX
      const currentY = e.clientY

      const vx = currentX - prevMouseRef.current.x
      const vy = currentY - prevMouseRef.current.y
      setVelocity({ x: vx * 0.1, y: vy * 0.1 })

      setMousePos({ x: currentX, y: currentY })
      prevMouseRef.current = { x: currentX, y: currentY }

      if (hoveredIdx !== null && imageAreaRef.current) {
        const rect = imageAreaRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setImageMouse({
          x: Math.max(0, Math.min(x, rect.width)),
          y: Math.max(0, Math.min(y, rect.height))
        })

        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotX = (y - centerY) * 0.03
        const rotY = (x - centerX) * -0.03
        setRotation({ x: rotX, y: rotY })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [hoveredIdx])

  return (
    <section id="projects" ref={containerRef} className="section" style={{ position: 'relative', background: 'var(--bg-secondary)', overflow: 'hidden' }}>

      {/*
        Pure CSS Animations jo React ke re-renders pe kabhi nahi rukengi.
        Jab tak hover rahega, ye lagaatar chalti rahengi.
      */}
      <style>{`
        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes sweepAnimation {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        @keyframes spinAnimation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseAnimation {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }
      `}</style>

      <div className="container">
        <div style={{ marginBottom: 80, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h2 className="section-heading" style={{ marginBottom: 16 }}>Selected Works</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 18, maxWidth: 400 }}>
              A collection of projects showcasing my focus on interaction, design, and performance.
            </p>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          {/* List View */}
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
            {PROJECTS.map((project, idx) => (
              <div
                key={idx}
                ref={(el) => { cardRefs.current[idx] = el }}
                style={{ position: 'relative' }}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => { setHoveredIdx(null) }}
                  style={{
                    display: 'flex', // Flex kiya for better spacing
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap', // Taki chhote screen pe toot na jaye
                    gap: '24px',
                    padding: '40px 32px', // GAPPING FIX: Left/Right space added
                    borderBottom: '1px solid var(--border)',
                    textDecoration: 'none',
                    position: 'relative',
                    zIndex: 2,
                    background: hoveredIdx === idx ? 'linear-gradient(135deg, rgba(124,58,237,0.04) 0%, rgba(96,165,250,0.04) 100%)' : 'transparent',
                    borderRadius: 'var(--radius)',
                    transition: 'background 0.4s ease-out, opacity 0.3s ease-out',
                    opacity: hoveredIdx === null || hoveredIdx === idx ? 1 : 0.4,
                  }}
                >
                  <div style={{ flex: '1 1 min-content' }}>
                    <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, color: 'var(--accent)', marginBottom: 12 }}>
                      0{idx + 1} — {project.category}
                    </div>
                    {/* HEADING UI FIX: Background dabbe ko hataya aur clean colors dale */}
                    <h3 style={{
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      transform: hoveredIdx === idx ? 'translateX(16px)' : 'translateX(0)',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      color: hoveredIdx === idx ? 'var(--accent)' : 'var(--text)',
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      {project.title}
                    </h3>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 12,
                    opacity: hoveredIdx === idx ? 1 : 0.6,
                    transition: 'opacity 0.4s ease',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    {project.tech.map((t, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.9, opacity: 0.8, y: 0 }}
                        animate={hoveredIdx === idx ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0.8, y: 0 }}
                        transition={{ delay: i * 0.05, type: 'spring', stiffness: 400, damping: 30 }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid',
                          borderColor: hoveredIdx === idx ? 'color-mix(in srgb, var(--accent) 30%, transparent)' : 'var(--border)',
                          fontSize: 13,
                          fontFamily: 'Geist Mono, monospace',
                          background: hoveredIdx === idx ? 'var(--accent-soft)' : 'transparent',
                          color: hoveredIdx === idx ? 'var(--accent-text)' : 'var(--text)',
                          transition: 'all 0.3s ease',
                          boxShadow: hoveredIdx === idx ? '0 4px 12px rgba(124, 58, 237, 0.15)' : 'none',
                        }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Floating Image Reveal (Desktop Only) */}
          <motion.div
            ref={imageAreaRef}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 480,
              height: 580,
              pointerEvents: 'none',
              zIndex: 1,
              perspective: '1500px',
            }}
            animate={{
              opacity: hoveredIdx !== null ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block"
          >
            {/* Primary Cursor Glow */}
            <motion.div
              animate={{ x: imageMouse.x - 80, y: imageMouse.y - 80 }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              style={{
                position: 'absolute',
                width: 160,
                height: 160,
                background: 'radial-gradient(circle, var(--accent) 0%, transparent 60%)',
                borderRadius: '50%',
                zIndex: 0,
                filter: 'blur(40px)',
                opacity: 0.45,
              }}
            />

            {/* Continuous Spinning Shimmer */}
            <motion.div
              animate={{ x: imageMouse.x - 100, y: imageMouse.y - 100 }}
              transition={{ type: 'spring', stiffness: 600, damping: 40 }}
              style={{ position: 'absolute', width: 200, height: 200, zIndex: 0 }}
            >
              <div style={{
                width: '100%', height: '100%',
                background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.2) 90deg, transparent 360deg)',
                borderRadius: '50%',
                filter: 'blur(30px)',
                animation: hoveredIdx !== null ? 'spinAnimation 4s linear infinite' : 'none'
              }} />
            </motion.div>

            {/* Project Image Cards */}
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={idx}
                animate={{
                  opacity: hoveredIdx === idx ? 1 : 0,
                  scale: hoveredIdx === idx ? 1 : 0.85,
                  // TILT based on mouse position & speed
                  rotateX: hoveredIdx === idx ? rotation.x + (velocity.y * 1.5) : 0,
                  rotateY: hoveredIdx === idx ? rotation.y - (velocity.x * 1.5) : 0,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: hoveredIdx === idx
                    ? '0 30px 80px rgba(124, 58, 237, 0.3), 0 0 40px rgba(124, 58, 237, 0.15)'
                    : '0 10px 30px rgba(0, 0, 0, 0.2)',
                  border: '1px solid var(--border)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/*
                  Inner Wrapper CSS ke through CONTINUOUSLY float karega.
                  Framer Motion mouse interact handle karega.
                */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  animation: hoveredIdx === idx ? 'floatAnimation 3.5s ease-in-out infinite' : 'none',
                }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: hoveredIdx === idx ? 'brightness(1.05)' : 'brightness(0.95)',
                      transition: 'filter 0.4s ease',
                    }}
                  />

                  {/* Sweeping Glare Effect - Lagaatar ghoomega */}
                  <div style={{
                    position: 'absolute',
                    top: 0, bottom: 0, left: 0,
                    width: '60%',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    pointerEvents: 'none',
                    animation: hoveredIdx === idx ? 'sweepAnimation 2.5s ease-in-out infinite' : 'none',
                  }} />
                </div>
              </motion.div>
            ))}

            {/* Continuous Pulsing Particles */}
            {hoveredIdx !== null && (
              <>
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    animate={{
                      x: Math.sin(i) * imageMouse.x * 0.25 + (velocity.x * (i + 1.2)),
                      y: Math.cos(i) * imageMouse.y * 0.25 + (velocity.y * (i + 1.2)),
                    }}
                    transition={{ type: 'spring', stiffness: 150 + i * 40, damping: 15 + i * 5 }}
                    style={{
                      position: 'absolute',
                      width: 70 - i * 15,
                      height: 70 - i * 15,
                      zIndex: i,
                    }}
                  >
                    <div style={{
                      width: '100%', height: '100%',
                      background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
                      borderRadius: '50%',
                      filter: 'blur(20px)',
                      animation: `pulseAnimation ${1.5 + (i * 0.4)}s ease-in-out infinite`
                    }} />
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
