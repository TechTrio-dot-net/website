"use client";

import { useState } from "react";
import Image from "next/image";

const Products = () => {
  const [activeTab, setActiveTab] = useState("Web Services");

  const tabs = [
    {
      id: "Web Services",
      buttonLabel: "Web Services",
      label: "Web Design & Development",
      img: "/webapp.jpg",
      description:
        "We offer end-to-end web solutions including responsive design, full-stack development, SEO optimization, and scalable deployment tailored to your business needs.",
    },
    {
      id: "Car parking",
      buttonLabel: "Car parking",
      label: "Car parking making parking smarter, simpler, and stress-free.",
      img: "/Parking.jpg",
      description:
        "Our car parking system is built to bring order to chaos. Whether you're managing a mall, office complex, apartment building, or public parking area—we help you control traffic flow, reduce congestion, and improve the entire parking experience.",
    },
    {
      id: "Car tracking ",
      buttonLabel: "Vehicle Tracking",
      label: "Know where your vehicles are—anytime, anywhere.",
      img: "/tracking3.jpg",
      description:
        "TechTrio’s Car Tracking System gives you real-time visibility over your vehicles, helping you stay in control, improve safety, and reduce operational headaches. Whether you manage a fleet or just want to keep an eye on a personal vehicle, we’ve got you covered.",
    },
    {
      id: "IMS ",
      buttonLabel: "IMS ",
      label: "Track, manage, and control your inventory—smarter and faster.",
      img: "/ims2.jpg",
      description:
        "TechTrio’s Inventory Management System is built to simplify how you handle stock. Whether you run a store, warehouse, or multi-location business, our IMS helps you stay organized, avoid stockouts, and reduce waste—all in one easy-to-use platform.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center py-16 px-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Services Portfolio for Financial Institutions
      </h1>

      {/* Tabs */}
      <div className="w-full m-4 overflow-x-auto">
        <div className="flex space-x-2 md:space-x-8 bg-black dark:bg-gray-800 p-4 rounded-full w-max mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 whitespace-nowrap rounded-full transition-all text-xs md:text-sm font-medium ${
                activeTab === tab.id
                  ? "bg-yellow-400 text-black"
                  : "text-white dark:text-white hover:bg-white hover:text-black dark:hover:bg-black"
              }`}
            >
              {tab.buttonLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 px-4 max-w-6xl w-full flex flex-col items-center">
        {tabs
          .filter((tab) => tab.id === activeTab)
          .map((tab) => (
            <div
              key={tab.id}
              className="flex flex-col md:flex-row items-start justify-between gap-8 w-full"
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <Image
                  src={tab.img}
                  alt={tab.label}
                  width={600}
                  height={400}
                  className="rounded-lg w-full h-auto object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 flex flex-col justify-center md:min-h-[400px] mt-4 md:mt-0">
  <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-center md:text-left">
    {tab.label}
  </h2>
  <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base text-center md:text-left">
    {tab.description}
  </p>
</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
