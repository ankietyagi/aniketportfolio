import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Lenis from "lenis";

// --- Custom Hooks & Utilities ---
const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.hover-trigger')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[100] mix-blend-difference bg-white hidden md:block"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    />
  );
};

// --- Animations ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

// --- Data ---
const experienceData = [
  { role: "Front-End Developer", company: "ANR Software Pvt Ltd", year: "2022 – Present", tech: ["Jekyll", "HTML/CSS"] },
  { role: "Front-End Developer", company: "Auxesis Infotech", year: "2020 – 2022", tech: ["Laravel", "Angular"] },
  { role: "Frontend Dev & UI/UX", company: "Enterslice Fintech", year: "2018 – 2020", tech: ["UI/UX", "Design"] },
  { role: "Back Office Exec", company: "SSR Techvision", year: "2017 – 2018", tech: ["Admin", "Research"] },
  { role: "Web Designer Intern", company: "Benzaitens Group", year: "2016 – 2017", tech: ["UI Design"] },
];

const skills = [
  "HTML", "CSS", "Bootstrap", "Tailwind CSS", "SCSS", "JavaScript", "React", "Node.js",
  "Laravel", "Drupal", "Photoshop", "Illustrator", "TypeScript", "Next.js", "Vue.js",
  "GraphQL", "GSAP", "Figma", "Three.js", "Supabase", "Docker", "AWS"
];

// --- Components ---
const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 10) + 1;
      if (count > 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
      setCounter(count);
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-end p-8 bg-[#0a0a0a] text-[#E1FF00]"
      exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[15vw] font-black leading-none tracking-tighter"
      >
        {counter}%
      </motion.div>
    </motion.div>
  );
};

const PortfolioContent = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroTextRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroTextRef, offset: ["start start", "end start"] });
  const y1 = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const opacity1 = useTransform(heroScroll, [0, 1], [1, 0]);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed right-0 top-0 w-1 md:w-2 h-full bg-[#E1FF00] z-40 origin-top"
        style={{ scaleY }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed top-0 left-0 right-0 z-30 p-6 md:p-10 flex justify-between items-center mix-blend-difference text-white"
      >
        <div className="text-xl font-bold tracking-tighter hover-trigger">AT.®</div>

        <div className="flex items-center gap-4">
          <a
            href="/UpdatedCV.pdf"
            download="Aniket_Tyagi_Resume.pdf"
            aria-label="Download Resume"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#E1FF00] text-[#E1FF00] rounded-lg font-medium hover:bg-[#E1FF00] hover:text-black transition-colors relative overflow-hidden bulb"
          >
            <Download size={16} />
            Resume
            <span className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#E1FF00] rounded-full bulb-spark" />
          </a>

          <a href="mailto:anityagi8860@gmail.com" className="text-sm font-medium hover:line-through transition-all hover-trigger uppercase tracking-widest">
            Available for work
          </a>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroTextRef} className="relative h-screen flex flex-col justify-center px-6 md:px-10 pt-20 overflow-hidden">
        <motion.div style={{ y: y1, opacity: opacity1 }} className="relative z-10 w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col text-[15vw] md:text-[12vw] font-black leading-[0.8] tracking-tighter uppercase"
          >
            <div className="overflow-hidden">
              <motion.div variants={fadeUp} className="text-[#E1FF00]">Aniket</motion.div>
            </div>
            <div className="overflow-hidden flex items-center gap-4 md:gap-8">
              <motion.div variants={fadeUp}>Tyagi</motion.div>
              <motion.div
                variants={fadeUp}
                className="hidden md:block w-32 h-32 lg:w-48 lg:h-48 rounded-full border-4 border-[#E1FF00] shrink-0"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 md:mt-20 max-w-2xl text-xl md:text-3xl font-light text-gray-400"
          >
            Architecting High-Frequency Interface Systems. Bridging the gap between <span className="text-white font-medium">design</span> and <span className="text-white font-medium">development</span>.
          </motion.div>
        </motion.div>

        {/* Background Grid */}
        <div className="absolute inset-0 z-0 opacity-20"
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </section>

      {/* Intro / About */}
      <section className="py-32 px-6 md:px-10 bg-white text-black rounded-t-[3rem] md:rounded-t-[5rem] relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-12 flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-black block" />
            The Protocol
          </h2>
          <div className="text-3xl md:text-5xl lg:text-7xl font-medium leading-[1.1] tracking-tight">
            With over <span className="text-gray-400">8 years</span> in the field, I craft digital experiences that are not only <span className="italic font-serif">visually stunning</span> but also <span className="bg-black text-white px-2 rounded-lg">performance-driven</span>.
          </div>
        </div>
      </section>

      {/* Marquee Skills */}
      <section className="py-20 bg-[#E1FF00] text-black overflow-hidden relative flex flex-col gap-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          className="flex whitespace-nowrap text-6xl md:text-9xl font-black uppercase tracking-tighter"
        >
          {[...skills, ...skills].map((skill, i) => (
            <span key={i} className="mr-8 md:mr-16 hover-trigger transition-all hover:text-white">{skill} • </span>
          ))}
        </motion.div>
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex whitespace-nowrap text-6xl md:text-9xl font-black uppercase tracking-tighter"
        >
          {[...skills, ...skills].reverse().map((skill, i) => (
            <span key={i} className="mr-8 md:mr-16 hover-trigger transition-all hover:text-white outline-text">{skill} • </span>
          ))}
        </motion.div>
      </section>

      {/* Experience Section (Sticky Cards) */}
      <section className="bg-[#0a0a0a] text-white py-32 px-6 md:px-10 relative">
        <div className="max-w-6xl mx-auto relative">
          <h2 className="text-5xl md:text-7xl font-black mb-20 uppercase tracking-tighter">Experience</h2>

          <div className="space-y-4 md:space-y-0 md:relative w-full">
            {experienceData.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                className="md:sticky bg-[#151515] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover-trigger"
                style={{ top: `${120 + i * 40}px`, zIndex: i }}
              >
                <div className="flex-1">
                  <div className="text-[#E1FF00] font-mono text-sm mb-4">{exp.year}</div>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 group-hover:text-[#E1FF00] transition-colors">{exp.role}</h3>
                  <div className="text-xl text-gray-400">{exp.company}</div>
                </div>
                <div className="flex gap-2 flex-wrap md:justify-end flex-1">
                  {exp.tech.map(t => (
                    <span key={t} className="px-4 py-2 rounded-full border border-white/20 text-sm uppercase tracking-wider bg-black/50 backdrop-blur-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 md:px-10 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            <div className="md:sticky md:top-32 h-fit">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6">Capabilities</h2>
              <p className="text-xl text-gray-600 max-w-sm">
                Delivering end-to-end digital solutions, from wireframes to high-performance production code.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {["UI / UX Design", "Frontend Development", "Landing Pages", "Dashboard Design", "Responsive Builds"].map((service, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 0.98, backgroundColor: "#E1FF00" }}
                  className="p-8 border-b-2 border-black flex justify-between items-center group cursor-pointer hover-trigger transition-colors rounded-xl"
                >
                  <span className="text-2xl md:text-4xl font-bold tracking-tight">{service}</span>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all w-8 h-8 md:w-12 md:h-12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Massive Footer / Contact */}
      <footer className="relative h-screen bg-[#0a0a0a] text-white flex flex-col justify-end overflow-hidden" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
        {/* Parallax wrapper for footer content */}
        <div className="fixed bottom-0 left-0 w-full h-screen flex flex-col justify-between p-6 md:p-10 -z-10">
          <div className="pt-20 md:pt-32">
            <p className="text-gray-400 text-lg md:text-2xl mb-4 font-light">Have an idea?</p>
            <a href="mailto:anityagi8860@gmail.com" className="text-4xl md:text-7xl lg:text-[10vw] font-black tracking-tighter uppercase hover:text-[#E1FF00] transition-colors leading-none inline-block hover-trigger">
              Let's Talk ↗
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end pb-8 gap-8 border-t border-white/10 pt-8 mt-auto">
            <div className="flex gap-6 hover-trigger">
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#E1FF00] hover:text-black hover:border-[#E1FF00] transition-all"><Github size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#E1FF00] hover:text-black hover:border-[#E1FF00] transition-all"><Linkedin size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#E1FF00] hover:text-black hover:border-[#E1FF00] transition-all"><Twitter size={20} /></a>
            </div>

            <div className="text-right">
              <div className="font-mono text-sm text-gray-500 mb-2">Location</div>
              <div className="text-lg">Uttar Pradesh, India</div>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-gray-500">© 2025 Aniket Tyagi</div>
              <div className="text-xs text-gray-700 mt-1">All rights reserved</div>
            </div>
          </div>
        </div>

        {/* The spacer that forces the page to scroll past the fixed footer behind it */}
        <div className="h-screen w-full bg-transparent"></div>
      </footer>
    </>
  );
};

export default function App() {
  useLenis();
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-[#E1FF00] selection:text-black">
      <CustomCursor />

      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && <PortfolioContent />}

      <style dangerouslySetInnerHTML={{__html: `
        .outline-text {
          color: transparent;
          -webkit-text-stroke: 2px black;
        }
        body {
          cursor: none;
        }
        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
        }
        .spark {
          animation: spark-pulse 6s infinite ease-in-out;
          box-shadow: 0 0 6px rgba(225,255,0,0.6);
        }

        @keyframes spark-pulse {
          0% { transform: scale(0.6) translateX(0); opacity: 0.35; box-shadow: 0 0 0 rgba(225,255,0,0); }
          10% { transform: scale(1.2) translateX(-2px); opacity: 1; box-shadow: 0 0 10px rgba(225,255,0,0.9); }
          20% { transform: scale(0.8) translateX(2px); opacity: 0.6; box-shadow: 0 0 0 rgba(225,255,0,0); }
          100% { transform: scale(0.6) translateX(0); opacity: 0.35; box-shadow: 0 0 0 rgba(225,255,0,0); }
        }
        .bulb {
          animation: bulb-shake 10s infinite ease-in-out;
          will-change: transform, opacity;
        }

        .bulb-spark {
          animation: bulb-flicker 10s infinite ease-in-out;
          box-shadow: 0 0 6px rgba(225,255,0,0.6);
        }

        @keyframes bulb-shake {
          0% { transform: translateX(0) scale(1); opacity: 1; }
          3% { transform: translateX(-3px) scale(1.02); opacity: 0.92; }
          6% { transform: translateX(3px) scale(0.98); opacity: 0.95; }
          12% { transform: translateX(-2px) scale(1.01); opacity: 0.93; }
          20% { transform: translateX(0) scale(1); opacity: 1; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }

        @keyframes bulb-flicker {
          0% { opacity: 0.3; transform: scale(0.6); box-shadow: 0 0 0 rgba(225,255,0,0); }
          5% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 8px rgba(225,255,0,0.9); }
          8% { opacity: 0.6; transform: scale(0.9); box-shadow: 0 0 0 rgba(225,255,0,0); }
          100% { opacity: 0.3; transform: scale(0.6); box-shadow: 0 0 0 rgba(225,255,0,0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bulb, .bulb-spark, .spark { animation: none !important; }
        }
      `}} />
    </div>
  );
}
