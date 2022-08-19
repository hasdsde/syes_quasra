<template>

  <!-- 顶部按钮 -->
  <div class="q-pa-md q-gutter-sm">
    <div class="header">
      <q-btn class="shadow-1" unelevated color="primary" label="刷新" :loading="loading[0]"
             @click="simulateProgress(0)" icon="replay"/>
      <q-btn class="shadow-1" unelevated color="secondary" label="新增" @click="windowDisplay=true"
             icon="add_circle_outline"/>
      <q-btn class="shadow-1" unelevated color="brown-5" label="导出" @click="" icon="file_download"/>
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
const currentPage = ref(1); //当前页面
let Pagecount = ref(1)  //页数
const PageItem: number = 10   //页面数据数量
const pagination = ref({rowsPerPage: 10}) //表格显示的最大数量


function handlePage() {
  loadPage();
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
    console.log(res.data)
    rows.value = res.data.data.data
    Pagecount.value = Math.ceil(res.data.data.total / PageItem)
    console.log(Pagecount.value)
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


</script>

<style scoped>
.header .q-btn {
  margin-right: 15px;
}

</style>
