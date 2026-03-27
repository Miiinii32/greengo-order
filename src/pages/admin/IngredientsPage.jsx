import { useEffect, useState } from 'react';
import { GETproducts } from '@/api/adminApi';
import { formatters } from '@/utils/formatters';
import { PageHeader } from '@/components/PageHeader';
import { AdminTable } from '@/components/shared/AdminTable';
import { TYPE_SELECT } from '@/config/admin/typeSelect';
import { LAUNCH_STATE_SELECT } from '@/config/admin/launchStateSelect';
import { PRODUCTS_TABLE_HEADER } from '@/config/admin/productsTableHeader';
import { ProductDetailPage } from './ProductDetailPage';

export const IngredientsPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await GETproducts();
        setAllProducts(res.products);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <PageHeader
        title="基本食材"
        typeSelect={TYPE_SELECT.ingredients}
        launchStateSelect={LAUNCH_STATE_SELECT}
        addText="新增食材"
      />
      <AdminTable
        headerContent={PRODUCTS_TABLE_HEADER.ingredients}
        productsContent={allProducts}
        formatters={formatters}
        openModal={handleOpenModal}
      />
      <ProductDetailPage isOpenModal={isOpenModal} onOpenChange={setIsOpenModal} />
    </>
  );
};
