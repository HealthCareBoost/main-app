import React, { useContext, useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/Button";
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
import { format } from "date-fns/format";
import { api } from "../../utils/api";
import { WeeklyCalendarContext, CalendarContext } from "./CalendarContext";
// import { removeTimezoneOffset } from "@/src/utils/calendarUtils";
import { Label } from "../ui/Label";
import { FormSearchBar } from "../recipe/Search";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LogginParagraph } from "../LogginParagraph";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";
// import { useSession } from "next-auth/react";

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

  const saveDiet = api.diet.saveUserDailyDiet.useMutation();
  const updateDiet = api.diet.updateUserDailyDiet.useMutation();
  const deleteMutation = api.diet.deleteDiet.useMutation();

  const { toast } = useToast();
  const router = useRouter();
  const { data: sessionData } = useSession();

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
    if (!sessionData || !sessionData.user) {
      router.push("/login");
      return;
    }

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
          // date: removeTimezoneOffset(
          //   new Date(dailyDietInfo.date.toDateString())
          // ),
          date: dailyDietInfo.date,
          meal_type: data.meal_type,
          previous_recipe_id: dailyDietInfo.recipe_id,
          // new_recipe_id: "clhen81uk0007uyksrz8k5u38",
          new_recipe_name: data.recipe_name,
        },
        {
          onSuccess: () => {
            // router.refresh();
            onDietUpdate();
            return toast({
              title: "Diet Updated.",
              description: `${data.recipe_name} was added to the diet.`,
            });
          },
          onError: () => {
            return toast({
              title: "Something went wrong.",
              description: `${data.recipe_name} was NOT added to the diet. Please try again.`,
              variant: "destructive",
            });
          },
        },
      );
    } else {
      await saveDiet.mutateAsync(
        {
          // date: removeTimezoneOffset(new Date(selectedDay.toDateString())),
          date: selectedDay,
          meal_type: data.meal_type,
          recipe_name: data.recipe_name,
        },
        {
          onSuccess: () => {
            // router.refresh();
            onDietUpdate();
            return toast({
              title: "Diet Updated.",
              description: `${data.recipe_name} was added to the diet.`,
            });
          },
          onError: () => {
            return toast({
              title: "Something went wrong.",
              description: `${data.recipe_name} was NOT added to the diet. Please try again.`,
              variant: "destructive",
            });
          },
        },
      );
    }
    setDailyDiet(undefined);
    onDietUpdate();
    setIsDialogOpen(false);
    // router.refresh();
  };

  const onDeleteClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    console.log("delete");
    e.preventDefault();
    if (
      dailyDietInfo !== undefined &&
      dailyDietInfo.recipe_id &&
      dailyDietInfo.date
    ) {
      const { success } = await deleteMutation.mutateAsync({
        // date: removeTimezoneOffset(new Date(dailyDietInfo.date.toDateString())),
        date: dailyDietInfo.date,
        meal_type: dailyDietInfo.meal_type,
        recipe_id: dailyDietInfo.recipe_id,
      });
      if (!success) {
        return toast({
          title: "Something went wrong.",
          description: "Meal was not removed. Please try again.",
          variant: "destructive",
        });
      }

      setDailyDiet(undefined);
      onDietUpdate();
      setIsDialogOpen(false);
      return toast({
        title: "Success",
        description: `${dailyDietInfo.recipe.name} was removed from the diet.`,
      });
      // router.refresh();
    }
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
      </DialogHeader>
      <Form form={form} onSubmit={onFormSubmit}>
        <div className="grid gap-4 py-4">
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
            {dailyDietInfo !== undefined && (
              <Button
                variant={"destructive"}
                className="col-span-1"
                onClick={(e) => void onDeleteClick(e)}
              >
                {/* <Trash2 className="h-4 w-4" />  */}
                Delete
              </Button>
            )}
            {!sessionData || !sessionData.user ? (
              <div className="col-span-full">
                <LogginParagraph actionText={"To update your diet"} />
              </div>
            ) : (
              <Button
                disabled={!sessionData || !sessionData.user}
                className="col-span-2 col-start-3 hover:bg-orange-400"
                type="submit"
                variant={"outline"}
              >
                {dailyDietInfo === undefined ? "Save" : "Update"}
              </Button>
            )}
          </div>
        </div>
      </Form>
      {dailyDietInfo && dailyDietInfo.recipe_id ? (
        <DialogFooter className="sm:justify-end">
          <Link
            href={`/recipe/${dailyDietInfo.recipe_id}`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex items-center text-center text-lg",
            )}
          >
            <span>Go To Recipe </span>
            <ArrowRight className="mx-2 h-4 w-4" />
          </Link>
          {/* <Link
              href={`/recipe/${recipe.id}`}
              className="text-lg font-semibold text-gray-800 dark:text-white"
            >
              {recipe.name}
            </Link> */}
          {/* <Link
      className={`bg-orange-gradient primaryDark mx-2 flex items-center rounded-md py-3 px-5 text-center align-middle font-poppins text-[16px] font-medium outline-none transition-colors dark:text-primaryDark sm:text-sm ${
        styles ? styles : ""
      }`}
      type="button"
      href={"/login"}
    >
      Login
    </Link> */}
        </DialogFooter>
      ) : null}
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

  const saveDiet = api.diet.saveUserDailyDiet.useMutation();
  const updateDiet = api.diet.updateUserDailyDiet.useMutation();
  const deleteMutation = api.diet.deleteDiet.useMutation();

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
        // date: removeTimezoneOffset(new Date(dailyDietInfo.date.toDateString())),
        date: dailyDietInfo.date,
        meal_type: data.meal_type,
        previous_recipe_id: dailyDietInfo.recipe_id,
        new_recipe_name: data.recipe_name,
        // new_recipe_id: "clhf0xx3y0001uy8kc1ekbvdd",
      });
    } else {
      await saveDiet.mutateAsync({
        // date: removeTimezoneOffset(new Date(selectedDay.toDateString())),
        date: selectedDay,
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
        // date: removeTimezoneOffset(new Date(dailyDietInfo.date.toDateString())),
        date: dailyDietInfo.date,
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
