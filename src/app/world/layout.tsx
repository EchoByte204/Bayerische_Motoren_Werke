import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMW World — BMW Welt, Museum & Classic",
  description: "Discover the world of BMW. Visit BMW Welt in Munich, the BMW Museum, and BMW Classic. Explore Individual Manufaktur colours and worldwide driving experiences.",
};

export default function WorldLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
