import type { Metadata } from "next";
import "./globals.css";
import { comfortaa } from "./ui/fonts";

export const metadata: Metadata = {
  title: "Johannes Bernet | Full-Stack Software Developer",
  description:
    "I'm a full-stack software developer based in Freiburg, Germany.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={comfortaa.className}>{children}</body>
    </html>
  );
}
