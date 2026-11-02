<script setup>
import gsap from 'gsap';

const props = defineProps({
  items: {
    type: Object,
  },
  text: {
    type: String,
  },
  reversed: {
    type: Boolean,
  },
  variation: {
    type: String,
  },
  duration: {
    type: Number,
  },
  innerClass: {
    type: String,
  },
});

onMounted(() => {
  const marquee = document.querySelectorAll('.marquee');

  marquee.forEach(item => {
    const marqueeInner = item.querySelector('.marquee__inner');
    // Marquee animation
    const marqueeContentAll =
      marqueeInner.querySelectorAll('.marquee__content');

    marqueeContentAll.forEach(element => {
      gsap.to(element, {
        x: props.reversed ? '101%' : '-101%',
        repeat: -1,
        duration: props.duration,
        ease: 'linear',
      });
    });
  });
});
</script>

<template>
  <div class="marquee overflow-hidden" :data-marquee-duration="duration">
    <div class="marquee__inner flex">
      <div
        v-if="variation === 'logoMarquee'"
        class="marquee__content flex items-center"
        v-for="i in 3"
      >
        <c-picture
          v-for="(item, index) in items"
          :key="index"
          class="w-auto h-[12vw] lg:h-[6vw] object-contain mx-5 lg:mx-10"
          innerClass=""
          :useOriginalRatio="true"
          :image="item.image"
          sizes="sm:375px md:375px lg:480px xl:480px"
          :alt="item?.image?.alt || 'Skills'"
        />
      </div>

      <div
        v-if="variation === 'default'"
        :class="`marquee__content whitespace-nowrap ${innerClass}`"
        v-for="i in 3"
      >
        {{ text }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Styles remain unchanged
</style>
