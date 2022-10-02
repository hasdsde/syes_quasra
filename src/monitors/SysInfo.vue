<template>
  <div class="q-pa-md q-gutter-sm">


    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">概览</div>
      </q-card-section>

      <q-separator/>

      <q-card-actions class="q-pa-md" vertical>
        <div class="q-pa-md">
          <span class="float-left">系统状态</span>
          <span class="float-right text-green">正常</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">数据库状态</span>
          <span class="float-right text-green">正常</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">缓存数据库</span>
          <span class="float-right text-green">正常</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">硬盘</span>
          <span class="float-right text-green">正常</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">消息队列</span>
          <span class="float-right text-green">正常</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">延迟状态</span>
          <span class="float-right text-green">正常</span>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";

axios.get('http://192.168.31.100:8000/actuator/health').then(res => {
  console.log(res)
})
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>

