import { ThemeProvider } from "next-themes";
import Navbar from "./../components/Navbar";
import "./globals.css";

import Footer from "./../components/Footer";


export const metadata = {
  title: "Your App",
  description: "Next.js App with Dark Mode",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
       
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}

          <Footer/>

        </ThemeProvider>

      </body>
    </html>
  );
}
