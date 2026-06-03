import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMW Gallery — Editorial Photography Collection",
  description: "A curated archive of BMW photography spanning 110 years. Heritage classics, M Performance machines, electric models, and motorsport icons.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
