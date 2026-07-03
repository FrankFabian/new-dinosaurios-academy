import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dinosaurios Academy",
  description: "Panel operativo interno para Dinosaurios Academy"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
