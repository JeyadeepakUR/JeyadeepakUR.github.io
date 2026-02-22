import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://jeyadeepak.me"),
  title: "Jeyadeepak U R | Generative AI & Full-Stack Engineer",
  description: "Portfolio of Jeyadeepak U R, a software engineer specializing in Generative AI, scalable Full-Stack solutions, data pipelines, and intelligent AI agents.",
  keywords: [
    "Jeyadeepak", "Jeyadeepak U R", "Software Engineer", "Full-Stack Developer",
    "Generative AI", "AI Engineer", "React", "Next.js", "Python", "Data Science",
    "Portfolio", "Web Development", "AI Agents", "Competitive Programming"
  ],
  authors: [{ name: "Jeyadeepak U R" }],
  creator: "Jeyadeepak U R",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jeyadeepak.me", // Assuming canonical domain
    title: "Jeyadeepak U R | Generative AI & Full-Stack Engineer",
    description: "Explore the portfolio of Jeyadeepak U R, specializing in Generative AI, Full-Stack solutions, and innovative software engineering.",
    siteName: "Jeyadeepak's Portfolio",
    images: [
      {
        url: "/og-image.jpeg", // Placeholder for actual OG image
        width: 1200,
        height: 630,
        alt: "Jeyadeepak U R - Portfolio Preview",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeyadeepak U R | Generative AI & Full-Stack Engineer",
    description: "Specializing in Generative AI, Full-Stack solutions, and innovative software engineering.",
    images: ["/og-image.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {/* We will place the 3D Scene in the page component to overlay the children */}
        {children}
      </body>
    </html>
  );
}
