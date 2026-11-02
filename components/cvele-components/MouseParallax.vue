<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
import gsap from 'gsap';

const props = defineProps({
  tag: { type: String, default: 'div' },
  factor: { type: Number, default: 0.1 },
  duration: { type: Number, default: 0.1 },
});

const target = ref(null);
const { width, height } = useWindowSize();
const mouseX = ref(0);
const mouseY = ref(0);

const handleMouseMove = event => {
  if (!target.value) return;

  const rect = target.value.getBoundingClientRect();

  mouseX.value = event.clientX - rect.left;
  mouseY.value = event.clientY - rect.top;
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});

// Clamp function
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const xPercentage = computed(() => clamp(mouseX.value / width.value, 0, 1));
const yPercentage = computed(() => clamp(mouseY.value / height.value, 0, 1));

const moveX = computed(() => width.value * props.factor);
const moveY = computed(() => height.value * props.factor);

const to = computed(() => ({
  x: xPercentage.value * moveX.value - moveX.value / 2,
  y: yPercentage.value * moveY.value - moveY.value / 2,
  duration: props.duration,
  ease: 'power4.out',
}));

watchEffect(() => {
  if (target.value) {
    gsap.to(target.value, to.value);
  }
});
</script>

<template>
  <component :is="tag" ref="target" class="mouse-parallax pointer-events-none">
    <slot />
  </component>
</template>
