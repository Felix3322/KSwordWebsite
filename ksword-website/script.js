(() => {
  const english = document.documentElement.lang.startsWith('en');
  const repo = 'KSwordDEV/KSword';
  const fallback = [
  [
    "a996d38d91c85a9d99744454880a58b7b223f7f7",
    "fix(ui): structure complex process reports with inline field details",
    "2026-10-13T19:04:10-04:00"
  ],
  [
    "0f882ef7b29f9bf69c40db6705777208acf80873",
    "chore(mcp): prepare 0.1.1 trusted publisher release",
    "2026-10-13T18:25:21-04:00"
  ],
  [
    "12a69822ebceba2cf3b10ff766b61f67b9bb0ed3",
    "chore(memory): sign issue #216 completion record",
    "2026-10-13T16:22:15-04:00"
  ],
  [
    "844b893e9670a282f3c3d9e5479acae21a61b3c8",
    "fix(ui): restore PEB workspace and stable detail projection identities",
    "2026-10-13T16:20:26-04:00"
  ]
].map(([sha, message, date]) => ({ sha, message, date }));
  const list = document.querySelector('[data-git-timeline-list]');
  const status = document.querySelector('[data-git-timeline-status]');
  const details = list?.closest('details');
  if (!list || !details) return;
  let loaded = false;
  function render(commits) {
    list.replaceChildren(...commits.slice(0, 4).map(commit => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = 'https://github.com/' + repo + '/commit/' + commit.sha;
      a.target = '_blank'; a.rel = 'noreferrer';
      const code = document.createElement('code'); code.textContent = commit.sha.slice(0, 7);
      const span = document.createElement('span'); span.textContent = commit.message;
      a.append(code, span); li.append(a); return li;
    }));
  }
  details.addEventListener('toggle', async () => {
    if (!details.open || loaded) return;
    loaded = true;
    if (status) status.textContent = english ? 'Loading…' : '正在读取…';
    try {
      const response = await fetch('https://api.github.com/repos/' + repo + '/commits?sha=main&per_page=4', { signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const payload = await response.json();
      if (!Array.isArray(payload)) throw new Error('Invalid commit list');
      const commits = payload.filter(c => /^[a-f0-9]{40}$/.test(c.sha) && c.commit?.message).map(c => ({ sha:c.sha, message:c.commit.message.split('\n')[0] }));
      if (!commits.length) throw new Error('Empty commit list');
      render(commits); if (status) status.textContent = '';
    } catch {
      render(fallback); if (status) status.textContent = english ? 'Showing saved activity.' : '当前显示已保存的记录。';
    }
  });
})();
