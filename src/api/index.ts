import service from '../utils/request'

export const getTest=()=>{
  return service({
    url: 'test',
  })
}