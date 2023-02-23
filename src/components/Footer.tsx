import Image from "next/image";
import React from "react";

type FooterProps = {
  links: string[];
};

export const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer className="rounded-lg bg-white p-4 shadow dark:bg-gray-900 md:px-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a
          href="https://flowbite.com/"
          className="mb-4 flex items-center sm:mb-0"
        >
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            width={100}
            height={100}
            className="mr-3 h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Flowbite
          </span>
        </a>
        <ul className="mb-6 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
          {props.links.map((link, idx) => (
            <li key={`${link}${idx}`}>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
      <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
        © 3
        <a href="https://flowbite.com/" className="hover:underline">
          Flowbite™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
};
