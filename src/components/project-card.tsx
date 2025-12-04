import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShineBorder } from "@/components/ui/shine-border";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <div className="relative">
      <Card
        className={
          "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
        }
      >
        <ShineBorder 
          shineColor={["#a855f7", "#ec4899"]}
          borderWidth={2}
        />
      <Link
        href={href || "#"}
        className={cn("block cursor-pointer", className)}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-32 w-full object-cover object-top" // needed because random black line at bottom of video
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-32 w-full overflow-hidden object-cover object-top"
          />
        )}
      </Link>
      <CardHeader className="px-1 py-1">
        <div className="space-y-0.5">
          <CardTitle className="mt-0.5 text-xs leading-tight">{title}</CardTitle>
          <time className="font-sans text-[9px]">{dates}</time>
          <div className="hidden font-sans text-[9px] underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-[9px] leading-tight text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-1 py-0">
        {tags && tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-0.5">
            {tags?.map((tag) => (
              <Badge
                className="px-0.5 py-0 text-[8px] leading-tight"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-1 pb-1">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-0.5">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-1 px-1 py-0.5 text-[8px] leading-tight">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
      </Card>
    </div>
  );
}
