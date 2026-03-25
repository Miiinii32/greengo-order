import { PageHeader } from '@/components/PageHeader';
import { TYPE_SELECT } from '@/config/admin/typeSelect';
import { LAUNCH_STATE_SELECT } from '@/config/admin/launchStateSelect';

export const FixedPokesPage = () => {
  return (
    <>
      <PageHeader
        title="固定POKE碗"
        typeSelect={TYPE_SELECT.fixedPokes}
        launchStateSelect={LAUNCH_STATE_SELECT}
        addText="新增固定碗"
      />
      <p>固定餐管理頁</p>
    </>
  );
};
