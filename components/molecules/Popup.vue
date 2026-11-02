<script setup>
import { useScrollLock } from '@vueuse/core';
import { onMounted } from 'vue';
const props = defineProps({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  projectUrl: {
    type: String,
  },
  techStack: {
    type: String,
  },
});

const isLocked = useScrollLock(document.body);

onMounted(() => {
  isLocked.value = true;
});
</script>

<template>
  <div
    class="popup fixed left-0 top-0 w-full h-full flex flex-wrap px-4 sm:px-16 py-20 text-white"
  >
    <h3
      v-if="title"
      v-html="title"
      class="text-40 md:text-80 font-bold block lg:hidden"
    />

    <div class="flex lg:w-2/3 lg:pr-20 my-3">
      <c-html-video
        v-if="videoUrl"
        :src="videoUrl"
        :autoplay="true"
        preload="metadata"
        :controls="false"
        :muted="true"
        :loop="true"
        class="aspect-video"
      />
    </div>

    <div class="lg:w-1/3 flex flex-col justify-between relative z-50">
      <h3
        v-if="title"
        v-html="title"
        class="text-80 !font-bold hidden lg:block"
      />
      <h4 v-html="`Tech Stach: ${techStack}`" class="text-18 lg:text-24"></h4>
      <div class="mt-3">
        <a
          target="_blank"
          :href="projectUrl"
          class="text-18 lg:text-24 link reversed"
          >Website</a
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popup {
}
</style>
