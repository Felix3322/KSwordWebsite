(() => {
  const page = document.querySelector('[data-redirect-page]');
  const destination = page?.querySelector('[data-redirect-target]');
  const status = page?.querySelector('[data-redirect-status]');
  const cancel = page?.querySelector('[data-redirect-cancel]');
  if (!destination || !status || !cancel) return;

  const language = new URLSearchParams(location.search).get('lang');
  const english = language === 'en' || (language !== 'zh' && navigator.language.startsWith('en'));
  if (english) {
    document.documentElement.lang = 'en';
    document.querySelectorAll('[data-en]').forEach(node => { node.textContent = node.dataset.en; });
    document.title = page.dataset.titleEn + ' — KSword';
    document.querySelector('[data-redirect-home]').href = '../en/index.html';
  }
  const switchLanguage = document.querySelector('[data-redirect-language]');
  switchLanguage.href = english ? '?lang=zh' : '?lang=en';
  switchLanguage.textContent = english ? '中文' : 'English';

  const target = new URL(destination.href);
  if (target.protocol !== 'https:') return;
  const seconds = Number(page.dataset.redirectSeconds);
  if (!Number.isInteger(seconds) || seconds < 1 || seconds > 30) return;

  const deadline = performance.now() + seconds * 1000;
  let timer;
  let stopped = false;
  let displayed = -1;
  function tick() {
    if (stopped) return;
    const remaining = Math.max(0, deadline - performance.now());
    const count = Math.ceil(remaining / 1000);
    if (count !== displayed) {
      displayed = count;
      status.textContent = english
        ? `Redirecting in ${count} ${count === 1 ? 'second' : 'seconds'}.`
        : `${count} 秒后自动跳转。`;
    }
    if (!remaining) {
      stopped = true;
      window.location.replace(target.href);
      return;
    }
    timer = window.setTimeout(tick, Math.min(250, remaining));
  }
  cancel.hidden = false;
  cancel.addEventListener('click', () => {
    stopped = true;
    window.clearTimeout(timer);
    status.textContent = english ? 'Automatic redirect cancelled.' : '已取消自动跳转。';
    cancel.disabled = true;
  });
  window.addEventListener('pagehide', () => { stopped = true; window.clearTimeout(timer); }, { once: true });
  tick();
})();
