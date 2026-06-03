"use client";

import React, { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSlidingUp, setIsSlidingUp] = useState(false);

  useEffect(() => {
    const spinTimer = setTimeout(() => setIsSpinning(true), 100);
    const slideTimer = setTimeout(() => setIsSlidingUp(true), 1100);
    const endTimer = setTimeout(() => onComplete(), 1700);
    return () => {
      clearTimeout(spinTimer);
      clearTimeout(slideTimer);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F7",
        fontFamily: "var(--font-sans)",
        transform: isSlidingUp ? "translateY(-100%)" : "translateY(0%)",
        transition: "transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
        {/* BMW Roundel */}
        <div
          style={{
            position: "relative",
            width: "112px",
            height: "112px",
            borderRadius: "50%",
            background: "#0C0D12",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.1)",
            transform: isSpinning ? "rotate(360deg)" : "rotate(0deg)",
            transition: "transform 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Outer rim */}
          <div
            style={{
              position: "absolute",
              inset: "4px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              pointerEvents: "none",
            }}
          />

          {/* Quadrants */}
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 0 8px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "50%", background: "#1C69D4" }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "50%", background: "#FFFFFF" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "50%", height: "50%", background: "#FFFFFF" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "50%", height: "50%", background: "#1C69D4" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "rgba(12,13,18,0.2)" }} />
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "rgba(12,13,18,0.2)" }} />
          </div>

          {/* B M W letters */}
          <span style={{ position: "absolute", top: "14px", left: "26px", transform: "rotate(-40deg)", fontSize: "10px", fontWeight: 900, color: "#FFFFFF", letterSpacing: "0.05em" }}>B</span>
          <span style={{ position: "absolute", top: "8px", left: "50%", transform: "translateX(-50%)", fontSize: "10px", fontWeight: 900, color: "#FFFFFF", letterSpacing: "0.05em" }}>M</span>
          <span style={{ position: "absolute", top: "14px", right: "26px", transform: "rotate(40deg)", fontSize: "10px", fontWeight: 900, color: "#FFFFFF", letterSpacing: "0.05em" }}>W</span>
        </div>

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", userSelect: "none", textAlign: "center" }}>
          {/* M stripe */}
          <div style={{ display: "flex", gap: "3px", marginBottom: "8px" }}>
            <span style={{ height: "8px", width: "3px", background: "#1C69D4", transform: "skewX(-12deg)", display: "block" }} />
            <span style={{ height: "8px", width: "3px", background: "#104FA0", transform: "skewX(-12deg)", display: "block" }} />
            <span style={{ height: "8px", width: "3px", background: "#E7222E", transform: "skewX(-12deg)", display: "block" }} />
          </div>
          <span style={{ fontSize: "10px", color: "#0C0D12", letterSpacing: "0.25em", fontWeight: 700, textTransform: "uppercase" }}>
            Bayerische Motoren Werke
          </span>
          <span style={{ fontSize: "9px", color: "#8E92A2", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Est. 1916 · Heritage Showcase
          </span>
        </div>
      </div>
    </div>
  );
}
