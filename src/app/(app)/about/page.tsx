import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDown";
import { Mail, MoreVertical } from "lucide-react";

import Link from "next/link";
import { styles } from "@/styles/style";
import { Logo } from "@/components/Logo";
import { Separator } from "@/components/ui/Separator";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { SocialIcons } from "@/components/landing";
import { UserAvatar } from "@/components/user/UserAvatar";

const AboutPage = () => {
  return (
    <main className={`py-4`}>
      <div
        className={`${styles.boxWidth} mx-auto flex flex-col items-center justify-center rounded-xl bg-white shadow-md dark:bg-bgDark`}
      >
        <Logo />
        <h1 className={`${styles.heading2} my-4 text-center`}>About us</h1>
        <Separator className="my-1 w-4/5 bg-orange-400" />

        <div className="grid grid-cols-1 gap-2 px-4 py-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="mx-auto lg:col-start-2">
            <Card className="w-60 border-orange-400">
              <CardContent className="flex flex-col">
                <div className="self-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="-mr-5 flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-slate-50 hover:text-black">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open Dropdown</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel className="capitalize">
                        Connect with me
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="grid grid-cols-3 gap-2">
                        <Link
                          className="col-span-2"
                          href={"https://www.linkedin.com/in/genadi-tsоlоv"}
                        >
                          LinkedIn
                        </Link>
                        <SocialIcons
                          className={`h-[21px] w-[21px] cursor-pointer justify-self-center object-contain hover:fill-orange-400`}
                          name={"linkedin"}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="grid grid-cols-3 gap-2">
                        <Link
                          href={"https://www.github.com/genadi53"}
                          className="col-span-2"
                        >
                          Github
                        </Link>
                        <SocialIcons
                          className={`cursor-pointer justify-self-center object-contain hover:fill-orange-400`}
                          name={"github"}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="grid grid-cols-3 gap-2">
                        <Link
                          className="col-span-2"
                          href={"mailto:user@example.com?subject=Subject"}
                        >
                          Email
                        </Link>
                        <Mail className="h-5 w-5 justify-self-center" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <UserAvatar
                  className="mx-auto h-32 w-32 self-center rounded-full"
                  user={{
                    name: "Genadi",
                    image:
                      "https://avatars.githubusercontent.com/u/65356322?v=4",
                  }}
                />
                <div
                  className={`${styles.paragraph} mx-auto mt-2 py-2 text-center`}
                >
                  Genadi Tsolov
                </div>
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </div>
          <div
            className={`${styles.paragraph} p-3 text-justify sm:col-span-2 md:pl-0 lg:px-6 lg:py-4`}
          >
            <p>
              Hello! I am Genadi, the sole developer behind LetMeCook. I have a
              great interest for developing software that improves people&apos;s
              lives and makes a difference. I am also passionate about cooking
              and living healthy life.
            </p>
            <p>
              My goal when developing LetMeCook was to make planning diets,
              meals and nutrition more accessible and enjoyable.
            </p>
          </div>
          <div
            className={`${styles.paragraph} p-3 text-justify sm:col-span-2 lg:col-start-2 lg:row-start-2 lg:py-4`}
          >
            I&apos;m always excited to connect with users and fellow developers.
            Feel free to reach out with feedback, ideas, or just to say hello.
            You can contact me at{" "}
            <span className="text-orange-400 underline">
              genadi.tsolov@gmail.com
            </span>{" "}
            or on any of my social media profiles.
          </div>

          <div className={`lg:col-start-4 lg:row-start-2`}>
            <div className="flex flex-col">
              <div className="mx-auto h-32 w-32 self-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width={128}
                  height={128}
                  viewBox="0 0 50 50"
                >
                  <path
                    fill="#404040"
                    d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"
                  ></path>
                </svg>
              </div>
              <div
                className={`${styles.paragraph} mx-auto mt-2 whitespace-pre-wrap py-2 text-center`}
              >
                {"Join us\nContributors Wanted"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
