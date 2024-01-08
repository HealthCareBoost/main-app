import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/Tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { useZodForm } from "@/src/hooks/useZodFormHook";
import {
  ActivityLevel,
  DietGoal,
  DietSchema,
  Diets,
  HealthProblems,
} from "@/src/utils/validations/dietSchema";
import { Form } from "@/src/components/ui/FormProvider";
import { Input } from "@/src/components/ui/FormInput";
import { FormSelect } from "@/src/components/ui/FormSelect";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/src/components/ui/Collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { api } from "@/src/utils/api";
import { LoadingSpinner } from "../Loading";
import { calculateCalories, getRestrictedFoods } from "@/src/utils/dietHelpers";
import { addDays } from "date-fns";
import type { z } from "zod";
import { useToast } from "@/src/hooks/use-toast";

type CreatDietFormProps = {
  onDietUpdate: () => void;
};
type FormData = z.infer<typeof DietSchema>;

export const CreateDietForm: React.FC<CreatDietFormProps> = ({
  onDietUpdate,
}) => {
  const [dietOpen, setDietOpen] = useState<boolean>(false);
  const [hcOpen, setHCOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const [tab, setTab] = useState<string>("measurements");
  const form = useZodForm({
    schema: DietSchema,
    defaultValues: {
      activityLevel: ActivityLevel.moderately,
      goal: DietGoal.healthy,
      diet: Diets.Balanced,
    },
  });

  const { mutateAsync, isLoading } = api.diet.generateDiet.useMutation();

  useEffect(() => {
    if (dietOpen === false) {
      form.resetField("diet");
    }
    if (hcOpen === false) {
      form.resetField("healthProblemsAdditional");
      form.resetField("healthProblemsDefault");
    }
  }, [dietOpen, form, hcOpen]);

  async function onFormSubmit(data: FormData) {
    console.log(data);
    // console.log(form.formState.errors);
    const calorieIntake = calculateCalories({
      // age: data.age,
      // activityLevel: data.activityLevel,
      // height: data.height,
      // weight: data.weight,
      ...data,
      biological_gender: "M",
    });

    const restrictedFoods = getRestrictedFoods(data.diet);
    console.log(restrictedFoods);

    const { success, error } = await mutateAsync({
      date: addDays(new Date(), 0),
      targetCalories: calorieIntake !== 0 ? calorieIntake : 2000,
      timeFrame: "day",
      exclude: restrictedFoods,
      // diet: data.diet
    });

    if (!success || error) {
      return toast({
        title: "Something went wrong.",
        description: `Diet was not generated. Please try again.`,
        variant: "destructive",
      });
    }

    if (success) {
      onDietUpdate();
      return toast({
        title: "Diet Updated.",
        description: `New recipes were added to the diet.`,
      });
    }
  }

  return (
    <Form form={form} onSubmit={(data) => onFormSubmit(data)}>
      {isLoading ? (
        <div className="mt-[20%] flex h-full min-h-[300px] w-full items-center justify-center">
          <LoadingSpinner size={128} />
        </div>
      ) : (
        <Tabs value={tab} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="measurements"
              onClick={() => {
                setTab("measurements");
              }}
            >
              Measurements
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              onClick={() => {
                setTab("preferences");
              }}
            >
              Preferences
            </TabsTrigger>
          </TabsList>
          <TabsContent value="measurements">
            <Card>
              <CardHeader>
                <CardTitle>Measurements</CardTitle>
                <CardDescription>
                  Make changes to your measurements here. Click save when
                  you&apos;re done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Input
                    label="Height"
                    type="number"
                    placeholder="175 cm"
                    min={0}
                    {...form.register("height")}
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    label="Weight"
                    min={0}
                    placeholder="80 kg"
                    {...form.register("weight")}
                  />
                </div>

                <div className="space-y-1">
                  <Input
                    label="Age"
                    placeholder="32"
                    min={0}
                    max={150}
                    type="number"
                    {...form.register("age")}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="m-0 ml-auto"
                  variant={"outline"}
                  onClick={() => {
                    setTab("preferences");
                  }}
                >
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Make changes to your preferences here. Click save when
                  you&apos;re done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <FormSelect
                    label="ActivityLevel"
                    required
                    {...form.register("activityLevel")}
                  >
                    {Object.entries(ActivityLevel).map(([key, value]) => (
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
                <div className="space-y-1">
                  <FormSelect
                    label="Diet Goal"
                    required
                    {...form.register("goal")}
                  >
                    {Object.entries(DietGoal).map(([key, value]) => (
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
                <div className="space-y-1">
                  <Collapsible open={dietOpen} onOpenChange={setDietOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between text-left">
                      <span className="mr-6">
                        Want to follow specific diet?
                      </span>
                      {dietOpen ? (
                        <ChevronUp className="ml-auto h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-auto h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <FormSelect
                        label="Diet"
                        required
                        {...form.register("diet")}
                      >
                        {Object.entries(Diets).map(([key, value]) => (
                          <option
                            className="cursor-default select-none rounded-sm py-1.5 pr-2 pl-8 text-sm font-medium capitalize outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            key={key}
                            value={value}
                          >
                            {value}
                          </option>
                        ))}
                      </FormSelect>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                <div className="space-y-1">
                  <Collapsible open={hcOpen} onOpenChange={setHCOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between text-left">
                      Do you have any Health Conditions or Allergies?
                      {dietOpen ? (
                        <ChevronUp className="ml-auto h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-auto h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="my-4">
                      <div className="space-y-1">
                        <FormSelect
                          label="Health Conditions"
                          required
                          {...form.register("healthProblemsDefault")}
                        >
                          {Object.entries(HealthProblems).map(
                            ([key, value]) => (
                              <option
                                className="cursor-default select-none rounded-sm py-1.5 pr-2 pl-8 text-sm font-medium capitalize outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                key={key}
                                value={value}
                              >
                                {value}
                              </option>
                            )
                          )}
                        </FormSelect>
                      </div>
                      <div className="space-y-1">
                        <Input
                          label="Other"
                          type="text"
                          placeholder="eg. Hypertension"
                          min={0}
                          {...form.register("healthProblemsAdditional")}
                        />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    if (Object.keys(form.formState.errors).length !== 0) {
                      setTab("measurements");
                    }
                  }}
                  className="m-0 ml-auto text-center hover:bg-orange-400"
                  variant={"outline"}
                  type="submit"
                >
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </Form>
  );
};
