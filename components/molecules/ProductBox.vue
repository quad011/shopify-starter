<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  image: {
    type: Object,
  },
});
</script>

<template>
  <div class="m-product-box">
    <c-picture
      class="w-full h-full"
      innerClass=""
      :useOriginalRatio="true"
      :image="image"
      sizes="sm:375px md:375px lg:480px xl:480px"
      :alt="image?.alt || 'DC Resume'"
    />
    <div class="text-18 lg:text-24">
      <h3 v-if="title" v-html="title" class="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.m-product-box {
}
</style>
