"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, LogOut, Menu, X, LayoutDashboard, Users, FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation"; // ✅ Get active route
import Link from "next/link";

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // ✅ Get current route

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Logout Function (Replace with actual logout logic)
  const handleLogout = () => {
    alert("Logging out..."); // Replace with actual logout logic
  };

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <motion.aside
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: isOpen ? 0 : -200, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className={`fixed h-screen bg-white dark:bg-gray-900 shadow-lg w-64 p-5 transition-all z-50 ${isOpen ? "block" : "hidden"} md:block`}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <button className="md:hidden text-gray-700 dark:text-white" onClick={() => setIsOpen(false)}>
              <X size={28} />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="space-y-4">
            <SidebarItem href="/admin/dashboard" icon={<LayoutDashboard size={20} />} text="Dashboard" active={pathname === "/admin/dashboard"} />
            <SidebarItem href="/admin/users" icon={<Users size={20} />} text="Manage Users" active={pathname === "/admin/users"} />
            <SidebarItem href="/admin/reports" icon={<FileText size={20} />} text="Reports" active={pathname === "/admin/reports"} />
          </nav>

          {/* Logout Button (Desktop) */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 mt-10 w-full rounded-md bg-red-500 text-white hover:bg-red-600 transition-all"
          >
            <LogOut size={20} /> Logout
          </button>
        </motion.aside>
      )}

      {/* Bottom Navigation Bar (For Mobile) */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg p-3 flex justify-around items-center z-50">
          <NavItem href="/admin/dashboard" icon={<LayoutDashboard size={24} />} active={pathname === "/admin/dashboard"} />
          <NavItem href="/admin/users" icon={<Users size={24} />} active={pathname === "/admin/users"} />
          <NavItem href="/admin/reports" icon={<FileText size={24} />} active={pathname === "/admin/reports"} />

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          {/* Logout Button (Mobile) */}
          <button
            onClick={handleLogout}
            className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all"
          >
            <LogOut size={24} />
          </button>
        </div>
      )}

      {/* Toggle Button (For Desktop Sidebar) */}
      {!isMobile && (
        <button
          className="fixed top-5 left-5 p-2 bg-gray-200 dark:bg-gray-800 rounded-md md:hidden z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
}

// Sidebar Item Component with Active State
const SidebarItem = ({ href, icon, text, active }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 p-3 rounded-md transition-all ${
      active
        ? "bg-blue-500 text-white dark:bg-blue-600" // ✅ Active Tab Style
        : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
    }`}
  >
    {icon} {text}
  </Link>
);

// Mobile Bottom Nav Item Component with Active State
const NavItem = ({ href, icon, active }) => (
  <Link href={href} className={`p-3 rounded-full transition-all ${active ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
    {icon}
  </Link>
);
