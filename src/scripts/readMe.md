[scrollReveal.ts](scrollReveal.ts)的使用方法
```javascript
// 导入单独编写的滚动指令对象
import { scrollRevealDirective } from '@/scripts/scrollReveal'

// 注册全局指令：app.directive(指令名称, 指令对象)
app.directive('scroll-reveal', scrollRevealDirective)
```
