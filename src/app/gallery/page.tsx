"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";

type GalleryImage = {
  id: number;
  src: string;
  title: string;
  category: "heritage" | "modern" | "m-series" | "concept";
  aspect: "tall" | "wide" | "square";
  year: string;
};

const GALLERY_IMAGES: GalleryImage[] = [
  // ===== HERITAGE (Classic Masterpieces) =====
  { id: 1, src: "/uploads/models/bmw_1916_iiia.png", title: "BMW IIIa Aviation Engine — The Origins", category: "heritage", aspect: "tall", year: "1916" },
  { id: 2, src: "/uploads/models/bmw_1936_328.png", title: "BMW 328 Roadster — Pre-War Racing Icon", category: "heritage", aspect: "square", year: "1936" },
  { id: 3, src: "/uploads/motorsport/csl_1973.png", title: "BMW 3.0 CSL — Homologation Batmobile", category: "heritage", aspect: "wide", year: "1973" },
  { id: 4, src: "/uploads/motorsport/m3_e30_racing.png", title: "BMW M3 E30 — Group A Touring Car Legend", category: "heritage", aspect: "square", year: "1986" },

  // ===== MODERN (Engineering Perfection) =====
  { id: 5, src: "/uploads/gallery/g03.png", title: "BMW 7 Series — Luxury Widescreen Cockpit", category: "modern", aspect: "wide", year: "2023" },
  { id: 6, src: "/uploads/gallery/g05.png", title: "BMW iX — Electric Horizon Headlight Beam", category: "modern", aspect: "tall", year: "2024" },
  { id: 7, src: "/uploads/gallery/g06.png", title: "BMW Z4 Roadster — Sunset Coastal Drive", category: "modern", aspect: "square", year: "2024" },
  { id: 8, src: "/uploads/gallery/g09.png", title: "3 Series M Sport — Urban Wet Reflection", category: "modern", aspect: "square", year: "2023" },
  { id: 9, src: "/uploads/gallery/g10.png", title: "BMW X7 — Mountain Summit Ascent", category: "modern", aspect: "wide", year: "2024" },
  { id: 10, src: "/uploads/gallery/g12.png", title: "8 Series — Curated Merino Trim & Crystal Console", category: "modern", aspect: "wide", year: "2024" },
  { id: 11, src: "/uploads/gallery/g13.png", title: "BMW i4 — High-Power eDrive Midnight Charge", category: "modern", aspect: "square", year: "2024" },
  { id: 12, src: "/uploads/gallery/g15.png", title: "BMW Emblem — Classic Chrome Details & Bokeh", category: "modern", aspect: "wide", year: "2023" },

  // ===== M SERIES (High-Performance Dynamics) =====
  { id: 13, src: "/uploads/gallery/g01.png", title: "BMW M5 xDrive — Studio Side Silhouette", category: "m-series", aspect: "wide", year: "2024" },
  { id: 14, src: "/uploads/gallery/g02.png", title: "BMW M4 — High-Gloss Double-Slat Grille Closeup", category: "m-series", aspect: "tall", year: "2024" },
  { id: 15, src: "/uploads/gallery/g04.webp", title: "BMW M3 Competition — Nürburgring High-Speed Run", category: "m-series", aspect: "wide", year: "2023" },
  { id: 16, src: "/uploads/gallery/g07.png", title: "BMW XM Label — Aggressive Quad Exhaust Stance", category: "m-series", aspect: "wide", year: "2023" },
  { id: 17, src: "/uploads/gallery/g08.png", title: "BMW M4 CSL — Carbon-Fiber Splice & Cup Rim", category: "m-series", aspect: "tall", year: "2023" },
  { id: 18, src: "/uploads/gallery/g11.png", title: "BMW M2 Coupe — High-RPM Tire Smoke Drift", category: "m-series", aspect: "tall", year: "2024" },
  { id: 19, src: "/uploads/gallery/g14.png", title: "BMW M8 Competition — Track Pace Presence", category: "m-series", aspect: "tall", year: "2024" },

  // ===== CONCEPT (Future Vision) =====
  { id: 20, src: "/uploads/gallery/g16.png", title: "Neue Klasse Concept — Digital Visionary Architecture", category: "concept", aspect: "square", year: "2026" },
];

const FILTERS = [
  { id: "all", label: "ALL" },
  { id: "heritage", label: "HERITAGE" },
  { id: "modern", label: "MODERN" },
  { id: "m-series", label: "M SERIES" },
  { id: "concept", label: "CONCEPT" },
];

export default function GalleryPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeFilter === "all"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  // Reset lightbox when filter changes to avoid index mismatch
  const handleFilterChange = (id: string) => {
    setLightboxIndex(null);
    setActiveFilter(id);
  };

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = (dir: number) => {
    if (lightboxIndex === null) return;
    const newIdx = lightboxIndex + dir;
    if (newIdx >= 0 && newIdx < filtered.length) {
      setLightboxIndex(newIdx);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, filtered.length]);

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <Navigation />

      {/* Hero */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "55vh",
          minHeight: "400px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/uploads/gallery/g02.png"
            alt="BMW Gallery"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12, 13, 18, 0.9) 0%, rgba(12, 13, 18, 0.3) 60%, rgba(12, 13, 18, 0.05) 100%)" }} />
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
            BMW PHOTOGRAPHY  ·  EDITORIAL COLLECTION
          </span>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "64px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.1", marginBottom: "0" }}>
            The BMW <span style={{ fontWeight: 600, fontStyle: "italic" }}>Visual Archive.</span>
          </h1>
        </div>
      </section>

      {/* Filter Bar */}
      <section style={{ borderBottom: "1px solid #E5E7EB", position: "sticky", top: "72px", zIndex: 100, backgroundColor: "#FFFFFF" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "16px 72px", display: "flex", gap: "8px" }}>
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`filter-btn ${activeFilter === filter.id ? "active" : ""}`}
            >
              {filter.label}
            </button>
          ))}
          <span style={{ marginLeft: "auto", fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--text-muted)", alignSelf: "center" }}>
            {filtered.length} image{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* Masonry Grid */}
      <section style={{ padding: "48px 0 120px 0" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 72px" }}>
          <motion.div layout className="gallery-masonry">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, idx) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="gallery-masonry-item"
                  onClick={() => openLightbox(idx)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                  <div className="gallery-overlay">
                    <div>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                        {img.year}
                      </span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
                        {img.title}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-backdrop"
            onClick={closeLightbox}
          >
            <motion.img
              key={filtered[lightboxIndex].id}
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "85vw", maxHeight: "85vh", objectFit: "contain" }}
            />

            {/* Title overlay */}
            <div
              style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}
              onClick={(e) => e.stopPropagation()}
            >
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                {filtered[lightboxIndex].year}  ·  {filtered[lightboxIndex].category.toUpperCase()}
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "#FFFFFF" }}>
                {filtered[lightboxIndex].title}
              </span>
            </div>

            {/* Navigation arrows */}
            {lightboxIndex > 0 && (
              <button
                className="lightbox-nav-btn"
                style={{ left: "24px" }}
                onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              >
                ←
              </button>
            )}
            {lightboxIndex < filtered.length - 1 && (
              <button
                className="lightbox-nav-btn"
                style={{ right: "24px" }}
                onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              >
                →
              </button>
            )}

            {/* Close button */}
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
                width: "44px",
                height: "44px",
                cursor: "pointer",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary-blue)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
