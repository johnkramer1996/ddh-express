import { IdResponse } from './id.response.dto'

export type ResponseBaseProps<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'> & {
  id: string
  createdAt: Date
  updatedAt: Date
}

// export type ResponseBaseProps ={
//   id: string
//   createdAt: Date
//   updatedAt: Date
// }

export class ResponseBase extends IdResponse {
  constructor(props: ResponseBaseProps<ResponseBase>) {
    super(props.id)
    this.createdAt = props.createdAt.toISOString()
    this.updatedAt = props.updatedAt.toISOString()
  }

  public readonly createdAt: string
  public readonly updatedAt: string
}
