import { PageHeader } from '@/components/PageHeader';
import { TYPE_SELECT } from '@/config/admin/typeSelect';
import { LAUNCH_STATE_SELECT } from '@/config/admin/launchStateSelect';

export const OtherProductsPage = () => {
  return (
    <>
      <PageHeader
        title="其他商品"
        typeSelect={TYPE_SELECT.otherProducts}
        launchStateSelect={LAUNCH_STATE_SELECT}
        addText="新增其他商品"
      />
      <p>其他產品管理頁面</p>
    </>
  );
};
