
<template>
  <div class="center upload" style="width:100%">
    <Icon-font type="iconshangchuan" style="font-size: 20px;color:#fff;margin-left: -80px;position: absolute;"></Icon-font>
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
      style="width: 40px; height: 25px"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { binary } from "../../api/index";
export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  emits: ["ok"],
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
      const reader = new FileReader();
      reader.onload = function (event: any) {
        binary(event.target.result, {
          filename:encodeURIComponent(files.name),
          team_id: props.id,
        })
          .then((res: any) => {
            ctx.emit("ok", res);
            state.show = false;
          })
          .catch(() => {
            state.show = false;
          });
      };
      reader.readAsArrayBuffer(files);
    };
    return { ...toRefs(state), ImageToBase64 };
  },
});
</script>
<style lang="scss" scoped>
.upload{
  position: relative;
  background-color: #009b47;
  border-radius: 8px;
}
.file {
  width: 100%;
  height: 24px;
  line-height: 24px;
  text-align: center;
  // background-color: #009b47;
  position: relative;
  color: #ffffff;
  border-radius: 3px;
}
.file input {
  width: 100%;
  height: 24px;
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
