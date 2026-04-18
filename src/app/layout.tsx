import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ali — Santri & Developer",
  description: "11th Grade SMK RPL & Santri Tahfidz. Architecting code, preserving Qur'an.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${jakarta.variable} antialiased`}
        suppressHydrationWarning
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
