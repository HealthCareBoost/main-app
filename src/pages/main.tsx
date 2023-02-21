import React from "react";
import { type NextPage } from "next";
import Header from "../components/ui/Header";

const Main: NextPage = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
};

export default Main;
