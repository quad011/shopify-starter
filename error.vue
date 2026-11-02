<script setup>
import { useHead } from '#imports';
const error = useError();
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: '/' });

useHead({
  title: 'Test Shopify - 404 Not Found',
});
</script>

<template>
  <div
    class="error bg-white fixed left-0 top-0 w-full h-full flex flex-col flex-center"
  >
    <h1 class="flex flex-col items-center md:mb-5 lg:mb-0 whitespace-nowrap">
      <c-animated-element :fromX="50" :toY="0">
        <c-marquee
          :duration="50"
          :variation="'default'"
          :text="'404 Page not found &nbsp;'"
          class="text-[90vh] font-medium"
        />
      </c-animated-element>
    </h1>

    <div class="fixed center mix-blend-difference">
      <a-button
        title="Go Back"
        @click="handleError"
        @mouseenter="setCursor('hovered')"
        @mouseleave="setCursor('default')"
      />
    </div>
  </div>
</template>
