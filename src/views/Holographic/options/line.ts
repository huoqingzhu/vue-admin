const option = {
  tooltip: {
    show:true,
    trigger: "axis",
  },
  legend: {
    data: ['test'],
    textStyle:{
      color:"#fff"
    }
},
  grid: {
    top: "6%",
    left: "3%",
    right: "4%",
    bottom: "0%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
  series: [
    {
      type: "line",
      itemStyle: {
        color: "#1991D2",
        borderColor:'#1991D2',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
  ],
};
export default option