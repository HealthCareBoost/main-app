import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../../utils/cn";
import { Label } from "./Label";

interface Props extends ComponentProps<"input"> {
  name: string;
  label: string;
  hidden?: boolean;
  hiddenLabel?: boolean;
  className?: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const form = useFormContext();
  const state = form.getFieldState(props.name);

  const { hiddenLabel, name, label, className, ...inputProps } = props;

  return (
    <div>
      {props.hidden || hiddenLabel ? null : (
        <Label htmlFor={name}>{label}</Label>
      )}
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-100 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
          className
        )}
        {...inputProps}
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
Input.displayName = "FormInput";
// className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
