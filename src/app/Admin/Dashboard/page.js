"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./../../../components/sidebar"; // Ensure correct import path
import { LayoutDashboard, Users, FileText } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for Desktop */}
      {!isMobile && <Sidebar />}

      {/* Main Dashboard Content */}
      <main className={`mt-4 flex-1 p-6 pt-16 transition-all ${isMobile ? "ml-0" : "ml-64"}`}>
        {/* Dashboard Header */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center md:text-left">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0 text-center md:text-right">
            Welcome back!
          </p>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Users Registered
            </h2>
            <p className="text-2xl font-bold text-blue-500 mt-2">1,250</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Active Subscriptions
            </h2>
            <p className="text-2xl font-bold text-green-500 mt-2">540</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Monthly Revenue
            </h2>
            <p className="text-2xl font-bold text-purple-500 mt-2">₹2,50,000</p>
          </div>
        </div>
      </main>

      {/* Bottom Navbar for Mobile */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg p-3 flex justify-around items-center z-50">
          <NavItem href="/admin/dashboard" icon={<LayoutDashboard size={24} />} />
          <NavItem href="/admin/users" icon={<Users size={24} />} />
          <NavItem href="/admin/reports" icon={<FileText size={24} />} />
        </nav>
      )}
    </div>
  );
}

// Mobile Bottom Nav Item Component
const NavItem = ({ href, icon }) => (
  <Link href={href} className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all">
    {icon}
  </Link>
);
