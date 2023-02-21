"use client";

import * as React from "react";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "./Label";
import { cn } from "../../utils/cn";

interface Props extends ComponentProps<"textarea"> {
  name: string;
  label: string;
  className?: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface TextareaProps
//   extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const form = useFormContext();
  const state = form.getFieldState(props.name);

  return (
    <div>
      <Label htmlFor={props.name}>{props.label}</Label>
      <textarea
        className={cn(
          "flex h-20 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
          props.className
        )}
        {...props}
        id={props.name}
        ref={ref}
      />
      {state.error && (
        <p className="text-sm font-medium text-red-600">
          {state.error.message}
        </p>
      )}
    </div>
  );
});
Textarea.displayName = "FormTextarea";
