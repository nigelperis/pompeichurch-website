/**
 * Throttles any given function
 * @param cb
 * @param throttleDelay @default 700
 *
 * @returns throttled function
 */
function throttle<CB extends (...args: unknown[]) => unknown>(
	cb: CB,
	throttleDelay: number = 700,
) {
	let isTimerRunning = false;

	return (...args: Parameters<CB>) => {
		if (isTimerRunning) return;

		cb(...args);
		isTimerRunning = true;
		setTimeout(() => {
			isTimerRunning = false;
		}, throttleDelay);
	};
}

export { throttle };
