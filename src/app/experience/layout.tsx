import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMW Driving Experience — Nürburgring Lap Times & Track Days",
  description: "Live the BMW Driving Experience. Nürburgring lap records, M school track days, the interactive lap timer, and drift video from the world's most challenging circuit.",
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
