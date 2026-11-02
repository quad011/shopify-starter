<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const props = defineProps({
  fromX: {
    type: [String, Number],
    default: 0,
  },
  toX: {
    type: [String, Number],
    default: 0,
  },
  fromY: {
    type: [String, Number],
    default: 0,
  },
  toY: {
    type: [String, Number],
    default: 0,
  },
  startPosition: {
    type: String,
  },
  endPosition: {
    type: String,
  },
  speed: {
    type: Number,
    default: 0.1,
  },
  transformOrigin: {
    type: String,
  },
  fromScale: {
    type: Number,
    default: 1,
  },
  toScale: {
    type: Number,
    default: 1,
  },
  pin: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: Number,
    default: 0,
  },
});

gsap.registerPlugin(ScrollTrigger);

const main = ref(null);
let ctx = null;

onMounted(async () => {
  await nextTick();
  ctx = gsap.context(self => {
    const items = self.selector('.item');

    items.forEach(item => {
      item.style.transform = 'none';
      gsap.set(item, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        clearProps: 'transform', // Clears inline styles if needed
        force3D: true, // Forces GPU acceleration to avoid flickering
      });

      gsap.fromTo(
        item,
        {
          x: props.fromX,
          y: props.fromY,
          scale: props.fromScale,
          immediateRender: false,
        },
        {
          x: props.toX,
          y: props.toY,
          ease: 'none',
          scale: props.toScale,
          immediateRender: true,
          delay: props.delay,
          duration: 10,
          scrollTrigger: {
            trigger: item,
            start: props.startPosition,
            end: props.endPosition,
            scrub: props.speed,
            transformOrigin: props.transformOrigin,
            // markers: true,
            pin: props.pin,
          },
        },
      );
    });
  }, main.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <div class="scrolling-element" ref="main">
    <div class="item">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.scrolling-element {
  position: relative;
  .item {
    will-change: transform;
  }
}
</style>
