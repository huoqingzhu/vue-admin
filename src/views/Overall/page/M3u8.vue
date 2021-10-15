<template>
    <div>
      <video id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto"  >
        <source id="source" src="http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/48c8a9475285890781000441992/playlist.m3u8" type="application/x-mpegURL" />
      </video>
      <el-button type="primary" @click="change">切换</el-button>
    </div>
</template>
<script lang="ts" setup>
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import {onMounted} from "vue"
let myVideo:any
const src = 'http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8';
const src2 = 'http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/48c8a9475285890781000441992/playlist.m3u8';
let isShow=false;
onMounted(() => {
  myVideo= Video('myVideo', {
        bigPlayButton: true,
    })
      myVideo.play()
})
const changeVideo = function (vdoSrc:string) {
        if (/\.m3u8$/.test(vdoSrc)) { //判断视频源是否是m3u8的格式
            myVideo.src({
                src: vdoSrc,
                type: 'application/x-mpegURL' //在重新添加视频源的时候需要给新的type的值
            })
        } else {
            myVideo.src(vdoSrc)
        }
        myVideo.load();
        myVideo.play();
    }
    const change=()=>{
        isShow=!isShow
        changeVideo(isShow?src:src2);
    }
</script>