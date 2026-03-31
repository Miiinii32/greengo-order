/* hooks, utils */
import { useEffect, useState } from 'react';
import { GETproducts, DELETEsingleProduct } from '@/api/adminApi';
import { formatters } from '@/utils/formatters';

/* pages, component */
import { PageHeader } from '@/components/PageHeader';
import { AdminTable } from '@/components/shared/AdminTable';
import { ProductDetailPage } from './ProductDetailPage';

/* config */
import { SELECT_OPTIONS } from '@/config/admin/selectOptions';
import { LAUNCH_STATE_SELECT } from '@/config/admin/selectOptions';
import { PRODUCTS_TABLE_HEADER } from '@/config/admin/productsTableHeader';

export const IngredientsPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleOpenModal = (singleProduct) => {
    setIsOpenModal(true);
    setSelectedProduct(singleProduct);
  };

  const deleteProduct = (id) => {
    DELETEsingleProduct(id);
  };

  return (
    <>
      <PageHeader
        title="基本食材"
        typeSelect={SELECT_OPTIONS.products.ingredients.type}
        launchStateSelect={LAUNCH_STATE_SELECT}
        addText="新增食材"
      />
      <AdminTable
        headerContent={PRODUCTS_TABLE_HEADER.ingredients}
        productsContent={allProducts}
        formatters={formatters}
        openModal={handleOpenModal}
        deleteProduct={deleteProduct}
      />
      <ProductDetailPage
        isOpenModal={isOpenModal}
        onOpenChange={setIsOpenModal}
        productContent={selectedProduct}
      />
    </>
  );
};
