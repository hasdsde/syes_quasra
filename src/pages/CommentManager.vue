<template>
  <!-- 顶部提示 -->
  <div class="q-pa-md q-gutter-sm">
    <!--  表格  -->
    <div class="q-pa-md" style="margin-left:auto">
      <q-table
        title="用户评论管理"
        :rows="rows"
        :columns="columns"
        row-key="id"
        hide-pagination
        :pagination="pagination"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        v-model:selected="selected"
        :loading="loadingPage"
      >
        <!--    加载动画    -->
        <q-inner-loading showing color="primary" label="加载..."/>
      </q-table>
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
  </div>
</template>

<script setup>
//表格多选框
import {ref} from "vue";
import {api} from "../boot/axios";

const selected = ref([])

function getSelectedString() {
  return selected.value.length === 0 ? '' : `已选择${selected.value.length}项${selected.value.length > 1 ? '' : ''}`
}

//分页
const currentPage = ref(1) //当前页面
let Pagecount = ref(1)  //页数
const PageItem = 10   //页面数据数量
const pagination = ref({rowsPerPage: 10}) //表格显示的最大数量
function handlePage() {
  loadPage();
}

//获取后端数据
let columns = ref([])
let rows = ref([])

let loadingPage = ref(false)
loadPage()

function loadPage() {
  loadingPage.value = true
  //获取表格属性
  if (localStorage.getItem("commentcolumns") == null || localStorage.getItem("commentcolumns") == undefined) {
    api.get("/tablemenu/comment").then(res => {
      if (columns == undefined) {
        loadPage()
      }
      columns.value = res.data.data
      columns.value.forEach((comment) => {
        //@ts-ignore
        comment.align = "center"
      })
      console.log(columns)
      localStorage.setItem("commentcolumns", JSON.stringify(columns))
      // console.log(localStorage.getItem("commentcolumns"))
      // console.log(JSON.parse(localStorage.getItem("commentcolumns")))
    })
  } else {
    // @ts-ignore 不清楚怎么办到的，能跑就行
    const localInfo = JSON.parse(localStorage.getItem("commentcolumns"))._value
    if (localInfo == undefined) {
      setTimeout(() => {
        simulateProgress(0)
      }, 500)
      console.log('刷新快了');
    } else {
      columns = localInfo
    }
  }
//获取分页数据
  api.get("/comment/page?" + "pagesize=" + PageItem + "&currentpage=" + currentPage.value).then(res => {
    rows.value = res.data.data.data
    Pagecount.value = Math.ceil(res.data.data.total / PageItem)
  })
  setTimeout(() => {
    loadingPage.value = false
  }, 1000)

}
</script>

<style scoped>

</style>
