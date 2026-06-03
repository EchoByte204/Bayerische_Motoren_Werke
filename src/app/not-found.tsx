"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: "#0C0D12",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}
      >
        {/* BMW Logo */}
        <Link href="/" style={{ display: "block", marginBottom: "48px" }}>
          <svg width="64" height="64" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="#0C0D12" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <path d="M 50 50 L 50 20 A 30 30 0 0 0 20 50 Z" fill="#1C69D4" />
            <path d="M 50 50 L 80 50 A 30 30 0 0 0 50 20 Z" fill="#FFFFFF" />
            <path d="M 50 50 L 50 80 A 30 30 0 0 0 80 50 Z" fill="#1C69D4" />
            <path d="M 50 50 L 20 50 A 30 30 0 0 0 50 80 Z" fill="#FFFFFF" />
            <text x="50" y="14" fill="#FFFFFF" fontSize="12.5" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">M</text>
            <text x="50" y="14" fill="#FFFFFF" fontSize="12.5" fontFamily="sans-serif" fontWeight="900" textAnchor="middle" transform="rotate(-45 50 50)">B</text>
            <text x="50" y="14" fill="#FFFFFF" fontSize="12.5" fontFamily="sans-serif" fontWeight="900" textAnchor="middle" transform="rotate(45 50 50)">W</text>
          </svg>
        </Link>

        {/* 404 Number */}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(96px, 18vw, 200px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.04)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          404
        </span>

        {/* M stripe */}
        <div style={{ display: "flex", gap: "3px", marginBottom: "32px" }}>
          <span style={{ height: "3px", width: "24px", background: "#1C69D4", transform: "skewX(-12deg)", display: "block" }} />
          <span style={{ height: "3px", width: "24px", background: "#104FA0", transform: "skewX(-12deg)", display: "block" }} />
          <span style={{ height: "3px", width: "24px", background: "#E7222E", transform: "skewX(-12deg)", display: "block" }} />
        </div>

        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--primary-blue)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Page Not Found
        </span>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 300,
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginBottom: "20px",
            maxWidth: "560px",
          }}
        >
          This road leads{" "}
          <span style={{ fontWeight: 600, fontStyle: "italic" }}>nowhere.</span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.8,
            maxWidth: "400px",
            marginBottom: "48px",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist — or it may have been moved. Let&apos;s
          get you back on track.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/"
            style={{
              backgroundColor: "var(--primary-blue)",
              color: "#FFFFFF",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textDecoration: "none",
              padding: "18px 36px",
              display: "inline-block",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1455B0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-blue)")}
          >
            RETURN HOME →
          </Link>
          <Link
            href="/models"
            style={{
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textDecoration: "none",
              padding: "18px 36px",
              display: "inline-block",
              border: "1px solid rgba(255,255,255,0.15)",
              transition: "border-color 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
          >
            BROWSE MODELS
          </Link>
        </div>
      </motion.div>

      {/* Bottom copy */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          fontFamily: "var(--font-sans)",
          fontSize: "11px",
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.1em",
        }}
      >
        BMW Heritage Portal  ·  Est. 1916
      </div>
    </div>
  );
}
