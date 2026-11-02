<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  linkUrl: {
    type: Object,
  },
});
onMounted(() => {});
</script>

<template>
  <div class="a-arrow-link mix-blend-difference relative">
    <div class="flex">
      <PrismicLink :field="linkUrl" class="link-wrapper relative">
        <div class="flex items-center overflow-hidden">
          <a-arrow
            class="arrow-left w-3 lg:w-6 h-3 lg:h-6 stroke-white -rotate-[90deg] relative left-0"
          />
          <p
            v-html="title"
            class="title text-base lg:text-30 relative left-0"
          />
          <a-arrow
            class="arrow-right w-3 lg:w-6 h-3 lg:h-6 ml-5 stroke-white -rotate-[90deg] relative left-0"
          />
        </div>

        <slot />
      </PrismicLink>
    </div>
  </div>
</template>

<style lang="scss">
.a-arrow-link {
  &:hover {
    @apply relative z-50;
  }
  .link-wrapper {
    .arrow-left,
    .arrow-right,
    .title {
      transition: 0.4s;
    }
    .image {
      @apply opacity-0 transition-opacity duration-500;
    }
    .arrow-left {
      @apply -left-[2rem];
    }
    &:hover {
      .arrow-left {
        @apply left-[1rem];
      }
      .arrow-right {
        @apply left-[2rem];
      }
      .title {
        @apply left-[2rem];
      }
      .image {
        @apply opacity-100;
      }
    }
  }
}
</style>
