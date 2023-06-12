import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Card, CardContent } from "../ui/Card";
import React, { useState } from "react";
import { api } from "../../utils/api";
import type { ImageInfo } from "../../utils/validations/imageSchema";
import { useZodForm } from "../../hooks/useZodFormHook";
import { RecipeSchema } from "../../utils/validations/createRecipeSchema";
import { Controller, useFieldArray } from "react-hook-form";
import { Form } from "../ui/FormProvider";
import { Input } from "../ui/FormInput";
import { FormSelect } from "../ui/FormSelect";
import { DifficultyLevel } from "@prisma/client";
import { Textarea } from "../ui/TextArea";
import { CloudinaryUploadButton } from "../ui/CloudinaryUploadButton";
import { Button } from "../ui/Button";
import { Trash } from "lucide-react";
import { styles } from "../../styles/style";
import { Separator } from "../ui/Separator";
import { toast } from "../../hooks/use-toast";
import { useRouter } from "next/navigation";
import type { RecipeComponentProps } from "../../utils/recipe/recipeTypes";
import type { z } from "zod";
import { RecipeMapper } from "../../utils/recipeMapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Label } from "../ui/Label";

type CreateRecipeFormProps = {
  recipeToUpdate?: RecipeComponentProps;
};

type FormData = z.infer<typeof RecipeSchema>;

function containsOnlyNumbers(str: string | undefined) {
  if (str === undefined) return false;
  return /^[0-9]+$/.test(str);
}

const transformIngredientsFromList = (ingredientText: string) => {
  const text = ingredientText
    .split(/\r?\n/) // Split input text into an array of lines
    .filter((line) => line.trim() !== "") // Filter out lines that are empty or contain only whitespace
    .join("\n");
  // console.log(text);

  const ingredientData: {
    ingredient_name: string;
    quantity: number;
    measurement_unit: string;
  }[] = [];

  const lines = text.split("\n");
  for (const line of lines) {
    const lineWords = line.split(" ");

    if (lineWords.length > 2) {
      const [quantity, unit, ...rest] = lineWords;
      const name = rest.join(" ");
      // console.log(quantity);
      // console.log(unit);

      if (quantity && unit && name) {
        ingredientData.push({
          ingredient_name: name.trim(),
          measurement_unit: unit.trim(),
          quantity: containsOnlyNumbers(quantity) ? parseFloat(quantity) : 0,
        });
      }
    }
  }
  return ingredientData;
};

export const CreateRecipeForm: React.FC<CreateRecipeFormProps> = ({
  recipeToUpdate,
}) => {
  const createRecipeMutation = api.recipe.createRecipe.useMutation();
  const updateRecipeMutation = api.recipe.update.useMutation();

  // const addImagesMutation = api.recipe.addImages.useMutation();
  // const saveIngredientsMutation = api.ingredients.addIngredient.useMutation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const [imageData, setImageData] = useState<ImageInfo[]>([]);
  const [ingredientText, setIngredientText] = useState<string>("");

  const form = useZodForm({
    schema: RecipeSchema,
    defaultValues: recipeToUpdate
      ? RecipeMapper(recipeToUpdate)
      : {
          ingredients: [
            {
              ingredient_name: "milk",
              measurement_unit: "Milliliter",
              quantity: 150,
            },
          ],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
    rules: {
      minLength: 1,
    },
  });

  const onSubmitCreate = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("***** form data *****");
    console.log(data);
    console.log("***** form data *****");

    // send ingredients to be saved and calulate nutr
    // try {
    //   if (data.ingredients && data.ingredients.length > 0) {
    //     for (const ingredient of data.ingredients) {
    //       const result = await saveIngredientsMutation.mutateAsync({
    //         ingredientName: ingredient.ingredient_name,
    //       });

    //       console.log(result.success);
    //       if (result.success && result.ingredient) {
    //         recipeIngredients.push(result.ingredient);
    //       }
    //     }
    //   }
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   console.log("All ingredients nutritions are saved");
    //   console.log(recipeIngredients);
    // }

    console.log(imageData);
    // then create new recipe
    const { recipe, success } = await createRecipeMutation.mutateAsync({
      ...data,
      images: imageData,
    });
    setIsSubmitting(false);

    if (success && recipe) {
      router.push(`/recipe/${recipe.id}`);
      return toast({
        title: "Recipe Created",
        description: "New recipe was created.",
      });
    } else {
      return toast({
        title: "Something went wrong.",
        description: "Recipe creation failed! Please try again.",
        variant: "destructive",
      });
    }
  };

  const onSubmitUpdate = async (data: FormData) => {
    if (!recipeToUpdate) return;
    setIsSubmitting(true);
    console.log("***** form data *****");
    console.log(data);
    console.log("***** form data *****");

    // send ingredients to be saved and calulate nutr
    // try {
    //   if (data.ingredients && data.ingredients.length > 0) {
    //     for (const ingredient of data.ingredients) {
    //       const result = await saveIngredientsMutation.mutateAsync({
    //         ingredientName: ingredient.ingredient_name,
    //       });

    //       console.log(result.success);
    //       if (result.success && result.ingredient) {
    //         recipeIngredients.push(result.ingredient);
    //       }
    //     }
    //   }
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   console.log("All ingredients nutritions are saved");
    //   console.log(recipeIngredients);
    // }

    console.log(imageData);
    // then create new recipe
    const { success, recipe } = await updateRecipeMutation.mutateAsync({
      recipe_data: { ...data, images: imageData },
      recipe_id: recipeToUpdate.recipe.id,
    });
    setIsSubmitting(false);

    if (success && recipe) {
      router.push(`/recipe/${recipe.id}`);
      return toast({
        title: "Recipe Updated.",
        description: "Recipe information was updated successfully.",
      });
    } else {
      return toast({
        title: "Something went wrong.",
        description: "Recipe creation failed! Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Form
        form={form}
        onSubmit={(data) => {
          if (recipeToUpdate) {
            void onSubmitUpdate(data);
          } else {
            void onSubmitCreate(data);
          }
        }}
      >
        <div className="space-y-12">
          <div className="my-4 grid gap-4 border-b border-gray-900/10 pb-12 sm:grid-cols-2">
            <div className="m-auto">
              <h2
                className={`${styles.heading2} text-base font-semibold leading-7`}
              >
                Recipe Info
              </h2>
              <p className={`${styles.paragraph} mt-1 mr-3 text-sm leading-6`}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Officiis laborum aliquid nostrum aperiam, id sint inventore
                suscipit, sequi quos libero ratione veniam iure doloremque enim
                porro deserunt sit non consequatur?
              </p>
            </div>
            <Card>
              <CardContent className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-5">
                  <Input
                    type="text"
                    label="Recipe Name"
                    required
                    {...form.register("name")}
                  ></Input>
                  <p className="font-medium text-red-500">
                    {form.formState.errors?.name?.message}
                  </p>
                </div>

                <div className="col-span-3">
                  <Input
                    type="text"
                    label="Preparation Minutes"
                    defaultValue={0}
                    {...form.register("preparationMinutes")}
                  ></Input>
                  <p className="font-medium text-red-500">
                    {form.formState.errors?.preparationMinutes?.message}
                  </p>
                  <Input
                    type="text"
                    defaultValue={0}
                    label="Cooking Minutes"
                    {...form.register("cookingMinutes")}
                  ></Input>
                  <p className="font-medium text-red-500">
                    {form.formState.errors?.cookingMinutes?.message}
                  </p>
                </div>

                <div className="col-span-3">
                  <Input
                    type="text"
                    defaultValue={0}
                    label="Preparation Hours"
                    {...form.register("preparationHours")}
                  ></Input>
                  <p className="font-medium text-red-500">
                    {form.formState.errors?.preparationHours?.message}
                  </p>
                  <Input
                    type="text"
                    defaultValue={0}
                    label="Cooking Hours"
                    {...form.register("cookingHours")}
                  ></Input>
                  <p className="font-medium text-red-500">
                    {form.formState.errors?.cookingHours?.message}
                  </p>
                </div>

                <div className="col-span-full">
                  <FormSelect
                    label="Difficulty"
                    required
                    {...form.register("difficultyLevel")}
                  >
                    {Object.entries(DifficultyLevel).map(([key, value]) => (
                      <option
                        className="cursor-default select-none rounded-sm py-1.5 pr-2 pl-8 text-sm font-medium capitalize outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        key={key}
                        value={value}
                      >
                        {value}
                      </option>
                    ))}
                  </FormSelect>
                </div>

                <div className="col-span-full">
                  <Textarea
                    label="Description"
                    required
                    placeholder="Write a few sentences about the recipe."
                    {...form.register("description")}
                  ></Textarea>
                  <p className="font-medium text-red-500">
                    {form.formState.errors?.description?.message}
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-primaryDark dark:text-white"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-700/25 px-6 py-10 dark:border-slate-500">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <CloudinaryUploadButton
                          className="cursor-pointer rounded-md font-semibold"
                          onUploadSetData={setImageData}
                        ></CloudinaryUploadButton>
                      </div>
                      <p className="text-xs leading-5 text-primaryDark dark:text-white">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-4" />

          <div className="my-4 grid gap-4 border-b border-gray-900/10 pb-12 sm:grid-cols-2">
            <div className="m-auto">
              <h2
                className={`${styles.heading2} text-base font-semibold leading-7`}
              >
                Recipe Ingrediants & Steps
              </h2>
              <p className={`${styles.paragraph} mt-1 mr-3 text-sm leading-6`}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
                beatae minus, eos doloremque, rem sit assumenda laboriosam,
                earum reprehenderit iste architecto quisquam magnam facere harum
                quibusdam veniam ipsa? Iusto, minus.
              </p>
            </div>
            <Card>
              <CardContent className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <Button
                  type="button"
                  className="sticky top-2 col-span-full sm:col-span-4"
                  onClick={() => {
                    append({
                      ingredient_name: "",
                      measurement_unit: "",
                      quantity: 0,
                    });
                  }}
                >
                  Add Ingredient
                </Button>

                <div className="col-span-full flex items-center sm:hidden">
                  <Separator />
                  <span className="mx-4 font-poppins text-base font-semibold leading-7">
                    OR
                  </span>
                  <Separator />
                </div>

                <div className="col-span-full sm:col-span-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mx-auto w-full text-center">
                        Import List
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Import Ingredients List</DialogTitle>
                        <DialogDescription>
                          Paste your ingredient list here. Add one ingredient
                          per line. Include the quantity (i.e. cups,
                          tablespoons) and any special preparation (i.e. sifted,
                          softened, chopped).
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <div className="col-span-4">
                            <textarea
                              id="text"
                              className={
                                "flex w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
                              }
                              placeholder={`Example:\n2 cups of flour, sifted\n1 cup sugar\n2 tablespoons butter, softened`}
                              rows={8}
                              value={ingredientText}
                              onChange={(e) => {
                                setIngredientText(e.target.value);
                                // console.log(e.target.value);
                              }}
                              name="text"
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => {
                            const ingredientsArray =
                              transformIngredientsFromList(ingredientText);

                            // remove old ingredients
                            for (const _ of fields) {
                              remove();
                            }

                            for (const ingr of ingredientsArray) {
                              append({ ...ingr });
                            }
                          }}
                        >
                          Submit
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {fields.map((item, index) => {
                  return (
                    <div
                      className="col-span-full grid grid-cols-4 items-center gap-4 rounded-lg border p-4 text-card-foreground shadow-sm"
                      key={item.id}
                    >
                      <div className="col-span-full sm:col-span-3">
                        <Controller
                          name={
                            `ingredients[${index}].ingredient_name` as `ingredients.${number}.ingredient_name`
                          }
                          control={form.control}
                          render={({ field }) => {
                            return (
                              <Input
                                type="text"
                                label={`Ingredient ${index + 1}`}
                                {...field}
                              ></Input>
                            );
                          }}
                        />
                      </div>

                      <div className="col-span-full sm:col-span-2">
                        <Controller
                          name={
                            `ingredients[${index}].quantity` as `ingredients.${number}.quantity`
                          }
                          control={form.control}
                          render={({ field }) => {
                            return (
                              <Input
                                className=""
                                type="number"
                                label="Quantity"
                                {...field}
                              ></Input>
                            );
                          }}
                        />
                      </div>

                      <div className="col-span-full sm:col-span-2">
                        <Controller
                          name={
                            `ingredients[${index}].measurement_unit` as `ingredients.${number}.measurement_unit`
                          }
                          control={form.control}
                          render={({ field }) => {
                            return (
                              <Input
                                className="content-center self-center"
                                type="text"
                                label="Measurement Unit"
                                {...field}
                              ></Input>
                              // <FormSelect
                              //   className="content-center self-center"
                              //   label="Measurement Unit"
                              //   {...field}
                              // >
                              //   {Object.entries(MeasurementUnits).map(
                              //     ([key, value]) => (
                              //       <option key={key} value={value}>
                              //         {value}
                              //       </option>
                              //     )
                              //   )}
                              // </FormSelect>
                            );
                          }}
                        />
                      </div>

                      <Button
                        className="col-span-4 my-4 sm:col-span-1 sm:col-start-4 sm:row-start-1 sm:m-0 sm:-mt-8 sm:w-fit sm:justify-self-end"
                        variant={"destructive"}
                        type="button"
                        onClick={() => remove(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}

                <div className="col-span-full">
                  <Textarea
                    label="Recipe Steps"
                    placeholder="Describe the steps for the recipe in details.Write the recipe steps in sequence of preparation and cooking."
                    rows={8}
                    id="text"
                    {...form.register("recipe_steps")}
                  ></Textarea>
                  <p className="font-medium text-red-500">
                    {form.formState.errors?.recipe_steps?.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            // className="col-start-3 row-start-1 row-end-3"
            variant={"default"}
            type="submit"
            className="w-48"
            disabled={isSubmitting}
          >
            {/* <Check className="h-4 w-4" />  */}
            Save
          </Button>
        </div>
      </Form>
    </>
  );
};
