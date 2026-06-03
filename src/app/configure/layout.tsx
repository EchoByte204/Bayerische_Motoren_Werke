import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMW Configurator — Build Your Perfect BMW",
  description: "Configure your ideal BMW online. Choose from M2, M3, M4, M5, i4 M50, and XM Label. Select exterior colour, interior trim, and wheels with live pricing.",
};

export default function ConfigureLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
