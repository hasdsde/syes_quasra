<template>
  <!-- 顶部按钮们 -->
  <div class="q-pa-md q-gutter-sm">
    <div class="header">
      <q-btn class="shadow-1" unelevated color="primary" label="刷新" :loading="loading[0]"
             @click="simulateProgress(0)" icon="replay"/>
      <q-btn class="shadow-1" unelevated color="secondary" label="新增" icon="add_circle_outline"/>
      <q-btn class="shadow-1" unelevated color="brown-5" label="导出" icon="file_download"/>
      <!--搜索框-->
      <q-input label="搜索" v-model="searchtext" :dense=true
               style="display: inline-block;float: right;margin-right: 20px" debounce="1000">
        <template v-slot:append>
          <q-icon name="search" @click="handlesearch()" class="cursor-pointer"/>
          <q-icon v-if="searchtext !== ''" name="close" @click="searchtext = ''" class="cursor-pointer"/>
        </template>
      </q-input>
    </div>

    <!--  表格  -->
    <div class="q-pa-md">
      <q-table
        title="用户信息管理"
        :rows="rows"
        :columns="columns"
        row-key="name"
        hide-pagination
      />
    </div>
    <!--  分页  -->
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        :max="Pagecount"
        direction-links
        max="100"
        @click="handlePage()"
      />
    </div>


  </div>
  <div class="header">

  </div>
</template>

<script setup lang="ts">

import {ref, computed} from "vue";
import axios, {api} from "boot/axios";

//刷新按钮
let loading = ref([false,])

function simulateProgress(number: number) {
  loading.value[number] = true
  loadPage()
  setTimeout(() => {
    loading.value[number] = false
  }, 1000)
}


//分页
const currentPage = ref(3);
const Pagecount: number = 6;

function handlePage() {
  console.log(currentPage.value)
}

//搜索
let searchtext = ref('');

function handlesearch() {
  console.log(searchtext.value)
}

//获取后端数据
function loadPage() {
  api.get("/user/20201313059").then(res => {
    console.log(res)
  })
}

//表格信息
const columns = [
  {
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row: { name: any; }) => row.name,
  },
  {align: 'center', label: 'Calories', field: 'calories',},
  {align: 'center', label: 'Fat (g)', field: 'fat'},
  {align: 'center', label: 'Carbs (g)', field: 'carbs'},
  {align: 'center', label: 'Protein (g)', field: 'protein'},
  {align: 'center', name: 'sodium', label: 'Sodium (mg)', field: 'sodium'},
  {
    label: 'Calcium (%)',
    field: 'calcium',
  },
  {
    label: 'Iron (%)',
    field: 'iron',
  }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]
</script>

<style scoped>
.header .q-btn {
  margin-right: 15px;
}

</style>
