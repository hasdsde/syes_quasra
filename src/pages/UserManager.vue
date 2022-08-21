<template>

  <!-- 顶部按钮 -->
  <div class="q-pa-md q-gutter-sm">
    <div class="header">
      <q-btn class="shadow-1" unelevated color="primary" label="刷新" :loading="loading[0]"
             @click="simulateProgress(0)" icon="replay"/>
      <q-btn class="shadow-1" unelevated color="secondary" label="新增" @click="windowDisplay=true;onReset()"
             icon="add_circle_outline"/>
      <q-btn class="shadow-1" unelevated color="purple" label="修改" @click="checkCounts"
             icon="edit"/>
      <q-btn class="shadow-1" unelevated color="red" label="删除" @click="showNotif" icon="delete_forever"/>
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
    <div class="q-pa-md" style="margin-left:40px">
      <q-table
        title="用户信息管理"
        :rows="rows"
        :columns="columns"
        row-key="id"
        hide-pagination
        :pagination="pagination"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        v-model:selected="selected"
      />
    </div>

    <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
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
              ref="userinfo.idRef.value"
              v-model="userinfo.id.value"
              label="学号"
              hint="学生学号"
              lazy-rules
              :rules="idRules"
            />
            <q-input
              ref="userinfo.nameRef.value"
              v-model="userinfo.name.value"
              label="姓名"
              hint="输入真实姓名"
              lazy-rules
              :rules="nameRules"
            />
            <q-input
              ref="userinfo.passwordRef.value"
              v-model="userinfo.password.value"
              label="密码"
              hint="请输入密码"
              lazy-rules
              :rules="nameRules"
              :type="userinfo.isPwd.value ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="userinfo.isPwd.value ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="userinfo.isPwd.value = !userinfo.isPwd.value"
                />
              </template>
            </q-input>
            <q-input
              ref="userinfo.passwordRef.value"
              v-model="userinfo.repassword.value"
              label="确认密码"
              hint="请确认输入密码"
              lazy-rules
              :rules="passwordRules"
              type="password"
            />
            <q-input
              ref="userinfo.nickname.value"
              v-model="userinfo.nickname.value"
              label="昵称"
              hint="输入昵称，创建后可更改"
              lazy-rules
              :rules="nameRules"
            />
            <q-input
              ref="userinfo.phoneRef.value"
              v-model="userinfo.phone.value"
              label="手机号"
              hint="请输入正确格式手机号"
              lazy-rules
            />

            <q-toggle v-model="userinfo.accept.value" label="同意许可协议"/>

            <div>
              <q-btn label="提交" type="submit" color="primary"/>
              <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm"/>
            </div>
          </form>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import {Notify} from 'quasar'
import {ref, computed, Ref, registerRuntimeCompiler} from "vue";
import axios, {api} from "boot/axios";
import {exportFile, useQuasar} from 'quasar'
import {Userinfo} from "components/models";

//插件初始化
const $q = useQuasar()

//刷新按钮
let loading = ref([false,])

function simulateProgress(number: number) {
  loading.value[number] = true
  loadPage()
  setTimeout(() => {
    loading.value[number] = false
    $q.notify({
      type: 'positive',
      color: 'positive',
      message: '刷新完成',
      position: 'top'
    })
  }, 500)

}

//表格多选框
const selected = ref([])

function getSelectedString() {
  //@ts-ignore
  return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
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

//删除
function showNotif() {
  $q.notify({
    message: '确定要删除所选项目吗？',
    type: 'negative',
    position: 'top',
    actions: [
      {
        label: '确定', color: 'yellow', handler: () => {
          const idlist: any = ref([])
          selected.value.forEach((item: any, index) => {
            idlist.value.push(item.id)
          })
          api.post("/user/dlist?ids=" + JSON.stringify(idlist.value)).then(res => {
            console.log(res)
            loadPage()
          })
        }
      },
      {
        label: '取消', color: 'white', handler: () => { /* ... */
        }
      }
    ]
  })
}


//新增用户
const userinfo = new Userinfo();
let windowDisplay = ref(false)


//表格规则
let accept = ref(false)
//@ts-ignore 我不知道为什么，但是它能跑
let passwordRules = ref([(val: Ref<string>) => (val == password.value) || '两次输入密码不一致'])
let nameRules = ref([(val: string | any[]) => (val && val.length > 0) || 'Please type something'])

let ageRules = ref([
  (val: string | null) => (val !== null && val !== '') || '请输入年龄',
  (val: number) => (val > 0 && val < 100) || '数字格式不正确'
])
let idRules = ref([
  (val: number) => (val > 0 && val < 20229999999) || '请输入正确的学号'
])

//新增用户提交
function onSubmit() {
  if (userinfo.accept.value == true) {
    if (userinfo.name.value != '' && userinfo.id.value != '' && userinfo.password.value != '' && userinfo.nickname.value != '' && userinfo.password.value == userinfo.repassword.value && userinfo.phone.value != '') {
      api.post("/user/", {
        "realname": userinfo.name.value,
        "password": userinfo.password.value,
        "nickname": userinfo.nickname.value,
        "phone": userinfo.phone.value,
        "id": userinfo.id.value
      }).then(res => {
        console.log(res)
      })
      $q.notify({
        icon: 'done',
        color: 'positive',
        message: '提交成功',
        position: 'top'
      })
      userinfo.accept.value = false
      windowDisplay.value = false
      onReset()
      loadPage()
    } else {
      $q.notify({
        color: 'negative',
        message: '请检查格式是否正确',
        position: 'top'
      })
    }
  } else {
    $q.notify({
      color: 'negative',
      message: '请先同意协议',
      position: 'top'
    })
  }
}

function onReset() {
  userinfo.clearall()
  accept.value = false
}

//修改用户
function checkCounts() {
  if (selected.value.length != 1) {
    $q.notify({
      message: '请选择一个数据修改',
      position: 'top',
      type: 'warning',
    })
  } else {
    onReset()
    console.log(selected.value[0])
  }
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
