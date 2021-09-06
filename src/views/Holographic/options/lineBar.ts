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
  grid: {
    left: "1%",
    right: "5%",
    bottom: "0%",
    top: "10%",
    containLabel: true,
  },
  yAxis:[{
        type: "value",
        nameTextStyle: {
            color: "#396A87",
            fontSize: 14
        },
        splitLine: {
            show: true,
            lineStyle: {
                width: 1,
                color: "#3d5269"
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            show: true,
            color: "#396A87",
        }
    },
    {
        type: "value",
        nameTextStyle: {
            color: "#396A87",
            fontSize: 14
        },
        position: "right",
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false,
            color: "#396A87",
        },
        axisLabel: {
            show: true,
            formatter: "{value} %", //右侧Y轴文字显示
            color: "#396A87",
            // fontSize: 12
        }
    }
],
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      name:'test',
      itemStyle: {
        color: "#1991D2",
        label: {
            show: true, //开启显示
            position: "top", //在上方显示
            color: "black",
              fontSize: 16,
          },
      },
      type: "bar",
    },
    {
      type: "line",
      itemStyle: {
        color: "pink",
        borderColor:'#1991D2',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
  ],
}
export default option