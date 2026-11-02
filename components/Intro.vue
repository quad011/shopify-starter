<script setup>
import { gsap } from 'gsap';
import { useScrollLock } from '@vueuse/core';

const progress = ref({ value: 0 });
const emit = defineEmits(['update:introVisible']);

const computedProgress = computed(() => {
  if (progress.value.value === 0) return [0];
  return `${Math.round(progress.value.value)}`.split('');
});

const isLocked = useScrollLock(document.body);

// Use GSAP animation
onMounted(() => {
  isLocked.value = true;

  gsap.to(progress.value, {
    value: 100,
    ease: 'power2.inOut',
    duration: 2,
    onComplete: () => {
      // console.log('animation ended');

      setTimeout(() => {
        emit('update:introVisible', false);
      }, 600);
    },
  });

  setTimeout(() => {
    // console.log('progress:', computedProgress.value);
  }, 1000);
});
</script>

<template>
  <div
    class="intro h-screen w-screen bg-white fixed top-0 left-0 p-5 lg:p-12 overflow-hidden z-[101]"
  >
    <div class="flex justify-center items-center h-full relative">
      <div
        :style="{
          transform: `translateX(-${100 - progress.value}%) `,
          opacity: `${progress.value}`,
        }"
      >
        <h1 class="text-24 sm:text-40 lg:text-92 text-black text-bold">
          Welcome
        </h1>
      </div>

      <div
        :style="{
          transform: `translateX(${100 - progress.value}%) `,
          opacity: `${progress.value}`,
        }"
      >
        <h1 class="text-24 sm:text-40 lg:text-92 text-black text-bold">
          &nbsp;to my resume
        </h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.intro {
  z-index: 100;
  // opacity: 0.9;

  .loader-font {
    font-size: 1.35vw;
  }
}
</style>
