import React from "react";
import { styles } from "../styles/style";
import { LandingNavbar } from "../components/landing/LandingNavbar";
import { LandingStatsSection } from "../components/landing/LandingStats";
import { LandingBusinessSection } from "../components/landing/LandingBussinessSection";
import { LandingCTA } from "../components/landing/LandingCTA";
import { LandingFooter } from "../components/landing/LandingFooter";
import { LandingFeedback } from "../components/landing/LandingFeedback";
import { LandingBilling } from "../components/landing/LandingBlling";
import dynamic from "next/dynamic";

export const DynamicLandingHeroSection = dynamic(
  () =>
    import("@/src/components/landing/LandingHero").then(
      (mod) => mod.LandingHeroSection
    ),
  { ssr: false }
);

const Landing: React.FC = () => {
  return (
    <>
      <div className="w-full overflow-hidden dark:bg-primaryDark">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <LandingNavbar />
          </div>
        </div>

        <div className={`dark:bg-primaryDark ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <DynamicLandingHeroSection />
          </div>
        </div>

        <div
          className={`dark:bg-primaryDark ${styles.paddingX} ${styles.flexStart}`}
        >
          <div className={`${styles.boxWidth}`}>
            <LandingStatsSection />
            <LandingBusinessSection />
            <LandingBilling />
            <LandingFeedback />
            <LandingCTA />
            <LandingFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
