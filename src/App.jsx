import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './styles/all.sass';

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

  useEffect(() => {
    // 1. Continuous Rotation for Rings
    gsap.to(ring1Ref.current, { rotation: 360, duration: 15, repeat: -1, ease: "none" });
    gsap.to(ring2Ref.current, { rotation: -360, duration: 20, repeat: -1, ease: "none" });
    gsap.to(ring3Ref.current, { rotation: 360, duration: 25, repeat: -1, ease: "none" });

    // 2. Initial Boot-up Animations
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

    // 3. Smooth Mouse Parallax Effect
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // Range: -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // Range: -1 to 1

      // Move background rings opposite to mouse with slight 3D rotation
      gsap.to(coreRef.current, {
        x: x * -25,
        y: y * -25,
        rotationX: y * 10,
        rotationY: x * 10,
        duration: 1,
        ease: "power2.out"
      });

      // Move content box towards the mouse
      gsap.to(boxRef.current, {
        x: x * 15,
        y: y * 15,
        rotationX: y * -5,
        rotationY: x * -5,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="cyber-wrapper">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>

      <div className="parallax-container">
        {/* Background Rings */}
        <div className="core-container" ref={coreRef}>
          <div className="geometric-ring ring-1" ref={ring1Ref}></div>
          <div className="geometric-ring ring-2" ref={ring2Ref}></div>
          <div className="geometric-ring ring-3" ref={ring3Ref}></div>
        </div>

        {/* Content Box with Normal Text */}
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
