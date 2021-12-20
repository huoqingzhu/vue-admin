import html2canvas from "html2canvas";
export const preserve=(node:HTMLElement)=>{        
  let scale = window.devicePixelRatio // 获取设备像素比
    html2canvas(node as HTMLElement, {
          useCORS: true,
          scale
        }).then((canvas) => {
            // 压缩
            let src = canvas.toDataURL("image/png",0.1);
            console.log(src)
            const a = document.createElement('a')
            a.download =  'pic'
            // 设置图片地址
            a.href = src;
            a.click();
          })
          .catch(() => {
            console.log('保存失败')
  });
}