import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import visualizer from "rollup-plugin-visualizer";
import { terser } from "rollup-plugin-terser";
import vueJsx from "@vitejs/plugin-vue-jsx"; //jsx
import legacy from "@vitejs/plugin-legacy"; //代码兼容
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const esModule = true; //默认打包esModule 版本 不进行 polyfill
const Polyfill = false; //是否兼容ie11  默认不兼容
const plugins = [
  vue(),
  vueJsx(),
  createSvgIconsPlugin({
    // config svg dir that can config multi
    iconDirs: [
      path.resolve(process.cwd(), "src/icons/common"),
      path.resolve(process.cwd(), "src/icons/nav-bar"),
    ],
    // appoint svg icon using mode
    symbolId: "icon-[dir]-[name]",
  }),
];
//生产环境配置打包分析插件
if (process.env.NODE_ENV) {
  console.log("打包环境");
  plugins.push(
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  );
  // 开启智能压缩 删除console
  plugins.push(terser({ compress: { drop_console: true } }));
  esModule
    ? null
    : plugins.push(
        Polyfill
          ? legacy({
              targets: ["ie >= 11"],
              additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
            })
          : legacy({
              targets: ["defaults", "not IE 11"],
            })
      );
}

const prefix = `monaco-editor/esm/vs`;

export default defineConfig({
  plugins: plugins,
  base: "./", //打包路径
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), //设置别名
      "@m": path.resolve(__dirname, "./Pole/packages"),
    },
  },
  server: {
    port: 9000, //启动端口
    open: true,
    proxy: {
      "/api": "http://localhost:8888", //http://localhost:8888/ https://xiaohuo.online
    },
    cors: true,
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          jsonWorker: [`${prefix}/language/json/json.worker`],
          cssWorker: [`${prefix}/language/css/css.worker`],
          htmlWorker: [`${prefix}/language/html/html.worker`],
          tsWorker: [`${prefix}/language/typescript/ts.worker`],
          editorWorker: [`${prefix}/editor/editor.worker`],
        },
      },
    },
  },
});
