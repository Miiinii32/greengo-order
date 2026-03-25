import * as React from 'react';
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-on-primary hover:bg-primary-dim',
        outline:
          'border border-outline-light bg-surface text-on-surface-light hover:bg-surface hover:text-primary hover:border-primary aria-expanded:bg-surface-dim aria-expanded:text-primary dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-surface-dim text-on-surface-light hover:bg-surface-dim-hover aria-expanded:bg-surface-dim aria-expanded:text-primary',
        ghost:
          'text-on-surface-light hover:text-primary hover:bg-surface-dim-hover/50 active:bg-primary active:text-on-primary focus:bg-primary focus:text-on-primary  aria-expanded:bg-surface-dim aria-expanded:text-primary dark:hover:bg-muted/60',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        lg: 'gap-2 px-5 py-2.5 h-11 in-data-[slot=button-group]:rounded-md text-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        md: "gap-2 px-4 py-2 rounded-md text-md in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-4",
        sm: 'gap-2 px-3.5 py-2 rounded-md text-sm in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
        // lg: 'h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        iconMd:
          "size-10 [&_svg:not([class*='size-'])]:size-8 [&_svg]:text-on-surface-light rounded-md",
        // 'icon-xs':
        //   "size-9 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        iconSm:
          "size-9 rounded-md [&_svg:not([class*='size-'])]:size-4 [&_svg]:text-on-surface-light",
        iconLg:
          "size-11 [&_svg:not([class*='size-'])]:size-6 [&_svg]:text-on-surface-light rounded-md",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

function Buttons({ className, variant = 'default', size = 'md', asChild = false, ...props }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Buttons };
