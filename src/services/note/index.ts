import { request } from '@umijs/max';

/**
 * 查询列表
 */
export const queryNoteList = async (params: {
  title?: string;
  current?: number;
  pageSize?: number;
}) =>
  request<NOTE.ListResult>('/api/note', {
    method: 'GET',
    params: {
      ...params,
    },
  });

/**
 * 新增
 */
export const addNote = async (body?: NOTE.NoteInfo) =>
  request<NOTE.DetailResult>('/api/note', {
    method: 'POST',
    data: body,
  });

/**
 * 详情
 */
export const getNoteDetail = async ({ noteId }: { noteId?: number }) =>
  request<NOTE.DetailResult>(`/api/note/${noteId}`, {
    method: 'GET',
  });

/**
 * 编辑
 */
export const modifyNote = async (
  {
    noteId,
  }: {
    noteId?: number;
  },
  body?: NOTE.NoteInfo,
) =>
  request<NOTE.NoteInfo>(`/api/note/${noteId}`, {
    method: 'PATCH',
    data: body,
  });

/**
 * 删除
 */
export const deleteNote = async ({ noteId }: { noteId?: number }) =>
  request<NOTE.DeleteResult>(`/api/note/${noteId}`, {
    method: 'DELETE',
  });
