<template>

  <!-- 顶部按钮 -->
  <div class="q-pa-md q-gutter-sm">
    <div class="header">
      <q-btn class="shadow-1" unelevated color="primary" label="刷新" :loading="loading[0]"
             @click="simulateProgress(0)" icon="replay"/>
      <q-btn class="shadow-1" unelevated color="secondary" label="新增" @click="windowDisplay=true"
             icon="add_circle_outline"/>
      <q-btn class="shadow-1" unelevated color="brown-5" label="导出" @click="exportTable" icon="file_download"/>
      <!--搜索框-->
      <q-input label="搜索" v-model="searchtext" :dense=true
               style="display: inline-block;float: right;margin-right: 20px" debounce="1000">
        <template v-slot:append>
          <q-icon name="search" @click="handlesearch()" class="cursor-pointer"/>
          <q-icon v-if="searchtext !== ''" name="close" @click="handleRest" class="cursor-pointer"/>
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
    <!--新增弹出框-->
    <q-dialog v-model="windowDisplay" position="right">
      <q-card class="column full-height" style="width: 400px">
        <q-card-section class="row items-center q-pb-none ">
          <div class="text-h6">新增用户</div>
          <q-space/>
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>
        <div class="q-pa-md" style="max-width: 300px">
          <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
            <q-input
              ref="nameRef"
              v-model="name"
              label="Your name *"
              hint="Name and surname"
              lazy-rules
              :rules="nameRules"
            />

            <q-input
              ref="ageRef"
              type="number"
              v-model="age"
              label="Your age *"
              lazy-rules
              :rules="ageRules"
            />

            <q-toggle v-model="accept" label="I accept the license and terms"/>

            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
            </div>
          </form>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import {Notify} from 'quasar'
import {ref, computed} from "vue";
import axios, {api} from "boot/axios";
import {exportFile, useQuasar} from 'quasar'
//插件初始化
const $q = useQuasar()

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
const currentPage = ref(1);
const Pagecount: number = 6;

function handlePage() {
  console.log(currentPage.value)
}

//搜索
let searchtext = ref('');

function handlesearch() {
  api.get("/user/" + searchtext.value).then(res => {
    console.log(res)
  })
}

function handleRest() {
  searchtext.value = "";
  console.log("重置了按钮")
}

//获取后端数据
function loadPage() {
  api.get("/user/20201313059").then(res => {
    console.log(res)
  })
}


//新增用户
let windowDisplay = ref(false)
const name = ref('')
const nameRef = ref('')
const age = ref('')
const ageRef = ref('')
let accept = ref(false)
let nameRules = ref([(val: string | any[]) => (val && val.length > 0) || 'Please type something'])

let ageRules = ref([
  (val: string | null) => (val !== null && val !== '') || 'Please type your age',
  (val: number) => (val > 0 && val < 100) || 'Please type a real age'
])

function onSubmit() {
  if (name.value != '' || age.value != '') {
    if (accept.value == true) {
      $q.notify({
        icon: 'done',
        color: 'positive',
        message: '提交成功',
        position: 'top'
      })
      accept.value = false
      windowDisplay.value = false
    } else {
      $q.notify({
        color: 'negative',
        message: '请同意协议',
        position: 'top'
      })
    }
  } else {
    $q.notify({
      color: 'negative',
      message: '输入格式不正确',
      position: 'top'
    })
  }
}

function onReset() {
  name.value = ''
  age.value = ''

  nameRef.value = ''
  ageRef.value = ''
  accept.value = false
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

//导出数据
function wrapCsvValue(val: string, formatFn: ((arg0: any, arg1: any) => any) | undefined, row: { name: string; calories: number; fat: number; carbs: number; protein: number; sodium: number; calcium: string; iron: string; } | undefined) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}


function exportTable() {
  // naive encoding to csv format
  const content = [columns.map(col => wrapCsvValue(col.label, undefined, undefined))].concat(
    rows.map(row => columns.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)// @ts-ignore
        : row[col.field === void 0 ? col.name : col.field],// @ts-ignore
      col.format,
      row
    )).join(','))
  ).join('\r\n')
  const status = exportFile(
    'table-export.csv',
    content,
    'text/csv'
  )

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  }
}
</script>

<style scoped>
.header .q-btn {
  margin-right: 15px;
}

</style>
