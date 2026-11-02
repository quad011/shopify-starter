<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const scrollProgress = ref(0);
const transitionEnabled = ref(true);

const updateScroll = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  const progress = (scrollTop / (docHeight - winHeight)) * 100;

  if (scrollTop === 0) {
    // Disable transition before resetting to 0%
    transitionEnabled.value = false;
    scrollProgress.value = 0;

    // Re-enable transition after DOM updates
    nextTick(() => {
      transitionEnabled.value = true;
    });
  } else {
    scrollProgress.value = progress;
  }
};

onMounted(() => {
  window.addEventListener('scroll', updateScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll);
});
</script>

<template>
  <div
    class="progress-bar fixed top-0 left-0 w-full h-[.4em] z-[101] mix-blend-difference"
  >
    <div
      class="progress-bar-line h-full max-w-full z-50 bg-white"
      :style="{
        width: scrollProgress + '%',
        transition: transitionEnabled ? 'width 0.2s ease-out' : 'none',
      }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.progress-bar {
  .progress-bar-line {
    will-change: width;
  }
}
</style>
