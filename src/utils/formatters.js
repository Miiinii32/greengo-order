/**
 * 根據英文 value 換成對應的中文
 * @param1 {string} valueCategory - type/nutrition/allergenTag/content
 * @param2 {string} enValue - 要轉換的英文字串
 * @returns {string} 轉換的中文字串
 */

import { FORMATTER_DATA } from '@/config/translateData';

export const formatters = (valueCategory, enValue) => {
  return FORMATTER_DATA[valueCategory][enValue];
};
