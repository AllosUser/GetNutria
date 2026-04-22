import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GetNutria — The Platform for Modern Nutritionists",
  description:
    "Manage clients, create diet plans, track body composition, and grow your nutrition practice — all in one platform.",
  openGraph: {
    title: "GetNutria — The Platform for Modern Nutritionists",
    description:
      "Manage clients, create diet plans, track body composition, and grow your nutrition practice.",
    url: "https://getnutria.com",
    siteName: "GetNutria",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetNutria — The Platform for Modern Nutritionists",
    description:
      "Manage clients, create diet plans, track body composition, and grow your nutrition practice.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
