<template>
  <div class="main">
    <el-button type="primary" @click="open">打开本地摄像头</el-button>
    <el-button type="primary" @click="close">关闭摄像头</el-button>

    <video
      style="width: 400px; height: 300px; object-fit: fill"
      controls
      muted
      autoplay
      ref="videoPlayer"
      id="videoPlayer"
      v-show="myShow"
    ></video>
    <div>
      <div v-for="(item, index) in reqList" :key="index">
        {{ item.data }}
      </div>
    </div>
    <div>
      <div v-for="(item, index) in user" :key="index">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { wsUrl } from "@/cofing";
import { state, messageType, msg } from "./type";
export default defineComponent({
  setup() {
    const state: state = reactive({
      reqList: [],
      user: [],
      myShow: false,
    });
    const init = async () => {
      const localVideo = document.getElementById("videoPlayer");
      //   非安全模式（非https/localhost）下 navigator.mediaDevices 会返回 undefined
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { min: 1280 },
            height: { min: 720 },
          },
          audio: true,
        });
        (localVideo as any).srcObject = mediaStream;
      } catch {}
    };
    const open = async () => {
      await init();
      state.myShow = true;
    };
    const close = () => {};
    onMounted(() => {
      // init()
    });
    try {
      const ws = new WebSocket(wsUrl);
      console.log(ws);
      ws.onopen = () => {
        // 验证webscoket连接是否建立，是否可以进行通信
        // 0表示连接尚未建立
        if (ws.readyState === 0) {
          console.log("连接还未建立");
        }
        // 1表示连接已建立，可以进行通信
        if (ws.readyState === 1) {
          const id = Math.floor(Math.random() * 100 + 1);
          ws.send(JSON.stringify({ id, name: "客户" + id }));
        }
      };
      ws.onclose = () => {
        console.log("webSocker断开了");
      };
      //接受websocket消息
      ws.onmessage = (event) => {
        console.log("服务器消息: " + event.data);
        const msg: msg = JSON.parse(event.data);
        state.reqList.push(msg);
        if (msg.type === messageType.user && msg.user) {
          state.user = msg?.user;
        }
      };
      ws.onerror = (e) => {
        console.log(e);
        console.log("连接失败");
      };
    } catch {
      console.log("ws连接失败");
    }
    return { ...toRefs(state), open };
  },
});
</script>
<style lang="less">
.main {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-around;
}
</style>