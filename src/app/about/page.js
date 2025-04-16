

"use client";

import ContactForm from "./../../components/ContactForm";
import TestimonialSection from "./../../components/testimonial";
import AboutDeck from "./../../components/AboutDeck"
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import ClientLogosCarousel from "../../components/ClientCarousel";
import {
  FaHeart,
  FaUsers,
  FaSmileBeam,
  FaShieldAlt,
  FaRocket
} from "react-icons/fa";

const values = [
  {
    title: "Empathy and Compassion.",
    description:
      "We recognize we are all human and that, as such, we are all different. We embrace difference.",
    icon: <FaHeart className="text-4xl text-pink-500" />,
  },
  {
    title: "Teamwork.",
    description: "Go further together with curiosity and empathy, always.",
    icon: <FaUsers className="text-4xl text-blue-500" />,
  },
  {
    title: "Playfulness.",
    description:
      "We are witty by nature. We have fun at work while being extremely professional in what we do.",
    icon: <FaSmileBeam className="text-4xl text-yellow-500" />,
  },
  {
    title: "Integrity.",
    description:
      "We foster an environment where reliability and ethical principles are not just appreciated.",
    icon: <FaShieldAlt className="text-4xl text-green-500" />,
  },
  {
    title: "Ambition.",
    description:
      "We aspire higher. We push ourselves to be better. We push others to be better.",
    icon: <FaRocket className="text-4xl text-purple-500" />,
  },
];


export default function About() {
  const { theme } = useTheme();
  const scrollContainer = useRef(null);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);

  useEffect(() => {
    const handleScroll = (event) => {
      if (!scrollContainer.current) return;
      event.preventDefault();

      const container = scrollContainer.current;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      container.scrollLeft += event.deltaY * 1.5;

      if (container.scrollLeft >= maxScrollLeft - 10) {
        setIsAtEnd(true);
        setIsAtStart(false);
      } else if (container.scrollLeft <= 10) {
        setIsAtStart(true);
        setIsAtEnd(false);
      } else {
        setIsAtEnd(false);
        setIsAtStart(false);
      }
    };

    const container = scrollContainer.current;
    container?.addEventListener("wheel", handleScroll, { passive: false });

    return () => container?.removeEventListener("wheel", handleScroll);
  }, []);

  useEffect(() => {
    if (isAtEnd) {
      setTimeout(() => {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      }, 500);
    }
  }, [isAtEnd]);

  useEffect(() => {
    const handleScrollUp = () => {
      if (window.scrollY === 0 && isAtEnd) {
        scrollContainer.current?.scrollTo({ left: 0, behavior: "smooth" });
        setIsAtEnd(false);
        setIsAtStart(true);
      }
    };

    window.addEventListener("scroll", handleScrollUp);
    return () => window.removeEventListener("scroll", handleScrollUp);
  }, [isAtEnd]);

  return (
    
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <main className="flex-1">
   
      

        <div className={`${theme === "dark" ? "bg-black" : "bg-white"}`}>
        <AboutDeck/>
        {/* Our Values Section */}
        <section className="pt-28 pb-20 px-8 md:px-16 lg:px-24">
 
        {/* <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            className="text-left"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl font-extrabold leading-tight">Core values.</h2>
            <h3 className="text-5xl font-extrabold text-gray-400 mt-2">
              Expressed in everything.
            </h3>
          </motion.div>

          <div className="space-y-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-6 pb-10 border-b border-gray-500 last:border-none"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: false }}
              >
                <Image
                  src={value.image}
                  alt={value.title}
                  width={80}
                  height={90}
                  className="object-contain"
                />
               <div className="space-y-2 ">
  <h4 className="text-2xl font-extrabold text-gray-500 tracking-wide uppercase">
    {value.title}
  </h4>
  <p className="text-lg  leading-relaxed">
    {value.description}
  </p>
</div>

              </motion.div>
            ))}
          </div>
        </div> */}

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
    {/* Left Side: Animated Heading */}
    <motion.div
      className="text-left"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-5xl font-extrabold leading-tight">Core values.</h2>
      <h3 className="text-5xl font-extrabold text-gray-400 mt-2">
        Expressed in everything.
      </h3>
    </motion.div>

    {/* Right Side: Values List */}
    <div className="space-y-10">
      {values.map((value, index) => (
        <motion.div
          key={index}
          className="flex items-start space-x-6 pb-10 border-b border-gray-500 last:border-none"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: false }}
        >
          <div className="flex-shrink-0">{value.icon}</div>
          <div className="space-y-2">
            <h4 className="text-2xl font-extrabold text-gray-500 tracking-wide uppercase">
              {value.title}
            </h4>
            <p className="text-lg leading-relaxed">{value.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
      </section>

          <TestimonialSection />
          <ClientLogosCarousel/>
          <ContactForm />
        </div>
     
      </main>
    </div>
  );
}
