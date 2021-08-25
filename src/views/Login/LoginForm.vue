<template>
  <el-form :model="numberValidateForm" status-icon ref="numberValidateForm"  class="demo-ruleForm">
  <el-form-item
    prop="username"
    :rules="[
      { required: true, message: '账号不能为空'},
      { type: 'string', message: '年龄必须为数字值'}
    ]"
  >
    <el-input type="age" prefix-icon="el-icon-s-custom" v-model="numberValidateForm.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item
    prop="password"
    :rules="[
      { required: true, message: '密码不能为空'},
      { type: 'string', message: '年龄必须为数字值'}
    ]"
  >
    <el-input type="age" prefix-icon="el-icon-star-on" show-password v-model="numberValidateForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('numberValidateForm')">登陆</el-button>
  </el-form-item>
</el-form>
</template>
<script lang="ts">
import { defineComponent} from "vue";
  export default defineComponent({
    data() {
      return {
        numberValidateForm: {
          username: '',
          password: '',
        }
      };
    },
    methods: {
      submitForm(formName:string) {
        //@ts-ignore
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit("ok",this.numberValidateForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName:string) {
        //@ts-ignore
        this.$refs[formName].resetFields();
      }
    }
  })

</script>
<style lang="scss" scoped>
.el-button{
  width: 100%;
}
</style>