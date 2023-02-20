import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "./Label";

interface Props extends ComponentProps<"select"> {
  name: string;
  label: string;
  className?: string;
}

export const Select = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const form = useFormContext();
  const state = form.getFieldState(props.name);

  return (
    <div>
      <Label htmlFor={props.name}>{props.label}</Label>
      <select {...props} id={props.name} ref={ref} />
      {state.error && (
        <p className="text-sm font-medium text-red-600">
          {state.error.message}
        </p>
      )}
    </div>
  );
});
Select.displayName = "FormSelect";
