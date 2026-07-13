import { HTMLAttributes } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

/**
 * Shared panel surface: white background, hairline border, soft shadow,
 * rounded corners. Every dashboard panel wraps its content in this.
 */
export function Card({ className, noPadding, children, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-card border border-border bg-surface shadow-card',
        noPadding ? 'p-0' : 'p-4',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;