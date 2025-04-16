"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useTransition, animated } from "@react-spring/web";
import { useTheme } from "next-themes";
import useMeasure from "react-use-measure";
import shuffle from "lodash.shuffle";

// ✅ Tech items for animated list
const techItems = [
  "Web Development",
  "Cloud Computing",
  "UI/UX Design",
  "DevOps & Automation",
  "Mobile Apps",
  "Software Engineering",
  "IoT",
  "Tech Consulting",
  "AR/VR Development",
  "Full Stack Development",
  "Database Management",
];

const getRandomSubset = () => {
  const shuffled = [...techItems].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.floor(Math.random() * 5) + 2);
};

const getRandomColor = () => {
  const colors = ["#ff6b6b", "#feca57", "#1dd1a1", "#5f27cd", "#54a0ff", "#ff9ff3"];
  return colors[Math.floor(Math.random() * colors.length)];
};


const getRandomTransform = () => {
  const animations = [
    "perspective(600px) rotateX(180deg)",
    "perspective(600px) rotateY(180deg)",
    "scale(1.1)",

  ];
  return animations[Math.floor(Math.random() * animations.length)];
};

// ✅ Data for Masonry Grid
const data = [
  { css: "https://res.cloudinary.com/dob666wa0/image/upload/v1744741795/d_cdj9hp.jpg", height: 150 },
  { css: "https://res.cloudinary.com/dob666wa0/image/upload/v1744741795/b_vimszl.jpg", height: 300 },
  { css: "https://res.cloudinary.com/dob666wa0/image/upload/v1744741795/f_pr5twv.jpg", height: 300 },
  { css: "https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg", height: 300 },
  { css: "https://res.cloudinary.com/dob666wa0/image/upload/v1744741797/i_hennhh.jpg", height: 300 },
  { css: "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg", height: 300 },

  { css: "https://res.cloudinary.com/dob666wa0/image/upload/v1744741795/c_hhk0nk.jpg", height: 200 },
  { css: "https://res.cloudinary.com/dob666wa0/image/upload/v1744741797/h_yvzlpq.jpg", height: 300 },
  { css: "https://res.cloudinary.com/dob666wa0/image/upload/v1744741794/a_stiq5a.jpg", height: 200 },
  { css: "https://res.cloudinary.com/dob666wa0/image/upload/v1744741801/m_bn3qml.jpg", height: 400 },
  { css: "https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg", height: 400 },
  { css: "https://images.pexels.com/photos/380337/pexels-photo-380337.jpeg", height: 200 },
];

// ✅ Masonry Grid Component
function Masonry() {
  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [5, 4, 3],
    2
  );

  const [ref, { width, height }] = useMeasure();
  const [items, setItems] = useState(generateRandomizedData());

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(generateRandomizedData());
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  function generateRandomizedData() {
    return data.map((item) => ({
      ...item,
      height: Math.floor(Math.random() * 250) + 100,
      widthFactor: Math.random() * 0.6 + 0.7,
      gap: Math.floor(Math.random() * 20) + 5,
    }));
  }

  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0);
    let arrangedItems = items.map((child) => {
      const column = heights.indexOf(Math.min(...heights));
      const x = (width / columns) * column;
      const y = heights[column];
      const gap = child.gap;
      const itemWidth = (width / columns) * child.widthFactor;
      heights[column] += child.height + gap;
      return { ...child, x, y, width: itemWidth - gap, height: child.height };
    });

    return [heights, arrangedItems];
  }, [columns, items, width, height]);

  const transitions = useTransition(gridItems, {
    key: (item) => item.css,
    from: ({ x, y, width, height }) => ({
      x, y, width, height, opacity: 0, scale: 0.85
    }),
    enter: ({ x, y, width, height }) => ({
      x, y, width, height, opacity: 1, scale: 1
    }),
    update: ({ x, y, width, height }) => ({
      x, y, width, height, opacity: 1, scale: 1
    }),
    leave: { opacity: 0, height: 0, scale: 0.6 },
    config: { mass: 5, tension: 450, friction: 45 },
    trail: 80,
  });

  function useMedia(queries, values, defaultValue) {
    const match = () => {
      if (typeof window === "undefined") return defaultValue;
      return values[queries.findIndex((q) => matchMedia(q).matches)] || defaultValue;
    };

    const [value, set] = useState(match);

    useEffect(() => {
      const handler = () => set(match);
      window.addEventListener("resize", handler);
      return () => window.removeEventListener("resize", handler);
    }, []);

    return value;
  }

  return (
    <div ref={ref} className="relative w-full h-full flex flex-wrap items-start justify-start overflow-hidden">
      {transitions((style, item) => (
        <animated.div
          style={{
            ...style,
            position: "absolute",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0px 6px 14px rgba(0,0,0,0.25)",
            transformOrigin: "center center",
          }}
          className="bg-cover bg-center"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${item.css}?auto=compress&dpr=2&h=500&w=500)` }}
          />
        </animated.div>
      ))}
    </div>
  );
}

// ✅ Animated List Component
const AnimatedList = () => {
  const { theme, resolvedTheme } = useTheme();
  const ref = useRef([]);
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const transitions = useTransition(items, {
    from: { opacity: 0, height: 50 },
    enter: (item) => [
      { opacity: 1, height: 50 },
      { transform: getRandomTransform(), color: item.color },
      { transform: "perspective(600px) rotateX(0deg)" } 
    ],
    leave: [{ opacity: 0, height: 0 }],
    config: { tension: 200, friction: 20 },
  });

  useEffect(() => {
    const updateList = () => {
      setItems(getRandomSubset().map((text) => ({ text, color: getRandomColor() })));
      ref.current.push(setTimeout(updateList, 4000));
    };
    updateList();
    return () => ref.current.forEach(clearTimeout);
  }, []);

  if (!mounted) return null;

  return (
<div className="flex flex-col md:flex-row h-screen gap-8">
  {/* Left Side: Heading (90% height on mobile) */}
  <div className="w-full md:w-1/2 flex flex-col justify-start items-center p-6 flex-grow">
    
    {/* Static Heading at the Top */}
    <h1 className="text-[28px] md:text-[38px] font-bold text-center md:text-center w-full max-w-xs md:max-w-md mt-10">
      Our Services
    </h1>

    {/* Gap between Heading & List */}
    <div className="mt-16"></div>

    {/* Animated Text Below */}
    <div className="w-full text-[24px] md:text-[32px] text-center font-bold max-w-xs md:max-w-md mt-20">
      {transitions((style, item) => (
        <animated.div style={{ ...style, color: item.color }}>
          {item.text}
        </animated.div>
      ))}
    </div>
  </div>

  {/* Right Side: Masonry (10% height on mobile, normal on desktop) */}
  <div className="w-full md:w-1/2 h-0 md:h-auto hidden md:flex items-center justify-center p-6">
    <Masonry />
  </div>
</div>



  );
};

export default AnimatedList;
