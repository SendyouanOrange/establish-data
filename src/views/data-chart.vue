<template>
  <div class="full-box">
    <el-radio-group v-model="type" style="margin-bottom: 30px;">
      <el-radio-button label="establishTime">企业开办时间</el-radio-button>
      <el-radio-button label="establishCosting">企业开办成本</el-radio-button>
      <el-radio-button label="establishLinkNum">企业开办流程</el-radio-button>
    </el-radio-group>

    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content bg-purple-light">
          <el-card
            v-if="chartData.length"
            class="box-card"
            style="margin-bottom:40px;postion:relative"
          >
            <PieChart
              :title="{text:overviewOption[type]+'信息统计',subtext:'饼状图'}"
              :legendData="pieLengend"
              :pieData="pieData"
            />
          </el-card>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content bg-purple">
          <el-card
            v-if="chartData.length"
            class="box-card"
            style="margin-bottom:40px;postion:relative"
          >
            <div class="text-card-content">
              <div v-for="(d,key) in overviewData" :key="key" class="text-card-content-item">
                <div class="title">{{overviewOption[key]}}</div>
                <div class="content">
                  <span class="sub-title">最大值:</span>
                  <span class="sub-content">{{d.highest.num}}({{d.highest.enterpriseName}})</span>
                </div>
                <div class="content">
                  <span class="sub-title">最小值:</span>
                  <span class="sub-content">{{d.lowest.num}}({{d.lowest.enterpriseName}})</span>
                </div>
                <div class="content">
                  <span class="sub-title">平均值:</span>
                  <span class="sub-content">{{d.average.num}}</span>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-card v-if="chartData.length" class="box-card" style="width:100%">
      <LineChart :title="{text:overviewOption[type]+'信息统计/折线图',subtext:''}" :xData="xData" :yData="yData"/>
    </el-card>
  </div>
</template>

<script>
import establishService from "../services/establish";
import LineChart from "../components/line-chart.vue";
import PieChart from "../components/pie-chart.vue";

export default {
  components: {
    LineChart,
    PieChart
  },
  data() {
    return {
      overviewData: null,
      type: "establishTime",
      chartData: [],
      xData: [], // 折线图 x轴数据
      yData: [], // 折线图 y轴数据
      pieLengend: ["60以下", "60至80", "80至90", "90以上"],
      pieData: [],
      overviewOption: {
        establishCosting: "企业开办成本",
        establishLinkNum: "企业开办流程",
        establishTime: "企业开办时间"
      }
    };
  },
  watch: {
    type() {
      this.chartData = [];
      this.getData();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getOverviewData();
    },
    getData() {
      establishService.getChartDataByType(this.type, res => {
        if (res && res.success) {
          let data = res.data;
          this.chartData = data;
          this.yData = data.map(x => x.num);
          this.xData = data.map(x => x.enterpriseName);
          this.pieData = [
            {
              name: "数据范围",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: data.filter(x => x.num <= 60).length, name: "60以下" },
                {
                  value: data.filter(x => x.num > 60 && x.num <= 80).length,
                  name: "60至80"
                },
                {
                  value: data.filter(x => x.num > 80 && x.num <= 90).length,
                  name: "80至90"
                },
                { value: data.filter(x => x.num > 90).length, name: "90以上" }
              ]
            }
          ];
        } else {
          this.$notify.error({
            title: "失败",
            message: "请刷新重试!"
          });
        }
      });
    },
    getOverviewData() {
      establishService.getOverviewData(res => {
        if (res && res.success) {
          this.overviewData = res.data;
          this.getData();
        } else {
          this.$notify.error({
            title: "失败",
            message: "请刷新重试!"
          });
        }
      });
    }
  }
};
</script>

<style>
.text-card-content {
  height: 500px;
}
.text-card-content-item {
  padding: 15px;
}
.box-card .title {
  font-size: 18px;
  font-weight: 500;
  color: #1890ff;
}
.box-card .sub-title {
  color: #999;
}
.box-card .content{
  margin-top:10px; 
  text-indent: 2em;
}
</style>
