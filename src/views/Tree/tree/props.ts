import type { PropType } from 'vue';
export interface treeData{ 
  name:string,
  id:number,
  children?:treeData[]
}
export const basicProps = {
  treeData:Object as PropType<treeData[]>
}