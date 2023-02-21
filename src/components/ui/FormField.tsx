import { type PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

export interface UseFormFieldProps extends PropsWithChildren {
  name: string;
  label: string;
}

export const useFormField = <P extends UseFormFieldProps>(props: P) => {
  const { label, name, ...otherProps } = props;
  const id = name;

  return {
    formFieldProps: { id, name, label },
    childProps: { ...otherProps, id, name },
  };
};

interface Props extends UseFormFieldProps {
  id: string;
}

export const FormField = ({ children, name, id, label }: Props) => {
  const ctx = useFormContext();
  const state = ctx.getFieldState(name, ctx.formState);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children}
      {state.error && <p>{state.error.message}</p>}
    </div>
  );
};
