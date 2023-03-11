import Image from "next/image";
import React from "react";
import { styles } from "../../styles/style";

const FeedbackCard: React.FC<{
  content: string;
  name: string;
  title: string;
  img: string;
}> = ({ content, name, title, img }) => (
  <div className="feedback-card my-5 mr-0 flex max-w-[370px] flex-col  justify-between rounded-[20px] px-10 py-12 sm:mr-5 md:mr-10">
    <Image
      width={42.6}
      height={27.6}
      src={"assets/quotes.svg"}
      alt="double_quotes"
      className="h-[27.6px] w-[42.6px] object-contain"
    />
    <p className="my-10 font-poppins text-[18px] font-normal leading-[32.4px] text-white">
      {content}
    </p>

    <div className="flex flex-row">
      <Image
        width={48}
        height={48}
        src={img}
        alt={name}
        className="h-[48px] w-[48px] rounded-full"
      />
      <div className="ml-4 flex flex-col">
        <h4 className="font-poppins text-[20px] font-semibold leading-[32px] text-white">
          {name}
        </h4>
        <p className="font-poppins text-[16px] font-normal leading-[24px] text-dimWhite">
          {title}
        </p>
      </div>
    </div>
  </div>
);

export const LandingFeedback: React.FC = () => {
  const feedback = [
    {
      id: "feedback-1",
      content:
        "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
      name: "Herman Jensen",
      title: "Founder & Leader",
      img: "/assets/people01.png",
    },
    {
      id: "feedback-2",
      content:
        "Money makes your life easier. If you're lucky to have it, you're lucky.",
      name: "Steve Mark",
      title: "Founder & Leader",
      img: "/assets/people02.png",
    },
    {
      id: "feedback-3",
      content:
        "It is usually people in the money business, finance, and international trade that are really rich.",
      name: "Kenn Gallagher",
      title: "Founder & Leader",
      img: "/assets/people03.png",
    },
  ];
  return (
    <section
      id="clients"
      className={`${styles.paddingY} ${styles.flexCenter} relative flex-col `}
    >
      <div className="blue__gradient absolute -right-[50%] bottom-40 z-[0] h-[60%] w-[60%] rounded-full" />

      <div className="relative z-[1] mb-6 flex w-full flex-col items-center justify-between sm:mb-16 md:flex-row">
        <h2 className={styles.heading2}>
          What People are <br className="hidden sm:block" /> saying about us
        </h2>
        <div className="mt-6 w-full md:mt-0">
          <p className={`${styles.paragraph} max-w-[450px] text-left`}>
            Everything you need to accept card payments and grow your business
            anywhere on the planet.
          </p>
        </div>
      </div>

      <div className="feedback-container relative z-[1] flex w-full flex-wrap justify-center sm:justify-start">
        {feedback.map((card) => (
          <FeedbackCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
};
