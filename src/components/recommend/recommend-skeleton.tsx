import { Card } from '@/components/ui/card'

export function RecommendSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="mt-4 w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="mt-2 w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="text-center">
                <div className="w-12 h-4 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="mt-1 w-8 h-4 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
} 