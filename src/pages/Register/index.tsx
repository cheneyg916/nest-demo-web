import { DEFAULT_NAME } from '@/constants';
import { register } from '@/services/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  PageContainer,
  ProFormDependency,
  ProFormText,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { FC } from 'react';
import styles from './index.less';

/**
 * 注册页面
 */
const RegisterPage: FC = () => (
  <PageContainer ghost>
    <div className={styles.container}>
      <LoginForm<{
        username: string;
        password: string;
      }>
        title={DEFAULT_NAME}
        subTitle="龙浩海的平台"
        submitter={{
          searchConfig: {
            submitText: '注册',
          },
        }}
        onFinish={async (values) => {
          await register({
            username: values?.username,
            password: values?.password,
          });
          history.replace('/login');
        }}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <ProFormDependency name={['password']}>
          {({ password }) => {
            return (
              <ProFormText.Password
                name="password2"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder="重复密码"
                rules={[
                  {
                    required: true,
                    message: '请重新输入密码！',
                  },
                  {
                    validator(_, value) {
                      if (!value || password === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次输入的密码不一致!'));
                    },
                  },
                ]}
              />
            );
          }}
        </ProFormDependency>
      </LoginForm>
    </div>
  </PageContainer>
);

export default RegisterPage;
