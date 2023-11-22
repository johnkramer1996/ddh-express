export interface QueryMapper<T1, T2, T3> {
  toQuery(record: T2): T1
  toResponse(record: T1): T3
}
