declare namespace USER {
  interface ResponseResult<T> {
    code: number;
    message: string;
    data: T;
  }

  type LoginResult = ResponseResult<{
    access_token: string;
    type: string;
    userInfo: {
      id: number;
      username: string;
    };
  }>;

  type RegisterResult = ResponseResult<{
    username: string;
    password: string;
    id: number;
    created_at: string;
    updated_at: string;
  }>;

  interface UserInfo {
    username: string;
    password: string;
  }
}
