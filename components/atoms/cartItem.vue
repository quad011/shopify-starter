<script setup>
const { cart, removeFromCart, addToCart } = useCart();

// Decrease item quantity
const decreaseQuantity = item => {
  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    removeFromCart(item.variantId);
  }
};

// Increase item quantity
const increaseQuantity = item => {
  addToCart({
    ...item,
    id: item.variantId,
    price: { amount: item.price, currencyCode: item.currency },
  });
};

onMounted(() => {});
</script>
<template>
  <ul class="cart-item space-y-4 max-h-60 overflow-y-auto">
    <li
      v-for="item in cart"
      :key="item.variantId"
      class="flex justify-between items-center border-t border-black-300 pt-3"
    >
      <div class="flex">
        <!-- IMAGE -->
        <div class="flex w-24">
          <img :src="item.image" :alt="item.title" />
        </div>
        <!-- END :: IMAGE -->

        <div class="ml-5">
          <p class="text-30" v-html="item.title" />

          <div class="flex flex-col">
            <div
              v-for="(option, index) in item.selectedOptions"
              :key="index"
              class="text-gray-500 flex items-center text-20 mt-2"
            >
              <p class="mr-2">{{ option.name }}:</p>

              <!-- If it's the color option, show a swatch -->
              <template v-if="option.name.toLowerCase() === 'color'">
                <span
                  class="w-5 h-5 rounded-full border border-gray-300"
                  :style="{ backgroundColor: option.value.toLowerCase() }"
                ></span>
                <span class="ml-2 capitalize">{{ option.value }}</span>
              </template>

              <!-- Otherwise, show text -->
              <template v-else>
                <p>{{ option.value }}</p>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Quantity Controls -->
      <div class="flex items-center gap-2">
        <button
          @click="decreaseQuantity(item)"
          class="w-6 h-6 border border-black rounded text-sm"
        >
          -
        </button>
        <span class="px-2">{{ item.quantity }}</span>
        <button
          @click="increaseQuantity(item)"
          class="w-6 h-6 border border-black rounded text-sm"
        >
          +
        </button>

        <!-- <p class="text-sm">Qty: {{ item.quantity }}</p> -->
        <!-- <p class="text-sm font-bold">
          Price: {{ item?.price }} {{ item?.currency }}
        </p> -->
      </div>

      <div class="flex">
        <button @click="removeFromCart(item.variantId)">
          <a-close class="w-3 h-3 fill-black" />
        </button>
      </div>
    </li>
  </ul>
</template>
