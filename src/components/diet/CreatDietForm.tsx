import React, { useState } from "react";
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

export const CreateDietForm: React.FC = () => {
  const [dietOpen, setDietOpen] = useState<boolean>(false);
  const [hcOpen, setHCOpen] = useState<boolean>(false);

  const [tab, setTab] = useState<string>("measurements");
  const form = useZodForm({
    schema: DietSchema,
    defaultValues: {
      activityLevel: ActivityLevel.moderately,
      goal: DietGoal.healthy,
      diet: Diets.Balanced,
    },
  });

  return (
    <Form
      form={form}
      onSubmit={(data) => {
        console.log(data);
        // console.log(form.formState.errors);
      }}
    >
      <Tabs value={tab} className="w-[400px]">
        <TabsList>
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
                  <CollapsibleTrigger className="flex items-center justify-between">
                    Want to follow specific diet?
                    {dietOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
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
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="my-4">
                    <div className="space-y-1">
                      <FormSelect
                        label="Health Conditions"
                        required
                        {...form.register("healthProblemsDefault")}
                      >
                        {Object.entries(HealthProblems).map(([key, value]) => (
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
                className="m-0 ml-auto"
                type="submit"
              >
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Form>
  );
};
