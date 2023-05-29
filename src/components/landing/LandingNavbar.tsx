import React from "react";
import { LandingNavLinks } from "../../utils/NavlinksTypes";
import { MobileNav } from "../MobileNav";
import ThemeButton from "../ui/ChangeThemeButton";
import { LandingLoginButton } from "./LandingButton";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { UserAccountNav } from "@/src/components/user/UserProfileNav";

export const DynamicLogo = dynamic(
  () => import("@/src/components/Logo").then((mod) => mod.Logo),
  { ssr: false }
);

export const LandingNavbar: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="navbar flex w-full items-center justify-between py-6">
      <DynamicLogo />
      <ul className="hidden flex-1 list-none items-center justify-start sm:flex">
        {LandingNavLinks.map((nav) => (
          <li
            key={`${nav.id}`}
            className={`ml-10 cursor-pointer
          font-poppins text-[16px] font-medium text-primaryDark hover:text-orange-400
          dark:font-normal dark:text-white`}
          >
            <a href={`${nav.href}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      <div className="ml-auto hidden flex-row items-center justify-evenly sm:flex">
        {sessionData && sessionData.user ? (
          <UserAccountNav
            className="mx-2 h-8 w-8"
            user={{ ...sessionData.user }}
          />
        ) : (
          <LandingLoginButton />
        )}
        <ThemeButton />
      </div>

      <MobileNav items={LandingNavLinks} />
    </nav>
  );
};
