import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../utils/cn";
import { Label } from "./Label";

interface Props extends ComponentProps<"input"> {
  name: string;
  label: string;
  className?: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

export const ImageInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const form = useFormContext();
  const state = form.getFieldState(props.name);

  return (
    <div>
      <Label htmlFor={props.name}>{props.label}</Label>
      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                // className={cn(
                //   "flex h-10 w-full rounded-md border border-slate-100 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
                //   props.className
                // )}
                {...props}
                type="file"
                ref={ref}
                // multiple
                id="file-upload"
                name="file-upload"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
        {state.error && (
          <p className="text-sm font-medium text-red-600">
            {state.error.message}
          </p>
        )}
      </div>
    </div>
  );
});
ImageInput.displayName = "FormImageInput";
