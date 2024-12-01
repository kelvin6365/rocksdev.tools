import { Skeleton } from "@/components/ui/skeleton";

export function ToolLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="mt-2 h-4 w-[300px]" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-[300px]" />
      </div>
    </div>
  );
}
