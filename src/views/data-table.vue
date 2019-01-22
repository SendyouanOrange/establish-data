<template>
  <div class="full-box">
    <el-card v-if="overviewData" class="box-card" style="width:100%">
      <div v-for="(d,key) in overviewData" :key="key" class="padding">
        <span class="title">{{overviewOption[key]}}</span>
        <span class="sub-title">最大值:</span> <span class="sub-content">{{d.highest.num}}({{d.highest.enterpriseName}})</span>
        <span class="sub-title">最小值:</span> <span class="sub-content">{{d.lowest.num}}({{d.lowest.enterpriseName}})</span>
        <span class="sub-title">平均值:</span> <span class="sub-content">{{d.average.num}}</span>
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
    <el-table :data="tableData" stripe border style="width: 100%" height="65%" max-height="65%">
      <el-table-column prop="enterpriseName" label="企业名称" width="300"></el-table-column>
      <el-table-column prop="industry" label="企业所在行业"></el-table-column>
      <el-table-column prop="enterpriseType" label="企业类型"></el-table-column>
      <el-table-column prop="establishTime" label="企业开办时间"></el-table-column>
      <el-table-column prop="establishCosting" label="企业开办成本"></el-table-column>
      <el-table-column prop="establishLinkNum" label="企业开办程序"></el-table-column>
       <!-- <el-table-column prop="phone" label="企业电话" width="180"></el-table-column> -->
      
      <el-table-column prop="username" label="问卷提交人"></el-table-column>
      <el-table-column  label="提交时间" >
        <template slot-scope="scope">
          {{$moment(scope.row.submissionTime).format('YYYY-MM-DD hh:mm')}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :pager-count="11"
      :page-size="size"
      @current-change="handleSizeChange"
      style="margin:20px 0 10px -10px"
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
          value: "",
          label: "--无--"
        },
        {
          value: "establishTime",
          label: "企业开办时间升序"
        },
        {
          value: "establishTime,desc",
          label: "企业开办时间降序"
        },
        {
          value: "establishCosting",
          label: "企业开办成本升序"
        },
        {
          value: "establishCosting,desc",
          label: "企业开办成本降序"
        },
        {
          value: "establishLinkNum",
          label: "企业开办程序升序"
        },{
          value: "establishLinkNum,desc",
          label: "企业开办程序降序"
        }
      ],
      tableData: [],
      total: 1000,
      page: 1,
      size: 40
    };
  },
  watch:{
    sort(v){
      this.getData({page:0,sort:v})
    }
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
          this.tableData = res.data.content;
          this.total=res.data.totalElements;
        } else {
          this.$notify.error({
            title: "失败",
            message: "请刷新重试!"
          });
        }
      });
    },
    handleSizeChange(p){
      this.page=p;
      this.getData({page:this.page-1})
    }
  }
};
</script>

<style>
.box-card .title{
  font-size: 18px;
  font-weight: 500;
  color: #1890ff;
}
.box-card .sub-title{
  color:#999;
}
</style>
