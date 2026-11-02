export default state => {
  const store = useCursorStore();
  const { cursorState } = storeToRefs(store);

  // window.cursorTimeout = clearTimeout(window.cursorTimeout)

  // window.cursorTimeout = setTimeout(() => {
  cursorState.value = state;
  // }, 50)
};
