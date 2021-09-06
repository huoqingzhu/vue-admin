const option = {
  tooltip: {
    show:true,
    trigger: "item",
  },
  radar: [
    {
      indicator: [
        { text: "品牌", max: 100 },
        { text: "内容", max: 100 },
        { text: "可用性", max: 100 },
        { text: "功能", max: 100 },
        { text: "功能", max: 100 },
      ],
      center: ["50%", "55%"],
      radius: "80%",
    },
  ],
  series: [
    {
      type: "radar",
      tooltip: {
        trigger: "item",
      },
      areaStyle: {
        color: "#ffffff",
      },
      itemStyle: {
        color: "#ccc",
      },
      data: [
        {
          value: [60, 73, 85, 40, 60],
          name: "某软件",
        },
      ],
    },
  ],
}
export default option