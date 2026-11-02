<script setup>
const props = defineProps({
  slice: Object,
});
const { getPrimary } = useSlice(props.slice);
</script>

<template>
  <o-products-wrapper
    :title="getPrimary('title')"
    :items="getPrimary('items')"
  />
</template>
