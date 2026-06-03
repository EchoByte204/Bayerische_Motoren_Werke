import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMW Motorsport Heritage — F1, DTM, Le Mans & Nürburgring",
  description: "Discover BMW's motorsport legacy spanning Formula 1, DTM championships, Le Mans victories, and Nürburgring records. Art Cars, racing icons, and podium glory.",
};

export default function MotorsportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
