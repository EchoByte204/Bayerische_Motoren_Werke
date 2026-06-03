"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";

// ================= BMW ELECTRIC VEHICLE DATABASE =================
const ELECTRIC_MODELS = [
  {
    id: "ix1",
    name: "BMW iX1 xDrive30",
    series: "iX1",
    tagline: "Compact electric versatility.",
    power: "313 HP",
    range: "440 km",
    charging: "130 kW DC",
    acceleration: "5.6s",
    battery: "64.7 kWh",
    price: "€52,900",
    drivetrain: "Dual Motor AWD",
    image: "/uploads/models/bmw_ix1.png",
  },
  {
    id: "i4",
    name: "BMW i4 eDrive40",
    series: "i4",
    tagline: "The electric Gran Coupé. Zero compromise.",
    power: "340 HP",
    range: "590 km",
    charging: "205 kW DC",
    acceleration: "5.6s",
    battery: "83.9 kWh",
    price: "€58,800",
    drivetrain: "Single Motor RWD",
    image: "/cars/bmw_i4.png",
  },
  {
    id: "i4-m50",
    name: "BMW i4 M50",
    series: "i4 M50",
    tagline: "M Performance meets pure electric.",
    power: "544 HP",
    range: "521 km",
    charging: "205 kW DC",
    acceleration: "3.9s",
    battery: "83.9 kWh",
    price: "€75,600",
    drivetrain: "Dual Motor M AWD",
    image: "/uploads/electric/i4_m50.png",
    badge: "M PERFORMANCE",
  },
  {
    id: "i5",
    name: "BMW i5 eDrive40",
    series: "i5",
    tagline: "Executive electrified mobility.",
    power: "340 HP",
    range: "582 km",
    charging: "205 kW DC",
    acceleration: "6.0s",
    battery: "83.9 kWh",
    price: "€70,200",
    drivetrain: "Single Motor RWD",
    image: "/cars/bmw_5series.png",
  },
  {
    id: "i5-m60",
    name: "BMW i5 M60 xDrive",
    series: "i5 M60",
    tagline: "Executive M fury. Silent and savage.",
    power: "601 HP",
    range: "516 km",
    charging: "205 kW DC",
    acceleration: "3.8s",
    battery: "83.9 kWh",
    price: "€109,900",
    drivetrain: "Dual Motor M AWD",
    image: "/uploads/electric/bmw_i5_m60.png",
    badge: "M PERFORMANCE",
  },
  {
    id: "i7",
    name: "BMW i7 xDrive60",
    series: "i7",
    tagline: "Electric luxury without limits.",
    power: "544 HP",
    range: "625 km",
    charging: "195 kW DC",
    acceleration: "4.5s",
    battery: "101.7 kWh",
    price: "€138,400",
    drivetrain: "Dual Motor AWD",
    image: "/cars/bmw_i7.png",
    badge: "FLAGSHIP EV",
  },
  {
    id: "i7-m70",
    name: "BMW i7 M70 xDrive",
    series: "i7 M70",
    tagline: "The most powerful BMW electric sedan.",
    power: "659 HP",
    range: "560 km",
    charging: "195 kW DC",
    acceleration: "3.7s",
    battery: "101.7 kWh",
    price: "€172,600",
    drivetrain: "Dual Motor M AWD",
    image: "/uploads/electric/bmw_i7_m70.png",
    badge: "ULTIMATE ELECTRIC",
  },
  {
    id: "ix",
    name: "BMW iX xDrive50",
    series: "iX",
    tagline: "The ultimate electric SAV.",
    power: "523 HP",
    range: "630 km",
    charging: "200 kW DC",
    acceleration: "4.6s",
    battery: "111.5 kWh",
    price: "€105,800",
    drivetrain: "Dual Motor AWD",
    image: "/uploads/electric/ix.png",
  },
  {
    id: "ix-m60",
    name: "BMW iX M60",
    series: "iX M60",
    tagline: "M Power. Silent. Explosive.",
    power: "619 HP",
    range: "566 km",
    charging: "200 kW DC",
    acceleration: "3.8s",
    battery: "111.5 kWh",
    price: "€132,900",
    drivetrain: "Dual Motor M AWD",
    image: "/uploads/electric/bmw_ix_m60.png",
    badge: "M PERFORMANCE",
  },
];

const EDRIVE_TECH = [
  {
    name: "5th Gen eDrive",
    description: "BMW's fifth-generation electric drive unit integrates the motor, transmission, and power electronics into a single compact housing. Using a current-excited synchronous motor, it eliminates the need for rare earth materials while delivering maximum torque from standstill.",
    stat: "400 Nm instant",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    name: "800V Architecture",
    description: "Next-generation Neue Klasse vehicles will feature 800V electrical architecture, enabling ultra-fast DC charging at up to 350 kW. This allows 10–80% charge in under 20 minutes — faster than any competitor in the luxury segment.",
    stat: "350 kW peak",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
        <line x1="22" y1="11" x2="22" y2="13" />
      </svg>
    ),
  },
  {
    name: "Gen6 Round Cells",
    description: "BMW's sixth-generation battery cells use a new cylindrical cell format (46mm diameter) manufactured in partnership with CATL, EVE, and Samsung SDI. These cells deliver 20% higher energy density, 30% more range, and 30% faster charging versus current cells.",
    stat: "+30% range",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="5" cy="18" r="2.5" />
        <circle cx="19" cy="18" r="2.5" />
        <path d="M12 7.5L6.5 15.5M12 7.5l5.5 8M6.5 18h11" />
      </svg>
    ),
  },
  {
    name: "Adaptive Recuperation",
    description: "BMW's intelligent regenerative braking system adapts recuperation intensity based on navigation data, traffic conditions, and driver preference. High-recuperation mode enables true one-pedal driving, recovering up to 220 kW of energy during deceleration.",
    stat: "220 kW recovery",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M23 4v6h-6M1 20v-6h6" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
  },
];

const CHARGING_TIERS = [
  {
    type: "Home AC",
    power: "11 kW",
    time: "~8 hours (0–100%)",
    desc: "BMW Wallbox, overnight charging",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    type: "Workplace AC",
    power: "22 kW",
    time: "~4 hours (0–100%)",
    desc: "Destination charging, dual-phase",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="9" y1="22" x2="9" y2="16" />
        <line x1="15" y1="22" x2="15" y2="16" />
        <line x1="9" y1="16" x2="15" y2="16" />
        <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01" />
      </svg>
    ),
  },
  {
    type: "Public DC Fast",
    power: "150 kW",
    time: "~32 min (10–80%)",
    desc: "CCS Combo 2, highway stations",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="13 6 8 13 12 13 11 18 16 11 12 11 13 6" />
      </svg>
    ),
  },
  {
    type: "Ultra-Fast DC",
    power: "200+ kW",
    time: "~20 min (10–80%)",
    desc: "BMW Charging, Ionity network",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
      </svg>
    ),
  },
];

// Animated range bar component
function RangeBar({ model, maxRange, delay }: { model: typeof ELECTRIC_MODELS[0]; maxRange: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const rangeNum = parseInt(model.range);
  const widthPct = (rangeNum / maxRange) * 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "14px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "12px",
          fontWeight: 600,
          color: "#FFFFFF",
          width: "180px",
          flexShrink: 0,
        }}
      >
        {model.name}
      </span>

      <div style={{ flex: 1, height: "6px", backgroundColor: "rgba(255,255,255,0.08)", position: "relative" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${widthPct}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
          style={{
            height: "100%",
            backgroundColor: model.badge === "M PERFORMANCE" ? "#E7222E" : model.badge === "ULTIMATE ELECTRIC" || model.badge === "FLAGSHIP EV" ? "#FFFFFF" : "var(--primary-blue)",
          }}
        />
      </div>

      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "13px",
          fontWeight: 700,
          color: "var(--primary-blue)",
          width: "70px",
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
          flexShrink: 0,
        }}
      >
        {model.range}
      </span>
    </motion.div>
  );
}

export default function ElectricPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeTech, setActiveTech] = useState(0);

  const maxRange = Math.max(...ELECTRIC_MODELS.map((m) => parseInt(m.range)));
  // Sort by range descending for the chart
  const sortedByRange = [...ELECTRIC_MODELS].sort((a, b) => parseInt(b.range) - parseInt(a.range));

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <Navigation />

      {/* HERO — Electric Identity */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "65vh",
          minHeight: "520px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          backgroundColor: "#0C0D12",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/cars/bmw_i7.png"
            alt="BMW Electric"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(12,13,18,0.95) 0%, rgba(28,105,212,0.2) 50%, rgba(12,13,18,0.9) 100%)",
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
            padding: "0 72px 72px 72px",
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
              color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
              padding: 0,
              display: "inline-block",
              marginBottom: "32px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            ← GO BACK
          </button>

          {/* BMW i badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "2px solid var(--primary-blue)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-sans)",
                fontSize: "18px",
                fontWeight: 300,
                color: "var(--primary-blue)",
                letterSpacing: "-0.02em",
              }}
            >
              i
            </div>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--primary-blue)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              BMW ELECTRIFIED  ·  {ELECTRIC_MODELS.length} MODELS  ·  2024–2026
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "80px",
              fontWeight: 300,
              color: "#FFFFFF",
              lineHeight: "1.05",
              margin: 0,
            }}
          >
            The Future is <br />
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>Electrifying.</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "17px",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "520px",
              lineHeight: "1.8",
              marginTop: "24px",
            }}
          >
            From the compact iX1 to the 659 HP i7 M70 — BMW&apos;s electric range delivers
            the same driving dynamics, luxury, and precision you expect from Munich.
            Without a single drop of fuel.
          </p>
        </div>
      </section>

      {/* ELECTRIC STATS BANNER */}
      <section style={{ backgroundColor: "#0C0D12", padding: "64px 0", width: "100%", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 72px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "40px",
          }}
        >
          {[
            { value: "9", label: "Electric Models" },
            { value: "659", label: "Peak Horsepower", suffix: " HP" },
            { value: "630", label: "Max Range (km)", suffix: " km" },
            { value: "3.7", label: "Fastest 0–100", suffix: "s" },
            { value: "200+", label: "kW DC Charging" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.1" }}>
                {stat.value}{stat.suffix || ""}
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "10px" }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FULL ELECTRIC MODEL GRID */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "120px 0", width: "100%" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            THE COMPLETE BMW i LINEUP
          </span>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#0C0D12", lineHeight: "1.15", marginBottom: "64px" }}>
            Every Electric BMW, <span style={{ fontWeight: 600, fontStyle: "italic" }}>One Destination.</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: "40px 32px",
            }}
          >
            {ELECTRIC_MODELS.map((car) => (
              <Link
                key={car.id}
                href={`/models/${car.id}`}
                style={{ textDecoration: "none", display: "block" }}
                onMouseEnter={() => setHoveredCard(car.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden", backgroundColor: "#F5F5F7" }}>
                  <img
                    src={car.image}
                    alt={car.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
                      transform: hoveredCard === car.id ? "scale(1.05)" : "scale(1)",
                    }}
                  />

                  {/* Badge */}
                  {car.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        backgroundColor: car.badge === "M PERFORMANCE" ? "#E7222E" : "var(--primary-blue)",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-sans)",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        padding: "6px 12px",
                        textTransform: "uppercase",
                      }}
                    >
                      {car.badge}
                    </div>
                  )}

                  {/* Electric indicator */}
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      backgroundColor: "rgba(12,13,18,0.85)",
                      color: "var(--primary-blue)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      padding: "6px 10px",
                    }}
                  >
                    ⚡ FULL ELECTRIC
                  </div>

                  {/* Price on hover */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      right: "16px",
                      backgroundColor: "rgba(12,13,18,0.85)",
                      backdropFilter: "blur(8px)",
                      color: "#FFFFFF",
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "8px 14px",
                      opacity: hoveredCard === car.id ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    FROM {car.price}
                  </div>
                </div>

                {/* Info */}
                <div style={{ paddingTop: "20px" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                    BMW {car.series}
                  </span>

                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "6px" }}>
                    {car.name}
                  </h3>

                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "16px" }}>
                    {car.tagline}
                  </p>

                  {/* Spec pills row */}
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                    {[
                      { label: car.power },
                      { label: `${car.range} range` },
                      { label: `0–100: ${car.acceleration}` },
                      { label: car.charging },
                    ].map((pill, i) => (
                      <span key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-muted)" }}>
                          {pill.label}
                        </span>
                        {i < 3 && <span style={{ width: "1px", height: "10px", backgroundColor: "#E5E7EB", marginLeft: "8px" }} />}
                      </span>
                    ))}
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: hoveredCard === car.id ? "var(--primary-blue)" : "var(--text-dark)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      display: "inline-block",
                      marginTop: "16px",
                      transition: "color 0.3s ease",
                    }}
                  >
                    DISCOVER {car.series} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RANGE COMPARISON CHART */}
      <section style={{ backgroundColor: "#0C0D12", padding: "120px 0", width: "100%" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            WLTP RANGE COMPARISON
          </span>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.15", marginBottom: "16px" }}>
            How Far Can You <span style={{ fontWeight: 600, fontStyle: "italic" }}>Go?</span>
          </h2>

          <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.5)", maxWidth: "480px", lineHeight: "1.8", marginBottom: "48px" }}>
            WLTP certified range for every BMW electric model. From city commutes to cross-continent grand touring.
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "12px 0", borderBottom: "2px solid #FFFFFF", marginBottom: "8px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.15em", textTransform: "uppercase", width: "180px", flexShrink: 0 }}>MODEL</span>
              <span style={{ flex: 1, fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.15em", textTransform: "uppercase" }}>WLTP RANGE</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.15em", textTransform: "uppercase", width: "70px", textAlign: "right", flexShrink: 0 }}>KM</span>
            </div>

            {sortedByRange.map((model, idx) => (
              <RangeBar key={model.id} model={model} maxRange={maxRange} delay={idx * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* eDRIVE TECHNOLOGY */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "120px 0", width: "100%" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            BMW eDRIVE TECHNOLOGY
          </span>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#0C0D12", lineHeight: "1.15", marginBottom: "64px" }}>
            The Science of <span style={{ fontWeight: 600, fontStyle: "italic" }}>Silent Power.</span>
          </h2>

          <div style={{ display: "flex", gap: "64px", flexWrap: "wrap" }}>
            {/* Left: Tech selector */}
            <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column" }}>
              {EDRIVE_TECH.map((tech, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveTech(idx)}
                  style={{
                    padding: "24px 0",
                    borderBottom: activeTech === idx ? "2px solid var(--primary-blue)" : "1px solid #E5E7EB",
                    cursor: "pointer",
                    transition: "border-color 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "18px",
                        fontWeight: 600,
                        color: activeTech === idx ? "var(--primary-blue)" : "#0C0D12",
                        margin: 0,
                        transition: "color 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {tech.icon} {tech.name}
                    </h3>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.1em" }}>
                      {tech.stat}
                    </span>
                  </div>

                  {activeTech === idx && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.8", margin: 0 }}
                    >
                      {tech.description}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Visual panel */}
            <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ aspectRatio: "16/10", overflow: "hidden", backgroundColor: "#F5F5F7", position: "relative" }}>
                <img
                  src="/cars/bmw_i4.png"
                  alt="BMW eDrive Technology"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,13,18,0.5) 0%, rgba(12,13,18,0) 50%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.12em" }}>
                    5TH GENERATION eDRIVE
                  </span>
                </div>
              </div>

              {/* Key metric cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                {[
                  { value: "0", unit: "g/km", label: "CO₂ Emissions" },
                  { value: "97%", unit: "", label: "Energy Recovery" },
                  { value: "20", unit: "min", label: "10–80% Charge" },
                  { value: "0", unit: "ms", label: "Torque Delay" },
                ].map((metric, i) => (
                  <div key={i} style={{ backgroundColor: "#F5F5F7", padding: "20px", display: "flex", flexDirection: "column" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#0C0D12" }}>
                      {metric.value}<span style={{ fontSize: "14px", fontWeight: 400, color: "var(--text-muted)" }}>{metric.unit}</span>
                    </span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "6px" }}>
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHARGING INFRASTRUCTURE */}
      <section style={{ backgroundColor: "#F5F5F7", padding: "120px 0", width: "100%" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            BMW CHARGING  ·  INFRASTRUCTURE
          </span>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#0C0D12", lineHeight: "1.15", marginBottom: "64px" }}>
            Charge Anywhere. <span style={{ fontWeight: 600, fontStyle: "italic" }}>Drive Everywhere.</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {CHARGING_TIERS.map((tier, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  borderBottom: "2px solid var(--primary-blue)",
                }}
              >
                <div style={{ color: "var(--primary-blue)", display: "flex", alignItems: "center" }}>{tier.icon}</div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 700, color: "#0C0D12" }}>{tier.type}</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-muted)" }}>Power</span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)" }}>{tier.power}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-muted)" }}>Time</span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "#0C0D12" }}>{tier.time}</span>
                  </div>
                </div>

                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.6", marginTop: "auto" }}>
                  {tier.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
          <img src="/cars/bmw_ix.png" alt="BMW Electric" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(12,13,18,0.9) 0%, rgba(28,105,212,0.3) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.3", marginBottom: "32px" }}>
            Ready to go <span style={{ fontWeight: 600, fontStyle: "italic" }}>electric?</span>
          </h2>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/configure" className="btn-editorial-primary">
              CONFIGURE YOUR BMW i →
            </Link>
            <Link href="/models" className="btn-editorial-secondary">
              VIEW ALL MODELS →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
