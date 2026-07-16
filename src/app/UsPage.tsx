import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './us.css'

// --- BULLETPROOF GSAP Text Splitter ---
// Uses Flexbox (flex-wrap and gap-x) to guarantee perfect spaces between words on every device.
const SplitTextGSAP = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <div className={`flex flex-wrap justify-center gap-x-[0.35em] gap-y-[0.1em] ${className}`}>
      {text.split(' ').map((word, index) => (
        <div key={index} className="overflow-hidden pb-1">
          <div className="gsap-word opacity-0 translate-y-12">
            {word}
          </div>
        </div>
      ))}
    </div>
  )
}

// --- Cinematic Background Powered by GSAP ---
const CinematicBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".bg-orb-1", { scale: 1.15, x: 60, y: -40, duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut" })
      gsap.to(".bg-orb-2", { scale: 1.25, x: -80, y: 60, duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut" })

      gsap.utils.toArray(".bokeh-particle").forEach((particle: any) => {
        gsap.to(particle, {
          y: "-=200",
          x: `+=${Math.random() * 150 - 75}`,
          opacity: 0.5,
          scale: 1.4,
          duration: Math.random() * 15 + 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })
      })
    }, bgRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={bgRef} className="fixed inset-0 overflow-hidden bg-black pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0008] via-[#050002] to-[#000000] opacity-90" />
      <div className="bg-orb-1 absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#ff004c] mix-blend-screen opacity-10 blur-[120px] md:blur-[200px]" />
      <div className="bg-orb-2 absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#ff4b2b] mix-blend-screen opacity-10 blur-[120px] md:blur-[200px]" />
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="bokeh-particle absolute rounded-full opacity-20"
          style={{
            width: Math.random() * 150 + 50 + 'px',
            height: Math.random() * 150 + 50 + 'px',
            background: `radial-gradient(circle, rgba(255, 75, 115, 0.08) 0%, rgba(0,0,0,0) 70%)`,
            left: Math.random() * 100 + 'vw',
            top: Math.random() * 100 + 'vh',
          }}
        />
      ))}
    </div>
  )
}

export default function UsPage() {
  const [step, setStep] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const stepContainerRef = useRef<HTMLDivElement>(null)

  // 1. GHOST PAGE PROTOCOL
  useEffect(() => {
    document.title = "✨ Just for you...";
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow, noarchive";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  // 2. MASTER GSAP ENTRANCE ANIMATION
  useEffect(() => {
    if (!stepContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".gsap-word", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: "back.out(1.5)",
        delay: 0.1
      });

      tl.fromTo(".gsap-reveal",
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      );
    }, stepContainerRef);

    return () => ctx.revert();
  }, [step]);

  // 3. FINALE FLOATING HEARTS
  useEffect(() => {
    if (step === 5) {
      const interval = setInterval(() => {
        const heart = document.createElement('div')
        heart.classList.add('floating-heart')
        heart.innerHTML = ['❤️', '💖', '💘', '✨'][Math.floor(Math.random() * 4)]
        document.body.appendChild(heart)

        gsap.set(heart, {
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 50,
          scale: Math.random() * 1 + 0.8,
          opacity: 1,
        })

        gsap.to(heart, {
          y: -200,
          x: `+=${Math.random() * 300 - 150}`,
          rotation: Math.random() * 360 - 180,
          duration: Math.random() * 4 + 4,
          ease: 'power1.out',
          onComplete: () => heart.remove(),
        })
      }, 80)
      return () => clearInterval(interval)
    }
  }, [step])

  // 4. GSAP EXIT TRANSITION LOGIC
  const changeStep = (nextStep: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    gsap.to(stepContainerRef.current, {
      opacity: 0,
      y: -40,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        setStep(nextStep);
        gsap.set(stepContainerRef.current, { opacity: 1, y: 0, scale: 1 });
        setIsTransitioning(false);
      }
    });
  }

  return (
    <div className={`us-wrapper font-sans selection:bg-rose-500 selection:text-white ${step === 5 ? 'finale-bg' : ''}`}>
      <LoveCursor />
      <CinematicBackground />

      <main className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-10">

        <div ref={stepContainerRef} className="step-wrapper flex flex-col items-center text-center w-full max-w-6xl">

          {step === 0 && (
            <>
              <SplitTextGSAP text="Hey Beautiful... ✨" className="text-5xl sm:text-6xl md:text-[6rem] font-black tracking-tight text-white drop-shadow-2xl" />

              <div className="h-6 md:h-10 w-full"></div> {/* GUARANTEED GAP */}

              <SplitTextGSAP text="I made something very special just for you." className="text-xl sm:text-2xl md:text-3xl text-rose-100/80 font-light max-w-2xl" />

              <div className="h-24 md:h-32 w-full"></div> {/* GUARANTEED MASSIVE GAP */}

              <div className="gsap-reveal">
                <button className="premium-btn transition-transform hover:scale-105 active:scale-95" onClick={() => changeStep(1)}>
                  Show me
                </button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <SplitTextGSAP text="Wait! Security Check. 🚨" className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl" />

              <div className="h-6 md:h-10 w-full"></div> {/* GUARANTEED GAP */}

              <SplitTextGSAP text="I need to verify it's really you. What is your favorite hobby?" className="text-xl sm:text-2xl md:text-3xl text-rose-100/80 font-light max-w-3xl" />

              <div className="h-24 md:h-32 w-full"></div> {/* GUARANTEED MASSIVE GAP */}

              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center w-full gsap-reveal min-h-[80px]">
                <button className="premium-btn z-10 transition-transform hover:scale-105" onClick={() => changeStep(2)}>
                  Annoying Aniket 😇
                </button>
                <DodgingButton text="Being quiet and normal 🤫" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <SplitTextGSAP text="Identity Confirmed. 🕵️‍♀️" className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl" />

              <div className="h-6 md:h-10 w-full"></div> {/* GUARANTEED GAP */}

              <SplitTextGSAP text="Next question: In this relationship, who is ALWAYS right?" className="text-xl sm:text-2xl md:text-3xl text-rose-100/80 font-light max-w-3xl" />

              <div className="h-24 md:h-32 w-full"></div> {/* GUARANTEED MASSIVE GAP */}

              <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center justify-center w-full gsap-reveal min-h-[80px]">
                <button className="premium-btn z-10 transition-transform hover:scale-105" onClick={() => changeStep(3)}>
                  Aniket is always right 👑
                </button>
                <DodgingButton text="Me, obviously 💅" extreme={true} />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <SplitTextGSAP text="Good Answer. 😏" className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl" />

              <div className="h-6 md:h-10 w-full"></div> {/* GUARANTEED GAP */}

              <SplitTextGSAP text="Do you promise to give me unlimited kisses?" className="text-xl sm:text-2xl md:text-3xl text-rose-100/80 font-light max-w-3xl" />

              <div className="h-24 md:h-32 w-full"></div> {/* GUARANTEED MASSIVE GAP */}

              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center w-full gsap-reveal min-h-[80px]">
                <button className="premium-btn z-10 transition-transform hover:scale-105" onClick={() => changeStep(4)}>
                  Yes, forever! 😘
                </button>
                <DodgingButton text="Eww, no. 🤢" />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <SplitTextGSAP text="Okay, final question..." className="text-4xl sm:text-5xl md:text-6xl font-light text-rose-100/60" />

              <div className="h-6 md:h-10 w-full"></div> {/* GUARANTEED GAP */}

              <SplitTextGSAP text="Do you love me? 🥺" className="text-6xl sm:text-7xl md:text-[6rem] font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] leading-none" />

              <div className="h-24 md:h-32 w-full"></div> {/* GUARANTEED MASSIVE GAP */}

              <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-center justify-center w-full gsap-reveal min-h-[80px]">
                <button
                  className="premium-btn heartbeat-btn !text-2xl !py-6 !px-14 z-10 transition-transform hover:scale-110 active:scale-95"
                  onClick={() => changeStep(5)}
                >
                  Yes, absolutely! ❤️
                </button>

                <DodgingButton text="No 🚫" extreme={true} />
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h1
                className="gsap-reveal text-6xl sm:text-8xl md:text-[8rem] font-black tracking-tighter leading-none"
                style={{ background: 'linear-gradient(135deg, #ff004c 0%, #ff4b2b 100%)', WebkitBackgroundClip: 'text', color: 'transparent', filter: 'drop-shadow(0px 10px 30px rgba(255, 0, 76, 0.4))' }}
              >
                I Love You Too! ❤️
              </h1>

              <div className="h-12 md:h-16 w-full"></div> {/* GUARANTEED GAP */}

              <div className="max-w-5xl">
                <SplitTextGSAP
                  text="Every single moment with you feels like magic. I promise to always annoy you, always protect you, and always be yours. You are my absolute best friend and my whole world. ✨"
                  className="text-2xl sm:text-3xl md:text-5xl font-medium leading-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

// --- The Bulletproof Runaway Button Component ---
function DodgingButton({ text, extreme = false }: { text: string, extreme?: boolean }) {
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleHover = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!btnRef.current) return;

    const btn = btnRef.current;

    // Safely extract the button from the layout flow on the FIRST hover
    // using its exact bounding box so it doesn't jump randomly before moving.
    if (btn.style.position !== 'fixed') {
      const rect = btn.getBoundingClientRect();
      gsap.set(btn, {
        position: 'fixed',
        left: rect.left,
        top: rect.top,
        margin: 0,
        zIndex: 9999
      });
    }

    const btnWidth = btn.offsetWidth || 200;
    const btnHeight = btn.offsetHeight || 60;
    const safeWidth = window.innerWidth - btnWidth - 40;
    const safeHeight = window.innerHeight - btnHeight - 40;

    const newX = Math.random() * safeWidth + 20;
    const newY = Math.random() * safeHeight + 20;
    const rotate = (Math.random() - 0.5) * (extreme ? 720 : 180);

    gsap.to(btn, {
      left: newX,
      top: newY,
      rotation: rotate,
      duration: extreme ? 0.15 : 0.25,
      ease: 'power4.out',
      overwrite: 'auto'
    })
  }

  return (
    <button
      ref={btnRef}
      onPointerEnter={handleHover}
      onTouchStart={handleHover}
      className="premium-ghost-btn transition-none"
    >
      {text}
    </button>
  )
}

// --- The GSAP Love Cursor Component ---
function LoveCursor() {
  const mainCursorRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const trailCount = 8

  useEffect(() => {
    const isTouch = window.matchMedia("(any-pointer: coarse)").matches || window.innerWidth <= 768
    if (isTouch) return

    document.body.style.cursor = 'none'

    gsap.set(mainCursorRef.current, { xPercent: -50, yPercent: -50 })
    trailRefs.current.forEach((dot, index) => {
      gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 1 - (index * 0.1), opacity: 0 })
    })

    let hasMoved = false

    const onMove = (e: MouseEvent) => {
      if (!hasMoved) {
        gsap.to(mainCursorRef.current, { opacity: 1, duration: 0.3 })
        trailRefs.current.forEach((dot, index) => {
          gsap.to(dot, { opacity: 0.7 - (index * 0.1), duration: 0.3 })
        })
        hasMoved = true
      }

      gsap.to(mainCursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.05, ease: 'power3.out' })

      gsap.to(trailRefs.current, {
        x: e.clientX,
        y: e.clientY,
        stagger: 0.03,
        duration: 0.5,
        ease: 'power3.out'
      })
    }

    const onEnter = () => {
      gsap.to(mainCursorRef.current, { scale: 2, filter: 'drop-shadow(0 0 20px rgba(255, 0, 76, 1))', duration: 0.3, ease: 'back.out(2)' })
      gsap.to(trailRefs.current, { scale: 0, opacity: 0, duration: 0.2, overwrite: 'auto' })
    }

    const onLeave = () => {
      gsap.to(mainCursorRef.current, { scale: 1, filter: 'drop-shadow(0 0 10px rgba(255, 0, 76, 0.8))', duration: 0.3, ease: 'power2.out' })
      trailRefs.current.forEach((dot, index) => {
        gsap.to(dot, { scale: 1 - (index * 0.1), opacity: 0.7 - (index * 0.1), duration: 0.3 })
      })
    }

    window.addEventListener('mousemove', onMove)

    const attach = () => {
      document.querySelectorAll('button, .premium-btn, .premium-ghost-btn').forEach(el => {
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
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      {Array.from({ length: trailCount }).map((_, i) => (
        <div key={i} className="love-cursor-trail" ref={(el) => (trailRefs.current[i] = el)}>💕</div>
      ))}
      <div className="love-cursor-main" ref={mainCursorRef}>❤️</div>
    </>
  )
}
