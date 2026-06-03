"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Mouse absolute positions
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  // Outer ring interpolated positions (for smooth fluid trailing)
  const ringX = useRef(0);
  const ringY = useRef(0);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch screens (mouse present)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      // Update dot position immediately
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }

      // Check if target is hoverable to expand/contract ring
      const target = e.target as HTMLElement;
      const isHoverable = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest(".garage-item") ||
        target.closest(".color-swatch") ||
        target.closest(".interactive-hover") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isHoverable) {
        document.body.classList.add("cursor-hovering");
      } else {
        document.body.classList.remove("cursor-hovering");
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Dynamic animation loop for the outer ring trailing lag (lerp)
    let animFrameId: number;
    const updateRingPosition = () => {
      // Calculate 12% linear interpolation step
      const dx = mouseX.current - ringX.current;
      const dy = mouseY.current - ringY.current;
      ringX.current += dx * 0.12;
      ringY.current += dy * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX.current}px`;
        ringRef.current.style.top = `${ringY.current}px`;
      }

      animFrameId = requestAnimationFrame(updateRingPosition);
    };

    animFrameId = requestAnimationFrame(updateRingPosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animFrameId);
      document.body.classList.remove("cursor-hovering");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" style={{ opacity: 0 }} />
      <div ref={ringRef} className="custom-cursor-ring" style={{ opacity: 0 }} />
    </>
  );
}
