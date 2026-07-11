import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const obj = { v: 0 }
    const tl = gsap.timeline()

    tl.fromTo(".ld-logo", { opacity: 0, y: 20 }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    tl.to(
      obj,
      {
        v: 100,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate() {
          const n = Math.floor(obj.v)
          if (numRef.current)
            numRef.current.textContent = String(n).padStart(3, "0")
          if (lineRef.current)
            lineRef.current.style.transform = `scaleX(${n / 100})`
        },
      },
      "-=0.1",
    )

    // Dramatic curtain reveal
    tl.to(
      rootRef.current,
      {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete() {
          if (rootRef.current) rootRef.current.style.display = "none"
          onComplete()
        },
      },
      "+=0.2",
    )
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        background: "var(--text)",
        color: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 16,
        }}
      >
        {/* Logo */}
        <div className="ld-logo">
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 800,
              fontSize: 24,
              letterSpacing: "-0.04em",
              color: "var(--bg)",
            }}
          >
            Aniket Tyagi
          </div>
          <div
            style={{
              fontFamily: "Geist Mono, monospace",
              fontSize: 10,
              letterSpacing: "0.15em",
              color: "var(--border-strong)",
              marginTop: 4,
              textTransform: "uppercase",
            }}
          >
            Portfolio © {new Date().getFullYear()}
          </div>
        </div>

        <span
          ref={numRef}
          style={{
            fontFamily: "Geist Mono, monospace",
            fontSize: 48,
            fontWeight: 300,
            lineHeight: 1,
            color: "var(--bg)",
          }}
        >
          000
        </span>
      </div>

      {/* Progress */}
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div
          style={{
            width: "100%",
            height: 2,
            background: "rgba(255,255,255,0.1)",
            overflow: "hidden",
          }}
        >
          <div
            ref={lineRef}
            style={{
              height: "100%",
              background: "var(--bg)",
              transformOrigin: "left",
              transform: "scaleX(0)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
