"use client";
import { cn } from "@/utils/cn";
import { Button, buttonVariants } from "../ui/Button";
import { signOut } from "next-auth/react";

interface SignOutButtonProps {
  styles?: string;
}

const SignOutButton = ({ styles }: SignOutButtonProps) => {
  return (
    <Button
      className={cn(
        buttonVariants({ variant: "destructive" }),
        `mx-auto mb-2 mt-auto w-3/5 self-end justify-self-end text-center hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800`,
        styles,
      )}
      onClick={() =>
        void signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}`,
        })
      }
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
