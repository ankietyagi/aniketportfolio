import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import InteractiveWebGL from "./InteractiveWebGL"

const ROLES = [
  "Web Designer",
  "Frontend Developer",
  "UI/UX Developer",
  "React Enthusiast",
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % ROLES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={containerRef}
      id="home"
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <InteractiveWebGL />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30vh",
          zIndex: 1,
          background: "linear-gradient(to bottom, transparent, var(--bg))",
        }}
      />

      <motion.div
        className="container"
        style={{ position: "relative", zIndex: 2, y, opacity }}
      >
        <div style={{ maxWidth: 800, marginTop: "10vh" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                borderRadius: "var(--radius-full)",
                padding: "6px 16px",
                fontFamily: "Geist Mono, monospace",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              <span
                className="cursor-blink"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                }}
              />
              Available for freelance & full-time roles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              color: "var(--text)",
              marginBottom: 20,
              position: "relative",
              left: "-4px",
            }}
          >
            Aniket Tyagi
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              height: 40,
              marginBottom: 32,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                fontWeight: 500,
                fontFamily: "Geist Mono, monospace",
                color: "var(--text-muted)",
              }}
            >
              <span style={{ color: "var(--accent)" }}>{"/>"}</span>{" "}
              <motion.span
                key={roleIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                style={{ display: "inline-block" }}
              >
                {ROLES[roleIdx]}
              </motion.span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              maxWidth: 540,
              marginBottom: 48,
            }}
          >
            I design and build modern, responsive websites with a strong focus
            on clean UI, smooth interactions, and user-centered experiences.
            From PSD/Figma to polished frontends, I turn ideas into fast,
            functional web products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 16 }}
          >
            <a
              href="#projects"
              className="btn btn-primary btn-lg"
              data-hover
              style={{ borderRadius: "var(--radius-full)" }}
            >
              View Projects
            </a>
            <a
              href="mailto:anityagi8860@gmail.com"
              className="btn btn-secondary btn-lg"
              data-hover
              style={{ borderRadius: "var(--radius-full)" }}
            >
              Hire Me
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: 40,
          right: "5vw",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 12,
          transform: "rotate(90deg)",
          transformOrigin: "right center",
        }}
      >
        <span
          style={{
            fontFamily: "Geist Mono, monospace",
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "var(--text-faint)",
            textTransform: "uppercase",
          }}
        >
          Scroll to explore
        </span>
        <div
          style={{
            width: 60,
            height: 1,
            background:
              "linear-gradient(to right, var(--text-faint), transparent)",
          }}
        />
      </motion.div>
    </section>
  )
}
