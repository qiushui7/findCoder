import * as React from "react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  value: number
  readonly?: boolean
  className?: string
}

export function StarRating({ value, readonly = false, className }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(value)
    const half = i === Math.floor(value) && value % 1 !== 0

    return (
      <span 
        key={i}
        className={cn(
          "text-lg",
          filled ? "text-yellow-400" : "text-gray-300",
          className
        )}
      >
        {half ? "★" : filled ? "★" : "☆"}
      </span>
    )
  })

  return (
    <div className="flex gap-0.5">
      {stars}
    </div>
  )
} 