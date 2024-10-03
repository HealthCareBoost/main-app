import { Separator } from "@/components/ui/Separator";
import { styles } from "@/styles/style";
import { TermsAndConditions } from "@/utils/terms";
import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <main
      className={`my-8 h-full rounded-3xl border-l-2 border-t-2 border-orange-400 p-4`}
    >
      <div
        className={`${styles.boxWidth} mx-auto flex flex-col items-center justify-center bg-white dark:bg-bgDark`}
      >
        <div className="mb-10 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="mx-auto py-4 text-center sm:col-span-3">
            <h1 className={`${styles.heading2}`}>
              Terms and Conditions for LetMeCook
            </h1>
          </div>

          <section className="flex w-full flex-row px-4">
            <div className="mx-auto flex w-full flex-col items-center gap-2">
              {TermsAndConditions.map((term, idx) => (
                <a
                  key={`${idx + 1}${term.title}`}
                  href={`#${term.title}`}
                  className="text-start font-poppins text-xl font-semibold uppercase text-primaryDark dark:text-white sm:w-full sm:text-base md:text-center"
                >
                  {idx + 1}. {term.title}
                </a>
              ))}
            </div>
            <Separator
              orientation="vertical"
              className="hidden w-1.5 bg-orange-400 dark:bg-orange-400 sm:block"
            />
          </section>
          <section className="py-4 pl-4 pr-4 sm:col-span-2 sm:pl-0">
            {TermsAndConditions.map((term, idx) => (
              <div
                key={`${idx + 1}${term.title}`}
                id={`${term.title}`}
                className="mb-4"
              >
                <h2 className="py-2 text-start font-poppins text-xl font-semibold uppercase text-primaryDark dark:text-white sm:w-1/2 sm:text-base">
                  {idx + 1}. {term.title}
                </h2>
                <p className="whitespace-pre-wrap">{term.description}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsAndConditionsPage;
