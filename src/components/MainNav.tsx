"use client";

import * as React from "react";
import { MobileNav } from "./MobileNav";
import { MainNavLinks } from "../utils/NavlinksTypes";
import ThemeButton from "./ui/ChangeThemeButton";
import { UserAccountNav } from "./user/UserProfileNav";
import { LandingLoginButton } from "./landing/LandingButton";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

interface MainNavProps {
  children?: React.ReactNode;
}

export const DynamicLogo = dynamic(
  () => import("../components/Logo").then((mod) => mod.Logo),
  { ssr: false }
);

export function MainNav({}: MainNavProps) {
  //   const segment = useSelectedLayoutSegment();
  // const user = getCurrentUser().then((res) => console.log(res));
  const { data: sessionData } = useSession();
  // console.log(sessionData);
  // console.log(sessionData?.user);

  return (
    <nav className="navbar flex w-full items-center justify-between py-6">
      <DynamicLogo />
      <ul className="hidden flex-1 list-none items-center justify-start text-center sm:flex">
        {MainNavLinks.map((nav) => (
          <li
            key={`${nav.id}`}
            className={`ml-6 cursor-pointer font-poppins
        text-[16px] font-medium text-primaryDark hover:text-orange-400 dark:font-normal
        dark:text-white lg:ml-10`}
          >
            <a href={`${nav.href}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      <div className="ml-auto hidden flex-row items-center sm:flex">
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
      <MobileNav items={MainNavLinks} />
    </nav>
  );
}
