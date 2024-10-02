"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "../components/ui/Toaster";
import { type PropsWithChildren } from "react";
import { TRPCReactProvider } from "@/utils/trpc/react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <TRPCReactProvider>
        <ThemeProvider
          enableSystem={true}
          defaultTheme="dark"
          attribute="class"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </TRPCReactProvider>
    </SessionProvider>
  );
};

export default Providers;
