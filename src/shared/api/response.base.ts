import { IdResponse } from './id.response.dto'

export type ResponseBaseProps<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'obj'> & {
  id: string
  createdAt: Date
  updatedAt: Date
}

export class ResponseBase extends IdResponse {
  constructor(props: ResponseBaseProps<ResponseBase>) {
    super(props.id)
    this.createdAt = new Date(props.createdAt).toISOString()
    this.updatedAt = new Date(props.updatedAt).toISOString()
  }

  public readonly createdAt: string
  public readonly updatedAt: string
}
