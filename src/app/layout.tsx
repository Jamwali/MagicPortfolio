import { SiteNav } from "@/components/site-nav";
import { FilmGrain } from "@/components/film-grain";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} — ML & Full-Stack Engineer`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name} — ML & Full-Stack Engineer`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name} — ML & Full-Stack Engineer`,
    card: "summary_large_image",
    description: DATA.description,
    images: ["/opengraph-image"],
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen w-full bg-background font-sans antialiased"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider delayDuration={0}>
            <script
              type="application/ld+json"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Person",
                  name: DATA.name,
                  url: DATA.url,
                  email: DATA.contact.email,
                  jobTitle: "Machine Learning and Full-Stack Engineer",
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "McMaster University",
                  },
                  sameAs: [
                    DATA.contact.social.GitHub.url,
                    DATA.contact.social.LinkedIn.url,
                  ],
                  knowsAbout: [
                    "Machine learning",
                    "Computer vision",
                    "Language models",
                    "Full-stack development",
                  ],
                }),
              }}
            />
            <a
              href="#main"
              className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-full focus-visible:bg-foreground focus-visible:px-5 focus-visible:py-3 focus-visible:text-[15px] focus-visible:font-medium focus-visible:text-background"
            >
              Skip to content
            </a>
            <FilmGrain />
            <SiteNav />
            <div id="main" className="pt-24">
              {children}
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
