import React from "react";

import dynamic from "next/dynamic";
import { styles } from "../styles/style";
// import { FooterSmall } from "./landing/LandingFooter";

export const LN = dynamic(
  () => import("../components/MainNav").then((mod) => mod.MainNav),
  { ssr: false }
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="h-full w-full dark:bg-primaryDark">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <LN />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Layout;
