import React, { useState } from "react";
import { type NextPage } from "next";
import { Controller, useFieldArray } from "react-hook-form";
import { RecipeSchema } from "../../utils/createRecipeSchema";
import { DifficultyLevel, TimeUnits } from "../../utils/enumsMap";
// import Select from "react-select";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useZodForm } from "../../utils/useZodFormHook";

import { MeasurementUnits } from "@prisma/client";
import { api } from "../../utils/api";
import { Form } from "../../components/ui/FormProvider";
import { Input } from "../../components/ui/FormInput";
import { Select } from "../../components/ui/FormSelect";
import { Textarea } from "../../components/ui/TextArea";
import { CloudinaryUploadButton } from "../../components/ui/CloudinaryUploadButton";
import { type ImageInfo } from "../../utils/imageSchema";
import { Recipe } from "../../components/recipe/Recipe";

// const resolver: Resolver<FormTypes> = (values) => {
//   return {
//     values: values.firstName ? values : {},
//     errors: !values.firstName
//       ? {
//           firstName: {
//             type: "required",
//             message: "This is required.",
//           },
//         }
//       : {},
//   };
// };

const CreateRecipe: NextPage = () => {
  const createRecipeMutation = api.recipe.createRecipe.useMutation();
  // const addImagesMutation = api.recipe.addImages.useMutation();
  const getIngredientsNutritionsMutation =
    api.ingredients.addIngredient.useMutation();

  const [imageData, setImageData] = useState<ImageInfo[]>([]);
  const form = useZodForm({
    schema: RecipeSchema,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  return (
    <>
      <main
        className="flex min-h-screen flex-row items-center 
      justify-start bg-gradient-to-b from-[#d8c47c] to-[#81cb8f]"
      >
        <div className="h-full w-1/4">
          <Form
            form={form}
            onSubmit={async (data) => {
              console.log("***** form data *****");
              console.log(data);
              console.log("***** form data *****");

              // send ingredients to be saved and calulate nutr
              try {
                if (data.ingredients && data.ingredients.length > 0) {
                  for (const ingredient of data.ingredients) {
                    const { success } =
                      await getIngredientsNutritionsMutation.mutateAsync({
                        ingredientName: ingredient.ingredient_name,
                      });
                    console.log(success);
                  }
                }
              } catch (error) {
                console.error(error);
              } finally {
                console.log("All ingredients nutritions are saved");
              }

              console.log(imageData);
              // then create new recipe
              createRecipeMutation.mutate({
                ...data,
                images: imageData,
              });
            }}
          >
            <div className="mb-4 max-w-full">
              <Input
                type="text"
                label="Recipe Name"
                required
                {...form.register("name")}
              ></Input>
            </div>
            <div className="mb-4 max-w-full">
              <Select
                label="difficultyLevel"
                required
                {...form.register("difficultyLevel")}
              >
                {Object.entries(DifficultyLevel).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>
            <div className="mb-4 max-w-full">
              <Input
                type="text"
                label="Preparation Time"
                required
                {...form.register("preparationTime")}
              ></Input>
              <Select
                label="preparationTimeUnit"
                required
                {...form.register("preparationTimeUnit")}
              >
                {Object.entries(TimeUnits).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>
            <div className="mb-4 max-w-full">
              <Textarea
                label="description"
                required
                {...form.register("description")}
              ></Textarea>
            </div>
            <div className="mb-4 max-w-full">
              {/* <Input
              type="file"
              label="images"
              required
              multiple
              {...form.register("images")}
            ></Input> */}
              <CloudinaryUploadButton
                classNames=""
                onUploadSetData={setImageData}
              ></CloudinaryUploadButton>
            </div>
            <div className="mb-4 max-w-full">
              <Textarea
                label="recipe_steps"
                id="text"
                {...form.register("recipe_steps")}
              ></Textarea>
              <p className="font-medium text-red-500">
                {form.formState.errors?.recipe_steps?.message}
              </p>
            </div>

            {fields.map((item, index) => {
              return (
                <div key={item.id}>
                  <Controller
                    name={
                      `ingredients[${index}].ingredient_name` as `ingredients.${number}.ingredient_name`
                    }
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <Input type="text" label="Test" {...field}></Input>
                      );
                    }}
                  />
                  <Controller
                    name={
                      `ingredients[${index}].quantity` as `ingredients.${number}.quantity`
                    }
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <Input
                          type="number"
                          label="quantity"
                          {...field}
                        ></Input>
                      );
                    }}
                  />
                  <Controller
                    name={
                      `ingredients[${index}].measurement_unit` as `ingredients.${number}.measurement_unit`
                    }
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <Select label="measurement_unit" {...field}>
                          {Object.entries(MeasurementUnits).map(
                            ([key, value]) => (
                              <option key={key} value={value}>
                                {value}
                              </option>
                            )
                          )}
                        </Select>
                      );
                    }}
                  />
                  <button type="button" onClick={() => remove(index)}>
                    Delete
                  </button>
                </div>
                // <li key={item.id}>
                //   <input
                //     name={`test[${index}].firstName`}
                //     defaultValue={`${item.firstName}`} // make sure to set up defaultValue
                //     ref={register()}
                //   />

                //   <Controller
                //     as={<input />}
                //     name={`test[${index}].lastName`}
                //     control={control}
                //     defaultValue={item.lastName} // make sure to set up defaultValue
                //   />
                //   <button type="button" onClick={() => remove(index)}>
                //     Delete
                //   </button>
                // </li>
              );
            })}

            <section>
              <button
                type="button"
                onClick={() => {
                  append({
                    ingredient_name: "milk",
                    measurement_unit: "Gram",
                    quantity: 150,
                  });
                }}
              >
                append
              </button>
            </section>
            <br></br>
            <br></br>
            <input type="submit" />
          </Form>
        </div>

        <div className="flex h-full w-3/4 flex-col border border-red-500">
          <Recipe />
        </div>
        {/* 
          
              add ingredient
              multiple inputs -> for start 3
              each to have ingr name, quantity, and unit of measurement
              something to add additional inputs for more ingr
      
           */}
      </main>
    </>
  );
};

export default CreateRecipe;
