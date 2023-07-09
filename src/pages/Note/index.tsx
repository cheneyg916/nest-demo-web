import { deleteNote, queryNoteList } from '@/services/note';
import {
  ActionType,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, FormInstance, Popconfirm, Space, message } from 'antd';
import { FC, useRef, useState } from 'react';
import { CreateForm } from './components/CreateForm';

/**
 *  删除节点
 */
const handleRemove = async (fields: NOTE.NoteInfo) => {
  const hide = message.loading('正在删除');
  try {
    await deleteNote({
      noteId: fields.id,
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

/**
 * 记事本
 */
const Note: FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const [id, setId] = useState<number | undefined>(0);
  const [row, setRow] = useState<NOTE.NoteInfo>();
  const [type, setType] = useState('new');
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const columns: ProDescriptionsItemProps<NOTE.NoteInfo>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '标题为必填项',
          },
        ],
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      valueType: 'textarea',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '内容为必填项',
          },
        ],
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setType('edit');
              setId(record.id);
              setCreateModalVisible(true);
            }}
          >
            配置
          </Button>
          <Button type="link" onClick={() => setRow(record)}>
            详情
          </Button>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={async () => {
              const result = await handleRemove(record);
              if (result) {
                actionRef?.current?.reload();
              }
            }}
          >
            <Button danger type="link">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '记事本',
      }}
    >
      <ProTable<NOTE.NoteInfo>
        headerTitle="查询表格"
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => {
              setType('new');
              setCreateModalVisible(true);
            }}
          >
            新建
          </Button>,
        ]}
        request={async (params) => {
          const { data } = await queryNoteList({
            ...params,
          });
          return {
            data: data?.list || [],
            total: data?.total || 0,
            success: true,
          };
        }}
      />
      <CreateForm
        type={type}
        formRef={formRef}
        id={id}
        modalVisible={createModalVisible}
        onModalVisible={(value) => {
          setCreateModalVisible(value);
          if (!value) actionRef?.current?.reload();
        }}
      />

      <Drawer
        width={600}
        open={!!row}
        closable={false}
        onClose={() => {
          setRow(undefined);
        }}
      >
        {row?.title && (
          <ProDescriptions<NOTE.NoteInfo>
            column={2}
            title={row?.title}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.title,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Note;
