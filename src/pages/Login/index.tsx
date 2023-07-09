import { DEFAULT_NAME } from '@/constants';
import { login } from '@/services/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  PageContainer,
  ProFormText,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Row } from 'antd';
import { FC } from 'react';
import styles from './index.less';

/**
 * 登录页面
 */
const LoginPage: FC = () => (
  <PageContainer ghost>
    <div className={styles.container}>
      <LoginForm<{
        username: string;
        password: string;
      }>
        title={DEFAULT_NAME}
        subTitle="龙浩海的平台"
        actions={
          <Row justify="end">
            <a onClick={() => history.push('/register')}>注册账号</a>
          </Row>
        }
        onFinish={async (values) => {
          const result = await login(values);
          localStorage.setItem(
            'access_token',
            result?.data?.access_token || '',
          );
          localStorage.setItem(
            'user_info',
            JSON.stringify(result?.data?.userInfo || {}),
          );
          history.replace('/');
        }}
      >
        <ProFormText
          name="username"
          placeholder="用户名"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          placeholder="密码"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </LoginForm>
    </div>
  </PageContainer>
);

export default LoginPage;
