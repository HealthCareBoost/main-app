import { notFound } from "next/navigation";

export const dashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};

// import { DashboardNav } from "@/components/nav";
import { UserAccountNav } from "../components/UserProfileNav";
import { MainNav } from "../components/MainNav";
import { DashboardNav } from "../components/DashboardNav";
import { api } from "../utils/api";
import { styles } from "../styles/style";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  //   const user = await getCurrentUser();
  const user = { name: "GT", image: null, email: "test@email.com" };

  const { data } = api.ingredients.getNutrintion.useQuery({
    ingredient_id: 25,
  });
  console.log(data);

  if (!user) {
    return notFound();
  }

  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      {/* <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside> */}
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <div className="bg-white">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                <li>
                  <div className="flex items-center">
                    <a
                      href="#"
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      Men
                    </a>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <a
                      href="#"
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      Clothing
                    </a>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>

                <li className="text-sm">
                  <a
                    href="#"
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    Basic Tee 6-Pack
                  </a>
                </li>
              </ol>
            </nav>

            {/* <!-- Image gallery --> */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
                  alt="Two each of gray, white, and black shirts laying flat."
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg"
                    alt="Model wearing plain black basic tee."
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg"
                    alt="Model wearing plain gray basic tee."
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
                  alt="Model wearing plain white basic tee."
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* <!-- Product info --> */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Basic Tee 6-Pack
                </h1>
              </div>

              {/* <!-- Options --> */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">$192</p>

                {/* <!-- Reviews --> */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {/* <!-- Active: "text-gray-900", Default: "text-gray-200" --> */}
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-gray-200"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="sr-only">4 out of 5 stars</p>
                    <a
                      href="#"
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      117 reviews
                    </a>
                  </div>
                </div>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* <!-- Description and details --> */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p
                      id="description"
                      className={`${styles.paragraph} my-0 mx-auto pb-8 pt-1 pr-3 text-justify text-base italic`}
                    >
                      Chili mac and cheese! Take two comfort food favorites and
                      combine them into one cheesy skillet. Not too s picy, so
                      perfect for a family meal (add hot sauce if you like
                      heat!). Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Ipsum laborum pariatur aliquam, a cum dolorem quod
                      doloribus nam consectetur molestiae dicta sunt. Earum,
                      sint cupiditate iste cumque nobis assumenda maxime!
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {Array.from("aaa").map((e, idx) => (
                        <div
                          key={`${e}${idx}`}
                          className="text-justify sm:text-left"
                        >
                          <div className="cursor-default break-words">
                            <span className="font-bold text-slate-700"></span>
                            For the chili:
                          </div>
                          <div className="cursor-default break-words">
                            <span className="font-bold text-slate-700">
                              2 cups{" "}
                            </span>
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
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <ul
                      className={`${styles.paragraph} mb-3 mt-0 list-none p-2 pl-0 font-normal text-primaryDark dark:text-white`}
                    >
                      <li>Preheat the oven: Preheat the oven to 400°F.</li>
                      <li className="pb-2 pt-2">
                        Cook the pasta: Bring a large pot of salted water to a
                        boil, and cook the pasta until al dente. Drain, rinse
                        with cold water, and set aside.
                      </li>
                      <li className="pb-2 pt-2">
                        Make the chili: Heat the oil in a large (12-inch)
                        oven-safe skillet over medium heat. Add the onions and
                        cook until softened, 2 to 3 minutes. Add the tomatoes
                        and cook until they have broken down slightly and some
                        of the liquid has evaporated, 3 to 5 minutes more. Add
                        the ground beef, black pepper, 1 tablespoon chili
                        powder, and 1 tablespoon salt to the onion-tomato
                        mixture. Cook, breaking up the ground beef with a wooden
                        spoon, until brown and fully cooked, 5 to 8 minutes.
                        Remove from heat.
                      </li>
                      <li className="pb-2 pt-2">
                        Make the cheese sauce: Melt 2 tablespoons of butter in a
                        saucepan over medium heat. Add the flour and cook,
                        stirring occasionally, until bubbly and slightly golden,
                        1 to 2 minutes. Slowly whisk the milk into the
                        butter-flour mixture. At first, the mixture will seize
                        up and look crumbly, but will smooth out as you keep
                        adding milk and whisking. Once all the milk is added,
                        bring to a simmer. Whisk frequently and scrape along the
                        bottom of the pan, so it doesn&apos;t burn. Cook until
                        the sauce has thickened slightly and seems creamy, 10 to
                        15 minutes. Remove from the heat, and add the shredded
                        cheese and mustard. Stir until the cheese has melted.
                        Taste and add salt and pepper as needed.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    // </div>
  );
}
