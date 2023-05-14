import Link from "next/link";
import React from "react";

export const LandingButton: React.FC<{
  styles?: string;
  text: string;
}> = ({ styles, text }) => {
  return (
    <button
      type="button"
      className={`bg-orange-gradient rounded-md py-4 px-6 text-center align-middle text-[18px] font-medium text-primaryDark outline-none ${
        styles ? styles : ""
      }`}
    >
      {text}
    </button>
  );
};

export const LandingLoginButton: React.FC<{
  styles?: string;
}> = ({ styles }) => {
  return (
    <Link
      className={`bg-orange-gradient primaryDark mx-2 flex items-center rounded-md py-3 px-5 text-center align-middle font-poppins text-[16px] font-medium outline-none transition-colors dark:text-primaryDark sm:text-sm ${
        styles ? styles : ""
      }`}
      type="button"
      href={"/login"}
    >
      Login
    </Link>
  );
};
