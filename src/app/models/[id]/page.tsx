"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import { BMW_MODELS } from "../page";

// ================= COMPREHENSIVE VERIFIED BMW VEHICLE DATABASE =================
const CAR_DATABASE: Record<
  string,
  {
    title: string;
    category: string;
    description: string;
    story: string;
    images: string[];
    specs: { name: string; value: string }[];
  }
> = {
  "1916": {
    title: "BMW IIIa Aircraft Engine",
    category: "HERITAGE ERA  ·  1916 ORIGINS",
    description: "The founding block of BMW engineering. Designed by Max Friz, the IIIa was a water-cooled straight-six engine that powered the Fokker D.VII fighter aircraft and established the brand's reputation for mechanical precision.",
    story: "As the first power unit created under the BMW name, the IIIa laid the groundwork for our legendary inline-6 family. Its key innovation was a unique altitude-compensating carburetor, which allowed the aircraft to maintain full horsepower at high altitudes where competing engines choked on thin air.",
    specs: [
      { name: "Engine Code", value: "BMW IIIa" },
      { name: "Configuration", value: "Liquid-cooled Straight-6" },
      { name: "Displacement", value: "19.1 Litres" },
      { name: "Power Output", value: "185 HP @ 1,400 RPM" },
      { name: "Weight", value: "290 kg (Engine only)" },
      { name: "Historical Impact", value: "Powered the Fokker D.VII Fighter" },
    ],
    images: [
      "/uploads/models/bmw_1916_iiia.png",
      "/uploads/iiia_schematic.png",
    ],
  },
  "1936": {
    title: "BMW 328 Roadster",
    category: "HERITAGE ERA  ·  1936 SPORT CLASSICS",
    description: "The pre-war roadster that redefined automotive chassis layouts. The BMW 328 Roadster combined ultra-lightweight space-frame mechanics with high-revving straight-six performance, claiming ultimate victory at the 1940 Mille Miglia.",
    story: "Created by legendary designer Fritz Fiedler, the 328 featured a sweeping aerodynamic body, independent front suspension, and a tubular space-frame. Weighing only 830 kg, its power-to-weight ratio and balance set race tracks on fire, creating the sports-roadster blueprint we still follow today.",
    specs: [
      { name: "Engine Family", value: "M328 Straight-6" },
      { name: "Displacement", value: "2.0 Litres (1,971 cc)" },
      { name: "Power Output", value: "80 HP @ 5,000 RPM" },
      { name: "0–100 km/h", value: "12.0 seconds" },
      { name: "Top Speed", value: "150 km/h" },
      { name: "Chassis Weight", value: "830 kg (Ultra-lightweight)" },
    ],
    images: [
      "/uploads/models/bmw_1936_328.png",
      "/uploads/bmw_328_mille_miglia.png",
    ],
  },
  "1972": {
    title: "BMW 3.0 CSL 'Batmobile'",
    category: "HERITAGE ERA  ·  1972 RACING ORIGINS",
    description: "The physical progenitor of BMW Motorsport. Built as a homologation special for touring car racing, the 3.0 CSL ('Coupé Sport Leicht') featured a massive aerodynamic wing kit that earned it the legendary 'Batmobile' moniker.",
    story: "Under the leadership of Jochen Neerpasch, the newly formed BMW Motorsport GmbH shaved weight by using aluminum panels, thin gauge steel, and plexiglass windows. The machine went on to claim five European Touring Car Championships, dominating Le Mans class grids.",
    specs: [
      { name: "Engine Code", value: "M30 Inline-6" },
      { name: "Displacement", value: "3.0 Litres (Later 3.2L)" },
      { name: "Power Output", value: "206 HP @ 5,600 RPM" },
      { name: "0–100 km/h", value: "6.9 seconds" },
      { name: "Body Panels", value: "Aluminum Doors & Hood" },
      { name: "Aero Spec", value: "Triple Rear Wing Assembly" },
    ],
    images: [
      "/uploads/motorsport/csl_1973.png",
      "/uploads/csl_cockpit.png",
    ],
  },
  "1986": {
    title: "BMW M3 E30",
    category: "HERITAGE ERA  ·  1986 TOURING LEGENDS",
    description: "The most successful touring racer in history. Built to satisfy Group A homologation rules, the E30 M3 presented a high-revving 4-cylinder S14 engine coupled with a lightweight dogleg gearbox and boxy wide arches.",
    story: "Paul Rosche's twin-cam S14 engine utilized block architectures shared with our Formula 1 campaigns. Packing 200 HP in its initial road form, it went on to conquer touring car titles in Germany, Britain, and Australia, accumulating over 1,500 race wins.",
    specs: [
      { name: "Engine Code", value: "S14 DOHC Inline-4" },
      { name: "Displacement", value: "2.3 Litres" },
      { name: "Power Output", value: "200 HP @ 6,750 RPM" },
      { name: "0–100 km/h", value: "6.7 seconds" },
      { name: "Transmission", value: "5-Speed Getrag Dogleg" },
      { name: "Total Race Wins", value: "1,500+ Worldwide Victories" },
    ],
    images: [
      "/uploads/motorsport/m3_e30_racing.png",
      "/uploads/m3_e30_drift.png",
    ],
  },
  "2014": {
    title: "BMW i8 Hybrid Supercar",
    category: "HERITAGE ERA  ·  2014 HYBRID FUTURE",
    description: "The future brought into the present. The BMW i8 combined a carbon-fiber passenger monocoque cell and active scissor doors with a revolutionary plug-in hybrid all-wheel drive drivetrain.",
    story: "Featuring a mid-mounted 1.5L turbocharged 3-cylinder engine driving the rear wheels, paired with a front-mounted electric motor, the i8 formed a digital virtual xDrive. It proved that light construction, efficiency, and exotic supercar proportions could coexist in total harmony.",
    specs: [
      { name: "Engine + Motor", value: "B38 1.5L Turbo + Electric Motor" },
      { name: "Total System Power", value: "357 HP (Later 369 HP)" },
      { name: "0–100 km/h", value: "4.4 seconds" },
      { name: "Chassis Material", value: "Carbon Fiber Reinforced Plastic" },
      { name: "Drag Coefficient", value: "0.26 Cd (Active Aero)" },
      { name: "Electric Range", value: "Up to 37 km (NEDC)" },
    ],
    images: [
      "/uploads/models/bmw_2014_i8.png",
      "/uploads/i8_midnight.png",
    ],
  },
  "2026": {
    title: "BMW Neue Klasse Concept",
    category: "HERITAGE ERA  ·  2026 FUTURE PROMISE",
    description: "The ultimate reinvention of Bayerische Motoren Werke. Representing a clean-sheet structural EV architecture, the Neue Klasse introduces next-generation cylindrical battery cells and dynamic cockpit integration.",
    story: "Designed from the battery pack up, the Neue Klasse utilizes structural round cells to yield a 30% increase in driving range, a 25% increase in charging speed, and an immersive digital environment that maps operational feedback across the entire lower windshield area.",
    specs: [
      { name: "Platform Code", value: "NC1 EV Architecture" },
      { name: "Battery Tech", value: "Structural Cylindrical Gen6 Cells" },
      { name: "Charging Speeds", value: "800V Ultra-Fast Capability" },
      { name: "Efficiency Target", value: "25% Higher Operational Yield" },
      { name: "Cockpit Interface", value: "Panoramic Vision HUD" },
      { name: "Target Range", value: "Over 700 km (WLTP)" },
    ],
    images: [
      "/uploads/gallery/g16.png",
      "/uploads/neue_klasse_interior.png",
    ],
  },
  m2: {
    title: "BMW M2 Coupe",
    category: "M SERIES  ·  PERFORMANCE DRIVING",
    description: "The purest performance chassis in our lineup. The BMW M2 is a rear-wheel-drive performance coupe that packages the race-bred S58 twin-turbo straight-six engine into a highly compact, track-focused frame.",
    story: "Combining active rear differentials with short wheelbase mechanics, the M2 provides raw feedback. Its classic mechanical balance, matched to electronic dampening and active M Traction, makes it the modern spiritual successor to pre-war racing coupes.",
    specs: [
      { name: "Engine Code", value: "S58 3.0L Twin-Turbo" },
      { name: "Layout", value: "Front Engine / Rear-Wheel Drive" },
      { name: "Displacement", value: "3.0 Litres (Straight-6)" },
      { name: "Power Output", value: "460 HP @ 6,250 RPM" },
      { name: "Torque Output", value: "550 Nm @ 2,650 RPM" },
      { name: "0–100 km/h", value: "4.1 seconds" },
    ],
    images: [
      "/uploads/models/m2.png",
      "/uploads/gallery/g11.png",
    ],
  },
  m4: {
    title: "BMW M4 Competition",
    category: "M SERIES  ·  PERFORMANCE DRIVING",
    description: "The performance coupe benchmark. The BMW M4 Competition combines uncompromising high-revving turbo power with advanced chassis structural reinforcements to create a razor-sharp track car.",
    story: "Packing the twin-turbocharged S58 straight-six, the M4 Competition delivers 510 HP with high thermal stability due to 3D-printed cylinder heads and racetrack cooling configurations. Active dampeners ensure high-speed road compliance and track dominance.",
    specs: [
      { name: "Engine Code", value: "S58 3.0L Twin-Turbo" },
      { name: "Drivetrain Layout", value: "Rear-Wheel Drive (Optional xDrive)" },
      { name: "Power Output", value: "510 HP @ 6,250 RPM" },
      { name: "Torque Output", value: "650 Nm @ 2,750 RPM" },
      { name: "0–100 km/h", value: "3.9 seconds" },
      { name: "Transmission", value: "8-Speed M Steptronic" },
    ],
    images: [
      "/uploads/models/m4.png",
      "/uploads/gallery/g02.png",
    ],
  },
  m5: {
    title: "BMW M5 xDrive",
    category: "M SERIES  ·  PERFORMANCE DRIVING",
    description: "The ultimate high-performance executive sedan. The BMW M5 merges luxury cabin acoustics and executive long-distance comfort with brutal TwinPower Turbo V8 performance and smart all-wheel traction.",
    story: "Utilizing the powerful twin-turbo S68 V8, the M5 integrates xDrive intelligent all-wheel drive with a specialized active 2WD mode. This allows drivers to disconnect front-axle traction completely, creating a pure, tail-happy rear-wheel-drive behavior.",
    specs: [
      { name: "Engine Code", value: "S68 4.4L Twin-Turbo V8" },
      { name: "Displacement", value: "4.4 Litres (V8)" },
      { name: "Power Output", value: "616 HP @ 6,000 RPM" },
      { name: "Torque Output", value: "750 Nm @ 1,800 RPM" },
      { name: "0–100 km/h", value: "3.5 seconds" },
      { name: "Drivetrain", value: "M xDrive Symmetrical AWD" },
    ],
    images: [
      "/uploads/models/m5.png",
      "/uploads/gallery/g01.png",
    ],
  },
  xm: {
    title: "BMW XM Label",
    category: "M SERIES  ·  PERFORMANCE DRIVING",
    description: "The most powerful road-legal vehicle ever engineered by BMW M. The XM is a bespoke high-performance SUV packing a track-bred S68 twin-turbo V8 matched to a structural electric drive engine.",
    story: "Combining 748 HP and 1,000 Nm of system torque, the XM Label redefines high-end plug-in hybrid capabilities. It delivers instant throttle response from its electric motor, backed by the roaring, twin-turbo V8 mechanical block.",
    specs: [
      { name: "Engine Code", value: "S68 V8 + Integrated Electric" },
      { name: "System Output", value: "748 HP / 1,000 Nm Torque" },
      { name: "0–100 km/h", value: "3.8 seconds" },
      { name: "Battery Capacity", value: "25.7 kWh Plug-In Hybrid" },
      { name: "Top Speed", value: "290 km/h (M Driver's Package)" },
      { name: "Drivetrain", value: "xDrive AWD Performance Config" },
    ],
    images: [
      "/uploads/models/xm.png",
      "/uploads/gallery/g07.png",
    ],
  },
};

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Geometry {
  vertices: Point3D[];
  edges: number[][];
}

function getChassisGeometry(shape: "sedan" | "suv" | "roadster" | "coupe"): Geometry {
  const vertices: Point3D[] = [];
  const edges: number[][] = [];

  const zStations = [-1.7, -1.2, -0.7, -0.2, 0.3, 0.8, 1.3, 1.7];

  for (let zIdx = 0; zIdx < zStations.length; zIdx++) {
    const z = zStations[zIdx];

    let width = 0.9;
    let height = 0.1;
    let bottomY = -0.3;

    if (shape === "suv") {
      bottomY = -0.4;
      width = 0.95;
      if (zIdx <= 1) {
        height = 0.3;
      } else if (zIdx >= 2 && zIdx <= 6) {
        height = 0.8;
      } else {
        height = 0.6;
      }
    } else if (shape === "roadster") {
      bottomY = -0.3;
      width = 0.85;
      if (zIdx <= 3) {
        height = 0.1;
      } else if (zIdx === 4 || zIdx === 5) {
        height = 0.45;
      } else {
        height = 0.05;
      }
    } else if (shape === "coupe") {
      bottomY = -0.32;
      width = 0.9;
      if (zIdx <= 1) {
        height = 0.1;
      } else if (zIdx === 2) {
        height = 0.35;
      } else if (zIdx === 3) {
        height = 0.5;
      } else if (zIdx === 4) {
        height = 0.4;
      } else if (zIdx === 5) {
        height = 0.25;
      } else {
        height = 0.08;
      }
    } else {
      bottomY = -0.3;
      width = 0.9;
      if (zIdx <= 1) {
        height = 0.12;
      } else if (zIdx >= 2 && zIdx <= 5) {
        height = 0.52;
      } else {
        height = 0.15;
      }
    }

    const midY = bottomY + (height - bottomY) * 0.45;
    const topW = (zIdx >= 2 && zIdx <= 5) ? 0.75 : 0.9;

    vertices.push(
      { x: -width, y: bottomY, z: z },
      { x: width, y: bottomY, z: z },
      { x: width * 1.05, y: midY, z: z },
      { x: width * topW, y: height, z: z },
      { x: -width * topW, y: height, z: z },
      { x: -width * 1.05, y: midY, z: z }
    );

    const base = zIdx * 6;
    edges.push(
      [base, base + 1],
      [base + 1, base + 2],
      [base + 2, base + 3],
      [base + 3, base + 4],
      [base + 4, base + 5],
      [base + 5, base]
    );

    if (zIdx > 0) {
      const prevBase = (zIdx - 1) * 6;
      for (let i = 0; i < 6; i++) {
        edges.push([prevBase + i, base + i]);
      }
    }
  }

  // Left kidney grille
  const lg1 = vertices.length;
  vertices.push(
    { x: -0.3, y: -0.15, z: -1.72 },
    { x: -0.05, y: -0.15, z: -1.72 },
    { x: -0.05, y: 0.05, z: -1.72 },
    { x: -0.3, y: 0.05, z: -1.72 }
  );
  edges.push(
    [lg1, lg1 + 1], [lg1 + 1, lg1 + 2], [lg1 + 2, lg1 + 3], [lg1 + 3, lg1],
    [0, lg1], [5, lg1 + 3]
  );

  // Right kidney grille
  const rg1 = vertices.length;
  vertices.push(
    { x: 0.05, y: -0.15, z: -1.72 },
    { x: 0.3, y: -0.15, z: -1.72 },
    { x: 0.3, y: 0.05, z: -1.72 },
    { x: 0.05, y: 0.05, z: -1.72 }
  );
  edges.push(
    [rg1, rg1 + 1], [rg1 + 1, rg1 + 2], [rg1 + 2, rg1 + 3], [rg1 + 3, rg1],
    [1, rg1 + 1], [2, rg1 + 2]
  );

  // Headlights
  const lh = vertices.length;
  vertices.push(
    { x: -0.65, y: 0.0, z: -1.72 },
    { x: -0.5, y: 0.0, z: -1.72 }
  );
  edges.push([lh, lh + 1], [0, lh], [5, lh + 1]);

  const rh = vertices.length;
  vertices.push(
    { x: 0.5, y: 0.0, z: -1.72 },
    { x: 0.65, y: 0.0, z: -1.72 }
  );
  edges.push([rh, rh + 1], [1, rh], [2, rh + 1]);

  return { vertices, edges };
}

function InteractiveChassisLab({
  car,
  id,
  isElectric,
  isMPower,
  isHeritage,
  isNeueKlasse,
}: {
  car: any;
  id: string;
  isElectric: boolean;
  isMPower: boolean;
  isHeritage: boolean;
  isNeueKlasse: boolean;
}) {
  const [driveMode, setDriveMode] = useState<"comfort" | "sport" | "sportPlus">("comfort");
  const [hudMode, setHudMode] = useState<"sport" | "efficient" | "navigation">("sport");
  const [evSpeed, setEvSpeed] = useState<number>(100);
  const [evTemp, setEvTemp] = useState<number>(20);
  const [mRpm, setMRpm] = useState<number>(1000);
  const [engineStarted, setEngineStarted] = useState<boolean>(false);
  const [blueprintFilter, setBlueprintFilter] = useState<"engine" | "chassis" | "aero">("engine");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0.25, y: 0.75 });
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });

  const autoAngleRef = useRef(0);
  const wheelAngleRef = useRef(0);
  const engineAngleRef = useRef(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  useEffect(() => {
    return () => {
      try {
        if (audioCtxRef.current) {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          audioCtxRef.current.close();
        }
      } catch (e) {}
    };
  }, []);

  const startEngine = () => {
    try {
      if (typeof window === "undefined") return;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, ctx.currentTime);
      filterNodeRef.current = filter;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNodeRef.current = gainNode;

      const osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(45, ctx.currentTime); 
      osc1Ref.current = osc1;

      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(90, ctx.currentTime); 
      osc2Ref.current = osc2;

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();

      gainNode.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.3);
      filter.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.3);

      gainNode.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.65);
      filter.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.65);

      setEngineStarted(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopEngine = () => {
    try {
      const ctx = audioCtxRef.current;
      const gainNode = gainNodeRef.current;
      if (ctx && gainNode) {
        gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        setTimeout(() => {
          try {
            osc1Ref.current?.stop();
            osc2Ref.current?.stop();
            ctx.close();
          } catch (err) {}
          audioCtxRef.current = null;
          osc1Ref.current = null;
          osc2Ref.current = null;
          gainNodeRef.current = null;
          filterNodeRef.current = null;
          setEngineStarted(false);
        }, 270);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRpmChange = (newRpm: number) => {
    setMRpm(newRpm);
    const ctx = audioCtxRef.current;
    const osc1 = osc1Ref.current;
    const osc2 = osc2Ref.current;
    const filter = filterNodeRef.current;
    const gainNode = gainNodeRef.current;

    if (ctx && engineStarted) {
      const baseFreq1 = 30 + (newRpm / 8000) * 90;
      const baseFreq2 = 60 + (newRpm / 8000) * 180;
      
      osc1?.frequency.setValueAtTime(baseFreq1, ctx.currentTime);
      osc2?.frequency.setValueAtTime(baseFreq2, ctx.currentTime);

      const filterFreq = 180 + (newRpm / 8000) * 800;
      filter?.frequency.setValueAtTime(filterFreq, ctx.currentTime);

      const volume = 0.08 + (newRpm / 8000) * 0.12;
      gainNode?.gain.setValueAtTime(volume, ctx.currentTime);
    }
  };

  const calculateSimulatedRange = () => {
    const baseRange = id.toLowerCase() === "i7" || id.toLowerCase() === "i7-m70" ? 580 : 490;
    const speedFactor = 1 - (evSpeed - 90) * 0.0065;
    const tempFactor = evTemp < 10 
      ? 1 - (10 - evTemp) * 0.0085 
      : evTemp > 30 
      ? 1 - (evTemp - 30) * 0.0045 
      : 1;
    return Math.round(baseRange * speedFactor * tempFactor);
  };

  const getTheme = () => {
    if (isHeritage) {
      return {
        bg: "#0B192E",
        primary: "#64FFDA",
        secondary: "rgba(100, 255, 218, 0.4)",
        grid: "rgba(100, 255, 218, 0.08)",
      };
    }
    if (isElectric) {
      return {
        bg: "#080F1A",
        primary: "#00F0FF",
        secondary: "rgba(0, 240, 255, 0.4)",
        grid: "rgba(0, 240, 255, 0.06)",
      };
    }
    if (isMPower) {
      return {
        bg: "#0D0D11",
        primary: "#E7222E",
        secondary: "rgba(231, 34, 46, 0.4)",
        grid: "rgba(28, 105, 212, 0.06)",
      };
    }
    if (isNeueKlasse) {
      return {
        bg: "#0A0B0E",
        primary: "#D1D5DB",
        secondary: "rgba(209, 213, 219, 0.4)",
        grid: "rgba(209, 213, 219, 0.06)",
      };
    }
    return {
      bg: "#0C0D12",
      primary: "#1C69D4",
      secondary: "rgba(28, 105, 212, 0.4)",
      grid: "rgba(28, 105, 212, 0.05)",
    };
  };

  const theme = getTheme();

  useEffect(() => {
    let animationFrameId: number;
    let autoAngle = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getChassisShape = () => {
      const title = car?.title?.toLowerCase() || "";
      const category = car?.category?.toLowerCase() || "";

      if (title.startsWith("x") || title.includes("ix") || category.includes("sav") || category.includes("suv")) {
        return "suv";
      }
      if (title.includes("z4") || category.includes("roadster")) {
        return "roadster";
      }
      if (title.includes("8 series") || title.includes("coupe") || title.includes("coupé") || category.includes("coupe") || category.includes("coupé")) {
        return "coupe";
      }
      return "sedan";
    };

    const shape = getChassisShape();
    const { vertices, edges } = getChassisGeometry(shape);

    const getHotspots = () => {
      if (id === "1916") {
        return [
          { id: "carburetor", label: "Altitude Carburetor", x: 0.3, y: 0.2, z: 0.0 },
          { id: "pistons", label: "Pistons & Rings", x: 0, y: 0.5, z: -0.4 },
          { id: "crankshaft", label: "Crankshaft Journals", x: 0, y: -0.3, z: 0.4 },
        ];
      }
      return [
        { id: "engine", label: "Engine", x: 0, y: 0.0, z: -1.3 },
        { id: "gearbox", label: "Gearbox", x: 0, y: -0.1, z: -0.3 },
        { id: "suspension", label: "Adaptive Suspension", x: 0, y: 0.15, z: 0.6 },
        { id: "xdrive", label: "xDrive Differential", x: 0, y: -0.1, z: 1.3 },
      ];
    };

    const hotspots = getHotspots();

    const getWheelCenters = () => {
      let width = 0.9;
      let bottomY = -0.2;
      let zBase = 1.1;

      if (shape === "suv") {
        width = 0.95;
        bottomY = -0.3;
        zBase = 1.2;
      } else if (shape === "roadster") {
        width = 0.85;
        bottomY = -0.2;
        zBase = 1.0;
      } else if (shape === "coupe") {
        width = 0.9;
        bottomY = -0.22;
        zBase = 1.15;
      }

      return [
        { x: -width, y: bottomY, z: -zBase },
        { x: width, y: bottomY, z: -zBase },
        { x: -width, y: bottomY, z: zBase },
        { x: width, y: bottomY, z: zBase },
      ];
    };

    const wheelCenters = getWheelCenters();

    interface WindParticle {
      x: number;
      y: number;
      z: number;
      length: number;
    }

    const windParticles: WindParticle[] = [];
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      windParticles.push({
        x: (Math.random() - 0.5) * 2.2,
        y: -0.3 + Math.random() * 0.9,
        z: -2.2 + Math.random() * 4.4,
        length: 0.15 + Math.random() * 0.25,
      });
    }

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      const cx = w / 2;
      const cy = h / 2;

      if (!isDragging.current) {
        autoAngleRef.current += 0.005;
      }

      const angleY = rotation.y + autoAngleRef.current;
      const angleX = rotation.x;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      let vibrateOffset = { x: 0, y: 0, z: 0 };
      if (isMPower && engineStarted) {
        const amp = 0.002 + (mRpm / 7800) * 0.008;
        vibrateOffset = {
          x: (Math.random() - 0.5) * amp,
          y: (Math.random() - 0.5) * amp,
          z: (Math.random() - 0.5) * amp,
        };
      }

      const project = (p: Point3D) => {
        const px = p.x + vibrateOffset.x;
        const py = p.y + vibrateOffset.y;
        const pz = p.z + vibrateOffset.z;

        const y1 = py * cosX - pz * sinX;
        const z1 = py * sinX + pz * cosX;
        const x2 = px * cosY + z1 * sinY;
        const z2 = -px * sinY + z1 * cosY;

        const fov = 350;
        const scale = fov / (fov + z2);
        const zoom = 90;
        
        return {
          x: cx + x2 * scale * zoom,
          y: cy - y1 * scale * zoom,
          z: z2,
        };
      };

      ctx.strokeStyle = theme.grid;
      ctx.lineWidth = 1;
      const gridCount = 6;
      const gridSpacing = 0.6;
      for (let i = -gridCount; i <= gridCount; i++) {
        let p1 = project({ x: i * gridSpacing, y: -0.3, z: -gridCount * gridSpacing });
        let p2 = project({ x: i * gridSpacing, y: -0.3, z: gridCount * gridSpacing });
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        p1 = project({ x: -gridCount * gridSpacing, y: -0.3, z: i * gridSpacing });
        p2 = project({ x: gridCount * gridSpacing, y: -0.3, z: i * gridSpacing });
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      let speedFactor = 0.02; 
      if (isElectric) {
        speedFactor = (evSpeed / 100) * 0.05;
      } else if (isMPower) {
        speedFactor = engineStarted ? (mRpm / 1000) * 0.025 : 0;
      } else {
        const spinSpeedMap = { comfort: 0.025, sport: 0.045, sportPlus: 0.075 };
        speedFactor = spinSpeedMap[driveMode];
      }

      ctx.strokeStyle = theme.secondary;
      ctx.lineWidth = 1.0;
      windParticles.forEach((p) => {
        p.z += speedFactor;
        if (p.z > 2.2) {
          p.z = -2.2;
          p.x = (Math.random() - 0.5) * 2.2;
          p.y = -0.3 + Math.random() * 0.9;
        }

        const startPt = project({ x: p.x, y: p.y, z: p.z - p.length });
        const endPt = project({ x: p.x, y: p.y, z: p.z });

        ctx.beginPath();
        ctx.moveTo(startPt.x, startPt.y);
        ctx.lineTo(endPt.x, endPt.y);
        ctx.stroke();
      });

      if (id === "1916") {
        engineAngleRef.current += 0.05;
        const theta = engineAngleRef.current;
        const r = 0.2; 
        const L = 0.6; 
        
        const zStations = [-0.9, -0.54, -0.18, 0.18, 0.54, 0.9];
        const phases = [
          0,
          (240 * Math.PI) / 180,
          (120 * Math.PI) / 180,
          (120 * Math.PI) / 180,
          (240 * Math.PI) / 180,
          0
        ];

        ctx.strokeStyle = theme.primary;
        ctx.lineWidth = 1.8;

        const pCrankStart = project({ x: 0, y: -0.3, z: -1.1 });
        const pCrankEnd = project({ x: 0, y: -0.3, z: 1.1 });
        ctx.beginPath();
        ctx.moveTo(pCrankStart.x, pCrankStart.y);
        ctx.lineTo(pCrankEnd.x, pCrankEnd.y);
        ctx.stroke();

        for (let i = 0; i < 6; i++) {
          const cz = zStations[i];
          const cPhase = phases[i];
          const pinX = r * Math.sin(theta + cPhase);
          const pinY = -0.3 + r * Math.cos(theta + cPhase);
          const pistonY = pinY + Math.sqrt(L * L - pinX * pinX);

          const ptCrankCenter = project({ x: 0, y: -0.3, z: cz });
          const ptCrankPin = project({ x: pinX, y: pinY, z: cz });
          const ptPistonPin = project({ x: 0, y: pistonY, z: cz });

          ctx.strokeStyle = theme.secondary;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(ptCrankCenter.x, ptCrankCenter.y);
          ctx.lineTo(ptCrankPin.x, ptCrankPin.y);
          ctx.stroke();

          ctx.strokeStyle = theme.primary;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(ptCrankPin.x, ptCrankPin.y);
          ctx.lineTo(ptPistonPin.x, ptPistonPin.y);
          ctx.stroke();

          const pw = 0.16; 
          const ph = 0.08; 
          const ptP1 = project({ x: -pw, y: pistonY, z: cz });
          const ptP2 = project({ x: pw, y: pistonY, z: cz });
          const ptP3 = project({ x: pw, y: pistonY + ph, z: cz });
          const ptP4 = project({ x: -pw, y: pistonY + ph, z: cz });

          ctx.fillStyle = theme.bg;
          ctx.beginPath();
          ctx.moveTo(ptP1.x, ptP1.y);
          ctx.lineTo(ptP2.x, ptP2.y);
          ctx.lineTo(ptP3.x, ptP3.y);
          ctx.lineTo(ptP4.x, ptP4.y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.strokeStyle = isHeritage ? "rgba(100, 255, 218, 0.15)" : "rgba(28, 105, 212, 0.15)";
          ctx.lineWidth = 1.0;
          const wallLeftStart = project({ x: -pw - 0.02, y: -0.1, z: cz });
          const wallLeftEnd = project({ x: -pw - 0.02, y: 0.7, z: cz });
          const wallRightStart = project({ x: pw + 0.02, y: -0.1, z: cz });
          const wallRightEnd = project({ x: pw + 0.02, y: 0.7, z: cz });

          ctx.beginPath();
          ctx.moveTo(wallLeftStart.x, wallLeftStart.y);
          ctx.lineTo(wallLeftEnd.x, wallLeftEnd.y);
          ctx.moveTo(wallRightStart.x, wallRightStart.y);
          ctx.lineTo(wallRightEnd.x, wallRightEnd.y);
          ctx.stroke();
        }

        ctx.strokeStyle = theme.secondary;
        ctx.lineWidth = 1.0;
        const corners = [
          { x: -0.25, y: -0.3, z: -1.1 },
          { x: 0.25, y: -0.3, z: -1.1 },
          { x: 0.25, y: 0.7, z: -1.1 },
          { x: -0.25, y: 0.7, z: -1.1 },
          { x: -0.25, y: -0.3, z: 1.1 },
          { x: 0.25, y: -0.3, z: 1.1 },
          { x: 0.25, y: 0.7, z: 1.1 },
          { x: -0.25, y: 0.7, z: 1.1 },
        ];
        const projCorners = corners.map(project);
        const boxEdges = [
          [0, 1], [1, 2], [2, 3], [3, 0], 
          [4, 5], [5, 6], [6, 7], [7, 4], 
          [0, 4], [1, 5], [2, 6], [3, 7], 
        ];
        boxEdges.forEach(([u, v]) => {
          ctx.beginPath();
          ctx.moveTo(projCorners[u].x, projCorners[u].y);
          ctx.lineTo(projCorners[v].x, projCorners[v].y);
          ctx.stroke();
        });

      } else {
        const projectedVertices = vertices.map(project);

        ctx.strokeStyle = theme.primary;
        ctx.lineWidth = 1.5;
        edges.forEach(([u, v]) => {
          const p1 = projectedVertices[u];
          const p2 = projectedVertices[v];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        wheelAngleRef.current += speedFactor * 3.0;
        const wheelAngle = wheelAngleRef.current;
        const wheelRadius = 0.28;

        ctx.strokeStyle = theme.primary;
        ctx.lineWidth = 1.2;

        wheelCenters.forEach((center) => {
          const segments = 16;
          for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const ly = wheelRadius * Math.sin(theta);
            const lz = wheelRadius * Math.cos(theta);
            const pt = project({ x: center.x, y: center.y + ly, z: center.z + lz });

            if (i === 0) {
              ctx.beginPath();
              ctx.moveTo(pt.x, pt.y);
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          }
          ctx.stroke();

          const spokeCount = 6;
          for (let i = 0; i < spokeCount; i++) {
            const theta = (i / spokeCount) * Math.PI * 2 + wheelAngle;
            const ly = wheelRadius * Math.sin(theta);
            const lz = wheelRadius * Math.cos(theta);
            const outerPt = project({ x: center.x, y: center.y + ly, z: center.z + lz });
            const centerPt = project(center);

            ctx.beginPath();
            ctx.moveTo(centerPt.x, centerPt.y);
            ctx.lineTo(outerPt.x, outerPt.y);
            ctx.stroke();
          }
        });
      }

      hotspots.forEach((spot) => {
        const pt = project(spot);
        const pulse = 1 + Math.sin(time * 0.005) * 0.15;
        const baseRadius = 6;
        const isHovered = activeHotspot === spot.id;

        ctx.fillStyle = isHovered ? "#E7222E" : theme.primary;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, baseRadius * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = isHovered ? "rgba(231, 34, 46, 0.4)" : theme.secondary;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, baseRadius * 2.2 * pulse, 0, Math.PI * 2);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [rotation, driveMode, activeHotspot, car, evSpeed, evTemp, mRpm, engineStarted, id, isElectric, isMPower, isHeritage, isNeueKlasse, theme]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (isDragging.current) {
      const deltaX = e.clientX - prevMouse.current.x;
      const deltaY = e.clientY - prevMouse.current.y;

      setRotation((prev) => ({
        x: Math.max(-Math.PI / 3, Math.min(Math.PI / 3, prev.x - deltaY * 0.01)),
        y: prev.y + deltaX * 0.01,
      }));

      prevMouse.current = { x: e.clientX, y: e.clientY };
    } else {
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;

      const angleY = rotation.y; 
      const angleX = rotation.x;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const getHotspots = () => {
        if (id === "1916") {
          return [
            { id: "carburetor", x: 0.3, y: 0.2, z: 0.0 },
            { id: "pistons", x: 0, y: 0.5, z: -0.4 },
            { id: "crankshaft", x: 0, y: -0.3, z: 0.4 },
          ];
        }
        return [
          { id: "engine", x: 0, y: 0.0, z: -1.3 },
          { id: "gearbox", x: 0, y: -0.1, z: -0.3 },
          { id: "suspension", x: 0, y: 0.15, z: 0.6 },
          { id: "xdrive", x: 0, y: -0.1, z: 1.3 },
        ];
      };

      const hotspots = getHotspots();

      let found: string | null = null;
      for (const spot of hotspots) {
        const y1 = spot.y * cosX - spot.z * sinX;
        const z1 = spot.y * sinX + spot.z * cosX;
        const x2 = spot.x * cosY + z1 * sinY;
        const z2 = -spot.x * sinY + z1 * cosY;

        const fov = 350;
        const scale = fov / (fov + z2);
        const zoom = 90;
        const hx = cx + x2 * scale * zoom;
        const hy = cy - y1 * scale * zoom;

        const distSq = (mx - hx) ** 2 + (my - hy) ** 2;
        if (distSq < 15 * 15) {
          found = spot.id;
          break;
        }
      }
      setActiveHotspot(found);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDragging.current && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - prevMouse.current.x;
      const deltaY = e.touches[0].clientY - prevMouse.current.y;

      setRotation((prev) => ({
        x: Math.max(-Math.PI / 3, Math.min(Math.PI / 3, prev.x - deltaY * 0.01)),
        y: prev.y + deltaX * 0.01,
      }));

      prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const modeSpecs = {
    comfort: { damping: "35%", torque: "40:60", steering: "Comfort Light", stability: "DSC Active", roll: "Adaptive Comfort" },
    sport: { damping: "72%", torque: "20:80", steering: "M Dynamic Sport", stability: "DTC Dynamic Sport", roll: "Active Stabilization" },
    sportPlus: { damping: "96%", torque: "10:90 (Rear Biased)", steering: "M Direct Track", stability: "DSC OFF (Expert)", roll: "Anti-Roll Locked" },
  };

  const engineHotspotTexts = {
    carburetor: { name: "Altitude-Compensating Carburetor", desc: "Max Friz's landmark innovation. Automatically adjusts air-fuel mixture to maintain horsepower in thin high-altitude air." },
    pistons: { name: "High-Compression Pistons", desc: "Forged alloy pistons operating at high cylinder compression, maximizing thermal output." },
    crankshaft: { name: "Balanced Crankshaft", desc: "Bespoke straight-six counterweighted crankshaft designed to eliminate secondary vibrational harmonics." },
  };

  const carHotspotTexts = {
    engine: { name: "TwinPower Turbo Engine", desc: `${car?.specs?.find((s: any) => s.name.includes("Power"))?.value || "Dynamic Power"} core featuring high-pressure direct injection and variable valve control.` },
    gearbox: { name: "8-Speed Steptronic Sport Transmission", desc: "Ultra-fast gear shifts with launch control, mapped directly to chassis dyno dynamics." },
    suspension: { name: "Adaptive M Suspension Dampers", desc: "Electronically controlled dampers that adjust active stiffness and damping rate in milliseconds." },
    xdrive: { name: "xDrive Intelligent AWD & Differential", desc: "Rear-biased active torque vectoring differential for optimal speed and maximum curve grip." },
  };

  const hotspotTexts: Record<string, { name: string; desc: string }> = id === "1916" ? engineHotspotTexts : carHotspotTexts;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: theme.primary, letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
        {isHeritage ? "HERITAGE LABORATORY & VINTAGE BLUEPRINTS" : 
         isElectric ? "eDRIVE TELEMETRY & RANGE SIMULATION" :
         isMPower ? "M POWER DYNO & ENGINE SYNTHESIZER" :
         isNeueKlasse ? "NEUE KLASSE PANORAMIC HUD PROJECTION" :
         "CHASSIS VECTOR VISUALIZER & DYNAMIC TUNING"}
      </span>

      <div style={{ position: "relative", width: "100%", height: "240px", backgroundColor: theme.bg, border: `1px solid ${theme.secondary}`, overflow: "hidden", marginBottom: "16px" }}>
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{ width: "100%", height: "100%", display: "block", cursor: isDragging.current ? "grabbing" : "grab" }}
        />
        <div style={{ position: "absolute", bottom: "10px", right: "10px", pointerEvents: "none" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "8px", color: theme.primary, opacity: 0.5, letterSpacing: "0.05em" }}>
            DRAG TO ROTATE
          </span>
        </div>

        {activeHotspot && hotspotTexts[activeHotspot] && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              right: "10px",
              backgroundColor: "rgba(12,13,18,0.95)",
              borderLeft: `2px solid ${theme.primary}`,
              padding: "10px 14px",
              color: "#FFFFFF",
              pointerEvents: "none",
              zIndex: 20,
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            <span style={{ fontSize: "9px", color: theme.primary, fontWeight: 700, display: "block", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              ACTIVE HOTSPOT: {activeHotspot}
            </span>
            <span style={{ fontSize: "12px", fontWeight: 700, display: "block", marginTop: "2px" }}>
              {hotspotTexts[activeHotspot].name}
            </span>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", margin: "4px 0 0 0", lineHeight: "1.4" }}>
              {hotspotTexts[activeHotspot].desc}
            </p>
          </div>
        )}
      </div>

      {isNeueKlasse && (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: theme.primary, letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            Windshield HUD Simulator
          </span>

          <div
            style={{
              position: "relative",
              width: "100%",
              height: "140px",
              backgroundColor: "#0C0D12",
              border: "1px solid #1F2937",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "16px",
              overflow: "hidden",
              marginBottom: "16px",
            }}
          >
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45px", background: "rgba(28, 105, 212, 0.08)", borderTop: "1px dashed rgba(255, 255, 255, 0.2)" }} />

            <AnimatePresence mode="wait">
              {hudMode === "sport" && (
                <motion.div key="sport" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ zIndex: 10, display: "flex", justifyContent: "space-between", width: "100%", color: "#FFFFFF" }}>
                  <div>
                    <span style={{ fontSize: "9px", color: "#E7222E", fontWeight: 700, display: "block" }}>SPORT PROFILE</span>
                    <span style={{ fontSize: "32px", fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic" }}>248 <span style={{ fontSize: "12px", fontStyle: "normal" }}>km/h</span></span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "9px", color: "#9CA3AF", display: "block" }}>ACTIVE GEAR</span>
                    <span style={{ fontSize: "24px", color: "var(--primary-blue)", fontWeight: 800 }}>M4</span>
                  </div>
                </motion.div>
              )}

              {hudMode === "efficient" && (
                <motion.div key="efficient" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ zIndex: 10, display: "flex", justifyContent: "space-between", width: "100%", color: "#FFFFFF" }}>
                  <div>
                    <span style={{ fontSize: "9px", color: "#10B981", fontWeight: 700, display: "block" }}>EFFICIENT E-DRIVE</span>
                    <span style={{ fontSize: "32px", fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic" }}>82 <span style={{ fontSize: "12px", fontStyle: "normal" }}>km/h</span></span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "9px", color: "#9CA3AF", display: "block" }}>BATTERY CELL</span>
                    <span style={{ fontSize: "18px", color: "#10B981", fontWeight: 700 }}>89% Range Optimal</span>
                  </div>
                </motion.div>
              )}

              {hudMode === "navigation" && (
                <motion.div key="navigation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ zIndex: 10, display: "flex", justifyContent: "space-between", width: "100%", color: "#FFFFFF" }}>
                  <div>
                    <span style={{ fontSize: "9px", color: "var(--primary-blue)", fontWeight: 700, display: "block" }}>GUIDED NAV FOCUS</span>
                    <span style={{ fontSize: "13px", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(45deg)", flexShrink: 0 }}>
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                      </svg>
                      Exit 12 in 200m (Munich Nord)
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "9px", color: "#9CA3AF", display: "block" }}>LANE ASSIST</span>
                    <span style={{ fontSize: "13px", color: "var(--primary-blue)", fontWeight: 600 }}>ACTIVE</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { id: "sport", label: "SPORT PROFILE" },
              { id: "efficient", label: "E-DRIVE ECO" },
              { id: "navigation", label: "NAV FOCUS" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setHudMode(btn.id as any)}
                style={{
                  flex: 1,
                  height: "32px",
                  backgroundColor: hudMode === btn.id ? "var(--text-dark)" : "transparent",
                  color: hudMode === btn.id ? "#FFFFFF" : "var(--text-dark)",
                  border: "1px solid var(--text-dark)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "9px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {isElectric && !isNeueKlasse && (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div
            style={{
              backgroundColor: theme.bg,
              border: `1px solid ${theme.secondary}`,
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: theme.primary, letterSpacing: "0.1em", textTransform: "uppercase", display: "block" }}>
                PROJECTED EV RANGE
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#FFFFFF", lineHeight: "1.1" }}>
                {calculateSimulatedRange()} <span style={{ fontSize: "16px", fontWeight: 500, color: theme.primary }}>km</span>
              </span>
            </div>

            <svg width="60" height="32" viewBox="0 0 60 32">
              <rect x="2" y="2" width="50" height="28" rx="4" fill="none" stroke={theme.primary} strokeWidth="2.5" />
              <rect x="54" y="10" width="4" height="12" rx="2" fill={theme.primary} />
              <motion.rect
                x="6"
                y="6"
                width="42"
                height="20"
                rx="2"
                fill={theme.primary}
                initial={{ scaleX: 0.8 }}
                animate={{ scaleX: calculateSimulatedRange() / 600 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </svg>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "var(--text-dark)" }}>Cruising Speed</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: theme.primary, fontWeight: 700 }}>{evSpeed} km/h</span>
            </div>
            <input
              type="range"
              min="80"
              max="160"
              value={evSpeed}
              onChange={(e) => setEvSpeed(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: theme.primary, cursor: "pointer" }}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "var(--text-dark)" }}>Outside Temperature</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: theme.primary, fontWeight: 700 }}>{evTemp}°C</span>
            </div>
            <input
              type="range"
              min="-10"
              max="40"
              value={evTemp}
              onChange={(e) => setEvTemp(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: theme.primary, cursor: "pointer" }}
            />
          </div>
        </div>
      )}

      {isMPower && (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div
            style={{
              backgroundColor: theme.bg,
              padding: "20px",
              border: `1px solid ${theme.secondary}`,
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, color: theme.primary, letterSpacing: "0.1em", display: "block" }}>
                M POWER DYNO TELEMETRY
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#FFFFFF", fontStyle: "italic", marginTop: "4px", display: "block" }}>
                {engineStarted ? mRpm : 0} <span style={{ fontSize: "13px", fontStyle: "normal", color: "#9CA3AF" }}>RPM</span>
              </span>
            </div>

            <button
              onClick={engineStarted ? stopEngine : startEngine}
              style={{
                backgroundColor: engineStarted ? theme.primary : "var(--primary-blue)",
                color: "#FFFFFF",
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                padding: "10px 20px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {engineStarted ? "STOP MOTOR" : "IGNITION START"}
            </button>
          </div>

          <div style={{ opacity: engineStarted ? 1 : 0.4, transition: "opacity 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "var(--text-dark)" }}>Engine Rev Sweep</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: theme.primary, fontWeight: 700 }}>{mRpm} RPM</span>
            </div>
            <input
              type="range"
              min="1000"
              max="7800"
              disabled={!engineStarted}
              value={mRpm}
              onChange={(e) => handleRpmChange(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: engineStarted ? theme.primary : "var(--text-muted)", cursor: engineStarted ? "pointer" : "not-allowed" }}
            />
          </div>
        </div>
      )}

      {isHeritage && (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
            {[
              { id: "engine", label: "01 / ENGINE" },
              { id: "chassis", label: "02 / CHASSIS" },
              { id: "aero", label: "03 / AERODYNAMICS" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setBlueprintFilter(btn.id as any)}
                style={{
                  flex: 1,
                  height: "32px",
                  backgroundColor: blueprintFilter === btn.id ? theme.primary : "transparent",
                  color: blueprintFilter === btn.id ? "#0B192E" : theme.primary,
                  border: `1px solid ${theme.primary}`,
                  fontFamily: "var(--font-sans)",
                  fontSize: "9px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div
            style={{
              backgroundColor: "#0B192E",
              color: "#8892B0",
              border: "1px dashed rgba(100, 255, 218, 0.3)",
              padding: "20px",
              fontFamily: "monospace",
              fontSize: "12px",
              lineHeight: "1.6",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <span style={{ color: theme.primary, fontWeight: 700 }}>[CLASSIFIED ARCHIVE BLUEPRINT]</span>
            {blueprintFilter === "engine" && (
              <>
                <div>&gt; CONFIGURATION: {car.specs[0]?.value || "Mechanical Block Spec"}</div>
                <div>&gt; DISPLACEMENT: {car.specs[2]?.value || "Historical Displ."}</div>
                <div>&gt; POWER FEED: {car.specs[3]?.value || "Mechanical Aspiration"}</div>
                <div>&gt; CRANKSHAFT BEARING: REINFORCED SLIDER JOURNALS</div>
              </>
            )}
            {blueprintFilter === "chassis" && (
              <>
                <div>&gt; DRY WEIGHT: {car.specs[4]?.value || "Space frame lightweight"}</div>
                <div>&gt; CHASSIS FRAME: SPACED TUBULAR STRUCTURE</div>
                <div>&gt; SUSPENSION: LEAF SPRINGS WITH TELESCOPIC REBOUND</div>
                <div>&gt; BRAKE SYNC: CAB CABLE SYMMETRICAL ACTUATION</div>
              </>
            )}
            {blueprintFilter === "aero" && (
              <>
                <div>&gt; AERODYNAMICS: {car.specs[5]?.value || "Aerodynamic Classic Shell"}</div>
                <div>&gt; WING CONFIG: CONTOURED INTEGRATED ARCH</div>
                <div>&gt; VENTILATION: DOUBLE AIR VENT SLOTS FRONT</div>
                <div>&gt; DRAG COEFFICIENT: CALIBRATED EDITORIAL ARCHIVE</div>
              </>
            )}
          </div>
        </div>
      )}

      {!isNeueKlasse && !isElectric && !isMPower && !isHeritage && (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
            {[
              { id: "comfort", label: "COMFORT" },
              { id: "sport", label: "SPORT" },
              { id: "sportPlus", label: "SPORT PLUS" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setDriveMode(btn.id as any)}
                style={{
                  flex: 1,
                  height: "32px",
                  backgroundColor: driveMode === btn.id ? "var(--primary-blue)" : "transparent",
                  color: driveMode === btn.id ? "#FFFFFF" : "var(--text-dark)",
                  border: "1px solid var(--primary-blue)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "9px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div
            style={{
              backgroundColor: "#F9FAFB",
              border: "1px solid #F3F4F6",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
              TELEMETRY DIALECTICS
            </span>
            {[
              { label: "DAMPER STIFFNESS", value: modeSpecs[driveMode].damping },
              { label: "TORQUE DISTRIBUTION (F:R)", value: modeSpecs[driveMode].torque },
              { label: "STEERING CALIBRATION", value: modeSpecs[driveMode].steering },
              { label: "DYNAMIC STABILITY (DSC)", value: modeSpecs[driveMode].stability },
              { label: "ACTIVE ROLL CONTROL", value: modeSpecs[driveMode].roll },
            ].map((stat, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", borderBottom: idx < 4 ? "1px solid #F3F4F6" : "none", paddingBottom: idx < 4 ? "6px" : "0", paddingTop: idx > 0 ? "2px" : "0" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-muted)", fontWeight: 600 }}>{stat.label}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-dark)", fontWeight: 700 }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [fromCategory, setFromCategory] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setFromCategory(searchParams.get("fromCategory"));
    }
  }, []);
  
  // Tabs config
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "lab">("overview");
  
  // Safeguard ID parsing
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId || "";
  let car = CAR_DATABASE[id.toLowerCase()];

  // Dynamic lookup in primary catalog if not hardcoded in CAR_DATABASE
  let bmwModel = BMW_MODELS.find((m) => m.id.toLowerCase() === id.toLowerCase());
  
  if (!car && bmwModel) {
    car = {
      title: bmwModel.name,
      category: `${bmwModel.category.toUpperCase()} SERIES  ·  ${bmwModel.series}`,
      description: bmwModel.tagline,
      story: `Engineered to deliver exceptional performance and style, the ${bmwModel.name} is a testament to BMW's legacy of driving dynamics. Designed with a perfect balance of luxury and athletic responsiveness, it features advanced power delivery, precise handling, and a sophisticated driver-centric cockpit that keeps you connected to the road at all times.`,
      images: [
        bmwModel.image,
        bmwModel.image,
      ],
      specs: [
        { name: "Series", value: bmwModel.series },
        { name: "Power Output", value: bmwModel.power },
        { name: "Acceleration (0-100 km/h)", value: bmwModel.acceleration },
        { name: "Starting Price", value: bmwModel.priceFrom },
        { name: "Engine / Drivetrain", value: bmwModel.engine },
        { name: "Vehicle Category", value: bmwModel.category.toUpperCase() },
      ],
    };
  }

  // Return to home if invalid ID
  if (!car) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
          fontFamily: "var(--font-sans)",
        }}
      >
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", marginBottom: "16px" }}>
          Vehicle Not Found
        </h1>
        <Link href="/" style={{ color: "var(--primary-blue)", fontSize: "14px", textDecoration: "none" }}>
          ← RETURN TO HOME JOURNAL
        </Link>
      </div>
    );
  }

  const isNeueKlasse = id.toLowerCase() === "2026";
  const isElectric = bmwModel?.category === "electric" || id.toLowerCase().startsWith("i") || id.toLowerCase() === "2014";
  const isMPower = bmwModel?.category === "m" || id.toLowerCase().startsWith("m") || id.toLowerCase() === "xm";
  const isHeritage = id.toLowerCase() === "1916" || id.toLowerCase() === "1936" || id.toLowerCase() === "1972" || id.toLowerCase() === "1986";

  // Dynamically select the displayed image based on active tab
  // Only cross-fade to secondary images for heritage, concept, and M Power models that are explicitly defined in the curated database
  const hasSpecificSecondImage = (isHeritage || isNeueKlasse || isMPower || id.toLowerCase() === "2014") && (id.toLowerCase() in CAR_DATABASE);
  const activeImage = (activeTab === "specs" || activeTab === "lab") && hasSpecificSecondImage && car.images[1]
    ? car.images[1]
    : car.images[0];

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        paddingTop: "72px",
      }}
    >
      {/* Custom scrollbar styles live in globals.css */}
      <Navigation />

      {/* Main Split Layout */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Left Side: Premium Editorial Panel */}
        <div
          style={{
            flex: 1,
            minWidth: "40%",
            height: "100%",
            padding: "32px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {/* Header Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <button
              onClick={() => {
                if (fromCategory) {
                  router.push(`/models?category=${fromCategory}`);
                } else {
                  router.back();
                }
              }}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "var(--text-dark)",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary-blue)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dark)")}
            >
              ← GO BACK
            </button>

            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--primary-blue)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {car.category.split("·")[0].trim()}
            </span>
          </div>

          {/* Main Title & Descriptive Head */}
          <div style={{ marginBottom: "20px" }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "44px",
                fontWeight: 300,
                color: "var(--text-dark)",
                lineHeight: "1.1",
                marginBottom: "12px",
              }}
            >
              {car.title}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 500,
                color: "var(--primary-blue)",
                lineHeight: "1.4",
                margin: 0,
              }}
            >
              {car.description}
            </p>
          </div>

          {/* ELEGANT 3-TAB EDITORIAL MENU */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #E5E7EB",
              marginBottom: "24px",
            }}
          >
            {[
              { id: "overview", label: "01 / OVERVIEW" },
              { id: "specs", label: "02 / SPECIFICATIONS" },
              { id: "lab", label: "03 / INTERACTIVE LAB" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: activeTab === tab.id ? "2px solid var(--primary-blue)" : "2px solid transparent",
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: activeTab === tab.id ? "var(--primary-blue)" : "var(--text-muted)",
                  letterSpacing: "0.1em",
                  padding: "12px 24px 12px 0",
                  marginRight: "16px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENTS */}
          <div
            className="custom-scrollbar"
            style={{
              flexGrow: 1,
              overflowY: "auto",
              paddingRight: "8px",
              marginBottom: "20px",
            }}
          >
            <AnimatePresence mode="wait">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "15px",
                      color: "#374151",
                      lineHeight: "1.8",
                      marginBottom: "24px",
                    }}
                  >
                    {car.story}
                  </p>

                  <div
                    style={{
                      borderLeft: "3px solid var(--primary-blue)",
                      paddingLeft: "20px",
                      marginTop: "32px",
                      fontStyle: "italic",
                      fontFamily: "var(--font-display)",
                      fontSize: "20px",
                      color: "var(--text-dark)",
                      lineHeight: "1.6",
                    }}
                  >
                    "Every mechanical balance, aerodynamic profile, and calibrated telemetry sync is engineered to deliver authentic Sheer Driving Pleasure."
                  </div>
                </motion.div>
              )}

              {/* TAB 2: SPECIFICATIONS */}
              {activeTab === "specs" && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  style={{ width: "100%" }}
                >
                  {/* Floating Highlight Metric Cards */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                      marginBottom: "32px",
                    }}
                  >
                    {car.specs.slice(0, 4).map((spec, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: "#F9FAFB",
                          border: "1px solid #F3F4F6",
                          padding: "16px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, color: "var(--primary-blue)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          {spec.name}
                        </span>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 600, color: "var(--text-dark)", marginTop: "4px" }}>
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Standard Detailed Specs list */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {car.specs.slice(2).map((spec, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "14px 0",
                          borderBottom: "1px solid #F3F4F6",
                        }}
                      >
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "var(--text-dark)" }}>
                          {spec.name}
                        </span>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--text-muted)" }}>
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: DYNAMIC INTERACTIVE SYSTEMS */}
              {activeTab === "lab" && (
                <motion.div
                  key="lab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  style={{ width: "100%" }}
                >
                  <InteractiveChassisLab
                    car={car}
                    id={id}
                    isElectric={isElectric}
                    isMPower={isMPower}
                    isHeritage={isHeritage}
                    isNeueKlasse={isNeueKlasse}
                  />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Footer stats row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #E5E7EB",
              paddingTop: "20px",
              marginTop: "0px",
            }}
          >
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-muted)", display: "block" }}>
                POWER OUTPUT
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "var(--text-dark)" }}>
                {car.specs.find((s) => s.name.includes("Power"))?.value || "N/A"}
              </span>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-muted)", display: "block" }}>
                ACCELERATION
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "var(--text-dark)" }}>
                {car.specs.find((s) => s.name.includes("Acceleration"))?.value || car.specs.find((s) => s.name.includes("0–100"))?.value || "N/A"}
              </span>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-muted)", display: "block" }}>
                STARTING PRICE
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: "var(--text-dark)" }}>
                {car.specs.find((s) => s.name.includes("Price"))?.value || car.specs.find((s) => s.name.includes("Starting"))?.value || "Included"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Gorgeous Widescreen Photographic Layer */}
        <div
          style={{
            width: "38rem",
            minWidth: "30%",
            maxWidth: "60%",
            height: "100%",
            position: "relative",
            backgroundColor: isMPower || isNeueKlasse ? "#0C0D12" : "#F3F4F6",
            overflow: "hidden",
            transition: "width 0.3s ease",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={`${activeImage}?v=1.1`}
              alt={car.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
              }}
            />
          </AnimatePresence>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(12,13,18,0.4) 0%, rgba(12,13,18,0) 40%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
