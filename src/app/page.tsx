import {
  LandingBusinessSection,
  LandingCTA,
  LandingFeedback,
  LandingFooter,
  LandingStatsSection,
  LandingShowcase,
} from "@/components/landing/index";

import { styles } from "@/styles/style";
import dynamic from "next/dynamic";

export const DynamicLandingHeroSection = dynamic(
  () =>
    import("@/components/landing/LandingHero").then(
      (mod) => mod.LandingHeroSection,
    ),
  { ssr: false },
);
const LandingPage = () => {
  return (
    <>
      <div className="w-full overflow-hidden dark:bg-primaryDark">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>{/* <LandingNavbar /> */}</div>
        </div>

        <div className={`dark:bg-primaryDark ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            {/* <DynamicLandingHeroSection /> */}
          </div>
        </div>

        <div
          className={`dark:bg-primaryDark ${styles.paddingX} ${styles.flexStart}`}
        >
          <div className={`${styles.boxWidth}`}>
            <LandingStatsSection />
            <LandingBusinessSection />
            <LandingShowcase />
            <LandingFeedback />
            <LandingCTA />
            <LandingFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
