export interface columns{
  title:string,
  dataIndex: string,
  key: string,
  align?:string,
  width?:string,
}
export interface Pagination {
  total: number,
  current: number,
}