import { type NextPage } from "next";
import Layout from "../../components/Layout";
import { CreateRecipeForm } from "../../components/recipe/CreateRecipeForm";

const CreateRecipe: NextPage = () => {
  return (
    <Layout>
      <div className="container">
        <CreateRecipeForm />
      </div>
    </Layout>
  );
};

export default CreateRecipe;
