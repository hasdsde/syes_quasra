import {boot} from 'quasar/wrappers';
import axios, {AxiosInstance} from 'axios';
import {useRouter} from "vue-router/dist/vue-router";

const $router = useRouter()
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({baseURL: 'http://localhost:8000'});

export default boot(({app}) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  //请求拦截器
  api.interceptors.request.use(
    config => {
      if (localStorage.getItem("token") == null) {
        $router.push('/login')
      } else {
        config.headers.token = localStorage.getItem('token');
      }
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )
  //相应拦截器
  api.interceptors.response.use(
    res => {
      return res.data
    }
  )

});

export {api};
