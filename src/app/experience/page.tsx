"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";

const LAP_RECORDS = [
  { car: "BMW M4 CSL", time: "7:15.677", hp: "550 HP", year: "2022", engine: "S58 I6" },
  { car: "BMW M5 CS", time: "7:29.57", hp: "635 HP", year: "2021", engine: "S63 V8" },
  { car: "BMW M2 CS", time: "7:50.31", hp: "450 HP", year: "2020", engine: "S55 I6" },
  { car: "BMW M3 Competition", time: "7:33.42", hp: "510 HP", year: "2023", engine: "S58 I6" },
  { car: "BMW M8 Competition", time: "7:32.79", hp: "625 HP", year: "2020", engine: "S63 V8" },
  { car: "BMW X3 M Competition", time: "7:54.92", hp: "510 HP", year: "2021", engine: "S58 I6" },
  { car: "BMW i4 M50", time: "7:46.00", hp: "544 HP", year: "2023", engine: "eDrive" },
  { car: "BMW M2 (G87)", time: "7:58.12", hp: "460 HP", year: "2023", engine: "S58 I6" },
];

export default function ExperiencePage() {
  const router = useRouter();
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMs, setTimerMs] = useState(0);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [theaterMode, setTheaterMode] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const trackRef = useRef(null);
  const trackInView = useInView(trackRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimerMs((prev) => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    if (timerRunning) {
      setTimerRunning(false);
      if (timerMs > 0) setLapTimes((prev) => [...prev, timerMs]);
    } else {
      setTimerMs(0);
      setTimerRunning(true);
    }
  };

  const handleReset = () => {
    setTimerRunning(false);
    setTimerMs(0);
    setLapTimes([]);
  };

  // SVG simplified Nürburgring-esque track
  const trackPath = "M 150 200 C 150 100, 250 50, 350 50 C 450 50, 500 80, 550 120 C 620 180, 680 100, 750 80 C 820 60, 880 100, 880 160 C 880 250, 800 300, 720 320 C 640 340, 580 280, 500 300 C 420 320, 380 360, 300 360 C 200 360, 150 300, 150 200 Z";

  return (
    <div style={{ backgroundColor: "#0C0D12", minHeight: "100vh", color: "#FFFFFF" }}>
      <Navigation />

      {/* Hero */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "65vh",
          minHeight: "480px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/uploads/heroes/hero_experience.png"
            alt="BMW Track Experience"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,13,18,1) 0%, rgba(12,13,18,0.4) 60%, rgba(12,13,18,0.1) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1440px", margin: "0 auto", padding: "0 72px 64px 72px" }}>
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
            BMW M DRIVING EXPERIENCE  ·  NÜRBURGRING
          </span>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "64px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.1", margin: 0 }}>
            The Green <span style={{ fontWeight: 600, fontStyle: "italic" }}>Hell.</span>
          </h1>
        </div>
      </section>

      {/* NÜRBURGRING TRACK MAP */}
      <section ref={trackRef} style={{ padding: "120px 0", width: "100%" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            NÜRBURGRING NORDSCHLEIFE  ·  20.832 KM
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.15", marginBottom: "48px" }}>
            The Ultimate <span style={{ fontWeight: 600, fontStyle: "italic" }}>Proving Ground.</span>
          </h2>

          <div style={{ display: "flex", gap: "64px", flexWrap: "wrap" }}>
            {/* Track SVG */}
            <div style={{ flex: "1 1 500px" }}>
              <svg viewBox="0 0 1000 420" style={{ width: "100%", height: "auto" }}>
                {/* Track outline */}
                <motion.path
                  d={trackPath}
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="18"
                  strokeLinecap="round"
                />

                {/* Racing line - animated */}
                <motion.path
                  d={trackPath}
                  fill="none"
                  stroke="var(--primary-blue)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={trackInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />

                {/* Start/Finish marker */}
                <circle cx="150" cy="200" r="6" fill="#E7222E" />
                <text x="150" y="225" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="var(--font-sans)" fontWeight="700">
                  START
                </text>

                {/* Named corners */}
                {[
                  { x: 350, y: 40, name: "Hatzenbach" },
                  { x: 600, y: 110, name: "Flugplatz" },
                  { x: 880, y: 150, name: "Adenauer Forst" },
                  { x: 720, y: 330, name: "Karussell" },
                  { x: 400, y: 370, name: "Brünnchen" },
                ].map((corner, i) => (
                  <g key={i}>
                    <circle cx={corner.x} cy={corner.y} r="4" fill="rgba(255,255,255,0.3)" />
                    <text x={corner.x} y={corner.y - 14} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="var(--font-sans)" fontWeight="500">
                      {corner.name}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Track stats */}
              <div style={{ display: "flex", gap: "40px", marginTop: "32px", flexWrap: "wrap" }}>
                {[
                  { label: "LENGTH", value: "20.832 km" },
                  { label: "CORNERS", value: "170+" },
                  { label: "ELEVATION", value: "300m" },
                  { label: "BUILT", value: "1927" },
                ].map((stat, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#FFFFFF" }}>
                      {stat.value}
                    </span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "4px" }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* LAP TIMER */}
            <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "24px" }}>
                M LAP CHRONOGRAPH
              </span>

              <div className="lap-timer-display" style={{ marginBottom: "32px" }}>
                {formatTime(timerMs)}
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleStartStop}
                  style={{
                    width: "160px",
                    height: "48px",
                    backgroundColor: timerRunning ? "#E7222E" : "var(--primary-blue)",
                    color: "#FFFFFF",
                    border: "none",
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {timerRunning ? "LAP COMPLETE" : "START LAP"}
                </button>
                <button
                  onClick={handleReset}
                  style={{
                    width: "100px",
                    height: "48px",
                    backgroundColor: "transparent",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255,255,255,0.2)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    cursor: "pointer",
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary-blue)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
                >
                  RESET
                </button>
              </div>

              {/* Recorded laps */}
              {lapTimes.length > 0 && (
                <div style={{ marginTop: "32px", width: "100%" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.12em", display: "block", marginBottom: "12px" }}>
                    YOUR LAPS
                  </span>
                  {lapTimes.map((time, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        borderBottom: "1px solid #1F2937",
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                      }}
                    >
                      <span style={{ color: "#9CA3AF" }}>Lap {i + 1}</span>
                      <span style={{ color: i === lapTimes.length - 1 ? "var(--primary-blue)" : "#FFFFFF", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                        {formatTime(time)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BMW M LAP RECORDS TABLE */}
      <section style={{ backgroundColor: "rgba(255,255,255,0.02)", padding: "120px 0", width: "100%" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            OFFICIAL BMW M NORDSCHLEIFE LAP RECORDS
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.15", marginBottom: "48px" }}>
            Production Car <span style={{ fontWeight: 600, fontStyle: "italic" }}>Lap Times.</span>
          </h2>

          {/* Table Header */}
          <div className="lap-record-row" style={{ borderBottom: "2px solid #FFFFFF", fontWeight: 700, color: "#FFFFFF" }}>
            <span>MODEL</span>
            <span>LAP TIME</span>
            <span>POWER</span>
            <span>ENGINE</span>
          </div>

          {/* Records sorted by time */}
          {LAP_RECORDS.sort((a, b) => a.time.localeCompare(b.time)).map((record, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="lap-record-row"
            >
              <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
                {idx === 0 && <span style={{ color: "#E7222E", marginRight: "8px" }}>●</span>}
                {record.car}
              </span>
              <span style={{ color: idx === 0 ? "var(--primary-blue)" : "rgba(255,255,255,0.75)", fontWeight: idx === 0 ? 700 : 400, fontVariantNumeric: "tabular-nums" }}>
                {record.time}
              </span>
              <span>{record.hp}</span>
              <span>{record.engine}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE ART OF THE DRIFT — CINEMATIC VIDEO INTERACTIVE THEATER */}
      <section
        style={{
          padding: "120px 0",
          width: "100%",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          backgroundColor: "#08090C",
        }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
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
            M DYNAMIC CONTROL  ·  SLIP ANGLE
          </span>

          <div style={{ display: "flex", gap: "64px", flexWrap: "wrap", alignItems: "center" }}>
            {/* Left: Interactive Telemetry & Description */}
            <div style={{ flex: "1 1 450px" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "48px",
                  fontWeight: 300,
                  color: "#FFFFFF",
                  lineHeight: "1.15",
                  marginBottom: "24px",
                }}
              >
                The Art of <br />
                <span style={{ fontWeight: 600, fontStyle: "italic" }}>Dynamic Drift.</span>
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: "1.8",
                  marginBottom: "32px",
                }}
              >
                Near-perfect 50:50 weight distribution, high-torque TwinPower Turbo straight-six and V8 engines, and the highly calibrated Active M Differential. This mechanical layout allows drivers to execute controlled slides with high precision and absolute feedback.
              </p>

              {/* M Drift Analyser Metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "40px" }}>
                {[
                  { label: "Optimal Drift Angle", value: "28°–42°" },
                  { label: "Yaw Rate Velocity", value: "140°/s" },
                  { label: "Active Differential Lock", value: "0–100%" },
                  { label: "M Traction Control", value: "Level 1-10" },
                ].map((metric, i) => (
                  <div key={i} style={{ borderLeft: "2px solid var(--primary-blue)", paddingLeft: "16px" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block" }}>
                      {metric.label}
                    </span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "#FFFFFF", marginTop: "4px", display: "block" }}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Premium Bezel-less Video Player Card */}
            <div style={{ flex: "1 1 550px", position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  backgroundColor: "#000000",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                }}
                onClick={() => setTheaterMode(true)}
              >
                <video
                  src="/uploads/experience/Video Project 2.mp4"
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

                {/* Overlay Play / Sound controls */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(12,13,18,0.7) 0%, rgba(12,13,18,0) 40%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "24px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      backgroundColor: "rgba(231,34,46,0.9)",
                      padding: "4px 8px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      width: "fit-content",
                    }}
                  >
                    ● LIVE DRIFT CAM
                  </span>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "#FFFFFF" }}>
                        BMW M4 Coupe — Nürburgring GP Loop
                      </span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>
                        Active M Differential Telemetry Sync
                      </span>
                    </div>

                    {/* Fullscreen Theater Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setTheaterMode(true); }}
                      style={{
                        backgroundColor: "var(--primary-blue)",
                        color: "#FFFFFF",
                        border: "none",
                        fontFamily: "var(--font-sans)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        padding: "10px 18px",
                        cursor: "pointer",
                        textTransform: "uppercase",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      THEATER VIEW ⛶
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0 120px 0" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.2", marginBottom: "8px" }}>
              Want to drive the Ring? <span style={{ fontWeight: 600, fontStyle: "italic" }}>Book an M Track Day.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#9CA3AF" }}>
              Professional instructors. The latest M cars. The world&apos;s greatest circuit.
            </p>
          </div>
          <Link href="/world" className="btn-editorial-secondary">
            BMW EXPERIENCES →
          </Link>
        </div>
      </section>
      {/* THEATER MODE OVERLAY */}
      <AnimatePresence>
        {theaterMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(12,13,18,0.96)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setTheaterMode(false)}
          >
            <div
              style={{
                width: "90vw",
                maxWidth: "1280px",
                aspectRatio: "16/9",
                backgroundColor: "#000000",
                position: "relative",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src="/uploads/experience/Video Project 2.mp4"
                autoPlay
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />

              {/* Close Button */}
              <button
                onClick={() => setTheaterMode(false)}
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "0",
                  background: "transparent",
                  border: "none",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                CLOSE THEATER ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
