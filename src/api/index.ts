import service from '../utils/request'

export const getTest=()=>{
  return service({
    url: 'test',
  })
}
export const company=(data:any)=>{
  return service({
    url: 'forward/company',
    method:"post",
    data
  })
}