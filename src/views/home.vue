<template>
  <el-container class="full-box">
    <el-header class="padding-zero">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="0" style="font-size:22px;">企业开办/数据展示</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <Menu></Menu>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "../components/menu.vue";
export default {
  components: {
    Menu
  },
  data() {
    return {
      user: {
        username: "admin"
      },
      activeIndex: "2"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
</style>
