"use client";

import React, { useState, useEffect } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useTheme } from "next-themes";

const cards = [
  "https://res.cloudinary.com/ddztecdya/image/upload/v1734269530/ndmqsnjupikvjgwbndoh.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
];

// Initial positions
const to = (i) => ({
  x: 0,
  y: i * -5,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});

// Transform function for animation
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

export default function Deck() {
  const { theme, setTheme } = useTheme(); // Theme Handling
  const [positions, setPositions] = useState(cards.map(() => ({ x: 0, y: 0 })));
  const [movedCards, setMovedCards] = useState(new Set());

  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    config: { mass: 1, tension: 500, friction: 50 },
  }));

  const bind = useDrag(({ args: [index], down, movement: [mx, my] }) => {
    setPositions((prev) => {
      const newPositions = [...prev];
      newPositions[index] = { x: mx, y: my };
      return newPositions;
    });

    setMovedCards((prev) => {
      const updated = new Set(prev);
      updated.add(index);
      return updated;
    });

    api.start((i) => {
      if (index !== i) return;
      return {
        x: mx,
        y: my,
        rot: mx / 100,
        scale: down ? 1.1 : 1,
        immediate: down,
        config: { friction: 50, tension: down ? 800 : 500 },
      };
    });

    if (!down && movedCards.size === cards.length) {
      setTimeout(() => {
        setMovedCards(new Set());
        api.start((i) => ({
          ...to(i),
          delay: i * 300,
        }));
      }, 500);
    }
  });

  return (
<div className="min-h-screen w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-8 px-6 lg:px-16 py-12 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
  
  {/* Left Section - About Us */}
  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center  text-center lg:text-left space-y-4">
    <h1 className="text-3xl sm:text-4xl font-bold max-w-md">
      We didn't reinvent the wheel
    </h1>
    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-md">
      We are strategists, designers, and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.
    </p>
    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-md">
      We’re small enough to stay flexible and move fast—but experienced enough to handle big ideas and deliver real results. With the right mix of creativity, tech, and strategy, we bring your vision to life—on time, and without the hassle.
    </p>
  </div>

  {/* Right Section - Stack of Cards */}
  <div className="w-full lg:w-1/2 flex justify-center items-center relative h-[400px] sm:h-[420px] md:h-[450px]">
    {props.map(({ x, y, rot, scale }, i) => (
      <animated.div key={i} className="absolute w-56 h-80 sm:w-64 sm:h-86" style={{ x, y }}>
        <animated.div
          {...bind(i)}
          className="w-56 h-80 sm:w-64 sm:h-96 bg-white dark:bg-gray-700 bg-cover bg-center shadow-2xl rounded-lg cursor-pointer"
          style={{
            transform: interpolate([rot, scale], trans),
            backgroundImage: `url(${cards[i]})`,
          }}
        />
      </animated.div>
    ))}
  </div>
</div>

  
  
  
  );
}
