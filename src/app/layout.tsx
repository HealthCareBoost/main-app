import "@/styles/globals.css";

import { type Metadata } from "next";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "LetMeCook",
  description: "LetMeCook",
  icons: [{ rel: "icon", url: "/orange.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
