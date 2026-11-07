import type { Metadata } from "next";
import { restaurant } from "./restaurant";
import "./globals.css";

export const metadata: Metadata = {
  title: `${restaurant.name} · Sushi & Asian Kitchen in Porto`,
  description: restaurant.heroLine,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
