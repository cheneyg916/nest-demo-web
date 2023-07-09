import { request } from '@umijs/max';

/**
 * 注册
 */
export const register = async (body: USER.UserInfo) =>
  request<USER.RegisterResult>('/api/user', {
    method: 'POST',
    data: body,
  });

/**
 * 登陆
 */
export const login = async (body: USER.UserInfo) =>
  request<USER.LoginResult>('/api/auth/login', {
    method: 'POST',
    data: body,
  });
