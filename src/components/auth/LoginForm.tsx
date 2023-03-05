import { LockClosedIcon } from "@heroicons/react/20/solid";
import React from "react";
import { z } from "zod";
import { useZodForm } from "../../utils/useZodFormHook";
import { Button } from "../ui/Button";
import { Input } from "../ui/FormInput";
import { Form } from "../ui/FormProvider";
import { signIn } from "next-auth/react";

export const LoginForm: React.FC<{ csrfToken: string }> = ({ csrfToken }) => {
  const form = useZodForm({
    schema: z.object({
      csrfToken: z.string(),
      email: z.string().email({ message: "Not a valid email" }),
    }),
    defaultValues: {
      csrfToken,
    },
  });

  {
    /* <form method="post" action="/api/auth/signin/email">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            Email address
            <input type="text" id="email" name="email" />
          </label>
          <button type="submit">Use your Email</button>
        </form> */
  }
  return (
    <Form
      onSubmit={async (data) => {
        console.log(data);
        await signIn("email", { email: data.email });
      }}
      form={form}
    >
      <Input
        label="csrf"
        hidden
        type="hidden"
        {...form.register("csrfToken")}
      />
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
        Sign In
      </Button>
    </Form>
  );
};
