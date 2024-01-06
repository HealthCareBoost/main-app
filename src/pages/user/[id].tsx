import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import type { z } from "zod";
import Layout from "../../components/Layout";
import { LoadingSpinner } from "../../components/Loading";
import { UserAvatar } from "@/src/components/user/UserAvatar";
import { Button, buttonVariants } from "../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Input } from "../../components/ui/FormInput";
import { Form } from "../../components/ui/FormProvider";
import { Label } from "../../components/ui/Label";
import { useToast } from "../../hooks/use-toast";
import { styles } from "../../styles/style";
import { api } from "../../utils/api";
import { cn } from "../../utils/cn";
import { useZodForm } from "../../hooks/useZodFormHook";
import { ChangeNameSchema } from "../../utils/validations/authSchema";
import { Separator } from "../../components/ui/Separator";
import { format } from "date-fns";
import type { StatsKey } from "../../utils/statsTitleMap";
import { statsToTitleMap } from "../../utils/statsTitleMap";
import { RecomendedRecipes } from "../../components/recipe/Recomended";

type FormData = z.infer<typeof ChangeNameSchema>;

const UserProfile: NextPage<{ user_id: string }> = (
  // props: InferGetServerSidePropsType<typeof getStaticProps>
  { user_id }
) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const { data: sessionData } = useSession();
  const {
    data: userData,
    isLoading,
    refetch,
  } = api.user.getUserProfile.useQuery({
    user_id,
  });
  const changeName = api.user.changeName.useMutation();
  const { data: recomendedRecipes } = api.recipe.getRecipesRecomended.useQuery({
    user_id,
  });

  const isLoggedIn = sessionData && sessionData.user;
  const ownProfile = isLoggedIn && sessionData.user.id === user_id;

  const form = useZodForm({
    schema: ChangeNameSchema,
  });

  if (isLoading) {
    return (
      <div className="mt-[20%] flex h-full min-h-[300px] w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!userData || !userData.success || userData.error) {
    return (
      <Layout>
        <div>No user</div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <div className="container">
          {/* <div className="flex w-full flex-grow flex-col flex-wrap py-4 sm:flex-row sm:flex-nowrap"> */}
          <div className="grid h-full gap-4 sm:grid-cols-3">
            <aside className="h-full">
              <div className="grid h-full w-full content-start gap-4 pt-8">
                <UserAvatar
                  className="mx-auto mt-2 h-20 w-20 self-center rounded-full"
                  user={{
                    name:
                      userData.user && userData.user.name
                        ? userData.user.name
                        : "Anonymous",
                    image:
                      userData.user && userData.user.image
                        ? userData.user.image
                        : null,
                  }}
                />

                <div>
                  <div
                    className={`${styles.paragraph} mx-auto my-2 text-center`}
                  >
                    {userData.user && userData.user.name}
                  </div>
                  <div
                    className={`${styles.paragraph} mx-auto my-2 text-center`}
                  >
                    {userData.user && userData.user.email}
                  </div>
                  {/* <Separator orientation="horizontal" /> */}
                </div>

                {ownProfile ? (
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={"secondary"}
                        className="mx-auto w-3/5 text-center hover:bg-slate-300 dark:hover:bg-slate-800"
                      >
                        Edit Profile Name
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <Form
                        onSubmit={async (data: FormData) => {
                          // console.log(data);
                          const { success, error } =
                            await changeName.mutateAsync({ name: data.name });
                          await refetch();

                          if (!success || error) {
                            setDialogOpen(false);
                            return toast({
                              title: "Something went wrong.",
                              description:
                                "Your name change request failed. Please try again.",
                              variant: "destructive",
                            });
                          }

                          if (success) {
                            setDialogOpen(false);
                            return toast({
                              title: "Success!",
                              description: "Your name was changed.",
                            });
                          }
                        }}
                        form={form}
                      >
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <div className="col-span-3">
                              <Input
                                label="Name"
                                type="text"
                                placeholder="John Smith"
                                hiddenLabel={true}
                                required
                                {...form.register("name")}
                              />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          {/* <DialogPrimitive.Close asChild> */}
                          <Button
                            variant={"outline"}
                            className="text-center hover:bg-orange-400 "
                            type="submit"
                          >
                            Save changes
                          </Button>
                          {/* </DialogPrimitive.Close> */}
                        </DialogFooter>
                      </Form>
                    </DialogContent>
                  </Dialog>
                ) : null}

                {ownProfile ? (
                  <Button
                    className={cn(
                      buttonVariants({ variant: "destructive" }),
                      `mx-auto mt-auto mb-2 w-3/5 self-end justify-self-end text-center hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800`
                    )}
                    onClick={() =>
                      void signOut({
                        redirect: true,
                        callbackUrl: `${window.location.origin}`,
                      })
                    }
                  >
                    Sign out
                  </Button>
                ) : null}
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
                  Check out your recipe creations and dietary achievements all
                  in one place. Whether you&apos;re aiming to eat healthier, try
                  new cuisines, or simply enjoy more home-cooked meals, the
                  profile stats provide valuable insights into your cooking
                  habits. Celebrate your culinary milestones and keep setting
                  new goals as you embark on a flavorful adventure with us.
                </div>

                {userData.userStats &&
                  Object.entries(userData.userStats).map(([key, val], idx) => (
                    <Card
                      style={{}}
                      className="text-center"
                      key={`${key}${idx}`}
                    >
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
                            "text-orange-400 dark:text-orange-500"
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
                        "text-[30px] text-orange-400 dark:text-orange-500 xs:text-[32px]"
                      )}
                    >
                      {userData.user && userData.user.createdAt ? (
                        <div>
                          <p>{format(userData.user.createdAt, "yyyy")}</p>
                          <p>{format(userData.user.createdAt, "LLLL, dd")}</p>
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
              handpicked these dishes to delight your taste buds and inspire
              your next meal.
            </div>
            <div className="sm:col-span-full">
              {recomendedRecipes && recomendedRecipes.length > 0 && (
                <RecomendedRecipes recipes={recomendedRecipes} />
              )}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default UserProfile;

import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { GetStaticProps } from "next";
import superjson from "superjson";
import { appRouter } from "../../server/api/root";
import { prisma } from "../../server/db";
import { useState } from "react";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.user.getUserProfile.prefetch({ user_id: id });

  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      user_id: id,
    },
  };
};

export function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
