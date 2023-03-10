import Image from "next/image";
import React from "react";
import { layout, styles } from "../../styles/style";
import { LandingButton } from "./LandingButton";

const FeatureCard: React.FC<{
  id: string;
  icon: string;
  title: string;
  content: string;
  isLastElement: boolean;
}> = ({ id, icon, content, title, isLastElement }) => {
  return (
    <div
      className={`flex flex-row rounded-[20px] p-6 ${
        isLastElement ? "mb-0" : "mb-6"
      } feature-card`}
    >
      <div
        className={`h-[64px] w-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
      >
        <Image
          src={icon}
          width={100}
          height={100}
          sizes={"50%"}
          alt="icon"
          className="h-[50%] w-[50%] object-contain"
        />
      </div>
      <div className="ml-3 flex flex-1 flex-col">
        <h4 className="mb-1 font-poppins text-[18px] font-semibold leading-[23px] text-white">
          {title}
        </h4>
        <p className="mb-1 font-poppins text-[18px] font-normal leading-[24px] text-dimWhite">
          {content}
        </p>
      </div>
    </div>
  );
};

export const LandingBusinessSection: React.FC = () => {
  const features = [
    {
      id: "feature-1",
      icon: "assets/Star.svg",
      title: "Rewards",
      content:
        "The best credit cards offer some tantalizing combinations of promotions and prizes",
    },
    {
      id: "feature-2",
      icon: "assets/Shield.svg",
      title: "100% Secured",
      content:
        "We take proactive steps make sure your information and transactions are secure.",
    },
    {
      id: "feature-3",
      icon: "assets/Send.svg",
      title: "Balance Transfer",
      content:
        "A balance transfer credit card can save you a lot of money in interest charges.",
    },
  ];

  return (
    <section id="features" className={`${layout.section}`}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          You do the work, <br className="hidden sm:block" /> we&apos;ll handle
          it.
        </h2>
        <p className={`${styles.paragraph} mt-5 max-w-[470px]`}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt,
          perferendis corporis nisi officia dolor consequuntur in aperiam? Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Libero aliquam
          quasi consectetur possimus porro inventore amet quidem culpa
          praesentium doloribus provident.
        </p>
        <LandingButton styles="mt-10" text="Get Started" />
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, idx) => (
          <FeatureCard
            key={feature.id}
            {...feature}
            isLastElement={idx === features.length - 1}
          />
        ))}
      </div>
    </section>
  );
};
