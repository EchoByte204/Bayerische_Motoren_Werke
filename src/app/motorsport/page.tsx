"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";

// ================= MOTORSPORT DATABASE =================
const RACING_SERIES = [
  {
    id: "f1",
    name: "Formula One",
    era: "1982–2009",
    description: "BMW's Formula 1 journey began with Brabham-BMW in 1982, featuring the legendary M12/13 turbocharged engine producing over 1,400 HP in qualifying trim. The partnership yielded Nelson Piquet's 1983 World Championship. BMW returned as a full constructor from 2006–2009 with the Sauber team, securing a historic victory at the 2008 Canadian Grand Prix with Robert Kubica.",
    wins: "1 World Championship, 1 Race Victory (2006–2009), 9 Race Victories (Brabham era)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
    image: "/uploads/motorsport/f1_sauber.png",
    stats: [
      { label: "World Titles", value: "1" },
      { label: "Race Wins", value: "10" },
      { label: "Peak HP", value: "1,400" },
    ],
  },
  {
    id: "dtm",
    name: "Deutsche Tourenwagen Meisterschaft",
    era: "1984–2021",
    description: "BMW dominated DTM across multiple eras. The M3 E30 became the most successful touring car in history with over 1,500 race victories. The M4 DTM continued this legacy, with six drivers' championships and countless podiums across decades of high-contact, door-handle-to-door-handle racing on legendary European circuits.",
    wins: "6 Drivers' Championships, 1,500+ Race Victories (M3 E30 era)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
        <path d="M8 3.5v10.5M12 5v10.5M16 4.5v10.5" />
      </svg>
    ),
    image: "/uploads/motorsport/m4_dtm.png",
    stats: [
      { label: "DTM Titles", value: "6" },
      { label: "M3 Wins", value: "1,500+" },
      { label: "Seasons", value: "30+" },
    ],
  },
  {
    id: "lemans",
    name: "24 Hours of Le Mans",
    era: "1975–2024",
    description: "BMW's Le Mans campaign peaked with the iconic V12 LMR winning outright in 1999, driven by Yannick Dalmas, Pierluigi Martini, and Joachim Winkelhock. The victory came in BMW's first full factory assault on the legendary French endurance race. The 3.0 CSL 'Art Cars' painted by Alexander Calder and Frank Stella became cultural icons beyond motorsport.",
    wins: "1 Overall Victory (1999), Multiple Class Wins",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
        <path d="M12 2a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
      </svg>
    ),
    image: "/uploads/motorsport/v12_lmr.png",
    stats: [
      { label: "Overall Wins", value: "1" },
      { label: "Le Mans Starts", value: "40+" },
      { label: "Art Cars", value: "19" },
    ],
  },
  {
    id: "nurburgring",
    name: "Nürburgring Nordschleife",
    era: "1927–Present",
    description: "The Green Hell has been BMW M's proving ground since the beginning. The Nordschleife's 20.8 km of unforgiving Eifel mountain roads have defined BMW M development philosophy. Every M car is calibrated, tested, and validated at the Ring. The M4 CSL holds a blistering 7:15.677 production car lap time.",
    wins: "Multiple 24h Nürburgring Overall Victories",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
        <line x1="12" y1="2" x2="12" y2="4" />
      </svg>
    ),
    image: "/uploads/gallery/g04.webp",
    stats: [
      { label: "Track Length", value: "20.8km" },
      { label: "M4 CSL Lap", value: "7:15" },
      { label: "24h Wins", value: "20+" },
    ],
  },
  {
    id: "formulae",
    name: "Formula E / Electric Racing",
    era: "2018–Present",
    description: "BMW entered Formula E in Season 5 (2018–19) as a manufacturer team, bringing its electrification expertise to the world's premier all-electric racing series. The program directly informed development of the BMW iX M60, i4 M50, and next-generation eDrive technology, ensuring that BMW's electric road cars carry genuine motorsport DNA.",
    wins: "4 Race Victories, Multiple Pole Positions",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    image: "/uploads/motorsport/formula_e.png", // Correct Formula E open-wheel racing car
    stats: [
      { label: "Race Wins", value: "4" },
      { label: "Seasons", value: "3" },
      { label: "eDrive Gen", value: "5th" },
    ],
  },
];

const ART_CARS = [
  { year: 1975, artist: "Alexander Calder", model: "3.0 CSL", desc: "The first BMW Art Car. Primary colors, fluid forms.", image: "/uploads/art_cars/calder_1975.png" },
  { year: 1977, artist: "Roy Lichtenstein", model: "320i Group 5", desc: "Pop art on four wheels. Bold comic book style.", image: "/uploads/art_cars/lichtenstein_1977.png" },
  { year: 1979, artist: "Andy Warhol", model: "M1 Group 4", desc: "\"I attempted to show speed as a visual image.\"", image: "/uploads/art_cars/warhol_1979.png" },
  { year: 1990, artist: "Ken Done", model: "M3 E30 Group A", desc: "Australian pop culture meets Bavarian racing.", image: "/uploads/art_cars/done_1990.png" },
  { year: 2010, artist: "Jeff Koons", model: "M3 GT2", desc: "Explosive color explosion. Le Mans 2010 racer.", image: "/uploads/art_cars/koons_2010.png" },
  { year: 2017, artist: "Cao Fei", model: "M6 GT3", desc: "Digital augmented reality meets physical speed.", image: "/uploads/art_cars/fei_2017.png" },
];

const ICONIC_RACE_CARS = [
  { name: "BMW 3.0 CSL", year: "1973", desc: "The Batmobile. European Touring Car champion.", hp: "206 HP", image: "/uploads/motorsport/csl_1973.png" },
  { name: "BMW M1 Procar", year: "1979", desc: "Mid-engine supercar. F1 support race legend.", hp: "470 HP", image: "/uploads/motorsport/m1_procar.png" },
  { name: "BMW M3 E30", year: "1986", desc: "1,500+ touring car wins. The most successful ever.", hp: "300 HP", image: "/uploads/motorsport/m3_e30_racing.png" },
  { name: "BMW V12 LMR", year: "1999", desc: "Le Mans overall winner. Open-cockpit prototype.", hp: "580 HP", image: "/uploads/motorsport/v12_lmr.png" },
  { name: "BMW M4 DTM", year: "2014", desc: "Six DTM championships. Door-to-door warfare.", hp: "500 HP", image: "/uploads/motorsport/m4_dtm.png" },
  { name: "BMW M8 GTE", year: "2018", desc: "WEC endurance racer. Daytona 24h class winner.", hp: "500 HP", image: "/uploads/motorsport/m8_gte.png" },
];

function StatBlock({ stat, delay }: { stat: { label: string; value: string }; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "48px",
          fontWeight: 300,
          color: "#FFFFFF",
          lineHeight: "1.1",
        }}
      >
        {stat.value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "10px",
          fontWeight: 700,
          color: "var(--primary-blue)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginTop: "8px",
        }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function MotorsportPage() {
  const router = useRouter();
  const [activeSeries, setActiveSeries] = useState("f1");
  const [artCarIndex, setArtCarIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setArtCarIndex((prev) => (prev + 1) % ART_CARS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [artCarIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSeries((prev) => {
        const currentIndex = RACING_SERIES.findIndex((s) => s.id === prev);
        const nextIndex = (currentIndex + 1) % RACING_SERIES.length;
        return RACING_SERIES[nextIndex].id;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSeries]);

  const currentSeries = RACING_SERIES.find((s) => s.id === activeSeries) || RACING_SERIES[0];

  return (
    <div style={{ backgroundColor: "#0C0D12", minHeight: "100vh", color: "#FFFFFF" }}>
      <Navigation />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "60vh",
          minHeight: "480px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/uploads/heroes/hero_motorsport.png"
            alt="BMW Motorsport"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,13,18,1) 0%, rgba(12,13,18,0.5) 50%, rgba(12,13,18,0.2) 100%)" }} />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 72px 64px 72px",
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              background: "none",
              border: "none",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              padding: 0,
              display: "inline-block",
              marginBottom: "24px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            ← GO BACK
          </button>

          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
            BMW MOTORSPORT  ·  SINCE 1972
          </span>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "72px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.1", margin: 0 }}>
            Born on the <br />
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>Race Track.</span>
          </h1>
        </div>
      </section>

      {/* RACING SERIES SELECTOR + DETAIL */}
      <section style={{ padding: "120px 0", width: "100%" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            RACING DISCIPLINES
          </span>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.15", marginBottom: "48px" }}>
            Five Decades of <span style={{ fontWeight: 600, fontStyle: "italic" }}>Dominance.</span>
          </h2>

          {/* Series tabs */}
          <div
            className="no-scrollbar"
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "64px",
              flexWrap: "nowrap",
              overflowX: "auto",
              width: "100%",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {RACING_SERIES.map((series) => (
              <button
                key={series.id}
                onClick={() => setActiveSeries(series.id)}
                style={{
                  background: activeSeries === series.id ? "var(--primary-blue)" : "rgba(255,255,255,0.04)",
                  border: activeSeries === series.id ? "1px solid var(--primary-blue)" : "1px solid rgba(255,255,255,0.1)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "12px 24px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {series.icon} {series.name}
              </button>
            ))}
          </div>

          {/* Active Series Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSeries.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ display: "flex", gap: "64px", flexWrap: "wrap" }}
            >
              {/* Left: Image */}
              <div style={{ flex: "1 1 400px", aspectRatio: "16/10", overflow: "hidden", position: "relative" }}>
                <img
                  src={`${currentSeries.image}?v=1.1`}
                  alt={currentSeries.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,13,18,0.6) 0%, rgba(12,13,18,0) 50%)" }} />
                <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.15em" }}>
                    {currentSeries.era}
                  </span>
                </div>
              </div>

              {/* Right: Info */}
              <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>
                  {currentSeries.name}
                </h3>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "var(--primary-blue)", letterSpacing: "0.12em", display: "block", marginBottom: "24px" }}>
                  {currentSeries.era}
                </span>

                <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: "1.8", marginBottom: "32px" }}>
                  {currentSeries.description}
                </p>

                <div style={{ padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.1)", marginBottom: "32px" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "#FFFFFF" }}>
                    PALMARES:
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                    {" "}{currentSeries.wins}
                  </span>
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", gap: "40px" }}>
                  {currentSeries.stats.map((stat, i) => (
                    <StatBlock key={i} stat={stat} delay={i * 0.15} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ICONIC RACE CARS GRID */}
      <section style={{ backgroundColor: "rgba(255,255,255,0.02)", padding: "120px 0", width: "100%" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            LEGENDARY MACHINES
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.15", marginBottom: "64px" }}>
            Race Cars That <span style={{ fontWeight: 600, fontStyle: "italic" }}>Defined Eras.</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "32px" }}>
            {ICONIC_RACE_CARS.map((car, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
                whileHover={{ y: -4 }}
              >
                <div style={{ aspectRatio: "16/10", overflow: "hidden", position: "relative" }}>
                  <img
                    src={car.image}
                    alt={car.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,13,18,0.8) 0%, rgba(12,13,18,0) 60%)" }} />
                  <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.15em" }}>
                      {car.year}  ·  {car.hp}
                    </span>
                  </div>
                </div>

                <div style={{ padding: "20px 0" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 600, color: "#FFFFFF", marginBottom: "6px" }}>
                    {car.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6" }}>
                    {car.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ART CAR GALLERY */}
      <section style={{ padding: "120px 0", width: "100%", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            BMW ART CAR COLLECTION  ·  19 WORKS
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.15", marginBottom: "64px" }}>
            Where Speed Meets <span style={{ fontWeight: 600, fontStyle: "italic" }}>Fine Art.</span>
          </h2>

          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", alignItems: "center" }}>
            {/* Main showcase image */}
            <div style={{ flex: "1 1 500px", aspectRatio: "16/10", overflow: "hidden", position: "relative" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={artCarIndex}
                  src={`${ART_CARS[artCarIndex].image}?v=1.1`}
                  alt={ART_CARS[artCarIndex].model}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </AnimatePresence>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,13,18,0.7) 0%, rgba(12,13,18,0) 40%)" }} />
            </div>

            {/* Right detail + selector */}
            <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={artCarIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {ART_CARS[artCarIndex].year}  ·  ART CAR #{artCarIndex + 1}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 600, color: "#FFFFFF", margin: "8px 0" }}>
                    BMW {ART_CARS[artCarIndex].model}
                  </h3>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 500, color: "var(--primary-blue)", display: "block", marginBottom: "16px" }}>
                    by {ART_CARS[artCarIndex].artist}
                  </span>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: "1.8", marginBottom: "32px" }}>
                    {ART_CARS[artCarIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Art Car Selector dots */}
              <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
                {ART_CARS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setArtCarIndex(i)}
                    style={{
                      width: artCarIndex === i ? "32px" : "8px",
                      height: "8px",
                      backgroundColor: artCarIndex === i ? "var(--primary-blue)" : "rgba(255,255,255,0.2)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOTORSPORT STATISTICS BANNER */}
      <section
        style={{
          position: "relative",
          width: "100%",
          padding: "100px 0",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/uploads/heroes/hero_motorsport.png"
            alt="BMW Racing"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(12,13,18,0.88)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1440px", margin: "0 auto", padding: "0 72px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "48px" }}>
          {[
            { value: "50+", label: "Years in Motorsport" },
            { value: "1,500+", label: "Race Victories" },
            { value: "20+", label: "Championship Titles" },
            { value: "19", label: "Art Cars Created" },
            { value: "1,400", label: "Peak HP (F1 Turbo)" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: "56px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.1" }}>
                {stat.value}
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "12px" }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0 120px 0" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.2", marginBottom: "8px" }}>
              Experience the M Lineup <span style={{ fontWeight: 600, fontStyle: "italic" }}>yourself.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#9CA3AF" }}>
              From track to road. Every M car carries this racing heritage in its DNA.
            </p>
          </div>
          <Link href="/models" className="btn-editorial-secondary">
            VIEW ALL MODELS →
          </Link>
        </div>
      </section>
    </div>
  );
}
