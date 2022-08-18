<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered class="rounded-borders">

      <q-expansion-item
        v-for="item in menus"
        v-model="item.isopen"
        expand-separator
        :icon="item.icon"
        :label="item.label"
        @click="handleOpen()"
      >
        <q-card v-for="child in item.children">
          <div class="q-pa-md" style="max-width: 500px">
            <q-list bordered padding class="rounded-borders text-primary">
              <q-item
                clickable
                v-ripple
                :to="child.link"

                :active="link === child.link"
                @click="handleLink(child.link,child,item)"
                active-class="my-menu-link"
              >
                <q-item-section avatar>
                  <q-icon :name="child.icon"/>
                </q-item-section>

                <q-item-section>{{ child.desc }}</q-item-section>
              </q-item>
              <!--              <q-separator spaced/>-->
            </q-list>
          </div>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useStore} from "src/store";

const $store = useStore()
//当前选中选项
let link = ref(localStorage.getItem("link"))
if (link == null) {
  link = 'Dashboard'
}
//菜单数据
let menus = ref([
  {
    icon: 'home', label: '主页', id: 1, isopen: true, children: [
      {link: 'Dashboard', icon: 'donut_large', desc: '仪表盘', id: 4,},
      {link: 'CheckInfo', icon: 'notifications_active', desc: '实时监控', id: 5},
    ]
  },
  {
    icon: 'perm_identity', label: '管理', isopen: false, id: 2, children: [
      {link: 'UserManager', icon: 'people_alt', desc: '用户管理', id: 6},
      {link: 'ItemManager', icon: 'shopping_bag', desc: '物品管理', id: 7},
    ]
  },
  {
    icon: 'settings', label: '设置', id: 3, isopen: false, children: [
      {link: 'UserSetting', icon: 'admin_panel_settings', desc: '用户设置', id: 8},
      {link: 'About', icon: 'info', desc: '关于', id: 9},
    ]
  }
])
//储存菜单展开或关闭数据
if (!localStorage.getItem('menus')) {
  localStorage.setItem('menus', JSON.stringify(menus))
} else {
  menus.value = JSON.parse(localStorage.getItem('menus'))._value
  // console.log(JSON.parse(localStorage.getItem('menus'))._value)
  // console.log(menus.value)
}

//点击时修改展开数据
function handleOpen() {
  localStorage.setItem('menus', JSON.stringify(menus))
}

//点击时修改选中数据
function handleLink(value, child, item) {
  this.link = value
  localStorage.setItem("link", value)
  $store.commit("menus/thismenu", child.desc)
  $store.commit("menus/uppermenu", item.label)
  localStorage.setItem("menus/thismenu", child.desc)
  localStorage.setItem("menus/uppermenu", item.label)
}


</script>

<style scoped>
.q-pa-md {
  padding: 0;

}

.q-list--bordered {
  border: 0px solid rgba(0, 0, 0, 0.12) !important;
}

.q-item__section {
  padding-left: 20px;
}

.my-menu-link {
  color: white;
  background: #F2C037;
}

</style>
