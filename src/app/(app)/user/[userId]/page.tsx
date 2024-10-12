import { UserAvatar } from "@/components/user/UserAvatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { styles } from "@/styles/style";
import { api, HydrateClient } from "@/utils/trpc/server";
import { cn } from "@/utils/cn";

import { Separator } from "@/components/ui/Separator";
import { format } from "date-fns";
import type { StatsKey } from "@/utils/statsTitleMap";
import { statsToTitleMap } from "@/utils/statsTitleMap";
import { RecomendedRecipes } from "@/components/recipe/Recomended";
import EditUserProfile from "@/components/user/EditUserProfile";
import { getServerAuthSession } from "@/server/auth";
import SignOutButton from "@/components/user/SignOutButton";
import { redirect } from "next/navigation";

interface UserProfileProps {
  params: {
    userId: string;
  };
}

const UserProfile = async ({ params }: UserProfileProps) => {
  const { userId: user_id } = params;
  const sessionData = await getServerAuthSession();

  const { success, error, user, userStats } = await api.user.getUserProfile({
    user_id,
  });
  const recomendedRecipes = await api.recipe.getRecipesRecomended({
    user_id,
  });

  const isLoggedIn = sessionData && sessionData.user;
  const ownProfile = isLoggedIn && sessionData.user.id === user_id;

  if (!user || !success || error) {
    redirect("/404");
  }

  return (
    <HydrateClient>
      <div className="container">
        {/* <div className="flex w-full flex-grow flex-col flex-wrap py-4 sm:flex-row sm:flex-nowrap"> */}
        <div className="grid h-full gap-4 sm:grid-cols-3">
          <aside className="h-full">
            <div className="grid h-full w-full content-start gap-4 pt-8">
              <UserAvatar
                className="mx-auto mt-2 h-20 w-20 self-center rounded-full"
                user={{
                  name: user && user.name ? user.name : "Anonymous",
                  image: user && user.image ? user.image : null,
                }}
              />

              <div>
                <div className={`${styles.paragraph} mx-auto my-2 text-center`}>
                  {user && user.name}
                </div>
                <div className={`${styles.paragraph} mx-auto my-2 text-center`}>
                  {user && user.email}
                </div>
                {/* <Separator orientation="horizontal" /> */}
              </div>

              {ownProfile ? (
                <EditUserProfile user_id={user_id}></EditUserProfile>
              ) : null}

              {ownProfile ? <SignOutButton /> : null}
            </div>
          </aside>
          <section className="sm:col-span-2">
            <div className="grid gap-4 sm:grid-cols-3">
              <h1
                className={`${styles.heading2} text-center capitalize sm:col-span-3`}
              >
                Check out your profile stats
              </h1>
              <div className="row-start-2 text-base sm:col-span-3 sm:mb-16">
                Check out your recipe creations and dietary achievements all in
                one place. Whether you&apos;re aiming to eat healthier, try new
                cuisines, or simply enjoy more home-cooked meals, the profile
                stats provide valuable insights into your cooking habits.
                Celebrate your culinary milestones and keep setting new goals as
                you embark on a flavorful adventure with us.
              </div>

              {userStats &&
                Object.entries(userStats).map(([key, val], idx) => (
                  <Card style={{}} className="text-center" key={`${key}${idx}`}>
                    <CardHeader>
                      <CardTitle className={``}>
                        {statsToTitleMap(key as StatsKey)}
                      </CardTitle>
                      {/* <CardDescription>Card Description</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                      <p
                        className={cn(
                          `${styles.heading2}`,
                          "text-orange-400 dark:text-orange-500",
                        )}
                      >
                        {val}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              <Card style={{}} className="text-center" key={"createdAt"}>
                <CardHeader>
                  <CardTitle>Member Since</CardTitle>
                  {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>
                <CardContent>
                  <div
                    className={cn(
                      `${styles.heading2}`,
                      "text-[30px] text-orange-400 dark:text-orange-500 xs:text-[32px]",
                    )}
                  >
                    {user && user.createdAt ? (
                      <div>
                        <p>{format(user.createdAt, "yyyy")}</p>
                        <p>{format(user.createdAt, "LLLL, dd")}</p>
                      </div>
                    ) : (
                      <p>Unknown Date</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
        <Separator className="my-16 h-1" />
        <section className="mt-6 grid h-full grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="my-4 sm:col-span-full">
            <h1 className={`${styles.heading2} text-center sm:col-span-3`}>
              Recomended For You
            </h1>
            Explore a world of culinary delights with our carefully curated
            selection of recommended recipes. Our team of food enthusiasts has
            handpicked these dishes to delight your taste buds and inspire your
            next meal.
          </div>
          <div className="sm:col-span-full">
            {recomendedRecipes && recomendedRecipes.length > 0 && (
              <RecomendedRecipes recipes={recomendedRecipes} />
            )}
          </div>
        </section>
      </div>
    </HydrateClient>
  );
};

export default UserProfile;
