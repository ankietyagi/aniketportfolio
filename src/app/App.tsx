import {
  useState, useEffect, useRef, useCallback, useMemo,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiArrowUpRight, FiDownload, FiExternalLink, FiGithub,
  FiMail, FiPhone, FiMapPin, FiChevronDown, FiCode,
  FiLayout, FiSmartphone, FiGlobe, FiMonitor, FiSend,
  FiLinkedin, FiTwitter, FiInstagram, FiMenu, FiX,
  FiSun, FiMoon, FiFileText, FiCheck,
} from "react-icons/fi";
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiGit, SiFigma, SiVuedotjs, SiGraphql, SiDocker,
} from "react-icons/si";

// ─── Types ────────────────────────────────────────────────────────────────────
type Theme  = "dark" | "light";
type RState = "idle" | "loading" | "done";

// ─── Design tokens ────────────────────────────────────────────────────────────
const BLUE   = "#3b82f6";
const PURPLE = "#8b5cf6";
const CYAN   = "#06b6d4";
const DF = "'Plus Jakarta Sans', sans-serif";
const SF = "'Inter', sans-serif";
const MF = "'JetBrains Mono', monospace";

// Glass styles — dark and light
const GD: React.CSSProperties = {
  background:    "rgba(255,255,255,0.04)",
  border:        "1px solid rgba(255,255,255,0.09)",
  boxShadow:     "0 8px 32px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.08)",
  backdropFilter:"blur(16px) saturate(180%)",
};
const GL: React.CSSProperties = {
  background:    "rgba(255,255,255,0.76)",
  border:        "1px solid rgba(255,255,255,0.96)",
  boxShadow:     "0 4px 24px rgba(59,130,246,0.06), inset 0 1px 0 rgba(255,255,255,1)",
  backdropFilter:"blur(16px) saturate(180%)",
};
// Nav glass
const ND: React.CSSProperties = {
  background:    "rgba(3,7,18,0.74)",
  border:        "1px solid rgba(255,255,255,0.09)",
  boxShadow:     "0 2px 24px rgba(0,0,0,0.44), inset 0 1px 0 rgba(255,255,255,0.07)",
  backdropFilter:"blur(22px) saturate(200%)",
};
const NL: React.CSSProperties = {
  background:    "rgba(247,248,252,0.84)",
  border:        "1px solid rgba(255,255,255,0.96)",
  boxShadow:     "0 2px 24px rgba(59,130,246,0.07), inset 0 1px 0 rgba(255,255,255,1)",
  backdropFilter:"blur(22px) saturate(200%)",
};
const gls = (t: Theme) => t === "dark" ? GD : GL;

// ─── Animation helpers ────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  hidden:  { opacity: 0, y: 24, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)" },
};
const tx = (delay = 0, dur = 0.8) => ({ duration: dur, delay, ease: EASE });

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV = ["Home","About","Contact"];

const STATS = [
  { v:"8+",   l:"Years of craft"    },
  { v:"120+", l:"Projects shipped"  },
  { v:"85+",  l:"Happy clients"     },
  { v:"4.2k", l:"GitHub stars"      },
];

const EXPS = [
  {
    role:"Frontend Developer", co:"Vercel Inc.",
    period:"2022 – Present", loc:"Remote, USA",
    desc:"Led the redesign of the developer dashboard serving 2M+ users. Architected a component library adopted across four product teams, cutting UI inconsistencies by 74%.",
    tags:["React","Next.js","TypeScript","Design Systems"],
  },
  {
    role:"UI/UX Engineer", co:"Stripe",
    period:"2020 – 2022", loc:"San Francisco, CA",
    desc:"Crafted payment flows processing $2B+ in transactions. Improved checkout conversion 18% through systematic micro-interaction work across the merchant interface.",
    tags:["React","GSAP","Figma","A/B Testing"],
  },
  {
    role:"Frontend Developer", co:"Linear",
    period:"2018 – 2020", loc:"Remote",
    desc:"Built real-time collaboration features and the issue tracker UI used by 500k+ engineering teams, delivering 60 fps interactions across all supported browsers.",
    tags:["Vue.js","GraphQL","WebSockets","CSS-in-JS"],
  },
  {
    role:"UI Developer", co:"Razorpay",
    period:"2016 – 2018", loc:"Bangalore, India",
    desc:"Developed responsive checkout widgets integrated across 300k+ merchant websites. Reduced average page weight 40% through code-splitting and asset optimisation.",
    tags:["JavaScript","CSS","Performance","Analytics"],
  },
];

const SKILLS = [
  { name:"React / Next.js", pct:98, Icon:SiReact,      c:"#61DAFB" },
  { name:"TypeScript",      pct:95, Icon:SiTypescript,  c:"#3178C6" },
  { name:"Tailwind CSS",    pct:97, Icon:SiTailwindcss, c:"#38BDF8" },
  { name:"Vue.js",          pct:85, Icon:SiVuedotjs,    c:"#42B883" },
  { name:"Node.js",         pct:80, Icon:SiNodedotjs,   c:"#68A063" },
  { name:"GraphQL",         pct:82, Icon:SiGraphql,     c:"#E10098" },
  { name:"Figma",           pct:93, Icon:SiFigma,       c:"#F24E1E" },
  { name:"Docker",          pct:75, Icon:SiDocker,      c:"#2496ED" },
  { name:"Git",             pct:96, Icon:SiGit,         c:"#F05032" },
  { name:"Next.js",         pct:94, Icon:SiNextdotjs,   c:"#a3a3a3" },
];

const PROJECTS = [
  {
    title:"Aurora Design System",
    desc:"180+ components with full dark-mode, a11y coverage, and design tokens across 40+ products.",
    img:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=720&h=460&fit=crop&auto=format",
    tags:["React","TypeScript","Storybook","Figma"],
  },
  {
    title:"FlowBoard Analytics",
    desc:"Real-time dashboard — WebSocket streams, D3 charts, 100ms queries on 50M-row datasets.",
    img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=720&h=460&fit=crop&auto=format",
    tags:["Next.js","D3.js","WebSockets","Prisma"],
  },
  {
    title:"Nebula AI Platform",
    desc:"AI SaaS interface with prompt builder, conversation history, and model comparison.",
    img:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=720&h=460&fit=crop&auto=format",
    tags:["React","OpenAI","Tailwind","Supabase"],
  },
  {
    title:"Luminary E-Commerce",
    desc:"Premium fashion store with 3D product viewer, AR try-on, and Stripe checkout.",
    img:"https://images.unsplash.com/photo-1561069934-eee225952461?w=720&h=460&fit=crop&auto=format",
    tags:["Next.js","Three.js","Stripe","Sanity"],
  },
  {
    title:"Pulse Social Dashboard",
    desc:"Multi-platform social manager with AI content generation and cross-channel analytics.",
    img:"https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=720&h=460&fit=crop&auto=format",
    tags:["Vue.js","GraphQL","Socket.io","Redis"],
  },
  {
    title:"Orbit CMS",
    desc:"Headless CMS with drag-and-drop page builder, real-time preview, and multi-locale support.",
    img:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=720&h=460&fit=crop&auto=format",
    tags:["React","Node.js","MongoDB","AWS"],
  },
];

const SERVICES = [
  { Icon:FiLayout,     title:"UI / UX Design",       desc:"Pixel-perfect Figma designs with systematic component thinking and Apple-level finish.",              col:BLUE     },
  { Icon:FiCode,       title:"Frontend Development", desc:"Performant React apps with TypeScript, modern architecture, and comprehensive test coverage.",        col:PURPLE   },
//   { Icon:SiReact,      title:"React Ecosystems",     desc:"Next.js applications, design systems, component libraries, and React Native mobile apps.",           col:"#61DAFB" },
  { Icon:FiGlobe,      title:"Landing Pages",        desc:"Conversion-optimised pages with scroll animations and Core Web Vitals scores of 95+.",               col:CYAN     },
  { Icon:FiMonitor,    title:"Dashboard Design",     desc:"Complex data visualisations, admin panels, and analytics interfaces built for scale.",                col:"#10b981" },
  { Icon:FiSmartphone, title:"Responsive Builds",    desc:"Mobile-first interfaces that feel native on every device and viewport.",                             col:"#f59e0b" },
];

const TESTIMONIALS = [
  {
    name:"Sarah Chen",   role:"CTO at Vercel",
    img:"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=96&h=96&fit=crop&auto=format",
    text:"Aniket's work on our design system was transformative. His ability to translate complex requirements into elegant, scalable UI is unlike anything I've seen. The component library he built is now the backbone of our entire product.",
  },
  {
    name:"Marcus Rivera", role:"Product Lead at Stripe",
    img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&auto=format",
    text:"Aniket thinks about product, user experience, and business impact simultaneously — that is rare. Our checkout conversion improved 18% after his redesign, and the code quality made our engineers genuinely happy.",
  },
  {
    name:"Priya Sharma",  role:"Design Director at Linear",
    img:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&auto=format",
    text:"His animation work is exceptional — every interaction feels intentional and premium. Aniket is the rare engineer who truly understands design at a craft level, not just a technical one.",
  },
];

const MARQUEE = [
  "React","TypeScript","Next.js","Vue.js","GraphQL","Tailwind CSS","GSAP","Figma",
  "Node.js","Three.js","Supabase","Docker","AWS","Storybook","Prisma","Redis","Vercel",
];

// ─── NavLogo — "ANIKET" only, 3 subtle code symbols ──────────────────────────
function NavLogo({ theme, onClick }: { theme: Theme; onClick: () => void }) {
  const isDark = theme === "dark";

  const syms = useMemo(() => [
    { s:"</>", x: 30,  y: 36, dx:  9, dy: -7, op: 0.20, dur: 28, del:  0 },
    { s:"{}",  x: 132, y: 42, dx: -8, dy:  9, op: 0.17, dur: 24, del:  5 },
    { s:"<>",  x: 218, y: 24, dx:  9, dy:  7, op: 0.19, dur: 26, del: 11 },
  ], []);

  return (
    <motion.div
      className="cursor-pointer select-none"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      style={{ filter:`drop-shadow(0 0 12px rgba(59,130,246,${isDark?0.38:0.22}))` }}
      aria-label="Home"
    >
      <svg viewBox="0 0 268 60" style={{ width:106, height:"auto" }} overflow="visible">
        <defs>
          <clipPath id="nl-cp">
            <text x="0" y="53" fontSize="56" fontWeight="800"
              fontFamily="'Plus Jakarta Sans',sans-serif"
              textLength="268" lengthAdjust="spacingAndGlyphs">ANIKET</text>
          </clipPath>
          <linearGradient id="nl-gr" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#3b82f6"/>
            <stop offset="100%" stopColor="#8b5cf6"/>
          </linearGradient>
          <linearGradient id="nl-sh" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="white" stopOpacity="0.30"/>
            <stop offset="42%"  stopColor="white" stopOpacity="0.04"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Letter fill */}
        <rect x="0" y="0" width="268" height="60" fill="url(#nl-gr)" clipPath="url(#nl-cp)"/>

        {/* 3 code symbols — barely perceptible */}
        {syms.map((p, i) => (
          <motion.text key={i} x={p.x} y={p.y} fontSize="8.5"
            fontFamily={MF} fontWeight="500"
            fill="white" fillOpacity={p.op}
            clipPath="url(#nl-cp)"
            animate={{
              x:[p.x, p.x+p.dx, p.x-p.dx*0.5, p.x],
              y:[p.y, p.y+p.dy, p.y-p.dy*0.6, p.y],
            }}
            transition={{ duration:p.dur, repeat:Infinity, delay:p.del, ease:"easeInOut" }}>
            {p.s}
          </motion.text>
        ))}

        {/* Glass shine */}
        <rect x="0" y="0" width="268" height="60" fill="url(#nl-sh)" clipPath="url(#nl-cp)"/>

        {/* Hairline stroke */}
        <text x="0" y="53" fontSize="56" fontWeight="800"
          fontFamily="'Plus Jakarta Sans',sans-serif"
          textLength="268" lengthAdjust="spacingAndGlyphs"
          fill="none"
          stroke={isDark?"rgba(255,255,255,0.09)":"rgba(59,130,246,0.2)"}
          strokeWidth="0.6">ANIKET</text>

        {/* Breathing glow */}
        <motion.text x="0" y="53" fontSize="56" fontWeight="800"
          fontFamily="'Plus Jakarta Sans',sans-serif"
          textLength="268" lengthAdjust="spacingAndGlyphs"
          fill="none" stroke="rgba(59,130,246,0.42)" strokeWidth="1.4"
          style={{ filter:"blur(3px)" }}
          animate={{ opacity:[0.2, 0.65, 0.2] }}
          transition={{ duration:4.2, repeat:Infinity, ease:"easeInOut" }}>
          ANIKET
        </motion.text>
      </svg>
    </motion.div>
  );
}

// ─── Premium Resume Button ────────────────────────────────────────────────────
function ResumeBtn({ theme }: { theme: Theme }) {
  const isDark = theme === "dark";
  const [rs, setRs]   = useState<RState>("idle");
  const [pts, setPts] = useState<{id:number;angle:number}[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [mag, setMag] = useState({ x:0, y:0 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setMag({
      x:(e.clientX - r.left - r.width/2)  * 0.22,
      y:(e.clientY - r.top  - r.height/2) * 0.22,
    });
  };

  const handleClick = () => {
    if (rs !== "idle") return;
    setRs("loading");
    setPts(Array.from({length:8},(_,i) => ({id:Date.now()+i, angle:i*45})));
    setTimeout(() => setPts([]), 650);
    setTimeout(() => {
      setRs("done");
      const a = document.createElement("a");
      a.href = "/src/imports/UpdatedCV.pdf";
      a.download = "AniketTyagi-Resume.pdf";
      a.click();
    }, 460);
    setTimeout(() => setRs("idle"), 1700);
  };

  return (
    <motion.div
      ref={ref}
      className="relative hidden md:flex items-center justify-center"
      animate={{ x:mag.x, y:mag.y }}
      transition={{ type:"spring", stiffness:240, damping:20 }}
      onMouseMove={onMove}
      onMouseLeave={() => setMag({x:0,y:0})}
    >
      {/* Ambient glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background:"radial-gradient(ellipse,rgba(59,130,246,0.5),transparent 70%)", filter:"blur(14px)" }}
        animate={{ scale:[1,1.18,1], opacity:[0.55,0.85,0.55] }}
        transition={{ duration:3.6, repeat:Infinity, ease:"easeInOut" }}
      />

      <motion.button
        onClick={handleClick}
        className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[0.8125rem] font-semibold overflow-hidden"
        style={{
          fontFamily:SF,
          background:"linear-gradient(135deg,rgba(59,130,246,0.92),rgba(139,92,246,0.88))",
          border:"1px solid rgba(255,255,255,0.22)",
          boxShadow: isDark
            ? "0 4px 20px rgba(59,130,246,0.42), inset 0 1px 0 rgba(255,255,255,0.2)"
            : "0 4px 20px rgba(59,130,246,0.32), inset 0 1px 0 rgba(255,255,255,0.28)",
        }}
        whileHover={{ scale:1.06, y:-2, boxShadow:"0 8px 28px rgba(59,130,246,0.58), inset 0 1px 0 rgba(255,255,255,0.24)" }}
        whileTap={{ scale:0.96 }}
        data-h
      >
        {/* Shimmer sweep */}
        <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
          <motion.span
            className="absolute top-0 bottom-0 w-14"
            style={{ background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)", skewX:"-14deg" }}
            animate={{ left:["-56px","calc(100% + 56px)"] }}
            transition={{ duration:2.6, repeat:Infinity, repeatDelay:5.5, ease:[0.4,0,0.6,1] }}
          />
        </span>
        {/* Top reflection */}
        <span className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full pointer-events-none"
          style={{ background:"linear-gradient(to bottom,rgba(255,255,255,0.18),transparent)" }}/>

        {/* Label with state transitions */}
        <span className="relative z-10 flex items-center gap-2">
          <AnimatePresence mode="wait">
            {rs === "idle" && (
              <motion.span key="i" className="flex items-center gap-1.5"
                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.15}}>
                <FiDownload size={13}/> Resume
              </motion.span>
            )}
            {rs === "loading" && (
              <motion.span key="l" className="flex items-center gap-2"
                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.15}}>
                <svg width="13" height="13" viewBox="0 0 13 13" className="animate-spin">
                  <circle cx="6.5" cy="6.5" r="5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
                  <circle cx="6.5" cy="6.5" r="5" fill="none" stroke="white" strokeWidth="1.5"
                    strokeDasharray="12" strokeDashoffset="9" strokeLinecap="round"/>
                </svg>
                Preparing…
              </motion.span>
            )}
            {rs === "done" && (
              <motion.span key="d" className="flex items-center gap-1.5"
                initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}}
                exit={{opacity:0}} transition={{duration:0.2}}>
                <FiCheck size={13}/> Downloaded
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>

      {/* Particle burst */}
      <AnimatePresence>
        {pts.map(p => {
          const rad = (p.angle * Math.PI) / 180;
          return (
            <motion.span key={p.id}
              className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
              style={{ background:BLUE, left:"50%", top:"50%", marginLeft:-3, marginTop:-3 }}
              initial={{ x:0, y:0, opacity:1, scale:1 }}
              animate={{ x:Math.cos(rad)*36, y:Math.sin(rad)*36, opacity:0, scale:0 }}
              exit={{ opacity:0 }}
              transition={{ duration:0.6, ease:"easeOut" }}/>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Resume Preview Card ──────────────────────────────────────────────────────
function ResumeCard({ theme }: { theme: Theme }) {
  const isDark = theme === "dark";
  const [rs, setRs]   = useState<RState>("idle");
  const [pts, setPts] = useState<{id:number;angle:number}[]>([]);

  const download = () => {
    if (rs !== "idle") return;
    setRs("loading");
    setPts(Array.from({length:6},(_,i)=>({id:Date.now()+i,angle:i*60})));
    setTimeout(() => setPts([]), 600);
    setTimeout(() => {
      setRs("done");
      const a = document.createElement("a");
      a.href = "/src/imports/UpdatedCV.pdf";
      a.download = "AniketTyagi-Resume.pdf";
      a.click();
    }, 450);
    setTimeout(() => setRs("idle"), 1500);
  };

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden"
      style={{
        ...gls(theme),
        boxShadow: isDark
          ? "0 24px 64px rgba(0,0,0,0.48), 0 0 0 1px rgba(255,255,255,0.07)"
          : "0 24px 64px rgba(59,130,246,0.12), 0 0 0 1px rgba(255,255,255,0.96)",
      }}
      variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={{ once:true }} transition={tx(0.25)}
      whileHover={{ y:-5, boxShadow: isDark
        ? "0 32px 72px rgba(0,0,0,0.52), 0 0 0 1px rgba(59,130,246,0.18)"
        : "0 32px 72px rgba(59,130,246,0.16), 0 0 0 1px rgba(255,255,255,0.98)" }}
    >
      {/* Thumbnail mockup */}
      <div className="relative h-44 overflow-hidden"
        style={{ background: isDark
          ? "linear-gradient(135deg,#0f1a35,#1a0f35 50%,#0a1628)"
          : "linear-gradient(135deg,#dbeafe,#ede9fe 50%,#cffafe)" }}>
        <div className="absolute inset-5 flex flex-col gap-2.5" style={{ opacity:0.38 }}>
          {[0.65,1,0.88,1,0,0.75,1,0.82].map((w,i) => (
            <div key={i} className="rounded-sm" style={{
              height: i===0 ? 10 : i===4 ? 0 : 6,
              marginTop: i===4 ? 4 : 0,
              width: `${(w||1)*100}%`,
              borderTop: i===4 ? `1px solid ${isDark?"rgba(255,255,255,0.08)":"rgba(59,130,246,0.15)"}` : undefined,
              background: i===4 ? "transparent" : (isDark?"rgba(255,255,255,0.18)":"rgba(59,130,246,0.28)"),
            }}/>
          ))}
        </div>
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[0.65rem] font-bold tracking-wider"
          style={{ fontFamily:MF, background:BLUE, color:"white", boxShadow:"0 2px 10px rgba(59,130,246,0.5)" }}>
          PDF
        </div>
        <div className="absolute inset-0" style={{ background: isDark
          ? "linear-gradient(to bottom,transparent 50%,rgba(3,7,18,0.88))"
          : "linear-gradient(to bottom,transparent 50%,rgba(247,248,252,0.88))" }}/>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background:"rgba(59,130,246,0.12)", border:"1px solid rgba(59,130,246,0.2)" }}>
            <FiFileText size={16} color={BLUE}/>
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight"
              style={{ fontFamily:DF, color:isDark?"#eef2ff":"#0c0f1d" }}>
              AniketTyagi-Resume.pdf
            </p>
            <p className="text-xs mt-0.5"
              style={{ fontFamily:SF, color:isDark?"rgba(238,242,255,0.4)":"rgba(12,15,29,0.42)" }}>
              Frontend Developer · 2 pages
            </p>
          </div>
        </div>

        <div className="flex gap-2.5 relative">
          {/* Download */}
          <motion.button onClick={download}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white relative overflow-hidden"
            style={{ fontFamily:SF, background:`linear-gradient(135deg,${BLUE},${PURPLE})`,
              boxShadow:"0 4px 14px rgba(59,130,246,0.38)" }}
            whileHover={{ scale:1.03, boxShadow:"0 6px 20px rgba(59,130,246,0.52)" }}
            whileTap={{ scale:0.97 }} data-h>
            <AnimatePresence mode="wait">
              {rs==="idle" && (
                <motion.span key="i" className="flex items-center gap-1.5"
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.14}}>
                  <FiDownload size={12}/> Download
                </motion.span>
              )}
              {rs==="loading" && (
                <motion.span key="l"
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.14}}>
                  <svg width="12" height="12" viewBox="0 0 12 12" className="animate-spin">
                    <circle cx="6" cy="6" r="4.5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                    <circle cx="6" cy="6" r="4.5" fill="none" stroke="white" strokeWidth="1.5"
                      strokeDasharray="10" strokeDashoffset="7" strokeLinecap="round"/>
                  </svg>
                </motion.span>
              )}
              {rs==="done" && (
                <motion.span key="d" className="flex items-center gap-1.5"
                  initial={{opacity:0,scale:0.7}} animate={{opacity:1,scale:1}}
                  exit={{opacity:0}} transition={{duration:0.18}}>
                  <FiCheck size={12}/> Saved
                </motion.span>
              )}
            </AnimatePresence>
            {/* Particles */}
            <AnimatePresence>
              {pts.map(p => {
                const r = (p.angle*Math.PI)/180;
                return (
                  <motion.span key={p.id}
                    className="absolute w-1 h-1 rounded-full pointer-events-none"
                    style={{ background:"white", left:"50%", top:"50%" }}
                    initial={{x:0,y:0,opacity:1}}
                    animate={{x:Math.cos(r)*22, y:Math.sin(r)*22, opacity:0}}
                    transition={{duration:0.52, ease:"easeOut"}}/>
                );
              })}
            </AnimatePresence>
          </motion.button>

          {/* View */}
          <motion.a href="/src/imports/UpdatedCV.pdf" target="_blank" rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold"
            style={{ fontFamily:SF, ...gls(theme), color:isDark?"#eef2ff":"#0c0f1d" }}
            whileHover={{ scale:1.03, y:-1 }} whileTap={{ scale:0.97 }} data-h>
            <FiExternalLink size={12}/> View
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Custom cursor ────────────────────────────────────────────────────────────
function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot  = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x:-200, y:-200 });
  const cur  = useRef({ x:-200, y:-200 });
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const mv = (e: MouseEvent) => {
      pos.current = { x:e.clientX, y:e.clientY };
      document.documentElement.style.setProperty("--cx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cy", `${e.clientY}px`);
    };
    const on  = () => setHov(true);
    const off = () => setHov(false);
    const attach = () =>
      document.querySelectorAll("a,button,[data-h]").forEach(el => {
        el.addEventListener("mouseenter", on);
        el.addEventListener("mouseleave", off);
      });
    window.addEventListener("mousemove", mv);
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, {childList:true, subtree:true});
    let raf: number;
    const loop = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.13;
      cur.current.y += (pos.current.y - cur.current.y) * 0.13;
      if (ring.current)
        ring.current.style.transform = `translate(${cur.current.x-20}px,${cur.current.y-20}px)`;
      if (dot.current)
        dot.current.style.transform  = `translate(${pos.current.x-3}px,${pos.current.y-3}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener("mousemove", mv);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={ring} className="fixed top-0 left-0 pointer-events-none z-[9990] rounded-full"
        style={{
          width:40, height:40,
          background: hov ? "rgba(59,130,246,0.09)" : "transparent",
          border:`1.5px solid rgba(59,130,246,${hov?0.65:0.32})`,
          boxShadow:`0 0 ${hov?22:10}px rgba(59,130,246,${hov?0.28:0.10})`,
          transition:"border-color .22s,box-shadow .22s,background .22s",
          willChange:"transform",
        }}/>
      <div ref={dot} className="fixed top-0 left-0 pointer-events-none z-[9991] rounded-full"
        style={{ width:6, height:6, background:BLUE,
          boxShadow:`0 0 8px ${BLUE}`, willChange:"transform" }}/>
    </>
  );
}

// ─── Loading screen ───────────────────────────────────────────────────────────
function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2100);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background:"#030712" }}
      exit={{ opacity:0, scale:1.03 }}
      transition={{ duration:0.65, ease:EASE }}>
      <div className="flex items-end">
        {"ANIKET".split("").map((ch, i) => (
          <motion.span key={i} className="font-black leading-none"
            style={{
              fontFamily:DF, fontSize:"clamp(3rem,9vw,6.5rem)",
              background:"linear-gradient(150deg,#fff 20%,rgba(255,255,255,0.42) 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}
            initial={{ opacity:0, y:28, filter:"blur(8px)" }}
            animate={{ opacity:1, y:0,  filter:"blur(0px)" }}
            transition={{ duration:0.7, delay:0.12+i*0.07, ease:EASE }}>
            {ch}
          </motion.span>
        ))}
      </div>
      <motion.p className="mt-3.5 tracking-[0.22em] uppercase text-xs"
        style={{ fontFamily:MF, color:"rgba(59,130,246,0.62)" }}
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.72, duration:0.5 }}>
        Frontend Developer · UI/UX Designer
      </motion.p>
      <motion.div className="mt-9 overflow-hidden rounded-full"
        style={{ width:180, height:1, background:"rgba(59,130,246,0.12)" }}
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}>
        <motion.div className="h-full rounded-full"
          style={{ background:`linear-gradient(90deg,${BLUE},${PURPLE})` }}
          initial={{ width:"0%" }} animate={{ width:"100%" }}
          transition={{ duration:1.35, delay:0.55, ease:EASE }}/>
      </motion.div>
    </motion.div>
  );
}

// ─── Wave overlay ─────────────────────────────────────────────────────────────
const WaveDiv = ({ wr }: { wr: React.RefObject<HTMLDivElement | null> }) => (
  <div ref={wr} className="fixed inset-0 z-[9970] pointer-events-none" style={{ display:"none" }}/>
);

// ─── Magnetic wrapper ─────────────────────────────────────────────────────────
function Mag({
  children, str=0.26, className="", onClick,
}: {
  children: React.ReactNode;
  str?: number;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [o, setO] = useState({ x:0, y:0 });
  return (
    <motion.div ref={ref} className={className}
      onMouseMove={e => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setO({ x:(e.clientX-r.left-r.width/2)*str, y:(e.clientY-r.top-r.height/2)*str });
      }}
      onMouseLeave={() => setO({x:0,y:0})}
      onClick={onClick}
      animate={{ x:o.x, y:o.y }}
      transition={{ type:"spring", stiffness:255, damping:22 }}>
      {children}
    </motion.div>
  );
}

// ─── Scroll progress ──────────────────────────────────────────────────────────
function ScrollBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setP(d.scrollTop / (d.scrollHeight - d.clientHeight) || 0);
    };
    window.addEventListener("scroll", fn, {passive:true});
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9960]"
      style={{ background:"rgba(59,130,246,0.06)" }}>
      <motion.div className="h-full origin-left"
        style={{ scaleX:p, background:`linear-gradient(90deg,${BLUE},${PURPLE},${CYAN})`,
          boxShadow:`0 0 6px ${BLUE}66` }}/>
    </div>
  );
}

// ─── Ambient orb ─────────────────────────────────────────────────────────────
function Orb({ col, w, h, x, y, delay=0 }:
  { col:string; w:number; h:number; x:string; y:string; delay?:number }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ width:w, height:h, left:x, top:y,
        background:`radial-gradient(ellipse at 42% 38%,${col}3a,transparent 70%)`,
        filter:"blur(72px)" }}
      animate={{ x:[0,22,-16,8,0], y:[0,-16,22,-8,0], scale:[1,1.07,0.97,1.04,1] }}
      transition={{ duration:18+delay*2, repeat:Infinity, ease:"easeInOut", delay }}/>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Sec({ id, children, theme, alt=false }:
  { id:string; children:React.ReactNode; theme:Theme; alt?:boolean }) {
  const d = theme === "dark";
  return (
    <section id={id} className="relative overflow-hidden"
      style={{ padding:"7rem 0", background:d?(alt?"#040b1a":"#030712"):(alt?"#eef2ff":"#f7f8fc") }}>
      {children}
    </section>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SH({ eye, title, sub, theme }:
  { eye:string; title:string; sub?:string; theme:Theme }) {
  const d = theme === "dark";
  return (
    <motion.div className="mb-20" variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={{ once:true, margin:"-80px" }} transition={tx()}>
      <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase"
        style={{ fontFamily:MF, color:BLUE }}>{eye}</p>
      <h2 className="font-bold tracking-tight leading-[1.06]"
        style={{ fontFamily:DF, fontSize:"clamp(2.1rem,4vw,3.2rem)", color:d?"#eef2ff":"#0c0f1d" }}>
        {title}
      </h2>
      {sub && (
        <p className="mt-4 max-w-lg leading-relaxed"
          style={{ fontFamily:SF, fontSize:"0.9375rem",
            color:d?"rgba(238,242,255,0.48)":"rgba(12,15,29,0.5)" }}>
          {sub}
        </p>
      )}
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ theme, onToggle }:
  { theme:Theme; onToggle:(e:React.MouseEvent)=>void }) {
  const [sc, setSc] = useState(false);
  const [ac, setAc] = useState("Home");
  const [op, setOp] = useState(false);
  const d = theme === "dark";

  useEffect(() => {
    const fn = () => setSc(window.scrollY > 48);
    window.addEventListener("scroll", fn, {passive:true});
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" });
    setAc(id); setOp(false);
  };

  const ns = sc ? (d ? ND : NL)
    : { background:"transparent", border:"1px solid transparent", backdropFilter:"none", boxShadow:"none" };

  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 flex justify-center"
      initial={{ y:-72, opacity:0 }} animate={{ y:0, opacity:1 }}
      transition={{ duration:0.85, ease:EASE }}>

      <motion.div className="flex items-center justify-between w-full max-w-6xl rounded-2xl px-5 py-2.5"
        style={ns} animate={{ scale:sc?0.983:1 }} transition={{ duration:0.3 }}>

        <NavLogo theme={theme} onClick={() => go("home")}/>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV.map(link => (
            <motion.button key={link} onClick={() => go(link)}
              className="relative px-3.5 py-2 rounded-xl text-[0.8125rem] font-medium"
              style={{ fontFamily:SF,
                color:ac===link?BLUE:(d?"rgba(238,242,255,0.58)":"rgba(12,15,29,0.52)") }}
              whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }} data-h>
              {ac===link && (
                <motion.span className="absolute inset-0 rounded-xl"
                  style={{ background:"rgba(59,130,246,0.09)" }}
                  layoutId="navpill"
                  transition={{ type:"spring", stiffness:380, damping:30 }}/>
              )}
              {link}
            </motion.button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <motion.button onClick={onToggle} aria-label="Toggle theme" data-h
            className="relative flex items-center rounded-full"
            style={{
              width:52, height:28, padding:"2px 3px",
              background: d?"rgba(59,130,246,0.15)":"rgba(245,158,11,0.14)",
              border:`1px solid ${d?"rgba(59,130,246,0.32)":"rgba(245,158,11,0.34)"}`,
            }}
            whileTap={{ scale:0.94 }}>
            <motion.span key={theme}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ border:`1px solid ${d?BLUE:"#f59e0b"}` }}
              initial={{ scale:1, opacity:0.5 }}
              animate={{ scale:1.38, opacity:0 }}
              transition={{ duration:0.5 }}/>
            <motion.div className="relative flex items-center justify-center rounded-full"
              style={{
                width:22, height:22,
                background: d?`linear-gradient(135deg,${BLUE},${PURPLE})`:"linear-gradient(135deg,#f59e0b,#ef4444)",
                boxShadow: d?"0 2px 8px rgba(59,130,246,0.6)":"0 2px 8px rgba(245,158,11,0.5)",
              }}
              animate={{ x:d?0:24 }}
              transition={{ type:"spring", stiffness:440, damping:28 }}>
              <AnimatePresence mode="wait">
                {d
                  ? <motion.div key="m" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.2}}><FiMoon size={11} color="white"/></motion.div>
                  : <motion.div key="s" initial={{rotate:90,opacity:0}}  animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.2}}><FiSun  size={11} color="white"/></motion.div>
                }
              </AnimatePresence>
            </motion.div>
          </motion.button>

          <ResumeBtn theme={theme}/>

          {/* Hamburger */}
          <motion.button className="md:hidden p-2 rounded-xl" data-h
            style={{ background:"rgba(59,130,246,0.08)", border:"1px solid rgba(59,130,246,0.2)" }}
            onClick={() => setOp(o => !o)} whileTap={{ scale:0.93 }}>
            {op ? <FiX size={17} color={BLUE}/> : <FiMenu size={17} color={BLUE}/>}
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {op && (
          <motion.div className="absolute top-[4.5rem] left-4 right-4 rounded-2xl p-3 flex flex-col gap-0.5"
            style={d?ND:NL}
            initial={{ opacity:0, y:-10, scale:0.96 }}
            animate={{ opacity:1, y:0,   scale:1 }}
            exit={{ opacity:0, y:-10, scale:0.96 }}
            transition={{ duration:0.2 }}>
            {NAV.map(link => (
              <button key={link} onClick={() => go(link)}
                className="text-left px-4 py-3 rounded-xl text-sm font-medium"
                style={{ fontFamily:SF,
                  color:ac===link?BLUE:(d?"rgba(238,242,255,0.75)":"rgba(12,15,29,0.7)"),
                  background:ac===link?"rgba(59,130,246,0.09)":"transparent" }}>
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ theme }: { theme: Theme }) {
  const d = theme === "dark";
  const [sy, setSy] = useState(0);
  const [mx, setMx] = useState(0);

  useEffect(() => {
    const fn = () => setSy(window.scrollY);
    window.addEventListener("scroll", fn, {passive:true});
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const opac = Math.max(0, 1 - sy / 580);

  return (
    <section id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background:d?"linear-gradient(160deg,#030712 60%,#070c1f)":"linear-gradient(160deg,#f7f8fc 60%,#eef2ff)" }}
      onMouseMove={e => setMx((e.clientX/window.innerWidth - 0.5) * 20)}>

      <Orb col="#3b82f6" w={720} h={580} x="-14%" y="-12%" delay={0}/>
      <Orb col="#8b5cf6" w={620} h={520} x="58%"  y="28%"  delay={2}/>
      <Orb col="#06b6d4" w={440} h={440} x="24%"  y="62%"  delay={5}/>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:`linear-gradient(rgba(59,130,246,${d?.03:.052}) 1px,transparent 1px),`
          +`linear-gradient(90deg,rgba(59,130,246,${d?.03:.052}) 1px,transparent 1px)`,
        backgroundSize:"80px 80px",
      }}/>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 text-center"
        style={{ transform:`translateY(${sy*.34}px)`, opacity:opac }}>

        {/* Available badge */}
        <motion.div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-14 text-xs font-medium"
          style={{ fontFamily:SF, ...gls(theme), color:d?"rgba(238,242,255,0.72)":"rgba(12,15,29,0.62)" }}
          initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.65, delay:0.1, ease:EASE }}>
          <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background:"#22c55e" }}
            animate={{ scale:[1,1.5,1], opacity:[1,0.5,1] }}
            transition={{ duration:2.4, repeat:Infinity }}/>
          Available for new opportunities
        </motion.div>

        {/* ANIKET TYAGI — the centrepiece */}
        <div style={{ transform:`translateX(${mx}px)`, transition:"transform 0.1s ease-out" }}>
          {["ANIKET","TYAGI"].map((word, wi) => (
            <motion.h1 key={word} className="block font-black tracking-tight"
              style={{
                fontFamily:DF,
                fontSize:"clamp(4.5rem,13vw,10rem)",
                letterSpacing:"-0.038em",
                lineHeight:0.9,
                background: d
                  ? wi===0
                    ? "linear-gradient(150deg,#ffffff 30%,rgba(238,242,255,0.62))"
                    : "linear-gradient(150deg,rgba(238,242,255,0.8),rgba(59,130,246,0.72))"
                  : wi===0
                    ? "linear-gradient(150deg,#0c0f1d 30%,#1e293b)"
                    : "linear-gradient(150deg,#1e293b,rgba(59,130,246,0.88))",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}
              initial={{ opacity:0, y:52, filter:"blur(14px)" }}
              animate={{ opacity:1, y:0,  filter:"blur(0px)" }}
              transition={{ duration:1.0, delay:0.26+wi*0.14, ease:EASE }}>
              {word}
            </motion.h1>
          ))}
        </div>

        {/* Rule */}
        <motion.div className="w-20 h-px mx-auto my-8"
          style={{ background:`linear-gradient(90deg,transparent,${BLUE},transparent)` }}
          initial={{ scaleX:0, opacity:0 }} animate={{ scaleX:1, opacity:1 }}
          transition={{ duration:0.75, delay:0.68, ease:EASE }}/>

        {/* Role */}
        <motion.p className="mb-14 font-medium tracking-widest uppercase text-sm"
          style={{ fontFamily:SF, letterSpacing:"0.14em",
            color:d?"rgba(238,242,255,0.48)":"rgba(12,15,29,0.46)" }}
          initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.52, ease:EASE }}>
          Frontend Developer &amp; UI/UX Designer
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20"
          initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.68, ease:EASE }}>
          <Mag>
            <motion.button
              onClick={() => document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}
              className="items-center gap-2 px-6 py-3 rounded-2xl text-[0.875rem] font-semibold text-white hidden"
              style={{ fontFamily:SF, background:`linear-gradient(135deg,${BLUE},${PURPLE})`,
                boxShadow:"0 4px 22px rgba(59,130,246,0.42)" }}
              whileHover={{ scale:1.05, y:-2, boxShadow:"0 8px 30px rgba(59,130,246,0.6)" }}
              whileTap={{ scale:0.97 }} data-h>
              View Work <FiArrowUpRight size={15}/>
            </motion.button>
          </Mag>
          <Mag>
            <motion.button
              onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-[0.875rem] font-semibold"
              style={{ fontFamily:SF, ...gls(theme), color:d?"#eef2ff":"#0c0f1d" }}
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }} data-h>
              Let&apos;s Talk <FiMail size={14}/>
            </motion.button>
          </Mag>
        </motion.div>

        {/* Stats */}
        <motion.div className="flex flex-wrap items-center justify-center border-t border-b"
          style={{ borderColor:d?"rgba(255,255,255,0.06)":"rgba(12,15,29,0.07)" }}
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ duration:0.8, delay:0.88, ease:EASE }}>
          {STATS.map((s, i) => (
            <div key={s.v} className="px-10 py-5 text-center" style={{
              borderRight: i<STATS.length-1
                ? `1px solid ${d?"rgba(255,255,255,0.06)":"rgba(12,15,29,0.07)"}` : undefined }}>
              <div className="font-black text-2xl leading-none mb-1"
                style={{ fontFamily:DF, background:`linear-gradient(135deg,${BLUE},${CYAN})`,
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                {s.v}
              </div>
              <div className="text-xs"
                style={{ fontFamily:SF, color:d?"rgba(238,242,255,0.36)":"rgba(12,15,29,0.38)" }}>
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity:0 }} animate={{ opacity:opac }} transition={{ delay:1.6 }}>
        <span className="text-[0.68rem] tracking-[0.2em] uppercase"
          style={{ fontFamily:MF, color:d?"rgba(238,242,255,0.26)":"rgba(12,15,29,0.28)" }}>
          Scroll
        </span>
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.9, repeat:Infinity }}>
          <FiChevronDown size={15} color={d?"rgba(238,242,255,0.26)":"rgba(12,15,29,0.28)"}/>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About({ theme }: { theme: Theme }) {
  const d = theme === "dark";
  return (
    <Sec id="about" theme={theme}>
      <Orb col="#8b5cf6" w={540} h={540} x="68%" y="-8%" delay={1}/>
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div>
            <SH eye="// About" title={"I build interfaces that\nfeel alive."} theme={theme}/>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once:true }} transition={tx(0.1)}>
              <p className="leading-[1.78] mb-4"
                style={{ fontFamily:SF, fontSize:"0.9375rem",
                  color:d?"rgba(238,242,255,0.56)":"rgba(12,15,29,0.56)" }}>
                With 8+ years at the intersection of design and engineering, I&apos;ve shipped
                products used by millions at Vercel, Stripe, and Linear. I specialise in turning
                complex problems into elegant, intuitive experiences.
              </p>
              <p className="leading-[1.78] mb-10"
                style={{ fontFamily:SF, fontSize:"0.9375rem",
                  color:d?"rgba(238,242,255,0.42)":"rgba(12,15,29,0.43)" }}>
                The best interfaces are invisible — they guide users naturally so content can shine.
                That philosophy drives every decision I make.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((s, i) => (
                  <motion.div key={s.v}
                    className="p-5 rounded-2xl group relative overflow-hidden"
                    style={gls(theme)}
                    variants={fadeUp} initial="hidden" whileInView="visible"
                    viewport={{ once:true }} transition={tx(0.18+i*0.07)}
                    whileHover={{ y:-3, scale:1.02 }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background:"radial-gradient(circle at 20% 50%,rgba(59,130,246,0.08),transparent 70%)" }}/>
                    <span className="block text-2xl font-black mb-1"
                      style={{ fontFamily:DF, background:`linear-gradient(135deg,${BLUE},${CYAN})`,
                        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                      {s.v}
                    </span>
                    <span className="block text-xs"
                      style={{ fontFamily:SF, color:d?"rgba(238,242,255,0.4)":"rgba(12,15,29,0.44)" }}>
                      {s.l}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Photo + Resume card */}
          <div className="space-y-5">
            <motion.div
              className="relative rounded-[2rem] overflow-hidden aspect-[3/4] max-w-xs mx-auto lg:mx-0"
              style={{ boxShadow:d
                ? "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)"
                : "0 40px 80px rgba(59,130,246,0.1), 0 0 0 1px rgba(255,255,255,0.9)" }}
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once:true }} transition={tx(0)}>
              <img
                src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=600&h=800&fit=crop&auto=format"
                alt="Aniket Tyagi" className="w-full h-full object-cover"/>
              <div className="absolute inset-0" style={{ background:d
                ? "linear-gradient(to bottom,transparent 55%,rgba(3,7,18,0.7))"
                : "linear-gradient(to bottom,transparent 55%,rgba(247,248,252,0.5))" }}/>
              <motion.div className="absolute bottom-5 left-5 px-4 py-3 rounded-2xl"
                style={gls(theme)}
                animate={{ y:[0,-7,0] }}
                transition={{ duration:4.2, repeat:Infinity, ease:"easeInOut" }}>
                <span className="block text-xl font-black" style={{ fontFamily:DF, color:BLUE }}>8+</span>
                <span className="block text-xs"
                  style={{ fontFamily:SF, color:d?"rgba(238,242,255,0.44)":"rgba(12,15,29,0.44)" }}>
                  Years of craft
                </span>
              </motion.div>
            </motion.div>
            <div className="max-w-xs mx-auto lg:mx-0">
              <ResumeCard theme={theme}/>
            </div>
          </div>
        </div>
      </div>
    </Sec>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience({ theme }: { theme: Theme }) {
  const d = theme === "dark";
  return (
    <Sec id="experience" theme={theme} alt>
      <Orb col="#06b6d4" w={500} h={500} x="-9%" y="35%" delay={1}/>
      {/* <div className="max-w-6xl mx-auto px-8">
        <SH eye="// Journey" title="Work Experience"
          sub="Eight years building products that scale, delight, and endure." theme={theme}/>
        <div className="relative space-y-5">
          <div className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background:`linear-gradient(to bottom,${BLUE},rgba(139,92,246,.3),transparent)` }}/>
          {EXPS.map((exp, i) => (
            <motion.div key={i} className="md:pl-20 relative"
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once:true, margin:"-60px" }} transition={tx(i*0.08)}>
              <div className="hidden md:block absolute left-[17px] top-8 w-[14px] h-[14px] rounded-full border-2 -translate-x-1/2 z-10"
                style={{ background:d?"#030712":"#f7f8fc", borderColor:BLUE,
                  boxShadow:`0 0 14px rgba(59,130,246,0.45)` }}/>
              <motion.div className="p-7 rounded-3xl group relative overflow-hidden" style={gls(theme)}
                whileHover={{ y:-4, boxShadow:d
                  ? "0 16px 52px rgba(0,0,0,0.38), 0 0 0 1px rgba(59,130,246,0.18)"
                  : "0 16px 52px rgba(59,130,246,0.12), 0 0 0 1px rgba(255,255,255,0.98)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background:"radial-gradient(circle at 0% 0%,rgba(59,130,246,0.06),transparent 60%)" }}/>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-bold text-[1.0625rem] leading-snug mb-1"
                      style={{ fontFamily:DF, color:d?"#eef2ff":"#0c0f1d" }}>{exp.role}</h3>
                    <span className="text-sm font-semibold" style={{ fontFamily:SF, color:BLUE }}>{exp.co}</span>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium mb-1"
                      style={{ fontFamily:MF, background:"rgba(59,130,246,0.1)", color:BLUE }}>
                      {exp.period}
                    </span>
                    <p className="text-xs"
                      style={{ fontFamily:SF, color:d?"rgba(238,242,255,0.34)":"rgba(12,15,29,0.36)" }}>
                      {exp.loc}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-[1.74] mb-5"
                  style={{ fontFamily:SF, color:d?"rgba(238,242,255,0.5)":"rgba(12,15,29,0.53)" }}>
                  {exp.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                      style={{ fontFamily:MF,
                        background:d?"rgba(255,255,255,0.05)":"rgba(59,130,246,0.07)",
                        color:d?"rgba(238,242,255,0.58)":"rgba(12,15,29,0.58)",
                        border:`1px solid ${d?"rgba(255,255,255,0.07)":"rgba(59,130,246,0.13)"}` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div> */}
    </Sec>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills({ theme }: { theme: Theme }) {
  const d = theme === "dark";
  return (
    <Sec id="skills" theme={theme}>
      <Orb col="#3b82f6" w={520} h={520} x="64%" y="22%" delay={0}/>
      <div className="max-w-6xl mx-auto px-8">
        <SH eye="// Expertise" title="Skills & Technologies"
          sub="A decade of deliberate practice across the full frontend stack." theme={theme}/>
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {SKILLS.map(({ name, pct, Icon, c }, i) => (
            <motion.div key={name}
              className="p-5 rounded-2xl group relative overflow-hidden"
              style={gls(theme)}
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once:true, margin:"-40px" }} transition={tx(i*0.044)}
              whileHover={{ y:-3 }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background:`radial-gradient(circle at 0% 50%,${c}12,transparent 65%)` }}/>
              <div className="flex items-center gap-3 mb-3.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background:`${c}14`, border:`1px solid ${c}22` }}>
                  <Icon size={15} color={c}/>
                </div>
                <span className="text-sm font-semibold flex-1"
                  style={{ fontFamily:SF, color:d?"#eef2ff":"#0c0f1d" }}>{name}</span>
                <span className="text-xs font-bold shrink-0"
                  style={{ fontFamily:MF, color:BLUE }}>{pct}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden"
                style={{ background:d?"rgba(255,255,255,0.05)":"rgba(12,15,29,0.07)" }}>
                <motion.div className="h-full rounded-full"
                  style={{ background:`linear-gradient(90deg,${BLUE},${c})` }}
                  initial={{ width:0 }} whileInView={{ width:`${pct}%` }} viewport={{ once:true }}
                  transition={{ duration:1.4, delay:0.3+i*0.04, ease:EASE }}/>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Marquee */}
        <div className="relative overflow-hidden py-3">
          <div className="absolute left-0 inset-y-0 w-20 z-10 pointer-events-none"
            style={{ background:`linear-gradient(90deg,${d?"#030712":"#f7f8fc"},transparent)` }}/>
          <div className="absolute right-0 inset-y-0 w-20 z-10 pointer-events-none"
            style={{ background:`linear-gradient(-90deg,${d?"#030712":"#f7f8fc"},transparent)` }}/>
          <motion.div className="flex gap-3 w-max"
            animate={{ x:[0,-1580] }} transition={{ duration:34, repeat:Infinity, ease:"linear" }}>
            {[...MARQUEE,...MARQUEE,...MARQUEE].map((t, i) => (
              <motion.span key={i}
                className="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap"
                style={{ ...gls(theme), fontFamily:MF, color:d?"rgba(238,242,255,0.58)":"rgba(12,15,29,0.56)" }}
                whileHover={{ scale:1.06, color:BLUE }}>
                {t}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </Sec>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects({ theme }: { theme: Theme }) {
  const d = theme === "dark";
  const refs = useRef<(HTMLDivElement|null)[]>([]);
  const [tilts, setT] = useState(() => PROJECTS.map(() => ({rx:0,ry:0})));
  const [hov, setH]   = useState<number|null>(null);

  const tilt = (e: React.MouseEvent, i: number) => {
    const r = refs.current[i]?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX-r.left)/r.width  - 0.5;
    const y = (e.clientY-r.top) /r.height - 0.5;
    setT(t => t.map((v,j) => j===i ? {rx:y*-9, ry:x*9} : v));
  };
  const reset = (i: number) => setT(t => t.map((v,j) => j===i ? {rx:0,ry:0} : v));

  return (
    <Sec id="projects" theme={theme} alt>
      <Orb col="#8b5cf6" w={520} h={520} x="-9%" y="42%" delay={2}/>


    </Sec>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services({ theme }: { theme: Theme }) {
  const d = theme === "dark";
  return (
    <Sec id="services" theme={theme}>
      <Orb col="#06b6d4" w={480} h={480} x="74%" y="48%" delay={1}/>
      <div className="max-w-6xl mx-auto px-8">
        <SH eye="// Offerings" title="What I Do Best"
          sub="End-to-end capability — from first concept to pixel-perfect production." theme={theme}/>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ Icon, title, desc, col }, i) => (
            <motion.div key={title}
              className="p-6 rounded-3xl group relative overflow-hidden"
              style={gls(theme)}
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once:true, margin:"-50px" }} transition={tx(i*0.07)}
              whileHover={{ y:-5, scale:1.015 }} data-h>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{ background:`radial-gradient(ellipse at 10% 10%,${col}0f,transparent 60%)` }}/>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                style={{ background:`${col}12`, border:`1px solid ${col}1e`,
                  boxShadow:`0 0 20px ${col}16` }}>
                <Icon size={20} color={col}/>
              </div>
              <h3 className="font-bold text-[0.9375rem] mb-2.5 leading-snug"
                style={{ fontFamily:DF, color:d?"#eef2ff":"#0c0f1d" }}>{title}</h3>
              <p className="text-sm leading-[1.72]"
                style={{ fontFamily:SF, color:d?"rgba(238,242,255,0.46)":"rgba(12,15,29,0.5)" }}>
                {desc}
              </p>
              <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background:`radial-gradient(circle,${col}1e,transparent 70%)`, filter:"blur(18px)" }}/>
            </motion.div>
          ))}
        </div>
      </div>
    </Sec>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials({ theme }: { theme: Theme }) {
  const d = theme === "dark";
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c+1) % TESTIMONIALS.length), 5600);
    return () => clearInterval(t);
  }, []);

  return (
    <Sec id="testimonials" theme={theme} alt>
      <Orb col="#3b82f6" w={460} h={460} x="33%" y="15%" delay={2}/>
      <div className="max-w-4xl mx-auto px-8">
        <SH eye="// Reviews" title="Client Testimonials" theme={theme}/>
        <AnimatePresence mode="wait">
          <motion.div key={cur}
            className="p-10 md:p-14 rounded-3xl relative overflow-hidden text-center"
            style={gls(theme)}
            initial={{ opacity:0, y:20, scale:0.97, filter:"blur(5px)" }}
            animate={{ opacity:1, y:0,  scale:1,    filter:"blur(0px)" }}
            exit={{ opacity:0, y:-20, scale:0.97, filter:"blur(5px)" }}
            transition={{ duration:0.5 }}>
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background:"linear-gradient(90deg,transparent,rgba(59,130,246,0.38),transparent)" }}/>
            <div className="flex justify-center gap-0.5 mb-8">
              {[...Array(5)].map((_, i) => (
                <motion.span key={i} className="text-yellow-400 text-lg"
                  initial={{ opacity:0, y:5 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:i*0.06 }}>★</motion.span>
              ))}
            </div>
            <blockquote className="text-lg md:text-xl leading-[1.74] mb-10 italic"
              style={{ fontFamily:DF, color:d?"rgba(238,242,255,0.82)":"rgba(12,15,29,0.76)" }}>
              &ldquo;{TESTIMONIALS[cur].text}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <img src={TESTIMONIALS[cur].img} alt={TESTIMONIALS[cur].name}
                className="w-11 h-11 rounded-full object-cover"
                style={{ border:"2px solid rgba(59,130,246,0.4)" }}/>
              <div className="text-left">
                <p className="font-bold text-sm"
                  style={{ fontFamily:DF, color:d?"#eef2ff":"#0c0f1d" }}>
                  {TESTIMONIALS[cur].name}
                </p>
                <p className="text-xs" style={{ fontFamily:SF, color:BLUE }}>
                  {TESTIMONIALS[cur].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-7">
          {TESTIMONIALS.map((_, i) => (
            <motion.button key={i} onClick={() => setCur(i)}
              className="rounded-full cursor-pointer" style={{ height:6 }}
              animate={{ width:i===cur?22:6, background:i===cur?BLUE:"rgba(59,130,246,0.24)" }}
              transition={{ duration:0.3 }} data-h/>
          ))}
        </div>
      </div>
    </Sec>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact({ theme }: { theme: Theme }) {
  const d = theme === "dark";
  const [form, setF] = useState({ name:"", email:"", subject:"", message:"" });
  const [st, setSt]  = useState<"idle"|"sending"|"sent">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setSt("sending");
    setTimeout(() => { setSt("sent"); setTimeout(() => setSt("idle"), 3000); }, 1600);
  };

  const fs: React.CSSProperties = {
    width:"100%", padding:"12px 16px", fontSize:"0.875rem",
    fontFamily:SF, borderRadius:"0.875rem",
    background:d?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.84)",
    border:`1px solid ${d?"rgba(255,255,255,0.07)":"rgba(59,130,246,0.16)"}`,
    color:d?"#eef2ff":"#0c0f1d", outline:"none",
    transition:"border-color .22s,box-shadow .22s",
  };

  return (
    <Sec id="contact" theme={theme}>
      <Orb col="#8b5cf6" w={460} h={460} x="-9%" y="42%" delay={2}/>
      <Orb col="#06b6d4" w={380} h={380} x="70%" y="5%"  delay={1}/>
      <div className="max-w-6xl mx-auto px-8">
        <SH eye="// Connect" title="Let's Build Something"
          sub="Open to freelance projects, full-time roles, and creative collaborations." theme={theme}/>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div className="space-y-4" variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once:true }} transition={tx(0)}>
            {[
              { I:FiMail,   l:"Email",    v:"anityagi8860@gmail.com", h:"mailto:anityagi8860@gmail.com" },
              { I:FiPhone,  l:"Phone",    v:"+91 85270 70243",    h:"tel:+918527070243" },
              { I:FiMapPin, l:"Location", v:"Utaar Pradesh, India",   h:"#" },
            ].map(({ I, l, v, h }) => (
              <motion.a key={l} href={h}
                className="flex items-center gap-4 p-4 rounded-2xl no-underline"
                style={gls(theme)} whileHover={{ x:5, scale:1.01 }} data-h>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background:"rgba(59,130,246,0.1)", border:"1px solid rgba(59,130,246,0.2)" }}>
                  <I size={15} color={BLUE}/>
                </div>
                <div>
                  <p className="text-xs mb-0.5"
                    style={{ fontFamily:SF, color:d?"rgba(238,242,255,0.34)":"rgba(12,15,29,0.36)" }}>{l}</p>
                  <p className="text-sm font-medium"
                    style={{ fontFamily:SF, color:d?"#eef2ff":"#0c0f1d" }}>{v}</p>
                </div>
              </motion.a>
            ))}
            <div className="flex gap-2.5 pt-2 hidden">
              {[{I:FiGithub,l:"GitHub"},{I:FiLinkedin,l:"LinkedIn"},
                {I:FiTwitter,l:"Twitter"},{I:FiInstagram,l:"Instagram"}].map(({I,l}) => (
                <Mag key={l} str={0.4}>
                  <motion.a href="#" aria-label={l}
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={gls(theme)}
                    whileHover={{ scale:1.12, y:-2 }} data-h>
                    <I size={15} color={d?"rgba(238,242,255,0.58)":"rgba(12,15,29,0.54)"}/>
                  </motion.a>
                </Mag>
              ))}
            </div>
          </motion.div>

          <motion.form onSubmit={submit} className="space-y-3.5"
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once:true }} transition={tx(0.1)}>
            <div className="grid grid-cols-2 gap-3.5">
              <input placeholder="Name" value={form.name} required style={fs}
                onChange={e => setF({...form, name:e.target.value})}/>
              <input placeholder="Email" type="email" value={form.email} required style={fs}
                onChange={e => setF({...form, email:e.target.value})}/>
            </div>
            <input placeholder="Subject" value={form.subject} style={fs}
              onChange={e => setF({...form, subject:e.target.value})}/>
            <textarea placeholder="Tell me about your project…" rows={5} value={form.message} required
              style={{ ...fs, resize:"none" }}
              onChange={e => setF({...form, message:e.target.value})}/>
            <Mag className="block" str={0.12}>
              <motion.button type="submit" disabled={st==="sending"}
                className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ fontFamily:SF,
                  background: st==="sent"
                    ? "linear-gradient(135deg,#22c55e,#16a34a)"
                    : `linear-gradient(135deg,${BLUE},${PURPLE})`,
                  boxShadow:"0 4px 18px rgba(59,130,246,0.36)" }}
                whileHover={{ scale:1.02, boxShadow:"0 8px 26px rgba(59,130,246,0.52)" }}
                whileTap={{ scale:0.98 }} data-h>
                <AnimatePresence mode="wait">
                  {st==="sent"
                    ? <motion.span key="s" className="flex items-center gap-2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        <FiCheck size={14}/> Message Sent
                      </motion.span>
                    : st==="sending"
                    ? <motion.span key="l" className="flex items-center gap-2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/>
                        Sending…
                      </motion.span>
                    : <motion.span key="i" className="flex items-center gap-2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        Send Message <FiSend size={13}/>
                      </motion.span>
                  }
                </AnimatePresence>
              </motion.button>
            </Mag>
          </motion.form>
        </div>
      </div>
    </Sec>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ theme }: { theme: Theme }) {
  const d = theme === "dark";
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <footer className="relative py-14 px-8 overflow-hidden"
      style={{ background:d?"#040b1a":"#eef2ff",
        borderTop:`1px solid ${d?"rgba(59,130,246,0.08)":"rgba(59,130,246,0.11)"}` }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <NavLogo theme={theme} onClick={() => window.scrollTo({top:0,behavior:"smooth"})}/>
          <p className="mt-2 text-xs"
            style={{ fontFamily:SF, color:d?"rgba(238,242,255,0.3)":"rgba(12,15,29,0.36)" }}>
            Frontend Developer · UI/UX Designer
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          {NAV.map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())} className="text-xs transition-colors"
              style={{ fontFamily:SF, color:d?"rgba(238,242,255,0.38)":"rgba(12,15,29,0.42)" }}
              onMouseEnter={e => (e.currentTarget.style.color = BLUE)}
              onMouseLeave={e => (e.currentTarget.style.color = d?"rgba(238,242,255,0.38)":"rgba(12,15,29,0.42)")}>
              {l}
            </button>
          ))}
        </nav>
        <p className="text-xs"
          style={{ fontFamily:SF, color:d?"rgba(238,242,255,0.22)":"rgba(12,15,29,0.3)" }}>
          © 2025 Aniket Tyagi
        </p>
      </div>

      {/* Back to top */}
      <Mag className="fixed bottom-6 right-6 z-50" str={0.55}>
        <motion.button onClick={() => window.scrollTo({top:0,behavior:"smooth"})}
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background:`linear-gradient(135deg,${BLUE},${PURPLE})`,
            boxShadow:"0 4px 18px rgba(59,130,246,0.48)" }}
          whileHover={{ scale:1.1, y:-2 }} whileTap={{ scale:0.95 }}
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:2.5, duration:0.6 }}
          aria-label="Back to top" data-h>
          <FiArrowUpRight size={15} color="white" style={{ transform:"rotate(-45deg)" }}/>
        </motion.button>
      </Mag>
    </footer>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme]   = useState<Theme>(() => {
    try { return (localStorage.getItem("pt") as Theme) ?? "dark"; } catch { return "dark"; }
  });
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.style.fontFamily = SF;
    document.body.style.overflowX  = "hidden";
    document.body.style.cursor     = "none";
  }, [theme]);

  // Cinematic circular-reveal wave transition
  const toggle = useCallback((e: React.MouseEvent) => {
    const next = theme === "dark" ? "light" : "dark";
    const wave = waveRef.current;
    if (!wave) { setTheme(next); return; }
    const { clientX:x, clientY:y } = e;
    const maxR = Math.max(
      Math.hypot(x,y),
      Math.hypot(window.innerWidth-x, y),
      Math.hypot(x, window.innerHeight-y),
      Math.hypot(window.innerWidth-x, window.innerHeight-y),
    ) * 1.06;
    wave.style.cssText = `display:block;background:${next==="dark"?"#030712":"#f7f8fc"};clip-path:circle(0px at ${x}px ${y}px);transition:none;`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      wave.style.transition = "clip-path .92s cubic-bezier(0.65,0,0.35,1)";
      wave.style.clipPath   = `circle(${maxR}px at ${x}px ${y}px)`;
    }));
    setTimeout(() => {
      setTheme(next);
      localStorage.setItem("pt", next);
      requestAnimationFrame(() => {
        if (waveRef.current) waveRef.current.style.cssText = "display:none;";
      });
    }, 860);
  }, [theme]);

  const d = theme === "dark";

  return (
    <div className="min-h-screen"
      style={{ background:d?"#030712":"#f7f8fc", color:d?"#eef2ff":"#0c0f1d" }}>

      <AnimatePresence>
        {!loaded && <Loader key="loader" onDone={() => setLoaded(true)}/>}
      </AnimatePresence>

      <WaveDiv wr={waveRef}/>
      {loaded && <Cursor/>}
      <ScrollBar/>

      <AnimatePresence>
        {loaded && (
          <motion.div key="main"
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:0.55, ease:"easeOut" }}>
            <Navbar       theme={theme} onToggle={toggle}/>
            <Hero         theme={theme}/>
            <About        theme={theme}/>
            <Experience   theme={theme}/>
            <Skills       theme={theme}/>
            <Projects     theme={theme}/>
            <Services     theme={theme}/>
            <Testimonials theme={theme}/>
            <Contact      theme={theme}/>
            <Footer       theme={theme}/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
