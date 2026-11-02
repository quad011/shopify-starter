<script setup>
import gsap from 'gsap';
const props = defineProps({
  title: {
    type: String,
  },
  btnBg: {
    type: String,
    default: 'white',
  },
  linkUrl: {
    type: String,
  },
});
onMounted(() => {
  const buttons = gsap.utils.toArray('.a-button');
  buttons.forEach(item => {
    let span = item.querySelector('p');
    let tl = gsap.timeline({ paused: true });

    tl.to(span, { duration: 0.2, yPercent: -150, ease: 'power2.in' });
    tl.set(span, { yPercent: 150 });
    tl.to(span, { duration: 0.2, yPercent: 0 });

    item.addEventListener('mouseenter', () => tl.play(0));
    item.addEventListener('mouseleave', () => tl.reverse());
  });
});
</script>

<template>
  <a
    :href="linkUrl"
    target="_blank"
    :class="`a-button cursor-pointer mix-blend-difference bg-${btnBg} px-5 lg:px-8 py-3 lg:py-5 flex items-center justify-center pointer-events-auto overflow-hidden`"
  >
    <p
      v-html="title"
      :class="`text-14 lg:text-base ${btnBg === 'white' ? 'text-black' : 'text-white'}`"
    />
  </a>
</template>

<style lang="scss" scoped>
.a-button {
  //   @apply relative;
  //   &::after {
  //     content: "";
  //     @apply absolute left-0 top-0 w-full h-full bg-black -translate-x-full z-10 transition-transform;
  //   }
  //   &:hover {
  //     &::after {
  //       @apply translate-x-0;
  //     }
  //   }
}
</style>
