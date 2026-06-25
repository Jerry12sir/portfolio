const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 280)}ms`;
  observer.observe(item);
});

const frequencyValues = document.querySelectorAll(".frequency-value");
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const frequencyCycle = 4800;
const frequencyDelays = [0, 160, 320, 480, 640, 800];

const renderFrequencies = () => {
  const now = Date.now();

  frequencyValues.forEach((value, index) => {
    const column = value.closest(".frequency-column");
    const min = Number(value.dataset.min);
    const max = Number(value.dataset.max);

    if (!column || Number.isNaN(min) || Number.isNaN(max)) return;

    const phase = (((now - frequencyDelays[index]) % frequencyCycle) + frequencyCycle) % frequencyCycle;
    const progress = (1 - Math.cos((phase / frequencyCycle) * Math.PI * 2)) / 2;
    const frequency = Math.round(min + (max - min) * progress);

    value.textContent = `${frequency} MHz`;
  });
};

if (frequencyValues.length && !motionQuery.matches) {
  renderFrequencies();
  window.setInterval(renderFrequencies, 200);
}
