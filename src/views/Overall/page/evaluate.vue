<template>
  <div>
      <el-button type="primary" @click="dialogVisible=!dialogVisible" >打开</el-button>
      <el-button type="primary" @click="promiseAll" >promise并发请求</el-button>
      <el-button type="primary" @click="allSettled" >promise.allSettled</el-button>
      <el-button type="primary" @click="axiosAll" >axios并发请求</el-button>
        <el-dialog
        :title="title"
        v-model="dialogVisible"
        width="60%"
        center
        :modal-append-to-body="false"	
        :before-close="handleClose">
        <div style="padding: 10px 40px;width: 100%;" >
          <div style="width: 60%;margin:0 auto;">
            <div>任课老师:</div>
            <div>上课时间:</div>
          </div>
          <div style="width: 80%">
              <div style="width: 100%;height:30px" class="flex">
            <div>1.总体评分</div>
            <el-rate v-model="value1"></el-rate>
          </div>
          <div style="width: 100%;height:30px" class="flex">
            <div>2.课程内容理解与掌握程度</div>
            <el-rate v-model="value2"></el-rate>
          </div>
          <div style="width: 100%;height:30px" class="flex">
            <div>3.授课内容理论与实践相结合程度</div>
            <el-rate v-model="value3"></el-rate>
          </div>
          <div style="width: 100%;height:30px" class="flex">
            <div>3.授课内容对工作促进作用</div>
            <el-rate v-model="value4"></el-rate>
          </div>
          </div>
          <div style="width: 100%;height:30px;margin-top: 20px;" class="flex">
            <div style="color: #589ef8;">评论</div>
            <div>
              <el-button type="primary"  size="small" >导出</el-button>
              <el-button type="primary"  size="small" >时间排序</el-button>
            </div>
          </div>
          <div style="width: 100%;height:300px;overflow:auto;background-color: pink;" >
            <div v-for="item in commentList" class="commentList">
              <div class="commentBox1">
                <div>13</div>
              </div>
              <div class="commentBox">      
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
  </div>

</template>
<script lang="ts" >
import { defineComponent, } from "vue";
import {getTest,getTest1} from "@/api"
import axios from "axios";
export default defineComponent({
  data(){
    return {
      title:"课程名称",
      dialogVisible:false,
      value1:5,
      value2:4,
      value3:3,
      value4:3,
      commentList:[1,2,3,4,5]
    }
  },
  methods:{
      handleClose() {
      this.dialogVisible=false
      },
      allSettled(){
        Promise.allSettled([getTest1(),getTest()])
        .then(res=>{
          console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })
          Promise.any([getTest(),getTest1()])
        .then(res=>{
          console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })
      },
      promiseAll(){
        Promise.all([getTest1(),getTest()])
        .then(res=>{
          console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })
      },
      axiosAll(){
  axios.all([getTest(),getTest1()])
        .then(axios.spread((a,b)=>{
            console.log(a,b)
        }))
        .catch(err=>{
          console.log(err)
        })
      }
  }
})
</script>
<style lang="scss" >
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-dialog__header {
    padding: 20px;
    padding-bottom: 10px;
    height: 50px;
}
.commentList{
  width: 100%;
  border-bottom: 1px solid #ccc;
  .commentBox1{
    width: 100%;
    height:50px;
    display: flex;
  }
  .commentBox{
    width: 100%;
  }
}
</style>