import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMW Electric Models — i4, i5, i7, iX & Neue Klasse",
  description: "Explore BMW's full electric lineup from the i4 Gran Coupé to the flagship i7 and iX. eDrive technology, range, charging speeds, and M Performance variants.",
};

export default function ElectricLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
