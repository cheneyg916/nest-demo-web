/**
 * 运行时配置
 */
import { RequestConfig, RunTimeLayoutConfig, history } from '@umijs/max';
import { message } from 'antd';
import { Logout } from './components/Logout';

/**
 * 布局
 */
export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    rightContentRender: () => <Logout />,
  };
};

/**
 * 请求
 */
export const request: RequestConfig = {
  timeout: 1000,
  errorConfig: {
    errorHandler: (error: any) => {
      if ([400].includes(error.response.status)) {
        message.error(error.response?.data?.message);
      }
      if ([401].includes(error.response.status)) {
        history.replace('/login');
      }
    },
  },
  requestInterceptors: [
    (url, options) => {
      if (localStorage.getItem('access_token') !== null) {
        let token = localStorage.getItem('access_token');
        const headers = {
          Authorization: 'Bearer ' + token,
        };
        return {
          url,
          options: { ...options, headers },
        };
      }
      return {
        url,
        options,
      };
    },
  ],
};
