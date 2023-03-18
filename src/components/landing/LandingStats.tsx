import { useTheme } from "next-themes";
import React from "react";
import { styles } from "../../styles/style";

export const LandingStatsSection: React.FC = () => {
  const { theme } = useTheme();
  const stats = [
    {
      id: "stats-1",
      title: "User Active",
      value: "3800+",
    },
    {
      id: "stats-2",
      title: "Trusted by Company",
      value: "230+",
    },
    {
      id: "stats-3",
      title: "Transaction",
      value: "$230M+",
    },
  ];
  return (
    <section
      className={`${styles.flexCenter} mb-6 flex-row flex-wrap sm:mb-20`}
    >
      {stats.map((stat) => (
        <div
          className={`m-3 flex flex-1 flex-row items-center justify-start`}
          key={stat.id}
        >
          <h4
            className={`font-poppins text-[30px] font-semibold leading-[43px] text-primaryDark dark:text-white xs:text-[40px] xs:leading-[53px]`}
          >
            {stat.value}
          </h4>
          <p
            className={`${
              theme === "dark" ? "text-gradient" : "text-orange-400"
            }  ml-3 font-poppins text-[15px] font-normal uppercase leading-[21px] xs:text-[20px] xs:leading-[26px]`}
          >
            {stat.title}
          </p>
        </div>
      ))}
    </section>
  );
};
