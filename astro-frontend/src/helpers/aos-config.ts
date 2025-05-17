import AOS from "aos";
function aosInit() {
  AOS.init({
    offset: 100,
    duration: 1000,
    easing: "ease-out-quart",
    delay: 100,
    once: true,
  });
}

export { aosInit };
