import { LoadingSpinner } from "@/components/Loading";

export default function Loading() {
  return (
    <div className="mt-[20%] flex h-full min-h-[300px] w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
