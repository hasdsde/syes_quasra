<template>
  <div class="q-pa-md q-gutter-sm row ">
    <CommCard :info="info1"></CommCard>
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
    <q-card class="my-card q-ma-md">
      <q-card-section class="bg-accent">
        <div class="text-h6 text-white">SpringBoot信息</div>
      </q-card-section>
      <q-separator/>
      <q-card-actions class="q-pa-md " vertical>
        <div class="q-pa-md">
          <span class="float-left">后台端口</span>
          <span class="float-right text-accent">8000</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">JDK版本</span>
          <span class="float-right text-accent">1.8.0_342-b07</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">操作系统</span>
          <span class="float-right text-accent">Windows10</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">编码</span>
          <span class="float-right text-accent">UTF-8</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">日志等级</span>
          <span class="float-right text-accent">INFO</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">日志文件</span>
          <span class="float-right text-accent">正常</span>
        </div>
      </q-card-actions>
    </q-card>
    <q-card class="my-card q-ma-md">
      <q-card-section class="bg-positive">
        <div class="text-h6 text-white">软件信息</div>
      </q-card-section>
      <q-separator/>
      <q-card-actions class="q-pa-md " vertical>
        <div class="q-pa-md">
          <span class="float-left">Mysql主机</span>
          <span class="float-right text-positive">hasdsd.cn:3306</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">Mysql版本</span>
          <span class="float-right text-positive">8.0</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">Redis主机</span>
          <span class="float-right text-positive">192.168.31.99:6379</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">Redis版本</span>
          <span class="float-right text-positive">7.0.4</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">RabbitMQ主机</span>
          <span class="float-right text-positive">192.168.31.99:5672</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">RabbitMQ版本</span>
          <span class="float-right text-positive">3.10.7</span>
        </div>
      </q-card-actions>
    </q-card>
    <q-card class="my-card q-ma-md">
      <q-card-section class="bg-negative">
        <div class="text-h6 text-white">定时任务</div>
      </q-card-section>
      <q-separator/>
      <q-card-actions class="q-pa-md " vertical>
        <div class="q-pa-md">
          <span class="float-left">任务1</span>
          <span class="float-right text-negative">RedisSchedule.KeepItAlive</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">任务1</span>
          <span class="float-right text-negative">0 */2 * * * ?</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">任务2</span>
          <span class="float-right text-negative">RedisSchedule.AddRedisIntoMysql</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">任务2</span>
          <span class="float-right text-negative">0 */20 * * * ?</span>
        </div>
        <!--        <div class="q-pa-md">-->
        <!--          <span class="float-left">任务3</span>-->
        <!--          <span class="float-right text-negative">192.168.31.99:5672</span>-->
        <!--        </div>-->
        <!--        <div class="q-pa-md">-->
        <!--          <span class="float-left">任务3</span>-->
        <!--          <span class="float-right text-negative">3.10.7</span>-->
        <!--        </div>-->
      </q-card-actions>
    </q-card>
    <q-card class="my-card q-ma-md">
      <q-card-section class="bg-warning">
        <div class="text-h6 text-white">SpringBoot监测</div>
      </q-card-section>
      <q-separator/>
      <q-card-actions class="q-pa-md " vertical>
        <div class="q-pa-md">
          <span class="float-left">Http请求</span>
          <span class="float-right text-warning">500</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">后台线程</span>
          <span class="float-right text-warning">500</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">存活线程</span>
          <span class="float-right text-warning">50</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">排队线程</span>
          <span class="float-right text-warning">50</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">开启时间</span>
          <span class="float-right text-warning">2022-10-5 10:10:10</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">运行时长</span>
          <span class="float-right text-warning">20min</span>
        </div>
      </q-card-actions>
    </q-card>
    <q-card class="my-card q-ma-md">
      <q-card-section class="bg-primary">
        <div class="text-h6 text-white">进程监测</div>
      </q-card-section>
      <q-separator/>
      <q-card-actions class="q-pa-md " vertical>
        <div class="q-pa-md">
          <span class="float-left">CPU占用</span>
          <span class="float-right text-primary">6%</span>
          <q-linear-progress stripe size="10px" value="0.06"/>
        </div>
        <div class="q-pa-md">
          <span class="float-left">内存占用</span>
          <span class="float-right text-primary">6%</span>
          <q-linear-progress stripe size="10px" value="0.06"/>
        </div>
        <div class="q-pa-md">
          <span class="float-left">CPU核心</span>
          <span class="float-right text-primary">16</span>
        </div>
        <div class="q-pa-md">
          <span class="float-left">内存总量</span>
          <span class="float-right text-primary">16GB</span>
        </div>
      </q-card-actions>
    </q-card>
    <q-card class="my-card q-ma-md">
      <q-card-section class="bg-info">
        <div class="text-h6 text-white">系统监测</div>
      </q-card-section>
      <q-separator/>
      <q-card-actions class="q-pa-md " vertical>
        <div class="q-pa-md">
          <span class="float-left">CPU占用</span>
          <span class="float-right text-info">6%</span>
          <q-linear-progress stripe color="info" size="10px" value="0.06"/>
        </div>
        <div class="q-pa-md">
          <span class="float-left">内存占用</span>
          <span class="float-right text-info">6%</span>
          <q-linear-progress stripe color="info" size="10px" value="0.06"/>
        </div>
        <div class="q-pa-md">
          <span class="float-left">硬盘占用</span>
          <span class="float-right text-info">30%</span>
          <q-linear-progress stripe color="info" size="10px" value="0.3"/>
        </div>
        <div class="q-pa-md">
          <span class="float-left">硬盘总量</span>
          <span class="float-right text-info">500GB</span>
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
  </div>
</template>

<script lang="ts" setup>
import CommCard from '/src/components/CommCard.vue'
import {InfoKV} from "components/models";
import axios from "axios";

let info1 = new InfoKV()
info1.list.value.push({k: 'Key1', v: 'Value1'}, {k: 'Key2', v: 'Value2'}, {k: 'Key3', v: 'Value3'})
info1.title.value = '系统设置'
setTimeout(() => {
  info1.setList('k55', 'v55')
  info1.setTitle("Mysql设置")
}, 2000)
axios.get('http://192.168.31.99:8000/actuator/health').then(res => {
  console.log(res)
})

</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 350px;
  max-height: 450px;
}
</style>

