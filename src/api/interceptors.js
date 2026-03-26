export const applyInterceptors = (apiInstance) => {
  const needTokenPath = ['admin', 'logout', 'user/check'];

  apiInstance.interceptors.request.use(
    (config) => {
      const isAuthPath = needTokenPath.some((path) => config.url.includes(path));
      const isLoginPath = config.url.includes('admin/signin');

      if (isAuthPath && !isLoginPath) {
        const ggoToken = document.cookie.replace(
          /(?:(?:^|.*;\s*)ggoToken\s*=\s*([^;]*).*$)|^.*$/,
          '$1',
        );
        config.headers.Authorization = ggoToken;
        return config;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error.response.data);
    },
  );
  apiInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error.response);
    },
  );
};
