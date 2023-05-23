import { useDebounce } from "@/src/hooks/useDebounce";
import { api } from "@/src/utils/api";
import { Check, Search } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/Popover";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/Button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
} from "../ui/Command";
import { cn } from "@/src/utils/cn";

export const SearchBar: React.FC = () => {
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [selectedValue, setSelected] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const deb = useDebounce(searchedValue, 500);
  const { data, isFetching, isLoading } =
    api.recipe.searchRecipeByName.useQuery({
      name: deb,
    });

  console.log(selectedValue);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* <CommandInput placeholder="Type a command or search..." /> */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedValue ? selectedValue : "Select Recipe..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
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
              placeholder={"Search Recipes..."}
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
