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
    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn('rounded-full object-cover', className)}
        {...props}
      />
    );
  },
);
Avatar.displayName = 'Avatar';

export { Avatar };
