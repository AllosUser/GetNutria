import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";

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
  title: "GetNutria — Nutrition Practice Management Platform",
  description:
    "Manage clients, diet plans, measurements, appointments, and communication in one platform for nutritionists and dietitians.",
  icons: {
    icon: "/brand/source-logo.png",
    apple: "/brand/source-logo.png",
  },
  openGraph: {
    title: "GetNutria — Nutrition Practice Management Platform",
    description:
      "Manage clients, diet plans, measurements, appointments, and communication in one platform for nutritionists and dietitians.",
    url: "https://getnutria.com",
    siteName: "GetNutria",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetNutria — Nutrition Practice Management Platform",
    description:
      "Manage clients, diet plans, measurements, appointments, and communication in one platform for nutritionists and dietitians.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=localStorage.getItem('language');if(l==='el'){document.documentElement.setAttribute('data-lang','el');document.documentElement.lang='el'}else{document.documentElement.setAttribute('data-lang','en');document.documentElement.lang='en'}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

