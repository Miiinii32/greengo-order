/* hooks, utils */
import { useCallback, useEffect, useMemo, useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { GETproducts, DELETEsingleProduct } from '@/api/adminApi';

/* pages, component */
import { PageHeader } from '@/components/PageHeader';
import { AdminTable } from '@/components/shared/AdminTable';
import { ProductDetailPage } from '@/pages/admin/ProductDetailPage';

/* config */
import { PRODUCT_LAYOUT } from '@/config/admin/productLayout';

// 1. 定義 Reducer 處理所有狀態
// const productReducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_SUCCESS':
//       return {
//         ...state,
//         allProducts: action.payload,
//         filterState: { category: action.category, type: '', isEnabled: '' },
//       };
//     default:
//       return state;
//   }
// };

export const ProductsLayout = () => {
  const { category } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filterState, setFilterState] = useState({
    category: category,
    type: '',
    isEnabled: '',
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [modalType, setModalType] = useState(null);

  const handleChangeSelect = (selectName, selectValue) => {
    setFilterState((pre) => ({
      ...pre,
      [selectName]: selectValue,
    }));
  };

  /* 處理 table 篩選產品的邏輯 */
  const handleDisplayProducts = () => {
    const typeValue = filterState.type;
    const isEnabledValue = filterState.isEnabled;
    const categoryValue = filterState.category;
    return allProducts.filter((item) => {
      const categoryMatch = item.category === categoryValue;
      const typeMatch = typeValue === '' || typeValue === 'all' || item.type === typeValue;
      const isEnabledMatch =
        isEnabledValue === '' ||
        isEnabledValue === 'all' ||
        String(item.isEnabled) === isEnabledValue;
      return categoryMatch && typeMatch && isEnabledMatch;
    });
  };

  // const [state, dispatch] = useReducer(productReducer, {
  //   allProducts: [],
  //   filterState: { category: '', type: '', isEnabled: '' },
  // });

  // useEffect(() => {
  //   const init = async () => {
  //     const res = await GETproducts();
  //     // 同步發出一個 Action，React 會將裡面的狀態更新合併處理
  //     dispatch({ type: 'FETCH_SUCCESS', payload: res.products, category });
  //   };
  //   init();
  // }, [category]); // 這樣寫最乾淨，且絕對不會噴同步更新錯誤

  // const getProducts = useCallback(async () => {
  //   try {
  //     const res = await GETproducts();
  //     // 使用非同步確保這是在 Effect 執行完後的下一輪微任務
  //     Promise.resolve().then(() => {
  //       setAllProducts(res.products);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  /* 戳api拿prosucts ---> 給子元件使用 */
  const getProducts = useCallback(async () => {
    try {
      const res = await GETproducts();
      setAllProducts(res.products);
    } catch (error) {
      console.error(error);
    }
  }, []);

  /* 戳api拿prosucts ---> 給頁面初次載入使用 */
  useEffect(() => {
    getProducts();
    setFilterState((pre) => ({
      ...pre,
      category: category,
      type: '',
      isEnabled: '',
    }));
  }, [category, getProducts]);

  const handleOpenModal = (type, productData) => {
    setIsOpenModal(true);
    setModalProduct(productData);
    setModalType(type);
  };

  const deleteProduct = async (id) => {
    try {
      await DELETEsingleProduct(id);
      getProducts();
      alert('刪除產品成功');
    } catch (error) {
      console.error(error);
    }
  };

  const currentProductLayoutContent = useMemo(() => PRODUCT_LAYOUT(category)[category], [category]);

  return (
    <div>
      <PageHeader
        title={currentProductLayoutContent.header.title}
        typeSelect={currentProductLayoutContent.header.typeSelect}
        launchStateSelect={currentProductLayoutContent.header.launchStateSelect}
        addBtnText={currentProductLayoutContent.header.addBtnText}
        openModal={handleOpenModal}
        selectedValue={filterState}
        onSelectValueChange={handleChangeSelect}
      />
      <AdminTable
        headerContent={currentProductLayoutContent.table.headerContent}
        productsContent={handleDisplayProducts}
        openModal={handleOpenModal}
        deleteProduct={deleteProduct}
      />
      {isOpenModal && (
        <ProductDetailPage
          isOpenModal={isOpenModal}
          onOpenChange={setIsOpenModal}
          productContent={modalProduct}
          defaultContent={currentProductLayoutContent.detailPage.defaultContent}
          modalType={modalType}
          getProducts={getProducts}
        />
      )}
    </div>
  );
};
