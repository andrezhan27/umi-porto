import type { Metadata } from "next";
import { LanguageProvider } from "../components/language";
import { copy, defaultLocale, languages } from "./copy";
import "./globals.css";

export const metadata: Metadata = {
  title: copy[defaultLocale].pageTitle,
  description: copy[defaultLocale].footerTagline,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang={languages[defaultLocale].tag}><body><LanguageProvider>{children}</LanguageProvider></body></html>;
}
