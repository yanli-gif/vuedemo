// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '@/permission';
import router from './router'
import { Button, Select } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Form,FormItem,Input} from 'element-ui';
import {Message} from 'element-ui'
import './css/iconfont.css'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.use(Button)
Vue.use(Select)
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// 把Message组件挂载到Vue原型上，通过this访问
Vue.prototype.$Message=Message
