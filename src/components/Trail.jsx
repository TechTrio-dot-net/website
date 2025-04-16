"use client";

import { useState, useEffect } from "react";
import { useTrail, a } from "@react-spring/web";

const Trail = ({ open, children }) => {
  const items = Array.isArray(children) ? children : [children];

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0px)" : "translateY(50px)",
    from: { opacity: 0, transform: "translateY(50px)" },
  });

  return (
    <div className="flex justify-center items-center gap-4">
      {trail.map((style, index) => (
        <a.span
          key={index}
          className="text-6xl font-extrabold tracking-tight"
          style={style}
        >
          {items[index]}
        </a.span>
      ))}
    </div>
  );
};

const AnimatedText = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const textElement = document.getElementById("animated-text");
      if (!textElement) return;

      const rect = textElement.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.8;

      if (rect.top < triggerPoint) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="animated-text">
      <Trail open={open}>
        <span>Lorem</span>
        <span>Ipsum</span>
        <span>Dolor</span>
        <span>Sit</span>
      </Trail>
    </div>
  );
};

export default AnimatedText;
