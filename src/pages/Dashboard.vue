<template>
  <!-- 顶部提示 -->
  <div class="q-pa-md q-gutter-sm">
    <q-banner class="bg-primary text-white">
      这个是仪表盘页面
      <template v-slot:action>
        <q-btn flat color="white" label="Dismiss"/>
        <q-btn flat color="white" label="Update Credit Card"/>
      </template>
    </q-banner>
  </div>
</template>

<script setup>
import {useStore} from "src/store";


const $store = useStore()
homePage()

function homePage() {
  localStorage.setItem("menus/thismenu", "仪表盘")
  localStorage.setItem("menus/uppermenu", "主页")
}
</script>
<style scoped>

</style>
