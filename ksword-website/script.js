(() => {
  const gallery = document.querySelector('[data-gallery]');
  if (!gallery) return;

  const items = [...gallery.querySelectorAll('[data-gallery-item]')];
  const count = document.querySelector('.gallery-count');
  const indexButtons = [...document.querySelectorAll('[data-gallery-index]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let scrollFrame = 0;

  const pad = number => String(number).padStart(2, '0');

  function update(index) {
    activeIndex = (index + items.length) % items.length;
    count.textContent = `${pad(activeIndex + 1)} / ${pad(items.length)}`;
    indexButtons.forEach((button, buttonIndex) => {
      button.setAttribute('aria-current', buttonIndex === activeIndex ? 'true' : 'false');
    });
  }

  function goTo(index) {
    const normalized = (index + items.length) % items.length;
    const target = items[normalized];
    const left = target.offsetLeft - gallery.offsetLeft - (gallery.clientWidth - target.offsetWidth) / 2;
    gallery.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' });
    update(normalized);
  }

  document.querySelector('[data-gallery-prev]').addEventListener('click', () => goTo(activeIndex - 1));
  document.querySelector('[data-gallery-next]').addEventListener('click', () => goTo(activeIndex + 1));
  indexButtons.forEach((button, index) => button.addEventListener('click', () => goTo(index)));

  gallery.addEventListener('keydown', event => {
    const keys = {
      ArrowLeft: activeIndex - 1,
      ArrowRight: activeIndex + 1,
      Home: 0,
      End: items.length - 1
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    goTo(keys[event.key]);
  });

  gallery.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      const center = gallery.scrollLeft + gallery.clientWidth / 2;
      let nearest = 0;
      let distance = Infinity;
      items.forEach((item, index) => {
        const itemCenter = item.offsetLeft - gallery.offsetLeft + item.offsetWidth / 2;
        const nextDistance = Math.abs(center - itemCenter);
        if (nextDistance < distance) {
          nearest = index;
          distance = nextDistance;
        }
      });
      update(nearest);
    });
  }, { passive: true });

  update(0);
})();
