import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    // If it's a mobile screen or a touch device, prevent loading mouse events
    if (window.innerWidth <= 768 || window.matchMedia("(any-pointer: coarse)").matches) {
      setIsDesktop(false)
      return
    }

    const cursor = cursorRef.current!

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' })
    }

    const onEnter = () => {
      gsap.to(cursor, { scale: 3, background: 'var(--text)', mixBlendMode: 'difference', opacity: 1, duration: 0.3 })
    }
    const onLeave = () => {
      gsap.to(cursor, { scale: 1, background: 'var(--accent)', mixBlendMode: 'normal', opacity: 0.5, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)

    const attach = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      obs.disconnect()
    }
  }, [])

  // If not on desktop, do not render the custom cursor div at all
  if (!isDesktop) return null

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'var(--accent)',
        opacity: 0.5,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s, height 0.2s',
      }}
    />
  )
}
