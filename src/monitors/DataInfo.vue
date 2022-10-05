<template>
  <div class="q-pa-md q-gutter-sm row ">
    <CommCard :info="ListMysql" title="Mysql概览" color="secondary"></CommCard>
    <CommCard :info="ListWeb" title="Web检测" color="purple"></CommCard>
    <CommCard :info="ListImp" title="重要SQL检测" color="positive"></CommCard>


    <q-card class="my-card q-ma-md">
      <q-card-section class="bg-orange">
        <div class="text-h6 text-white">自动更新/网页跳转</div>
      </q-card-section>
      <q-separator/>
      <q-card-actions class="q-pa-md " vertical>
        <div class="q-pa-md">
          <q-btn-toggle
              v-model="secondModel"
              spread
              class="my-custom-toggle"
              no-caps
              rounded
              toggle-color="orange"
              color="white"
              text-color="orange"
              :options="[
          {label: '关', value: '-1'},
          {label: '5s', value: '5'},
          {label: '10s', value: '10'},
          {label: '1min', value: '60'},
        ]"
          />
        </div>
        <div class="q-pa-md">
          <span class="q-mr-md">Druid控制台</span>
          <q-btn color="orange-5" size="sm" class="float-right" label="点击跳转"/>
        </div>
        <div class="q-pa-md">
          <span class="q-mr-md">SpringActuator</span>
          <q-btn color="orange-5" size="sm" class="float-right" label="点击跳转"/>
        </div>
        <div class="q-pa-md">
          <span class="q-mr-md">前台</span>
          <q-btn color="orange-5" size="sm" class="float-right" label="点击跳转"/>
        </div>
      </q-card-actions>
    </q-card>
    <div class="q-pa-sm" style="width: 39vw">
      <q-table
          title="URL监控"
          :rows="rows"
          :columns="columns"
          row-key="name"
      />
    </div>
    <div class="q-pa-sm q-ml-md" style="width: 39vw">
      <q-table
          title="Session监控"
          :rows="rows"
          :columns="columns"
          row-key="name"
      />
    </div>

  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import {InfoKV} from "components/models";
import CommCard from "components/CommCard.vue";

const ListMysql = new InfoKV()
const ListWeb = new InfoKV()
const ListImp = new InfoKV()
let DataDataSource = []
let DataWeb = []
let DataImp = []
loadPage()

function loadPage() {
  CardList()
  WebList()
  ImpList()
}

//Mysql概览
function CardList() {
  axios.get('http://192.168.31.99:8000/druid/datasource.json').then(res => {
    DataDataSource = res.data.Content[0]
    ListMysql.addList("获取连接时检测", DataDataSource.TestOnBorrow === true ? '开启' : '关闭')
    ListMysql.addList("空闲时检测", DataDataSource.TestWhileIdle === true ? '开启' : '关闭')
    ListMysql.addList("保持连接", DataDataSource.KeepAlive === true ? '开启' : '关闭')
    ListMysql.addList("初始化大小", DataDataSource.InitialSize)
    ListMysql.addList("最大连接大小", DataDataSource.MaxActive)
    ListMysql.addList("最长等待时间", DataDataSource.MaxWait)
  })
}

//Web检测
function WebList() {
  axios.get('http://192.168.31.99:8000/druid/webapp.json').then(res => {
    DataWeb = res.data.Content[0]
    ListWeb.addList("正在执行", DataWeb.RunningCount)
    ListWeb.addList("最大并发", DataWeb.ConcurrentMax)
    ListWeb.addList("请求次数", DataWeb.RequestCount)
    ListWeb.addList("更新行数", DataWeb.JdbcUpdateCount)
    ListWeb.addList("读取行数", DataWeb.JdbcFetchRowCount)
    ListWeb.addList("JDBC执行数", DataWeb.JdbcExecuteCount)
  })
}

//重要SQL检测
function ImpList() {
  axios.get('http://192.168.31.99:8000/druid/weburi.json').then(res => {
        DataImp = res.data.Content
        console.log(DataImp)
        //这样是为了保证顺序
        ListImp.addList("登录请求", '')
        ListImp.addList("首页浏览", '')
        ListImp.addList("物品浏览", '')
        ListImp.addList("新增/修改物品", '')
        ListImp.addList("新增/修改评论", '')
        ListImp.addList("新增/修改订单", '')
        DataImp.forEach((data: any) => {
          data.URI == '/user/login' ? ListImp.setList("登录请求", data.RequestCount) : ''
          data.URI == '/rollimg/' ? ListImp.setList("首页浏览", data.RequestCount) : ''
          data.URI == '/item/id' ? ListImp.setList("物品浏览", data.RequestCount) : ''
          data.URI == '/file/id' ? ListImp.setList("新增/修改物品", data.RequestCount) : ''
          data.URI == '/comment/p' ? ListImp.setList("新增/修改评论", data.RequestCount) : ''
          data.URI == '/order/u' ? ListImp.setList("新增/修改订单", data.RequestCount) : ''
        })
      }
  )
}

const secondModel = 5
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row: { name: any; }) => row.name,
    format: (val: any) => `${val}`,
    sortable: true
  },
  {name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true},
  {name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true},
  {name: 'carbs', label: 'Carbs (g)', field: 'carbs'},
  {name: 'protein', label: 'Protein (g)', field: 'protein'},
  {name: 'sodium', label: 'Sodium (mg)', field: 'sodium'},
  {
    name: 'calcium',
    label: 'Calcium (%)',
    field: 'calcium',
    sortable: true,
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10)
  },
  {
    name: 'iron',
    label: 'Iron (%)',
    field: 'iron',
    sortable: true,
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10)
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
.my-card {
  width: 100%;
  max-width: 350px;
  max-height: 450px;
}
</style>

