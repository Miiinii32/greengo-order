// 將英文 value 換成對應中文字

import { FORMATTER_DATA } from '@/config/translateData';

export const formatters = (enValue) => {
  return FORMATTER_DATA[enValue];
};
