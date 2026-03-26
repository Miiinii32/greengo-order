import * as React from 'react';
import { Switch as SwitchPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

function Switch({ className, size = 'default', ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        /* layout */
        'peer group/switch relative inline-flex shrink-0 items-center rounded-full  after:absolute after:-inset-x-1 after:-inset-y-2 ',
        /* style */
        'border border-transparent shadow-xs transition-all outline-none',
        /* focus */
        'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
        /* dark */
        'dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 dark:data-unchecked:bg-input/80',
        /* data- */
        'data-[size=default]:h-7 data-[size=default]:w-11 data-[size=sm]:h-6 data-[size=sm]:w-10 data-checked:bg-success data-unchecked:bg-on-surface-lighter data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-surface ring-0 transition-transform 
        ml-0.5 
        group-data-[size=default]/switch:size-5 
        group-data-[size=sm]/switch:size-4.5
        group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2.5px)]
        group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2.5px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
