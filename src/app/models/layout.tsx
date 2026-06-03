import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMW Models — Complete Lineup 2024",
  description: "Browse the complete BMW model range. From the M2 Coupé to the XM Label, the i4 to the 7 Series. Filter by category and explore every model in detail.",
};

export default function ModelsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
