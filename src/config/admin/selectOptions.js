export const LAUNCH_STATE_SELECT = {
  placeholder: '上架狀態',
  options: [
    {
      text: '未上架',
      value: false,
    },
    {
      text: '已上架',
      value: true,
    },
  ],
};

export const SELECT_OPTIONS = {
  products: {
    category: {
      placeholder: '請選擇分類',
      options: [
        {
          text: '食材',
          value: 'item',
        },
        {
          text: '固定 POKE 碗',
          value: 'fixed',
        },
        {
          text: '其他商品',
          value: 'other',
        },
      ],
    },
    ingredients: {
      type: {
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
      suitableTypeTag: {
        placeholder: '請選擇推薦分類',
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
      allergenTag: {
        placeholder: '請選擇過敏標籤',
        options: [
          {
            text: '牛肉',
            value: 'beef',
          },
          {
            text: '海鮮',
            value: 'seafish',
          },
          {
            text: '辣',
            value: 'spicy',
          },
          {
            text: '大豆',
            value: 'soy',
          },
          {
            text: '蛋',
            value: 'egg',
          },
          {
            text: '堅果',
            value: 'nuts',
          },
          {
            text: '芝麻',
            value: 'sesame',
          },
        ],
      },
    },
    fixedPokes: {
      type: {
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
    },
    otherProducts: {
      type: {
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
    },
  },
};
