import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inovazi",
  description: "Start up nya gen z",
  icons: {
    icon: "/images/inovazi.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
