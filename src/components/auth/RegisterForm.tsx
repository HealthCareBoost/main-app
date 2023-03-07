import { LockClosedIcon } from "@heroicons/react/20/solid";
import { signIn } from "next-auth/react";
import React from "react";
import { z } from "zod";
import { api } from "../../utils/api";
import { useZodForm } from "../../utils/useZodFormHook";
import { Button } from "../ui/Button";
import { Input } from "../ui/FormInput";
import { Form } from "../ui/FormProvider";

export const RegisterForm: React.FC<{ csrfToken: string }> = ({
  csrfToken,
}) => {
  const saveName = api.user.saveName.useMutation();
  const form = useZodForm({
    schema: z.object({
      name: z.string(),
      csrfToken: z.string(),
      email: z.string().email({ message: "Not a valid email" }),
    }),
    defaultValues: {
      csrfToken,
    },
  });

  return (
    <Form
      onSubmit={async (data) => {
        console.log(data);
        await saveName.mutateAsync({
          name: data.name,
          email: data.email,
        });
        await signIn("email", {
          email: data.email,
          // name: data.name,
          // redirect: false,
          // credentials: {
          // name: data.name,
          // email: data.email,
          // },
        });
      }}
      form={form}
    >
      <Input
        label="csrf"
        hidden
        type="hidden"
        {...form.register("csrfToken")}
      />
      <Input label="Name" type="text" required {...form.register("name")} />
      <Input label="Email" type="email" required {...form.register("email")} />
      <Button
        type="submit"
        className="group relative mt-4 flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <LockClosedIcon
            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
            aria-hidden="true"
          />
        </span>
        Register
        {/* {session ? JSON.stringify(session.user) : "Sign in"} */}
      </Button>
    </Form>
  );
};
