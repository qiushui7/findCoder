import * as React from 'react';
import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';

interface AvatarProps extends Omit<ImageProps, 'src'> {
  src?: string;
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  (
    {
      className,
      src = '',
      alt = '',
      fallback,
      width = 40,
      height = 40,
      ...props
    },
    ref,
  ) => {
    const [error, setError] = React.useState(false);

    return (
      <Image
        ref={ref}
        src={error ? fallback || '/avatar-fallback.png' : src}
        alt={alt}
        width={width}
        height={height}
        onError={() => setError(true)}
        className={cn('rounded-full object-cover', className)}
        {...props}
      />
    );
  },
);
Avatar.displayName = 'Avatar';

export { Avatar };
