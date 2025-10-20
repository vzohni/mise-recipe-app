import type { Metadata } from "next";
import { Fraunces, Roboto_Flex } from 'next/font/google'
import "./globals.css";

const fraunces = Fraunces({ 
  subsets: ['latin'],
  variable: '--font-fraunces',
})

const robotoFlex = Roboto_Flex({ 
  subsets: ['latin'],
  variable: '--font-roboto-flex',
})

export const metadata: Metadata = {
  title: "Mise Recipe App",
  description: "Recipe Portfolio App built with Next.js and Tailwind CSS by Victor Zohni",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${robotoFlex.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
