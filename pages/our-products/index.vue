<script setup>
import { components } from '~/slices';
import { usePrismic } from '@prismicio/vue';
import { useAsyncData, createError } from '#imports';
import fetchLinks from '@/config/pageFetchLinks';

const { client } = usePrismic();

const { data: page } = await useAsyncData('our_products', async () => {
  try {
    const document = await client.getSingle('our_products', {
      cache: 'no-store',
      fetchLinks,
    });

    if (!document) {
      throw createError({ statusCode: 404, message: 'Page not found' });
    }

    return document;
  } catch (err) {
    throw createError({
      statusCode: 404,
      message: err.message || 'Page not found',
    });
  }
});

onMounted(() => {});

usePageMeta(page);

// console.log("page.value:", page.value);
// console.log("error:", error);
</script>

<template>
  <div class="page-our-products bg-white">
    <h1>page: {{ page.data.title }}</h1>

    <SliceZone v-once :components="components" :slices="page.data.slices" />

    <AppFooter />
  </div>
</template>
