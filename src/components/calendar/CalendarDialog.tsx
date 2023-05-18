import React, { useContext, useEffect } from "react";
import { Button } from "../ui/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { MealTypes } from "@prisma/client";
import { Form } from "../ui/FormProvider";
import { FormSelect } from "../ui/FormSelect";
import { Input } from "../ui/FormInput";
import { useZodForm } from "../../hooks/useZodFormHook";
import { z } from "zod";
import format from "date-fns/format";
import { api } from "../../utils/api";
import { removeTimezoneOffset } from "../../utils/formatTimezone";
import { CalendarContext } from "./CalendarContext";

export const CalendarDialog: React.FC = () => {
  const {
    closeDialog,
    onDietUpdate,
    selectedDay,
    dailyDietInfo,
    setDailyDiet,
  } = useContext(CalendarContext);

  const saveDiet = api.user.saveUserDailyDiet.useMutation();
  const updateDiet = api.user.updateUserDailyDiet.useMutation();
  const deleteMutation = api.user.deleteDiet.useMutation();

  const form = useZodForm({
    schema: z.object({
      recipe_name: z.string(),
      meal_type: z.nativeEnum(MealTypes),
    }),
    defaultValues: {
      meal_type:
        dailyDietInfo !== undefined ? dailyDietInfo.meal_type : "BREAKFAST",
      recipe_name: dailyDietInfo !== undefined ? dailyDietInfo.recipe.name : "",
    },
  });

  useEffect(() => {
    if (dailyDietInfo !== undefined) {
      form.setValue("meal_type", dailyDietInfo.meal_type);
      form.setValue("recipe_name", dailyDietInfo.recipe.name);
    } else {
      form.setValue("meal_type", MealTypes.BREAKFAST);
      form.setValue("recipe_name", "");
    }
  }, [dailyDietInfo, form]);

  const onFormSubmit = async (data: {
    meal_type: "BREAKFAST" | "DINNER" | "LUNCH" | "SNACK";
    recipe_name: string;
  }) => {
    console.log("***** form data *****");
    console.log(data);
    console.log("***** daily data *****");
    console.log(dailyDietInfo);
    console.log("***** data *****");
    if (
      dailyDietInfo !== undefined &&
      dailyDietInfo.recipe_id &&
      dailyDietInfo.date
    ) {
      await updateDiet.mutateAsync({
        date: removeTimezoneOffset(new Date(dailyDietInfo.date.toDateString())),
        meal_type: data.meal_type,
        previous_recipe_id: dailyDietInfo.recipe_id,
        new_recipe_id: "clhen667d0000uyksp9gk7unj",
      });
    } else {
      await saveDiet.mutateAsync({
        date: removeTimezoneOffset(new Date(selectedDay.toDateString())),
        meal_type: data.meal_type,
        recipe_id: "clhen667d0000uyksp9gk7unj",
      });
    }
    setDailyDiet(undefined);
    onDietUpdate();
    closeDialog();
  };

  const onDeleteClick = async () => {
    console.log("delete");
    if (
      dailyDietInfo !== undefined &&
      dailyDietInfo.recipe_id &&
      dailyDietInfo.date
    ) {
      await deleteMutation.mutateAsync({
        date: removeTimezoneOffset(new Date(dailyDietInfo.date.toDateString())),
        meal_type: dailyDietInfo.meal_type,
        recipe_id: dailyDietInfo.recipe_id,
      });
    }
    setDailyDiet(undefined);
    onDietUpdate();
    closeDialog();
  };

  return (
    <DialogContent forceMount={true} className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{format(selectedDay, "eeee, dd MMMM")}</DialogTitle>
        <DialogDescription>
          Add daily meal and click save when you&apos;re done.
        </DialogDescription>
        <Form form={form} onSubmit={onFormSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              {/* <>{dailyDietInfo ? dailyDietInfo.recipe.name : "no name"}</> */}
              <Input
                type="text"
                label="Recipe"
                className="col-span-3"
                required
                {...form.register("recipe_name")}
              ></Input>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              {/* <>{dailyDietInfo ? dailyDietInfo.meal_type : "no meal_typx"}</> */}
              <FormSelect
                className="col-span-3"
                label="For"
                required
                {...form.register("meal_type")}
              >
                {Object.entries(MealTypes).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </FormSelect>
            </div>
          </div>
          <Button type="submit">Save</Button>
        </Form>
      </DialogHeader>
      <DialogFooter>
        {dailyDietInfo !== undefined && (
          <Button onClick={() => void onDeleteClick()}>Delete</Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
};
