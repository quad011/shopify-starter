<script setup>
import { useAsyncData, useRoute, createError } from '#imports';
import { usePrismic } from '@prismicio/vue';
import { components } from '~/slices';

const { client } = usePrismic();
const route = useRoute();

// Fetch Prismic page
const { data: page } = await useAsyncData('article_product', async () => {
  const uid = route.params.uid;
  const doc = await client.getByUID('article_product', uid);
  if (!doc) throw createError({ statusCode: 404, message: 'Not found' });
  return doc;
});

onMounted(() => {});
</script>

<template>
  <div class="article-product">
    <o-article-header :page="page" />

    <SliceZone v-once :components="components" :slices="page.data.slices" />

    <AppFooter />
  </div>
</template>
