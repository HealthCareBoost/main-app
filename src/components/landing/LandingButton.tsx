import React from "react";

export const LandingButton: React.FC<{
  styles: string;
  text: string;
}> = ({ styles, text }) => {
  return (
    <button
      type="button"
      className={`bg-blue-gradient py-4 px-6 text-[18px] font-medium text-primary outline-none ${styles}`}
    >
      {text}
    </button>
  );
};
