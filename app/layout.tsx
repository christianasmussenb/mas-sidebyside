import type { Metadata } from "next";
import { Manrope, PT_Serif } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Arquitectura Side by Side Salud",
  description:
    "Sitio explicativo de la arquitectura side-by-side para prestadores de salud con ECC + IS-H, S/4HANA, TrakCare e InterSystems IRIS / Health Connect.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${ptSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
