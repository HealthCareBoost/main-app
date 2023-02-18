import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface Props extends ComponentProps<"input"> {
  name: string;
  label: string;
  className?: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const form = useFormContext();
  const state = form.getFieldState(props.name);

  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input {...props} ref={ref} />
      {state.error && <p>{state.error.message}</p>}
    </div>
  );
});
Input.displayName = "FormInput";
