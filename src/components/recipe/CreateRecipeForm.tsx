import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import React, { useState } from "react";
import { api } from "../../utils/api";
import { ImageInfo } from "../../utils/validations/imageSchema";
import { useZodForm } from "../../utils/useZodFormHook";
import { RecipeSchema } from "../../utils/validations/createRecipeSchema";
import { Controller, useFieldArray } from "react-hook-form";
import { Form } from "../ui/FormProvider";
import { Input } from "../ui/FormInput";
import { FormSelect } from "../ui/FormSelect";
import { DifficultyLevel, MeasurementUnits } from "@prisma/client";
import { TimeUnits } from "../../utils/enumsMap";
import { Textarea } from "../ui/TextArea";
import { CloudinaryUploadButton } from "../ui/CloudinaryUploadButton";
import { Button } from "../ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { X } from "lucide-react";
import { Trash } from "lucide-react";
import { styles } from "../../styles/style";
import { Separator } from "../ui/Separator";

export default function Example() {
  return (
    <form>
      <div className="space-y-12">
        <div className="grid gap-4 border-b border-gray-900/10 pb-12 sm:grid-cols-2">
          <div className="m-auto">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Sunt aspernatur tempora ipsa provident, voluptatibus fugit
            </p>
          </div>

          {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    workcation.com/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          <Card>
            <CardContent className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      workcation.com/
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="janesmith"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Notifications
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We&apos;ll always let you know about important changes, but you pick
            what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                By Email
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      Comments
                    </label>
                    <p className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-900"
                    >
                      Candidates
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-900"
                    >
                      Offers
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Push Notifications
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                These are delivered via SMS to your mobile phone.
              </p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-nothing"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export const CreateRecipeForm: React.FC = () => {
  const createRecipeMutation = api.recipe.createRecipe.useMutation();
  // const addImagesMutation = api.recipe.addImages.useMutation();
  const getIngredientsNutritionsMutation =
    api.ingredients.addIngredient.useMutation();

  const [imageData, setImageData] = useState<ImageInfo[]>([]);
  const form = useZodForm({
    schema: RecipeSchema,
    defaultValues: {
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

  return (
    <>
      <Form
        form={form}
        onSubmit={(data) => {
          console.log("***** form data *****");
          console.log(data);
          console.log("***** form data *****");

          // send ingredients to be saved and calulate nutr
          //   try {
          //     if (data.ingredients && data.ingredients.length > 0) {
          //       for (const ingredient of data.ingredients) {
          //         const { success } =
          //           await getIngredientsNutritionsMutation.mutateAsync({
          //             ingredientName: ingredient.ingredient_name,
          //           });
          //         console.log(success);
          //       }
          //     }
          //   } catch (error) {
          //     console.error(error);
          //   } finally {
          //     console.log("All ingredients nutritions are saved");
          //   }

          console.log(imageData);
          // then create new recipe
          //   createRecipeMutation.mutate({
          //     ...data,
          //     images: imageData,
          //   });
        }}
      >
        <div className="space-y-12">
          <div className="my-4 grid gap-4 border-b border-gray-900/10 pb-12 sm:grid-cols-2">
            <div className="m-auto">
              <h2
                className={`${styles.heading2} text-base font-semibold leading-7`}
              >
                Profile
              </h2>
              <p className={`${styles.paragraph} mt-1 text-sm leading-6`}>
                This information will be displayed publicly so be careful what
                you share. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Sunt aspernatur tempora ipsa provident, voluptatibus fugit
              </p>
            </div>
            <Card>
              <CardContent className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-5">
                  {/* <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        workcation.com/
                      </span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="janesmith"
                      />
                    </div>
                  </div> */}
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
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
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
                Profile
              </h2>
              <p className={`${styles.paragraph} mt-1 text-sm leading-6`}>
                This information will be displayed publicly so be careful what
                you share. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Sunt aspernatur tempora ipsa provident, voluptatibus fugit
              </p>
            </div>
            <Card>
              <CardContent className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <Button
                  type="button"
                  className="sticky top-2 col-span-full sm:col-span-4 sm:col-start-2"
                  onClick={() => {
                    append({
                      ingredient_name: "milk",
                      measurement_unit: "Gram",
                      quantity: 150,
                    });
                  }}
                >
                  Add Ingredient
                </Button>

                {fields.map((item, index) => {
                  return (
                    <div
                      className="text-card-foreground col-span-full grid grid-cols-3 items-center gap-4 rounded-lg border p-4 shadow-sm"
                      key={item.id}
                    >
                      <div className="col-span-full sm:col-span-2">
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
                      <div className="col-span-full sm:col-span-1 lg:col-span-2">
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
                      <div className="col-span-full sm:col-span-1">
                        <Controller
                          name={
                            `ingredients[${index}].measurement_unit` as `ingredients.${number}.measurement_unit`
                          }
                          control={form.control}
                          render={({ field }) => {
                            return (
                              <FormSelect
                                className="content-center self-center"
                                label="Measurement Unit"
                                {...field}
                              >
                                {Object.entries(MeasurementUnits).map(
                                  ([key, value]) => (
                                    <option key={key} value={value}>
                                      {value}
                                    </option>
                                  )
                                )}
                              </FormSelect>
                            );
                          }}
                        />
                      </div>
                      <Button
                        className="col-span-3 my-4 sm:col-start-3 sm:row-start-1 sm:m-0 sm:-mt-8 sm:w-fit sm:justify-self-end"
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
                    label="recipe_steps"
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
        <Button
          className="col-start-3 row-start-1 row-end-3"
          variant={"destructive"}
          type="submit"
          onClick={() => {
            console.log("data");
            console.log(form);
          }}
        >
          save
        </Button>
      </Form>
    </>
  );
};
