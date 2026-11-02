<script setup>
import { ref } from 'vue';

const props = defineProps({
  image: {
    type: Object,
  },
  src: {
    type: String,
  },
  alt: {
    type: String,
  },
  imgAttrs: {
    type: Object,
    default: () => ({}),
  },
  quality: {
    type: [Number, String],
    default: 80,
  },
  densities: {
    type: String,
    default: '1x',
  },
  sizes: {
    type: String,
    default: 'sm:768px md:600px lg:600px xl:800px',
  },
  useOriginalRatio: {
    type: Boolean,
    default: false,
  },
  multiplier: {
    type: Number,
    default: 1.25,
  },
  loading: {
    type: String,
    default: 'lazy',
  },
  innerClass: {
    type: String,
  },
});

const el = ref(null);

const _loading = ref(props.loading);
const toggleVisible = opts => {
  // if (opts.visible && !isMobileOrTablet) {
  _loading.value = 'eager';
  // }
};

const elStyle = computed(() => {
  // Only apply aspectRatio if explicitly requested
  if (!props.useOriginalRatio) {
    return {};
  }

  const width = props.image?.dimensions?.width;
  const height = props.image?.dimensions?.height;

  if (width && height) {
    return {
      aspectRatio: `${width} / ${height}`,
    };
  } else {
    console.warn('Missing image dimensions:', props.image);
    return {};
  }
});

const imageAttributes = computed(() => {
  let classes = props.imgAttrs?.class;

  classes += props.useOriginalRatio
    ? ' absolute w-full h-full top-0 left-0'
    : ' w-full';

  return {
    ...props.imgAttrs,
    class: classes,
  };
});

const isLoaded = ref(false);
const handleLoad = () => {
  isLoaded.value = true;
};

onMounted(() => {
  setTimeout(() => {
    _loading.value = 'eager';
  }, 5000);
});
</script>

<template>
  <div ref="el" :style="elStyle" class="c-picture">
    <nuxt-picture
      v-if="src || image?.url"
      :key="_loading"
      :loading="_loading"
      :densities="densities"
      :class="(innerClass, { 'image-loaded': isLoaded })"
      @load="handleLoad"
      class="c-picture block relative h-full w-full"
      :imgAttrs="imageAttributes"
      :sizes="sizes"
      :quality="quality"
      :src="src || image?.url"
      :alt="alt || image?.alt"
    />
    <div
      v-if="!isLoaded"
      class="placeholder absolute w-full h-full flex items-center justify-center bg-red"
    >
      <c-spinner />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.picture {
  img {
    transition: opacity 0.3s ease;
    opacity: 0;
  }
  .image-loaded {
    opacity: 1;
  }
}
</style>
