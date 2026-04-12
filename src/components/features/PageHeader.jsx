import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { OneGroupSelects } from '../shared/Selects';
import { Icons } from '../shared/Icons';
import { Buttons } from '../shared/Buttons';

export const PageHeader = ({
  title,
  typeSelect,
  launchStateSelect,
  addBtnText,
  openModal,
  selectedValue,
  onSelectValueChange,
}) => {
  return (
    <header className="flex h-auto shrink-0 items-center gap-2 border-b border-border-variant bg-surface shadow-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 py-5 px-5 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-auto" />
        <h1 className="text-lg ">{title}</h1>

        <div className="flex gap-5 ml-auto items-center">
          <OneGroupSelects
            content={typeSelect}
            onValueChange={(value) => onSelectValueChange('type', value)}
            value={selectedValue.type}
          />
          <OneGroupSelects
            content={launchStateSelect}
            onValueChange={(value) => onSelectValueChange('isEnabled', value)}
            value={selectedValue.isEnabled}
          />
          <Buttons size="lg" onClick={() => openModal('create')}>
            <Icons.add />
            {addBtnText}
          </Buttons>
        </div>
      </div>
    </header>
  );
};
