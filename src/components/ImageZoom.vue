<template>
  <!-- 图片缩放容器 -->
  <div
      class="image-zoom-container"
      :class="{ 'image-zoom--hidden-overflow': hideOverflow }"
      :style="containerStyle"
  >
    <!-- 核心图片元素 -->
    <img
        class="image-zoom__img"
        :src="src"
        :alt="alt || '图片缩放展示'"
        :style="imageStyle"
        loading="lazy"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

// 定义组件Props，配置灵活可扩展
const props = defineProps({
  /** 图片地址（必填） */
  src: {
    type: String,
    required: true,
    validator: (val: string) => val.trim() !== ''
  },
  /** 图片替代文本 */
  alt: {
    type: String,
    default: '图片缩放展示'
  },
  /** 悬浮缩放比例（默认1.2倍，即放大20%） */
  zoomRatio: {
    type: Number,
    default: 1.2,
    validator: (val: number) => val >= 1 && val <= 3 // 限制1-3倍，避免过度缩放
  },
  /** 过渡动画时长（单位：秒） */
  duration: {
    type: Number,
    default: 0.3,
    validator: (val: number) => val > 0
  },
  /** 是否隐藏图片放大后的溢出部分（默认true，防止超出容器） */
  hideOverflow: {
    type: Boolean,
    default: true
  },
  /** 容器宽度（支持px/rem/em，默认自适应图片） */
  containerWidth: {
    type: String,
    default: 'fit-content'
  },
  /** 容器高度（支持px/rem/em，默认自适应图片） */
  containerHeight: {
    type: String,
    default: 'fit-content'
  },
  /** 图片是否自适应容器宽度（默认true） */
  imgFluid: {
    type: Boolean,
    default: true
  }
});

// 计算样式：转化为CSS变量和内联样式，实现灵活配置
const containerStyle = computed(() => ({
  '--image-zoom-duration': `${props.duration}s`,
  '--image-zoom-ratio': props.zoomRatio,
  width: props.containerWidth,
  height: props.containerHeight
}));

// 图片样式配置
const imageStyle = computed(() => ({
  width: props.imgFluid ? '100%' : 'auto',
  height: 'auto',
  objectFit: 'cover'
}));
</script>

<style scoped>
/* 容器基础样式 */
.image-zoom-container {
  position: relative;
  margin: 0 auto;
  cursor: zoom-in; /* 提示用户可缩放交互 */
  /* 继承CSS变量 */
  --image-zoom-duration: 0.3s;
  --image-zoom-ratio: 1.2;
}

/* 隐藏溢出配置（默认开启） */
.image-zoom--hidden-overflow {
  overflow: hidden;
}

/* 核心图片样式：实现平滑缩放 */
.image-zoom__img {
  display: block;
  transition: transform var(--image-zoom-duration) ease-in-out; /* 平滑过渡缩放 */
  transform: scale(1); /* 初始状态：1倍大小 */
  border-radius: 4px; /* 轻微圆角，提升视觉优雅度 */
}

/* 悬浮触发：图片放大到指定比例 */
.image-zoom-container:hover .image-zoom__img {
  transform: scale(var(--image-zoom-ratio));
}
</style>