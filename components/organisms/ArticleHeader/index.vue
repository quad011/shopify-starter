<script setup>
import { useShopifyProduct } from '@/composables/useShopifyProduct';
import { useCart } from '@/composables/useCart';
const props = defineProps({
  title: {
    type: String,
  },
  image: {
    type: Object,
  },
  page: {
    type: Object,
  },
});

const { handleAddToCart } = useCart();

// Visible message
const message = ref('');
const visible = ref(false);

// Selected options
const selectedSize = ref('');
const selectedColor = ref('');

// Reactive handle from Prismic
const shopifyHandle = computed(() => props.page?.data?.shopify_handle);

// Reactive product storage
const shopifyProducts = ref([]);

// Fetch Shopify product when handle is ready
watch(
  shopifyHandle,
  async newHandle => {
    if (newHandle) {
      const { data } = await useShopifyProduct(newHandle);
      shopifyProducts.value = data.value;
    }
  },
  { immediate: true },
);

const defaultVariant = computed(() => {
  return shopifyProducts.value?.[0]?.variants?.edges?.[0]?.node;
});

// Computed product and variants
const product = computed(() => shopifyProducts.value?.[0]);
const variants = computed(
  () => product.value?.variants?.edges?.map(edge => edge.node) || [],
);

const productImageUrl = computed(
  () => product.value?.images?.edges[0]?.node?.url || '',
);

// allSizes computed AFTER variants
const allSizes = computed(() => [
  ...new Set(
    variants.value
      .map(v => v.selectedOptions?.find(o => o.name === 'Size')?.value)
      .filter(Boolean),
  ),
]);

// allColors computed similarly
const allColors = computed(() => [
  ...new Set(
    variants.value
      .map(v => v.selectedOptions?.find(o => o.name === 'Color')?.value)
      .filter(Boolean),
  ),
]);

// Selected variant based on size & color
const selectedVariant = computed(() =>
  variants.value.find(
    v =>
      v.selectedOptions?.find(o => o.name === 'Size')?.value ===
        selectedSize.value &&
      v.selectedOptions?.find(o => o.name === 'Color')?.value ===
        selectedColor.value,
  ),
);

// Message added item
const showMessage = msg => {
  message.value = msg;
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, 3000);
};

watch(
  () => message,
  () => {
    if (message) {
      visible.value = true;
      setTimeout(() => {
        visible.value = false;
      }, props.duration);
    }
  },
);

const onAddToCartClick = () => {
  if (selectedVariant.value && product.value) {
    handleAddToCart(
      selectedVariant.value,
      product.value.title,
      productImageUrl.value,
    );
    showMessage(`${product.value.title} added to cart!`);
  }
};

onMounted(() => {});
</script>

<template>
  <div class="article-header flex flex-wrap">
    <!-- Added item message -->
    <t-fade>
      <div
        v-if="visible"
        class="fixed top-0 left-0 w-full z-50 bg-white text-vlack px-6 py-5 text-center shadow-lg transition-opacity duration-300"
      >
        {{ message }}
      </div>
    </t-fade>

    <div class="w-1/2">
      <c-picture
        class="w-full h-full"
        innerClass=""
        :image="product?.images?.edges[0]?.node"
        sizes="sm:375px md:375px lg:480px xl:480px"
      />
    </div>
    <div class="w-1/2 p-20">
      <!-- TITLE -->
      <h2 v-html="title" class="text-32 lg:text-40 mb-4 lg:mb-10" />
      <!-- END :: TITLE -->

      <!-- Size Selection -->
      <div class="mb-6">
        <p class="font-bold mb-2">Select Size</p>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="size in allSizes"
            :key="size"
            @click="selectedSize = size"
            :class="[
              'px-4 py-2 border rounded transition-color hover:bg-black hover:text-white duration-300',
              selectedSize === size
                ? 'bg-black text-white'
                : 'bg-white text-black',
            ]"
            v-html="size"
          />
        </div>
      </div>

      <!-- Color Selection -->
      <div class="mb-6">
        <p class="font-bold mb-2">Select Color</p>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="color in allColors"
            :key="color"
            @click="selectedColor = color"
            :class="[
              'w-10 h-10 border rounded-full p-1 transition-colors hover:border-black duration-300',
              selectedColor === color ? 'border-black' : 'border-gray-300',
            ]"
          >
            <span
              class="block w-full h-full rounded-full"
              :style="{ backgroundColor: color.toLowerCase() }"
            />
          </button>
        </div>
      </div>

      <div class="flex items-center">
        <strong>Price:</strong>
        <p
          class="mx-2"
          v-if="defaultVariant"
          v-html="defaultVariant.price.amount"
        />
        <p v-if="defaultVariant" v-html="defaultVariant.price.currencyCode" />
      </div>

      <!-- Variant Info -->
      <div class="mt-4 flex">
        <strong class="mr-1">Status: </strong>
        <p v-if="selectedVariant">
          <span v-if="selectedVariant.availableForSale">In stock</span>
          <span v-else>Out of stock</span>
        </p>
      </div>

      <button
        class="mt-4 px-6 py-3 bg-black text-white rounded disabled:opacity-50"
        :disabled="!selectedVariant?.availableForSale"
        @click="onAddToCartClick"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
