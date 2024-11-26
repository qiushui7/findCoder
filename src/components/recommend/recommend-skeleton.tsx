import { Card } from '@/components/ui/card';

export function RecommendSkeleton() {
  return (
    <div className="grid grid-cols-5 gap-8 justify-center justify-items-center">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="w-64 h-80 bg-bgColor border border-borderColor rounded-2xl p-6"
        >
          {/* 头像和用户名区域 */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-24 h-24 rounded-full border-[3px] border-blueBorderColor overflow-hidden">
              <div className="w-full h-full bg-skeletonBgColor animate-pulse" />
            </div>
            {/* 用户名 */}
            <div className="mt-4 w-32 h-6 bg-skeletonBgColor rounded-full animate-pulse" />
            {/* GitHub 用户名 */}
            <div className="mt-2 w-24 h-4 bg-skeletonBgColor rounded-full animate-pulse" />
          </div>

          {/* Bio 区域 */}
          <div className="min-h-[50px] flex flex-col items-center gap-2">
            <div className="w-full h-4 bg-skeletonBgColor rounded-full animate-pulse" />
            <div className="w-3/4 h-4 bg-skeletonBgColor rounded-full animate-pulse" />
          </div>

          {/* Followers 区域 */}
          <div className="flex flex-col items-center justify-center mt-4">
            <div className="w-16 h-4 bg-skeletonBgColor rounded-full animate-pulse mb-2" />
            <div className="w-12 h-4 bg-skeletonBgColor rounded-full animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
