export const applyInterceptors = (apiInstance) => {
  const toCamel = (str) => str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  const toSnake = (str) => str.replace(/[A-Z]/g, (letter) => '_' + letter.toLowerCase());
  const convertKeys = (data, convertFn) => {
    // 如果是特殊物件就直接跳過
    if (
      data instanceof FormData ||
      data instanceof File ||
      data instanceof Blob ||
      data instanceof Date
    ) {
      return data;
    }

    // 如果 data 是陣列判斷
    if (Array.isArray(data)) {
      return data.map((item) => convertKeys(item, convertFn));
    }

    // 如果 data 是物件判斷
    if (data !== null && typeof data === 'object') {
      const resultData = {};
      for (const key of Object.keys(data)) {
        const newKey = convertFn(key);
        const value = data[key];

        if (Array.isArray(value) || (value !== null && typeof value === 'object')) {
          resultData[newKey] = convertKeys(value, convertFn);
        } else {
          resultData[newKey] = value;
        }
      }
      return resultData;
    }
    return data;
  };
  const needTokenPath = ['admin', 'logout', 'user/check'];

  // ---- request 攔截器 ----
  apiInstance.interceptors.request.use(
    (config) => {
      config.data = convertKeys(config.data, toSnake);
      const isAuthPath = needTokenPath.some((path) => config.url.includes(path));
      const isLoginPath = config.url.includes('admin/signin');
      if (isAuthPath && !isLoginPath) {
        const ggoToken = document.cookie.replace(
          /(?:(?:^|.*;\s*)ggoToken\s*=\s*([^;]*).*$)|^.*$/,
          '$1',
        );
        config.headers.Authorization = ggoToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error.response.data);
    },
  );

  // ---- response 攔截器 ----
  apiInstance.interceptors.response.use(
    (response) => {
      if (response.data && response.headers['content-type']?.includes('application/json')) {
        return convertKeys(response.data, toCamel);
      }
      return response.data;
    },
    (error) => {
      return Promise.reject(error.response);
    },
  );
};
