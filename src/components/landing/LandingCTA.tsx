import React from "react";
import { styles } from "../../styles/style";
import { LandingButton } from "./LandingButton";

export const LandingCTA: React.FC = () => {
  return (
    <section
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding}
      box-shadow flex-col rounded-[20px] border border-orange-400 bg-dimWhite dark:bg-blackGradient2 sm:flex-row`}
    >
      <div className="flex flex-1 flex-col">
        <h2 className={`${styles.heading2}`}>Try our service now!</h2>
        <p className={`${styles.paragraph} mt-5 max-w-[470px]`}>
          Embark on your culinary adventure by creating your profile! It&apos;s
          quick and easy. Simply click the button, and you&apos;ll be on your
          way to discovering a world of delightful recipes, meal planning, and
          more. Your profile is your passport to the flavors of LetMeCook. Join
          our community of food enthusiasts, and let&apos;s savor the art of
          cooking together.
        </p>
      </div>
      <div className={`${styles.flexCenter} ml-0 mt-10 sm:ml-10 sm:mt-0`}>
        <LandingButton text="Get Started" />
      </div>
    </section>
  );
};
