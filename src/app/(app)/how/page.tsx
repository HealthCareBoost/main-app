import { Separator } from "@/components/ui/Separator";
import { styles } from "@/styles/style";
import { LandingButton } from "@/components/landing/LandingButton";

const HowItWorksPage = () => {
  const howSteps = [
    {
      title: "Save Recipes",
      description:
        "The app provides a centralized platform where users can easily save and organize their recipes, plan meals, and track their grocery needs.",
    },
    {
      title: "Discover New",
      description:
        "The app offers an extensive catalog of recipes that users can choose from and incorporate into their meal plan.",
    },
    {
      title: "Plan Your Meals",
      description:
        "We want our users to access their meal plans and recipes anytime, anywhere, providing convenience and flexibility in managing their meals.",
    },
  ];

  return (
    <main
      className={`my-8 h-full rounded-3xl border-l-2 border-t-2 border-orange-400 p-4`}
    >
      <div
        className={`${styles.boxWidth} mx-auto flex flex-col items-center justify-center bg-white dark:bg-bgDark`}
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <section className="my-auto flex h-1/2 flex-col items-center justify-center gap-4 px-4 text-center">
            <h1 className={`${styles.heading2} uppercase`}>How it works?</h1>
            <Separator className="my-1 w-4/5 bg-orange-400 dark:bg-orange-400" />
            <p>
              Our meal planning application is a powerful tool, that help users
              achieve balance and good nutrition. With its intuitive
              functionalities and personalized solutions, the app supports users
              to make healthy food decisions and enjoy well-planned and tasty
              meals!
            </p>
            <div className={"my-4"}>
              <LandingButton text="Get Started" />
            </div>
          </section>
          <section className="py-4 pl-4 pr-4 sm:pl-0">
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
