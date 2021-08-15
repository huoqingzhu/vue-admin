import service from '../utils/request'

export const login=(data:user)=>{
  return service({
    url: 'user/login',
    method: "post",
    data:JSON.stringify(data)
  })
}