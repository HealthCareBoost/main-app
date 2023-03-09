/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { Calendar } from "../components/Calendar";
import { styles } from "../styles/style";

const NotFoundPage: React.FC = () => {
  const navLinks = [
    {
      id: "home",
      title: "Home",
    },
    {
      id: "features",
      title: "Features",
    },
    {
      id: "product",
      title: "Product",
    },
    {
      id: "clients",
      title: "Clients",
    },
  ];

  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
      <div className="w-full overflow-hidden bg-primary">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            {/* Navbar */}
            <nav className="navbar flex w-full items-center justify-between py-6">
              <img src={"assets/logo.svg"} className="w-[124px]" />

              <ul className="hidden flex-1 list-none items-center justify-end sm:flex">
                {navLinks.map((nav, idx) => (
                  <li
                    key={`${nav.id}`}
                    className={`cursor-pointer font-poppins
                    text-[16px] font-normal text-white 
                    ${idx === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                  >
                    <a href={`#${nav.id}`}>{nav.title}</a>
                  </li>
                ))}
              </ul>

              <div className="flex flex-1 items-center justify-end sm:hidden">
                <img
                  src={toggle ? "assets/close.svg" : "assets/menu.svg"}
                  alt="menu"
                  className="h-[28px] w-[28px] object-contain"
                  onClick={() => {
                    setToggle((prev) => !prev);
                  }}
                />
                <div
                  className={`${
                    toggle ? "flex" : "hidden"
                  } bg-black-gradient min-w[140px] sidebar absolute top-20 right-0 mx-4 my-2 rounded-xl p-6`}
                >
                  <ul className="flex list-none flex-col items-center justify-end">
                    {navLinks.map((nav, idx) => (
                      <li
                        key={`${nav.id}`}
                        className={`cursor-pointer font-poppins
                    text-[16px] font-normal text-white 
                    ${idx === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                      >
                        <a href={`#${nav.id}`}>{nav.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            {/* hero */}
            <section
              id="home"
              className={`flex flex-col md:flex-row ${styles.paddingY}`}
            >
              <div
                className={`flex-1 ${styles.flexStart} flex-col px-6 sm:px-16 xl:px-0`}
              >
                <div className="bg-discount-gradient mb-2 flex flex-row items-center rounded-[10px] py-[6px] px-4">
                  <img
                    src="assets/Discount.svg"
                    alt="disc"
                    className="h-[32px] w-[32px]"
                  />
                  <p className={`${styles.paragraph} ml-2`}>
                    <span className="text-white"> 20% </span>
                    Discount For
                    <span className="text-white"> 1 Month </span>
                    Account
                  </p>
                </div>

                <div className="flex w-full flex-row items-center justify-between">
                  <h1
                    className={`flex-1 font-poppins text-[52px] font-semibold leading-[75px] text-white ss:text-[71px] ss:leading-[100px]`}
                  >
                    Heading
                    <br className="hidden sm:block" />
                    <span className="text-gradient"> Generation </span>
                  </h1>
                  <div className="mr-0 hidden ss:flex md:mr-4">
                    {/* get started */}
                    <div
                      className={`${styles.flexCenter} bg-blue-gradient h-[140px] w-[140px] cursor-pointer rounded-full p-[2px]`}
                    >
                      <div
                        className={`${styles.flexCenter} h-full w-full flex-col rounded-full bg-primary`}
                      >
                        <div className={`${styles.flexStart} flex-row`}>
                          <p className="mr-2 font-poppins text-[18px] font-medium leading-[23px]">
                            <span className="text-gradient">Get</span>
                          </p>
                          <img
                            className="h-[23px] w-[23px] object-contain"
                            alt="arrow"
                            src="assets/arrow-up.svg"
                          />
                        </div>
                        <p className="font-poppins text-[18px] font-medium leading-[23px]">
                          <span className="text-gradient">Started</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h1
                  className={`
                  w-full font-poppins text-[52px] font-semibold leading-[75px] text-white ss:text-[68px] ss:leading-[100px]`}
                >
                  Payment Method
                </h1>
                <p className={`${styles.paragraph} mt-5 max-w-[470px]`}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corporis quaerat molestias est odio, totam saepe neque hic
                  accusantium ab consectetur ipsam dolorum error voluptatem.
                  Eligendi numquam illum necessitatibus consequatur eius!
                </p>
              </div>
              {/* right side */}
              <div
                className={`flex flex-1 ${styles.flexCenter} relative my-10 md:my-0`}
              >
                <img
                  src="assets/robot.png"
                  alt="billing"
                  className="relative z-[5] h-full w-full"
                />
                <div className="pink__gradient absolute top-0 z-[0] h-[35%] w-[40%]" />
                <div className="white__gradient absolute top-0 bottom-40 z-[1] h-[80%] w-[80%] rounded-full" />
                <div className="blue__gradient absolute right-20 bottom-20 z-[0] h-[50%] w-[50%]" />
              </div>
              <div className={`ss:hidden ${styles.flexCenter}`}>
                {/* for mobile get started btn*/}
                <div
                  className={`${styles.flexCenter} bg-blue-gradient h-[140px] w-[140px] cursor-pointer rounded-full p-[2px]`}
                >
                  <div
                    className={`${styles.flexCenter} h-full w-full flex-col rounded-full bg-primary`}
                  >
                    <div className={`${styles.flexStart} flex-row`}>
                      <p className="mr-2 font-poppins text-[18px] font-medium leading-[23px]">
                        <span className="text-gradient">Get</span>
                      </p>
                      <img
                        className="h-[23px] w-[23px] object-contain"
                        alt="arrow"
                        src="assets/arrow-up.svg"
                      />
                    </div>
                    <p className="font-poppins text-[18px] font-medium leading-[23px]">
                      <span className="text-gradient">Started</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>stats +++ </div>
        </div>
      </div>
      {/* <Calendar /> */}
      {/* <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={"/"}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main> */}
    </>
  );
};

export default NotFoundPage;
