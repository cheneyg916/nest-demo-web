import {
  addNote,
  getNoteDetail,
  modifyNote,
} from '@/services/note';
import {
  ModalForm,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { FormInstance, message } from 'antd';
import { Dispatch, FC, MutableRefObject, SetStateAction } from 'react';

interface CreateFormProps {
  type: string;
  id: number | undefined;
  formRef: MutableRefObject<FormInstance | undefined>;
  modalVisible: boolean;
  onModalVisible: Dispatch<SetStateAction<boolean>>;
}

/**
 * 新建弹窗
 */
export const CreateForm: FC<CreateFormProps> = ({
  type,
  formRef,
  id,
  modalVisible,
  onModalVisible,
}) => {
  /**
   * 添加笔记
   */
  const handleAdd = async (fields: NOTE.NoteInfo) => {
    const hide = message.loading('正在添加');
    try {
      await addNote({ ...fields });
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };

  /**
   * 更新笔记
   */
  const handleUpdate = async (fields: NOTE.NoteInfo) => {
    const hide = message.loading('正在更新');
    try {
      await modifyNote(
        {
          noteId: fields.id,
        },
        {
          title: fields.title,
          content: fields.content,
        },
      );
      hide();
      message.success('更新成功');
      return true;
    } catch (error) {
      hide();
      message.error('更新失败请重试！');
      return false;
    }
  };

  return (
    <ModalForm
      width={600}
      layout="horizontal"
      title={type === 'new' ? '新建' : '编辑'}
      formRef={formRef}
      open={modalVisible}
      modalProps={{
        destroyOnClose: true,
      }}
      request={
        type === 'edit'
          ? async () => {
              const result = await getNoteDetail({
                noteId: id,
              });
              return result?.data;
            }
          : undefined
      }
      onFinish={type === 'new' ? handleAdd : handleUpdate}
      onOpenChange={onModalVisible}
    >
      <ProFormDigit hidden name="id" />
      <ProFormText
        name="title"
        label="标题"
        placeholder="请输入标题"
        rules={[
          {
            required: true,
            message: '标题不可为空',
          },
        ]}
      />

      <ProFormTextArea
        name="content"
        label="内容"
        placeholder="请输入内容"
        rules={[
          {
            required: true,
            message: '内容不可为空',
          },
        ]}
      />
    </ModalForm>
  );
};
