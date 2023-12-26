export interface QueryMapper<T1, T2 = any, T3 = any> {
  toQuery(record: T2): T1
  toResponse(record: T1): T3
}
