<script setup>
import LineExpand from "@/components/LineExpand.vue"
import ImageZoom from "@/components/ImageZoom.vue";
</script>

<template>
  <div>
    <div style="padding: 80px; background: #ffffff;">
      <!-- 基础使用：默认配置（从左到右自动展开） -->
      <LineExpand/>

      <!-- 自定义配置：修改时长、颜色、宽度、延迟 -->
      <LineExpand
          :duration="1.5"
          :delay="0.5"
          lineColor="#e74c3c"
          targetWidth="400px"
          lineHeight="4px"
          style="margin-top: 30px;"
      />

      <!-- 从中间向两侧展开 + 无限循环交替 -->
      <LineExpand
          expandDirection="center"
          :loop="true"
          :alternate="true"
          lineColor="#3498db"
          targetWidth="350px"
          style="margin-top: 30px;"
      />
    </div>



    <div style="padding: 80px; background: #ffffff;">
      <!-- 自定义div容器，嵌套图片缩放组件 -->
      <div style="width: 500px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
        <h3 style="text-align: center; margin-bottom: 20px;">鼠标悬浮图片放大</h3>
        <ImageZoom
            src="https://picsum.photos/600/400"
            alt="花卉图片"
            :zoomRatio="1.1"
            :duration="0.4"
            containerWidth="100%"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>