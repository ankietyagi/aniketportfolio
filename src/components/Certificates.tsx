import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const certs = [
  {
    title: "Diploma in HTML & CSS",
    issuer: "Ducat Noida",
    year: "2016",
    desc: "Core training in HTML, CSS, and modern web structure fundamentals.",
  },
  {
    title: "B.A. Qualification",
    issuer: "Academic Background",
    year: "2015",
    desc: "Strong academic foundation alongside design and web development skills.",
  },
  {
    title: "Design & Web UI Practice",
    issuer: "Hands-on Experience",
    year: "2016–Present",
    desc: "Continuous learning through real client projects, UI work, and responsive website delivery.",
  },
]

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cert-heading", { opacity: 0, y: 24 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      })
      gsap.fromTo(".cert-item", { opacity: 0, y: 24 }, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cert-list", start: "top 80%" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="section"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="container">
        <div className="cert-heading" style={{ marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            06 — Certificates
          </div>
          <h2 className="section-heading">Certifications & learning</h2>
        </div>

        <div className="cert-list" style={{ display: "grid", gap: 12 }}>
          {certs.map(({ title, issuer, year, desc }, i) => (
            <div
              key={title}
              className="cert-item card"
              style={{
                padding: "20px 24px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {/* Cert icon */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--radius)",
                      background: "var(--accent-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "var(--accent-text)" }}
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        color: "var(--text)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text-muted)",
                        marginTop: 2,
                      }}
                    >
                      {issuer}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Geist Mono, monospace",
                      fontSize: 12,
                      color: "var(--text-faint)",
                    }}
                  >
                    {year}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      color: "var(--text-faint)",
                      transition: "transform 0.2s",
                      transform:
                        active === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Expanded content */}
              {active === i && (
                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
