<script setup>
import gsap from 'gsap';
import { useCursorStore } from '@/stores/cursorStore';
const { isDesktop } = useDevice();

const store = useCursorStore();
const { cursorState } = storeToRefs(store);

const xChild = ref(0);
const yChild = ref(0);
const xParent = ref(0);
const yParent = ref(0);

const cursorSize = computed(() => (cursorState.value === 'hovered' ? 50 : 30)); // Cursor size changes

const cursorCircle = computed(() => ({
  transform: `translateX(${xParent.value - cursorSize.value / 2}px) translateY(${yParent.value - cursorSize.value / 2}px) translateZ(0)`,
  width: `${cursorSize.value}px`,
  height: `${cursorSize.value}px`,
  borderRadius: '50%',
  transition: 'all 0.2s ease-out',
}));

const cursorPoint = computed(() => ({
  transform: `translateX(${xChild.value - 3}px) translateY(${yChild.value - 3}px) translateZ(0)`,
}));

const moveCursor = e => {
  xChild.value = e.clientX;
  yChild.value = e.clientY;

  gsap.to(xParent, {
    value: e.clientX,
    duration: 0.2,
    ease: 'power2.out',
  });
  gsap.to(yParent, {
    value: e.clientY,
    duration: 0.2,
    ease: 'power2.out',
  });
};

onMounted(() => {
  document.addEventListener('mousemove', moveCursor);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', moveCursor);
});
</script>

<template>
  <div v-if="isDesktop" class="cursor">
    <div class="cursor-circle" :style="cursorCircle"></div>
    <div class="cursor-point" :style="cursorPoint"></div>
  </div>
</template>

<style>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  mix-blend-mode: difference;
  z-index: 9999;
}

.cursor-circle {
  position: absolute;
  border: 2px solid white;
}

.cursor-point {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
  position: absolute;
}
</style>
