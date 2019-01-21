<template>
  <el-aside :width="menuWidth" style="overflow:hidden;">
    <div v-if="!isCollapse" class="button-menu" @click="changeCollapse">
      <i class="el-icon-caret-left" style="font-size:25px"></i>
      <span slot="title">收起列表</span>
    </div>
    <el-tooltip v-else class="item" effect="dark" content="展开列表" placement="right">
      <div class="button-menu-min" @click="changeCollapse">
        <i class="el-icon-caret-right" style="font-size:25px"></i>
      </div>
    </el-tooltip>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <el-menu-item
        v-for="(d,i) in menus"
        :key="i"
        :index="i+1+''"
        @click="redirectTo(d.path)"
      >
        <i :class="d.icon"></i>
        <span slot="title">{{d.name}}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState, mapActions } from "vuex";
import menus from "../assets/json/menus.json";

export default {
  data() {
    return {
      menus,
      isCollapse: false,
      menuWidth: "200px"
    };
  },
  computed: {
    ...mapState({
      leftMenu: state => state.data.leftMenu
    })
  },
  watch: {
    isCollapse(show) {
      this.toggleMenu(show);
      if (show) {
        this.menuWidth = "56px";
      } else {
        this.menuWidth = "200px";
      }
    }
  },
  methods: {
    ...mapActions({
      toggleMenu: "data/toggleMenu"
    }),
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    redirectTo(path) {
      this.$router.push({
        path: path,
        query: {}
      });
    }
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
.el-menu--collapse {
  width: 64px;
  min-height: 100%;
}

.button-menu {
  background-color: rgb(145, 152, 158);
  padding: 20px;
  color: #ffffff;
  font-size: 14px;
  padding: 0 20px;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  padding-left: 20px;
  color: rgb(255, 255, 255);
  background-color: rgb(84, 92, 100);
  height: 56px;
  line-height: 56px;
  position: relative;
  white-space: nowrap;
  list-style: none;
  display: list-item;
  text-align: -webkit-match-parent;
}
.button-menu-min {
  background-color: rgb(145, 152, 158);
  padding: 20px;
  color: #ffffff;
  font-size: 14px;
  padding: 0 20px;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  padding-left: 20px;
  color: rgb(255, 255, 255);
  background-color: rgb(84, 92, 100);
  height: 56px;
  line-height: 56px;
  position: relative;
  white-space: nowrap;
  list-style: none;
  display: list-item;
  text-align: -webkit-match-parent;
  width: 60px;
}
.button-menu [class^="el-icon-"] {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}
.button-menu-min [class^="el-icon-"] {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}
</style>
