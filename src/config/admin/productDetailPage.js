import {
  PRODUCTS_CATEGORY_SELECT,
  PRODUCTS_TYPE_SELECT,
  VEGETARIAN_SELECT,
} from '@/config/admin/selectOptions';
import { ALLERGEN_TAG } from '@/config/admin/checkboxOptions';

const ONSALE_DESCRIPTION = {
  ingredients: '此金額與份量將作為 Poke 碗組裝時的計算基準。',
  fixedPokes: '- 請參考系統試算數值填寫\n- 填寫的數值將顯示於前台點餐介面，供顧客參考。',
  otherProducts: '以下數值將同步顯示於前台，作為使用者點餐時的參考依據。',
};
const ONSALE_FIELD_TEXT = {
  ingredients: '自選餐每碗的食材份量(g)',
  fixedPokes: '前台顯示每碗上架份量(g)',
  otherProducts: '前台顯示每杯上架份量(g)',
};
const CONTENT_DESCRIPTION = {
  ingredients: '',
  fixedPokes:
    '- 此區塊用於設定固定餐內容物。\n- 所選食材之總金額、份量及營養素將由系統自動計算，並彙整於下方『上架設定』作為填寫參考。',
  otherProducts:
    '- 此區塊用於設定產品包含的內容物。\n- 請以文字敘述產品組成，此內容將直接顯示於前台產品頁面，供顧客參考。',
};

export const PRODUCT_DETAIL_PAGE = (category, type) => [
  /* 庫存與上架 */
  {
    id: 'stock',
    title: '庫存與上架',
    description: '調整庫存與上架前台供點餐與否',
    fields: [
      {
        /* 庫存量 stockQuantity */
        fieldText: '庫存量',
        component: 'input',
        fieldId: 'stockQuantity',
        dataKeyId: 'stockQuantity',
        fieldType: 'number',
        placeholder: '請輸入目前庫存量',
        fieldRules: { required: '必填' },
        isReadOnly: false,
        grid: 'col-span-1',
      },
      {
        /* 是否上架 isEnabled */
        fieldText: '是否上架',
        component: 'switch',
        fieldId: 'isEnabled',
        grid: 'col-span-1',
      },
    ],
  },
  /* 基本設定 */
  {
    id: 'basic',
    title: '基本設定',
    description: '產品相關的基本設定',
    fields: [
      /* 產品名稱 title */
      {
        fieldText: '產品名稱',
        component: 'input',
        fieldType: 'text',
        fieldId: 'title',
        dataKeyId: 'title',
        placeholder: '請輸入產品名稱',
        fieldRules: {
          required: '必填',
          maxLength: { value: 10, message: '產品名稱最多10個字' },
        },
        isReadOnly: false,
        grid: 'col-span-1',
      },
      category === 'ingredients'
        ? /* 產品key key */
          {
            fieldText: '產品key(獨一無二)',
            component: 'input',
            fieldType: 'text',
            fieldId: 'key',
            dataKeyId: 'key',
            placeholder: '請輸入產品單一key',
            fieldRules: {
              required: '必填',
            },
            isReadOnly: false,
            grid: 'col-span-1',
          }
        : /* 單位 unit  */
          {
            fieldText: '單位',
            component: 'input',
            fieldType: 'text',
            fieldId: 'unit',
            dataKeyId: 'unit',
            placeholder: '',
            fieldRules: {
              required: '必填',
            },
            isReadOnly: true,
            grid: 'col-span-1',
          },
      /* 分類 category */
      {
        fieldText: '產品分類',
        component: 'select',
        fieldId: 'category',
        selectContent: PRODUCTS_CATEGORY_SELECT,
        fieldRules: {
          required: '必填',
        },
        grid: 'col-span-1',
      },
      /* 類別 type */
      {
        fieldText: '產品類別',
        component: 'select',
        fieldId: 'type',
        selectContent: PRODUCTS_TYPE_SELECT[category],
        fieldRules: {
          required: '必填',
        },
        grid: 'col-span-1',
      },
      /* 產品介紹 description */
      {
        fieldText: '產品介紹',
        component: 'input',
        fieldType: 'text',
        fieldId: 'description',
        dataKeyId: 'description',
        placeholder: '請輸入產品介紹',
        fieldRules: {
          maxLength: { value: 15, message: '產品名介紹不得超過15個字' },
        },
        isReadOnly: false,
        grid: category === 'ingredients' ? 'col-span-1' : 'col-span-2',
      },
      category === 'ingredients' && /* 單位 unit  */ {
        fieldText: '單位',
        component: 'input',
        fieldType: 'text',
        fieldId: 'unit',
        dataKeyId: 'unit',
        placeholder: '',
        fieldRules: {
          required: '必填',
        },
        isReadOnly: true,
        grid: 'col-span-1',
      },
      /* 上傳圖片 imageUrl */
      {
        fieldText: '上傳圖片',
        component: 'input',
        fieldType: 'text',
        fieldId: 'imageUrl',
        dataKeyId: 'imageUrl',
        placeholder: '請輸入圖片網址',
        isReadOnly: false,
        grid: 'col-span-2',
      },
    ].filter(Boolean),
  },
  /* 成本設定 */
  category === 'ingredients' && {
    id: 'cost',
    title: '成本設定',
    description: '數值均以基本份量為統計基準',
    fields: [
      /* 成本價格 costPrice */
      {
        fieldText: '成本價格',
        component: 'input',
        fieldType: 'number',
        fieldId: 'costPrice',
        dataKeyId: 'costPrice',
        placeholder: '請輸入每100g的成本價',
        fieldRules: {
          required: '必填',
          min: {
            value: 0,
            message: '金額不可低於0元',
          },
        },
        isReadOnly: false,
        grid: 'col-span-1',
      },
      /* 基本份量 costCapacity */
      {
        fieldText: '基本份量(g)',
        component: 'input',
        fieldType: 'number',
        fieldId: 'costCapacity',
        dataKeyId: 'costCapacity',
        placeholder: '',
        fieldRules: { required: '必填' },
        isReadOnly: true,
        grid: 'col-span-1',
      },
      /* 熱量 calories */
      {
        fieldText: '基本份量的熱量(g)',
        component: 'input',
        fieldType: 'number',
        fieldId: 'calories',
        dataKeyId: 'nutrition.calories',
        placeholder: '請輸入每100g的食材熱量',
        fieldRules: {
          required: '必填',
        },
        isReadOnly: false,
        specialNumberStep: '0.1',
        grid: 'col-span-1',
      },
      /* 蛋白量 protein */
      {
        fieldText: '基本份量的蛋白量(g)',
        component: 'input',
        fieldType: 'number',
        fieldId: 'proteinGrams',
        dataKeyId: 'nutrition.proteinGrams',
        placeholder: '請輸入每100g的蛋白量',
        fieldRules: {
          required: '必填',
        },
        isReadOnly: false,
        specialNumberStep: '0.1',
        grid: 'col-span-1',
      },
      /* 碳水量 carbsGrams */
      {
        fieldText: '基本份量的碳水量(g)',
        component: 'input',
        fieldType: 'number',
        fieldId: 'carbsGrams',
        dataKeyId: 'nutrition.carbsGrams',
        placeholder: '請輸入每100g的碳水量',
        fieldRules: {
          required: '必填',
        },
        isReadOnly: false,
        specialNumberStep: '0.1',
        grid: 'col-span-1',
      },
      /* 脂肪量 fatGrams */
      {
        fieldText: '基本份量的脂肪量(g)',
        component: 'input',
        fieldType: 'number',
        fieldId: 'fatGrams',
        dataKeyId: 'nutrition.fatGrams',
        placeholder: '請輸入每100g的脂肪量',
        fieldRules: {
          required: '必填',
        },
        isReadOnly: false,
        specialNumberStep: '0.1',
        grid: 'col-span-1',
      },
    ],
  },
  /* 內容物設定 */
  category !== 'ingredients' && {
    id: 'content',
    title: '內容物設定',
    description: CONTENT_DESCRIPTION[category],
    fields: [],
  },
  /* 上架設定 */
  {
    id: 'onSale',
    title: '上架設定',
    description: ONSALE_DESCRIPTION?.[category],
    fields: [
      /* 上架份量 capacity */
      {
        fieldText: ONSALE_FIELD_TEXT?.[category],
        component: 'input',
        fieldType: 'number',
        fieldId: 'capacity',
        dataKeyId: 'capacity',
        placeholder: '請輸入上架份量',
        fieldRules: {
          required: '必填',
          min: {
            value: 0,
            message: '份量不得小於零',
          },
        },
        isReadOnly: false,
        grid: 'col-span-1',
      },
      /* 上架售價 price */
      {
        fieldText: '前台顯示售價金額',
        component: 'input',
        fieldType: 'number',
        fieldId: 'price',
        dataKeyId: 'price',
        placeholder: '請輸入上架售價',
        fieldRules: {
          required: '必填',
          min: {
            value: 0,
            message: '金額不得小於零',
          },
        },
        isReadOnly: false,
        grid: 'col-span-1',
      },
      ...(category !== 'ingredients'
        ? [
            /* 熱量 calories */ {
              fieldText: '前台顯示熱量(g)',
              component: 'input',
              fieldType: 'number',
              fieldId: 'calories',
              dataKeyId: 'nutrition.calories',
              placeholder: '請輸入產品熱量',
              fieldRules: {
                required: '必填',
              },
              isReadOnly: false,
              specialNumberStep: '0.1',
              grid: 'col-span-1',
            },
            /* 蛋白量 proteinGrams */
            {
              fieldText: '前台顯示蛋白量(g)',
              component: 'input',
              fieldType: 'number',
              fieldId: 'proteinGrams',
              dataKeyId: 'nutrition.proteinGrams',
              placeholder: '請輸入產品蛋白量',
              fieldRules: {
                required: '必填',
              },
              isReadOnly: false,
              specialNumberStep: '0.1',
              grid: 'col-span-1',
            },
            /* 碳水量 carbsGrams */
            {
              fieldText: '前台顯示碳水量(g)',
              component: 'input',
              fieldType: 'number',
              fieldId: 'carbsGrams',
              dataKeyId: 'nutrition.carbsGrams',
              placeholder: '請輸入產品碳水量',
              fieldRules: {
                required: '必填',
              },
              isReadOnly: false,
              specialNumberStep: '0.1',
              grid: 'col-span-1',
            },
            /* 脂肪量 fatGrams */
            {
              fieldText: '前台顯示脂肪量(g)',
              component: 'input',
              fieldType: 'number',
              fieldId: 'fatGrams',
              dataKeyId: 'nutrition.fatGrams',
              placeholder: '請輸入產品脂肪量',
              fieldRules: {
                required: '必填',
              },
              isReadOnly: false,
              specialNumberStep: '0.1',
              grid: 'col-span-1',
            },
          ]
        : []),
    ],
  },
  /* 標籤設定 */
  {
    id: 'tag',
    title: '標籤設定',
    description: '- 素食標籤: 紀錄食材是否為素食和素食類別 \n- 過敏標籤: 紀錄食材過敏內容',
    fields: [
      /* 素食標籤 VegetarianTag */
      {
        fieldText: '素食標籤',
        component: 'select',
        fieldId: 'vegetarianTag',
        selectContent: VEGETARIAN_SELECT,
        fieldRules: {
          required: '必填',
        },
        grid: 'col-span-1',
      },
      /* 過敏標籤 allergenTag */
      {
        fieldText: '過敏標籤',
        component: 'checkbox',
        fieldId: 'allergenTag',
        checkboxContent:
          (ALLERGEN_TAG?.[type]?.options || ALLERGEN_TAG?.ingredients?.options) ?? [],
        grid: 'col-span-2',
      },
    ],
  },
];
