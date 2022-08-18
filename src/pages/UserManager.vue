<template>
  <!-- 顶部按钮们 -->
  <div class="q-pa-md q-gutter-sm">
    <div class="header">
      <q-btn class="shadow-1" unelevated color="primary" label="刷新" :loading="loading[0]"
             @click="simulateProgress(0)" icon="replay"/>
      <q-btn class="shadow-1" unelevated color="secondary" label="新增" icon="add_circle_outline"/>
      <q-btn class="shadow-1" unelevated color="brown-5" label="导出" icon="file_download"/>

      <q-input label="UserID" v-model="text" :dense=true
               style="display: inline-block;">
        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer"/>
          <q-icon name="search"/>
        </template>
      </q-input>
    </div>

  </div>
  <div class="header">

  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";

let loading = ref([false,])

function simulateProgress(number: number) {
  loading.value[number] = true
  setTimeout(() => {
    loading.value[number] = false
  }, 1000)
}


</script>

<style scoped>
.header .q-btn {
  margin-right: 15px;
}

</style>
