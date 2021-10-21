import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import visualizer from 'rollup-plugin-visualizer';
import { terser } from "rollup-plugin-terser";
import compressPlugin from 'vite-plugin-compression';//上线压缩
import vueJsx from '@vitejs/plugin-vue-jsx'//jsx
// import viteImagemin from 'vite-plugin-imagemin';//压缩图片
import legacy from '@vitejs/plugin-legacy'//代码兼容
import path from 'path'
const esModule=true;//默认打包esModule 版本 不进行 polyfill
const Polyfill=false; //是否兼容ie11  默认不兼容
const plugins=[vue(),vueJsx()]
plugins.push(
  styleImport({
    libs: [
      {
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        },
      }
  ]
  })
)
 //生产环境配置打包分析插件
if(process.env.NODE_ENV){
  console.log("打包环境")
  plugins.push(visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true,
  }));
  // 开启智能压缩 删除console
  plugins.push(terser({ compress: { drop_console: true } }));
  // 开启压缩
  // plugins.push(
  //   compressPlugin({
  //     ext: '.gz',//gz br
  //     algorithm: 'gzip', //brotliCompress gzip
  //     deleteOriginFile:false
  //   })
  // );

  // plugins.push( viteImagemin({
  //   gifsicle: {
  //     optimizationLevel: 7,
  //     interlaced: false,
  //   },
  //   optipng: {
  //     optimizationLevel: 7,
  //   },
  //   webp: {
  //     quality: 75,
  //   },
  //   mozjpeg: {
  //     quality: 65,
  //   },
  //   pngquant: {
  //     quality: [0.65, 0.9],
  //     speed: 4,
  //   },
  //   svgo: {
  //     plugins: [
  //       {
  //         removeViewBox: false,
  //       },
  //       {
  //         removeEmptyAttrs: false,
  //       },
  //     ],
  //   },
  // }))
  esModule?null:plugins.push(
    Polyfill?legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }):legacy({
      targets: ['defaults', 'not IE 11']
    })
  )
}
export default defineConfig({
  plugins: plugins,
  base:"./",//打包路径
  resolve: {
    alias:{
      '@': path.resolve(__dirname, './src')//设置别名
    }
  },
  server:{
    port:3000,//启动端口
    open: true,
    proxy:{ 
      '/api': 'https://xiaohuo.online'//http://localhost:8888/ https://xiaohuo.online
    }, 
    cors:true
  },
  css:{
    modules:{
      localsConvention:'camelCaseOnly'
    }
  }
})


