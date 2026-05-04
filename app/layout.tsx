import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" })

const OG_IMAGE =
  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&h=630&q=85"

export const metadata: Metadata = {
  metadataBase: new URL("https://vibebistro.vercel.app"),
  title: "VIBE*BISTRO — No Cap, Just Flavor",
  description:
    "Serving 70s aesthetics with a modern twist. Locally sourced, highkey delicious, and strictly for the vibers. Open until 2AM.",
  keywords: ["restaurant", "bistro", "food", "cocktails", "retro", "vibes", "Ghana", "Accra"],
  openGraph: {
    title: "VIBE*BISTRO — No Cap, Just Flavor",
    description:
      "Serving 70s aesthetics with a modern twist. Locally sourced, highkey delicious, and strictly for the vibers.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "VIBE*BISTRO — a retro-futurist restaurant experience",
      },
    ],
    type: "website",
    locale: "en_GH",
    siteName: "VIBE*BISTRO",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIBE*BISTRO — No Cap, Just Flavor",
    description:
      "Serving 70s aesthetics with a modern twist. Locally sourced, highkey delicious. Open until 2AM.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Playfair+Display:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#ff4d00" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${spaceGrotesk.className} antialiased`}>{children}</body>
    </html>
  )
}
