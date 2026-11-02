<script setup>
const appStore = useAppStore();
const { isMenuOpen, isCartOpen } = storeToRefs(appStore);
// const introVisible = ref(true);

onMounted(() => {});
</script>

<template>
  <div class="layout base">
    <!-- PROGRESS BAR -->
    <progress-bar />
    <!-- END :: PROGRESS BAR -->

    <!-- APP HEADER -->
    <app-header />
    <!-- END :: APP HEADER -->

    <!-- PAGE CONTENT -->
    <t-fade>
      <slot />
    </t-fade>
    <!-- END :: PAGE CONTENT -->

    <!-- CART -->
    <t-fade>
      <m-cart v-if="isCartOpen" />
    </t-fade>
    <!-- END :: CART -->

    <!-- <t-gsap
      :notAbsolute="true"
      :leave_to="{ scale: 0.9, opacity: 0, duration: 0.4 }"
      :from="{ opacity: 0 }"
      :to="{
        opacity: 1,
        duration: 0.4,
        ease: 'Power1.easeOut',
      }"
    >
      <app-menu
        class="overflow-auto w-screen h-screen z-40 fixed top-0 left-0"
        :key="isMenuOpen"
        v-if="isMenuOpen"
        :menuOpen="isMenuOpen"
      />
    </t-gsap> -->

    <!-- INTRO -->
    <!-- <t-gsap
      :notAbsolute="true"
      :from="{}"
      :leave_to="{
        // clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        opacity: 0,
        duration: 1.2,
        ease: 'Power2.easeOut',
      }"
    >
      <intro v-model:introVisible="introVisible" v-if="introVisible" />
    </t-gsap> -->
    <!-- END :: INTRO -->
  </div>
</template>
