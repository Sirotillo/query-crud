import { Skeleton } from '../ui/skeleton';

export const CardLoading = () => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
};