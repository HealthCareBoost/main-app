/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { styles } from "../styles/style";
import { LandingNavbar } from "../components/landing/LandingNavbar";
import { LandingHeroSection } from "../components/landing/LandingHero";
import { LandingStatsSection } from "../components/landing/LandingStats";
import { LandingBusinessSection } from "../components/landing/LandingBussinessSection";
import { LandingCTA } from "../components/landing/LandingCTA";
import { LandingFooter } from "../components/landing/LandingFooter";
import { LandingFeedback } from "../components/landing/LandingFeedback";
import { LandingBilling } from "../components/landing/LandingBlling";

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
            <LandingHeroSection />
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
