<script setup>
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { appData } = storeToRefs(appStore);

onMounted(() => {
  //   console.log("appStoreeeeee", appData);
});
</script>

<template>
  <footer class="app-footer overflow-hidden uppercase border-t border-black">
    <div class="px-4 py-8 lg:p-16 flex items-center justify-between">
      <div class="flex items-center justify-between w-full">
        <c-animated-element :fromY="50" :toY="0">
          <p class="text-14 lg:text-base" v-html="appData?.data?.footer_text" />
        </c-animated-element>
        <c-animated-element :fromY="50" :toY="0" :delay="0.1">
          <a
            @mouseenter="setCursor('hovered')"
            @mouseleave="setCursor('default')"
            :href="appData?.data?.phone?.url"
            class="text-14 lg:text-base"
            >{{ appData?.data?.phone?.text }}</a
          >
        </c-animated-element>
        <c-animated-element :fromY="50" :toY="0" :delay="0.2">
          <a
            @mouseenter="setCursor('hovered')"
            @mouseleave="setCursor('default')"
            :href="appData?.data?.mail?.url"
            class="text-14 lg:text-base"
            >{{ appData?.data?.mail?.text }}</a
          >
        </c-animated-element>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.app-footer {
}
</style>
