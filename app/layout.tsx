import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GNB from "@/components/GNB";
import Title from "@/components/Title";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { PlayerWrapper } from "@/components/PlayerWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prote",
  description: "Where melodies mess with your heart.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full pb-16`}
        style={{
          backgroundImage: "url('/BG.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
      >
        <PlayerProvider>
          <Title />
          {children}
          <GNB />
          <PlayerWrapper />
        </PlayerProvider>
      </body>
    </html>
  );
}
