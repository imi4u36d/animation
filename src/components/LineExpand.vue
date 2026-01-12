<template>
  <!-- 横线展开组件容器 -->
  <div
      class="line-expand-container"
      :class="{
      'line-expand--manual': !autoPlay,
      'line-expand--center': expandDirection === 'center',
      'line-expand--left': expandDirection === 'left'
    }"
      ref="lineRef"
      @mouseenter="handleHoverTrigger"
      :style="containerStyle"
  >
    <!-- 核心横线元素 -->
    <div class="line-expand__core"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineExpose } from 'vue';

// 定义组件Props，配置灵活可扩展
const props = defineProps({
  /** 动画持续时长（单位：秒） */
  duration: {
    type: Number,
    default: 1,
    validator: (val: number) => val > 0
  },
  /** 动画延迟时长（单位：秒） */
  delay: {
    type: Number,
    default: 0,
    validator: (val: number) => val >= 0
  },
  /** 是否自动播放动画（页面加载后自动展开） */
  autoPlay: {
    type: Boolean,
    default: true
  },
  /** 横线目标宽度（支持px/rem/em，默认300px） */
  targetWidth: {
    type: String,
    default: '300px'
  },
  /** 横线厚度（支持px/rem/em，默认3px） */
  lineHeight: {
    type: String,
    default: '3px'
  },
  /** 横线颜色 */
  lineColor: {
    type: String,
    default: '#2c3e50'
  },
  /** 展开方向：left（从左到右，默认）、center（从中间向两侧） */
  expandDirection: {
    type: String as () => 'left' | 'center',
    default: 'left', // 明确默认从左到右
    validator: (val: string) => ['left', 'center'].includes(val)
  },
  /** 是否无限循环（仅自动播放模式生效） */
  loop: {
    type: Boolean,
    default: false
  },
  /** 循环播放是否交替方向（仅loop为true时生效） */
  alternate: {
    type: Boolean,
    default: false
  }
});

// 定义组件Emits，对外暴露动画生命周期事件
const emit = defineEmits(['animationStart', 'animationEnd']);

// 组件DOM引用
const lineRef = ref<HTMLElement | null>(null);

// 计算样式：将Props转化为CSS变量和内联样式，实现灵活配置
const containerStyle = computed(() => ({
  // 核心CSS变量，传递给Scoped样式
  '--line-expand-duration': `${props.duration}s`,
  '--line-expand-delay': `${props.delay}s`,
  '--line-expand-target-width': props.targetWidth,
  '--line-expand-height': props.lineHeight,
  '--line-expand-color': props.lineColor,
  // 循环和交替配置
  '--line-expand-iteration': props.loop ? 'infinite' : '1',
  '--line-expand-direction': props.alternate ? 'alternate' : 'normal'
}));

// 手动触发动画方法（对外暴露，支持父组件调用）
const triggerAnimation = () => {
  if (!lineRef.value) return;

  // 移除并重新添加激活类，实现重复触发动画
  lineRef.value.classList.remove('line-expand--active');
  // 强制重排，确保动画重新执行（解决CSS动画无法重复触发的问题）
  void lineRef.value.offsetWidth;
  lineRef.value.classList.add('line-expand--active');

  // 触发动画开始事件
  emit('animationStart');
};

// 鼠标悬浮触发（手动模式下的默认交互）
const handleHoverTrigger = () => {
  if (props.autoPlay || props.loop) return;
  triggerAnimation();
};

// 监听动画结束事件
const handleAnimationEnd = (e: AnimationEvent) => {
  if (e.animationName === 'lineExpandLeftKeyframes' || e.animationName === 'lineExpandCenterKeyframes') {
    emit('animationEnd');
    // 手动模式下，动画结束后移除激活类（方便再次hover触发）
    if (!props.autoPlay && !props.loop) {
      lineRef.value?.classList.remove('line-expand--active');
    }
  }
};

// 自动播放逻辑
onMounted(() => {
  if (!lineRef.value) return;

  // 绑定动画结束事件，监听动画状态
  lineRef.value.addEventListener('animationend', handleAnimationEnd);

  // 自动播放模式下，添加激活类触发动画
  if (props.autoPlay) {
    lineRef.value.classList.add('line-expand--active');
    emit('animationStart');
  }
});

// 组件卸载时移除事件监听，防止内存泄漏
onUnmounted(() => {
  if (!lineRef.value) return;
  lineRef.value.removeEventListener('animationend', handleAnimationEnd);
});

// 对外暴露组件方法，支持父组件通过ref主动控制
defineExpose({
  triggerAnimation
});
</script>

<style scoped>
/* 容器样式：控制横线的布局和基础配置 */
.line-expand-container {
  position: relative;
  width: fit-content;
  margin: 0 auto;
  cursor: pointer; /* 手动模式提示可交互 */
  /* 继承CSS变量，确保样式灵活性 */
  --line-expand-duration: 1s;
  --line-expand-delay: 0s;
  --line-expand-target-width: 300px;
  --line-expand-height: 3px;
  --line-expand-color: #2c3e50;
  --line-expand-iteration: 1;
  --line-expand-direction: normal;
}

/* 核心横线样式：基础外观配置（统一使用transform，性能最优） */
.line-expand__core {
  width: var(--line-expand-target-width);
  height: var(--line-expand-height);
  background-color: var(--line-expand-color);
  transform-origin: left center; /* 默认左对齐原点，对应从左到右 */
  transition: transform var(--line-expand-duration) ease; /* 统一过渡属性 */
}

/* ------------- 展开方向：从左到右（默认，视觉明确，性能最优） ------------- */
/* 初始状态：缩放为0，仅显示左侧起点 */
.line-expand--left .line-expand__core {
  transform: scaleX(0);
  animation: none;
}

/* 自动模式：关键帧动画触发 */
.line-expand--left.line-expand--active .line-expand__core {
  animation: lineExpandLeftKeyframes var(--line-expand-duration) ease var(--line-expand-delay) var(--line-expand-iteration) var(--line-expand-direction) forwards;
  transition: none; /* 自动模式下禁用过渡，使用关键帧 */
}

/* ------------- 展开方向：从中间向两侧 ------------- */
/* 初始状态：缩放为0，缩放原点居中 */
.line-expand--center .line-expand__core {
  transform: scaleX(0);
  transform-origin: center center;
  animation: none;
}

/* 自动模式：关键帧动画触发 */
.line-expand--center.line-expand--active .line-expand__core {
  animation: lineExpandCenterKeyframes var(--line-expand-duration) ease var(--line-expand-delay) var(--line-expand-iteration) var(--line-expand-direction) forwards;
  transition: none; /* 自动模式下禁用过渡，使用关键帧 */
}

/* ------------- 手动触发模式：统一使用transition过渡 ------------- */
.line-expand--manual.line-expand--active .line-expand__core,
.line-expand--manual:hover .line-expand__core {
  transform: scaleX(1); /* 手动模式下直接缩放为1，触发过渡 */
  animation: none !important;
}

/* ------------- 关键帧定义（仅自动模式使用） ------------- */
/* 从左到右展开关键帧（transform实现，无重排，视觉明确） */
@keyframes lineExpandLeftKeyframes {
  0% {
    transform: scaleX(0); /* 左侧起点，无宽度 */
  }
  100% {
    transform: scaleX(1); /* 向右展开至完整宽度 */
  }
}

/* 从中间向两侧展开关键帧 */
@keyframes lineExpandCenterKeyframes {
  0% {
    transform: scaleX(0); /* 中间起点，无宽度 */
  }
  100% {
    transform: scaleX(1); /* 向两侧展开至完整宽度 */
  }
}
</style>