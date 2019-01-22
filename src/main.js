// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import "./assets/icon/iconfont.css";
import "./assets/css/common.css";
import store from "./store";
import echarts from "echarts";
import moment from "moment";

// 赋值使用echart
Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment;

Vue.use(ElementUI);
Vue.config.productionTip = false;
// /* eslint-disable no-new */


new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
});