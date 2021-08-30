<template>
  <div style="width: 100%;" class="v-table" >
    <div style="width: 100%;font-size:18px;" >
      <slot name="title"></slot>
    </div>
    <table :border="0" style="width: 100%;">
        <thead class="thead">
            <tr  class="table-header" >
              <th 
              v-for="item in columns" 
              :key="item.dataIndex"
              class="table-row-cell">
                {{item.title}}
              </th>
            </tr>
        </thead>
        <tbody class="table-boday" >
              <tr v-for="(item,index) in list" :key="index"  :class="[index%2===0?'bmx1':'bmx2']" >
                <td 
                v-for="(value,key) in columns " 
                :key="key" class="table-row-cell"
                >
                  {{item[value.key]}}
                </td>
            </tr>
          </tbody>
    </table>
    <div class="table-footer" v-if="pagination">
      <pagination :pagination="pagination" @changeCurrent="change" />
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent,PropType} from "vue";
import {columns,Pagination} from "./type"
import pagination from "./pagination.vue"
export default defineComponent({
  props: {
    columns:{
      type:Object as PropType<columns[]>,
      required: true,
    },
    dataSource:{
      type:Array as PropType<{}[]>,
      required: true,
    },
    pagination:{
      type:Object as PropType<Pagination>,
    },
  },
  data(){
    return{
      visible:false,
      name:'',
      value:'',
      id:0,
    }
  },
  computed:{
      list(){
        return this.dataSource
      }
  },
  methods:{
    change(value:number){
      console.log(value)
      this.$emit("change",value)
    },
    handleOk(){},
    clear(){
      this.id=0;
      this.value='';
      this.name='';
      this.visible=false;
    },
  },
  components: {
    pagination
  }
})
</script>
<style lang="scss" scoped>
.v-table{
  height:400px;

  overflow-y: auto;
}
.v-table::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.thead{
  background: linear-gradient(180deg, #4186f2 0%, #20367f 100%);
  font-size: 28px;
  color: #ffffff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.table-header{
  width: 100%;
}
.table-boday{
  width: 100%;
  font-size: 24px;
}
.bmx1{
  width: 100%;
  height:40px;
  background-color: rgb(192, 253, 255);
}
.bmx2{
  width: 100%;
  height:40px;
  background-color: rgb(192, 212, 255);
}
.table-row-cell{
  text-align: center;
  height:30px;
}
.table-footer{
  width: 100%;
  // height:10%;
  display: flex;
  margin-top: 5px;
  justify-content: flex-end;
  overflow:auto;
}
table{ 
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  border-spacing: 0px;
}
td{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.subTab{
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>