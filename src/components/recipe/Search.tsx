import { useDebounce } from "@/src/hooks/useDebounce";
import { api } from "@/src/utils/api";
import { Search } from "lucide-react";
import React, { useState } from "react";

export const SearchBar: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const deb = useDebounce(value, 500);
  const { data, isFetching, isLoading } =
    api.recipe.searchRecipeByName.useQuery({
      name: deb,
    });

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
      {/* <CommandInput placeholder="Type a command or search..." /> */}
      <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          className={
            "placeholder:text-foreground-muted flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
          }
          type="text"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      {isLoading && <p>Loadiing...</p>}

      {/* /* <CommandList> */}

      {/* <CommandGroup heading="Suggestions"> */}
      {/* <CommandItem> */}
      <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
        <div className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
          {data &&
            data.map((res) => (
              <div
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                key={res.id}
              >
                {res.id} - {res.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
