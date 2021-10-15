
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
  ElDialog,
  ElSelect,
  ElOption,
  ElForm,
  ElFormItem,
  ElDropdown,
  ElDropdownItem,
  ElRate
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
    Vue.component(ElSelect.name,ElSelect)
    Vue.component(ElOption.name,ElOption)
    Vue.component( ElForm.name,ElForm)
    Vue.component( ElFormItem.name,ElFormItem)
    Vue.component(ElRate.name,ElRate)
    Vue.use(ElDropdown)
    Vue.use(ElInput)
    Vue.use(ElMenu)
    Vue.use(ElSubmenu)
    Vue.use(ElDropdownItem)
    Vue.component("v-Icon", IconFont);
  }
};
export default ant;