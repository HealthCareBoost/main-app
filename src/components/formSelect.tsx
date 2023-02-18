import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

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
      <label htmlFor={props.name}>{props.label}</label>
      <select {...props} id={props.name} ref={ref} />
      {state.error && <p>{state.error.message}</p>}
    </div>
  );
});
Select.displayName = "FormSelect";
