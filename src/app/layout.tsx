import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgriConnect – Freedom to Grow | Smart Farming for India",
  description:
    "AgriConnect empowers Indian farmers with AI-driven crop recommendations, weather insights, market prices, and smart irrigation guidance. Smarter farming. Stronger India.",
  keywords: [
    "agriculture",
    "farming",
    "India",
    "AgriConnect",
    "AI farming",
    "crop recommendation",
    "weather",
    "irrigation",
    "market prices",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#FAFBF8] text-gray-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
