import { MainNav } from "@/components/MainNav";
import { styles } from "@/styles/style";
import { type PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="container relative h-full w-full dark:bg-primaryDark">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <MainNav />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Layout;
