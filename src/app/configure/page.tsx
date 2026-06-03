"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";

const MODELS = [
  { id: "m2", name: "BMW M2", basePrice: 64900, image: "/uploads/models/m2.png", power: "460 HP", engine: "S58 I6" },
  { id: "m3", name: "BMW M3 Competition", basePrice: 89900, image: "/uploads/models/m3.png", power: "510 HP", engine: "S58 I6" },
  { id: "m4", name: "BMW M4 Competition", basePrice: 92400, image: "/uploads/models/m4.png", power: "510 HP", engine: "S58 I6" },
  { id: "m5", name: "BMW M5", basePrice: 132800, image: "/uploads/models/m5.png", power: "616 HP", engine: "S68 V8" },
  { id: "i4", name: "BMW i4 M50", basePrice: 75600, image: "/uploads/electric/i4_m50.png", power: "544 HP", engine: "eDrive" },
  { id: "xm", name: "BMW XM Label", basePrice: 185900, image: "/uploads/models/xm.png", power: "748 HP", engine: "S68 + Electric" },
];

// Color-variant image map: model id → colour id → image path
const COLOR_IMAGE_MAP: Record<string, Record<string, string>> = {
  m2: {
    "alpine-white": "/uploads/models/m2_white.png",
    "black-sapphire": "/uploads/models/m2_black.png",
    "portimao-blue": "/uploads/models/m2.png",
    "isle-of-man": "/uploads/models/m2_green.png",
    "toronto-red": "/uploads/models/m2_red.png",
    "brooklyn-grey": "/uploads/models/m2_grey.png",
    "frozen-marina": "/uploads/models/m2_frozen_blue.png",
    "fire-orange": "/uploads/models/m2_orange.png",
  },
  m3: {
    "alpine-white": "/uploads/models/m3.png",
    "black-sapphire": "/uploads/models/m3.png",
    "portimao-blue": "/uploads/models/m3.png",
    "isle-of-man": "/uploads/models/m3.png",
    "toronto-red": "/uploads/models/m3.png",
    "brooklyn-grey": "/uploads/models/m3.png",
    "frozen-marina": "/uploads/models/m3.png",
    "fire-orange": "/uploads/models/m3.png",
  },
  m4: {
    "alpine-white": "/uploads/models/m4_white.png",
    "black-sapphire": "/uploads/models/m4_black.png",
    "portimao-blue": "/uploads/models/m4.png",
    "isle-of-man": "/uploads/models/m4_green.png",
    "toronto-red": "/uploads/models/m4_red.png",
    "brooklyn-grey": "/uploads/models/m4_grey.png",
    "frozen-marina": "/uploads/models/m4_frozen_blue.png",
    "fire-orange": "/uploads/models/m4_orange.png",
  },
  m5: {
    "alpine-white": "/uploads/models/m5_white.png",
    "black-sapphire": "/uploads/models/m5_black.png",
    "portimao-blue": "/uploads/models/m5_blue.png",
    "isle-of-man": "/uploads/models/m5_green.png",
    "toronto-red": "/uploads/models/m5_red.png",
    "brooklyn-grey": "/uploads/models/m5_grey.png",
    "frozen-marina": "/uploads/models/m5_frozen_blue.png",
    "fire-orange": "/uploads/models/m5_orange.png",
  },
  i4: {
    "alpine-white": "/uploads/electric/i4_m50.png",
    "black-sapphire": "/uploads/electric/i4_m50.png",
    "portimao-blue": "/uploads/electric/i4_m50.png",
    "isle-of-man": "/uploads/electric/i4_m50.png",
    "toronto-red": "/uploads/electric/i4_m50.png",
    "brooklyn-grey": "/uploads/electric/i4_m50.png",
    "frozen-marina": "/uploads/electric/i4_m50.png",
    "fire-orange": "/uploads/electric/i4_m50.png",
  },
  xm: {
    "alpine-white": "/uploads/models/xm_white.png",
    "black-sapphire": "/uploads/models/xm.png",
    "portimao-blue": "/uploads/models/xm_blue.png",
    "isle-of-man": "/uploads/models/xm_blue.png",
    "toronto-red": "/uploads/models/xm_blue.png",
    "brooklyn-grey": "/uploads/models/xm_blue.png",
    "frozen-marina": "/uploads/models/xm_blue.png",
    "fire-orange": "/uploads/models/xm_blue.png",
  },
};

// Resolve current preview image: colour variant if available, else model default
function resolvePreviewImage(modelId: string, colorId: string, defaultImage: string): string {
  return COLOR_IMAGE_MAP[modelId]?.[colorId] ?? defaultImage;
}

// Dynamically shift model rendering colors using CSS filters for un-rendered combinations (M3, i4, XM)
function resolvePreviewFilter(modelId: string, colorId: string): string {
  if (modelId === "m2" || modelId === "m4" || modelId === "m5") {
    return "none";
  }

  // M3: Base image is green (isle-of-man green paint)
  if (modelId === "m3") {
    switch (colorId) {
      case "isle-of-man":
        return "none";
      case "alpine-white":
        return "saturate(0) brightness(1.6) contrast(0.95)";
      case "black-sapphire":
        return "saturate(0) brightness(0.28) contrast(1.15)";
      case "portimao-blue":
        return "hue-rotate(90deg) saturate(1.2) brightness(0.85)";
      case "toronto-red":
        return "hue-rotate(240deg) saturate(1.5) brightness(0.95)";
      case "brooklyn-grey":
        return "saturate(0) brightness(1.15) contrast(0.95)";
      case "frozen-marina":
        return "hue-rotate(95deg) saturate(1.3) brightness(0.78) contrast(1.05)";
      case "fire-orange":
        return "hue-rotate(270deg) saturate(1.7) brightness(1.05)";
      default:
        return "none";
    }
  }

  // i4: Base image is blue (portimao-blue paint)
  if (modelId === "i4") {
    switch (colorId) {
      case "portimao-blue":
        return "none";
      case "alpine-white":
        return "saturate(0) brightness(1.5) contrast(0.9)";
      case "black-sapphire":
        return "saturate(0) brightness(0.26) contrast(1.1)";
      case "isle-of-man":
        return "hue-rotate(270deg) saturate(1.2) brightness(0.8)";
      case "toronto-red":
        return "hue-rotate(150deg) saturate(1.6) brightness(0.95)";
      case "brooklyn-grey":
        return "saturate(0) brightness(1.1) contrast(0.95)";
      case "frozen-marina":
        return "saturate(1.25) brightness(0.9) contrast(1.05)";
      case "fire-orange":
        return "hue-rotate(180deg) saturate(1.7) brightness(1.05)";
      default:
        return "none";
    }
  }

  // XM:
  if (modelId === "xm") {
    if (colorId === "alpine-white" || colorId === "black-sapphire" || colorId === "portimao-blue") {
      return "none";
    }
    switch (colorId) {
      case "isle-of-man":
        return "hue-rotate(270deg) saturate(1.25) brightness(0.85)";
      case "toronto-red":
        return "hue-rotate(150deg) saturate(1.6) brightness(0.95)";
      case "brooklyn-grey":
        return "saturate(0) brightness(1.1) contrast(0.95)";
      case "frozen-marina":
        return "saturate(1.2) brightness(0.9) contrast(1.05)";
      case "fire-orange":
        return "hue-rotate(180deg) saturate(1.8) brightness(1.0)";
      default:
        return "none";
    }
  }

  return "none";
}

const COLORS = [
  { id: "alpine-white", name: "Alpine White III", hex: "#E8E6E0", price: 0 },
  { id: "black-sapphire", name: "Black Sapphire", hex: "#141518", price: 800 },
  { id: "portimao-blue", name: "Portimao Blue", hex: "#1C69D4", price: 800 },
  { id: "isle-of-man", name: "Isle of Man Green", hex: "#004D2F", price: 2900 },
  { id: "toronto-red", name: "Toronto Red", hex: "#B51B1B", price: 800 },
  { id: "brooklyn-grey", name: "Brooklyn Grey", hex: "#8A8B84", price: 800 },
  { id: "frozen-marina", name: "Frozen Marina Bay Blue", hex: "#0066B1", price: 4200, badge: "INDIVIDUAL" },
  { id: "fire-orange", name: "Fire Orange", hex: "#E85D26", price: 3400, badge: "INDIVIDUAL" },
];

const TRIMS = [
  { id: "merino-black", name: "Merino Black Leather", desc: "Full Merino leather, contrast stitching, heated", price: 0 },
  { id: "silverstone", name: "Silverstone Leather", desc: "Light grey Merino with dark accents", price: 1800 },
  { id: "kyalami-orange", name: "Kyalami Orange / Black", desc: "BMW Individual bi-colour, orange accents", price: 4200 },
];

const WHEELS = [
  { id: "standard", name: "M Light Alloy 19\"", desc: "Standard M compound spoke, Jet Black", price: 0 },
  { id: "performance", name: "M Forged 20\" Bi-Color", desc: "Y-spoke, Gold Bronze / Black bi-colour", price: 2400 },
  { id: "track", name: "M Performance 20\" Track", desc: "Lightweight forged, Frozen Gold matte", price: 3800 },
];

export default function ConfigurePage() {
  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedTrim, setSelectedTrim] = useState(TRIMS[0]);
  const [selectedWheel, setSelectedWheel] = useState(WHEELS[0]);
  const [step, setStep] = useState(0); // 0=model, 1=color, 2=trim, 3=wheels, 4=summary
  const [requestSent, setRequestSent] = useState(false);

  const totalPrice = selectedModel.basePrice + selectedColor.price + selectedTrim.price + selectedWheel.price;
  const formatPrice = (p: number) => `€${p.toLocaleString("en-US")}`;

  const steps = ["MODEL", "EXTERIOR", "INTERIOR", "WHEELS", "SUMMARY"];

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <Navigation />

      <div style={{ display: "flex", minHeight: "100vh", paddingTop: "72px" }}>
        {/* LEFT PANEL — Configuration */}
        <div style={{ flex: "1 1 50%", padding: "64px 72px", display: "flex", flexDirection: "column", overflowY: "auto", maxHeight: "calc(100vh - 72px)" }}>
          <button
            onClick={() => router.back()}
            style={{
              background: "none",
              border: "none",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: 0,
              display: "inline-block",
              marginBottom: "32px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary-blue)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            ← GO BACK
          </button>

          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
            BMW CONFIGURATOR
          </span>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 300, color: "#0C0D12", lineHeight: "1.15", marginBottom: "48px" }}>
            Build Your <span style={{ fontWeight: 600, fontStyle: "italic" }}>Perfect BMW.</span>
          </h1>

          {/* Step indicator */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "48px" }}>
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                style={{
                  flex: 1,
                  height: "36px",
                  backgroundColor: step === i ? "var(--text-dark)" : "transparent",
                  color: step === i ? "#FFFFFF" : "var(--text-muted)",
                  border: "1px solid #E5E7EB",
                  fontFamily: "var(--font-sans)",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* STEP CONTENT */}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="model" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "#0C0D12", marginBottom: "24px" }}>Select Your Model</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {MODELS.map((model) => (
                    <div
                      key={model.id}
                      onClick={() => setSelectedModel(model)}
                      className={`config-option ${selectedModel.id === model.id ? "active" : ""}`}
                    >
                      <img src={model.image} alt={model.name} style={{ width: "80px", height: "50px", objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 600, color: "#0C0D12", display: "block" }}>{model.name}</span>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-muted)" }}>{model.power}  ·  {model.engine}</span>
                      </div>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#0C0D12" }}>{formatPrice(model.basePrice)}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="color" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "#0C0D12", marginBottom: "24px" }}>Exterior Colour</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "12px" }}>
                  {COLORS.map((color) => (
                    <div
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`config-swatch ${selectedColor.id === color.id ? "active" : ""}`}
                      style={{ width: "100%", height: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}
                    >
                      <div style={{ width: "100%", height: "48px", backgroundColor: color.hex, border: color.hex === "#E8E6E0" ? "1px solid #E5E7EB" : "none" }} />
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 600, color: "#0C0D12", textAlign: "center", lineHeight: "1.3" }}>{color.name}</span>
                      {color.badge && <span style={{ fontFamily: "var(--font-sans)", fontSize: "8px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.1em" }}>{color.badge}</span>}
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-muted)" }}>{color.price === 0 ? "Included" : `+${formatPrice(color.price)}`}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="trim" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "#0C0D12", marginBottom: "24px" }}>Interior Trim</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {TRIMS.map((trim) => (
                    <div
                      key={trim.id}
                      onClick={() => setSelectedTrim(trim)}
                      className={`config-option ${selectedTrim.id === trim.id ? "active" : ""}`}
                    >
                      <div style={{ flex: 1 }}>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 600, color: "#0C0D12", display: "block" }}>{trim.name}</span>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-muted)" }}>{trim.desc}</span>
                      </div>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#0C0D12" }}>{trim.price === 0 ? "Included" : `+${formatPrice(trim.price)}`}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="wheels" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "#0C0D12", marginBottom: "24px" }}>Wheel Package</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {WHEELS.map((wheel) => (
                    <div
                      key={wheel.id}
                      onClick={() => setSelectedWheel(wheel)}
                      className={`config-option ${selectedWheel.id === wheel.id ? "active" : ""}`}
                    >
                      <div style={{ flex: 1 }}>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 600, color: "#0C0D12", display: "block" }}>{wheel.name}</span>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-muted)" }}>{wheel.desc}</span>
                      </div>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#0C0D12" }}>{wheel.price === 0 ? "Included" : `+${formatPrice(wheel.price)}`}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="summary" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "#0C0D12", marginBottom: "32px" }}>Your Configuration</h3>

                {[
                  { label: "Model", value: selectedModel.name, price: selectedModel.basePrice },
                  { label: "Exterior", value: selectedColor.name, price: selectedColor.price },
                  { label: "Interior", value: selectedTrim.name, price: selectedTrim.price },
                  { label: "Wheels", value: selectedWheel.name, price: selectedWheel.price },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid #E5E7EB" }}>
                    <div>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>{item.label}</span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 600, color: "#0C0D12" }}>{item.value}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#0C0D12", alignSelf: "center" }}>{formatPrice(item.price)}</span>
                  </div>
                ))}

                <div style={{ display: "flex", justifyContent: "space-between", padding: "24px 0", borderBottom: "2px solid #0C0D12", marginTop: "8px" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 700, color: "#0C0D12", letterSpacing: "0.1em", textTransform: "uppercase" }}>TOTAL</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 600, color: "#0C0D12" }}>{formatPrice(totalPrice)}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav buttons */}
          <div style={{ display: "flex", gap: "12px", marginTop: "auto", paddingTop: "48px" }}>
            {step > 0 && !requestSent && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  flex: 1,
                  height: "48px",
                  backgroundColor: "transparent",
                  color: "var(--text-dark)",
                  border: "1px solid #E5E7EB",
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease",
                }}
              >
                ← PREVIOUS
              </button>
            )}
            {step < 4 && (
              <button
                onClick={() => setStep(step + 1)}
                style={{
                  flex: 1,
                  height: "48px",
                  backgroundColor: "var(--text-dark)",
                  color: "#FFFFFF",
                  border: "none",
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                NEXT STEP →
              </button>
            )}
            {step === 4 && !requestSent && (
              <button
                onClick={() => setRequestSent(true)}
                style={{
                  flex: 1,
                  height: "56px",
                  backgroundColor: "var(--primary-blue)",
                  color: "#FFFFFF",
                  border: "none",
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1455B0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-blue)")}
              >
                REQUEST BUILD QUOTE →
              </button>
            )}
            {step === 4 && requestSent && (
              <div
                style={{
                  flex: 1,
                  height: "56px",
                  backgroundColor: "#F5F5F7",
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "#0D5B43",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ fontSize: "18px" }}>✓</span>
                BUILD SUBMITTED — WE&apos;LL BE IN TOUCH
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL — Visual Preview */}
        <div
          style={{
            flex: "1 1 50%",
            backgroundColor: "#0C0D12",
            position: "sticky",
            top: "72px",
            height: "calc(100vh - 72px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Car preview image — updates when model OR colour changes */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {/* Colour wash layer — always reflects selected colour */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: selectedColor.hex,
                opacity: 0.12,
                transition: "background-color 0.5s ease",
                zIndex: 1,
              }}
            />
            <AnimatePresence mode="wait">
              <motion.img
                key={`${selectedModel.id}-${selectedColor.id}`}
                src={resolvePreviewImage(selectedModel.id, selectedColor.id, selectedModel.image)}
                alt={`${selectedModel.name} in ${selectedColor.name}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  position: "relative", 
                  zIndex: 2,
                  filter: resolvePreviewFilter(selectedModel.id, selectedColor.id)
                }}
              />
            </AnimatePresence>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,13,18,0.85) 0%, rgba(12,13,18,0) 50%)", zIndex: 3 }} />
            {/* Colour chip badge */}
            <div
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                zIndex: 4,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "rgba(12,13,18,0.6)",
                backdropFilter: "blur(12px)",
                padding: "8px 14px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: selectedColor.hex,
                  border: selectedColor.hex === "#E8E6E0" ? "1px solid rgba(255,255,255,0.4)" : "none",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {selectedColor.name}
              </span>
            </div>
          </div>

          {/* Bottom info panel */}
          <div style={{ padding: "32px 48px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  YOUR BUILD
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "#FFFFFF" }}>
                  {selectedModel.name}
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "#9CA3AF", display: "block", marginBottom: "2px" }}>
                  AS CONFIGURED
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 600, color: "#FFFFFF" }}>
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* Color swatch preview */}
            <div style={{ display: "flex", gap: "12px", marginTop: "20px", alignItems: "center" }}>
              <div style={{ width: "16px", height: "16px", backgroundColor: selectedColor.hex, border: selectedColor.hex === "#E8E6E0" ? "1px solid rgba(255,255,255,0.3)" : "none" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
                {selectedColor.name}  ·  {selectedTrim.name}  ·  {selectedWheel.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
