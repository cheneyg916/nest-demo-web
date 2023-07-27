import { Layout, Row, Typography } from 'antd';
import React from 'react';
import styles from './index.less';

interface Props {
  name?: string;
}

/**
 * 首页
 */
export const Guide: React.FC<Props> = (props) => {
  const { name } = props;

  return (
    <Layout>
      <Row>
        <Typography.Title level={3} className={styles.title}>
          欢迎使用 <strong>{name}</strong> ！
        </Typography.Title>
      </Row>
    </Layout>
  );
};
