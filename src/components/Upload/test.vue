
<template>
  <div class="flex">
    <form action="" name="file" class="file">
      上传文件
      <input
        type="file"
        ref="img"
        :value="fileValue"
        id="upImageFile"
        @change="ImageToBase64"
      />
    </form>
    <a-spin
      v-if="show"
      :indicator="indicator"
      style="width: 40px; height: 25px"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { upload } from "../../api/index";
import { url } from "../../utils/cofing";
import { message } from "ant-design-vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import axios from "axios";
export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  emits: ["ok"],
  components: {
    LoadingOutlined,
  },
  setup(props, ctx) {
    const state = reactive({
      fileValue: "",
      iconBase64: "",
      img: null,
      show: false,
    });
    //将本地图片转化为Base64
    const ImageToBase64 = () => {
      state.show = true;
      let files = (state.img as any).files[0];
      let formdata = new FormData();
      formdata.append("file", files, files.name);
      const config: any = {
        method: "post",
        url: `${url}/api/g2`, //http://localhost:3000/upload/binary?name=1233.mp4"  http://192.168.100.201/api/g2
        data: "",
        params: { filesname: files.name, team_id: props.id },
      };

      var reader = new FileReader();
      reader.onload = function (event: any) {
        config.data = this.result;
        console.log(config.data);
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      reader.readAsArrayBuffer(files);
      // axios(config)
      //   .then(function (response) {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      // upload(formdata, props.id)
      //   .then((res: any) => {
      //     message.success("上传成功");
      //     ctx.emit("ok", res);
      //     state.show = false;
      //   })
      //   .catch(() => {
      //     state.show = false;
      //     message.error("上传失败");
      //   });
    };
    return { ...toRefs(state), ImageToBase64 };
  },
});
</script>
<style lang="less" scoped>
.file {
  width: 75px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: #193144;
  position: relative;
  color: #ffffff;
  border-radius: 3px;
}
.file input {
  width: 75px;
  height: 25px;
  opacity: 0;
  filter: alpha(opacity=0);
  position: absolute;
  left: 0;
  top: 0;
}
input:disabled {
  color: -internal-light-dark(rgb(84, 84, 84), rgb(170, 170, 170));
  cursor: default;
  background-color: -internal-light-dark(
    rgba(239, 239, 239, 0.3),
    rgba(59, 59, 59, 0.3)
  );
  border-color: rgba(118, 118, 118, 0.3);
}
</style>
