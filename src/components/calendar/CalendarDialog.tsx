import React, { useContext, useEffect, useState } from "react";
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
import { WeeklyCalendarContext, CalendarContext } from "./CalendarContext";
import { useRouter } from "next/navigation";
import { removeTimezoneOffset } from "@/src/utils/calendarUtils";
import { Label } from "../ui/Label";
import { FormSearchBar } from "../recipe/Search";

export const CalendarDialog: React.FC = () => {
  const {
    selectedDay,
    setDailyDiet,
    onDietUpdate,
    setIsDialogOpen,
    dailyDietInfo,
  } = useContext(CalendarContext);

  // console.log(dailyDietInfo);
  const [searchedValue, setSearchedValue] = useState<string>("");

  const saveDiet = api.user.saveUserDailyDiet.useMutation();
  const updateDiet = api.user.updateUserDailyDiet.useMutation();
  const deleteMutation = api.user.deleteDiet.useMutation();

  const router = useRouter();

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
    // console.log(dailyDietInfo);
    console.log("***** data *****");
    if (
      dailyDietInfo !== undefined &&
      dailyDietInfo.recipe_id &&
      dailyDietInfo.date
    ) {
      await updateDiet.mutateAsync(
        {
          date: removeTimezoneOffset(
            new Date(dailyDietInfo.date.toDateString())
          ),
          meal_type: data.meal_type,
          previous_recipe_id: dailyDietInfo.recipe_id,
          // new_recipe_id: "clhen81uk0007uyksrz8k5u38",
          new_recipe_name: data.recipe_name,
        },
        {
          onSuccess: () => {
            // router.refresh();
            onDietUpdate();
          },
        }
      );
    } else {
      await saveDiet.mutateAsync(
        {
          date: removeTimezoneOffset(new Date(selectedDay.toDateString())),
          meal_type: data.meal_type,
          recipe_name: data.recipe_name,
        },
        {
          onSuccess: () => {
            // router.refresh();
            onDietUpdate();
          },
        }
      );
    }
    setDailyDiet(undefined);
    onDietUpdate();
    setIsDialogOpen(false);
    // router.refresh();
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
    setIsDialogOpen(false);
    // router.refresh();
  };

  return (
    <DialogContent forceMount={true} className="sm:max-w-[425px]">
      <DialogHeader>
        {selectedDay && (
          <DialogTitle>{format(selectedDay, "eeee, dd MMMM")}</DialogTitle>
        )}
        <DialogDescription>
          Add daily meal and click save when you&apos;re done.
        </DialogDescription>
        <Form form={form} onSubmit={onFormSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              {/* <>{dailyDietInfo ? dailyDietInfo.meal_type : "no meal_typx"}</> */}
              <Label htmlFor="meal_type" className="text-right">
                For
              </Label>
              <FormSelect
                className="col-span-3 w-full"
                label="For"
                required
                hiddenLabel
                {...form.register("meal_type")}
              >
                {Object.entries(MealTypes).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </FormSelect>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              {/* <>{dailyDietInfo ? dailyDietInfo.recipe.name : "no name"}</> */}
              <Label htmlFor="name" className="text-right">
                Recipe
              </Label>
              {/* <Input
                type="text"
                label="Recipe"
                hiddenLabel
                className="col-span-3"
                required
                {...form.register("recipe_name")}
              /> */}
              <div className="col-span-3">
                <FormSearchBar
                  searchedValue={searchedValue}
                  setSearchedValue={setSearchedValue}
                  {...form.register("recipe_name", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      setSearchedValue(e.target.value);
                      form.setValue("recipe_name", e.target.value);
                    },
                  })}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              {dailyDietInfo !== undefined && (
                <Button
                  variant={"destructive"}
                  className="col-span-1"
                  onClick={() => void onDeleteClick()}
                >
                  {/* <Trash2 className="h-4 w-4" />  */}
                  Delete
                </Button>
              )}
              <Button className="col-span-2 col-start-3" type="submit">
                Save
              </Button>
            </div>
          </div>
        </Form>
      </DialogHeader>
    </DialogContent>
  );
};

export const WeeklyCalendarDialog: React.FC = () => {
  const {
    closeDialog,
    onDietUpdate,
    selectedDay,
    dailyDietInfo,
    setDailyDiet,
  } = useContext(WeeklyCalendarContext);

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
        new_recipe_name: data.recipe_name,
        // new_recipe_id: "clhf0xx3y0001uy8kc1ekbvdd",
      });
    } else {
      await saveDiet.mutateAsync({
        date: removeTimezoneOffset(new Date(selectedDay.toDateString())),
        meal_type: data.meal_type,
        recipe_name: data.recipe_name,
        // recipe_id: "clhf0xx3y0001uy8kc1ekbvdd",
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
