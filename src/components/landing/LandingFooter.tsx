"use client";
import React from "react";
import { styles } from "../../styles/style";
import { SocialIcons } from "./SocialIcons";
import dynamic from "next/dynamic";
import Link from "next/link";

export const DynamicLogo = dynamic(
  () => import("@/components/Logo").then((mod) => mod.Logo),
  { ssr: false },
);

interface IconsType {
  id: string;
  name: "instagram" | "facebook" | "twitter" | "linkedin" | "github";
  icon: string;
  link: string;
}

export const FooterSmall = () => {
  const socialMedia: IconsType[] = [
    {
      id: "social-media-1",
      icon: "assets/instagram.svg",
      name: "instagram",
      link: "https://www.instagram.com/",
    },
    {
      id: "social-media-2",
      icon: "assets/facebook.svg",
      name: "facebook",
      link: "https://www.facebook.com/",
    },
    {
      id: "social-media-3",
      icon: "assets/twitter.svg",
      name: "twitter",
      link: "https://www.twitter.com/",
    },
    {
      id: "social-media-4",
      icon: "assets/linkedin.svg",
      name: "linkedin",
      link: "https://www.linkedin.com/",
    },
    {
      id: "social-media-5",
      icon: "assets/github.svg",
      name: "github",
      link: "https://www.github.com/",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-between border-t-[1px] border-t-orange-400 pt-6 md:flex-row">
      <p className="text-center font-poppins text-[16px] font-normal leading-[27px] text-dimDark dark:text-dimWhite">
        Copyright Ⓒ 2023 LetMeCook. All Rights Reserved.
      </p>

      <div className="mt-6 flex flex-row md:mt-0">
        {socialMedia.map((social, index) => (
          /* <Image
        height={21}
        width={21}
        key={social.id}
        src={social.icon}
        alt={social.id}
        className={`h-[21px] w-[21px] cursor-pointer object-contain ${
          index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
        } hover:fill-orange-400`}
        onClick={() => window.open(social.link)}
      /> */
          <SocialIcons
            key={social.id}
            className={`h-[21px] w-[21px] cursor-pointer object-contain ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            } hover:fill-orange-400`}
            onClick={() => window.open(social.link)}
            name={social.name}
          />
        ))}
      </div>
    </div>
  );
};

export const LandingFooter: React.FC = () => {
  const footerLinks = [
    {
      title: "Useful Links",
      links: [
        {
          name: "About us",
          link: "/about",
        },
        {
          name: "How it Works",
          link: "/how",
        },
        {
          name: "Terms & Services",
          link: "/terms",
        },
      ],
    },
    {
      title: "Community",
      links: [
        {
          name: "Help Center",
          link: "/help-center",
        },
        {
          name: "Partners",
          link: "/partners",
        },
        {
          name: "Blog",
          link: "/blog",
        },
        {
          name: "Newsletters",
          link: "/newsletters",
        },
      ],
    },
    {
      title: "Partner",
      links: [
        {
          name: "Our Partners",
          link: "/our-partners",
        },
        {
          name: "Become a Partner",
          link: "/become-a-partner",
        },
      ],
    },
  ];

  return (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
      <div className={`${styles.flexStart} mb-8 w-full flex-col md:flex-row`}>
        <div className="mr-10 flex flex-[1] flex-col justify-start">
          <DynamicLogo />
          <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
            A new way to easy save, organize and prepare your meals.
          </p>
        </div>

        <div className="mt-10 flex w-full flex-[1.5] flex-row flex-wrap justify-between md:mt-0">
          {footerLinks.map((footerlink) => (
            <div
              key={footerlink.title}
              className={`my-4 flex min-w-[150px] flex-col ss:my-0`}
            >
              <h4 className="font-poppins text-[18px] font-medium leading-[27px] text-primaryDark dark:text-white">
                {footerlink.title}
              </h4>
              <ul className="mt-4 list-none">
                {footerlink.links.map((link, index) => (
                  <Link key={link.name} href={link.link}>
                    <li
                      className={`cursor-pointer font-poppins text-[16px] font-normal leading-[24px] text-dimDark hover:text-orange-400 dark:text-dimWhite ${
                        index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                      }`}
                    >
                      {link.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <FooterSmall />
    </section>
  );
};
