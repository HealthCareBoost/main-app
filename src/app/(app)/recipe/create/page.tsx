import { CreateRecipeForm } from "@/components/recipe/CreateRecipeForm";
import { type NextPage } from "next";

const CreateRecipe: NextPage = () => {
  return (
    <div className="container">
      <h1
        className={`mb-4 text-center font-poppins text-[52px] font-semibold leading-[75px] text-primaryDark dark:text-white ss:text-[71px] ss:leading-[100px]`}
      >
        Create New <span className="text-gradient"> Recipe </span>
      </h1>
      <CreateRecipeForm />
    </div>
  );
};

export default CreateRecipe;
