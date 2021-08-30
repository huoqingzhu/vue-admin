<script lang="ts">
  import {defineComponent,PropType} from "vue";
  import {Pagination} from "./type"
  export default defineComponent({
    props: {
      pagination:{
      type:Object as PropType<Pagination>,
      required: true,
    }
    },
    computed:{
      showTotal():number{
        const num=this.pagination.current+2
        return num>Math.ceil(this.pagination.total/10)? Math.ceil(this.pagination.total/10):num
      }
    },
    methods:{
      change(value:number){
        if(value<=Math.ceil(this.pagination.total/10)&&value>=1){
          this.$emit("changeCurrent",{current:value})
        } 
      },
    },
    setup(){}
  })
  </script>
  <template>
    <div class="v-pagination">
        <div class="ellipsis">共{{pagination.total}}条数据</div>
        <div class="up-pagination ellipsis" @click="change(pagination.current-1)">上一页</div>
        <div class="v-pagination-tab">
          <template  
              v-for="item in showTotal" 
              :key="item"
              >
              <div 
                  v-if="item >pagination.current-3" 
                  :class="['pagination-box',item==pagination.current?'select-pagination':null]" 
                  @click="change(item)"
                >
                      {{item}}
              </div>
          </template>
        </div>
        <div class="up-pagination ellipsis" @click="change(pagination.current+1)">下一页</div>
        <div class="up-pagination ellipsis">10条/页</div>
    </div>
  </template>
<style lang="scss" scoped>
.v-pagination{
  display: flex;
  height:100%;
  align-items: center;
}
.pagination-box{
  flex-shrink: 0; 
  width: 24px;
  height:24px;
  text-align: center;
  line-height: 24px;
  border:1px solid  #ccc;
  margin-left: 4px;
}
.v-pagination-tab{
  // width: 150px;
  display: flex;
  // overflow-x: auto;
}
.select-pagination{
  border:1px solid #1890ff;
}
.up-pagination{
  margin: 0 12px;
}
// .v-pagination-tab::-webkit-scrollbar {display:none}
</style>