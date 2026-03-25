import { PageHeader } from '@/components/PageHeader';
import { TYPE_SELECT } from '@/config/admin/typeSelect';
import { LAUNCH_STATE_SELECT } from '@/config/admin/launchStateSelect';

export const IngredientsPage = () => {
  return (
    <>
      <PageHeader
        title="基本食材"
        typeSelect={TYPE_SELECT.ingredients}
        launchStateSelect={LAUNCH_STATE_SELECT}
        addText="新增食材"
      />
      <p>食材管理頁面</p>
    </>
  );
};
