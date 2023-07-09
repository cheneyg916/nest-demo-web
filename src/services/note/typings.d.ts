declare namespace NOTE {
  interface PageInfo {
    total?: number;
    list?: Array<NoteInfo>;
  }

  interface NoteInfo {
    content: string;
    created_at?: string;
    id?: number;
    title: string;
    updated_at?: string;
  }

  interface ResponseResult<T> {
    code: number;
    message: string;
    data: T;
  }

  type DetailResult = ResponseResult<NoteInfo>;
  type ListResult = ResponseResult<PageInfo>;
  type DeleteResult = ResponseResult<{
    raw: any[];
    affected: number;
  }>;
}
