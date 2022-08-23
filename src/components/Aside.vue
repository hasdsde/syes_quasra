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
            <q-list bordered padding class="rounded-borders text-primary ">
              <q-item
                clickable
                v-ripple
                :to="child.link"
                :active="link === child.link"
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
import {useRouter} from "vue-router/dist/vue-router";
import {watch} from "vue";
import {menu} from "src/components/models";

let menus = ref(menu)
//监视路由变化，将变化应用到左侧栏
let link = ref()
const $store = useStore()
let $router = useRouter()
watch(() => $router.currentRoute.value.path, (newValue, oldValue) => {
  link.value = $router.currentRoute.value.path.replace("/", '')
}, {immediate: true})


//储存菜单展开或关闭数据
if (!localStorage.getItem('menus')) {
  localStorage.setItem('menus', JSON.stringify(menus))
} else {
  menus.value = JSON.parse(localStorage.getItem('menus'))._value
}


//点击时修改展开数据
function handleOpen() {
  localStorage.setItem('menus', JSON.stringify(menus))
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
