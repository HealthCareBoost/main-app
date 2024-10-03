import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="lg:px-18 container mx-auto flex w-full flex-col items-center justify-center px-4 pt-2 md:px-8 lg:pt-8">
      <Loader2 className={"size-20 animate-spin"} />
      <div className="text-lg">Loading...</div>
    </div>
  );
}
