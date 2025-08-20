"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface InteractiveGridPatternProps {
  width?: number;
  height?: number;
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
}

const InteractiveGridPattern = ({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
}: InteractiveGridPatternProps) => {
  const [activeSquares, setActiveSquares] = useState<Set<string>>(new Set());

  const handleSquareHover = (id: string) => {
    setActiveSquares((prev) => new Set(prev).add(id));
  };

  const handleSquareLeave = (id: string) => {
    setTimeout(() => {
      setActiveSquares((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 500);
  };

  const generateSquares = () => {
    const squareElements = [];
    for (let row = 0; row < squares[1]; row++) {
      for (let col = 0; col < squares[0]; col++) {
        const squareId = `${row}-${col}`;
        const isActive = activeSquares.has(squareId);
        
        squareElements.push(
          <motion.rect
            key={squareId}
            x={col * width}
            y={row * height}
            width={width}
            height={height}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className={cn(
              "transition-all duration-300",
              isActive 
                ? "stroke-blue-400/80 fill-blue-400/20" 
                : "stroke-neutral-400/40 dark:stroke-neutral-600/50",
              squaresClassName
            )}
            onMouseEnter={() => handleSquareHover(squareId)}
            onMouseLeave={() => handleSquareLeave(squareId)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.3,
              delay: (row + col) * 0.01 
            }}
          />
        );
      }
    }
    return squareElements;
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <svg
        width={squares[0] * width}
        height={squares[1] * height}
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {generateSquares()}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/80 pointer-events-none" />
    </div>
  );
};

export default InteractiveGridPattern;
