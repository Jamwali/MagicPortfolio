"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
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
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 flex-shrink-0",
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
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-2 text-xs sm:text-sm whitespace-pre-line"
            >
              {description}
            </motion.div>
          )}
        </div>
      </Card>
    </Link>
  );
};
