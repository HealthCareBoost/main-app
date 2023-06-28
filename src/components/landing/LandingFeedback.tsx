import Image from "next/image";
import React from "react";
import { styles } from "../../styles/style";

const FeedbackCard: React.FC<{
  content: string;
  name: string;
  title: string;
  img: string;
}> = ({ content, name, title, img }) => {
  return (
    <div
      // hover:bg-black-gradient bg-transparent
      className={`
          md:mr-10" my-5 mr-0 flex max-w-[370px] flex-col justify-between rounded-[20px] border border-orange-400 bg-dimWhite px-10 py-12 hover:bg-slate-200 dark:bg-transparent dark:hover:bg-blackGradient sm:mr-5`}
    >
      <Image
        width={42.6}
        height={27.6}
        src={"assets/quotes.svg"}
        alt="double_quotes"
        className="h-[27.6px] w-[42.6px] object-contain"
      />
      <p className="my-10 font-poppins text-[18px] font-normal leading-[32.4px] text-primaryDark dark:text-white">
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
          <h4 className="font-poppins text-[20px] font-semibold leading-[32px] text-orange-400">
            {name}
          </h4>
          <p className="font-poppins text-[16px] font-normal leading-[24px] text-dimDark dark:text-dimWhite">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export const LandingFeedback: React.FC = () => {
  const feedback = [
    {
      id: "feedback-1",
      content:
        "This is the best tool for managing your diet. I feel more in control of my nutrition and enjoy trying new dishes I wouldn't have discovered otherwise.",
      name: "Herman Jensen",
      title: "Founder & Leader",
      img: "/assets/people01.png",
    },
    {
      id: "feedback-2",
      content:
        "This app makes your life easier and using it has been a game-changer for me. It takes the stress out of figuring out what to cook every day and helps me stick to a healthier eating routine.",
      name: "Steve Mark",
      title: "Founder & Leader",
      img: "/assets/people02.png",
    },
    {
      id: "feedback-3",
      content:
        "I'm a busy professional, and the meal planner has been a lifesaver for me. It helps me stay organized, save time, and make healthier choices. I love it.",
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
            Everything you need to organize schedule your meals in advance and
            never stop eating healthy.
          </p>
        </div>
      </div>

      <div className="feedback-container relative z-[1] flex w-full flex-wrap justify-center md:justify-between">
        {feedback.map((card) => (
          <FeedbackCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
};
