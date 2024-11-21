import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, alt, fallback, ...props }, ref) => {
    const [error, setError] = React.useState(false)

    return (
      <img
        ref={ref}
        src={error ? fallback || '/avatar-fallback.png' : src}
        alt={alt}
        onError={() => setError(true)}
        className={cn(
          "rounded-full object-cover",
          className
        )}
        {...props}
      />
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar } 