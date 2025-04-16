"use client";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { TextEffectWithPreset } from "./../components/TextEffect";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();

  const logoSrc =
    theme === "dark"
      ? "https://res.cloudinary.com/ddztecdya/image/upload/v1739845925/zjzj0ytpqzkbplrgiams.png"
      : "https://res.cloudinary.com/ddztecdya/image/upload/v1739845925/jrzjovv25dgvbdaywc5p.png";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              <Image
                width={120}
                height={90}
                className="w-full h-full object-cover"
                src={logoSrc}
                alt="TechTrio Logo"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            {["Home", "About", "Services", "Contact"].map((item) => {

              const linkPath = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = pathname === linkPath;

              return (
                <Link
                  key={item}
                  href={linkPath}
                  className={`transition-colors ${
                    isActive
                      ? "text-yellow-500 font-bold text-lg underline"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  }`}
                >
                  <TextEffectWithPreset>{item}</TextEffectWithPreset>
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-50 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["Home", "About", "Contact", "Services"].map((item) => {
              const linkPath = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = pathname === linkPath;

              return (
                <Link
                  key={item}
                  href={linkPath}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "text-yellow-500 font-bold text-lg underline"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <TextEffectWithPreset>{item}</TextEffectWithPreset>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );

}
