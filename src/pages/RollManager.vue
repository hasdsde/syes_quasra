<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner class="bg-primary text-white">
      这是RollManager页面
      <template v-slot:action>
        <q-btn flat color="white" label="Dismiss"/>
        <q-btn flat color="white" label="Update Credit Card"/>
      </template>
    </q-banner>
  </div>
</template>

<script lang="ts" setup>
//插件初始化
import {ref} from "vue";
import {api} from "boot/axios";
import {CommFail, CommSeccess, CommWarn} from "components/common";
import {Iteminfo} from "components/models";
import {exportFile, useQuasar} from "quasar";


//刷新按钮
let loading = ref([false,])

function simulateProgress(number: number) {
  loading.value[number] = true //这是那个加载动画
  localStorage.removeItem("rollcolumns")
  loadPage()
  setTimeout(() => {
    loading.value[number] = false
    CommSeccess("刷新成功")
  }, 500)

}


//表格多选框
const selected = ref([])

//获取后端数据
let columns = ref([])
let rows = ref([])
let loadingPage = ref(false)
loadPage()

function loadPage() {
  loadingPage.value = true
  //获取表格属性
  if (localStorage.getItem("rollcolumns") == null || localStorage.getItem("rollcolumns") == undefined) {
    api.get("/tablemenu/roll").then(res => {
      // console.log(res.data)
      // console.log('刷新表格') //握草怪死了，改成 刷新了表格 就会报错
      if (columns == undefined) {
        loadPage()
      }
      columns.value = res.data
      columns.value.forEach((item) => {
        //@ts-ignore
        item.align = "center"
      })
      localStorage.setItem("rollcolumns", JSON.stringify(columns))
    })
  } else {
    // @ts-ignore 不清楚怎么办到的，能跑就行
    const localInfo = JSON.parse(localStorage.getItem("rollcolumns"))._value
    if (localInfo == undefined) {
      setTimeout(() => {
        simulateProgress(0)
      }, 500)
      console.log('刷新快了');
    } else {
      columns = localInfo
    }
  }
//获取全部数据
  api.get("/roll/enable").then(res => {
    rows.value = res.data.data
    console.log(res.data)
  })
  setTimeout(() => {
    loadingPage.value = false
  }, 1000)

}

//切换按钮状态
function switchbutton(value: { row: { id: string; }; value: any; }) {
  api.get("/roll/status?id=" + value.row.id + "&status=" + !value.value).then(() => {
    loadPage()
    CommSeccess("操作成功")
  })
}

//新增物品
const iteminfo = new Iteminfo();
let windowDisplay = ref(false)
let buttonStatus: string = '新增物品'
//规则
let priceRules = ref([
  (val: number) => (val > 0 && val < 9999) || '价格过高或过低'
])
let contentRules = ref([(val: string | any[]) => (val && val.length > 0) || '输入值为空'])
let idRules = ref([
  (val: number) => (val > 20191111111 && val < 20229999999) || '请输入正确的学号'
])

//清空
function onReset() {
  iteminfo.clearall()
}

//修改物品
function checkCounts() {
  buttonStatus = '修改物品'
  if (selected.value.length != 1) {
    CommWarn("请选择一个数据进行修改")
  } else {//@ts-ignore
    iteminfo.id.value = selected.value[0].id//@ts-ignore
    iteminfo.title.value = selected.value[0].title//@ts-ignore
    iteminfo.description.value = selected.value[0].description//@ts-ignore
    iteminfo.userid.value = selected.value[0].userid//@ts-ignore
    iteminfo.price.value = selected.value[0].price//@ts-ignore
    iteminfo.sort.value = selected.value[0].sort//@ts-ignore
    windowDisplay.value = true
  }
}

//提交新增或修改
function onSubmit() {
  if (iteminfo.accept.value == true) {
    if (buttonStatus === '新增物品') {
      if (iteminfo.title.value != '' && iteminfo.description.value != '' && iteminfo.price.value > 0 && iteminfo.userid.value != '') {
        api.post("/Ritem/", {
          "title": iteminfo.title.value,
          "description": iteminfo.description.value,
          "price": iteminfo.price.value,
          "userid": iteminfo.userid.value
        }).then(res => {
          windowDisplay.value = false
          loadPage()
        })
      } else {
        CommFail("请检查输入格式是否正确")
      }
    }
    if (buttonStatus === '修改物品') {
      if (iteminfo.id.value != '' && iteminfo.title.value != '' && iteminfo.description.value != '' && iteminfo.price.value > 0 && iteminfo.userid.value != '') {
        api.put("/Ritem/", {
          "id": iteminfo.id.value,
          "title": iteminfo.title.value,
          "description": iteminfo.description.value,
          "price": iteminfo.price.value,
          "userid": iteminfo.userid.value,
          "sort": iteminfo.sort.value
        }).then(res => {
          if (res.code == '200') {
            CommSeccess('操作成功')
          }

          windowDisplay.value = false
          loadPage()
        })
      } else {
        CommFail("请检查输入格式是否正确")
      }
    }
  } else {
    CommFail('请同意协议')
  }
}


//删除
const $q = useQuasar()

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
          // 删除用户
          deleteItems_ById(idlist)
          // 刷新页面
          setTimeout(() => {
            loadPage()
          }, 500)
        }
      },
      {
        label: '取消', color: 'white', handler: () => { /* ... */
        }
      }
    ]
  })
}

// 根据id删除多个用户
function deleteItems_ById(idlist: any) {
  idlist.value.forEach((item: string) => {
    // 先用枚举删除将就一下
    deleteItemById(item)
  })
}

// 根据id删除单个用户
function deleteItemById(id: string) {
  api.delete("/roll/" + id).then(res => {
    if (res.code == "200") {
      CommSeccess('成功删除')
    }
  })
}

//导出
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

.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}

.header .q-btn {
  margin-right: 15px;
}
</style>
