import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Designed by Mayank",
  description: "Brand designer & Visual storyteller portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
