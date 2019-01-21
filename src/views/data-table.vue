<template>
  <div class="full-box">
    <el-card v-if="overviewData" class="box-card" shadow="never">
      <div v-for="(d,key) in overviewData" :key="key" class="padding">
        <span class="title">{{overviewOption[key]}}</span>
        <span class="sub-title">最大值:</span> <span class="sub-content">{{d.highest.num}}({{d.highest.enterpriseName}})</span>
        <span class="sub-title">最小值:</span> <span class="sub-content">{{d.lowest.num}}({{d.lowest.enterpriseName}})</span>
        <span class="sub-title">最小值:</span> <span class="sub-content">{{d.average.num}}</span>
      </div>
    </el-card>
    <el-form ref="form" label-width="7em" style="margin: 10px 0px -10px 0;">
      <el-form-item label="选择排序方式">
        <el-select v-model="sort" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe border style="width: 100%" max-height="90%">
      <el-table-column prop="name" label="企业名称" width="180"></el-table-column>
      <el-table-column prop="address" label="企业地址" width="180"></el-table-column>
      <el-table-column prop="createTime" label="提交时间"></el-table-column>
      <el-table-column prop="industry" label="企业所在行业"></el-table-column>
      <el-table-column prop="taker" label="问卷提交人"></el-table-column>
      <el-table-column prop="type" label="企业类型"></el-table-column>
      <el-table-column prop="establishTime" label="企业开办时间"></el-table-column>
      <el-table-column prop="establishCosting" label="企业开办成本"></el-table-column>
      <el-table-column prop="establishLinkNum" label="企业开办程序"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :pager-count="11"
      :page-size="size"
      @current-change="handleSizeChange"
      style="margin:10px 0 10px -10px"
    ></el-pagination>
  </div>
</template>

<script>
import establishService from "../services/establish";
export default {
  data() {
    return {
      overviewData:null,
      overviewOption:{
        establishCosting:'企业开办成本',
        establishLinkNum:'企业开办流程',
        establishTime:'企业开办时间',
      },
      sort: "",
      options: [
        {
          value: "none",
          label: "--无--"
        },
        {
          value: "establishTimeUp",
          label: "企业开办时间升序"
        },
        {
          value: "establishTimeDown",
          label: "企业开办时间降序"
        },
        {
          value: "establishCostingUp",
          label: "企业开办成本升序"
        },
        {
          value: "establishCostingDown",
          label: "企业开办成本降序"
        },
        {
          value: "establishLinkNumUp",
          label: "企业开办程序升序"
        },{
          value: "establishLinkNumDown",
          label: "企业开办程序降序"
        }
      ],
      tableData: [],
      total: 1000,
      page: 1,
      size: 20
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getOverviewData();
    },
    getOverviewData(){
      establishService.getOverviewData(res=>{
        if(res&&res.success){
          this.overviewData=res.data;
          this.getData();
        }else{
          this.$notify.error({
            title: "失败",
            message: "请刷新重试!"
          });
        }
      })
    },
    getData(payload = { page: 0 }) {
      payload.size = this.size;
      establishService.getListData(payload, res => {
        if (res && res.success) {
          this.tableData = res.data;
        } else {
          this.$notify.error({
            title: "失败",
            message: "请刷新重试!"
          });
        }
      });
    },
    handleSizeChange(p){
      this.page=p-1;
      this.getData({page:this.page})
    }
  }
};
</script>

<style>
.box-card .title{
  font-size: 18px;
  font-weight: 400;

}
.box-card .sub-title{
  color:#999;
}
</style>
