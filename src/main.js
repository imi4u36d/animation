// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
// 导入单独编写的滚动指令对象
import { scrollRevealDirective } from '@/scripts/scrollReveal'

// 创建 Vue 应用
const app = createApp(App)

// 注册全局指令：app.directive(指令名称, 指令对象)
app.directive('scroll-reveal', scrollRevealDirective)

// 挂载应用
app.mount('#app')