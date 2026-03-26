import * as React from 'react';
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'group/badge inline-flex py-1 px-3 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-sm border border-transparent text-sm font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-4!',
  {
    variants: {
      variant: {
        default: 'bg-surface-dim text-on-surface-dim [a]:hover:bg-primary/80',
        success: 'bg-success-container text-on-success-container [a]:hover:bg-primary/80',
        error:
          'bg-error-container text-error focus-visible:ring-error/20 dark:bg-error/20 dark:focus-visible:ring-error/40 [a]:hover:bg-error/20',
        outline:
          'border-on-surface-light text-on-surface [a]:hover:-surface-hover/50 [a]:hover:text-on-surface',
        ghost: 'hover:hover:-surface-hover/50 hover:text-on-surface dark:hover:bg-muted/50',
        link: 'text-primary underline-offset-4 hover:underline',
        /* 依照功能分類 */
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  },
);

function Badge({ className, variant = 'default', asChild = false, ...props }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

// export { Badge, badgeVariants };
export { Badge };
