<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  items: {
    type: Object,
  },
});

onMounted(() => {
  console.log('items:', props.items);
});
</script>

<template>
  <div
    class="products-wrapper relative overflow-hidden mb-5 lg:mb-10 px-4 lg:px-16 h-screen mt-[15vw]"
  >
    <div class="">
      <!-- TITLE -->
      <h2 v-html="title" class="text-32 lg:text-40 mb-4 lg:mb-10" />
      <!-- END :: TITLE -->
    </div>

    <div class="flex flex-wrap grid grid-cols-4 gap-4">
      <PrismicLink
        :field="item.product"
        v-for="(item, index) in items"
        :key="index"
      >
        <m-product-box
          :title="item.product.data.title"
          :image="item.product.data.featured_image"
        />
      </PrismicLink>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
