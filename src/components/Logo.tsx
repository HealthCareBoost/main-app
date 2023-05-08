"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export function Logo() {
  const { theme } = useTheme();
  return (
    <Image
      alt="logo"
      src={theme === "dark" ? "/assets/cook-dark.png" : "/assets/cook.png"}
      className="h-auto w-[172px]"
      height={172}
      width={172}
      style={{
        height: "auto",
        width: "172px",
      }}
      placeholder="blur"
      blurDataURL={"assets/cook.png"}
    />
  );
}
