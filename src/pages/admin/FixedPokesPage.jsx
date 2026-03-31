import { PageHeader } from '@/components/PageHeader';
import { SELECT_OPTIONS } from '@/config/admin/selectOptions';
import { LAUNCH_STATE_SELECT } from '@/config/admin/selectOptions';

export const FixedPokesPage = () => {
  return (
    <>
      <PageHeader
        title="固定POKE碗"
        typeSelect={SELECT_OPTIONS.products.fixedPokes.type}
        launchStateSelect={LAUNCH_STATE_SELECT}
        addText="新增固定碗"
      />
      <p>固定餐管理頁</p>
    </>
  );
};
