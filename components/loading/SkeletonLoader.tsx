import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loader for table rows - matches actual table structure
 */
export function TableSkeletonLoader({ rows = 10 }: { rows?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton className="h-4 w-16" />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton className="h-4 w-12" />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton className="h-4 w-20" />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton className="h-4 w-16" />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton className="h-4 w-20" />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton className="h-4 w-24" />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Skeleton className="h-4 w-16" />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="ml-4 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Skeleton className="h-8 w-16" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Shimmer effect loader
 */
export function ShimmerLoader() {
  return (
    <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:1000px_100%] h-full w-full rounded" />
  );
}

/**
 * Progressive loading component
 */
export function ProgressiveLoader({ loaded, total }: { loaded: number; total: number }) {
  const percentage = Math.min((loaded / total) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      >
        <div className="h-full w-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
      </div>
    </div>
  );
}

