"use client";

import * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return <button className={className} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

// interface Props extends Omit<React.ComponentProps<"button">, "type"> {}
type SubmitButtonProps = Omit<React.ComponentProps<"button">, "type">;

export const SubmitButton = (props: SubmitButtonProps) => (
  <button {...props} type="submit" />
);
