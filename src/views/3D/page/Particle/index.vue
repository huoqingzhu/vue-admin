<template>
  <div ref="node" class="map"></div>
</template>
<script lang="ts" setup>

import {ref,onMounted} from "vue"
import * as Three from "three";

const node=ref()
 // 初始化 Map
 const SEPARATION = 60; //距离
    const AMOUNTX = 50; //x横坐标
    const AMOUNTY = 50; //y坐标
    let particles: any[]; //粒子数组
    let particle; //粒子
    let count = 0; //控制粒子变化的变量
    let container;
    let camera: Three.PerspectiveCamera, scene: Three.Scene, renderer: Three.WebGLRenderer;

    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    const init = () => {
      container = node.value;
      // container = document.createElement("div");
      // document.body.appendChild(container);
      camera = new Three.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.z = 1000;
      scene = new Three.Scene();

      // 添加背景图
      // const texture = new Three.TextureLoader().load("04.jpg");
      // scene.background = texture;
      // 创建粒子
      particles = [];
      const PI2 = Math.PI * 1;
      const material = new Three.SpriteMaterial({
        color: "#6cedfc",
        //@ts-ignore
        program: (context) => {
          context.beginPath();
          context.arc(0, 0, 1, 0, PI2, true);
          context.fill();
        },
      });

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++] = new Three.Sprite(material);
          particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          scene.add(particle);
        }
      }
      renderer = new Three.WebGLRenderer({ antialias: true, alpha: true });
      // 设置透明度
      renderer.setClearAlpha(0.2);
      renderer.setSize(container.clientWidth, container.clientHeight);
      container!.appendChild(renderer.domElement);

      document.addEventListener("mousemove", onDocumentMouseMove, false);
      window.addEventListener("resize", onWindowResize, false);
    };

    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onDocumentMouseMove = (event: { clientX: number; clientY: number; }) => {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    };

    const onDocumentTouchStart = (event: { touches: string | any[]; preventDefault: () => void; }) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
      }
    };

    const onDocumentTouchMove = (event: { touches: string | any[]; preventDefault: () => void; }) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
      }
    };

    const animate = () => {
      // stats.begin();
      // stats.end();
      requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++];
          particle.position.y =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          particle.scale.x = particle.scale.y =
            (Math.sin((ix + count) * 0.3) + 1) * 2 +
            (Math.sin((iy + count) * 0.5) + 1) * 2;
        }
      }
      count += 0.1;
      renderer.render(scene, camera);
    };

    onMounted(() => {
      init();
      animate();
    });
</script>
<style lang="scss" scoped>
.map{
  width: 100%;
  height: 100%;
  background-color: #000;
  background-image: radial-gradient(circle, rgb(3, 3, 63), rgb(1, 6, 24), #000);
}
</style>