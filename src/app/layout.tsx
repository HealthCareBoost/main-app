import "@/styles/globals.css";

import { type Metadata } from "next";
import Providers from "@/components/Providers";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "LetMeCook",
  generator: "Next.js",
  applicationName: "LetMeCook",
  referrer: "origin-when-cross-origin",
  creator: "Genadi Tsolov",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: ["Next.js", "React", "JavaScript", "Cooking", "Cookbook", "Meals"],
  description: "LetMeCook",
  icons: [{ rel: "icon", url: "/orange.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="#fb923c" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
