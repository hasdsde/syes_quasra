<!-- Aside -->
<template>


  <q-layout view="lHh Lpr lFf">

    <!-- 顶栏 -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <!--    中间标题    -->
        <q-toolbar-title style="font-size: 14px">
          <q-breadcrumbs>
            <q-breadcrumbs-el :label="handleMenu()" icon="home" style="color: white"/>
            <q-breadcrumbs-el :label="handleMenuinfo()" icon="widgets" style="color: white"/>
            <q-breadcrumbs-el label="详情" style="color: white"/>
          </q-breadcrumbs>
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!--  侧栏  -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          后台管理系统
        </q-item-label>
        <!--    真正的侧栏    -->
        <Aside/>
      </q-list>
    </q-drawer>


    <!--  中间内容 routerView  -->
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue';

const $store = useStore()
import Aside from '../components/Aside.vue';
import {useStore} from "src/store";


function handleMenu() {
  if ($store.state.menus.uppermenu === 'undefined') {
    if (localStorage.getItem("menus/uppermenu")) {
      return localStorage.getItem("menus/uppermenu")
    } else {
      return '主页'
    }
  } else {
    return $store.state.menus.uppermenu
  }
}

function handleMenuinfo() {
  if ($store.state.menus.thismenu === 'undefined') {
    if (localStorage.getItem("menus/thismenu")) {
      return localStorage.getItem("menus/thismenu")
    } else {
      return '仪表盘'
    }
  } else {
    return $store.state.menus.thismenu
  }
}


const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
