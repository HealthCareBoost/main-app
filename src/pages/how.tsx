import React from "react";
import Layout from "../components/Layout";
import { Separator } from "../components/ui/Separator";
import { styles } from "../styles/style";
import { LandingButton } from "../components/landing/LandingButton";

const HowItWorksPage = () => {
  const howSteps = [
    {
      title: "Save Recipes",
      description:
        "You can get ETH, the digital currency that fuels transactions on the Ethereum blockchain, from a digital currency exchange",
    },
    {
      title: "Discover New",
      description:
        "A crypto wallet, such as MetaMask, stores your ETH and processes transactions on the Ethereum blockchain.",
    },
    {
      title: "Plan Ahead",
      description:
        "Let's connect your wallet to BUM, edit your profile, and begin interacting in the space.",
    },
  ];

  return (
    <Layout>
      <main
        className={`my-8 h-full rounded-3xl border-t-2 border-l-2 border-orange-400 p-4`}
      >
        <div
          className={`${styles.boxWidth} mx-auto flex flex-col items-center justify-center bg-white dark:bg-bgDark`}
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <section className="my-auto flex h-1/2 flex-col items-center justify-center gap-2 px-4 text-center">
              <h1 className={`${styles.heading2} uppercase`}>How it works?</h1>
              <Separator className="my-1 w-4/5 bg-orange-400" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                vitae incidunt dolore id labore eum? Laborum non repudiandae
                deleniti vitae, sunt nesciunt. Cupiditate, in! Vel suscipit
                placeat aut pariatur labore.
              </p>
              <div className={"my-4"}>
                <LandingButton text="Get Started" />
              </div>
            </section>
            <section className="py-4 pr-4 pl-4 sm:pl-0">
              {howSteps.map((step, idx) => (
                <HowStep
                  key={`${step.title}${idx + 1}`}
                  title={step.title}
                  description={step.description}
                  number={idx + 1}
                />
              ))}
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
};

const HowStep: React.FC<{
  number: number;
  title: string;
  description: string;
}> = ({ description, number, title }) => {
  return (
    <div className={"mb-5 flex items-center justify-center rounded-lg"}>
      <div
        className={
          "flex h-52 w-1/3 flex-none items-center justify-center rounded-l-3xl bg-orange-400 p-10"
        }
      >
        <div className={"text-center text-3xl font-bold"}>{number}</div>
      </div>

      <div
        className={
          "flex h-52 flex-col justify-center rounded-r-3xl border-2 border-orange-400 pl-4"
        }
      >
        <h4
          className={`w-full font-poppins text-2xl font-semibold uppercase text-primaryDark dark:text-white lg:text-4xl`}
        >
          {title}
        </h4>
        <p className={`${styles.paragraph} list-none p-2 pl-0 md:text-lg`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default HowItWorksPage;
