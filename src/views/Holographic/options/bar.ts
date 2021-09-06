const option = {
  legend: {
    data: ['柱状图'],
    // left:'5%',
    textStyle:{
      color:"#fff"
    }
},
  tooltip: {
    show:true,
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisLabel: {
      fontSize: 12,
      color: "#000",
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      fontSize: 12,
      color: "#000",
    },
    splitLine:{
        show:true,
    }
  },
  grid: {
    left: "1%",
    right: "5%",
    bottom: "0%",
    top: "10%",
    containLabel: true,
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      name:'test',
      itemStyle: {
        color: "#1991D2",
        normal: {
          label: {
            show: true, //开启显示
            position: "top", //在上方显示
            textStyle: {
              //数值样式
              color: "black",
              fontSize: 16,
            },
          },
        },
      },
      type: "bar",
    },
  ],
};

export default option