export const useCursorStore = defineStore('cursor', () => {
  const cursorState = ref('default');

  return {
    cursorState,
  };
});
