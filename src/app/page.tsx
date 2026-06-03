"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, animate, motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";

// ================= DYNAMIC ANIMATED NUMBER COMPONENT =================
function AnimatedNumber({
  value,
  suffix = "",
  hasComma = false,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  hasComma?: boolean;
  decimals?: number;
}) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          setCurrent(latest);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  const formatted = hasComma
    ? Math.round(current).toLocaleString("en-US")
    : current.toFixed(decimals);

  return <span ref={ref}>{formatted}{suffix}</span>;
}

// ================= SELF-DRAWING EVOLUTION CHART =================
function EvolutionChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, margin: "-100px" });
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const milestones = [
    { year: 1916, hp: 185, name: "BMW IIIa", desc: "First aircraft engine" },
    { year: 1936, hp: 80, name: "BMW 328", desc: "Mille Miglia roadster" },
    { year: 1972, hp: 206, name: "3.0 CSL", desc: "The Batmobile" },
    { year: 1986, hp: 200, name: "M3 E30", desc: "Touring car legend" },
    { year: 2001, hp: 400, name: "M5 E39", desc: "V8 executive missile" },
    { year: 2014, hp: 357, name: "BMW i8", desc: "Hybrid supercar" },
    { year: 2021, hp: 510, name: "M4 Competition", desc: "S58 precision" },
    { year: 2024, hp: 748, name: "XM Label", desc: "Most powerful BMW ever" },
  ];

  const svgW = 1000;
  const svgH = 320;
  const padL = 60;
  const padR = 40;
  const padT = 40;
  const padB = 60;

  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;

  const minYear = 1916;
  const maxYear = 2024;
  const maxHP = 800;

  const getX = (year: number) => padL + ((year - minYear) / (maxYear - minYear)) * chartW;
  const getY = (hp: number) => padT + chartH - (hp / maxHP) * chartH;

  const pathD = milestones
    .map((m, i) => `${i === 0 ? "M" : "L"} ${getX(m.year)} ${getY(m.hp)}`)
    .join(" ");

  const pathLength = 1800;

  return (
    <div ref={chartRef} style={{ position: "relative", width: "100%" }}>
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        style={{ width: "100%", height: "auto" }}
      >
        {/* Grid lines */}
        {[0, 200, 400, 600, 800].map((hp) => (
          <g key={hp}>
            <line
              x1={padL}
              y1={getY(hp)}
              x2={svgW - padR}
              y2={getY(hp)}
              stroke="#E5E7EB"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
            <text
              x={padL - 12}
              y={getY(hp) + 4}
              textAnchor="end"
              fill="#9CA3AF"
              fontSize="10"
              fontFamily="var(--font-sans)"
            >
              {hp}
            </text>
          </g>
        ))}

        {/* Y-axis label */}
        <text
          x={12}
          y={svgH / 2}
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize="9"
          fontFamily="var(--font-sans)"
          fontWeight="700"
          letterSpacing="0.15em"
          transform={`rotate(-90, 12, ${svgH / 2})`}
        >
          HORSEPOWER
        </text>

        {/* Animated line path */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="var(--primary-blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDasharray: pathLength, strokeDashoffset: pathLength }}
          animate={isInView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Area fill under the line */}
        <motion.path
          d={`${pathD} L ${getX(milestones[milestones.length - 1].year)} ${padT + chartH} L ${getX(milestones[0].year)} ${padT + chartH} Z`}
          fill="url(#blueGradient)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.5 }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary-blue)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--primary-blue)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Data points */}
        {milestones.map((m, i) => (
          <motion.g
            key={i}
            className="evo-data-point"
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 * i + 1.0 }}
            style={{ transformOrigin: `${getX(m.year)}px ${getY(m.hp)}px` }}
          >
            <circle
              cx={getX(m.year)}
              cy={getY(m.hp)}
              r={hoveredPoint === i ? 7 : 5}
              fill={hoveredPoint === i ? "var(--primary-blue)" : "#FFFFFF"}
              stroke="var(--primary-blue)"
              strokeWidth="2"
              style={{ transition: "all 0.3s ease" }}
            />
            {/* Year label */}
            <text
              x={getX(m.year)}
              y={padT + chartH + 20}
              textAnchor="middle"
              fill={hoveredPoint === i ? "var(--primary-blue)" : "#9CA3AF"}
              fontSize="10"
              fontFamily="var(--font-sans)"
              fontWeight={hoveredPoint === i ? 700 : 400}
              style={{ transition: "all 0.3s ease" }}
            >
              {m.year}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hoveredPoint !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="evo-tooltip"
            style={{
              left: `${(getX(milestones[hoveredPoint].year) / svgW) * 100}%`,
              top: `${(getY(milestones[hoveredPoint].hp) / svgH) * 100 - 18}%`,
              transform: "translateX(-50%)",
            }}
          >
            <span style={{ color: "var(--primary-blue)", fontWeight: 700, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
              {milestones[hoveredPoint].year}
            </span>
            <span style={{ fontWeight: 600, fontSize: "14px", display: "block" }}>
              {milestones[hoveredPoint].name}
            </span>
            <span style={{ color: "#9CA3AF", fontSize: "11px", display: "block", marginTop: "2px" }}>
              {milestones[hoveredPoint].hp} HP — {milestones[hoveredPoint].desc}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ================= FACTORY TOUR STEP COMPONENT =================
function FactoryStep({
  step,
  index,
  isLast,
}: {
  step: { title: string; subtitle: string; description: string; stats: { label: string; value: string }[] };
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={`factory-step ${isInView ? "active" : ""}`}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Step number + connecting line */}
      <div className="factory-step-indicator">
        <div className="factory-step-number">{index + 1}</div>
        {!isLast && <div className="factory-step-line" />}
      </div>

      {/* Step content */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : "48px" }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            fontWeight: 700,
            color: "var(--primary-blue)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "8px",
          }}
        >
          {step.subtitle}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: 600,
            color: "var(--text-dark)",
            marginBottom: "12px",
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            color: "var(--text-muted)",
            lineHeight: "1.8",
            maxWidth: "480px",
            marginBottom: "20px",
          }}
        >
          {step.description}
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {step.stats.map((stat, si) => (
            <div key={si} style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "32px",
                  fontWeight: 300,
                  color: "var(--text-dark)",
                  lineHeight: "1.2",
                }}
              >
                {isInView ? stat.value : "0"}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "var(--primary-blue)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [activeTechIndex, setActiveTechIndex] = useState(0);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  const [activeEra, setActiveEra] = useState("1916");
  const [isPlayingSound, setIsPlayingSound] = useState<"s58" | "s68" | null>(null);

  // Close Matrix on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMatrixOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Paint Configurator Swatches state per card
  const [mColors, setMColors] = useState<Record<string, "blue" | "white" | "black" | "green">>({
    m2: "blue",
    m4: "blue",
    m5: "black",
    xm: "green",
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const timelineCards = [
    {
      year: "1916",
      model: "BMW IIIa",
      fact: "Powered the Fokker D.VII. First altitude-compensating engine. 185 HP.",
      image: "/uploads/models/bmw_1916_iiia.png",
    },
    {
      year: "1936",
      model: "BMW 328",
      fact: "Won the 1940 Mille Miglia. 80 HP from a 2.0L straight-six. Pure roadster.",
      image: "/uploads/models/bmw_1936_328.png",
    },
    {
      year: "1972",
      model: "BMW 3.0 CSL",
      fact: "The Batmobile. First M car in spirit. Raced at Le Mans. Homologation special.",
      image: "/uploads/motorsport/csl_1973.png",
    },
    {
      year: "1986",
      model: "BMW M3 E30",
      fact: "200 HP. S14 engine. 1,500 touring wins. The most successful touring car ever.",
      image: "/uploads/motorsport/m3_e30_racing.png",
    },
    {
      year: "2014",
      model: "BMW i8",
      fact: "eDrive hybrid. 1.5L turbo + electric. 0-100 in 4.4s. The future in 2014.",
      image: "/uploads/models/bmw_2014_i8.png",
    },
    {
      year: "2026",
      model: "BMW Neue Klasse",
      fact: "Purpose-built EV platform. 30% more range. 25% faster charging. New era.",
      image: "/uploads/gallery/g16.png",
    },
  ];

  const mCars = [
    {
      id: "m2",
      name: "BMW M2",
      specs: "460 HP  ·  4.1s 0–100  ·  S58 3.0L Turbo  ·  RWD",
      cta: "EXPLORE M2 →",
    },
    {
      id: "m4",
      name: "BMW M4 Competition",
      specs: "510 HP  ·  3.9s 0–100  ·  S58 3.0L Turbo  ·  RWD",
      cta: "EXPLORE M4 →",
    },
    {
      id: "m5",
      name: "BMW M5 xDrive",
      specs: "616 HP  ·  3.5s 0–100  ·  S68 4.4L V8  ·  AWD",
      cta: "EXPLORE M5 →",
    },
    {
      id: "xm",
      name: "BMW XM Label",
      specs: "748 HP  ·  3.8s 0–100  ·  S68 V8 + Electric  ·  AWD",
      cta: "EXPLORE XM →",
    },
  ];

  const carImageMap: Record<string, Record<string, string>> = {
    m2: {
      blue: "/uploads/models/m2.png",
      white: "/cars/bmw_m2.png",
      black: "/uploads/models/m2_black.png",
      green: "/uploads/models/m2_green.png",
    },
    m4: {
      blue: "/uploads/models/m4.png",
      white: "/uploads/models/m4_csl.png",
      black: "/cars/bmw_m4.png",
      green: "/uploads/models/m4_green.png",
    },
    m5: {
      blue: "/cars/bmw_m5.png",
      white: "/uploads/gallery/g01.png",
      black: "/uploads/models/m5.png",
      green: "/uploads/models/m5_green.png",
    },
    xm: {
      blue: "/uploads/models/xm_blue.png",
      white: "/uploads/models/xm_white.png",
      black: "/cars/bmw_xm.png",
      green: "/uploads/models/xm.png",
    },
  };

  const carColors: Record<string, { id: "white" | "green" | "blue" | "black"; hex: string; name: string }[]> = {
    m2: [
      { id: "blue", hex: "#1C69D4", name: "Zandvoort Blue" },
      { id: "white", hex: "#FFFFFF", name: "Alpine White" },
      { id: "black", hex: "#141518", name: "Sapphire Black" },
      { id: "green", hex: "#0D5B43", name: "Track Dynamic" },
    ],
    m4: [
      { id: "blue", hex: "#1C69D4", name: "Portimao Blue" },
      { id: "white", hex: "#CCCCCC", name: "Brooklyn Grey" },
      { id: "black", hex: "#141518", name: "Sapphire Black" },
      { id: "green", hex: "#004D2F", name: "Isle of Man Green" },
    ],
    m5: [
      { id: "black", hex: "#141518", name: "Frozen Carbon Black" },
      { id: "blue", hex: "#1C69D4", name: "Marina Bay Blue" },
      { id: "white", hex: "#CCCCCC", name: "Studio Matte Grey" },
      { id: "green", hex: "#0D5B43", name: "Isle of Man Green" },
    ],
    xm: [
      { id: "green", hex: "#0D5B43", name: "Cape York Green" },
      { id: "black", hex: "#141518", name: "Obsidian Black" },
      { id: "blue", hex: "#1C69D4", name: "Marina Bay Blue" },
      { id: "white", hex: "#FFFFFF", name: "Mineral White" },
    ],
  };

  const technologies = [
    {
      name: "xDrive",
      year: "2003",
      description: "BMW's intelligent all-wheel drive. Reads road conditions 100× per second.",
      image: "/uploads/gallery/xdrive_tech.png", // High-tech undercarriage AWD drivetrain render
    },
    {
      name: "TwinPower Turbo",
      year: "1986",
      description: "Twin-scroll turbocharger technology. Maximum power, zero lag.",
      image: "/uploads/gallery/turbo_engine.png", // Detailed studio engine block render
    },
    {
      name: "iDrive",
      year: "2001",
      description: "The world's first integrated vehicle operating system. Revolutionised the cockpit.",
      image: "/uploads/gallery/g03.png", // Premium cockpit and screen details
    },
    {
      name: "Neue Klasse",
      year: "2026",
      description: "Purpose-built EV architecture. BMW's most important platform since the 1960s.",
      image: "/uploads/gallery/g16.png", // Neue Klasse concept
    },
  ];

  const telemetryRows = [
    { name: "Engine Code", m2: "S58 Inline-6", m4: "S58 Inline-6", m5: "S68 Twin-Turbo V8", xm: "S68 V8 + Electric" },
    { name: "Engine Layout", m2: "Straight-6 TwinPower", m4: "Straight-6 TwinPower", m5: "V8 TwinPower", xm: "V8 TwinPower + Hybrid" },
    { name: "Displacement", m2: "2,993 cc", m4: "2,993 cc", m5: "4,395 cc", xm: "4,395 cc" },
    { name: "Power Output", m2: "460 HP @ 6,250 RPM", m4: "510 HP @ 6,250 RPM", m5: "616 HP @ 6,000 RPM", xm: "748 HP (System Total)" },
    { name: "Peak Torque", m2: "550 Nm @ 2,650 RPM", m4: "650 Nm @ 2,750 RPM", m5: "750 Nm @ 1,800 RPM", xm: "1,000 Nm (System Total)" },
    { name: "Drivetrain", m2: "Rear-Wheel Drive (RWD)", m4: "Rear-Wheel Drive (RWD)", m5: "M xDrive AWD", xm: "xDrive AWD System" },
    { name: "0–100 km/h", m2: "4.1 seconds", m4: "3.9 seconds", m5: "3.5 seconds", xm: "3.8 seconds" },
  ];

  // Factory Tour steps data
  const factorySteps = [
    {
      title: "Press Shop",
      subtitle: "STAGE 01  ·  RAW MATERIAL",
      description: "Coils of high-strength steel and aluminium are cut, pressed, and stamped into body panels using servo-hydraulic presses exerting up to 10,000 tonnes of force. Each panel is formed with sub-millimetre precision.",
      stats: [
        { label: "Press Force", value: "10,000t" },
        { label: "Panels Per Hour", value: "600+" },
      ],
    },
    {
      title: "Body Shop",
      subtitle: "STAGE 02  ·  STRUCTURAL ASSEMBLY",
      description: "Over 2,200 industrial robots weld, rivet, and bond the body-in-white structure. The BMW G-series chassis receives approximately 4,000 spot welds and 150 metres of structural adhesive bonding.",
      stats: [
        { label: "Welding Robots", value: "2,200" },
        { label: "Spot Welds", value: "4,000" },
        { label: "Adhesive Length", value: "150m" },
      ],
    },
    {
      title: "Paint Shop",
      subtitle: "STAGE 03  ·  SURFACE PERFECTION",
      description: "Seven layers of coating — from cathodic dip primer to clear coat — are applied in a controlled clean-room environment. Each vehicle passes through over 100 quality inspection checkpoints.",
      stats: [
        { label: "Coating Layers", value: "7" },
        { label: "Quality Checks", value: "100+" },
      ],
    },
    {
      title: "Assembly Line",
      subtitle: "STAGE 04  ·  MARRIAGE",
      description: "The powertrain, suspension, interior, and electronic systems are married to the painted body. At BMW Plant Munich, the 'marriage' — where engine meets chassis — takes precisely 57 seconds.",
      stats: [
        { label: "Marriage Time", value: "57s" },
        { label: "Components", value: "30,000+" },
      ],
    },
    {
      title: "Quality Control",
      subtitle: "STAGE 05  ·  FINAL AUDIT",
      description: "Every vehicle completes a 30km dynamic test drive, water ingress test, and comprehensive electronic diagnostics. Laser scanners verify panel gap tolerances to within 0.1mm.",
      stats: [
        { label: "Test Drive", value: "30km" },
        { label: "Gap Tolerance", value: "0.1mm" },
      ],
    },
  ];

  // Programmatic Web Audio API Synthesizer
  const playEngineSound = (type: "s58" | "s68") => {
    setIsPlayingSound(type);
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filterNode = ctx.createBiquadFilter();

    const baseFreq = type === "s58" ? 110 : 75;
    osc1.type = "sawtooth";
    osc2.type = "triangle";

    osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc2.frequency.setValueAtTime(baseFreq * 1.5, ctx.currentTime);

    filterNode.type = "lowpass";
    filterNode.frequency.setValueAtTime(450, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.1);

    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 2.8, ctx.currentTime + 0.6);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2.8 * 1.5, ctx.currentTime + 0.6);
    filterNode.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.6);

    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, ctx.currentTime + 1.6);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.1 * 1.5, ctx.currentTime + 1.6);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);

    osc1.connect(filterNode);
    osc2.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();

    setTimeout(() => {
      osc1.stop();
      osc2.stop();
      ctx.close();
      setIsPlayingSound(null);
    }, 2000);
  };

  const handleTimelineScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const cardWidth = 392;
      const index = Math.round(scrollLeft / cardWidth);
      const eras = ["1916", "1936", "1972", "1986", "2014", "2026"];
      if (index >= 0 && index < eras.length) {
        setActiveEra(eras[index]);
      }
    }
  };

  const scrollToEra = (index: number) => {
    if (containerRef.current) {
      const cardWidth = 392;
      containerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", position: "relative" }}>
      {/* Top Navigation */}
      <Navigation />

      {/* SECTION 1 — HERO */}
      <section
        id="hero"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/uploads/heroes/hero_home.png"
            alt="BMW M4 Alpine sunset"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top right, rgba(12, 13, 18, 0.85) 0%, rgba(12, 13, 18, 0.4) 40%, rgba(12, 13, 18, 0) 80%)",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 72px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.25em",
              color: "rgba(255, 255, 255, 0.5)",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            BMW AG  ·  MUNICH  ·  EST. 1916
          </span>

          <h1
            className="hero-headline"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 7vw, 88px)",
              fontWeight: 300,
              color: "#FFFFFF",
              lineHeight: "1.05",
              margin: 0,
              marginBottom: "28px",
              letterSpacing: "-0.01em",
            }}
          >
            The Ultimate{" "}
            <span style={{ fontWeight: 600, fontStyle: "italic", display: "block", marginTop: "4px" }}>
              Driving Machine.
            </span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "17px",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.75)",
              maxWidth: "500px",
              lineHeight: "1.8",
              margin: "0 0 44px 0",
            }}
          >
            Since 1916, BMW has defined what it means to drive.
            Not just to travel — but to feel every curve,
            every shift, every moment.
          </p>

          <div style={{ display: "flex", gap: "16px" }}>
            <button
              className="btn-editorial-primary"
              onClick={() => {
                const el = document.getElementById("heritage");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              DISCOVER BMW HERITAGE →
            </button>
            <button
              className="btn-editorial-secondary"
              onClick={() => {
                const el = document.getElementById("m-lineup");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              EXPLORE THE M LINEUP
            </button>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            zIndex: 10,
          }}
        >
          <div className="scroll-indicator-bar" />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            SCROLL TO BEGIN  ↓
          </span>
        </div>
      </section>

      {/* SECTION 2 — BMW BY THE NUMBERS */}
      <section
        id="numbers"
        style={{
          backgroundColor: "#FFFFFF",
          padding: "100px 0",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 72px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "72px", fontWeight: 300, color: "#0C0D12", lineHeight: "1.1" }}>
              <AnimatedNumber value={108} />
            </div>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "12px" }}>
              Years of Engineering
            </span>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#6B7280", marginTop: "8px", lineHeight: "1.5" }}>
              Founded in Munich, 1916
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "72px", fontWeight: 300, color: "#0C0D12", lineHeight: "1.1" }}>
              <AnimatedNumber value={7200} hasComma={true} />
            </div>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "12px" }}>
              RPM Redline
            </span>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#6B7280", marginTop: "8px", lineHeight: "1.5" }}>
              BMW S58 inline-6. The M3/M4 engine.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "72px", fontWeight: 300, color: "#0C0D12", lineHeight: "1.1" }}>
              <AnimatedNumber value={748} />
            </div>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "12px" }}>
              Horsepower
            </span>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#6B7280", marginTop: "8px", lineHeight: "1.5" }}>
              BMW XM Label. The most powerful BMW ever.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "72px", fontWeight: 300, color: "#0C0D12", lineHeight: "1.1" }}>
              <AnimatedNumber value={3.7} decimals={1} suffix="s" />
            </div>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "12px" }}>
              0 to 100 km/h
            </span>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#6B7280", marginTop: "8px", lineHeight: "1.5" }}>
              BMW i7 M70 xDrive. Electric performance.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2.5 — EVOLUTION INFOGRAPHIC */}
      <section
        id="evolution"
        style={{
          backgroundColor: "#FFFFFF",
          padding: "120px 0",
          width: "100%",
          borderTop: "1px solid #E5E7EB",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 72px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--primary-blue)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "16px",
            }}
          >
            POWER EVOLUTION  ·  1916–2024
          </span>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "56px",
              fontWeight: 300,
              color: "#0C0D12",
              lineHeight: "1.15",
              marginBottom: "16px",
            }}
          >
            A Century of <br />
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>Relentless Power.</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              color: "#6B7280",
              maxWidth: "560px",
              lineHeight: "1.8",
              marginBottom: "64px",
            }}
          >
            From the 185 HP IIIa aircraft engine in 1916 to the 748 HP XM Label in 2024.
            Every generation pushed the boundary of what was mechanically possible.
          </p>

          <EvolutionChart />
        </div>
      </section>

      {/* SECTION 3 — HERITAGE TIMELINE */}
      <section
        id="heritage"
        style={{
          backgroundColor: "#F5F5F7",
          padding: "120px 0",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 72px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--primary-blue)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "16px",
            }}
          >
            HERITAGE  ·  1916–2026
          </span>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "56px",
              fontWeight: 300,
              color: "#0C0D12",
              lineHeight: "1.15",
              marginBottom: "64px",
            }}
          >
            A Century of <br />
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>Engineering Excellence.</span>
          </h2>

          <div style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center",
                padding: "24px 0",
                borderRight: "1px solid #E5E7EB",
                paddingRight: "28px",
                minWidth: "75px",
                alignSelf: "stretch",
              }}
            >
              {["1916", "1936", "1972", "1986", "2014", "2026"].map((year, idx) => (
                <button
                  key={year}
                  onClick={() => scrollToEra(idx)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: activeEra === year ? "var(--primary-blue)" : "var(--text-muted)",
                    transition: "color 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    width: "100%",
                  }}
                >
                  <span>{year}</span>
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: activeEra === year ? "var(--primary-blue)" : "transparent",
                      border: activeEra === year ? "none" : "1px solid #9CA3AF",
                      transition: "all 0.3s ease",
                    }}
                  />
                </button>
              ))}
            </div>

            <div
              ref={containerRef}
              onScroll={handleTimelineScroll}
              className="timeline-snap-container"
              style={{
                flex: 1,
                margin: 0,
                paddingBottom: "8px",
              }}
            >
              {timelineCards.map((card, idx) => (
                <Link key={idx} href={`/models/${card.year}`} style={{ textDecoration: "none" }}>
                  <div className="timeline-card" style={{ cursor: "pointer" }}>
                    <div style={{ width: "100%", height: "55%", overflow: "hidden" }}>
                      <img
                        src={card.image}
                        alt={card.model}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                    </div>

                    <div
                      style={{
                        width: "100%",
                        height: "45%",
                        padding: "28px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "var(--primary-blue)",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: "6px",
                        }}
                      >
                        {card.year}
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "26px",
                          fontWeight: 600,
                          color: "#0C0D12",
                          marginBottom: "10px",
                        }}
                      >
                        {card.model}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "14px",
                          color: "#6B7280",
                          lineHeight: "1.7",
                        }}
                      >
                        {card.fact}
                      </p>
                    </div>

                    <div
                      className="timeline-card-line"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: "28px",
                        width: "0px",
                        height: "2px",
                        backgroundColor: "var(--primary-blue)",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE — cinematic break between Heritage and M Lineup */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "420px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/uploads/heroes/hero_home.png"
            alt=""
            aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
          />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(12,13,18,0.82)" }} />
        </div>

        {/* Quote */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: "880px",
            padding: "0 48px",
          }}
        >
          {/* M Stripe */}
          <div style={{ display: "flex", gap: "3px", justifyContent: "center", marginBottom: "40px" }}>
            <span style={{ height: "2px", width: "28px", background: "#1C69D4", transform: "skewX(-12deg)", display: "block" }} />
            <span style={{ height: "2px", width: "28px", background: "#104FA0", transform: "skewX(-12deg)", display: "block" }} />
            <span style={{ height: "2px", width: "28px", background: "#E7222E", transform: "skewX(-12deg)", display: "block" }} />
          </div>

          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 3.5vw, 44px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#FFFFFF",
              lineHeight: 1.4,
              margin: 0,
              marginBottom: "32px",
            }}
          >
            &ldquo;The car that comes closest to what driving should feel like.&rdquo;
          </blockquote>

          <cite
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontStyle: "normal",
            }}
          >
            BMW M Division  ·  Nürburgring Development Team
          </cite>
        </div>
      </section>

      {/* SECTION 4 — M LINEUP */}
      <section
        id="m-lineup"
        style={{
          backgroundColor: "#0C0D12",
          padding: "120px 0",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 72px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              color: "#4B5563",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "16px",
            }}
          >
            M SERIES  ·  2024 LINEUP
          </span>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "56px",
              fontWeight: 300,
              color: "#FFFFFF",
              lineHeight: "1.15",
              marginBottom: "64px",
            }}
          >
            Engineered Without <br />
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>Compromise.</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "32px",
            }}
          >
            {mCars.map((car, idx) => (
              <Link key={idx} href={`/models/${car.id}`} style={{ textDecoration: "none" }}>
                <div className="m-card">
                  <div className="m-card-img-container">
                    <img
                      src={carImageMap[car.id][mColors[car.id]]}
                      alt={car.name}
                      className="m-card-img"
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      marginTop: "20px",
                      marginBottom: 0,
                    }}
                  >
                    {car.name}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      marginTop: "8px",
                      alignItems: "center",
                    }}
                  >
                    {(carColors[car.id] || []).map((col) => (
                      <button
                        key={col.id}
                        title={col.name}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setMColors((prev) => ({ ...prev, [car.id]: col.id as any }));
                        }}
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          backgroundColor: col.hex,
                          border: mColors[car.id] === col.id ? "2px solid #FFFFFF" : "1px solid rgba(255, 255, 255, 0.25)",
                          cursor: "pointer",
                          padding: 0,
                          transition: "all 0.2s ease",
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      color: "#6B7280",
                      letterSpacing: "0.1em",
                      marginTop: "8px",
                      display: "block",
                    }}
                  >
                    {car.specs}
                  </span>

                  <span className="m-card-cta">
                    {car.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "64px" }}>
            <button
              onClick={() => setIsMatrixOpen(true)}
              className="btn-editorial-secondary"
              style={{
                width: "320px",
                display: "inline-flex",
                gap: "12px",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              COMPARE PERFORMANCE TELEMETRY  →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5 — TECHNOLOGY */}
      <section
        id="technology"
        style={{
          backgroundColor: "#FFFFFF",
          padding: "120px 0",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 72px",
            display: "flex",
            flexWrap: "wrap",
            gap: "64px",
          }}
        >
          <div
            style={{
              flex: "1 1 350px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--primary-blue)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "16px",
              }}
            >
              INNOVATION  ·  BMW TECHNOLOGY
            </span>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "56px",
                fontWeight: 300,
                color: "#0C0D12",
                lineHeight: "1.15",
                marginBottom: "24px",
              }}
            >
              Intelligence <br />
              <span style={{ fontWeight: 600, fontStyle: "italic" }}>Built In.</span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "17px",
                color: "#6B7280",
                maxWidth: "340px",
                lineHeight: "1.8",
                margin: 0,
              }}
            >
              From the first turbocharger in 1973 to the Neue Klasse platform in 2026.
              BMW technology has always driven what comes next.
            </p>
          </div>

          <div
            style={{
              flex: "2 1 400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {technologies.map((tech, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTechIndex(idx)}
                style={{
                  paddingBottom: "20px",
                  marginBottom: "20px",
                  borderBottom: activeTechIndex === idx ? "2px solid var(--primary-blue)" : "1px solid #E5E7EB",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: activeTechIndex === idx ? "var(--primary-blue)" : "#0C0D12",
                      margin: 0,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {tech.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      color: "var(--primary-blue)",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                    }}
                  >
                    {tech.year}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    color: "#6B7280",
                    lineHeight: "1.7",
                    margin: 0,
                  }}
                >
                  {tech.description}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              flex: "1 1 250px",
              height: "380px",
              backgroundColor: "#F5F5F7",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTechIndex}
                src={technologies[activeTechIndex].image}
                alt={technologies[activeTechIndex].name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </AnimatePresence>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(12,13,18,0.4) 0%, rgba(12,13,18,0) 40%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </section>

      {/* SECTION 5.5 — FACTORY TOUR */}
      <section
        id="factory"
        style={{
          backgroundColor: "#F5F5F7",
          padding: "120px 0",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 72px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--primary-blue)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "16px",
            }}
          >
            BMW PLANT MUNICH  ·  PRODUCTION
          </span>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "56px",
              fontWeight: 300,
              color: "#0C0D12",
              lineHeight: "1.15",
              marginBottom: "16px",
            }}
          >
            Built Without <br />
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>Compromise.</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              color: "#6B7280",
              maxWidth: "560px",
              lineHeight: "1.8",
              marginBottom: "80px",
            }}
          >
            Every BMW passes through five precision-controlled manufacturing stages.
            From raw steel to final inspection — a journey of 30,000+ components assembled
            with sub-millimetre accuracy.
          </p>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: "700px" }}>
            {factorySteps.map((step, idx) => (
              <FactoryStep
                key={idx}
                step={step}
                index={idx}
                isLast={idx === factorySteps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5.8 — CINEMATIC BRAND SHOWCASE */}
      <section
        id="brand-cinematic"
        style={{
          backgroundColor: "#0C0D12",
          padding: "120px 0",
          width: "100%",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 72px",
            display: "flex",
            flexWrap: "wrap",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* Left Column: Descriptive Editorial Text */}
          <div style={{ flex: "1 1 450px" }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--primary-blue)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "16px",
              }}
            >
              M PERFORMANCE  ·  TRACK FOCUS
            </span>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "56px",
                fontWeight: 300,
                color: "#FFFFFF",
                lineHeight: "1.15",
                marginBottom: "24px",
              }}
            >
              Engineering <br />
              <span style={{ fontWeight: 600, fontStyle: "italic" }}>In Motion.</span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                color: "rgba(255, 255, 255, 0.65)",
                lineHeight: "1.8",
                marginBottom: "32px",
                maxWidth: "500px",
              }}
            >
              Experience the convergence of aerodynamics, engine response, and absolute structural precision. Every BMW is engineered to deliver direct mechanical feedback and high-speed stability on the limit, validated through rigorous testing under demanding track conditions.
            </p>

            <Link
              href="/experience"
              className="btn-editorial-secondary"
              style={{ width: "240px", textAlign: "center" }}
            >
              DRIVING EXPERIENCE →
            </Link>
          </div>

          {/* Right Column: Bezel-less Video Player Card */}
          <div style={{ flex: "1 1 550px", position: "relative" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/9",
                backgroundColor: "#000000",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <video
                src="/uploads/experience/m_drift.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FULL BLEED QUOTE */}
      <section
        id="quote"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/uploads/heroes/hero_motorsport.png"
            alt="BMW M4 on track motion"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.55)",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "120px",
              color: "var(--primary-blue)",
              lineHeight: "0.5",
              display: "block",
              userSelect: "none",
            }}
          >
            &ldquo;
          </span>

          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "48px",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#FFFFFF",
              maxWidth: "900px",
              lineHeight: "1.5",
              margin: "24px 0 0 0",
            }}
          >
            Sheer Driving Pleasure is not a tagline. <br />
            It is a standard we hold ourselves to <br />
            with every car we build.
          </blockquote>

          <cite
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              color: "#9CA3AF",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginTop: "32px",
              display: "block",
              fontStyle: "normal",
            }}
          >
            — BMW M GmbH, Munich
          </cite>
        </div>
      </section>

      {/* SECTION 7 — FOOTER */}
      <footer
        id="footer"
        style={{
          backgroundColor: "#0C0D12",
          padding: "80px 0 48px 0",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 72px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 100 100"
              style={{
                display: "block",
              }}
            >
              {/* Outer Black Ring with clean high-contrast silver border */}
              <circle cx="50" cy="50" r="48" fill="#0C0D12" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Inner Circle separator */}
              <circle cx="50" cy="50" r="30" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Quadrants with fine separator keylines */}
              <g stroke="#FFFFFF" strokeWidth="0.8">
                <path d="M 50 50 L 50 20 A 30 30 0 0 0 20 50 Z" fill="#1C69D4" />
                <path d="M 50 50 L 80 50 A 30 30 0 0 0 50 20 Z" fill="#FFFFFF" />
                <path d="M 50 50 L 50 80 A 30 30 0 0 0 80 50 Z" fill="#1C69D4" />
                <path d="M 50 50 L 20 50 A 30 30 0 0 0 50 80 Z" fill="#FFFFFF" />
              </g>

              {/* High-legibility mathematically perfect curved B M W lettering in bold crisp white */}
              <text x="50" y="14" fill="#FFFFFF" fontSize="12.5" fontFamily="var(--font-sans)" fontWeight="900" textAnchor="middle">M</text>
              <text x="50" y="14" fill="#FFFFFF" fontSize="12.5" fontFamily="var(--font-sans)" fontWeight="900" textAnchor="middle" transform="rotate(-45 50 50)">B</text>
              <text x="50" y="14" fill="#FFFFFF" fontSize="12.5" fontFamily="var(--font-sans)" fontWeight="900" textAnchor="middle" transform="rotate(45 50 50)">W</text>
            </svg>

            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#4B5563", letterSpacing: "0.1em", marginTop: "16px", fontWeight: 600, textTransform: "uppercase" }}>
              Bayerische Motoren Werke AG
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#4B5563", marginTop: "4px", display: "block" }}>
              Munich, Germany · Est. 1916
            </span>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #1F2937", margin: "40px 0" }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "40px",
              marginBottom: "60px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "#4B5563", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", display: "block" }}>
                Heritage
              </span>
              <a href="#hero" className="footer-link">The Genesis</a>
              <a href="#heritage" className="footer-link">Roadster Era</a>
              <a href="#m-lineup" className="footer-link">M Division</a>
              <Link href="/motorsport" className="footer-link">Motorsport</Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "#4B5563", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", display: "block" }}>
                Models
              </span>
              <Link href="/models/m2" className="footer-link">M2 Coupé</Link>
              <Link href="/models/m4" className="footer-link">M4 Coupé</Link>
              <Link href="/models/m5" className="footer-link">M5 Sedan</Link>
              <Link href="/models/i7" className="footer-link">i7 Sedan</Link>
              <Link href="/models/xm" className="footer-link">XM SUV</Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "#4B5563", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", display: "block" }}>
                Explore
              </span>
              <Link href="/gallery" className="footer-link">Gallery</Link>
              <Link href="/experience" className="footer-link">Driving Experience</Link>
              <Link href="/electric" className="footer-link">Electric Models</Link>
              <Link href="/configure" className="footer-link">Configure Your BMW</Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "#4B5563", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", display: "block" }}>
                Experience
              </span>
              <Link href="/configure" className="footer-link">Configurator</Link>
              <Link href="/world" className="footer-link">BMW Welt</Link>
              <Link href="/experience" className="footer-link">Track Days</Link>
              <Link href="/models" className="footer-link">All Models</Link>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#4B5563", letterSpacing: "0.08em" }}>
              © 2026 Bayerische Motoren Werke AG. All rights reserved.
            </span>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Use", href: "#" },
                { label: "Cookie Policy", href: "#" },
                { label: "Legal Notice", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link"
                  style={{ fontSize: "11px" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ================= TELEMETRY COMPARISON MATRIX DRAWER ================= */}
      <AnimatePresence>
        {isMatrixOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setIsMatrixOpen(false); }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(12, 13, 18, 0.96)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              zIndex: 2000,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              padding: "64px 72px",
              cursor: "default",
            }}
          >
            <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
              <button
                onClick={() => setIsMatrixOpen(false)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "transparent",
                  border: "none",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary-blue)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              >
                CLOSE MATRIX  ×
              </button>

              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
                M POWER ARCHITECTURE
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.15", marginBottom: "48px" }}>
                M Performance Telemetry <br />
                <span style={{ fontWeight: 600, fontStyle: "italic" }}>Comparative Specification Matrix.</span>
              </h2>

              {/* M ACOUSTIC ENGINE LAB */}
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "24px",
                  marginBottom: "48px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      M ACOUSTIC IGNITION LAB
                    </span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "#FFFFFF", marginTop: "4px" }}>
                      Synthesize Combustion Harmonics
                    </h3>
                  </div>
                  {isPlayingSound && (
                    <div style={{ display: "flex", gap: "3px", alignItems: "center", height: "24px" }}>
                      <span className="wave-bar" style={{ height: "12px" }} />
                      <span className="wave-bar" style={{ height: "22px" }} />
                      <span className="wave-bar" style={{ height: "16px" }} />
                      <span className="wave-bar" style={{ height: "24px" }} />
                      <span className="wave-bar" style={{ height: "8px" }} />
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <button
                    onClick={() => playEngineSound("s58")}
                    disabled={isPlayingSound !== null}
                    style={{
                      flex: 1,
                      height: "44px",
                      backgroundColor: isPlayingSound === "s58" ? "var(--primary-blue)" : "transparent",
                      color: "#FFFFFF",
                      border: "1.5px solid var(--primary-blue)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      opacity: isPlayingSound && isPlayingSound !== "s58" ? 0.4 : 1,
                    }}
                  >
                    {isPlayingSound === "s58" ? "S58 IGNITED (REVVING...)" : "IGNITE S58 INLINE-6"}
                  </button>

                  <button
                    onClick={() => playEngineSound("s68")}
                    disabled={isPlayingSound !== null}
                    style={{
                      flex: 1,
                      height: "44px",
                      backgroundColor: isPlayingSound === "s68" ? "var(--primary-blue)" : "transparent",
                      color: "#FFFFFF",
                      border: "1.5px solid var(--primary-blue)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      opacity: isPlayingSound && isPlayingSound !== "s68" ? 0.4 : 1,
                    }}
                  >
                    {isPlayingSound === "s68" ? "S68 IGNITED (ROARING...)" : "IGNITE S68 BITURBO V8"}
                  </button>
                </div>
              </div>

              {/* Specification Table */}
              <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr",
                    padding: "24px 0",
                    borderBottom: "2px solid #FFFFFF",
                    fontFamily: "var(--font-display)",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  <span>Metric</span>
                  <span>M2</span>
                  <span>M4 Competition</span>
                  <span>M5 xDrive</span>
                  <span>XM Label</span>
                </div>

                {telemetryRows.map((row, index) => (
                  <div
                    key={index}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr",
                      padding: "20px 0",
                      borderBottom: "1px solid #1F2937",
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      color: "rgba(255, 255, 255, 0.75)",
                    }}
                  >
                    <span style={{ color: "#FFFFFF", fontWeight: 700 }}>{row.name}</span>
                    <span>{row.m2}</span>
                    <span>{row.m4}</span>
                    <span>{row.m5}</span>
                    <span>{row.xm}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
