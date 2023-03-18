import { useTheme } from "next-themes";
import React from "react";
import { styles } from "../../styles/style";
import { LandingButton } from "./LandingButton";

export const LandingCTA: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding}
      ${
        theme === "dark"
          ? "bg-black-gradient-2"
          : "border border-orange-400 bg-dimWhite"
      }
              box-shadow flex-col rounded-[20px] sm:flex-row`}
    >
      <div className="flex flex-1 flex-col">
        <h2 className={`${styles.heading2}`}>Try our service now!</h2>
        <p className={`${styles.paragraph} mt-5 max-w-[470px]`}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
          eveniet modi labore qui cupiditate autem sapiente corrupti, sequi sint
          exercitationem dicta sit.
        </p>
      </div>
      <div className={`${styles.flexCenter} ml-0 mt-10 sm:ml-10 sm:mt-0`}>
        <LandingButton text="Get Started" />
      </div>
    </section>
  );
};
