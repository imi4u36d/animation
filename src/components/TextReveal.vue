<template>
  <!-- 文字展示容器：居中布局，支持打字机效果开关 -->
  <div class="rico-text-container" :style="containerStyle">
    <div
        class="rico-text-line"
        v-for="(line, lineIndex) in textLines"
        :key="lineIndex"
        :style="{ '--line-delay': `${lineIndex * delayStep}s` }"
    >
      <!-- 条件渲染：根据开关选择逐字（打字机）或整行展示 -->
      <template v-if="enableTypewriter">
        <span
            class="rico-text-char"
            v-for="(char, charIndex) in line"
            :key="charIndex"
            :style="{ '--char-delay': `${charIndex * charStep}s` }"
        >
          {{ char }}
        </span>
      </template>
      <template v-else>
        <span class="rico-text-content">{{ line }}</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';

// 组件Props配置，新增enableTypewriter开关
const props = defineProps({
  /** 完整文本（换行用\n分隔） */
  text: {
    type: String,
    required: true
  },
  /** 单行动画时长（单位：秒） */
  duration: {
    type: Number,
    default: 1.2
  },
  /** 行与行之间的延迟间隔（单位：秒） */
  delayStep: {
    type: Number,
    default: 0.3
  },
  /** 【打字机专用】字与字之间的打字间隔（单位：秒，控制打字速度） */
  charStep: {
    type: Number,
    default: 0.05,
    validator: (val: number) => val > 0 && val <= 0.2
  },
  /** 初始模糊半径（单位：px） */
  blurRadius: {
    type: Number,
    default: 4
  },
  /** 文字颜色 */
  textColor: {
    type: String,
    default: '#2c3e50'
  },
  /** 文字大小（支持px/rem/em） */
  fontSize: {
    type: String,
    default: '24px'
  },
  /** 行高 */
  lineHeight: {
    type: Number,
    default: 1.8
  },
  /** 【核心开关】是否启用打字机效果（默认关闭，仅逐行显现） */
  enableTypewriter: {
    type: Boolean,
    default: false
  }
});

// 分割文本为多行
const textLines = ref(props.text.split('\n').filter(line => line.trim() !== ''));

// 计算容器样式
const containerStyle = computed(() => ({
  color: props.textColor,
  fontSize: props.fontSize,
  lineHeight: props.lineHeight,
  '--duration': `${props.duration}s`,
  '--blur-radius': `${props.blurRadius}px`
}));
</script>

<style scoped>
/* 容器基础样式：居中布局，模拟网站简洁风格 */
.rico-text-container {
  position: relative;
  width: fit-content;
  margin: 0 auto;
  padding: 40px 20px;
  font-weight: 300; /* 轻量级字体，贴近网站风格 */
}

/* 单行文字容器：控制整行延迟入场 */
.rico-text-line {
  opacity: 0;
  animation: lineReveal var(--duration) ease var(--line-delay) forwards;
  margin-bottom: 8px;
  white-space: pre-line; /* 关闭打字机时支持正常换行 */
}

/* 【关闭打字机】整行文字样式：模糊渐变+透明度过渡 */
.rico-text-content {
  display: inline-block;
  filter: blur(var(--blur-radius)px);
  animation: blurFade var(--duration) ease var(--line-delay) forwards;
}

/* 【启用打字机】单个文字样式：逐字打字+模糊渐变 */
.rico-text-char {
  display: inline-block;
  opacity: 0;
  filter: blur(var(--blur-radius)px);
  /* 组合动画：逐字显现+模糊消失+轻微位移缓冲 */
  animation:
      charReveal calc(var(--duration) / 2) ease calc(var(--line-delay) + var(--char-delay)) forwards,
      charBlurFade calc(var(--duration) / 2) ease calc(var(--line-delay) + var(--char-delay)) forwards;
  transform: translateY(5px);
}

/* 关键帧1：整行透明度过渡（铺垫入场） */
@keyframes lineReveal {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 关键帧2：关闭打字机时，整行文字模糊渐变消失 */
@keyframes blurFade {
  0% {
    filter: blur(var(--blur-radius)px);
  }
  100% {
    filter: blur(0px);
  }
}

/* 关键帧3：启用打字机时，单个文字打字机显现（透明度+位移复位） */
@keyframes charReveal {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 关键帧4：启用打字机时，单个文字模糊渐变消失 */
@keyframes charBlurFade {
  0% {
    filter: blur(var(--blur-radius)px);
  }
  100% {
    filter: blur(0px);
  }
}

/* 打字机模式下，单行禁止换行，保证横向连贯 */
.rico-text-line:has(.rico-text-char) {
  white-space: nowrap;
}
</style>