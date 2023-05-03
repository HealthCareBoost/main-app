import Image from "next/image";
import React, { useState } from "react";
import { styles } from "../../styles/style";
import ThemeButton from "../ui/ChangeThemeButton";
import { useTheme } from "next-themes";
import { CloseMenuIcon, MenuIcon } from "../svgs/Menu";
import { LandingNavLinks } from "../../utils/NavlinksTypes";
import { LandingButton } from "./LandingButton";
import Link from "next/link";

export const LandingNavbar: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
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
          <button className="bg-orange-gradient primaryDark mx-2 flex items-center rounded-md py-3 px-5 text-center align-middle font-poppins text-[16px] font-medium outline-none transition-colors dark:text-primaryDark sm:text-sm">
            <Link type="button" href={"/login"} className={""}>
              Login
            </Link>
          </button>
          <ThemeButton />
        </div>
      </ul>

      <div className="z-50 flex flex-1 items-center justify-end sm:hidden">
        <ThemeButton styles={`${styles.marginX}`} />
        {toggle ? (
          <CloseMenuIcon
            className="h-[28px] w-[28px] object-contain"
            onClick={() => {
              setToggle((prev) => !prev);
            }}
            fill={theme === "dark" ? "#fff" : "#000"}
          />
        ) : (
          <MenuIcon
            className="h-[28px] w-[28px] object-contain"
            onClick={() => {
              setToggle((prev) => !prev);
            }}
            fill={theme === "dark" ? "#fff" : "#000"}
          />
        )}
        {/* dark bg-black is not working */}
        {/* dark:bg-black-gradient bg-white-gradient */}
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } min-w[140px] sidebar absolute top-20 right-0 mx-4 my-2 rounded-xl p-6
          ${theme === "dark" ? "bg-black-gradient" : "bg-slate-200"}`}
        >
          <ul className="flex list-none flex-col items-center justify-end">
            <li
              className={`mb-4 cursor-pointer
          font-poppins text-[16px] font-medium text-primaryDark  hover:text-orange-400 dark:font-normal dark:text-white dark:hover:text-orange-400`}
            >
              <Link href={"/login"}>Login</Link>
            </li>
            {LandingNavLinks.map((nav, idx) => (
              <li
                key={`${nav.id}`}
                className={`cursor-pointer font-poppins
          text-[16px] font-medium text-primaryDark hover:text-orange-400  dark:font-normal dark:text-white dark:hover:text-orange-400
          ${idx === LandingNavLinks.length - 1 ? "mb-0" : "mb-4"}`}
              >
                <a href={`${nav.href}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
