<template>
  <!-- 顶部提示 -->
  <div class="q-pa-md q-gutter-sm row">
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
    <q-card class="my-card q-ma-md">
      <q-card-section class="bg-secondary">
        <div class="text-h6 text-white">概览</div>
      </q-card-section>

      <q-separator/>

      <q-card-actions class="q-pa-md " vertical>
        <div class="q-pa-md">
          <span class="float-left">系统状态</span>
          <span class="float-right text-green">正常</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">数据库状态</span>
          <span class="float-right text-green">正常</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">缓存数据库</span>
          <span class="float-right text-green">正常</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">硬盘</span>
          <span class="float-right text-green">正常</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">消息队列</span>
          <span class="float-right text-green">正常</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">延迟状态</span>
          <span class="float-right text-green">正常</span>
        </div>
      </q-card-actions>
    </q-card>
    <q-card class="my-card2 q-ma-md">
      <q-card-section class="bg-primary">
        <div class="text-h6 text-white">实时监控</div>
      </q-card-section>

      <q-separator/>

      <q-card-actions class="q-pa-md  column" vertical>
        <div class="col">
          <div class="row">
            <div class="col">
              <q-circular-progress
                  show-value
                  font-size="10px"
                  class="q-ma-md"
                  value="81"
                  size="80px"
                  :thickness="0.25"
                  color="primary"
                  track-color="grey-3"
              >
                <q-avatar size="60px">
                  <q-icon name="memory" color="primary"></q-icon>
                </q-avatar>
              </q-circular-progress>
              <span>处理器</span>
            </div>
            <div class="col">

            </div>
          </div>
        </div>
        <div class="col">
          <q-circular-progress
              show-value
              font-size="10px"
              class="q-ma-md"
              value="81"
              size="80px"
              :thickness="0.25"
              color="primary"
              track-color="grey-3"
          >
            <q-avatar size="60px">
              <q-icon name="select_all" color="primary"></q-icon>
            </q-avatar>
          </q-circular-progress>
          <span>内存</span>
        </div>
        <div class="col q-mt-md">
          <span class="float-left">硬盘占用</span>
          <span class="float-right text-primary">30%</span>
          <q-linear-progress stripe color="primary" size="10px" value="0.3"/>
        </div>
      </q-card-actions>
    </q-card>
    <div class="q-pa-sm" style="width: 39vw">
      <q-table
          title="前台监控"
          :rows="rows"
          :columns="columns"
          row-key="name"
      />
    </div>
    <div class="q-pa-sm q-ml-md" style="width: 39vw">
      <q-table
          title="后台监控"
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

.my-card2 {
  width: 100%;
  max-width: 38vw;
  max-height: 450px;
}
</style>
