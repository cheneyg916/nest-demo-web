import { QuestionCircleOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Avatar, Popconfirm } from 'antd';
import { FC } from 'react';
import styles from './index.less';

/**
 * 注销
 */
export const Logout: FC = () => {
  const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');

  return (
    <Popconfirm
      title="确认退出吗？"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={() => {
        localStorage.clear();
        history.replace('/login');
      }}
    >
      <Avatar className={styles.avatar} size="large" gap={4}>
        {userInfo.username}
      </Avatar>
    </Popconfirm>
  );
};
