import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ButtonCounter from '@/components/ButtonCounter.vue'
let app = createApp(App)

app.component('blogTitle', {
  data: () => ({
    blogTitle: '测试jenkins 2'
  }),
  render() {
    return h(
      'h1', // 标签名称
      {
        id: 'title',
        class: 'sm'
      },
      this.blogTitle // 标签内容
    )
  }
})
app.component('ButtonCounter', ButtonCounter)
app
  .use(store)
  .use(router)
  .mount('#app')
