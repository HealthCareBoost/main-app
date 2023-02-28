import React, { useEffect } from "react";
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
  selectedDate: Date;
  dailyDietInfo?: {
    date: Date;
    recipe_id: string;
    recipe: {
      name: string;
    };
    user_id: string;
    meal_type: MealTypes;
  };
  closeDialog: () => void;
  setDailyDiet: () => void;
};

export const CalendarDialog: React.FC<CalendarDialogProps> = ({
  selectedDate,
  dailyDietInfo,
  closeDialog,
  setDailyDiet,
}) => {
  const saveDiet = api.user.saveUserDailyDiet.useMutation();
  const updateDiet = api.user.updateUserDailyDiet.useMutation();

  console.log("in tri");
  console.log(dailyDietInfo);
  const form = useZodForm({
    schema: z.object({
      recipe_name: z.string(),
      meal_type: z.nativeEnum(MealTypes),
    }),
  });

  useEffect(() => {
    console.log("***** daily data *****");
    console.log(dailyDietInfo);
  }, [dailyDietInfo]);

  const onFormSubmit = async (data: {
    meal_type: "BREAKFAST" | "DINNER" | "LUNCH" | "SNACK";
    recipe_name: string;
  }) => {
    console.log("***** form data *****");
    console.log(data);
    console.log("***** daily data *****");
    console.log(dailyDietInfo);

    // await saveDiet.mutateAsync({
    //   date: removeTimezoneOffset(new Date(selectedDate.toDateString())),
    //   meal_type: data.meal_type,
    //   recipe_id: "cleftij6j0001uyk0uvp5g4xk",
    // });

    // await updateDiet.mutateAsync({
    //   date: removeTimezoneOffset(new Date(dailyDietInfo.date.toDateString())),
    //   meal_type: data.meal_type,
    //   previous_recipe_id: "cleftij6j0001uyk0uvp5g4xk",
    //   //   new_recipe_id: "cleftij6j0001uyk0uvp5g4xk",
    // });
    setDailyDiet();
    closeDialog();
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{format(selectedDate, "eeee, dd MMMM")}</DialogTitle>
        <DialogDescription>
          Add daily meal and click save when you&apos;re done.
        </DialogDescription>
        <Form form={form} onSubmit={onFormSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                defaultValue={dailyDietInfo ? dailyDietInfo.recipe.name : ""}
                type="text"
                label="Recipe"
                className="col-span-3"
                required
                {...form.register("recipe_name")}
              ></Input>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Select
                className="col-span-3"
                label="For"
                required
                defaultValue={
                  dailyDietInfo ? dailyDietInfo.meal_type : MealTypes.BREAKFAST
                }
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
