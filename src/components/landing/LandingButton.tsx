import React from "react";

export const LandingButton: React.FC<{
  styles?: string;
  text: string;
}> = ({ styles, text }) => {
  return (
    <button
      type="button"
      className={`bg-orange-gradient rounded-md py-4 px-6 text-[18px] font-medium text-primaryDark outline-none ${
        styles ? styles : ""
      }`}
    >
      {text}
    </button>
  );
};
