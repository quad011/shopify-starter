<script setup>
import { useCart } from '@/composables/useCart';

const { cart, checkoutUrl } = useCart();

const appStore = useAppStore();
const { isCartOpen } = storeToRefs(appStore);

const totalPrice = computed(() =>
  cart.value
    .reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0)
    .toFixed(2),
);
</script>

<template>
  <div class="cart absolute right-0 top-0 overflow-hidden h-full w-full z-50">
    <div
      class="w-1/3 bg-white border border-gray-200 rounded-lg ml-auto h-full"
    >
      <div class="p-4 flex flex-col justify-between h-full">
        <div class="">
          <div class="flex justify-between mb-5">
            <h2 class="text-40 font-bold">Cart</h2>
            <div class="cursor-pointer" @click.native="isCartOpen = false">
              <a-close class="w-5 h-5 fill-black" />
            </div>
          </div>

          <div v-if="cart.length > 0">
            <a-cartItem :cart="cart" />
          </div>
          <div v-else class="text-gray-500 text-sm">Your cart is empty.</div>
        </div>

        <div
          v-if="cart.length > 0"
          class="text-30 mt-4 border-t pt-2 font-semibold flex flex-col"
        >
          Total: {{ totalPrice }} {{ cart[0].currency }}
          <a
            :href="checkoutUrl"
            target="_blank"
            class="inline-block px-6 py-3 bg-black text-white rounded hover:bg-gray-700 transition-color text-center mt-5"
            :class="{
              'opacity-50 pointer-events-none': !cart.length,
            }"
          >
            Proceed to Checkout
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
