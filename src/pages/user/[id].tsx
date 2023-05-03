import React from "react";
import type { GetStaticProps } from "next";
import { type NextPage } from "next";
import { api } from "../../utils/api";
import { styles } from "../../styles/style";

import dynamic from "next/dynamic";
export const LN = dynamic(
  () =>
    import("../../components/landing/LandingNavbar").then(
      (mod) => mod.LandingNavbar
    ),
  { ssr: false }
);

const UserProfile: NextPage<{ user_id: string }> = (
  // props: InferGetServerSidePropsType<typeof getStaticProps>
  { user_id }
) => {
  return (
    <>
      {/* <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <LN />
      </div> */}

      <div className="container h-screen">
        {/* <div className="flex w-full flex-grow flex-col flex-wrap py-4 sm:flex-row sm:flex-nowrap"> */}
        <div className="grid grid-cols-3 gap-4">
          <aside className="col-start-1 h-[80vh] bg-blue-500">
            <div className="grid gap-4 pt-8">
              <UserAvatar
                className="mx-auto mt-2 h-20 w-20 self-center rounded-full"
                user={{
                  name: "Anonymous",
                  image:
                    "https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
                }}
              />
              <div>
                <div className={`${styles.paragraph} mx-auto my-2 text-center`}>
                  Name
                </div>
                <div className={`${styles.paragraph} mx-auto my-2 text-center`}>
                  Email@gmail.com
                </div>
              </div>
              <Button className="mx-auto w-3/5">Edit Profile</Button>
              <div className="flex flex-col items-center justify-between">
                <span className=""> {23} Liked Recipes</span>
                <span className=""> {23} Saved Recipes</span>
                <span className=""> {23} Created Recipes</span>
              </div>
              <Button
                className={cn(
                  buttonVariants({ variant: "destructive" }),
                  `mx-auto mt-auto w-3/5`
                )}
              >
                Sign out
              </Button>
            </div>
          </aside>
          <main className="col-span-2 bg-green-400">
            <h1 className={`${styles.heading2} col-span-2 text-center`}>
              Check thiis out
            </h1>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/api/root";
import { prisma } from "../../server/db";
import { UserAccountNav } from "../../components/UserProfileNav";
import { UserAvatar } from "../../components/UserAvatar";
import { Button, buttonVariants } from "../../components/ui/Button";
import Layout from "../../components/Layout";
import { cn } from "../../utils/cn";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.user.me.prefetch();

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
