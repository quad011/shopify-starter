<template>
  <span
    class="spinner border-4 border-purple rounded-[50%] border-b-transparent inline-block box-border w-[48px] h-[48px]"
  ></span>
</template>

<style lang="scss" scoped>
.spinner {
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
