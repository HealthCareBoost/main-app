import React from "react";
import { type NextPage } from "next";
import Header from "../../components/header";

// !!! ********** !!!
// just for testing functionality
// should be component on view recipe page if you are the user created it
// !!! ********** !!!

const UpdateRecipe: NextPage = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
};

export default UpdateRecipe;
