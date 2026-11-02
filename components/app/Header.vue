<script setup>
const appStore = useAppStore();
const { appData, fontsLoaded, isMenuOpen, isCartOpen } = storeToRefs(appStore);

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const scrollingStore = useScrollingStore();
const { navigationVisible, scrollingStarted } = storeToRefs(scrollingStore);
const { cart, distinctProductCount } = useCart();

function scrollToTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });

  // Remove the hash from the URL after scrolling to the top
  setTimeout(() => {
    history.pushState(null, null, window.location.pathname);
  }, 500); // Delay to allow smooth scrolling
}

const scrollToSection = hash => {
  const element = document.querySelector(hash);
  if (element) {
    const offset = 100;
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    });

    history.pushState(null, null, hash);
  }
};

const totalQuantity = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0),
);

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
      history.pushState(null, null, window.location.pathname);
    }
  });
});
</script>

<template>
  <div
    :class="[
      !navigationVisible ? '-translate-y-full' : 'translate-y-0',
      'transition-all duration-500 fixed w-full left-0 top-0 z-50',
    ]"
  >
    <header
      :class="{
        'app-header--shrink': scrollingStarted,
      }"
      class="app-header bg-white lg:bg-transparent px-4 lg:px-16 py-4 lg:py-10 fixed top-0 left-0 w-full flex items-start justify-between z-[100] pointer-events-none transition-all duration-500"
    >
      <!-- LOGO -->
      <nuxt-link
        to="/"
        @click.native="scrollToTop"
        class="cursor-pointer pointer-events-auto"
        @mouseenter="setCursor('hovered')"
        @mouseleave="setCursor('default')"
      >
        <a-logo
          class="logo w-[12vw] sm:w-[10vw] lg:w-[5vw] object-contain transition-all duration-500"
        />
      </nuxt-link>
      <!-- END :: LOGO -->

      <div class="flex items-center">
        <div class="hidden lg:flex pointer-events-auto">
          <nuxt-link
            to="/"
            @click.native="scrollToTop"
            class="mr-5 text-14 lg:text-base"
            @mouseenter="setCursor('hovered')"
            @mouseleave="setCursor('default')"
          >
            <span v-html="'Home'" class="link" />
          </nuxt-link>

          <nuxt-link
            v-for="item in appData?.data?.main_navigation"
            :to="item.link.url"
            @click.prevent="scrollToSection(item.link.url)"
            @mouseenter="setCursor('hovered')"
            @mouseleave="setCursor('default')"
            class="mr-5 last:mr-0 text-14 lg:text-base hover-target"
          >
            <span v-html="item.link.text" class="link" />
          </nuxt-link>
        </div>

        <!-- CART NAV -->
        <div class="relative pointer-events-auto">
          <button @click="toggleCart">
            <!-- Cart icon -->
            <svg
              class="w-8 h-8 text-gray-800"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
              />
            </svg>

            <!-- Badge -->
            <span
              class="absolute left-[.9vw] top-[.39vw] inline-flex items-center justify-center text-xs font-bold text-black"
            >
              {{ distinctProductCount }}
            </span>
          </button>
        </div>
        <!-- END :: CART NAV -->

        <div class="flex justify-end lg:hidden ml-5">
          <app-hamburger
            class="flex justify-end mr-2 pointer-events-auto"
            :isMenuOpen="isMenuOpen"
            @click="isMenuOpen = !isMenuOpen"
            @keydown.esc="isMenuOpen = false"
          />
        </div>
      </div>
    </header>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  &--shrinked {
    @screen lg {
      @apply px-5 py-5;
      .logo {
        @apply lg:w-[3vw];
      }
    }
  }
}
</style>
