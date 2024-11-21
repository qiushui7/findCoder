import { Suspense } from 'react'
import { RecommendList } from '@/components/recommend/recommend-list'
import { RecommendSkeleton } from '@/components/recommend/recommend-skeleton'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
          Trending Developers
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Discover top developers from around the world
        </p>
      </div>

      <Suspense fallback={<RecommendSkeleton />}>
        {/* <RecommendList /> */}
      </Suspense>
    </main>
  )
}
