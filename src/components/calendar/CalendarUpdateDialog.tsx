import React from "react";
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
import { Select } from "../ui/FormSelect";
import { Input } from "../ui/FormInput";
import { useZodForm } from "../../utils/useZodFormHook";
import { z } from "zod";
import format from "date-fns/format";
import { api } from "../../utils/api";
import { removeTimezoneOffset } from "../../utils/formatTimezone";

type CalendarDialogProps = {
  dailyDietInfo: {
    date: Date;
    recipe_id: string;
    recipe: {
      name: string;
    };
    user_id: string;
    meal_type: MealTypes;
  };
};

export const CalendarUpdateDialog: React.FC<CalendarDialogProps> = ({
  dailyDietInfo,
}) => {
  const updateDiet = api.user.updateUserDailyDiet.useMutation();

  const form = useZodForm({
    schema: z.object({
      recipe_name: z.string(),
      meal_type: z.nativeEnum(MealTypes),
    }),
  });

  const onFormSubmit = async (data: {
    meal_type: "BREAKFAST" | "DINNER" | "LUNCH" | "SNACK";
    recipe_name: string;
  }) => {
    console.log("***** form data *****");
    console.log(data);
    console.log("***** form data *****");

    await updateDiet.mutateAsync({
      date: removeTimezoneOffset(new Date(dailyDietInfo.date.toDateString())),
      meal_type: data.meal_type,
      previous_recipe_id: "cleftij6j0001uyk0uvp5g4xk",
      //   new_recipe_id: "cleftij6j0001uyk0uvp5g4xk",
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{format(dailyDietInfo.date, "eeee, dd MMMM")}</DialogTitle>
        <DialogDescription>
          Change or Remove your daily meal and click save when you&apos;re done.
        </DialogDescription>
        <Form form={form} onSubmit={onFormSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                type="text"
                label="Recipe"
                className="col-span-3"
                value={dailyDietInfo.recipe.name}
                required
                {...form.register("recipe_name")}
              ></Input>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Select
                className="col-span-3"
                label="For"
                required
                defaultValue={dailyDietInfo.meal_type}
                {...form.register("meal_type")}
              >
                {Object.entries(MealTypes).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <Button type="submit">Save</Button>
        </Form>
      </DialogHeader>
      <DialogFooter></DialogFooter>
    </DialogContent>
  );
};
