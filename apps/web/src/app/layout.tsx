import type { Metadata } from "next";
import "./globals.css";

import { getConfiguredLocale, getMessages } from "@/lib/i18n/messages";

const locale = getConfiguredLocale();
const messages = getMessages(locale);

export const metadata: Metadata = messages.metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
