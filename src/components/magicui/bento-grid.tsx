import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  githubHref?: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  githubHref,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="p-6 h-full flex flex-col">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-3 transition-all duration-300 lg:group-hover:-translate-y-10 flex-1">
        <Icon className="h-12 w-12 origin-left transform-gpu text-foreground transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="text-xl font-semibold text-foreground font-sans leading-tight">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground font-sans leading-relaxed overflow-hidden"
           style={{
             display: '-webkit-box',
             WebkitLineClamp: 4,
             WebkitBoxOrient: 'vertical',
           }}
        >
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Button
          variant="ghost"
          size="sm"
          asChild={!!(href && href !== "#")}
          className={cn(
            "pointer-events-auto p-2 h-8 w-8",
            (!href || href === "#") && "opacity-30 cursor-not-allowed pointer-events-none"
          )}
        >
          {href && href !== "#" ? (
            <a href={href} target="_blank" rel="noopener noreferrer" title="View Live Site">
              <Icons.globe className="h-4 w-4" />
            </a>
          ) : (
            <div title="Live site not available">
              <Icons.globe className="h-4 w-4" />
            </div>
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild={!!(githubHref && githubHref !== "#")}
          className={cn(
            "pointer-events-auto p-2 h-8 w-8",
            (!githubHref || githubHref === "#") && "opacity-30 cursor-not-allowed pointer-events-none"
          )}
        >
          {githubHref && githubHref !== "#" ? (
            <a href={githubHref} target="_blank" rel="noopener noreferrer" title="View Source Code">
              <Icons.github className="h-4 w-4" />
            </a>
          ) : (
            <div title="Source code not available">
              <Icons.github className="h-4 w-4" />
            </div>
          )}
        </Button>
      </div>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
