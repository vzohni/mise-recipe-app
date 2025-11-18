import { Fraunces, Roboto_Flex } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
  title: "Mise - Find Your Next Dish",
  description:
    "Create, save, and discover recipes. A modern recipe management app built with Next.js and Supabase.",
  keywords: ["recipes", "cooking", "food", "meal planning", "recipe app"],
  authors: [{ name: "Victor Zohni" }],
  creator: "Victor Zohni",
  metadataBase: new URL("https://mise-recipe-app.vercel.app"), // Update with your actual Vercel URL once deployed
  openGraph: {
    title: "Mise - Find Your Next Dish",
    description: "Browse, create, and save your favorite recipes.",
    url: "https://mise-recipe-app.vercel.app",
    siteName: "Mise",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mise Recipe App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mise - Find Your Next Dish",
    description: "Browse, create, and save your favorite recipes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${robotoFlex.variable} antialiased`}>{children}</body>
    </html>
  );
}
