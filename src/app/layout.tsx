import "@/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "@/utils/trpc/react";

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
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
