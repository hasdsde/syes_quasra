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
            <q-breadcrumbs-el :label="$store.state.menus.uppermenu " icon="home" style="color: white"/>
            <q-breadcrumbs-el :label="$store.state.menus.thismenu" icon="widgets" style="color: white"/>
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

const thismenu = $store.state.menus.thismenu
const uppermenu = $store.state.menus.uppermenu


console.log($store.state.menus.thismenu)
console.log($store.state.menus.uppermenu)

// const essentialLinks: EssentialLinkProps[] = [
//   {
//     title: 'Docs',
//     caption: 'quasar.dev',
//     icon: 'school',
//     link: 'https://quasar.dev'
//   },
//   {
//     title: 'Github',
//     caption: 'github.com/quasarframework',
//     icon: 'code',
//     link: 'https://github.com/quasarframework'
//   },
//   {
//     title: 'Discord Chat Channel',
//     caption: 'chat.quasar.dev',
//     icon: 'chat',
//     link: 'https://chat.quasar.dev'
//   },
//   {
//     title: 'Forum',
//     caption: 'forum.quasar.dev',
//     icon: 'record_voice_over',
//     link: 'https://forum.quasar.dev'
//   },
//   {
//     title: 'Twitter',
//     caption: '@quasarframework',
//     icon: 'rss_feed',
//     link: 'https://twitter.quasar.dev'
//   },
//   {
//     title: 'Facebook',
//     caption: '@QuasarFramework',
//     icon: 'public',
//     link: 'https://facebook.quasar.dev'
//   },
//   {
//     title: 'Quasar Awesome',
//     caption: 'Community Quasar projects',
//     icon: 'favorite',
//     link: 'https://awesome.quasar.dev'
//   }
// ];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
