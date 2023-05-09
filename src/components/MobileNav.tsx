import * as React from "react";
import Link from "next/link";
import { useLockBody } from "../hooks/useLockBody";
import ThemeButton from "./ui/ChangeThemeButton";
import { styles } from "../styles/style";
import type { NavItem } from "../utils/NavlinksTypes";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

interface MobileNavProps {
  items: NavItem[];
  children?: React.ReactNode;
}

export const DynamicCloseMenuIcon = dynamic(
  () => import("./svgs/Menu").then((mod) => mod.CloseMenuIcon),
  { ssr: false }
);

export const DynamicMenuIcon = dynamic(
  () => import("./svgs/Menu").then((mod) => mod.MenuIcon),
  { ssr: false }
);

export function MobileNav({ children, items }: MobileNavProps) {
  // useLockBody();
  const { data: sessionData } = useSession();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="z-50 flex flex-1 items-center justify-end sm:hidden">
      <ThemeButton styles={`${styles.marginX}`} />
      {showMobileMenu ? (
        <DynamicCloseMenuIcon
          onClick={() => {
            setShowMobileMenu((prev) => !prev);
          }}
        />
      ) : (
        <DynamicMenuIcon
          onClick={() => {
            setShowMobileMenu((prev) => !prev);
          }}
        />
      )}
      <div
        className={`${
          showMobileMenu ? "flex" : "hidden"
        } min-w[140px] sidebar absolute top-20 right-0 mx-4 my-2 rounded-xl bg-slate-200 p-6 dark:bg-slate-800`}
      >
        <ul className="flex list-none flex-col items-center justify-end">
          <li
            className={`mb-4 cursor-pointer
          font-poppins text-[16px] font-medium text-primaryDark  hover:text-orange-400 dark:font-normal dark:text-white dark:hover:text-orange-400`}
          >
            {sessionData && sessionData.user ? (
              <Link href={`/user/${sessionData.user.id}`}>My Profile</Link>
            ) : (
              <Link href={"/login"}>Login</Link>
            )}
          </li>

          {items.map((nav, idx) => (
            <li
              key={`${nav.id}`}
              className={`cursor-pointer font-poppins
    text-[16px] font-medium text-primaryDark hover:text-orange-400  dark:font-normal dark:text-white dark:hover:text-orange-400
    ${idx === items.length - 1 ? "mb-0" : "mb-4"}`}
            >
              <a href={`${nav.href}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
