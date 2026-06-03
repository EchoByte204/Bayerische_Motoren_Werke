"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";

const WELT_EXPERIENCES = [
  {
    title: "BMW Welt Munich",
    subtitle: "VISITOR CENTER  ·  MUNICH",
    description: "A futuristic architectural landmark by Coop Himmelb(l)au, BMW Welt welcomes over 3 million visitors annually. Experience vehicle deliveries, technology exhibitions, and the complete BMW, MINI, and Rolls-Royce product range across 73,000 m² of interactive space.",
    stats: [
      { label: "Visitors Per Year", value: "3M+" },
      { label: "Floor Space", value: "73,000 m²" },
      { label: "Opened", value: "2007" },
    ],
    image: "/uploads/world/bmw_welt.png",
  },
  {
    title: "BMW Museum",
    subtitle: "ARCHIVE  ·  EST. 1973",
    description: "Adjacent to the BMW headquarters in the iconic Four-Cylinder building, the BMW Museum houses over 125 original vehicles spanning the entire history of Bayerische Motoren Werke — from the IIIa aircraft engine to the latest Neue Klasse concept.",
    stats: [
      { label: "Exhibits", value: "125+" },
      { label: "Founded", value: "1973" },
      { label: "Renovated", value: "2008" },
    ],
    image: "/uploads/world/bmw_museum.png",
  },
  {
    title: "BMW Group Classic",
    subtitle: "HERITAGE COLLECTION  ·  MUNICH",
    description: "The BMW Group Classic facility in Munich-Milbertshofen maintains the complete historical archive of BMW AG — over 1,000 vehicles, thousands of technical drawings, and decades of racing memorabilia carefully preserved for future generations.",
    stats: [
      { label: "Vehicles", value: "1,000+" },
      { label: "Documents", value: "50,000+" },
      { label: "Since", value: "1966" },
    ],
    image: "/uploads/world/bmw_classic.png",
  },
];

const DRIVING_EVENTS = [
  {
    name: "M Track Days",
    location: "Nürburgring Nordschleife",
    desc: "Drive BMW M cars on the world's most demanding circuit with professional M instructors.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
        <path d="M8 3.5v10.5M12 5v10.5M16 4.5v10.5" />
      </svg>
    ),
  },
  {
    name: "BMW Ice Fascination",
    location: "Arjeplog, Sweden",
    desc: "Master controlled drifts on frozen lakes in BMW xDrive and M vehicles above the Arctic Circle.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4" />
      </svg>
    ),
  },
  {
    name: "M Festival",
    location: "Nürburgring, Germany",
    desc: "The world's largest BMW M gathering. Parades, hot laps, product reveals, and M Town.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    name: "BMW Driving Experience",
    location: "Maisach, Germany",
    desc: "From basic handling to advanced drift training. Professional programs for every skill level.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    name: "BMW Alps Driving Tour",
    location: "Austrian & Italian Alps",
    desc: "Multi-day curated driving tours through Alpine passes in the latest BMW models.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3l10 16H2L8 3z" />
        <path d="M18 8l5 8h-9l4-8z" />
      </svg>
    ),
  },
  {
    name: "Goodwood Festival of Speed",
    location: "Goodwood, England",
    desc: "BMW's annual presence at the world's greatest celebration of motorsport and automotive culture.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const INDIVIDUAL_COLORS = [
  { name: "Frozen Deep Green", hex: "#1A3A2A", desc: "Matte metallic forest depth" },
  { name: "Dravit Grey", hex: "#5C5B57", desc: "Sophisticated dark metallic" },
  { name: "Tanzanite Blue", hex: "#1B1F4B", desc: "Deep midnight crystal" },
  { name: "Aventurin Red", hex: "#5E1A1E", desc: "Rich garnet metallic" },
  { name: "Frozen Brilliant White", hex: "#E8E6E0", desc: "Satin matte pearl" },
  { name: "Grigio Telesto", hex: "#8A8B84", desc: "Italian grey heritage" },
  { name: "Verde Mantis", hex: "#4EA528", desc: "Vivid lime green metallic" },
  { name: "Zanzibar Yellow", hex: "#F5C518", desc: "Pure speed yellow" },
  { name: "Fire Orange", hex: "#E85D26", desc: "Ignition orange metallic" },
  { name: "Frozen Marina Bay Blue", hex: "#0066B1", desc: "Matte M exclusive" },
  { name: "Toronto Red", hex: "#B51B1B", desc: "Heritage racing red" },
  { name: "Isle of Man Green", hex: "#004D2F", desc: "Deep British Racing Green" },
];

export default function WorldPage() {
  const router = useRouter();
  const [activeExperience, setActiveExperience] = useState(0);
  const [activeColor, setActiveColor] = useState(0);

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <Navigation />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "55vh",
          minHeight: "440px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/uploads/heroes/hero_world.png"
            alt="BMW World"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,13,18,0.85) 0%, rgba(12,13,18,0.3) 60%, rgba(12,13,18,0.1) 100%)" }} />
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
            BMW WELT  ·  MUSEUM  ·  LIFESTYLE
          </span>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "72px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.1", margin: 0 }}>
            The World of <br />
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>Bayerische Motoren Werke.</span>
          </h1>
        </div>
      </section>

      {/* BMW WELT / MUSEUM / CLASSIC SECTION */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "120px 0", width: "100%" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            DESTINATIONS  ·  MUNICH
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#0C0D12", lineHeight: "1.15", marginBottom: "64px" }}>
            Three Iconic <span style={{ fontWeight: 600, fontStyle: "italic" }}>Destinations.</span>
          </h2>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "0", marginBottom: "64px", borderBottom: "1px solid #E5E7EB" }}>
            {WELT_EXPERIENCES.map((exp, idx) => (
              <button
                key={idx}
                onClick={() => setActiveExperience(idx)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: activeExperience === idx ? "2px solid var(--primary-blue)" : "2px solid transparent",
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: activeExperience === idx ? 700 : 500,
                  color: activeExperience === idx ? "var(--primary-blue)" : "var(--text-muted)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "16px 32px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {exp.title}
              </button>
            ))}
          </div>

          {/* Active Experience */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExperience}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ display: "flex", gap: "64px", flexWrap: "wrap" }}
            >
              <div style={{ flex: "1 1 500px", aspectRatio: "16/10", overflow: "hidden" }}>
                <img
                  src={WELT_EXPERIENCES[activeExperience].image}
                  alt={WELT_EXPERIENCES[activeExperience].title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    const fallbackMap: Record<string, string> = {
                      "/uploads/world/bmw_welt.png": "/uploads/gallery/g10.png",
                      "/uploads/world/bmw_museum.png": "/uploads/gallery/g03.png",
                      "/uploads/world/bmw_classic.png": "/uploads/gallery/g15.png"
                    };
                    const src = e.currentTarget.getAttribute("src");
                    if (src && fallbackMap[src]) {
                      e.currentTarget.src = fallbackMap[src];
                    }
                  }}
                />
              </div>

              <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
                  {WELT_EXPERIENCES[activeExperience].subtitle}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 600, color: "#0C0D12", marginBottom: "20px" }}>
                  {WELT_EXPERIENCES[activeExperience].title}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "40px" }}>
                  {WELT_EXPERIENCES[activeExperience].description}
                </p>

                <div style={{ display: "flex", gap: "40px" }}>
                  {WELT_EXPERIENCES[activeExperience].stats.map((stat, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#0C0D12", lineHeight: "1.1" }}>
                        {stat.value}
                      </span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "6px" }}>
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* DRIVING EXPERIENCES */}
      <section style={{ backgroundColor: "#0C0D12", padding: "120px 0", width: "100%" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            BMW EXPERIENCES  ·  WORLDWIDE
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.15", marginBottom: "64px" }}>
            Beyond the Road. <span style={{ fontWeight: 600, fontStyle: "italic" }}>Beyond Limits.</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
            {DRIVING_EVENTS.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  transition: "border-color 0.3s ease, background-color 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary-blue)";
                  e.currentTarget.style.backgroundColor = "rgba(28,105,212,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div style={{ color: "var(--primary-blue)", display: "flex", alignItems: "center" }}>{event.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "#FFFFFF" }}>
                  {event.name}
                </h3>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  {event.location}
                </span>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>
                  {event.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BMW INDIVIDUAL — COLOR PALETTE */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "120px 0", width: "100%" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            BMW INDIVIDUAL  ·  MANUFAKTUR
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#0C0D12", lineHeight: "1.15", marginBottom: "16px" }}>
            Your Color. <span style={{ fontWeight: 600, fontStyle: "italic" }}>Your Identity.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "var(--text-muted)", lineHeight: "1.8", maxWidth: "560px", marginBottom: "64px" }}>
            BMW Individual Manufaktur offers over 150 exclusive exterior colours.
            Each finish is hand-mixed, quality-inspected, and applied with up to 7 layers of lacquer
            for absolute depth and permanence.
          </p>

          {/* Color swatches grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "64px" }}>
            {INDIVIDUAL_COLORS.map((color, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveColor(idx)}
                whileHover={{ y: -4 }}
                style={{
                  border: activeColor === idx ? "2px solid var(--primary-blue)" : "1px solid #E5E7EB",
                  background: "transparent",
                  padding: "20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  transition: "border-color 0.3s ease",
                }}
              >
                <div style={{ width: "100%", height: "64px", backgroundColor: color.hex }} />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "#0C0D12", textAlign: "left" }}>
                  {color.name}
                </span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-muted)", textAlign: "left" }}>
                  {color.desc}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Active Color Showcase */}
          <div
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: INDIVIDUAL_COLORS[activeColor].hex,
              display: "flex",
              alignItems: "flex-end",
              padding: "32px",
              position: "relative",
              overflow: "hidden",
              transition: "background-color 0.5s ease",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 60%)" }} />
            <div style={{ position: "relative", zIndex: 10 }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                BMW INDIVIDUAL MANUFAKTUR
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 600, color: "#FFFFFF" }}>
                {INDIVIDUAL_COLORS[activeColor].name}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FULL BLEED CTA */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "50vh",
          minHeight: "360px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="/uploads/heroes/hero_world.png" alt="BMW" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.6)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.3", marginBottom: "32px" }}>
            Ready to experience <br />
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>Sheer Driving Pleasure?</span>
          </h2>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/models" className="btn-editorial-primary">
              EXPLORE MODELS →
            </Link>
            <Link href="/configure" className="btn-editorial-secondary">
              CONFIGURE YOURS →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
