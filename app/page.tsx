"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect, CSSProperties } from "react";

/* ══════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════ */
type Project = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  fromColor: string;
  glowRgb: string;
  tags: string[];
  year: string;
  category: string;
  github: string;
  image?: string;
};

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "System Monitor",
    subtitle: "Real-Time Systems",
    description:
      "Developed a high-performance real-time monitoring system with a C++ backend powering WebSocket streams for live CPU, memory, disk, and process insights in a React interface.",
    fromColor: "#7f1d1d",
    glowRgb: "220,38,38",
    tags: ["C++", "React", "WebSockets", "Node.js"],
    year: "2025",
    category: "Systems Engineering",
    github: "https://github.com/snehamii/System-Monitor.git",
    image: "/projects/system_monitor.png",
  },
  {
    id: 2,
    title: "Sales Analytics Dashboard",
    subtitle: "Data Analytics",
    description:
      "Analyzed multi-year sales datasets using SQL and Tableau to identify profitability KPIs and build interactive dashboards for business insights and revenue tracking.",
    fromColor: "#1e3a5f",
    glowRgb: "59,130,246",
    tags: ["SQL", "Tableau", "KPIs", "Analytics"],
    year: "2025",
    category: "Business Intelligence",
    github: "https://github.com/snehamii/Sales-KPI-Analysis-and-Dashboard.git",
    image: "/projects/sales_analytics.png",
  },
  {
    id: 3,
    title: "Plant Disease Detection",
    subtitle: "Machine Learning",
    description:
      "Engineered a CNN-based deep learning system using TensorFlow and OpenCV to classify plant diseases from leaf images with high prediction accuracy.",
    fromColor: "#3b0764",
    glowRgb: "139,92,246",
    tags: ["TensorFlow", "OpenCV", "CNN", "Python"],
    year: "2024",
    category: "AI&ML",
    github: "https://github.com/snehamii/Plant-disease-detection.git",
    image: "/projects/plant_detection.png",
  },
  {
    id: 5,
    title: "Computer Interaction",
    subtitle: "AI Interaction System",
    description:
      "Developed a gesture-based computer interaction system using Python, OpenCV, ctypes, and machine learning techniques where hand movements controlled mouse interactions in real time.",
    fromColor: "#083344",
    glowRgb: "6,182,212",
    tags: ["Python", "OpenCV", "ctypes", "Machine Learning"],
    year: "2026",
    category: "Machine Learning",
    github: "https://github.com/snehamii/Computer-Interaction-ML.git",
    image: "/projects/computer_interaction.png",
  },
  {
    id: 4,
    title: "Nayan",
    subtitle: "AI + IoT Accessibility",
    description:
      "Developed an AI-powered assistive navigation system for visually impaired individuals using YOLO, Kotlin, and IoT integration to detect nearby objects, obstacles, and potential hazards in real time for safer navigation.",
    fromColor: "#064e3b",
    glowRgb: "16,185,129",
    tags: ["YOLO", "Kotlin", "IoT", "Computer Vision"],
    year: "2026",
    category: "Accessibility Tech",
    github: "https://github.com/snehamii/Nayan---An-App-for-the-blind.git",
    image: "/projects/nayan.png",
  },
];

const SKILLS = [
  { label: "Machine Learning", level: 85 },
  { label: "Python / TensorFlow", level: 82 },
  { label: "Data Analytics", level: 88 },
  { label: "SQL & Power BI", level: 84 },
  { label: "React / Next.js", level: 75 },
  { label: "Tableau / Excel", level: 86 },
];

const STATS = [
  { value: "Multiple", label: "Technical Projects" },
  { value: "AI&ML", label: "Analytics Focus" },
  { value: "Data", label: "Driven Solutions" },
  { value: "Leadership", label: "& Community" },
];

const ROLES = ["AI&ML Engineer", "Data Analyst", "Builder", "Researcher"];

const CERTIFICATIONS = [
  {
    title: "AWS Certified Machine Learning Engineer",
    image: "/certificates/AWS ML Engineer.png",
    issuer: "Amazon Web Services",
    glowRgb: "255,153,0",
  },
  {
    title: "Microsoft Certified: Power BI Data Analyst Associate",
    image: "/certificates/MIcrosoft PowerBI.png",
    issuer: "Microsoft",
    glowRgb: "0,164,239",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    image: "/certificates/AWS Cloud Practioner.png",
    issuer: "Amazon Web Services",
    glowRgb: "255,153,0",
  },
  {
    title: "Salesforce Certified Tableau Desktop Professional",
    image: "/certificates/Salesforce tableau.png",
    issuer: "Salesforce / Tableau",
    glowRgb: "226,135,67",
  },
];

/* ══════════════════════════════════════════════
   AMBIENT ORB
══════════════════════════════════════════════ */
function Orb({
  rgb,
  size,
  opacity,
  style,
}: {
  rgb: string;
  size: number;
  opacity: number;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        position: "absolute",
        borderRadius: "50%",
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(${rgb},1) 0%, transparent 70%)`,
        filter: `blur(${Math.round(size * 0.22)}px)`,
        opacity,
        ...style,
      }}
    />
  );
}

/* ══════════════════════════════════════════════
   NOISE OVERLAY
══════════════════════════════════════════════ */
function Noise() {
  return (
    <div
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }}
    />
  );
}

/* ══════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════ */
function Navbar({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const links = ["home", "projects", "about", "certifications", "contact"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        background: scrolled ? "rgba(6,6,6,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.5)" : "none",
        transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "18px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#dc2626",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(220,38,38,0.5)",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 13 }}>S</span>
          </div>
          <span
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: 17,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Sneha
          </span>
        </div>

        {/* Links */}
        <div
          className="nav-links"
          style={{ display: "flex", gap: 36, alignItems: "center" }}
        >
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              style={{
                position: "relative",
                color: active === link ? "#fff" : "rgba(255,255,255,0.38)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                transition: "color 0.25s",
                paddingBottom: 4,
              }}
            >
              {link}
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: 1,
                  width: active === link ? "100%" : 0,
                  background: "#dc2626",
                  transition: "width 0.3s ease",
                  display: "block",
                }}
              />
            </a>
          ))}

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
              color: "#f87171",
              padding: "8px 20px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Hire Me →
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#060606",
      }}
    >
      <Orb rgb="220,38,38" size={700} opacity={0.13} style={{ top: -200, left: "50%", transform: "translateX(-50%)" }} />
      <Orb rgb="220,38,38" size={450} opacity={0.07} style={{ top: "40%", left: -150 }} />
      <Orb rgb="124,58,237" size={400} opacity={0.06} style={{ bottom: -100, right: -100 }} />

      {/* Vignette */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 35%, #060606 100%)", pointerEvents: "none", zIndex: 1 }} />

      {/* Scanlines */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.007) 2px,rgba(255,255,255,0.007) 4px)", pointerEvents: "none", zIndex: 1 }} />

      <motion.div style={{ y, opacity: fadeOut, position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 32 }}
        >
          <div style={{ height: 1, width: 48, background: "linear-gradient(90deg, transparent, #dc2626)" }} />
          <span style={{ color: "rgba(248,113,113,0.7)", fontSize: 10, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" }}>
            Life of S.
          </span>
          <div style={{ height: 1, width: 48, background: "linear-gradient(270deg, transparent, #dc2626)" }} />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 48, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: "clamp(4.5rem, 16vw, 13rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.04em", color: "#ffffff", marginBottom: 24 }}
        >
          SNEHA
        </motion.h1>

        {/* Role ticker */}
        <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 40 }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIdx}
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -28, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ color: "rgba(255,255,255,0.42)", fontSize: "clamp(0.9rem, 2vw, 1.3rem)", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              {ROLES[roleIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.06, boxShadow: "0 0 50px rgba(220,38,38,0.5)" }}
            whileTap={{ scale: 0.96 }}
            style={{ background: "#dc2626", color: "#fff", padding: "16px 40px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", boxShadow: "0 0 30px rgba(220,38,38,0.28)" }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.52)", padding: "16px 40px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          >
            About Me
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 10 }}
      >
        <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 22, height: 36, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 6 }}
        >
          <div style={{ width: 2, height: 6, borderRadius: 2, background: "rgba(255,255,255,0.25)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════ */
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Framer Motion values for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring dynamics for smooth movement
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Map mouse positions to rotation values (-6deg to 6deg)
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    
    setMouseX(localX);
    setMouseY(localY);

    // Normalize coordinates (-0.5 to 0.5)
    const normX = localX / width - 0.5;
    const normY = localY / height - 0.5;
    x.set(normX);
    y.set(normY);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={p.github}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "block",
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "linear-gradient(135deg, rgba(18, 18, 18, 0.5) 0%, rgba(10, 10, 10, 0.7) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        cursor: "pointer",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
        boxShadow: hovered
          ? `0 0 50px rgba(${p.glowRgb},0.24), 0 24px 48px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.09)`
          : "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease",
        textDecoration: "none",
      }}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(${p.glowRgb}, 0.08), transparent 80%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Interactive Cursor Spotlight Border Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          pointerEvents: "none",
          border: "1px solid transparent",
          background: `radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(${p.glowRgb}, 0.5), transparent 70%) border-box`,
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          zIndex: 3,
        }}
      />

      {/* Thumbnail Container */}
      <div
        style={{
          height: 220,
          position: "relative",
          overflow: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated background & image */}
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${p.fromColor} 0%, #000 100%)`,
          }}
        >
          {/* Subtle grid pattern overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.1,
              backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: "16px 16px",
              zIndex: 3,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 30% 40%, rgba(${p.glowRgb},0.25) 0%, transparent 70%)`,
              zIndex: 3,
            }}
          />

          {/* Project Image with subtle zoom, blur, and opacity blend */}
          {p.image && (
            <img
              src={p.image}
              alt={p.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: hovered ? 0.7 : 0.4,
                filter: hovered ? "grayscale(10%) contrast(110%)" : "grayscale(40%) contrast(100%) blur(0.5px)",
                transition: "opacity 0.6s ease, filter 0.6s ease",
              }}
            />
          )}

          {/* Subtle colored overlay to blend the image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, rgba(${p.glowRgb}, 0.05) 0%, rgba(6,6,6,0.5) 100%)`,
              mixBlendMode: "multiply",
              zIndex: 2,
            }}
          />
        </motion.div>

        {/* Ambient Dark Vignette & Fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 30%, rgba(6,6,6,0.3) 70%, rgba(12,12,12,1) 100%)",
            zIndex: 1,
          }}
        />

        {/* Category Pill */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: "rgba(6,6,6,0.7)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            padding: "6px 14px",
            borderRadius: 999,
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            zIndex: 2,
            transform: "translateZ(30px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          }}
        >
          {p.category}
        </div>

        {/* Year */}
        <div
          style={{
            position: "absolute",
            top: 22,
            right: 22,
            color: "rgba(255,255,255,0.45)",
            fontSize: 10,
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: "0.15em",
            zIndex: 2,
            transform: "translateZ(20px)",
          }}
        >
          {p.year}
        </div>

        {/* Floating Arrow Icon */}
        <motion.div
          initial={false}
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.8,
            y: hovered ? 0 : 10,
          }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            transform: "translateZ(50px)",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: `1.5px solid rgba(${p.glowRgb},0.5)`,
              background: "rgba(6,6,6,0.8)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "#fff",
              boxShadow: `0 0 20px rgba(${p.glowRgb}, 0.4)`,
            }}
          >
            →
          </div>
        </motion.div>
      </div>

      {/* Body Container */}
      <div
        style={{
          padding: 32,
          position: "relative",
          zIndex: 2,
          transform: "translateZ(40px)",
          transformStyle: "preserve-3d",
        }}
      >
        <p
          style={{
            color: `rgba(${p.glowRgb},0.85)`,
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {p.subtitle}
        </p>
        <h3
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.25,
            marginBottom: 14,
          }}
        >
          {p.title}
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 13.5,
            lineHeight: 1.8,
            marginBottom: 24,
            fontWeight: 400,
          }}
        >
          {p.description}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 24 }}>
          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {p.tags.map((tag) => (
              <motion.span
                key={tag}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                whileHover={{
                  scale: 1.05,
                  background: `rgba(${p.glowRgb},0.15)`,
                  borderColor: `rgba(${p.glowRgb},0.4)`,
                  color: "#fff",
                }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.45)",
                  padding: "5px 14px",
                  borderRadius: 999,
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  cursor: "default",
                  transition: "background 0.3s, border-color 0.3s, color 0.3s",
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {p.github && (
            <motion.div
              whileHover={{
                scale: 1.05,
                background: `rgba(${p.glowRgb},0.12)`,
                borderColor: `rgba(${p.glowRgb},0.4)`,
                color: "#fff",
                boxShadow: `0 0 15px rgba(${p.glowRgb},0.2)`,
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "8px 16px",
                color: "rgba(255,255,255,0.55)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.05em",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                textDecoration: "none",
                position: "relative",
                zIndex: 10,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        animate={{ boxShadow: hovered ? `inset 0 0 0 1px rgba(${p.glowRgb},0.45)` : "inset 0 0 0 1px transparent" }}
        transition={{ duration: 0.4 }}
        style={{ position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none" }}
      />
    </motion.a>
  );
}

/* ══════════════════════════════════════════════
   STATS BAR
══════════════════════════════════════════════ */
function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="stats-grid"
      style={{ margin: "80px auto 0", borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", padding: "40px 48px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, background: "linear-gradient(135deg, rgba(220,38,38,0.04) 0%, transparent 50%, rgba(124,58,237,0.03) 100%)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
    >
      {STATS.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{s.value}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.22em", textTransform: "uppercase" }}>{s.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   SKILL BAR
══════════════════════════════════════════════ */
function SkillBar({ label, level, index }: { label: string; level: number; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.08 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 500 }}>{label}</span>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, fontFamily: "monospace" }}>{level}%</span>
      </div>
      <div style={{ height: 1, width: "100%", borderRadius: 2, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay: index * 0.08 + 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, #dc2626, #f97316)", boxShadow: "0 0 8px rgba(220,38,38,0.7)" }}
        />
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function Home() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", "projects", "about", "certifications", "contact"];
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.38 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#060606", color: "#fff", overflowX: "hidden", position: "relative" }}>
      <Noise />
      <Navbar active={active} />

      {/* ── HERO ── */}
      <Hero />

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        className="projects-section"
        style={{ position: "relative", padding: "120px 48px", maxWidth: 1280, margin: "0 auto" }}
      >
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: 56 }}>
          <p style={{ color: "rgba(248,113,113,0.6)", fontSize: 10, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 16 }}>Selected Work</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <h2 style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: "#fff" }}>
              Featured<br /><span style={{ color: "rgba(255,255,255,0.18)" }}>Projects</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, maxWidth: 280, lineHeight: 1.8 }}>
              A curated selection of AI/ML projects, analytics solutions, and modern web applications.
            </p>
          </div>
          <div style={{ marginTop: 28, height: 1, background: "linear-gradient(90deg, rgba(220,38,38,0.5), transparent)" }} />
        </motion.div>

        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </div>

        <StatsBar />
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad" style={{ position: "relative", padding: "120px 48px", overflow: "hidden" }}>
        <Orb rgb="220,38,38" size={600} opacity={0.07} style={{ top: 0, right: -150 }} />

        <div className="about-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <p style={{ color: "rgba(248,113,113,0.6)", fontSize: 10, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 16 }}>The Story</p>
            <h2 style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 32 }}>
              About<br /><span style={{ color: "rgba(255,255,255,0.18)" }}>Me</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, color: "rgba(255,255,255,0.42)", fontSize: 15, lineHeight: 1.9 }}>
              <p>I&apos;m <strong style={{ color: "#fff", fontWeight: 700 }}>Sneha Mishra</strong> — a tech enthusiast, AI &amp; data analytics explorer, movie buff, occasional public speaker, and passionate horse rider. I enjoy building intelligent systems, interactive dashboards, and modern digital experiences that combine creativity with problem solving.</p>

<p>Whether it&apos;s developing AI driven projects, leading student communities, speaking in front of a crowd, or planning my next travel adventure, I&apos;m always drawn towards experiences that challenge me and help me grow.</p>

<p>I believe in staying curious, thinking creatively, and building things that are both impactful and meaningful. If you are also someone who loves any of these things, <span style={{ color: "rgba(255,255,255,0.68)" }}>Let&apos;s Connect!</span></p>
            </div>
            <div className="cta-group" style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
              <motion.a href="#contact" whileHover={{ scale: 1.05, boxShadow: "0 0 36px rgba(220,38,38,0.4)" }} whileTap={{ scale: 0.96 }} style={{ background: "#dc2626", color: "#fff", padding: "14px 32px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", boxShadow: "0 0 24px rgba(220,38,38,0.25)", textAlign: "center" }}>
                Get In Touch
              </motion.a>
              <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.48)", padding: "14px 32px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center" }}>
                See Work
              </motion.a>
            </div>
          </motion.div>

          {/* Right – skills */}
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 8 }}>Core Expertise</p>
            {SKILLS.map((s, i) => <SkillBar key={s.label} {...s} index={i} />)}
          </motion.div>
        </div>
      </section>
      {/* ── CERTIFICATIONS ── */}
<section
  id="certifications"
  className="section-pad"
  style={{
    position: "relative",
    padding: "120px 48px",
    overflow: "hidden",
  }}
>
  <Orb
    rgb="124,58,237"
    size={500}
    opacity={0.06}
    style={{ top: -100, right: -120 }}
  />

  <div style={{ maxWidth: 1280, margin: "0 auto" }}>
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{ marginBottom: 56 }}
    >
      <p
        style={{
          color: "rgba(248,113,113,0.6)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        Learning Journey
      </p>

      <h2
        style={{
          fontSize: "clamp(2.5rem,7vw,5.5rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "#fff",
          marginBottom: 20,
        }}
      >
        Certifications
      </h2>

      <p
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: 14,
          maxWidth: 700,
          lineHeight: 1.9,
        }}
      >
        Certifications and learning experiences that strengthened my
        foundation in AI/ML, cloud technologies, analytics, and modern
        data tools.
      </p>
    </motion.div>

    <div
      className="projects-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 20,
      }}
    >
      {CERTIFICATIONS.map((cert, index) => (
        <motion.a
          key={cert.title}
          href={cert.image}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: index * 0.1 }}
          whileHover="hover"
          variants={{
            hover: {
              scale: 1.02,
              borderColor: "rgba(220,38,38,0.45)",
              boxShadow: "0 0 40px rgba(220,38,38,0.12)",
            }
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 24,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            overflow: "hidden",
            textDecoration: "none",
            transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
          }}
        >
          {/* Certificate Image Container */}
          <div
            style={{
              height: 220,
              position: "relative",
              overflow: "hidden",
              background: "rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Cinematic Gradient Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 30%, rgba(6,6,6,0.5) 75%, rgba(6,6,6,0.95) 100%)",
                zIndex: 2,
              }}
            />

            {/* Glowing Reflection/Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle at 50% 120%, rgba(${cert.glowRgb}, 0.12), transparent 70%)`,
                zIndex: 1,
              }}
            />

            {/* Certificate Image with subtle zoom on hover */}
            <motion.img
              src={cert.image}
              alt={cert.title}
              variants={{
                hover: { scale: 1.05 }
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
              }}
            />
          </div>

          {/* Text Content Area */}
          <div
            style={{
              padding: 32,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  color: "rgba(248,113,113,0.7)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                {cert.issuer}
              </p>

              <h3
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: 700,
                  lineHeight: 1.45,
                  letterSpacing: "-0.02em",
                }}
              >
                {cert.title}
              </h3>
            </div>

            <motion.div
              variants={{
                hover: { color: "rgba(255,255,255,0.85)" }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "rgba(255,255,255,0.35)",
                fontSize: 11,
                fontWeight: 600,
                marginTop: 20,
                transition: "color 0.3s ease",
              }}
            >
              <span>View Certificate</span>
              <span style={{ fontSize: 14 }}>→</span>
            </motion.div>
          </div>
        </motion.a>
      ))}
    </div>
  </div>
</section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ position: "relative", padding: "120px 48px", overflow: "hidden" }}>
        <Orb rgb="220,38,38" size={700} opacity={0.08} style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <p style={{ color: "rgba(248,113,113,0.6)", fontSize: 10, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 20 }}>Let&apos;s Build Together</p>
            <h2 style={{ fontSize: "clamp(3rem,10vw,7rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 24, color: "#fff" }}>Say Hello</h2>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 16, lineHeight: 1.85, maxWidth: 480, margin: "0 auto 48px" }}>
              Open to opportunities in AI/ML, data analytics, and software development.
            </p>
            <div className="cta-group" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <motion.a href="mailto:snehami1412@gmail.com" whileHover={{ scale: 1.06, boxShadow: "0 0 56px rgba(220,38,38,0.55)" }} whileTap={{ scale: 0.96 }} style={{ background: "#dc2626", color: "#fff", padding: "18px 48px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", boxShadow: "0 0 30px rgba(220,38,38,0.3)", textAlign: "center" }}>
                Send Email
              </motion.a>
              <motion.a href="https://www.linkedin.com/in/snehamish1705/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", padding: "18px 48px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", textAlign: "center" }}>
                LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "28px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.14)", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase" }}>Life of S</span>
          <span style={{ color: "rgba(255,255,255,0.1)", fontSize: 11, fontFamily: "monospace" }}>Next.js · Framer Motion</span>
        </div>
      </footer>
    </main>
  );
}