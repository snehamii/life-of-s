import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sneha Mishra — AI/ML Engineer",
  description: "Portfolio of Sneha Mishra, AI&ML Engineer, Data Analyst, and Builder.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
