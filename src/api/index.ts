import service from '../utils/request'

export const getTest=()=>{
  return service({
    url: 'test',
  })
}
export const company=(data:any)=>{
  return service({
    url: 'company',
    method:"post",
    data
  })
}