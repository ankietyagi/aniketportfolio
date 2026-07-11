import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    name: "Design & UI",
    skills: [
      { name: "Photoshop", level: 90 },
      { name: "Illustrator", level: 82 },
      { name: "Figma", level: 88 },
      { name: "UI/UX", level: 92 },
      { name: "Responsive Design", level: 95 },
      { name: "Wireframing", level: 87 },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "HTML", level: 96 },
      { name: "CSS", level: 95 },
      { name: "JavaScript", level: 88 },
      { name: "Bootstrap", level: 90 },
      { name: "React", level: 84 },
      { name: "TailwindCSS", level: 82 },
    ],
  },
  {
    name: "CMS & Backend",
    skills: [
      { name: "Drupal", level: 78 },
      { name: "Laravel", level: 80 },
      { name: "Node.js", level: 76 },
      { name: "MongoDB", level: 74 },
      { name: "Git & GitHub", level: 84 },
      { name: "Jekyll", level: 77 },
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skills-heading", { opacity: 0, y: 24 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      })
      gsap.fromTo(".skill-col", { opacity: 0, y: 32 }, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".skills-grid", start: "top 80%" },
      })
    }, sectionRef)

    // Animate bars on scroll into view
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const level = el.dataset.level || "0"
            gsap.to(el, {
              width: level + "%",
              duration: 1.1,
              ease: "power3.out",
            })
            barObserver.unobserve(el)
          }
        })
      },
      { threshold: 0.1 },
    )

    document
      .querySelectorAll(".skill-bar-fill")
      .forEach((el) => barObserver.observe(el))

    return () => {
      ctx.revert()
      barObserver.disconnect()
    }
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="container">
        <div className="skills-heading" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            02 — Skills
          </div>
          <h2 className="section-heading">My technical toolkit</h2>
        </div>

        <div className="skills-grid" style={{ display: "grid", gap: 24 }}>
          {categories.map(({ name, skills }) => (
            <div
              key={name}
              className="skill-col card"
              style={{ padding: "28px 28px 24px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--accent)",
                  }}
                />
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "var(--text)",
                  }}
                >
                  {name}
                </span>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {skills.map(({ name: skill, level }) => (
                  <div key={skill}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--text-secondary)",
                        }}
                      >
                        {skill}
                      </span>
                      <span
                        style={{
                          fontFamily: "Geist Mono, monospace",
                          fontSize: 11,
                          color: "var(--text-faint)",
                        }}
                      >
                        {level}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 3,
                        background: "var(--border)",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        className="skill-bar-fill"
                        data-level={level}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .skills-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
