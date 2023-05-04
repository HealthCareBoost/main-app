import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import { LandingNavLinks } from "../../utils/NavlinksTypes";
import { MobileNav } from "../MobileNav";
import ThemeButton from "../ui/ChangeThemeButton";
import { LandingLoginButton } from "./LandingButton";

export const LandingNavbar: React.FC = () => {
  const { theme } = useTheme();

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
        <div className="ml-auto flex flex-row items-center justify-evenly">
          <LandingLoginButton />
          <ThemeButton />
        </div>
      </ul>

      <MobileNav items={LandingNavLinks} />
    </nav>
  );
};
