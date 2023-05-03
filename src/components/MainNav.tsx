"use client";

import * as React from "react";
import { MobileNav } from "./MobileNav";
import Image from "next/image";
import { useTheme } from "next-themes";
import { MainNavLinks } from "../utils/NavlinksTypes";
import ThemeButton from "./ui/ChangeThemeButton";
import { UserAccountNav } from "./user/UserProfileNav";
import { LandingLoginButton } from "./landing/LandingButton";
import { useSession } from "next-auth/react";

interface MainNavProps {
  children?: React.ReactNode;
}

export function MainNav({}: MainNavProps) {
  //   const segment = useSelectedLayoutSegment();
  const { theme } = useTheme();
  const { data: sessionData } = useSession();

  return (
    <nav className="navbar flex w-full items-center justify-between py-6">
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

      <ul className="hidden flex-1 list-none items-center justify-start sm:flex">
        {MainNavLinks.map((nav) => (
          <li
            key={`${nav.id}`}
            className={`ml-10 cursor-pointer
        font-poppins text-[16px] font-medium text-primaryDark hover:text-orange-400
        dark:font-normal dark:text-white`}
          >
            <a href={`${nav.href}`}>{nav.title}</a>
          </li>
        ))}
        <div className="ml-auto flex flex-row items-center">
          {sessionData && sessionData.user ? (
            <UserAccountNav
              className="mx-2 h-8 w-8"
              user={{ ...sessionData.user }}
            />
          ) : (
            <LandingLoginButton />
          )}
          <ThemeButton styles="mx-2" />
        </div>
      </ul>
      <MobileNav items={MainNavLinks} />
    </nav>
  );
}
