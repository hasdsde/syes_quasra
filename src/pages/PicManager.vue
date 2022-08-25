<template>
  <!-- 顶部提示 -->
  <div class="q-pa-md q-gutter-sm">
    <!--  表格  -->
    <div class="q-pa-md" style="margin-left:auto">
      <q-table
        title="图片管理"
        :rows="rows"
        :columns="columns"
        row-key="name"
        hide-pagination
        :pagination="pagination"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        v-model:selected="selected"
        :loading="loadingPage"
        grid
      >
        <template v-slot:item="props">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <q-card :class="props.selected ? 'bg-grey-2' : ''">
              <q-card-section>
                <q-checkbox dense v-model="props.selected" :label="props.row.name"/>
              </q-card-section>
              <q-card-section>
                <q-img :src="props.row.url" style="max-height: 230px;max-width: 100%">
                </q-img>
              </q-card-section>
              <q-separator/>
              <q-expansion-item
                v-model="openall"
                icon="camera"
                :label="'用户: '+props.row.userid"
                :caption="' '+props.row.createtime"
              >
                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                  <q-item-section>
                    <!--        获取了全部属性            -->
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <!--        显示属性值            -->
                    <q-item-label caption>{{ col.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>
            </q-card>
          </div>
        </template>
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

<script lang="ts" setup>
//刷新按钮
import {ref} from "vue";
import {CommSeccess} from "components/common";
import {api} from "boot/axios";

let loading = ref([false,])

function simulateProgress(number: number) {
  loading.value[number] = true //这是那个加载动画
  localStorage.removeItem("piccolumns")
  loadPage()
  setTimeout(() => {
    loading.value[number] = false
    CommSeccess("刷新成功")
  }, 500)

}

const selected = ref([])

function getSelectedString() {
  return selected.value.length === 0 ? '' : `已选择${selected.value.length}项${selected.value.length > 1 ? '' : ''}`
}

//分页
const currentPage = ref(1) //当前页面
let Pagecount = ref(1)  //页数
const PageItem = 4   //页面数据数量
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
  if (localStorage.getItem("piccolumns") == null || localStorage.getItem("piccolumns") == undefined) {
    api.get("/tablemenu/picdto").then(res => {
      if (columns == undefined) {
        loadPage()
      }
      columns.value = res.data.data
      columns.value.forEach((pic) => {
        //@ts-ignore
        pic.align = "center"
      })
      localStorage.setItem("piccolumns", JSON.stringify(columns))
      // console.log(localStorage.getItem("piccolumns"))
      // console.log(JSON.parse(localStorage.getItem("piccolumns")))
    })
  } else {
    // @ts-ignore 不清楚怎么办到的，能跑就行
    const localInfo = JSON.parse(localStorage.getItem("piccolumns"))._value
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
  api.get("/file/page?" + "pagesize=" + PageItem + "&currentpage=" + currentPage.value).then(res => {
    rows.value = res.data.data.data
    console.log(rows.value)
    Pagecount.value = Math.ceil(res.data.data.total / PageItem)
  })
  setTimeout(() => {
    loadingPage.value = false
  }, 1000)

}

//图片整体展开或关闭
let openall = ref(false)

</script>

<style scoped>

</style>
<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>
