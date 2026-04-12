/**
 * 根據單一食材資料與輸入克數，計算出對應的金額與營養素
 * @param1 {Object} itemData - 從 contentSet 裡 select 被選中的食材物件
 * @param2 {Number|String} inputCapacity - 使用者輸入的克數
 * @returns {Object} 包含 price, calories, proteinGrams, carbsGrams, fatGrams 的物件
 */

export const calContentSetNumber = (itemData, inputCapacity) => {
  const costCapacity = itemData?.costCapacity || 0;
  const capacity = Number(inputCapacity) || 0;

  if (!itemData || capacity === 0)
    return { capacity: 0, price: 0, calories: 0, proteinGrams: 0, carbsGrams: 0, fatGrams: 0 };

  /* 固定算法：除以成本份量乘上上架份量 */
  const ratio = capacity / costCapacity;

  return {
    capacity: capacity,
    price: itemData.costPrice * ratio,
    calories: itemData.nutrition.calories * ratio,
    proteinGrams: itemData.nutrition.proteinGrams * ratio,
    carbsGrams: itemData.nutrition.carbsGrams * ratio,
    fatGrams: itemData.nutrition.fatGrams * ratio,
  };
};
