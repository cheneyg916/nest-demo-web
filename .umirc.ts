import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  model: {},
  request: {},
  layout: {
    title: '龙浩海的后台',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '登陆',
      path: '/login',
      component: './Login',
      // 不展示顶栏
      headerRender: false,
      // 不展示页脚
      footerRender: false,
      // 不展示菜单
      menuRender: false,
      // 不展示菜单顶栏
      menuHeaderRender: false,
      // 隐藏自己和子菜单
      hideInMenu: true,
    },
    {
      name: '注册',
      path: '/register',
      component: './Register',
      headerRender: false,
      footerRender: false,
      menuRender: false,
      menuHeaderRender: false,
      hideInMenu: true,
    },
    {
      name: '记事本',
      path: '/note',
      component: './Note',
    },
    { path: '/*', component: '@/pages/404.tsx' },
  ],
  npmClient: 'pnpm',
});
