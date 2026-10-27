import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const outfit = localFont({
  src: "./fonts/outfit-latin.woff2",
  weight: "300 600",
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Wellness Wallet — Your money moves when you do",
  description:
    "Turn your own money into motivation. Set money aside, choose your activity goals and access your money as you make progress. Verified by Apple, Fitbit or Strava.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}
