<script setup>
import { ref } from 'vue';
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
    type: Object,
  },
  techStack: {
    type: String,
  },
  videoPoster: {
    type: Object,
  },
});
const openPopup = ref(false);

const playing = ref(false);
</script>

<template>
  <div
    class="m-work-box cursor-pointer"
    @click.native="openPopup = true"
    @mouseenter="((playing = true), setCursor('hovered'))"
    @mouseleave="((playing = false), setCursor('default'))"
  >
    <c-html-video
      v-if="videoUrl"
      :src="videoUrl"
      :autoplay="playing"
      :playing="playing"
      preload="metadata"
      :controls="false"
      :muted="true"
      :loop="true"
      class="aspect-[1.85]"
      :forcePoster="true"
      :posterUrl="videoPoster?.url"
    />
    <h3 v-if="title" v-html="title" class="text-18 lg:text-24 mt-2 lg:mt-3" />
  </div>

  <teleport to="body">
    <t-gsap
      :leave_to="{ scale: 0.9, opacity: 0, duration: 0.4 }"
      :from="{ opacity: 0 }"
      :to="{
        opacity: 1,
        duration: 0.4,
        ease: 'Power1.easeOut',
      }"
      class="overflow-auto"
    >
      <c-lightbox v-if="openPopup" @close="openPopup = false">
        <m-popup
          :title="title"
          :videoUrl="videoUrl"
          :projectUrl="projectUrl.url"
          :techStack="techStack"
        />
      </c-lightbox>
    </t-gsap>
  </teleport>
</template>

<style lang="scss" scoped>
.work-box {
}
</style>
