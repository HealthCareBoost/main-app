/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { styles } from "../styles/style";
import { LandingNavbar } from "../components/landing/LandingNavbar";
import { LandingHeroSection } from "../components/landing/LandingHero";
import { LandingStatsSection } from "../components/landing/LandingStats";
import { LandingBusinessSection } from "../components/landing/LandingBussinessSection";

const Landing: React.FC = () => {
  return (
    <>
      <div className="w-full overflow-hidden bg-primary">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <LandingNavbar />
          </div>
        </div>

        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <LandingHeroSection />
          </div>
        </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <LandingStatsSection />
          </div>
        </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <LandingBusinessSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
