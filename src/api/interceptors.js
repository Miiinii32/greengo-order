export const applyInterceptors = (apiInstance) => {
  const needTokenApi = ['admin', 'logout', 'user/check'];

  apiInstance.interceptors.request.use(
    (config) => {
      const needToken = needTokenApi.some((path) => config.url.includes(path));
      if (needToken) {
        if (config.url.includes('admin/signin')) return config;
        const ggoToken = document.cookie.replace(
          /(?:(?:^|.*;\s*)ggoToken\s*=\s*([^;]*).*$)|^.*$/,
          '$1',
        );
        config.headers = config.headers || {};
        config.headers.Authorization = `${ggoToken}`;
        return config;
      }
      return config;
    },
    (error) => {
      Promise.reject(error.response.data);
    },
  );
  apiInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      Promise.reject(error.response.data);
    },
  );
};
