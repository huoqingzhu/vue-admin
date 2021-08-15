
import { createFromIconfontCN } from '@ant-design/icons-vue';
import {IconUrl} from "@/cofing/index"
import { 
  ElButton,
  ElInput,
  ElMenu,
  ElSubmenu, 
  ElMenuItem,
  ElMenuItemGroup,
  ElRadioButton,
  ElRadioGroup,
  ElDialog
} from 'element-plus';

// 新增 导出
const IconFont = createFromIconfontCN({
    scriptUrl:IconUrl
});
const ant = {
  install(Vue: {
    component: (arg0: string, arg1: any) => void;
    use: (arg0: any,) => void;
  }) {
    Vue.component(ElButton.name,ElButton)
    Vue.component(ElMenuItem.name,ElMenuItem)
    Vue.component(ElMenuItemGroup.name,ElMenuItemGroup)
    Vue.component(ElRadioButton.name,ElRadioButton)
    Vue.component(ElRadioGroup.name,ElRadioGroup)
    Vue.component(ElDialog.name,ElDialog)
    Vue.use(ElInput)
    Vue.use(ElMenu)
    Vue.use(ElSubmenu)

    Vue.component("v-Icon", IconFont);
  }
};
export default ant;