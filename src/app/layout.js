// app/layout.js
import { ThemeProvider } from "next-themes";
import "./globals.css";
import ClientLayout from "../components/ClientLayout"; // no dynamic import here

export const metadata = {
  title: "TechTrio - Smart Parking, Invoicing & Tracking SaaS",
  description:
    "TechTrio offers SaaS solutions including Smart Parking Systems, Invoice Management, and Vehicle Tracking. Revolutionize urban mobility and business automation with our innovative technologies.",
  keywords:
    "TechTrio, SaaS, Smart Parking, Parking Solutions, Parking Management, Invoice System, Invoice Management Software, Vehicle Tracking, GPS Tracking, Fleet Management, Parking App, Automation, Tech Company, Smart City Solutions",
  openGraph: {
    title: "TechTrio - Smart Parking Solutions & Automation SaaS",
    description:
      "TechTrio is revolutionizing urban parking and automation with Smart Parking Systems, Invoice Management, and Vehicle Tracking solutions. Explore our cutting-edge SaaS technology today.",
    url: "https://www.techtrio.net",
    type: "website",
    siteName: "TechTrio",
  },
  authors: [{ name: "TechTrio Automation", url: "https://www.techtrio.net" }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/assets/images/logo/favicon.ico",
  },
  metadataBase: new URL("https://www.techtrio.net"),
  viewport: "width=device-width, initial-scale=1.0",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}