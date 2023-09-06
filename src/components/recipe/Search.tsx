import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/Popover";
import { useDebounce } from "@/src/hooks/useDebounce";
import { api } from "@/src/utils/api";
import { cn } from "@/src/utils/cn";
import type { Recipe } from "@prisma/client";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import type { ComponentProps } from "react";
import React, { forwardRef, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/Button";
import { Command, CommandGroup } from "../ui/Command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/DropDown";

export const SearchBar: React.FC<{
  onSearchFinish: (name: string) => void;
}> = ({ onSearchFinish }) => {
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [selectedValue, setSelected] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const deb = useDebounce(searchedValue, 500);
  const { data, isLoading } = api.recipe.searchRecipeByName.useQuery({
    name: deb,
  });

  // console.log(selectedValue);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* <CommandInput placeholder="Type a command or search..." /> */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          id="recipeSearchBtn"
          aria-label="Search recipes button"
          className="w-[200px] justify-between sm:w-[380px]"
        >
          {selectedValue ? selectedValue : "Search Recipes..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 sm:w-[380px]">
        <Command className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
          {/* CommandInput */}
          <div
            className="flex items-center border-b px-3"
            cmdk-input-wrapper=""
          >
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className={
                "placeholder:text-foreground-muted flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
              }
              placeholder={"Select Recipe..."}
              type="text"
              onChange={(e) => {
                setSearchedValue(e.target.value);
                // if (e.target.value.length > 2 && !open) {
                //   // setOpen(true);
                // }
              }}
            />
          </div>

          {/* Empty  */}
          {!isLoading && (!data || data.length === 0) && (
            <div className="py-6 text-center text-sm">Not found.</div>
          )}

          {/* Group */}
          <CommandGroup className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
            {data &&
              data.map((recipe) => (
                <div
                  onClick={() => {
                    console.log("click");
                    setOpen(false);
                    setSelected((prev) =>
                      prev === recipe.name ? "" : recipe.name
                    );
                    onSearchFinish(
                      selectedValue === recipe.name ? "" : recipe.name
                    );
                  }}
                  aria-selected={selectedValue === recipe.name}
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  key={recipe.id}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === recipe.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {recipe.name}
                </div>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface Props extends ComponentProps<"input"> {
  name: string;
  className?: string;
  searchedValue: string;
  setSearchedValue: React.Dispatch<React.SetStateAction<string>>;
}

export const FormSearchBar = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { searchedValue, setSearchedValue, ...rest } = props;
    const [selectedValue, setSelected] = useState<Recipe | undefined>(
      undefined
    );
    const [openDropdown, setDropdownOpen] = React.useState(false);

    const deb = useDebounce(searchedValue, 500);
    const { data, isLoading } = api.recipe.searchRecipeByName.useQuery({
      name: deb,
    });

    const form = useFormContext();
    const state = form.getFieldState(props.name);

    useEffect(() => {
      if (searchedValue.length > 2) {
        setDropdownOpen(true);
      }
    }, [searchedValue]);

    return (
      <div className="p-0">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
          <div
            className="flex items-center border-b px-3"
            cmdk-input-wrapper=""
          >
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className={
                "placeholder:text-foreground-muted flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
              }
              placeholder={"Search Recipes..."}
              type="text"
              ref={ref}
              {...rest}
              autoComplete="off"
            />
          </div>

          {state.error && (
            <p className="text-sm font-medium text-red-600">
              {state.error.message}
            </p>
          )}
          <DropdownMenu open={openDropdown} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger></DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* Empty  */}
              {!isLoading && (!data || data.length === 0) && (
                <div
                  className="relative flex w-full min-w-[200px] cursor-default select-none items-center rounded-sm px-2 py-1.5 text-left text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  // className="py-6 text-center text-sm"
                >
                  Not found.
                </div>
              )}
              {data &&
                data.length > 0 &&
                data.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => {
                      // console.log("click");
                      setSelected((prev) => {
                        if (!prev) {
                          form.setValue("recipe_name", recipe.name);
                          return recipe;
                        }
                        if (prev.name === recipe.name) {
                          form.setValue("recipe_name", undefined);
                          return undefined;
                        }
                        form.setValue("recipe_name", recipe.name);
                        return recipe;
                      });
                    }}
                    aria-selected={
                      selectedValue && selectedValue.name === recipe.name
                    }
                    className="relative flex min-w-[200px] cursor-default select-none items-center rounded-sm px-2 py-1.5 text-left text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue && selectedValue.name === recipe.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {recipe.name}
                  </div>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <div className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"></div> */}
        </div>
      </div>
    );
  }
);
FormSearchBar.displayName = "FormRecipeSearchBar";
