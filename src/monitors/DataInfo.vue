<template>
  <div class="q-pa-md q-gutter-sm row ">
    <q-card class="my-card q-ma-md">
      <q-card-section class="bg-secondary">
        <div class="text-h6 text-white">MySQL概览</div>
      </q-card-section>

      <q-separator/>

      <q-card-actions class="q-pa-md " vertical>
        <div class="q-pa-md">
          <span class="float-left">获取连接时检测</span>
          <span class="float-right text-green">开启</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">空闲时检测</span>
          <span class="float-right text-green">开启</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">初始连接大小</span>
          <span class="float-right text-green">2</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">最大连接数</span>
          <span class="float-right text-green">10</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">最大等待时间</span>
          <span class="float-right text-green">2000</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">IP白名单</span>
          <span class="float-right text-green">192.168.31.100</span>
        </div>
      </q-card-actions>
    </q-card>
    <q-card class="my-card q-ma-md">
      <q-card-section class="bg-purple">
        <div class="text-h6 text-white">Web检测</div>
      </q-card-section>

      <q-separator/>

      <q-card-actions class="q-pa-md " vertical>
        <div class="q-pa-md">
          <span class="float-left">正在执行</span>
          <span class="float-right text-purple">1</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">最大并发</span>
          <span class="float-right text-purple">2</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">请求次数</span>
          <span class="float-right text-purple">200</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">更新行数</span>
          <span class="float-right text-purple">10</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">读取行数</span>
          <span class="float-right text-purple">20</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">JDBC执行数</span>
          <span class="float-right text-purple">20</span>
        </div>
      </q-card-actions>
    </q-card>
    <q-card class="my-card q-ma-md">
      <q-card-section class="bg-positive">
        <div class="text-h6 text-white">重要SQL检测</div>
      </q-card-section>

      <q-separator/>

      <q-card-actions class="q-pa-md " vertical>
        <div class="q-pa-md">
          <span class="float-left">登录请求</span>
          <span class="float-right text-positive">100</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">浏览首页</span>
          <span class="float-right text-positive">2</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">物品浏览总量</span>
          <span class="float-right text-positive">200</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">新增物品数</span>
          <span class="float-right text-positive">10</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">新增评论</span>
          <span class="float-right text-positive">20</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">新增订单</span>
          <span class="float-right text-positive">20</span>
        </div>
      </q-card-actions>
    </q-card>
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
const rows =
    [
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

