import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const floatersRef = useRef<HTMLDivElement>(null)

  const skills = [
    "React & Next.js",
    "Node.js",
    "Jekyll",
    "UI/UX & Figma",
    "Laravel & Drupal",
    "HTML & Sass",
    "Bootstrap",
    "PSD to HTML",
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Compact Reveal Animation
      gsap.fromTo(".bento-item", { opacity: 0, y: 30, scale: 0.98 }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      })

      // Smooth Organic Float for Capsules
      gsap.to(".skill-floater", {
        y: -6,
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
          each: 0.1,
          from: "random",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      className="section"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
        padding: "60px 0",
      }}
    >
      <style>{`
        /* Compact Bento Grid System */
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px; /* Gaps reduced for a tighter look */
        }

        .bento-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg); /* Slightly sharper corners */
          padding: 24px; /* Reduced padding */
          position: relative;
          overflow: hidden;
        }

        /* 12-Column Layout for Desktop to perfectly control widths without stretching */
        @media (min-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(12, 1fr);
            align-items: stretch;
          }
          .bento-top-row { grid-column: span 12; }
          .bento-left-col { grid-column: span 5; display: flex; flex-direction: column; gap: 16px; }
          .bento-right-col { grid-column: span 7; display: flex; flex-direction: column; }
        }

        /* Capsule Hover */
        .skill-capsule {
          display: inline-block;
          padding: 8px 16px; /* Smaller capsules */
          border-radius: 100px;
          border: 1px solid var(--border);
          font-size: 13px;
          font-family: 'Geist Mono', monospace;
          color: var(--text-secondary);
          background: var(--bg);
          cursor: crosshair;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          z-index: 2;
        }

        .skill-capsule:hover {
          transform: scale(1.08);
          background: var(--accent-soft);
          border-color: var(--accent);
          color: var(--accent-text);
          box-shadow: 0 5px 15px rgba(124, 58, 237, 0.2);
        }

        /* Tech Scanner Line */
        @keyframes scanLine {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        .scanner {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          box-shadow: 0 0 10px var(--accent);
          animation: scanLine 3.5s linear infinite;
          z-index: 1;
          pointer-events: none;
        }
      `}</style>

      {/* Background Subtle Ambiance */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 60%)",
          opacity: 0.03,
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div className="container" ref={containerRef}>
        <div style={{ marginBottom: 32 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            01 — About Me
          </div>
        </div>

        <div className="bento-grid">
          {/* TOP INTRO CARD (Compact text) */}
          <div className="bento-box bento-top-row bento-item">
            <h2
              className="section-heading"
              style={{
                marginBottom: 16,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                lineHeight: 1.1,
              }}
            >
              Building fast, scalable <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, var(--text-muted) 0%, var(--accent) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                digital experiences.
              </span>
            </h2>
            <div
              style={{
                fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                maxWidth: "850px",
              }}
            >
              <p>
                I am{" "}
                <span style={{ color: "var(--text)", fontWeight: 600 }}>
                  Aniket Tyagi
                </span>
                , a frontend developer and designer focused on creating
                polished, highly responsive, and user-friendly interfaces.
              </p>
              <p>
                My background spans pure UI/UX design to robust technical
                execution using modern workflows. I specialize in delivering
                fast, scalable sites—whether translating complex layouts to
                pixel-perfect code, or building full-scale web applications.
              </p>
            </div>
          </div>

          {/* LEFT COLUMN: Image + Stats */}
          <div className="bento-left-col">
            {/* Image Card (Height reduced to 240px) */}
            <div
              className="bento-box bento-item"
              style={{ padding: 0, height: "240px", flexShrink: 0 }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop"
                  alt="Workspace"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "contrast(1.1) brightness(0.9)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, var(--bg) 0%, transparent 60%)",
                  }}
                />

                {/* Compact Tech Badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(10px)",
                    padding: "6px 12px",
                    borderRadius: "100px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div style={{ position: "relative", width: 6, height: 6 }}>
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: "#10B981",
                        animation:
                          "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: "#10B981",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: "Geist Mono, monospace",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  >
                    Available for work
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Row (Height matching) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                flexGrow: 1,
              }}
            >
              <div
                className="bento-box bento-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "20px 12px",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(2rem, 4vw, 2.5rem)",
                    fontWeight: 800,
                    color: "var(--text)",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  8<span style={{ color: "var(--accent)" }}>+</span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    fontFamily: "Geist Mono, monospace",
                    textTransform: "uppercase",
                  }}
                >
                  Years Exp
                </div>
              </div>

              <div
                className="bento-box bento-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "20px 12px",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(2rem, 4vw, 2.5rem)",
                    fontWeight: 800,
                    color: "var(--text)",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  10<span style={{ color: "var(--accent)" }}>+</span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    fontFamily: "Geist Mono, monospace",
                    textTransform: "uppercase",
                  }}
                >
                  Websites
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Creative Stack */}
          <div className="bento-right-col">
            <div
              className="bento-box bento-item"
              style={{
                background:
                  "linear-gradient(160deg, var(--surface) 0%, rgba(124, 58, 237, 0.04) 100%)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div className="scanner" />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 24,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "var(--radius-lg)",
                    background: "var(--accent-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: 4,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Creative Stack
                  </h3>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 14,
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    Bridging UI design and frontend execution with pixel-perfect
                    precision.
                  </p>
                </div>
              </div>

              {/* COMPACT SKILLS CAPSULES */}
              <div
                ref={floatersRef}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px 10px",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {skills.map((skill, i) => (
                  <div key={i} className="skill-floater">
                    <span className="skill-capsule">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
