import Image from "next/image";
import React, { useState } from "react";
import { styles } from "../../styles/style";
import ThemeButton from "../ui/ChangeThemeButton";

export const LandingNavbar: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const navLinks = [
    {
      id: "home",
      title: "Home",
    },
    {
      id: "features",
      title: "Features",
    },
    {
      id: "product",
      title: "Product",
    },
    {
      id: "clients",
      title: "Clients",
    },
  ];

  return (
    <nav className="navbar flex w-full items-center justify-between py-6">
      <Image
        alt="logo"
        src={"assets/logo.svg"}
        className="w-[124px]"
        height={124}
        width={124}
      />

      <ul className="hidden flex-1 list-none items-center justify-end sm:flex">
        {navLinks.map((nav) => (
          <li
            key={`${nav.id}`}
            className={`mr-10 cursor-pointer
          font-poppins text-[16px] font-normal text-white
          hover:text-orange-400`}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
        <ThemeButton styles="" />
      </ul>

      <div className="flex flex-1 items-center justify-end sm:hidden">
        <ThemeButton styles={`${styles.marginX}`} />
        <Image
          src={toggle ? "assets/close.svg" : "assets/menu.svg"}
          alt="menu"
          height={28}
          width={28}
          className="h-[28px] w-[28px] object-contain"
          onClick={() => {
            setToggle((prev) => !prev);
          }}
        />
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } bg-black-gradient min-w[140px] sidebar absolute top-20 right-0 mx-4 my-2 rounded-xl p-6`}
        >
          <ul className="flex list-none flex-col items-center justify-end">
            {navLinks.map((nav, idx) => (
              <li
                key={`${nav.id}`}
                className={`cursor-pointer font-poppins
          text-[16px] font-normal text-white hover:text-orange-400
          ${idx === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
