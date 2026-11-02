<script setup>
import { components } from '~/slices';
import { usePrismic } from '@prismicio/vue';
import { useRoute, useAsyncData, createError } from '#imports';

const route = useRoute();
const { client } = usePrismic();

const { data: page, error } = await useAsyncData(
  `page-${route.params.uid}`,
  async () => {
    try {
      const document = await client.getByUID('page_default', route.params.uid, {
        cache: 'no-store',
      });

      console.log('Fetched Document:', document);
      return document;
    } catch (err) {
      console.error('Error fetching Prismic data:', err);
      throw createError({ statusCode: 404, message: 'Page not found' });
    }
  },
);

usePageMeta(page);

// console.log("Current route:", route.params.uid);
// console.log("page.value:", page);
</script>

<template>
  <div :class="`page--${page.uid} bg-white`">
    <h1>{{ page.data.title }}</h1>
    <SliceZone v-once :components="components" :slices="page.data.slices" />
    <AppFooter />
  </div>
</template>
