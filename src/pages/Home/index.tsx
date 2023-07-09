import { Guide } from '@/components/Guide';
import { PageContainer } from '@ant-design/pro-components';
import { FC } from 'react';
import styles from './index.less';
import { DEFAULT_NAME } from '@/constants';

/**
 * 首页
 */
const HomePage: FC = () => (
  <PageContainer ghost>
    <div className={styles.container}>
      <Guide name={DEFAULT_NAME} />
    </div>
  </PageContainer>
);

export default HomePage;
