<template>
  <div class="portfolio-container">
    <!-- 区域1：文字展示（滚动触达后显现） -->
    <div
        class="section"
        v-scroll-reveal="{ duration: 1.5, delay: 0.2, offset: 80 }"
    >
      <RicoStyleTextReveal
          text="Hi, I'm Rico\nI'm a web/UI designer with 8+ years of experience.\nI love blending design and code to create captivating visuals and interactive experiences."
          :duration="1.2"
          :delayStep="0.4"
          :enableTypewriter="true"
          :charStep="0.04"
          fontSize="28px"
          textColor="#1a1a1a"
      />
      <RicoStyleTextReveal
          text="Hi, I'm Rico\nI'm a web/UI designer with 8+ years of experience.\nI love blending design and code to create captivating visuals and interactive experiences."
          :duration="1.2"
          :delayStep="0.4"
          :enableTypewriter="true"
          :charStep="0.04"
          fontSize="28px"
          textColor="#1a1a1a"
      />
      <RicoStyleTextReveal
          text="Hi, I'm Rico\nI'm a web/UI designer with 8+ years of experience.\nI love blending design and code to create captivating visuals and interactive experiences."
          :duration="1.2"
          :delayStep="0.4"
          :enableTypewriter="true"
          :charStep="0.04"
          fontSize="28px"
          textColor="#1a1a1a"
      />
      <RicoStyleTextReveal
          text="Hi, I'm Rico\nI'm a web/UI designer with 8+ years of experience.\nI love blending design and code to create captivating visuals and interactive experiences."
          :duration="1.2"
          :delayStep="0.4"
          :enableTypewriter="true"
          :charStep="0.04"
          fontSize="28px"
          textColor="#1a1a1a"
      />
    </div>

    <!-- 区域2：卡片内容（滚动触达后显现，多元素可设置不同延迟） -->
    <div class="section card-section">
      <div
          class="card"
          v-scroll-reveal="{ duration: 1.2, delay: 0.1, offset: 80 }"
      >
        <h3>Gradient Backgrounds</h3>
        <p>Free, high-quality gradient backgrounds for commercial use.</p>
      </div>
      <div
          class="card"
          v-scroll-reveal="{ duration: 1.2, delay: 0.3, offset: 80 }"
      >
        <h3>AI Textures</h3>
        <p>AI-generated textures to elevate your design projects.</p>
      </div>
      <div
          class="card"
          v-scroll-reveal="{ duration: 1.2, delay: 0.5, offset: 80 }"
      >
        <h3>Mesh Patterns</h3>
        <p>Modern mesh patterns for websites, apps and print materials.</p>
      </div>

      <div
          class="card"
          v-scroll-reveal="{ duration: 1.2, delay: 0.1, offset: 80 }"
      >
        <h3>Gradient Backgrounds</h3>
        <p>Free, high-quality gradient backgrounds for commercial use.</p>
      </div>
      <div
          class="card"
          v-scroll-reveal="{ duration: 1.2, delay: 0.3, offset: 80 }"
      >
        <h3>AI Textures</h3>
        <p>AI-generated textures to elevate your design projects.</p>
      </div>
      <div
          class="card"
          v-scroll-reveal="{ duration: 1.2, delay: 0.5, offset: 80 }"
      >
        <h3>Mesh Patterns</h3>
        <p>Modern mesh patterns for websites, apps and print materials.</p>
      </div>

      <div
          class="card"
          v-scroll-reveal="{ duration: 1.2, delay: 0.1, offset: 80 }"
      >
        <h3>Gradient Backgrounds</h3>
        <p>Free, high-quality gradient backgrounds for commercial use.</p>
      </div>
      <div
          class="card"
          v-scroll-reveal="{ duration: 1.2, delay: 0.3, offset: 80 }"
      >
        <h3>AI Textures</h3>
        <p>AI-generated textures to elevate your design projects.</p>
      </div>
      <div
          class="card"
          v-scroll-reveal="{ duration: 1.2, delay: 0.5, offset: 80 }"
      >
        <h3>Mesh Patterns</h3>
        <p>Modern mesh patterns for websites, apps and print materials.</p>
      </div>
    </div>

    <!-- 区域3：底部文字（滚动触达后显现） -->
    <div
        class="section"
        v-scroll-reveal="{ duration: 1.5, delay: 0.2, offset: 80 }"
    >
      <RicoStyleTextReveal
          text="More generator tools are coming soon!\nStay tuned for updates."
          :duration="1.2"
          fontSize="22px"
          textColor="#333333"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import RicoStyleTextReveal from '@/components/TextReveal.vue';
</script>

<style scoped>
/* 页面布局：模拟目标网站的长页面，方便滚动测试 */
.portfolio-container {
  min-height: 2000px;
  padding: 50px 20px;
  background-color: #ffffff;
}

.section {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 150px auto;
}

/* 卡片样式 */
.card-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.card {
  padding: 40px 30px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.card h3 {
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 400;
  color: #1a1a1a;
}

.card p {
  margin: 0;
  font-size: 16px;
  color: #333333;
  line-height: 1.6;
}
</style>