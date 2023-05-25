import Image from "next/image";
import React from "react";
import { styles } from "../../styles/style";
import { robot } from "../../../public/assets";

export const LandingHeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className={`flex flex-col md:flex-row ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col px-6 sm:px-16 xl:px-0`}
      >
        <div
          //
          className={`mb-2 flex flex-row items-center rounded-[10px] bg-gradient-to-r from-slate-200 via-zinc-300 to-neutral-400 py-[6px] px-4 dark:bg-blackGradient`}
        >
          <Image
            src="assets/Discount.svg"
            alt="disc"
            className="h-[32px] w-[32px]"
            height={32}
            width={32}
          />
          <p className={`${styles.paragraph} ml-2 text-primaryDark`}>
            <span className="text-orange-400 dark:text-white"> 20% </span>
            Discount For
            <span className="text-orange-400 dark:text-white"> 1 Month </span>
            Account
          </p>
        </div>

        <div className="flex w-full flex-row items-center justify-between">
          <h1
            className={`flex-1 font-poppins text-[52px] font-semibold leading-[75px] text-primaryDark dark:text-white ss:text-[71px] ss:leading-[100px]`}
          >
            Heading
            <br className="hidden sm:block" />
            <span className="text-gradient"> Generation </span>
          </h1>
          <div className="mr-0 hidden ss:flex md:mr-4">
            {/* get started */}
            <div
              className={`${styles.flexCenter} bg-orange-gradient h-[140px] w-[140px] cursor-pointer rounded-full p-[2px]`}
            >
              <div
                className={`${styles.flexCenter} h-full w-full flex-col rounded-full bg-transparent dark:bg-primaryDark`}
              >
                <div className={`${styles.flexStart} flex-row`}>
                  <p className="mr-2 font-poppins text-[18px] font-medium leading-[23px]">
                    <span className={`text-primaryDark dark:text-orange-400`}>
                      Get
                    </span>
                  </p>
                  <Image
                    className="h-[23px] w-[23px] object-contain"
                    alt="arrow"
                    height={23}
                    width={23}
                    src="assets/arrow-up.svg"
                  />
                </div>
                <p className="font-poppins text-[18px] font-medium leading-[23px]">
                  <span className={`text-primaryDark dark:text-orange-400`}>
                    Started
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <h1
          className={`
        w-full font-poppins text-[52px] font-semibold leading-[75px] text-primaryDark dark:text-white ss:text-[68px] ss:leading-[100px]`}
        >
          Payment Method
        </h1>
        <p className={`${styles.paragraph} mt-5 max-w-[470px]`}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
          quaerat molestias est odio, totam saepe neque hic accusantium ab
          consectetur ipsam dolorum error voluptatem. Eligendi numquam illum
          necessitatibus consequatur eius!
        </p>
      </div>
      {/* right side */}
      <div
        className={`flex flex-1 ${styles.flexCenter} relative my-10 md:my-0`}
      >
        <Image
          //src="assets/robot.png"
          src={robot}
          alt="billing"
          sizes={"100%"}
          className="relative z-[5] h-full w-full"
        />
        <div className="pink__gradient absolute top-0 z-[0] h-[35%] w-[40%]" />
        <div className="white__gradient absolute top-0 bottom-40 z-[1] h-[80%] w-[80%] rounded-full" />
        <div className="blue__gradient absolute right-20 bottom-20 z-[0] h-[50%] w-[50%]" />
      </div>
      <div className={`ss:hidden ${styles.flexCenter}`}>
        {/* for mobile get started btn*/}
        <div
          className={`${styles.flexCenter} bg-orange-gradient h-[140px] w-[140px] cursor-pointer rounded-full p-[2px]`}
        >
          <div
            className={`${styles.flexCenter} h-full w-full flex-col rounded-full bg-transparent dark:bg-primaryDark`}
          >
            <div className={`${styles.flexStart} flex-row`}>
              <p className="mr-2 font-poppins text-[18px] font-medium leading-[23px]">
                <span className={`text-primaryDark dark:text-orange-400`}>
                  Get
                </span>
              </p>
              <Image
                className="h-[23px] w-[23px] object-contain"
                alt="arrow"
                src="assets/arrow-up.svg"
                height={23}
                width={23}
              />
            </div>
            <p className="font-poppins text-[18px] font-medium leading-[23px]">
              <span className={`text-primaryDark dark:text-orange-400`}>
                Started
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
