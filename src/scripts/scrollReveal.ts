// src/directives/scrollReveal.ts（单独的指令文件）
// 节流函数：优化滚动事件性能
function throttle(fn: Function, delay: number = 100) {
    let timer: NodeJS.Timeout | null = null
    return function (...args: any[]) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null
            }, delay)
        }
    }
}

// 定义并导出滚动触达动画指令（核心：导出指令对象）
export const scrollRevealDirective = {
    mounted(el: HTMLElement, binding: any) {
        // 配置项
        const options = {
            duration: binding.value?.duration || 1.2,
            delay: binding.value?.delay || 0,
            offset: binding.value?.offset || 100,
            once: binding.value?.once !== false,
        }

        // 元素初始样式
        el.style.opacity = '0'
        el.style.transform = 'translateY(30px)'
        el.style.transition = 'all 0s linear'
        el.style.willChange = 'opacity, transform'
        el.dataset.scrollReveal = JSON.stringify({
            options,
            triggered: false,
        })

        // 视口判断函数
        const checkInView = throttle(() => {
            const data = JSON.parse(el.dataset.scrollReveal || '{}')
            if (data.triggered && data.options.once) return

            const rect = el.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const isInView = rect.top < windowHeight - data.options.offset && rect.bottom > 0

            if (isInView) {
                el.style.transition = `opacity ${data.options.duration}s ease, transform ${data.options.duration}s ease`
                el.style.transitionDelay = `${data.options.delay}s`
                el.style.opacity = '1'
                el.style.transform = 'translateY(0)'

                data.triggered = true
                el.dataset.scrollReveal = JSON.stringify(data)
            }
        })

        // 初始检查
        checkInView()

        // 绑定事件
        window.addEventListener('scroll', checkInView)
        window.addEventListener('resize', checkInView)

        // 销毁函数
        el.dataset.scrollRevealDestroy = JSON.stringify(() => {
            window.removeEventListener('scroll', checkInView)
            window.removeEventListener('resize', checkInView)
        })
    },

    unmounted(el: HTMLElement) {
        const destroyFn = JSON.parse(el.dataset.scrollRevealDestroy || 'null')
        if (typeof destroyFn === 'function') {
            destroyFn()
        }
    },
}

// 可选：导出指令注册辅助函数（简化批量注册）
export function registerScrollReveal(app: any) {
    app.directive('scroll-reveal', scrollRevealDirective)
}