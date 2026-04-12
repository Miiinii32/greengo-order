import { PRODUCTS_TABLE_HEADER } from './productTableHeader';
import { FILTER_LAUNCH_STATE_SELECT, FILTER_PRODUCTS_TYPE_SELECT } from './selectOptions';
import { formDefaultData } from './productFormDefaultData';
import { PRODUCT_DETAIL_PAGE } from './productDetailPage';

export const PRODUCT_LAYOUT = (category) => {
  return {
    ingredients: {
      header: {
        title: '基本食材',
        addBtnText: '基本食材',
        typeSelect: FILTER_PRODUCTS_TYPE_SELECT[category],
        launchStateSelect: FILTER_LAUNCH_STATE_SELECT,
      },
      table: {
        headerContent: PRODUCTS_TABLE_HEADER[category],
      },
      detailPage: {
        defaultValueContent: formDefaultData(category)[category],
        ProductDetailPageContent: PRODUCT_DETAIL_PAGE(category),
      },
    },
    fixedPokes: {
      header: {
        title: '固定POKE碗',
        addBtnText: '固定POKE碗',
        typeSelect: FILTER_PRODUCTS_TYPE_SELECT[category],
        launchStateSelect: FILTER_LAUNCH_STATE_SELECT,
      },
      table: {
        headerContent: PRODUCTS_TABLE_HEADER[category],
      },
      detailPage: {
        defaultValueContent: formDefaultData(category)[category],
        ProductDetailPageContent: PRODUCT_DETAIL_PAGE(category),
      },
    },
    otherProducts: {
      header: {
        title: '其他商品',
        addBtnText: '其他商品',
        typeSelect: FILTER_PRODUCTS_TYPE_SELECT[category],
        launchStateSelect: FILTER_LAUNCH_STATE_SELECT,
      },
      table: {
        headerContent: PRODUCTS_TABLE_HEADER[category],
      },
      detailPage: {
        defaultValueContent: formDefaultData(category)[category],
        ProductDetailPageContent: PRODUCT_DETAIL_PAGE(category),
      },
    },
  };
};
