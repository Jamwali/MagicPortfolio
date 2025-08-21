"use client";

import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
  animateOnHover?: boolean;
  characterSet?: string[];
}

const defaultCharacterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const HyperText = ({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = defaultCharacterSet,
}: HyperTextProps) => {
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const scrambleText = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const targetText = children;
    const scrambleSpeed = 30;
    const revealSpeed = duration / targetText.length;

    let currentIndex = 0;
    const scrambleInterval = setInterval(() => {
      setDisplayText((prev) => {
        return prev
          .split("")
          .map((char, index) => {
            if (index < currentIndex) {
              return targetText[index];
            }
            if (char === " ") return " ";
            return characterSet[Math.floor(Math.random() * characterSet.length)];
          })
          .join("");
      });
    }, scrambleSpeed);

    const revealInterval = setInterval(() => {
      setDisplayText((prev) => {
        const newText = prev
          .split("")
          .map((char, index) => {
            if (index <= currentIndex) {
              return targetText[index];
            }
            return char;
          })
          .join("");
        return newText;
      });

      currentIndex++;
      if (currentIndex >= targetText.length) {
        clearInterval(revealInterval);
        clearInterval(scrambleInterval);
        setDisplayText(targetText);
        setIsAnimating(false);
      }
    }, revealSpeed);
  }, [children, duration, isAnimating, characterSet]);

  useEffect(() => {
    if (startOnView && isInView) {
      const timer = setTimeout(scrambleText, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, startOnView, delay, scrambleText]);

  const handleMouseEnter = () => {
    if (animateOnHover) {
      scrambleText();
    }
  };

  return (
    <Component
      ref={ref}
      className={cn("inline-block cursor-default", className)}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </Component>
  );
};

export default HyperText;
