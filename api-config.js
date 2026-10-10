(function(){
  'use strict';
  const configured=String(window.OPENUTILITY_API_BASE||'').trim();
  const base=configured||'https://openutility-bot-backend.vercel.app/api';
  window.OPENUTILITY_API_BASE=base.replace(/\/$/,'');
  window.OPENUTILITY_AUTH_URL=window.OPENUTILITY_API_BASE+'/auth/discord';
})();
