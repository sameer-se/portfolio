import type React from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimationProvider } from "@/components/animation-provider";
import { PageTransition } from "@/components/page-transition";
import Navbar from "@/components/navbar";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Add preload hints for critical resources
export const metadata: Metadata = {
  title: "Sameer Khadka Portfolio Website",
  description: "A modern, visually stunning personal portfolio website",
  authors: [{ name: "Sameer Khadka", url: "https://www.sameer-khakda.com.np" }],
  keywords: [
    "Sameer Khadka",
    "Software Developer",
    "Software Engineer",
    "Web Developer",
    "Fullstack Engineer",
    "Fullstack Developer",
    "Nepal",
    "React",
    "Next.js",
    "database",
  ],
  metadataBase: new URL("https://www.sameer-khakda.com.np"),
  generator: "",
  creator: "Sameer Khadka",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sameer-khadka.com.np",
    title: "Sameer Khadka | Software Developer",
    description:
      "Personal portfolio of Sameer Khadka, a Software Developer and Fullstack Engineer based in Nepal.",
    siteName: "Sameer Khadka Portfolio Website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sameer Khadka | Software Developer",
    description:
      "Personal portfolio of Sameer Khadka, a Software Developer and Fullstack Engineer based in Nepal.",
  },
  icons: {
    icon: "/alien.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${GeistSans.className} antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AnimationProvider>
            <PageTransition>
              <Navbar />
              {children}
            </PageTransition>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
