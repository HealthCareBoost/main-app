import Image from "next/image";
import React from "react";

export const Recipe: React.FC = () => {
  return (
    <>
      <div className="mt-4 flex items-center justify-center">
        <div className="mb-8 border-y border-y-gray-500 py-1 px-3">
          Recipe Preview
        </div>
      </div>

      <div className="h-full flex-1">
        <div className="mx-auto mt-8 w-full px-12 py-0">
          <h1 className="my-0 border-b border-b-gray-500 pb-1 uppercase">
            Chili Mac and Cheese
          </h1>
          <p
            id="description"
            className="my-0 mx-auto pb-8 pt-1 pr-3 text-left italic"
            // className="padding-bottom: 32px;"
          >
            Chili mac and cheese! Take two comfort food favorites and combine
            them into one cheesy skillet. Not too s picy, so perfect for a
            family meal (add hot sauce if you like heat!).
          </p>

          <div
            className="relative mb-2 w-full bg-slate-100"
            style={{ paddingTop: "50%" }}
          >
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
          <div className="grid grid-cols-12 gap-y-12">
            <div className="col-span-4 pl-4">
              <div>
                <div
                  className="break-words"
                  // style="word-break: break-word;"
                >
                  <a
                    target="blank"
                    href="https://www.simplyrecipes.com/recipes/beef_chili_mac_and_cheese/"
                    className="break-words font-bold"
                  >
                    Aaron Hutcherson
                  </a>
                </div>
                <div>Serves: 8</div>
              </div>
            </div>

            <div className="col-span-8 flex w-full items-start pl-10">
              <div className="pl-0 pr-4">
                <div className="break-words text-center text-lg font-bold uppercase tracking-wide	">
                  Prep
                </div>
                <div className="break-words text-center font-normal">
                  10 mins
                </div>
              </div>
              <div className="border-l-2 border-l-slate-300 px-4">
                <div className="break-words text-center text-lg font-bold uppercase">
                  Cook
                </div>
                <div className="break-words text-center font-normal">
                  45 mins
                </div>
              </div>
              <div className="border-l-2 border-l-slate-300 pl-4 pr-0">
                <div className="break-words text-center text-lg font-bold uppercase">
                  Total
                </div>
                <div
                  data-testid="recipe-time-value-2"
                  className="break-words text-center font-normal"
                >
                  55 mins
                </div>
              </div>
            </div>

            <div className="col-span-4 pl-4">
              <div className="relative mt-1 grid h-auto auto-cols-auto gap-y-4 first:pt-0">
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
            </div>

            <div className="col-span-8">
              <ul className="ml-8 mb-3 mt-0 max-w-xl list-none p-0 pl-3 font-normal">
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
