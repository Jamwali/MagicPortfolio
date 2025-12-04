"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Highlighter } from "@/components/ui/highlighter";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}

// Helper function to parse and highlight metrics
const highlightMetrics = (text: string): React.ReactNode[] => {
  const metricsPatterns = [
    { pattern: "100+ Windows/macOS support tickets", color: "#34c759", action: "highlight" as const },
    { pattern: "95% SLA", color: "#3b82f6", action: "underline" as const },
    { pattern: "20%", color: "#a855f7", action: "highlight" as const },
    { pattern: "40%", color: "#f97316", action: "underline" as const },
    { pattern: "25+ internal documentation articles", color: "#ec4899", action: "highlight" as const },
    { pattern: "25%", color: "#0ea5e9", action: "underline" as const },
    { pattern: "25% increase in processing speed", color: "#34c759", action: "highlight" as const },
    { pattern: "35% cost reduction", color: "#f97316", action: "underline" as const },
    { pattern: "30% improvement in project timelines", color: "#a855f7", action: "highlight" as const },
  ];

  let nodes: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let found = false;

    for (const { pattern, color, action } of metricsPatterns) {
      const index = remaining.indexOf(pattern);
      if (index === 0) {
        // Found a match at the start
        nodes.push(
          <Highlighter key={key++} color={color} action={action}>
            {pattern}
          </Highlighter>
        );
        remaining = remaining.substring(pattern.length);
        found = true;
        break;
      }
    }

    if (!found) {
      // Find the next metric
      let nextIndex = remaining.length;
      for (const { pattern } of metricsPatterns) {
        const idx = remaining.indexOf(pattern);
        if (idx !== -1 && idx < nextIndex) {
          nextIndex = idx;
        }
      }

      if (nextIndex > 0) {
        nodes.push(remaining.substring(0, nextIndex));
        remaining = remaining.substring(nextIndex);
      } else {
        nodes.push(remaining);
        remaining = "";
      }
    }
  }

  return nodes;
};
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(true);
  
  // Memoize the highlighted metrics to prevent re-rendering on card state changes
  const memoizedHighlightedMetrics = React.useMemo(
    () => (description ? highlightMetrics(description) : null),
    [description]
  );

  // Detect if we're on desktop on mount and on window resize
  React.useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // On desktop, always show expanded. On mobile, use toggle state
  const shouldShowDescription = isDesktop || isExpanded;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      // Only allow toggling on mobile
      if (!isDesktop) {
        setIsExpanded(!isExpanded);
      }
    } else if (!href) {
      e.preventDefault();
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
    >
      <Card className="flex">
        <div className="flex-none">
          <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
            <AvatarImage
              src={logoUrl.startsWith('/') ? logoUrl : ''}
              alt={altText}
              className="object-contain"
            />
            <AvatarFallback className="text-xs font-semibold">
              {logoUrl.startsWith('/') ? altText[0] : logoUrl}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 items-center flex-col group">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold leading-none text-xs sm:text-sm flex-shrink-0">
                  {title}
                </h3>
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform transition-all duration-300 ease-out group-hover:translate-x-1 flex-shrink-0",
                    description && !isDesktop ? "opacity-100" : "opacity-0",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </div>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground">
                {period}
              </div>
            </div>
            {badges && (
              <div className="flex flex-wrap gap-1 mt-1">
                {badges.map((badge, index) => (
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-0.5 h-5"
                    key={index}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
            {subtitle && <div className="font-sans text-xs mt-1">{subtitle}</div>}
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: shouldShowDescription ? 1 : 0,
                height: shouldShowDescription ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-2 text-xs sm:text-sm whitespace-pre-line"
            >
              {memoizedHighlightedMetrics}
            </motion.div>
          )}
        </div>
      </Card>
    </Link>
  );
};
