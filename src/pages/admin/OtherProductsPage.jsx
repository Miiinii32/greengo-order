import { PageHeader } from '@/components/PageHeader';
import { SELECT_OPTIONS } from '@/config/admin/selectOptions';
import { LAUNCH_STATE_SELECT } from '@/config/admin/selectOptions';

export const OtherProductsPage = () => {
  return (
    <>
      <PageHeader
        title="其他商品"
        typeSelect={SELECT_OPTIONS.products.otherProducts.type}
        launchStateSelect={LAUNCH_STATE_SELECT}
        addText="新增其他商品"
      />
      <p>其他產品管理頁面</p>
    </>
  );
};
