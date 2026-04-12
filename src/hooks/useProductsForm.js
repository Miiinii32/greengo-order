import { useForm, useWatch } from 'react-hook-form';
import { POSTsingleProduct, PUTsingleProduct } from '@/api/adminApi';
import { calContentSetNumber } from '@/utils/calContentSetNumber';

export const useProductsForm = ({
  modalType,
  formDefaultValue,
  formProductValue,
  contentSetSelectContent,
  onOpenChange,
  getProducts,
}) => {
  /* key field 輸入輸出內容轉換 */
  const valueToCamel = (str) => str.replace(/\s([a-z])/g, (match, letter) => letter.toUpperCase());
  const valueToSpace = (str) =>
    str.replace(/([A-Z])/g, (match, letter) => ` ${letter.toLowerCase()}`);

  const finalFormProductValue = formProductValue?.key
    ? { ...formProductValue, key: valueToSpace(formProductValue?.key) }
    : formProductValue;

  /* 根據 modalType 決定 reset 的資料 */
  const currentFormContent = modalType === 'create' ? formDefaultValue : finalFormProductValue;

  /* useForm 設定 */
  const formMethod = useForm({
    defaultValues: currentFormContent,
  });
  const { reset, control } = formMethod;

  // /* useWatch 監聽 */
  const allContentSet = useWatch({ control, name: 'contentSet' });
  const imageUrl = useWatch({ control, name: 'imageUrl' });
  const type = useWatch({ control, name: 'type' });

  /* 監聽 contentSet 結果並累加成物件給圖表自動計算 */
  const contentSetTotal = () => {
    if (!allContentSet)
      return { capacity: 0, price: 0, calories: 0, proteinGrams: 0, carbsGrams: 0, fatGrams: 0 };

    return allContentSet.reduce(
      (acc, curr) => {
        const targetItem = contentSetSelectContent.options.find((item) => item.value === curr.name);
        const targetItemCul = calContentSetNumber(targetItem, curr.capacity);
        acc.capacity += targetItemCul.capacity;
        acc.price += targetItemCul.price;
        acc.calories += targetItemCul.calories;
        acc.proteinGrams += targetItemCul.proteinGrams;
        acc.carbsGrams += targetItemCul.carbsGrams;
        acc.fatGrams += targetItemCul.fatGrams;
        return acc;
      },
      { capacity: 0, price: 0, calories: 0, proteinGrams: 0, carbsGrams: 0, fatGrams: 0 },
    );
  };

  /* submit 前篩整理送出資料 */
  const formatSubmitData = (data = {}) => {
    const finalKey = data.key && valueToCamel(data.key);
    let finalContent = data.content;
    if (typeof data.content === 'object' && !Array.isArray(data.content)) {
      const bucket = {
        base: [],
        protein: [],
        side: [],
        sauce: [],
        topping: [],
      };
      data.contentSet.forEach((item) => {
        const target = contentSetSelectContent.options.find((i) => item.name === i.value);
        if (target) bucket[target.type].push(target.value);
      });
      finalContent = bucket;
    } else if (Array.isArray(data.content)) {
      const bucket = data.contentSet.map((item) => item.name);
      finalContent = bucket;
    }
    const { id: _id, num: _num, ...rest } = data; // 將不使用的變數改名為 _id, _num(ESLint不報錯)

    return {
      ...rest,
      key: finalKey,
      content: finalContent,
      allergenTag: rest.allergenTag ?? [],
      originPrice: 0,
    };
  };

  const postSingleProduct = async (data) => {
    try {
      await POSTsingleProduct(data);
      onOpenChange(false);
      alert('新增產品成功');
    } catch (error) {
      console.error(error);
      alert('新增產品失敗');
    }
  };

  const putSingleProduct = async (id, data) => {
    try {
      await PUTsingleProduct(id, data);
      onOpenChange(false);
      alert('更新產品成功');
    } catch (error) {
      console.error(error);
      alert('更新產品失敗');
    }
  };

  /* cancel 方法 */
  const cancelProduct = () => {
    modalType === 'create' ? reset(formDefaultValue) : reset(formProductValue);
    onOpenChange(false);
  };

  /* submit 方法 */
  const postProduct = async (data) => {
    modalType === 'create'
      ? await postSingleProduct(formatSubmitData(data))
      : await putSingleProduct(formProductValue.id, formatSubmitData(data));

    getProducts();
  };

  return { ...formMethod, contentSetTotal, cancelProduct, postProduct, imageUrl, type };
};
