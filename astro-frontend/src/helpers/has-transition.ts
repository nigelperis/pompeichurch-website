export function hasTransition(element: Element): boolean {
	const computedStyle = getComputedStyle(element);

	// Get the transitionDuration and transitionDelay properties
	const transitionDuration = computedStyle.transitionDuration;
	const transitionDelay = computedStyle.transitionDelay;

	// Parse the duration and delay into floats (in seconds)
	const durationInSeconds = parseFloat(transitionDuration);
	const delayInSeconds = parseFloat(transitionDelay);

	// If either duration or delay is greater than 0, there's a transition
	return durationInSeconds > 0 || delayInSeconds > 0;
}
