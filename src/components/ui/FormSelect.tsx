import type { ComponentProps, LegacyRef } from "react";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "./Label";
import { cn } from "../../utils/cn";

interface Props extends ComponentProps<"select"> {
  name: string;
  label: string;
  className?: string;
  hiddenLabel?: boolean;
}

export const FormSelect = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const form = useFormContext();
  const state = form.getFieldState(props.name);
  const { hiddenLabel, label, name, className, ...rest } = props;

  return (
    <>
      {hiddenLabel ? null : (
        <Label className="py-1.5 pr-2 text-sm font-semibold" htmlFor={name}>
          {label}
        </Label>
      )}
      <select
        {...rest}
        // bg-transparent
        className={cn(
          // "h-20",
          "mt-2 h-10 w-[180px] rounded-md border border-slate-300 bg-white py-2 px-3 text-sm capitalize placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-bgDark dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
          className
        )}
        id={name}
        name={name}
        ref={ref as LegacyRef<HTMLSelectElement>}
      />
      {state.error && (
        <p className="text-sm font-medium text-red-600">
          {state.error.message}
        </p>
      )}
    </>
  );
});
FormSelect.displayName = "FormSelect";
