import { LockClosedIcon } from "@heroicons/react/20/solid";
import React from "react";
import { z } from "zod";
import { useZodForm } from "../../utils/useZodFormHook";
import { Button } from "../ui/Button";
import { Input } from "../ui/FormInput";
import { Form } from "../ui/FormProvider";
import { signIn, useSession } from "next-auth/react";

export const LoginForm: React.FC = () => {
  const { data: session } = useSession();
  const form = useZodForm({
    schema: z.object({
      email: z.string().email({ message: "Not a valid email" }),
    }),
  });

  return (
    <Form
      onSubmit={async (data) => {
        await signIn("email");
        console.log(data);
      }}
      form={form}
    >
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
        {/* {session ? JSON.stringify(session.user) : "Sign in"} */}
      </Button>
    </Form>
  );
};
