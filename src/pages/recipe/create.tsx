import { type NextPage } from "next";
import Layout from "../../components/Layout";
import { CreateRecipeForm } from "../../components/recipe/CreateRecipeForm";

const CreateRecipe: NextPage = () => {
  return (
    <Layout>
      <div className="container">
        <h1
          className={`mb-4 text-center font-poppins text-[52px] font-semibold leading-[75px] text-primaryDark dark:text-white ss:text-[71px] ss:leading-[100px]`}
        >
          Create New <span className="text-gradient"> Recipe </span>
        </h1>
        <CreateRecipeForm />
      </div>
    </Layout>
  );
};

export default CreateRecipe;
