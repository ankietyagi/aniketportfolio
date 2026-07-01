import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './styles/all.sass';

const darkPalette = ['#00eaee', '#0077ff', '#bf48ff', '#ff00aa', '#00ff9d'];
const lightPalette = ['#ff5500', '#ff9900', '#e6005c', '#ff2200', '#ffb700'];

// Generate an array of random config for particles
const particlesConfig = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  size: Math.random() * 4 + 1, // 1px to 5px
  x: Math.random() * 100, // 0 to 100vw
  y: Math.random() * 100, // 0 to 100vh
  duration: Math.random() * 15 + 10,
  delay: Math.random() * -20,
}));

function App() {
  const [theme, setTheme] = useState('dark');
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const coreRef = useRef(null);
  const boxRef = useRef(null);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // 1. Color Shifting Logic
  useEffect(() => {
    const activeColors = theme === 'dark' ? darkPalette : lightPalette;
    let colorContext = gsap.context(() => {
      const shiftColor = () => {
        const nextColor = activeColors[gsap.utils.random(0, activeColors.length - 1, 1)];
        gsap.to(document.body, {
          "--active-color": nextColor,
          duration: 3,
          ease: "sine.inOut",
          onComplete: shiftColor
        });
      };
      shiftColor();
    });
    return () => colorContext.revert();
  }, [theme]);

  // 2. All Animations (Morphing, Parallax, Particles, Glitch)
  useEffect(() => {
    // A. Morphing Shape
    const morphRings = () => {
      gsap.to(".geometric-ring", {
        borderRadius: () => `${gsap.utils.random(40, 60)}% ${gsap.utils.random(40, 60)}% ${gsap.utils.random(40, 60)}% ${gsap.utils.random(40, 60)}%`,
        duration: 4,
        ease: "sine.inOut",
        stagger: 0.5,
        onComplete: morphRings
      });
    };
    morphRings();

    // B. Infinite Rotation
    gsap.to(ring1Ref.current, { rotation: 360, duration: 15, repeat: -1, ease: "none" });
    gsap.to(ring2Ref.current, { rotation: -360, duration: 20, repeat: -1, ease: "none" });
    gsap.to(ring3Ref.current, { rotation: 360, duration: 25, repeat: -1, ease: "none" });

    // C. Particle Floating Animations
    gsap.utils.toArray('.particle').forEach((particle) => {
      gsap.fromTo(particle,
        { y: '100vh', opacity: 0 },
        {
          y: '-10vh',
          opacity: gsap.utils.random(0.3, 0.8),
          duration: gsap.utils.random(10, 20),
          ease: "none",
          repeat: -1,
          delay: gsap.utils.random(-15, 0),
          modifiers: {
            x: (x) => `${parseFloat(x) + Math.sin(Date.now() / 1000 + parseFloat(particle.dataset.delay)) * 2}px`
          }
        }
      );
    });

    // D. Random Hologram Text Glitch Effect
    const randomGlitch = () => {
      // Small fast micro-animations to simulate an unstable hologram
      gsap.to(".title", {
        x: () => gsap.utils.random(-4, 4),
        y: () => gsap.utils.random(-2, 2),
        skewX: () => gsap.utils.random(-5, 5),
        opacity: () => gsap.utils.random(0.6, 1),
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        onComplete: () => {
          // Reset properties
          gsap.to(".title", { x: 0, y: 0, skewX: 0, opacity: 1, duration: 0.1 });

          // Call this function again at a completely random time between 3 and 10 seconds
          gsap.delayedCall(gsap.utils.random(3, 10), randomGlitch);
        }
      });
    };
    // Start the random glitch after 2 seconds
    gsap.delayedCall(2, randomGlitch);

    // E. Initial Boot-up Reveal
    const tl = gsap.timeline();
    tl.fromTo(coreRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.2)" }
      )
      .fromTo(boxRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(".text-elem",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        "-=0.5"
      );

    // F. Smooth Mouse Parallax
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(coreRef.current, {
        x: x * -25,
        y: y * -25,
        rotationX: y * 10,
        rotationY: x * 10,
        duration: 1.5,
        ease: "power2.out"
      });

      gsap.to(boxRef.current, {
        x: x * 15,
        y: y * 15,
        rotationX: y * -5,
        rotationY: x * -5,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.killTweensOf(".title"); // cleanup glitch timers
    };
  }, []);

  return (
    <div className="cyber-wrapper">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Floating Particles Layer */}
      <div className="particles-container">
        {particlesConfig.map((config) => (
          <div
            key={config.id}
            className="particle"
            data-delay={config.delay}
            style={{
              width: `${config.size}px`,
              height: `${config.size}px`,
              left: `${config.x}vw`,
            }}
          ></div>
        ))}
      </div>

      <div className="parallax-container">
        {/* Morphing Core */}
        <div className="core-container" ref={coreRef}>
          <div className="geometric-ring ring-1" ref={ring1Ref}></div>
          <div className="geometric-ring ring-2" ref={ring2Ref}></div>
          <div className="geometric-ring ring-3" ref={ring3Ref}></div>
        </div>

        {/* Dynamic Glass UI Box */}
        <div className="content-box" ref={boxRef}>
          <div className="label text-elem">Under Construction</div>
          <h1 className="title text-elem">Portfolio In Progress</h1>
          <p className="desc text-elem">
            Hi, I'm <span className="highlight">Aniket Tyagi</span>. I'm currently designing and building this space. Check back soon for the complete portfolio experience!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
