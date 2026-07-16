import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'


export default function CustomCursor() {
  const mainCursorRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const trailCount = 8 // Number of trailing dots

  useEffect(() => {
    // Disable custom cursor on touch devices or small screens
    const isTouch = window.matchMedia("(any-pointer: coarse)").matches || window.innerWidth <= 768

    if (isTouch) {
      document.body.style.cursor = 'auto'
      if (mainCursorRef.current) mainCursorRef.current.style.display = 'none'
      trailRefs.current.forEach(dot => { if (dot) dot.style.display = 'none' })
      return
    }

    document.body.style.cursor = 'none'

    // Center the origins and set initial decreasing scales for the tail
    gsap.set(mainCursorRef.current, { xPercent: -50, yPercent: -50 })

    trailRefs.current.forEach((dot, index) => {
      gsap.set(dot, {
        xPercent: -50,
        yPercent: -50,
        scale: 1 - (index * 0.08),
        opacity: 0
      })
    })

    let hasMoved = false
    let spinTween: gsap.core.Tween | null = null
    let pulseTween: gsap.core.Tween | null = null

    const onMove = (e: MouseEvent) => {
      if (!hasMoved) {
        // Fade everything in on first movement
        gsap.to(mainCursorRef.current, { opacity: 1, duration: 0.3 })
        trailRefs.current.forEach((dot, index) => {
          gsap.to(dot, { opacity: 0.8 - (index * 0.08), duration: 0.3 })
        })
        hasMoved = true
      }

      // Main dot stays snappy
      gsap.to(mainCursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power3.out'
      })

      // The staggered trailing dots
      gsap.to(trailRefs.current, {
        x: e.clientX,
        y: e.clientY,
        stagger: 0.02,
        duration: 0.4,
        ease: 'power3.out'
      })
    }

    const onEnter = () => {
      // 1. Expand the main cursor and change its style
      gsap.to(mainCursorRef.current, {
        scale: 3,
        backgroundColor: 'rgba(var(--cursor-glow), 0.15)',
        border: '1.5px dashed rgb(var(--cursor-glow))',
        duration: 0.3,
        ease: 'back.out(1.5)'
      })

      // 2. Start the continuous spinning animation
      spinTween = gsap.to(mainCursorRef.current, {
        rotation: "+=360",
        duration: 4,
        repeat: -1,
        ease: 'linear'
      })

      // 3. Start a soft breathing/pulsing animation
      pulseTween = gsap.to(mainCursorRef.current, {
        scale: 3.3, // Pulses slightly larger than 3
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // 4. Collapse and hide the trail dots so they don't clutter the hover
      gsap.to(trailRefs.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        overwrite: 'auto'
      })
    }

    const onLeave = () => {
      // 1. Kill the continuous animations
      if (spinTween) spinTween.kill()
      if (pulseTween) pulseTween.kill()

      // 2. Revert main cursor back to a solid dot
      gsap.to(mainCursorRef.current, {
        scale: 1,
        rotation: 0, // Reset rotation cleanly
        backgroundColor: 'rgb(var(--cursor-glow))',
        border: '0px solid transparent',
        duration: 0.3,
        ease: 'power2.out'
      })

      // 3. Restore the trail dots sizes and opacity
      trailRefs.current.forEach((dot, index) => {
        gsap.to(dot, {
          scale: 1 - (index * 0.08),
          opacity: 0.8 - (index * 0.08),
          duration: 0.3
        })
      })
    }

    window.addEventListener('mousemove', onMove)

    const attach = () => {
      document.querySelectorAll('a, button, input, [data-hover]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
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
      document.querySelectorAll('a, button, input, [data-hover]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {Array.from({ length: trailCount }).map((_, i) => (
        <div
          key={i}
          className="cursor-trail"
          ref={(el) => (trailRefs.current[i] = el)}
        />
      ))}
      <div className="cursor-main" ref={mainCursorRef} />
    </>
  )
}
