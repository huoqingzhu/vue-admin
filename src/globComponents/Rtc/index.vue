<template>
  <video
      style="width: 100%; height: 100%; object-fit: fill"
      controls
      muted
      autoplay
      ref="videoPlayer"
      id="videoPlayer"
    ></video>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, onBeforeUnmount} from "vue";
import axios from "axios";
import Qs from "qs";
interface states {
  videoPlayer: any;
}
export default defineComponent({
  props: {
    uuid: {
      type: String,
    },
    channel: {
      type: Number,
      default:0
    },
    online: {
      type: Number,
      default: 1,
    },
    time: {
      type: Number,
      default: 0,
    },
    IP: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    let webrtc: any, webrtcSendChannel: any;
    let webrtcSendChannelInterval: any; //定时请求ping
    let disconnectedInterval: any; //网络断开定时请求
    let open: boolean = true;
    let state: states = reactive({
      videoPlayer: null,
    });
    onMounted(() => {
      if (props.online === 1) {
        setTimeout(() => {
          startPlay();
        }, props.time);
        // 监测 ICE 连接的状态 disconnected 是断开
      }
    });
    const startPlay=()=>{
      webrtc = new RTCPeerConnection({
        iceServers: [
          {
            urls: ["stun:stun.l.google.com:19302"],
          },
        ],
      });
      webrtc.onnegotiationneeded = handleNegotiationNeeded;
      // 断网重新连接
      webrtc.oniceconnectionstatechange = (evt: any) => {
        if (evt.target.iceConnectionState === "disconnected") {
          console.log("rtc 断开正在重新连接");
          clearInterval(webrtcSendChannelInterval);
          if (open) {
            console.log("连接失败，重新连接");
          } else {
            console.log("主动退出不可重新连接");
          }
        }
      };
      webrtc.ontrack = function (event: any) {
        try {
          state.videoPlayer.srcObject = event.streams[0];
          state.videoPlayer.play();
        } catch {}
      };
      webrtc.addTransceiver("video", {
        direction: "sendrecv",
      });
      webrtcSendChannel = webrtc.createDataChannel("foo");
      webrtcSendChannel.onclose = () => {};
      webrtcSendChannel.onopen = () => {
        webrtcSendChannel.send("ping");
        webrtcSendChannelInterval = setInterval(() => {
          webrtcSendChannel.send("ping");
          console.log("ping");
        }, 1000);
      };
      webrtcSendChannel.onmessage = (e: any) => console.log(e.data);
    }
    async function handleNegotiationNeeded() {
      let uuid = props.uuid;
      let channel = props.channel;
      let url ="/stream/" +uuid +"/channel/" +channel +"/webrtc?uuid=" +uuid +"&channel=" +channel;
      let offer = await webrtc.createOffer({ iceRestart: true });
      await webrtc.setLocalDescription(offer);
      // window.location.origin
      axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        url: "http://" + props.IP + ":8083" + url,
        data: Qs.stringify({ data: btoa(webrtc.localDescription.sdp) }),
      }).then((res: any) => {
        try {
          webrtc.setRemoteDescription(
            new RTCSessionDescription({
              type: "answer",
              sdp: atob(res.data),
            })
          );
        } catch (e) {
          console.log("服务器连接错误");
        }
      });
    }
    onBeforeUnmount(() => {
      clearInterval(webrtcSendChannelInterval);
      webrtc = null;
      open = false;
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less" scoped>
.video {
  width: 100%;
  height: 100%;
}
</style>
