import { ref, computed, watch } from 'vue';

const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'));

export function useCart() {
  watch(
    cart,
    newCart => {
      localStorage.setItem('cart', JSON.stringify(newCart));
    },
    { deep: true },
  );

  const addToCart = (
    variant,
    quantity = 1,
    productTitle = '',
    productImage = '',
  ) => {
    const existing = cart.value.find(item => item.variantId === variant.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.value.push({
        title: productTitle,
        variantId: variant.id,
        price: Number(variant.price.amount),
        currency: variant.price.currencyCode,
        quantity,
        available: variant.availableForSale,
        selectedOptions: variant.selectedOptions,
        image: productImage,
      });
    }
  };

  const removeFromCart = variantId => {
    cart.value = cart.value.filter(item => item.variantId !== variantId);
  };

  const clearCart = () => {
    cart.value = [];
  };

  const updateQuantity = (variantId, quantity) => {
    const item = cart.value.find(i => i.variantId === variantId);
    if (item && quantity > 0) {
      item.quantity = quantity;
    }
  };

  const handleAddToCart = (variant, productTitle, productImageUrl) => {
    addToCart(variant, 1, productTitle, productImageUrl);
  };

  const totalQuantity = computed(() =>
    cart.value.reduce((acc, item) => acc + item.quantity, 0),
  );

  const totalPrice = computed(() =>
    cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

  const distinctProductCount = computed(() => cart.value.length);

  const checkoutUrl = computed(() => {
    if (!cart.value.length) return '#';
    const base = 'https://shop-test-starter.myshopify.com/cart'; // replace with your store domain
    const items = cart.value
      .map(item => {
        const rawId = item.variantId.split('/').pop();
        return `${rawId}:${item.quantity}`;
      })
      .join(',');
    return `${base}/${items}`;
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    handleAddToCart,
    totalQuantity,
    distinctProductCount,
    totalPrice,
    checkoutUrl,
  };
}
