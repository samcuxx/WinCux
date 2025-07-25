import type { Metadata } from "next";
import "@fontsource/bricolage-grotesque/400.css";
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/600.css";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://wincux.samcux.tech"),
  title: "WinCux - A More Beautiful Desktop",
  description:
    "Beautifully designed, privacy-focused desktop enhancement for Windows. Manage wallpapers, Rainmeter skins, and customize your Windows 11 experience.",
  keywords: [
    "Windows",
    "Desktop Enhancement",
    "Wallpapers",
    "Rainmeter",
    "Customization",
    "Windows 11",
  ],
  authors: [{ name: "WinCux Team" }],
  creator: "WinCux Team",
  openGraph: {
    title: "WinCux - A More Beautiful Desktop",
    description:
      "Beautifully designed, privacy-focused desktop enhancement for Windows. Manage wallpapers, Rainmeter skins, and customize your Windows 11 experience.",
    url: "https://wincux.samcux.tech",
    siteName: "WinCux",
    type: "website",
    images: [
      {
        url: "wincuxOG.png",
        width: 1200,
        height: 630,
        alt: "WinCux Desktop Enhancement Application",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WinCux - A More Beautiful Desktop",
    description:
      "Beautifully designed, privacy-focused desktop enhancement for Windows.",
    images: ["wincuxOG.png"],
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
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = (() => {
                  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                    return localStorage.getItem('theme') ?? 'light'
                  }
                  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    return 'dark'
                  }
                  return 'light'
                })()
                
                document.documentElement.setAttribute('data-theme', theme)
                document.documentElement.classList.toggle('dark', theme === 'dark')
              })()
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-bricolage antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
