(() => {
  'use strict';

  const icon = (path) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
  const icons = {
    grid: icon('M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'),
    shield: icon('M12 3 20 6v5c0 5.2-3.4 8.5-8 10-4.6-1.5-8-4.8-8-10V6l8-3Zm0 3.1L6.2 8.2V11c0 3.6 2.2 6 5.8 7.3 3.6-1.3 5.8-3.7 5.8-7.3V8.2L12 6.1Z'),
    activity: icon('M3 12h4l2-6 4 12 2-6h6'),
    bolt: icon('M13 2 4 14h6l-1 8 9-12h-6l1-8Z'),
    search: icon('M10.5 4a6.5 6.5 0 1 0 4.1 11.5l4 4 1.4-1.4-4-4A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z'),
    settings: icon('M9.7 3h4.6l.6 2.2 2 .9 2-1.1 3.2 3.2-1.1 2 .9 2 .2.6v4.6l-2.2.6-.9 2 1.1 2-3.2 3.2-2-1.1-2 .9-.6 2.2H9.7l-.6-2.2-2-.9-2 1.1-3.2-3.2 1.1-2-.9-2-2.2-.6V13.7l2.2-.6.9-2-1.1-2 3.2-3.2 2 1.1 2-.9L9.7 3Zm2.3 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z')
  };

  const style = document.createElement('style');
  style.textContent = `
    .ou-enhance{--ou-bg:#1e1f22;--ou-panel:#2b2d31;--ou-panel2:#232428;--ou-line:#3f4147;--ou-text:#f2f3f5;--ou-muted:#b5bac1;--ou-brand:#5865f2;--ou-green:#23a559;font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--ou-text)}
    .ou-enhance *{box-sizing:border-box}.ou-hero{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:center;margin:0 0 16px;padding:20px 22px;background:linear-gradient(135deg,#2b2d31,#232428);border:1px solid #3f4147;border-radius:14px}.ou-kicker{display:flex;align-items:center;gap:7px;color:#949ba4;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.8px}.ou-kicker i{width:7px;height:7px;border-radius:50%;background:var(--ou-green);box-shadow:0 0 0 4px #23a55918}.ou-hero h1{margin:5px 0 3px;font-size:26px;letter-spacing:-.7px}.ou-hero p{margin:0;color:var(--ou-muted);font-size:12px}.ou-hero-actions{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.ou-hero-btn{display:inline-flex;align-items:center;gap:8px;border:1px solid #4b4d54;background:#313338;color:#fff;border-radius:5px;padding:9px 12px;font-size:12px;font-weight:750;cursor:pointer}.ou-hero-btn.primary{background:var(--ou-brand);border-color:var(--ou-brand)}.ou-hero-btn:hover{filter:brightness(1.08)}.ou-hero-btn svg{width:17px!important;height:17px!important;min-width:17px;min-height:17px;display:block;flex:none;fill:currentColor!important;stroke:none}
    .ou-grid{display:grid;grid-template-columns:1.35fr .65fr;gap:12px;margin:0 0 15px}.ou-card{background:var(--ou-panel);border:1px solid var(--ou-line);border-radius:12px;padding:16px}.ou-card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:13px}.ou-card-head h3{font-size:14px;margin:0}.ou-card-head span{color:#949ba4;font-size:10px}.ou-health{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.ou-health-item{background:#232428;border-radius:8px;padding:11px}.ou-health-item strong{display:block;font-size:12px}.ou-health-item span{display:flex;align-items:center;gap:5px;color:#b5bac1;font-size:10px;margin-top:4px}.ou-dot{width:6px;height:6px;border-radius:50%;background:var(--ou-green)}.ou-dot.warn{background:#f0b232}.ou-dot.bad{background:#ed4245}
    .ou-activity{display:grid;gap:7px}.ou-event{display:flex;align-items:center;gap:9px;padding:9px;border-radius:7px;background:#232428}.ou-event-icon{width:28px;height:28px;border-radius:7px;background:#313338;display:grid;place-items:center;color:#b5bac1;flex:none}.ou-event-icon svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.ou-event b{display:block;font-size:11px}.ou-event small{color:#949ba4;font-size:9px}.ou-event time{margin-left:auto;color:#72767d;font-size:9px;white-space:nowrap}
    .ou-quick{display:grid;grid-template-columns:repeat(2,1fr);gap:7px}.ou-quick button{display:flex;align-items:center;gap:8px;text-align:left;border:1px solid #3f4147;background:#232428;color:#f2f3f5;border-radius:8px;padding:10px;cursor:pointer}.ou-quick button:hover{background:#313338;border-color:#5865f266}.ou-quick svg{width:16px!important;height:16px!important;min-width:16px;min-height:16px;display:block;flex:none;fill:currentColor;stroke:none}.ou-quick strong{font-size:10px}.ou-quick small{display:block;color:#949ba4;font-size:8px;margin-top:1px}
    .ou-search{position:relative;min-width:210px}.ou-search input{width:100%;height:34px;border:1px solid #3f4147;background:#1e1f22;color:#fff;border-radius:5px;padding:0 10px 0 32px;outline:none;font-size:11px}.ou-search svg{position:absolute;left:10px;top:9px;width:15px;height:15px;fill:none;stroke:#949ba4;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.ou-hidden{display:none!important}
    .ou-section-note{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;margin-bottom:12px;background:#232428;border:1px solid #3f4147;border-radius:8px;color:#b5bac1;font-size:10px}.ou-section-note b{color:#fff}.ou-section-note button{border:0;background:transparent;color:#949cf7;cursor:pointer;font-size:10px;font-weight:700}
    @media(max-width:900px){.ou-grid{grid-template-columns:1fr}.ou-hero{grid-template-columns:1fr}.ou-hero-actions{justify-content:flex-start}}
    @media(max-width:650px){.ou-hero{padding:15px}.ou-hero h1{font-size:22px}.ou-health{grid-template-columns:1fr 1fr}.ou-search{min-width:0;width:100%}.ou-hero-actions{display:grid;grid-template-columns:1fr 1fr}.ou-hero-btn{width:100%;justify-content:center}}
  `;
  document.head.appendChild(style);

  const find = (selector) => document.querySelector(selector);
  const fire = (tab) => {
    const btn = document.querySelector(`[data-tab="${tab}"]`);
    if (btn) btn.click();
    else if (typeof window.tab === 'function') window.tab(tab);
  };

  function enhance() {
    if (document.body.dataset.ouEnhanced === '1') return;
    document.body.dataset.ouEnhanced = '1';
    document.body.classList.add('ou-enhance');

    const content = find('.content');
    if (!content) return;

    const hero = document.createElement('div');
    hero.className = 'ou-hero';
    hero.innerHTML = `
      <div><div class="ou-kicker"><i></i> OpenUtility Control Center</div>
      <h1>Manage your Discord server from one place.</h1>
      <p>Security, moderation, logging, configuration and embeds — with a cleaner Discord-native workflow.</p></div>
      <div class="ou-hero-actions"><button class="ou-hero-btn primary" data-ou-action="security">${icons.shield} <span>Security</span></button><button class="ou-hero-btn" data-ou-action="activity">${icons.activity} <span>Activity</span></button><button class="ou-hero-btn" data-ou-action="settings">${icons.settings} <span>Settings</span></button></div>`;
    content.prepend(hero);

    const grid = document.createElement('div');
    grid.className = 'ou-grid';
    grid.innerHTML = `
      <div class="ou-card"><div class="ou-card-head"><h3>Server health</h3><span>Live dashboard state</span></div><div class="ou-health">
        <div class="ou-health-item"><strong>Bot status</strong><span><i class="ou-dot"></i> Online</span></div>
        <div class="ou-health-item"><strong>Protection</strong><span><i class="ou-dot"></i> Active</span></div>
        <div class="ou-health-item"><strong>API</strong><span><i class="ou-dot"></i> Connected</span></div>
      </div></div>
      <div class="ou-card"><div class="ou-card-head"><h3>Quick actions</h3><span>Staff shortcuts</span></div><div class="ou-quick">
        <button data-ou-tab="configuration">${icons.settings}<span><strong>Configure</strong><small>Server settings</small></span></button>
        <button data-ou-tab="moderation">${icons.shield}<span><strong>Moderate</strong><small>Member actions</small></span></button>
        <button data-ou-tab="logging">${icons.activity}<span><strong>Logs</strong><small>Event routing</small></span></button>
        <button data-ou-tab="embeds">${icons.bolt}<span><strong>Embeds</strong><small>Build messages</small></span></button>
      </div></div>`;
    content.insertBefore(grid, content.querySelector('.section'));

    const overview = find('#overview');
    if (overview) {
      const note = document.createElement('div');
      note.className = 'ou-section-note';
      note.innerHTML = '<span><b>Tip:</b> Use the quick actions above for the controls your staff uses most.</span><button data-ou-action="security">Open security controls →</button>';
      overview.insertBefore(note, overview.querySelector('.cards'));
    }

    const side = find('.side');
    if (side) {
      const searchWrap = document.createElement('div');
      searchWrap.className = 'ou-search';
      searchWrap.innerHTML = `${icons.search}<input id="ouDashboardSearch" type="search" placeholder="Search dashboard…" autocomplete="off">`;
      side.prepend(searchWrap);
      searchWrap.querySelector('input').addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        side.querySelectorAll('button[data-tab]').forEach((button) => {
          button.classList.toggle('ou-hidden', q && !button.textContent.toLowerCase().includes(q));
        });
      });
    }

    document.addEventListener('click', (e) => {
      const tabButton = e.target.closest('[data-ou-tab]');
      if (tabButton) fire(tabButton.dataset.ouTab);
      const action = e.target.closest('[data-ou-action]');
      if (action) {
        const target = action.dataset.ouAction;
        if (target === 'security') fire('configuration');
        if (target === 'activity') fire('logging');
        if (target === 'settings') fire('configuration');
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance);
  else enhance();
})();
