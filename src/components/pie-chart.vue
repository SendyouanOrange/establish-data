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
    legendData:{
      type:Array,
      default:()=>[]
    },
    pieData:{
      type:Array,
      default:()=>{return{}}
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
    this.option  = {
      title: {
        text: this.title.text,
        subtext: this.title.subtext,
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: this.legendData,
      },
      calculable: true,
      series: this.pieData
    };
    this.chart = this.$echarts.init(this.$refs.myEchart);
    this.chart.setOption(this.option);
  }
};
</script>

<style>
</style>
