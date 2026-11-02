<script setup>
import { ref, watch } from 'vue';
import _props from './props';
const props = defineProps(_props);

const video = ref(null);
let videoPoster = ref('');

if (props.forcePoster) {
  videoPoster.value = props.posterUrl;
}

const onClick = e => {};
const onCanPlay = e => {};
const onSeeking = e => {};

const emit = defineEmits(['update:playing', 'update:time']);

// HANDLE TIME UPDATES
const onTimeupdate = e => {
  if (!video.value) {
    return;
  }

  // emit("update:time", video.value.currentTime)
};

const seekTo = time => {
  video.value.currentTime = time;
};

defineExpose({
  seekTo,
});

// HANDLE PLAYING
if (props.autoplay) {
  emit('update:playing', true);
}

const onPause = e => {
  // console.log("onPause", e)
  emit('update:playing', false);
};

const onPlay = e => {
  emit('update:playing', true);
};

const onCantplay = e => {
  emit('update:playing', false);
  videoPoster.value = props.posterUrl;
  // console.warn(`can't autoplay`, props.src)
};

const playVideo = () => {
  if (!video.value) {
    return;
  }

  let promise = video.value.play();
  if (promise !== undefined) {
    promise.then(() => {}).catch(onCantplay);
  }
};

const pauseVideo = () => {
  video.value.pause();
};

// toggle playing when playing prop changes
watch(
  () => props.playing,
  val => {
    // playing.value = val

    if (val) {
      playVideo();
    } else {
      pauseVideo();
    }
  },
);
</script>

<template>
  <video
    class="html-video"
    ref="video"
    @click="onClick"
    @canplaythrough="onCanPlay"
    @pause="onPause"
    @seeking="onSeeking"
    @timeupdate="onTimeupdate"
    @play="onPlay"
    :preload="preload || 'auto'"
    :playsinline="playsinline"
    :autoplay="autoplay"
    :poster="videoPoster"
    :muted="muted"
    :loop="loop"
    :controls="controls"
  >
    <source :src="src" type="video/mp4" />
  </video>
</template>

<style lang="scss" scoped="">
.html-video {
  width: 100%;
  height: 100%;
  // object-fit: cover;
  &[poster] {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
