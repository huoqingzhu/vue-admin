const option = {
  title: {
    text: 12 + "%",
    textStyle: {
      fontSize: 50,
      fontFamily: "Microsoft Yahei",
      fontWeight: "bold",
      color: "#fff",
    },
    x: "center",
    y: "center",
  },
  series: [
    {
      type: "liquidFill",
      radius: "85%",
      center: ["50%", "50%"],
      color: ["#fff"],
      data: [1],
      backgroundStyle: {
        color: "#1f2c52",
      },
      label: {
        normal: {
          formatter: "",
        },
      },
      outline: {
        show: false,
      },
    },
  ],
};
export default option