"use client";
import React from "react";
import { useTheme } from "next-themes";

const ThemeButton: React.FC<{ styles: string }> = ({ styles }) => {
  const { theme, setTheme } = useTheme();
  //   const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className={`inline-flex h-9 items-center justify-center rounded-md bg-transparent px-2 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent ${styles}`}
      type="button"
      id="radix-:R1rb6i:"
      aria-haspopup="menu"
      aria-expanded="false"
      data-state="closed"
    >
      {/* light */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className=" rotate-0 scale-100 transition-all hover:text-slate-900 dark:-rotate-90 dark:scale-0 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
        <path d="M12 3v1"></path>
        <path d="M12 20v1"></path>
        <path d="M3 12h1"></path>
        <path d="M20 12h1"></path>
        <path d="m18.364 5.636-.707.707"></path>
        <path d="m6.343 17.657-.707.707"></path>
        <path d="m5.636 5.636.707.707"></path>
        <path d="m17.657 17.657.707.707"></path>
      </svg>

      {/* dark */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute rotate-90 scale-0 transition-all hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
// <button
//   onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
//   //   className="absolute bottom-32 rounded-lg bg-gray-800 px-8 py-2 text-2xl text-white transition-all duration-100 hover:bg-gray-600 dark:bg-gray-50 dark:text-gray-800 dark:hover:bg-gray-300 md:text-4xl"
// >
//   Toggle Mode
// </button>

export default ThemeButton;
