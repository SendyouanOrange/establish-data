<template>
  <div :style="`width:${width};height:${height}`" ref="myEchart"></div>
</template>

<script>
export default {
  name: "data-chart",
  props: {
    title: {
      type: Object,
      default: () => {
        return {
          text: "",
          subtext: ""
        };
      }
    },
    xData: {
      type: Array,
      default: () => []
    },
    yData: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: () => "100%"
    },
    height: {
      type: String,
      default: () => "500px"
    }
  },
  data() {
    return {
      option: {}
    };
  },
  mounted() {
    this.option = {
      title: this.title,
      color: [
        "#1890ff",
        "#2fc25b",
        "#facc14",
        "#8543e0",
        "#169bbd",
        "#ca6cb3",
        "#af9cdb"
      ],
      tooltip: {
        trigger: "axis"
      },
      legend: {
        x: "center",
        y: "95%",
        data: ["hah"]
      },
      grid: {
        x: 50,
        x2: 60,
        y2: 150
      },
      xAxis: {
        splitNumber: 10,
        type: "category",
        data: this.xData,
        axisLabel: {
          interval: 0,
          rotate: 25
        }
      },
      dataZoom: {
        show: true,
        start : 90
    },
      yAxis: {
        type: "value"
      },

      series: [
        {
          data: this.yData,
          type: "line",
          smooth: true
        }
      ]
    };
    this.chart = this.$echarts.init(this.$refs.myEchart);
    this.chart.setOption(this.option);
  }
};
</script>

<style>
</style>
