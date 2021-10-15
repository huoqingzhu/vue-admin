import service from '@/utils/request'

export const getTest=()=>{
  return service({
    url: 'forward/test',
  })
}
export const getTest1=()=>{
  return service({
    url: 'forward/test1',
  })
}
export const company=(data:any)=>{
  return service({
    url: 'forward/company',
    method:"post",
    data
  })
}
/**
 * binary
 * @param id
 * @returns 
 */
 export const binary=(data:string,params:{team_id:number,filename:string})=>{
  return service({
    url: "/up",
    method: "post",
    data: data,
    params: params
  });
}