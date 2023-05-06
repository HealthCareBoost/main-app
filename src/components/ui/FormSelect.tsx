import type { ComponentProps, LegacyRef } from "react";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "./Label";
import { cn } from "../../utils/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";

interface Props extends ComponentProps<"select"> {
  name: string;
  label: string;
  className?: string;
}

export const FormSelect = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const form = useFormContext();
  const state = form.getFieldState(props.name);

  return (
    <div>
      <Label htmlFor={props.name}>{props.label}</Label>
      <select
        {...props}
        className={cn("mt-2", props.className)}
        id={props.name}
        ref={ref as LegacyRef<HTMLSelectElement>}
      />
      {state.error && (
        <p className="text-sm font-medium text-red-600">
          {state.error.message}
        </p>
      )}
    </div>
  );
});
FormSelect.displayName = "FormSelect";
