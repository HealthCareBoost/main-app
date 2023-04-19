import * as React from "react";
import { cn } from "../../utils/cn";
import { buttonVariants } from "./Button";
import type { ButtonProps } from "./Button";
import { useRouter } from "next/router";

const BackButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className }) => {
    const router = useRouter();

    return (
      <button
        onClick={() => router.back()}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          `absolute top-4 left-4 inline-flex h-10 items-center
           justify-center rounded-md bg-transparent py-2 px-4 
           font-inter text-lg font-medium transition-colors
          hover:bg-slate-100  focus:outline-none focus:ring-2
          focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 
           dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent
           md:top-8 md:left-8`,
          className
          // className="inline-flex h-10 items-center
          // justify-center rounded-md bg-transparent py-2 px-4 text-sm font-medium
          // transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2
          //  focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none
          //  disabled:opacity-50 data-[state=open]:bg-transparent
          //  dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100
          //  dark:focus:ring-slate-400
          //  dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent
        )}
      >
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-2 h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          {/* <Icons.chevronLeft className="mr-2 h-4 w-4" /> */}
          Back
        </>
      </button>
    );
  }
);
BackButton.displayName = "BackButton";

export { BackButton };
