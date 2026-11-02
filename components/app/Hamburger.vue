<script setup>
const props = defineProps({
  isMenuOpen: {
    type: Boolean,
  },
});
</script>

<template>
  <button
    role="button"
    aria-label="button"
    class="hamburger pr-0 min-w-0 inline-block border-0 m-0 focus:outline-none overflow-visible"
    type="button"
    :class="[
      {
        'hamburger--is-active': isMenuOpen,
      },
    ]"
  >
    <span
      class="hamburger-box w-[1.5rem] h-[1rem] relative block focus:outline-none"
    >
      <span class="line line--1"></span>

      <span class="line line--2"></span>

      <span class="line line--3"></span>
    </span>
  </button>
</template>

<style lang="postcss" scoped="">
.hamburger {
  .hamburger-box {
    .line {
      @apply absolute top-0 block w-full h-[.1rem] origin-center transition-all duration-500 bg-black;
      &--1 {
        @apply top-0;
      }

      &--2 {
        @apply top-2/4;
        /* transform: translate3d(0, -50%, 0); */
      }

      &--3 {
        @apply top-full;
      }
    }
  }

  &--light {
    .line {
      @apply bg-white;
    }
  }

  &--dark {
    .line {
      /* @apply bg-black; */
    }
  }

  &--is-active {
    .hamburger-box {
      .line {
        @apply bg-black;
      }
      .line--1 {
        @apply w-full top-2/4;
        transform: translate3d(0, -50%, 0) rotate(45deg) translateZ(0);
      }

      .line--2 {
        @apply opacity-0;
      }

      .line--3 {
        @apply w-full top-[40%];
        transform: translate3d(0, 50%, 0) rotate(-45deg) translateZ(0);
      }
    }
  }
}
</style>
