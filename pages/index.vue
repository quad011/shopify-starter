<script setup>
import { components } from '~/slices';
import { usePrismic } from '@prismicio/vue';
import { useAsyncData, createError } from '#imports';
import fetchLinks from '@/config/pageFetchLinks';

const { client } = usePrismic();

const { data: page, error } = await useAsyncData('page_home', async () => {
  const document = await client.getByUID('page_home', 'home', {
    cache: 'no-store',
    fetchLinks,
  });

  return document || null; // Ensure null is returned if not found
});

// ✅ Correctly throw 404 if `page.value` is null after data is loaded
if (!page.value) {
  throw createError({ statusCode: 404, message: 'Page not found' });
}

usePageMeta(page);
</script>

<template>
  <div v-if="page" class="page-home bg-white">
    <h1>{{ page.data.title }}</h1>
    <SliceZone
      v-once
      :components="components"
      :slices="page?.data?.slices || []"
    />
    <AppFooter />
  </div>
</template>
