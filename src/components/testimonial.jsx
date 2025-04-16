"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../db/firebase";

export default function TestimonialSection() {
  const { resolvedTheme } = useTheme();
  const [testimonials, setTestimonials] = useState([]);
  const [currentTheme, setCurrentTheme] = useState("light");
  const cardRefs = useRef([]);

  const [isPC, setIsPC] = useState(true);

  useEffect(() => {
    if (resolvedTheme) setCurrentTheme(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const querySnapshot = await getDocs(collection(db, "testimonials"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestimonials(data);
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsPC(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isPC) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [testimonials, isPC]);

  const themeStyles = {
    cardBg: currentTheme === "dark" ? "bg-gray-800" : "bg-white",
    cardText: currentTheme === "dark" ? "text-white" : "text-gray-900",
    subText: currentTheme === "dark" ? "text-gray-400" : "text-gray-600",
    sectionBg: currentTheme === "dark" ? "bg-black" : "bg-gray-100",
  };

  return (
    <section className={`w-full py-16 px-6 ${themeStyles.sectionBg}`}>
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">Testimonials</h2>
        <p className={`text-lg ${themeStyles.subText}`}>
          What people are saying about us
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-10 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
        {testimonials.map((t, index) => {
          const isLastOdd =
            testimonials.length % 2 !== 0 && index === testimonials.length - 1;
          return (
            <div
              key={t.id}
              ref={(el) => (cardRefs.current[index] = el)}

              className={`w-full sm:w-[80%] md:w-[45%] lg:w-[38%] ${
                isLastOdd ? "lg:mx-auto" : ""
              } ${isPC ? "animate-slide-up" : ""}
              transition duration-300 hover:scale-[1.02]`}
            >
              <div
                className={`rounded-xl shadow-md p-6 ${themeStyles.cardBg} ${themeStyles.cardText}`}
              >
                <p className="text-sm italic mb-4 line-clamp-5">“{t.quote}”</p>
                <div className="flex items-center mt-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover border border-gray-300"
                  />
                  <div className="ml-4 text-left">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className={`text-xs ${themeStyles.subText}`}>{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
