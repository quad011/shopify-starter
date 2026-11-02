export const useScrollingStore = defineStore("scrolling", () => {
	const scrollTop = ref(0);
	const scrollingDown = ref(true);
	const scrollingLeft = ref(true);
	const scrollingStarted = computed(() => scrollTop.value > 50);
	const navigationVisible = ref(true);
	const totalScroll = ref(0);
	const scrollingDisabled = ref(false);

	let prevScrollUp = 0;

	// show menu after 100px of scrolling up
	const show_distance = 100;

	// Track scroll event
	onMounted(() => {
		window.addEventListener("scroll", handleScroll);
	});

	onUnmounted(() => {
		window.removeEventListener("scroll", handleScroll);
	});

	const handleScroll = () => {
		const currentScroll = window.scrollY || document.documentElement.scrollTop;
		scrollingDown.value = currentScroll > scrollTop.value;
		scrollTop.value = currentScroll;

		// Show navigation when scrolling up
		if (!scrollingDown.value) {
			prevScrollUp = scrollTop.value;
		}

		navigationVisible.value = scrollingDown.value
			? !scrollingStarted.value
			: scrollTop.value < prevScrollUp - show_distance || !scrollingStarted.value;
	};

	return {
		scrollTop,
		scrollingDown,
		scrollingLeft,
		scrollingStarted,
		navigationVisible,
		scrollingDisabled,
		totalScroll,
	};
});
