"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const BMW_MODEL_COUNT = 28;

type NavItem =
  | { id: string; title: string; sub: string; href?: never }
  | { href: string; title: string; sub: string; id?: never };

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"models" | "heritage" | "explore" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isHomepage = pathname === "/";
  const isDarkPage = pathname === "/motorsport" || pathname === "/experience";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menuType: "models" | "heritage" | "explore") => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(menuType);
  };

  const handleMouseLeave = () => {
    menuTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const scrollToSection = (id: string) => {
    if (!isHomepage) {
      router.push(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const navHeight = 72;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const menuItems = {
    models: {
      sections: [
        {
          title: "BY BODY STYLE",
          items: [
            { id: "3-series", title: "Sedans", sub: "3, 5, 7 Series" },
            { id: "4-series", title: "Coupés & Roadsters", sub: "2, 4, 8 Series, Z4" },
            { id: "x3", title: "SAV & SAC", sub: "X1 through X7" },
          ],
        },
        {
          title: "ELECTRIC",
          items: [
            { id: "i4", title: "BMW i4", sub: "Electric Gran Coupé" },
            { id: "i5", title: "BMW i5", sub: "Electric Executive" },
            { id: "i7", title: "BMW i7", sub: "Electric Flagship" },
            { id: "ix", title: "BMW iX", sub: "Electric SAV" },
          ],
        },
        {
          title: "M PERFORMANCE",
          items: [
            { id: "m2", title: "BMW M2", sub: "460 HP  ·  S58" },
            { id: "m3", title: "BMW M3", sub: "510 HP  ·  S58" },
            { id: "m4", title: "BMW M4", sub: "510 HP  ·  S58" },
            { id: "m5", title: "BMW M5", sub: "616 HP  ·  S68 V8" },
            { id: "xm", title: "BMW XM", sub: "748 HP  ·  Hybrid" },
          ],
        },
      ],
    },
    heritage: {
      sections: [
        {
          title: "ERAS",
          items: [
            { id: "1916", title: "1916 Genesis", sub: "BMW IIIa Engine" },
            { id: "1936", title: "1936 Classics", sub: "BMW 328 Roadster" },
            { id: "1972", title: "1972 Motorsport", sub: "3.0 CSL Batmobile" },
            { id: "1986", title: "1986 Legends", sub: "BMW M3 E30" },
            { id: "2014", title: "2014 Future", sub: "BMW i8 Hybrid" },
            { id: "2026", title: "2026 Neue Klasse", sub: "EV Platform" },
          ],
        },
      ],
    },
    explore: {
      sections: [
        {
          title: "EXPERIENCES",
          items: [
            { href: "/motorsport", title: "Motorsport Heritage", sub: "F1, DTM, Le Mans, Nürburgring" },
            { href: "/world", title: "BMW World & Lifestyle", sub: "BMW Welt, Museum, Events" },
            { href: "/gallery", title: "Gallery", sub: "Photography Collection" },
            { href: "/experience", title: "Driving Experience", sub: "Track Days & Lap Times" },
            { href: "/electric", title: "Electric Models", sub: "i4, i5, i7, iX, iX1" },
            { href: "/configure", title: "Configure Your BMW", sub: "Build & Customize" },
          ],
        },
      ],
    },
  };

  // Determine if we need light or dark text
  const showDarkText = isScrolled || activeMenu || (!isHomepage && !isDarkPage);
  const textColor = showDarkText ? "var(--text-dark)" : "rgba(255, 255, 255, 0.9)";
  const navBg = isScrolled || activeMenu
    ? "rgba(255, 255, 255, 0.95)"
    : (!isHomepage && !isDarkPage)
    ? "rgba(255, 255, 255, 0.98)"
    : "transparent";

  return (
    <div
      onMouseLeave={handleMouseLeave}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <nav
        style={{
          position: "relative",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 72px",
          backgroundColor: navBg,
          backdropFilter: isScrolled || activeMenu ? "blur(20px)" : "none",
          WebkitBackdropFilter: isScrolled || activeMenu ? "blur(20px)" : "none",
          borderBottom: isScrolled || activeMenu ? "1px solid rgba(12, 13, 18, 0.08)" : "1px solid transparent",
          transition: "background-color 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease",
          zIndex: 1001,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              userSelect: "none",
              textDecoration: "none",
            }}
          >
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

            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: showDarkText ? "var(--text-dark)" : "#FFFFFF",
                transition: "color 0.4s ease",
              }}
            >
              BMW
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="nav-desktop-links" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <button
              onMouseEnter={() => handleMouseEnter("models")}
              onClick={() => router.push("/models")}
              className="nav-link"
              style={{ color: textColor }}
            >
              Models
            </button>
            <button
              onMouseEnter={() => handleMouseEnter("heritage")}
              onClick={() => scrollToSection("heritage")}
              className="nav-link"
              style={{ color: textColor }}
            >
              Heritage
            </button>
            <Link
              href="/motorsport"
              className="nav-link"
              style={{ color: textColor }}
              onMouseEnter={() => setActiveMenu(null)}
            >
              Motorsport
            </Link>
            <button
              onMouseEnter={() => handleMouseEnter("explore")}
              className="nav-link"
              style={{ color: textColor }}
            >
              Explore
            </button>
            <Link
              href="/configure"
              className="nav-link"
              style={{ color: textColor }}
              onMouseEnter={() => setActiveMenu(null)}
            >
              Configure
            </Link>
          </div>

          {/* Hamburger — visible only on mobile via CSS */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            style={{
              display: "none", /* shown at ≤768px via globals.css */
              flexDirection: "column",
              gap: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  backgroundColor: showDarkText ? "#0C0D12" : "#FFFFFF",
                  borderRadius: "2px",
                  transition: "background-color 0.3s ease",
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* MEGA-MENU DROPDOWN */}
      {activeMenu && (
        <div
          onMouseEnter={() => {
            if (menuTimeout.current) clearTimeout(menuTimeout.current);
          }}
          style={{
            position: "absolute",
            top: "72px",
            left: 0,
            right: 0,
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid rgba(12, 13, 18, 0.08)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.04)",
            padding: "48px 72px",
            display: "flex",
            justifyContent: "center",
            zIndex: 999,
            animation: "slideDown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1440px",
              display: "flex",
              gap: "64px",
            }}
          >
            {menuItems[activeMenu].sections.map((section, sIdx) => (
              <div key={sIdx} style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "var(--primary-blue)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "20px",
                    display: "block",
                  }}
                >
                  {section.title}
                </span>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {section.items.map((item: NavItem) => {
                    const href = item.href || `/models/${item.id}`;
                    return (
                      <Link
                        key={item.id || item.href}
                        href={href}
                        onClick={() => setActiveMenu(null)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "12px 16px",
                          borderLeft: "2px solid transparent",
                          textDecoration: "none",
                          transition: "border-color 0.3s ease, background-color 0.3s ease",
                          minWidth: "220px",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--primary-blue)";
                          e.currentTarget.style.backgroundColor = "var(--bg-light)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "transparent";
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "var(--text-dark)",
                            marginBottom: "2px",
                          }}
                        >
                          {item.title}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "11px",
                            color: "var(--text-muted)",
                          }}
                        >
                          {item.sub}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quick Actions panel for Models menu */}
            {activeMenu === "models" && (
              <div style={{ display: "flex", flexDirection: "column", marginLeft: "auto", borderLeft: "1px solid #E5E7EB", paddingLeft: "48px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "var(--primary-blue)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "20px",
                    display: "block",
                  }}
                >
                  QUICK LINKS
                </span>
                <Link
                  href="/models"
                  onClick={() => setActiveMenu(null)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--primary-blue)",
                    textDecoration: "none",
                    marginBottom: "12px",
                    transition: "opacity 0.3s ease",
                  }}
                >
                  VIEW ALL {BMW_MODEL_COUNT} MODELS →
                </Link>
                <Link
                  href="/configure"
                  onClick={() => setActiveMenu(null)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text-dark)",
                    textDecoration: "none",
                    marginBottom: "12px",
                    transition: "color 0.3s ease",
                  }}
                >
                  CONFIGURE YOUR BMW →
                </Link>
                <Link
                  href="/motorsport"
                  onClick={() => setActiveMenu(null)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text-dark)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                >
                  MOTORSPORT HERITAGE →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SlideDown keyframe lives in globals.css */}

      {/* ======= MOBILE FULL-SCREEN MENU ======= */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#0C0D12",
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
            padding: "24px 28px 48px 28px",
            overflowY: "auto",
            animation: "slideDown 0.3s ease",
          }}
        >
          {/* Close row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px" }}>
            <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <svg width="32" height="32" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="#0C0D12" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                <path d="M 50 50 L 50 20 A 30 30 0 0 0 20 50 Z" fill="#1C69D4" />
                <path d="M 50 50 L 80 50 A 30 30 0 0 0 50 20 Z" fill="#FFFFFF" />
                <path d="M 50 50 L 50 80 A 30 30 0 0 0 80 50 Z" fill="#1C69D4" />
                <path d="M 50 50 L 20 50 A 30 30 0 0 0 50 80 Z" fill="#FFFFFF" />
              </svg>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.2em", color: "#FFFFFF" }}>BMW</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", cursor: "pointer" }}
            >
              CLOSE ×
            </button>
          </div>

          {/* Main links */}
          {([
            { label: "Models", href: "/models" },
            { label: "Electric", href: "/electric" },
            { label: "Motorsport", href: "/motorsport" },
            { label: "Gallery", href: "/gallery" },
            { label: "Driving Experience", href: "/experience" },
            { label: "BMW World", href: "/world" },
            { label: "Configure", href: "/configure" },
          ] as {label:string; href:string}[]).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "36px",
                fontWeight: 300,
                color: pathname === item.href ? "var(--primary-blue)" : "#FFFFFF",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "20px",
                marginBottom: "20px",
                display: "block",
                transition: "color 0.2s ease",
              }}
            >
              {item.label}
            </Link>
          ))}

          {/* Bottom CTA */}
          <div style={{ marginTop: "auto", paddingTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link
              href="/configure"
              onClick={() => setMobileOpen(false)}
              style={{
                backgroundColor: "var(--primary-blue)",
                color: "#FFFFFF",
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textDecoration: "none",
                textAlign: "center",
                padding: "18px 24px",
                display: "block",
              }}
            >
              CONFIGURE YOUR BMW →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
