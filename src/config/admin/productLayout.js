import { PRODUCTS_TABLE_HEADER } from './productsTableHeader';
import { FILTER_LAUNCH_STATE_SELECT, FILTER_PRODUCTS_TYPE_SELECT } from './selectOptions';

const ingredientsDefaultData = (category = '') => {
  return {
    stockQuantity: 0,
    isEnabled: false,
    imageUrl: '',
    title: '',
    unit: '份',
    description: '',
    category: category,
    type: '',
    costPrice: 0,
    costCapacity: 100,
    costNutrition: {
      calories: 0,
      proteinGrams: 0,
      carbsGrams: 0,
      fatGrams: 0,
    },
    price: 0,
    capacity: 0,
    suitableTypeTag: [],
    allergenTag: [],
    VegetarianTag: '',
  };
};

export const PRODUCT_LAYOUT = (category) => {
  return {
    ingredients: {
      header: {
        title: '基本食材',
        addBtnText: '基本食材',
        typeSelect: FILTER_PRODUCTS_TYPE_SELECT.ingredients,
        launchStateSelect: FILTER_LAUNCH_STATE_SELECT,
      },
      table: {
        headerContent: PRODUCTS_TABLE_HEADER.ingredients,
      },
      detailPage: {
        defaultContent: ingredientsDefaultData(category),
      },
    },
    fixedPokes: {
      header: {
        title: '固定POKE碗',
        addBtnText: '固定POKE碗',
        typeSelect: FILTER_PRODUCTS_TYPE_SELECT.fixedPokes,
        launchStateSelect: FILTER_LAUNCH_STATE_SELECT,
      },
      table: {
        headerContent: PRODUCTS_TABLE_HEADER.fixedPokes,
      },
      detailPage: {
        defaultContent: ingredientsDefaultData(category),
      },
    },
    otherProducts: {
      header: {
        title: '其他商品',
        addBtnText: '其他商品',
        typeSelect: FILTER_PRODUCTS_TYPE_SELECT.otherProducts,
        launchStateSelect: FILTER_LAUNCH_STATE_SELECT,
      },
      table: {
        headerContent: PRODUCTS_TABLE_HEADER.otherProducts,
      },
      detailPage: {
        defaultContent: ingredientsDefaultData(category),
      },
    },
  };
};
