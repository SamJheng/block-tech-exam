export class ResponseResult<T = any> {
  constructor(params: Partial<ResponseResult<T>>) {
    Object.assign(this, params);
  }
  // @ApiProperty()
  status = "0";
  // @ApiProperty()
  message = "";
  // @ApiProperty()
  result: T | null = null;
}
