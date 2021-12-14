
import { createFromIconfontCN } from '@ant-design/icons-vue';
import {IconUrl} from "@/cofing/index"

// 新增 导出
const IconFont = createFromIconfontCN({
    scriptUrl:IconUrl
});
const ant = {
  install(Vue: {
    component: (arg0: string, arg1: any) => void;
    use: (arg0: any,) => void;
  }) {
    Vue.component("v-Icon", IconFont);
  }
};
export default ant;