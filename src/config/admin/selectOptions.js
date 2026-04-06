export const FILTER_LAUNCH_STATE_SELECT = {
  placeholder: '上架狀態',
  options: [
    {
      text: '全部',
      value: 'all',
    },
    {
      text: '已下架',
      value: 'false',
    },
    {
      text: '上架中',
      value: 'true',
    },
  ],
};

export const FILTER_PRODUCTS_TYPE_SELECT = {
  ingredients: {
    placeholder: '產品類別',
    options: [
      {
        text: '全部',
        value: 'all',
      },
      {
        text: '基底',
        value: 'base',
      },
      {
        text: '蛋白質',
        value: 'protein',
      },
      {
        text: '配料',
        value: 'side',
      },
      {
        text: '醬料',
        value: 'sauce',
      },
      {
        text: '撒料',
        value: 'topping',
      },
    ],
  },
  fixedPokes: {
    placeholder: '請選擇類別',
    options: [
      {
        text: '全部',
        value: 'all',
      },
      {
        text: '輕食',
        value: 'light',
      },
      {
        text: '均衡',
        value: 'balanced',
      },
      {
        text: '高蛋白',
        value: 'highProtein',
      },
    ],
  },
  otherProducts: {
    placeholder: '請選擇類別',
    options: [
      {
        text: '全部',
        value: 'all',
      },
      {
        text: '飲品',
        value: 'drink',
      },
      {
        text: '湯品',
        value: 'soup',
      },
    ],
  },
};

export const PRODUCTS_CATEGORY_SELECT = {
  placeholder: '請選擇分類',
  options: [
    {
      text: '食材',
      value: 'ingredients',
    },
    {
      text: '固定 POKE 碗',
      value: 'fixedPokes',
    },
    {
      text: '其他商品',
      value: 'otherProducts',
    },
  ],
};

export const PRODUCTS_TYPE_SELECT = {
  ingredients: {
    placeholder: '請選擇類別',
    options: [
      {
        text: '基底',
        value: 'base',
      },
      {
        text: '蛋白質',
        value: 'protein',
      },
      {
        text: '配料',
        value: 'side',
      },
      {
        text: '醬料',
        value: 'sauce',
      },
      {
        text: '撒料',
        value: 'topping',
      },
    ],
  },
  fixedPokes: {
    placeholder: '請選擇類別',
    options: [
      {
        text: '輕食',
        value: 'light',
      },
      {
        text: '均衡',
        value: 'balanced',
      },
      {
        text: '高蛋白',
        value: 'highProtein',
      },
    ],
  },
  otherProducts: {
    placeholder: '請選擇類別',
    options: [
      {
        text: '飲品',
        value: 'drink',
      },
      {
        text: '湯品',
        value: 'soup',
      },
    ],
  },
};

export const VEGETARIAN_SELECT = {
  placeholder: '請選擇素食類別',
  options: [
    {
      text: '全素',
      value: 'vegan',
    },
    {
      text: '蛋奶素',
      value: 'lactoOvo',
    },
    {
      text: '非素食',
      value: 'nonVegetarin',
    },
  ],
};
