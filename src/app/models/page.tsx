"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";

// ================= COMPLETE BMW MODEL DATABASE (25+ REAL MODELS) =================
export type BMWModel = {
  id: string;
  name: string;
  series: string;
  category: "sedan" | "coupe" | "sav" | "electric" | "m";
  tagline: string;
  power: string;
  acceleration: string;
  priceFrom: string;
  engine: string;
  image: string;
  badge?: string;
};

export const BMW_MODELS: BMWModel[] = [
  // ===== SEDANS =====
  {
    id: "3-series",
    name: "BMW 3 Series Sedan",
    series: "3 SERIES",
    category: "sedan",
    tagline: "The sports sedan that started it all.",
    power: "255 HP",
    acceleration: "5.6s",
    priceFrom: "€47,550",
    engine: "2.0L TwinPower Turbo 4-cyl",
    image: "/cars/bmw_3series.png",
    badge: "BESTSELLER",
  },
  {
    id: "5-series",
    name: "BMW 5 Series Sedan",
    series: "5 SERIES",
    category: "sedan",
    tagline: "Executive performance, redefined.",
    power: "299 HP",
    acceleration: "5.3s",
    priceFrom: "€62,200",
    engine: "2.0L TwinPower Turbo 4-cyl",
    image: "/cars/bmw_5series.png",
  },
  {
    id: "7-series",
    name: "BMW 7 Series",
    series: "7 SERIES",
    category: "sedan",
    tagline: "The pinnacle of luxury and innovation.",
    power: "375 HP",
    acceleration: "5.0s",
    priceFrom: "€114,300",
    engine: "3.0L TwinPower Turbo 6-cyl",
    image: "/cars/bmw_7series.png",
    badge: "FLAGSHIP",
  },
  {
    id: "2-gran-coupe",
    name: "BMW 2 Series Gran Coupé",
    series: "2 SERIES",
    category: "sedan",
    tagline: "Compact. Athletic. Unmistakable.",
    power: "218 HP",
    acceleration: "6.4s",
    priceFrom: "€39,900",
    engine: "2.0L TwinPower Turbo 4-cyl",
    image: "/uploads/models/bmw_2series_grancoupe.png",
  },

  // ===== COUPES =====
  {
    id: "4-series",
    name: "BMW 4 Series Coupé",
    series: "4 SERIES",
    category: "coupe",
    tagline: "Sculpted for the driver.",
    power: "255 HP",
    acceleration: "5.8s",
    priceFrom: "€51,800",
    engine: "2.0L TwinPower Turbo 4-cyl",
    image: "/cars/bmw_4series.png",
  },
  {
    id: "8-series",
    name: "BMW 8 Series Gran Coupé",
    series: "8 SERIES",
    category: "coupe",
    tagline: "Grand touring at its absolute finest.",
    power: "340 HP",
    acceleration: "4.9s",
    priceFrom: "€100,900",
    engine: "3.0L TwinPower Turbo 6-cyl",
    image: "/cars/bmw_8series.png",
    badge: "GRAND TOURER",
  },
  {
    id: "z4",
    name: "BMW Z4 Roadster",
    series: "Z4",
    category: "coupe",
    tagline: "Open-top. Pure driving. Born free.",
    power: "258 HP",
    acceleration: "5.1s",
    priceFrom: "€53,600",
    engine: "2.0L TwinPower Turbo 4-cyl",
    image: "/cars/bmw_z4.png",
  },
  {
    id: "2-coupe",
    name: "BMW 2 Series Coupé",
    series: "2 SERIES",
    category: "coupe",
    tagline: "Rear-wheel drive. Compact. Unfiltered.",
    power: "245 HP",
    acceleration: "5.9s",
    priceFrom: "€43,200",
    engine: "2.0L TwinPower Turbo 4-cyl",
    image: "/uploads/models/bmw_2series_coupe.png",
  },

  // ===== SAV / SUV =====
  {
    id: "x1",
    name: "BMW X1",
    series: "X1",
    category: "sav",
    tagline: "Compact versatility with athletic DNA.",
    power: "204 HP",
    acceleration: "7.1s",
    priceFrom: "€42,900",
    engine: "2.0L TwinPower Turbo 4-cyl",
    image: "/uploads/models/bmw_x1.png",
  },
  {
    id: "x3",
    name: "BMW X3",
    series: "X3",
    category: "sav",
    tagline: "The Sports Activity Vehicle benchmark.",
    power: "245 HP",
    acceleration: "6.3s",
    priceFrom: "€55,900",
    engine: "2.0L TwinPower Turbo 4-cyl",
    image: "/cars/bmw_x3.png",
    badge: "BESTSELLER",
  },
  {
    id: "x5",
    name: "BMW X5",
    series: "X5",
    category: "sav",
    tagline: "Commanding presence. Supreme versatility.",
    power: "286 HP",
    acceleration: "5.8s",
    priceFrom: "€78,200",
    engine: "3.0L TwinPower Turbo 6-cyl",
    image: "/cars/bmw_x5.png",
  },
  {
    id: "x7",
    name: "BMW X7",
    series: "X7",
    category: "sav",
    tagline: "Luxury meets capability. For seven.",
    power: "380 HP",
    acceleration: "5.4s",
    priceFrom: "€102,600",
    engine: "3.0L TwinPower Turbo 6-cyl",
    image: "/cars/bmw_x7.png",
    badge: "FLAGSHIP SAV",
  },
  {
    id: "x2",
    name: "BMW X2",
    series: "X2",
    category: "sav",
    tagline: "Extroverted. Expressive. Engaging.",
    power: "218 HP",
    acceleration: "6.7s",
    priceFrom: "€44,600",
    engine: "2.0L TwinPower Turbo 4-cyl",
    image: "/uploads/models/bmw_x2.png",
  },
  {
    id: "x4",
    name: "BMW X4",
    series: "X4",
    category: "sav",
    tagline: "Coupé silhouette. SAV substance.",
    power: "245 HP",
    acceleration: "6.3s",
    priceFrom: "€60,100",
    engine: "2.0L TwinPower Turbo 4-cyl",
    image: "/uploads/models/bmw_x4.png",
  },
  {
    id: "x6",
    name: "BMW X6",
    series: "X6",
    category: "sav",
    tagline: "The original Sports Activity Coupé.",
    power: "340 HP",
    acceleration: "5.2s",
    priceFrom: "€85,700",
    engine: "3.0L TwinPower Turbo 6-cyl",
    image: "/uploads/models/bmw_x6.png",
  },

  // ===== ELECTRIC =====
  {
    id: "i4",
    name: "BMW i4 eDrive40",
    series: "i4",
    category: "electric",
    tagline: "Electric Gran Coupé. Zero compromise.",
    power: "340 HP",
    acceleration: "5.6s",
    priceFrom: "€58,800",
    engine: "5th Gen eDrive Electric Motor",
    image: "/cars/bmw_i4.png",
    badge: "FULL ELECTRIC",
  },
  {
    id: "i5",
    name: "BMW i5 eDrive40",
    series: "i5",
    category: "electric",
    tagline: "Executive electrified mobility.",
    power: "340 HP",
    acceleration: "6.0s",
    priceFrom: "€70,200",
    engine: "5th Gen eDrive Electric Motor",
    image: "/cars/bmw_5series.png",
  },
  {
    id: "i7",
    name: "BMW i7 xDrive60",
    series: "i7",
    category: "electric",
    tagline: "Electric luxury without limits.",
    power: "544 HP",
    acceleration: "4.5s",
    priceFrom: "€138,400",
    engine: "Dual 5th Gen eDrive Motors",
    image: "/cars/bmw_i7.png",
    badge: "FLAGSHIP EV",
  },
  {
    id: "ix",
    name: "BMW iX xDrive50",
    series: "iX",
    category: "electric",
    tagline: "The ultimate electric SAV.",
    power: "523 HP",
    acceleration: "4.6s",
    priceFrom: "€105,800",
    engine: "Dual 5th Gen eDrive Motors",
    image: "/uploads/electric/ix.png",
  },
  {
    id: "i4-m50",
    name: "BMW i4 M50",
    series: "i4",
    category: "electric",
    tagline: "M Performance meets pure electric.",
    power: "544 HP",
    acceleration: "3.9s",
    priceFrom: "€75,600",
    engine: "Dual eDrive M Performance Motors",
    image: "/uploads/electric/i4_m50.png",
    badge: "M ELECTRIC",
  },
  {
    id: "ix1",
    name: "BMW iX1 xDrive30",
    series: "iX1",
    category: "electric",
    tagline: "Compact electric versatility.",
    power: "313 HP",
    acceleration: "5.6s",
    priceFrom: "€52,900",
    engine: "Dual eDrive Electric Motors",
    image: "/uploads/models/bmw_ix1.png",
  },

  // ===== M PERFORMANCE =====
  {
    id: "m2",
    name: "BMW M2",
    series: "M2",
    category: "m",
    tagline: "Pure. Compact. Uncompromising.",
    power: "460 HP",
    acceleration: "4.1s",
    priceFrom: "€64,900",
    engine: "S58 3.0L Twin-Turbo I6",
    image: "/uploads/models/m2.png",
  },
  {
    id: "m3",
    name: "BMW M3 Competition",
    series: "M3",
    category: "m",
    tagline: "The benchmark sports sedan.",
    power: "510 HP",
    acceleration: "3.9s",
    priceFrom: "€89,900",
    engine: "S58 3.0L Twin-Turbo I6",
    image: "/uploads/models/m3.png",
    badge: "ICON",
  },
  {
    id: "m4",
    name: "BMW M4 Competition",
    series: "M4",
    category: "m",
    tagline: "Precision engineered, track proven.",
    power: "510 HP",
    acceleration: "3.9s",
    priceFrom: "€92,400",
    engine: "S58 3.0L Twin-Turbo I6",
    image: "/uploads/models/m4.png",
  },
  {
    id: "m5",
    name: "BMW M5",
    series: "M5",
    category: "m",
    tagline: "616 HP of executive fury.",
    power: "616 HP",
    acceleration: "3.5s",
    priceFrom: "€132,800",
    engine: "S68 4.4L Twin-Turbo V8",
    image: "/uploads/models/m5.png",
    badge: "V8 POWER",
  },
  {
    id: "m8",
    name: "BMW M8 Competition",
    series: "M8",
    category: "m",
    tagline: "Grand touring at maximum attack.",
    power: "625 HP",
    acceleration: "3.2s",
    priceFrom: "€152,600",
    engine: "S63 4.4L Twin-Turbo V8",
    image: "/uploads/models/m8.png",
    badge: "GT FLAGSHIP",
  },
  {
    id: "x3m",
    name: "BMW X3 M Competition",
    series: "X3 M",
    category: "m",
    tagline: "The SAV with a racing heart.",
    power: "510 HP",
    acceleration: "3.8s",
    priceFrom: "€96,200",
    engine: "S58 3.0L Twin-Turbo I6",
    image: "/uploads/models/x3m.png",
  },
  {
    id: "x5m",
    name: "BMW X5 M Competition",
    series: "X5 M",
    category: "m",
    tagline: "Unstoppable power meets luxury.",
    power: "625 HP",
    acceleration: "3.7s",
    priceFrom: "€144,800",
    engine: "S63 4.4L Twin-Turbo V8",
    image: "/uploads/models/x5m.png",
  },
  {
    id: "xm",
    name: "BMW XM Label",
    series: "XM",
    category: "m",
    tagline: "748 HP. The most powerful BMW ever.",
    power: "748 HP",
    acceleration: "3.8s",
    priceFrom: "€185,900",
    engine: "S68 V8 + Electric Hybrid",
    image: "/uploads/models/xm.png",
    badge: "MOST POWERFUL",
  },
];



const CATEGORIES = [
  { id: "all", label: "ALL MODELS", count: BMW_MODELS.length },
  { id: "sedan", label: "SEDAN", count: BMW_MODELS.filter((m) => m.category === "sedan").length },
  { id: "coupe", label: "COUPÉ & ROADSTER", count: BMW_MODELS.filter((m) => m.category === "coupe").length },
  { id: "sav", label: "SAV & SAC", count: BMW_MODELS.filter((m) => m.category === "sav").length },
  { id: "electric", label: "ELECTRIC", count: BMW_MODELS.filter((m) => m.category === "electric").length },
  { id: "m", label: "M PERFORMANCE", count: BMW_MODELS.filter((m) => m.category === "m").length },
];

function ModelsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read category search param to initialize state
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Sync state if query params change externally (e.g. back/forward buttons)
  useEffect(() => {
    const cat = searchParams.get("category") || "all";
    setActiveCategory(cat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Handle active category updates and update URL parameter seamlessly
  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    if (catId === "all") {
      router.replace("/models", { scroll: false });
    } else {
      router.replace(`/models?category=${catId}`, { scroll: false });
    }
  };

  const filteredModels =
    activeCategory === "all"
      ? BMW_MODELS
      : BMW_MODELS.filter((m) => m.category === activeCategory);

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <Navigation />

      {/* HERO HEADER */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "50vh",
          minHeight: "420px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/uploads/heroes/hero_models.png"
            alt="BMW Model Range"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(12, 13, 18, 0.9) 0%, rgba(12, 13, 18, 0.3) 60%, rgba(12, 13, 18, 0.1) 100%)",
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

          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--primary-blue)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "12px",
            }}
          >
            BMW AG  ·  {BMW_MODELS.length} MODELS  ·  2024–2026
          </span>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "72px",
              fontWeight: 300,
              color: "#FFFFFF",
              lineHeight: "1.1",
              margin: 0,
            }}
          >
            The Complete <br />
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>Model Range.</span>
          </h1>
        </div>
      </section>

      {/* CATEGORY FILTER BAR */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          position: "sticky",
          top: "72px",
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 72px",
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`filter-btn ${activeCategory === cat.id ? "active" : ""}`}
              style={{ whiteSpace: "nowrap" }}
            >
              {cat.label}
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "9px",
                  opacity: 0.6,
                }}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* MODEL GRID */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "64px 0 120px 0",
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
          {/* Category title */}
          <div style={{ marginBottom: "48px" }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
              }}
            >
              Showing {filteredModels.length} model{filteredModels.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Grid */}
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "40px 32px",
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredModels.map((car) => (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <Link
                    href={`/models/${car.id}?fromCategory=${activeCategory}`}
                    style={{ textDecoration: "none", display: "block" }}
                    onMouseEnter={() => setHoveredCard(car.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Image container */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16 / 10",
                        overflow: "hidden",
                        backgroundColor: "#F5F5F7",
                      }}
                    >
                      <img
                        src={car.image}
                        alt={car.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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
                            backgroundColor: car.category === "m" ? "#E7222E" : car.category === "electric" ? "var(--primary-blue)" : "var(--bg-dark)",
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

                      {/* Price overlay */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "16px",
                          right: "16px",
                          backgroundColor: "rgba(12, 13, 18, 0.85)",
                          backdropFilter: "blur(8px)",
                          color: "#FFFFFF",
                          fontFamily: "var(--font-sans)",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          padding: "8px 14px",
                          opacity: hoveredCard === car.id ? 1 : 0,
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        FROM {car.priceFrom}
                      </div>
                    </div>

                    {/* Info block */}
                    <div style={{ paddingTop: "20px" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "var(--primary-blue)",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: "6px",
                        }}
                      >
                        {car.series}
                      </span>

                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "24px",
                          fontWeight: 600,
                          color: "var(--text-dark)",
                          marginBottom: "6px",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {car.name}
                      </h3>

                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "13px",
                          color: "var(--text-muted)",
                          lineHeight: "1.6",
                          marginBottom: "16px",
                        }}
                      >
                        {car.tagline}
                      </p>

                      {/* Spec pills */}
                      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "var(--text-dark)",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {car.power}
                        </span>
                        <span style={{ width: "1px", height: "12px", backgroundColor: "#E5E7EB" }} />
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "11px",
                            color: "var(--text-muted)",
                          }}
                        >
                          0–100: {car.acceleration}
                        </span>
                        <span style={{ width: "1px", height: "12px", backgroundColor: "#E5E7EB" }} />
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "11px",
                            color: "var(--text-muted)",
                          }}
                        >
                          {car.engine}
                        </span>
                      </div>

                      {/* CTA */}
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
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section
        style={{
          backgroundColor: "#0C0D12",
          padding: "80px 0",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 72px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "32px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "40px",
                fontWeight: 300,
                color: "#FFFFFF",
                lineHeight: "1.2",
                marginBottom: "8px",
              }}
            >
              Can&apos;t decide? <span style={{ fontWeight: 600, fontStyle: "italic" }}>Configure yours.</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                color: "#9CA3AF",
                lineHeight: "1.7",
              }}
            >
              Build your perfect BMW with our online configurator. Choose your model, color, trim, and wheels.
            </p>
          </div>
          <Link
            href="/configure"
            className="btn-editorial-secondary"
            style={{ width: "240px" }}
          >
            CONFIGURE NOW →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function ModelsPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-sans)",
            color: "var(--text-muted)",
            fontSize: "14px",
            letterSpacing: "0.1em",
          }}
        >
          LOADING MODEL CATALOG...
        </div>
      }
    >
      <ModelsPageContent />
    </Suspense>
  );
}

