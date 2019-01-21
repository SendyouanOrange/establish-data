import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    model: 'hash',
    routes: [{
        path: '/',
        name: 'login',
        component: resolve => require(["@/views/login.vue"], resolve)
    }, {
        name: 'home',
        path: '/home',
        redirect: "/home/list",
        component: resolve => require(["@/views/home.vue"], resolve),
        children: [{
                path: 'page',
                name: '首页',
                component: resolve => require(["@/views/home.vue"], resolve)
            },
            {
                path: 'list',
                name: '列表展示',
                component: resolve => require(["@/views/data-table.vue"], resolve)
            }, {
                path: 'chart',
                name: '图表展示',
                component: resolve => require(["@/views/data-chart.vue"], resolve)
            }
        ]
    }]
})