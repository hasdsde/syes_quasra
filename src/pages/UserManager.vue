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
        :pagination="pagination"
      />
    </div>
    <!--  分页  -->
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        :max="Pagecount"
        direction-links
        @click="handlePage()"
        style="min-width: 2em"
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
              ref="idRef"
              v-model="id"
              label="学号"
              hint="学生学号"
              lazy-rules
              :rules="idRules"
            />
            <q-input
              ref="nameRef"
              v-model="name"
              label="姓名"
              hint="输入真实姓名"
              lazy-rules
              :rules="nameRules"
            />
            <q-input
              ref="passwordRef"
              v-model="password"
              label="密码"
              hint="请输入密码"
              lazy-rules
              :rules="nameRules"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-input
              ref="repasswordRef"
              v-model="repassword"
              label="确认密码"
              hint="请确认输入密码"
              lazy-rules
              :rules="passwordRules"
              type="password"
            />
            <q-input
              ref="nicknameRef"
              v-model="nickname"
              label="昵称"
              hint="输入昵称，创建后可更改"
              lazy-rules
              :rules="nameRules"
            />
            <q-input
              ref="phoneRef"
              v-model="phone"
              label="手机号"
              hint="请输入正确格式手机号"
              lazy-rules
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
import {ref, computed, Ref} from "vue";
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
const currentPage = ref(1); //当前页面
let Pagecount = ref(1)  //页数
const PageItem: number = 10   //页面数据数量
const pagination = ref({rowsPerPage: 10}) //表格显示的最大数量
function handlePage() {
  loadPage();
}

//获取后端数据
let columns = ref([])
let rows = ref([])
loadPage()

function loadPage() {
  //获取表格属性
  if (localStorage.getItem("usercolumns") == null) {
    api.get("/tablemenu/user").then(res => {
      columns.value = res.data.data
      columns.value.forEach((item: any) => {
        item.align = "center"
      })

      localStorage.setItem("usercolumns", JSON.stringify(columns))
    })
  } else {
    // @ts-ignore 不清楚怎么办到的，能跑就行
    columns = JSON.parse(localStorage.getItem("usercolumns"))._value
  }
//获取分页数据
  api.get("/user/page?" + "pagesize=" + PageItem + "&currentpage=" + currentPage.value).then(res => {
    rows.value = res.data.data.data
    Pagecount.value = Math.ceil(res.data.data.total / PageItem)
  })

}

//搜索
let searchtext = ref('');

function handlesearch() {
  api.get("/user/" + searchtext.value).then(res => {
    rows.value.splice(0)
    for (let i: number = 0; i < res.data.data.length; i++) {
      //@ts-ignore
      rows.value[i] = res.data.data[i]
    }
  })
}

function handleRest() {
  searchtext.value = "";
  console.log("重置了按钮")
  loadPage()
}


//新增用户
let windowDisplay = ref(false)
const name = ref('')
const nameRef = ref('')
const age = ref('')
const ageRef = ref('')
const id = ref('')
const idRef = ref('')
const nickname = ref('')
const nicknameRef = ref('')
const phone = ref('')
const phoneRef = ref('')
const password = ref('')
const passwordRef = ref('')
const isPwd = ref(true)
const repassword = ref('')
const repasswordRef = ref('')


let accept = ref(false)
let passwordRules = ref([(val: Ref<string>) => (val == password) || '两次输入密码不一致'])
let nameRules = ref([(val: string | any[]) => (val && val.length > 0) || 'Please type something'])

let ageRules = ref([
  (val: string | null) => (val !== null && val !== '') || 'Please type your age',
  (val: number) => (val > 0 && val < 100) || 'Please type a real age'
])
let idRules = ref([
  (val: number) => (val > 0 && val < 20229999999) || 'Please type a real age'
])

//新增用户提交
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

//导出数据
function wrapCsvValue(val: any, formatFn: ((arg0: any, arg1: any) => any) | undefined, row: any) {
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
  //@ts-ignore
  const content = [columns.map(col => wrapCsvValue(col.label))].concat(
    //@ts-ignore
    rows.value.map(row => columns.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[col.field === void 0 ? col.name : col.field],
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
