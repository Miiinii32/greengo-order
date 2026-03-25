import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { OneGroupSelects } from './shared/Selects';
import { Icons } from './shared/Icons';
import { Buttons } from './shared/Buttons';

export const PageHeader = ({ title, typeSelect, launchStateSelect, addText }) => {
  return (
    <header className="flex h-auto shrink-0 items-center gap-2 border-b border-outline bg-surface shadow-sm  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 py-4 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-auto" />
        <h1 className="text-xl ">{title}</h1>

        <div className="flex gap-4 ml-auto">
          <OneGroupSelects content={typeSelect} />
          <OneGroupSelects content={launchStateSelect} />
          <Buttons size="lg">
            <Icons.add />
            {addText}
          </Buttons>
        </div>
      </div>
    </header>
  );
};
