(() => {
  'use strict';

  const icon = (path) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
  const icons = {
    menu: icon('M4 6h16M4 12h16M4 18h16'),
    grid: icon('M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'),
    settings: icon('M9.7 3h4.6l.6 2.2 2 .9 2-1.1 3.2 3.2-1.1 2 .9 2 .6v4.6l-2.2.6-.9 2 1.1 2-3.2 3.2-2-1.1-2 .9-.6 2.2H9.7l-.6-2.2-2-.9-2 1.1-3.2-3.2 1.1-2-.9-2-2.2-.6v-4.6l2.2-.6.9-2-1.1-2 3.2-3.2 2 1.1 2-.9L9.7 3Zm2.3 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z'),
    shield: icon('M12 3 20 6v5c0 5.2-3.4 8.5-8 10-4.6-1.5-8-4.8-8-10V6l8-3Z'),
    activity: icon('M3 12h4l2-6 4 12 2-6h6'),
    bolt: icon('M13 2 4 14h6l-1 8 9-12h-6l1-8Z'),
    logout: icon('M10 5H5v14h5M14 8l4 4-4 4M18 12H9')
  };

  const tabs = [
    ['overview', 'Overview', icons.grid],
    ['configuration', 'Configuration', icons.settings],
    ['moderation', 'Moderation', icons.shield],
    ['logging', 'Logs', icons.activity],
    ['embeds', 'Embeds', icons.bolt]
  ];

  function init() {
    if (document.getElementById('ouHeaderMenu')) return;

    const nav = document.querySelector('.navin');
    if (!nav) return;

    const style = document.createElement('style');
    style.textContent = `
      .ou-mobile-nav{display:none}
      .ou-menu-trigger{display:none}
      @media(max-width:650px){
        .mobilebar{display:none!important}
        .ou-menu-trigger{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;margin-left:auto;border:1px solid #3f4147;background:#232428;color:#f2f3f5;border-radius:10px;cursor:pointer}
        .ou-menu-trigger svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
        .ou-mobile-nav{position:fixed;inset:62px 0 0;background:#1e1f22ee;backdrop-filter:blur(18px);z-index:79;display:flex;flex-direction:column;padding:12px;opacity:0;visibility:hidden;pointer-events:none;transform:translateY(-8px);transition:.18s ease}
        .ou-mobile-nav.open{opacity:1;visibility:visible;pointer-events:auto;transform:none}
        .ou-mobile-nav-head{padding:8px 8px 12px;color:#949ba4;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1px}
        .ou-mobile-nav button{display:flex;align-items:center;gap:12px;width:100%;min-height:50px;border:0;background:transparent;color:#b5bac1;border-radius:8px;padding:0 12px;text-align:left;font-size:14px;font-weight:650;cursor:pointer}
        .ou-mobile-nav button:hover,.ou-mobile-nav button.active{background:#313338;color:#fff}
        .ou-mobile-nav button svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;flex:none}
        .ou-mobile-nav .ou-menu-divider{height:1px;background:#3f4147;margin:10px 4px}
        .ou-mobile-nav .ou-menu-logout{color:#ed777f}
      }
    `;
    document.head.appendChild(style);

    const trigger = document.createElement('button');
    trigger.className = 'ou-menu-trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-label', 'Open dashboard menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = icons.menu;
    nav.appendChild(trigger);

    const menu = document.createElement('div');
    menu.id = 'ouHeaderMenu';
    menu.className = 'ou-mobile-nav';
    menu.innerHTML = `<div class="ou-mobile-nav-head">OpenUtility Dashboard</div>` +
      tabs.map(([id, label, svg]) => `<button type="button" data-ou-header-tab="${id}">${svg}<span>${label}</span></button>`).join('') +
      `<div class="ou-menu-divider"></div><button type="button" class="ou-menu-logout" onclick="logout()">${icons.logout}<span>Log out</span></button>`;
    document.body.appendChild(menu);

    const close = () => {
      menu.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = icons.menu;
    };

    trigger.addEventListener('click', () => {
      const open = !menu.classList.contains('open');
      menu.classList.toggle('open', open);
      trigger.setAttribute('aria-expanded', String(open));
      trigger.innerHTML = open ? icon('M6 6l12 12M18 6 6 18') : icons.menu;
    });

    menu.addEventListener('click', (event) => {
      const button = event.target.closest('[data-ou-header-tab]');
      if (!button) return;
      const tab = button.dataset.ouHeaderTab;
      const sideButton = document.querySelector(`[data-tab="${tab}"]`);
      if (sideButton) sideButton.click();
      else if (typeof window.tab === 'function') window.tab(tab);
      menu.querySelectorAll('[data-ou-header-tab]').forEach((item) => item.classList.toggle('active', item === button));
      close();
    });

    document.addEventListener('click', (event) => {
      if (menu.classList.contains('open') && !menu.contains(event.target) && !trigger.contains(event.target)) close();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 650) close();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
