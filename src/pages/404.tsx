import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Result } from 'antd';

/**
 * 404页面
 */
const NotFoundPage: React.FC = () => (
  <PageContainer ghost>
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您浏览的页面不存在。"
      extra={
        <Button type="primary" onClick={() => history.replace('/home')}>
          返回首页
        </Button>
      }
    />
  </PageContainer>
);

export default NotFoundPage;
