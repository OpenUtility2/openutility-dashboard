(() => {
  'use strict';

  const icon = (path) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
  const icons = {
    back: icon('M15 18 9 12l6-6'),
    menu: icon('M4 6h16M4 12h16M4 18h16'),
    close: icon('M6 6l12 12M18 6 6 18'),
    grid: icon('M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'),
    bot: icon('M12 3v3M8 9h8M6 10h12v9H6zM9 14h.01M15 14h.01M9 19v2M15 19v2M4 13h2M18 13h2'),
    shield: icon('M12 3 20 6v5c0 5.2-3.4 8.5-8 10-4.6-1.5-8-4.8-8-10V6l8-3Z'),
    moderation: icon('M6 5h12M8 5v14M16 5v14M5 19h14M10 9h4M10 13h4'),
    activity: icon('M3 12h4l2-6 4 12 2-6h6'),
    bolt: icon('M13 2 4 14h6l-1 8 9-12h-6l1-8Z'),
    user: icon('M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0'),
    settings: icon('M9.7 3h4.6l.6 2.2 2 .9 2-1.1 3.2 3.2-1.1 2 .9 2 .6v4.6l-2.2.6-.9 2 1.1 2-3.2 3.2-2-1.1-2 .9-.6 2.2H9.7l-.6-2.2-2-.9-2 1.1-3.2-3.2 1.1-2-.9-2-2.2-.6v-4.6l2.2-.6.9-2-1.1-2 3.2-3.2 2 1.1 2-.9L9.7 3Zm2.3 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z'),
    crown: icon('m12 4 2.2 4 4.8-2 1 7H4l1-7 4.8 2L12 4Zm-6 13h12v3H6z'),
    ai: icon('M8 4h8l3 3v10l-3 3H8l-3-3V7l3-3ZM9 12h.01M15 12h.01M9 16c2 1.2 4 1.2 6 0'),
    logout: icon('M10 5H5v14h5M14 8l4 4-4 4M18 12H9'),
    chevron: icon('m7 9 5 5 5-5')
  };

  const tabs = [
    ['overview', 'Dashboard', icons.grid],
    ['configuration', 'Configuration', icons.settings],
    ['moderation', 'Moderation', icons.moderation],
    ['logging', 'Advanced Logging', icons.activity],
    ['embeds', 'Embed Builder', icons.bolt]
  ];

  const toolLinks = [
    ['bot-personalizer', 'Bot Personalizer', icons.user],
    ['security', 'Security Center', icons.shield],
    ['automod', 'AutoMod', icons.bot]
  ];

  function injectStyle() {
    if (document.getElementById('ouHeaderMenuStyles')) return;
    const style = document.createElement('style');
    style.id = 'ouHeaderMenuStyles';
    style.textContent = `
      .ou-menu-trigger{display:none!important}
      .ou-mobile-nav{display:none}
      @media(max-width:650px){
        body{overflow-x:hidden}
        .nav{height:64px!important;background:#1e1f22!important;border-bottom:1px solid #111214!important;box-shadow:0 1px 0 #ffffff08}
        .navin{padding:0 12px!important;justify-content:flex-start!important;gap:10px!important}
        .nav .brand{order:2;min-width:0;gap:9px}
        .nav .brand span{font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .nav .logo{width:34px!important;height:34px!important;border-radius:10px!important}
        .nav .user{order:4;margin-left:auto}
        .nav .user span{display:none}
        .ou-menu-trigger{order:1!important;display:inline-flex!important;align-items:center;justify-content:center;width:36px;height:36px;flex:none;border:0;background:transparent;color:#b5bac1;border-radius:8px;cursor:pointer;padding:0}
        .ou-menu-trigger svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
        .ou-mobile-nav{position:fixed;inset:64px 0 0;background:#1e1f22;z-index:100;display:flex;flex-direction:column;overflow:auto;padding:0 0 calc(18px + env(safe-area-inset-bottom));opacity:0;visibility:hidden;pointer-events:none;transform:translateX(-14px);transition:opacity .16s ease,transform .18s ease,visibility .16s ease}
        .ou-mobile-nav.open{opacity:1;visibility:visible;pointer-events:auto;transform:none}
        .ou-menu-top{display:flex;align-items:center;gap:12px;padding:18px 22px 16px}
        .ou-menu-top .ou-menu-back{width:34px;height:34px;display:grid;place-items:center;border:0;background:transparent;color:#949ba4;border-radius:8px;padding:0;cursor:pointer}
        .ou-menu-top .ou-menu-back:hover{background:#313338;color:#fff}
        .ou-menu-top .ou-menu-back svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
        .ou-menu-brand{display:flex;align-items:center;gap:10px;color:#f2f3f5;font-size:20px;font-weight:800}
        .ou-menu-brand img{width:42px;height:42px;border-radius:50%;object-fit:cover;background:#313338}
        .ou-server-wrap{padding:0 22px 14px}
        .ou-server-select{width:100%;height:58px;background:#17181c;border:0;color:#f2f3f5;border-radius:9px;padding:0 14px;font-size:15px;font-weight:750;outline:0}
        .ou-server-select:focus{box-shadow:0 0 0 2px #5865f2}
        .ou-menu-list{padding:4px 22px 12px}
        .ou-menu-section{padding:17px 0 7px;color:#949ba4;text-transform:uppercase;font-size:10px;font-weight:850;letter-spacing:1px}
        .ou-menu-item{display:flex;align-items:center;gap:16px;width:100%;min-height:54px;padding:0 10px;border:0;background:transparent;color:#b5bac1;border-radius:8px;text-align:left;font-size:15px;font-weight:650;cursor:pointer}
        .ou-menu-item:hover{background:#313338;color:#fff}
        .ou-menu-item.active{background:#35373c;color:#fff}
        .ou-menu-item svg{width:23px;height:23px;flex:none;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
        .ou-menu-item .ou-item-text{flex:1}
        .ou-menu-badge{background:#4752c4;color:#fff;border-radius:999px;padding:5px 9px;font-size:10px;font-weight:800}
        .ou-menu-divider{height:1px;background:#303236;margin:8px 22px}
        .ou-menu-promo{margin:8px 22px 0;padding:17px;border-radius:10px;background:linear-gradient(135deg,#5865f2,#3c45a8);color:#fff;position:relative;overflow:hidden}
        .ou-menu-promo:after{content:'✦';position:absolute;right:18px;bottom:-15px;font-size:70px;opacity:.16}
        .ou-menu-promo b{display:block;font-size:15px;margin-bottom:5px}
        .ou-menu-promo span{display:block;max-width:85%;font-size:11px;line-height:1.5;color:#e3e5e8}
        .ou-menu-promo button{margin-top:12px;border:0;background:#fff;color:#232428;border-radius:5px;padding:8px 11px;font-size:11px;font-weight:800;cursor:pointer}
        .ou-menu-account{margin-top:auto;padding:12px 22px 0}
        .ou-menu-account button{display:flex;align-items:center;gap:12px;width:100%;min-height:48px;border:0;background:transparent;color:#ed777f;border-radius:8px;padding:0 10px;font-size:14px;font-weight:650;text-align:left}
        .ou-menu-account button svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
      }
    `;
    document.head.appendChild(style);
  }

  function getServerSelect() {
    return document.getElementById('serverSelect');
  }

  function buildMenu() {
    const existing = document.getElementById('ouHeaderMenu');
    if (existing) existing.remove();

    const menu = document.createElement('div');
    menu.id = 'ouHeaderMenu';
    menu.className = 'ou-mobile-nav';
    menu.innerHTML = `
      <div class="ou-menu-top">
        <button type="button" class="ou-menu-back" aria-label="Close menu">${icons.back}</button>
        <div class="ou-menu-brand"><img src="./assets/openutility-bot-logo.jpg" alt="OpenUtility"><span>OpenUtility</span></div>
      </div>
      <div class="ou-server-wrap"><select class="ou-server-select" id="ouMenuServerSelect" aria-label="Select server"><option>Loading servers…</option></select></div>
      <div class="ou-menu-list">
        <div class="ou-menu-section">Dashboard</div>
        ${tabs.map(([id,label,svg]) => `<button type="button" class="ou-menu-item" data-ou-tab="${id}">${svg}<span class="ou-item-text">${label}</span></button>`).join('')}
        <div class="ou-menu-section">OpenUtility</div>
        ${toolLinks.map(([id,label,svg]) => `<button type="button" class="ou-menu-item" data-ou-tool="${id}">${svg}<span class="ou-item-text">${label}</span>${id==='automod'?'<span class="ou-menu-badge">NEW</span>':''}</button>`).join('')}
        <button type="button" class="ou-menu-item" data-ou-tab="embeds">${icons.bolt}<span class="ou-item-text">Embeds & Messages</span></button>
        <div class="ou-menu-section">More</div>
        <button type="button" class="ou-menu-item" data-ou-tool="personalizer">${icons.user}<span class="ou-item-text">Bot Personalizer</span></button>
        <button type="button" class="ou-menu-item" data-ou-tool="premium">${icons.crown}<span class="ou-item-text">Premium</span></button>
        <button type="button" class="ou-menu-item" data-ou-tool="ai">${icons.ai}<span class="ou-item-text">OpenUtility AI</span></button>
      </div>
      <div class="ou-menu-divider"></div>
      <div class="ou-menu-promo"><b>✨ Make your server better</b><span>Explore OpenUtility's security, moderation and automation tools from one place.</span><button type="button" data-ou-promo>Add OpenUtility to a server</button></div>
      <div class="ou-menu-account"><button type="button" id="ouMenuLogout">${icons.logout}<span>Log out</span></button></div>
    `;
    document.body.appendChild(menu);
    return menu;
  }

  function syncServerSelect(menu) {
    const source = getServerSelect();
    const target = menu && menu.querySelector('#ouMenuServerSelect');
    if (!source || !target) return;
    target.innerHTML = source.innerHTML;
    target.value = source.value;
    target.addEventListener('change', () => {
      source.value = target.value;
      source.dispatchEvent(new Event('change', {bubbles:true}));
    });
    source.addEventListener('change', () => { target.value = source.value; });
  }

  function activateTab(menu, id) {
    const sideButton = document.querySelector(`[data-tab="${id}"]`);
    if (sideButton) sideButton.click();
    else if (typeof window.tab === 'function') window.tab(id);
    menu.querySelectorAll('[data-ou-tab]').forEach((item) => item.classList.toggle('active', item.dataset.ouTab === id));
  }

  function closeMenu(menu, trigger) {
    menu.classList.remove('open');
    trigger.setAttribute('aria-expanded','false');
    trigger.innerHTML = icons.menu;
    document.body.style.overflow = '';
  }

  function openMenu(menu, trigger) {
    menu.classList.add('open');
    trigger.setAttribute('aria-expanded','true');
    trigger.innerHTML = icons.close;
    document.body.style.overflow = 'hidden';
    syncServerSelect(menu);
  }

  function init() {
    if (document.getElementById('ouHeaderMenu')) return;
    const nav = document.querySelector('.navin');
    if (!nav) return;
    injectStyle();

    const trigger = document.createElement('button');
    trigger.className = 'ou-menu-trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-label','Open dashboard menu');
    trigger.setAttribute('aria-expanded','false');
    trigger.innerHTML = icons.menu;
    nav.insertBefore(trigger, nav.firstChild);

    const menu = buildMenu();
    syncServerSelect(menu);

    trigger.addEventListener('click', () => {
      if (menu.classList.contains('open')) closeMenu(menu, trigger);
      else openMenu(menu, trigger);
    });

    menu.querySelector('.ou-menu-back').addEventListener('click', () => closeMenu(menu, trigger));
    menu.querySelectorAll('[data-ou-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        activateTab(menu, button.dataset.ouTab);
        closeMenu(menu, trigger);
      });
    });

    menu.querySelectorAll('[data-ou-tool]').forEach((button) => {
      button.addEventListener('click', () => {
        const tool = button.dataset.ouTool;
        const mapping = {security:'moderation', automod:'configuration', 'bot-personalizer':'configuration', personalizer:'configuration', premium:'configuration', ai:'overview'};
        activateTab(menu, mapping[tool] || 'overview');
        closeMenu(menu, trigger);
      });
    });

    menu.querySelector('[data-ou-promo]').addEventListener('click', () => {
      const invite = document.getElementById('inviteBtn');
      if (invite && invite.href) window.open(invite.href, '_blank', 'noopener');
      else window.open('https://discord.com/oauth2/authorize?client_id=1553118626964570112&permissions=8&integration_type=0&scope=bot', '_blank', 'noopener');
    });

    menu.querySelector('#ouMenuLogout').addEventListener('click', () => {
      if (typeof window.logout === 'function') window.logout();
    });

    document.addEventListener('click', (event) => {
      if (menu.classList.contains('open') && !menu.contains(event.target) && !trigger.contains(event.target)) closeMenu(menu, trigger);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 650) closeMenu(menu, trigger);
    });

    const observer = new MutationObserver(() => syncServerSelect(menu));
    const source = getServerSelect();
    if (source) observer.observe(source, {childList:true, subtree:true});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();