import Image from "next/image";
import React from "react";
import { styles } from "../../styles/style";

export const Recipe: React.FC = () => {
  return (
    <>
      {/* <div className="mt-4 flex items-center justify-center">
        <div className="mb-8 border-y border-y-gray-500 py-1 px-3">
          Recipe Preview
        </div>
      </div> */}
      <div className="flex-1">
        <div className="mx-auto mt-8 w-full px-8 py-0">
          <h1
            className={`my-0 border-b border-b-slate-500 pb-2 uppercase ${styles.heading2}`}
          >
            Chili Mac and Cheese
          </h1>
          <p
            id="description"
            className={`${styles.paragraph} my-0 mx-auto pb-8 pt-1 pr-3 text-left italic`}
          >
            Chili mac and cheese! Take two comfort food favorites and combine
            them into one cheesy skillet. Not too s picy, so perfect for a
            family meal (add hot sauce if you like heat!). Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ipsum laborum pariatur aliquam, a
            cum dolorem quod doloribus nam consectetur molestiae dicta sunt.
            Earum, sint cupiditate iste cumque nobis assumenda maxime!
          </p>

          <div className="relative mb-2 w-full bg-slate-100 pt-[50%]">
            <div className="absolute top-0 right-0 flex h-full w-full items-center justify-center overflow-hidden">
              <Image
                className="h-auto w-full"
                src={
                  "https://mysaffronappgc.imgix.net/1676446384966-nFn7yyLwu.jpeg?max-h=800&max-w=1600&fit=crop&auto=compress&ixlib=js-2.3.1&s=953ad10063b1c2d22c5a429aed1fcc89"
                }
                alt={"meal"}
                fill
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="my-4 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
              <div
                className={`my-4 sm:my-2 md:pl-8`}
                // className="col-span-4 md:pl-4"
              >
                <div
                  className="break-words"
                  // style="word-break: break-word;"
                >
                  <a
                    target="blank"
                    href="https://www.simplyrecipes.com/recipes/beef_chili_mac_and_cheese/"
                    className="break-words font-poppins text-[20px] font-bold leading-[32px]"
                  >
                    Aaron Hutcherson
                  </a>
                </div>
                <div className="font-poppins text-[16px] font-normal leading-[24px] text-dimDark dark:text-dimWhite">
                  Serves: 8
                </div>
              </div>

              <div
                className="my-4 flex items-start sm:my-2 md:mr-8 md:pl-10"
                // className="col-span-8 flex w-full items-start md:pl-10"
              >
                <div className="pl-0 pr-4">
                  <div className="break-words text-center font-poppins text-lg text-[20px] font-bold uppercase leading-[32px] tracking-wide">
                    Prep
                  </div>
                  <div className="break-words text-center font-poppins text-[16px] font-normal leading-[24px] text-dimDark dark:text-dimWhite">
                    10 mins
                  </div>
                </div>
                <div className="border-l-2 border-l-slate-300 px-4">
                  <div className="break-words text-center font-poppins text-lg text-[20px] font-bold uppercase leading-[32px] tracking-wide">
                    Cook
                  </div>
                  <div className="break-words text-center font-poppins text-[16px] font-normal leading-[24px] text-dimDark dark:text-dimWhite">
                    45 mins
                  </div>
                </div>
                <div className="border-l-2 border-l-slate-300 pl-4 pr-0">
                  <div className="break-words text-center font-poppins text-lg text-[20px] font-bold uppercase leading-[32px] tracking-wide">
                    Total
                  </div>
                  <div
                    data-testid="recipe-time-value-2"
                    className="break-words text-center font-poppins text-[16px] font-normal leading-[24px] text-dimDark dark:text-dimWhite"
                  >
                    55 mins
                  </div>
                </div>
              </div>
            </div>

            <div
              className="my-4 flex w-full flex-col items-center sm:flex-row sm:justify-between sm:pl-4"
              // className="my-4 w-full grid-cols-12 gap-y-12 sm:pl-4"
            >
              <div
                // className="relative col-span-12 mt-1 grid h-auto auto-cols-auto gap-y-4 first:pt-0 sm:col-span-6 sm:flex sm:flex-col sm:items-center sm:justify-center">
                className="relative mx-4 mt-1 h-auto first:pt-0 sm:flex sm:flex-col sm:items-center sm:justify-center"
              >
                {Array.from("aaa").map((e, idx) => (
                  <div key={`${e}${idx}`} className="text-justify sm:text-left">
                    <div className="cursor-default break-words">
                      <span className="font-bold text-slate-700"></span>
                      For the chili:
                    </div>
                    <div className="cursor-default break-words">
                      <span className="font-bold text-slate-700">2 cups </span>
                      uncooked elbow pasta
                    </div>
                    <div className="cursor-default break-words">
                      <span className="font-bold text-slate-700">
                        1 tablespoon{" "}
                      </span>
                      vegetable oil
                    </div>
                  </div>
                ))}
              </div>
              <div
                // className="relative col-span-12 mt-1 grid h-auto auto-cols-auto gap-y-4 first:pt-0 sm:col-span-6 sm:flex sm:flex-col sm:items-center sm:justify-center">
                className="relative mx-4 mt-1 h-auto first:pt-0 sm:flex sm:flex-col sm:items-center sm:justify-center"
              >
                {Array.from("aaa").map((e, idx) => (
                  <div key={`${e}${idx}`} className="text-justify sm:text-left">
                    <div className="cursor-default break-words">
                      <span className="font-bold text-slate-700"></span>
                      For the chili:
                    </div>
                    <div className="cursor-default break-words">
                      <span className="font-bold text-slate-700">2 cups </span>
                      uncooked elbow pasta
                    </div>
                    <div className="cursor-default break-words">
                      <span className="font-bold text-slate-700">
                        1 tablespoon{" "}
                      </span>
                      vegetable oil
                    </div>
                  </div>
                ))}
              </div>{" "}
            </div>

            <div className="my-4 w-full sm:pl-4">
              <ul
                className={`${styles.paragraph} mb-3 mt-0 list-none p-2 pl-0 font-normal text-primaryDark dark:text-white`}
              >
                <li>Preheat the oven: Preheat the oven to 400°F.</li>
                <li className="pb-2 pt-2">
                  Cook the pasta: Bring a large pot of salted water to a boil,
                  and cook the pasta until al dente. Drain, rinse with cold
                  water, and set aside.
                </li>
                <li className="pb-2 pt-2">
                  Make the chili: Heat the oil in a large (12-inch) oven-safe
                  skillet over medium heat. Add the onions and cook until
                  softened, 2 to 3 minutes. Add the tomatoes and cook until they
                  have broken down slightly and some of the liquid has
                  evaporated, 3 to 5 minutes more. Add the ground beef, black
                  pepper, 1 tablespoon chili powder, and 1 tablespoon salt to
                  the onion-tomato mixture. Cook, breaking up the ground beef
                  with a wooden spoon, until brown and fully cooked, 5 to 8
                  minutes. Remove from heat.
                </li>
                <li className="pb-2 pt-2">
                  Make the cheese sauce: Melt 2 tablespoons of butter in a
                  saucepan over medium heat. Add the flour and cook, stirring
                  occasionally, until bubbly and slightly golden, 1 to 2
                  minutes. Slowly whisk the milk into the butter-flour mixture.
                  At first, the mixture will seize up and look crumbly, but will
                  smooth out as you keep adding milk and whisking. Once all the
                  milk is added, bring to a simmer. Whisk frequently and scrape
                  along the bottom of the pan, so it doesn&apos;t burn. Cook
                  until the sauce has thickened slightly and seems creamy, 10 to
                  15 minutes. Remove from the heat, and add the shredded cheese
                  and mustard. Stir until the cheese has melted. Taste and add
                  salt and pepper as needed.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
