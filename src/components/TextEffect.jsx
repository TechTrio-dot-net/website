import { useState } from "react";
import { TextEffect } from "./../components/ui/text-effect";

export function TextEffectWithPreset({ children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      {isHovered ? (
        <TextEffect per="word" as="h3" preset="slide" speedSegment={0.7}>
          {children}
        </TextEffect>
      ) : (
        children
      )}
    </span>
  );
}
