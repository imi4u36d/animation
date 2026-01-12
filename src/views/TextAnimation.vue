<script setup>
import TextReveal from '@/components/TextReveal.vue'
</script>

<template>
  <div>
    <div style="padding: 100px; background: #ffffff;">
      <!-- 示例1：关闭打字机（默认），仅逐行显现 -->
      <TextReveal
          text="Hi, I'm Rico\nI'm a web/UI designer with 8+ years of experience."
          :duration="1.5"
          :delayStep="0.4"
          fontSize="28px"
          textColor="#1a1a1a"
          style="margin-bottom: 80px;"
      />

      <!-- 示例2：开启打字机效果，逐行+逐字打字 -->
      <TextReveal
          text="Hi, I'm Rico\nI'm a web/UI designer with 8+ years of experience."
          :duration="1.5"
          :delayStep="0.6"
          :charStep="0.04"
          :enableTypewriter="true"
          fontSize="28px"
          textColor="#1a1a1a"
      />
    </div>
  </div>
</template>

<style scoped>

</style>