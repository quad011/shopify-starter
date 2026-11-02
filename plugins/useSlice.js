// plugins/useSlice.js
import { useSlice } from '../composables/useSlice'; // Make sure the path matches where you defined useSlice

export default defineNuxtPlugin(nuxtApp => {
  // Provide `useSlice` globally
  nuxtApp.provide('useSlice', useSlice);
});