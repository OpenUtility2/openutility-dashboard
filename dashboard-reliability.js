(()=>{
'use strict';
if(window.__openutilityReliability)return;
window.__openutilityReliability=true;
const API_ORIGIN='https://openutility-bot-backend.vercel.app/api';
const LOGIN_URL='https://openutility-bot-backend.vercel.app/api/auth/discord';
const ASSET='../assets/openutility-bot-logo.jpg';
const originalApi=window.api;
function showMessage(message,type='error'){
  const toast=document.getElementById('toast');
  if(toast){toast.textContent=message;toast.classList.add('show');clearTimeout(window.__ouToastTimer);window.__ouToastTimer=setTimeout(()=>toast.classList.remove('show'),4200)}
}
function bootError(error){
  const message=String(error?.message||error||'The dashboard could not start.');
  document.body.innerHTML=`<main style="min-height:100vh;display:grid;place-items:center;padding:24px;background:#060910;color:#f2f3f5;font-family:system-ui,-apple-system,Segoe UI,sans-serif"><section style="width:min(520px,100%);background:#0b111b;border:1px solid #1d2939;border-radius:18px;padding:28px;box-shadow:0 20px 80px #0008"><div style="display:flex;align-items:center;gap:12px;margin-bottom:18px"><img src="${ASSET}" alt="OpenUtility" style="width:44px;height:44px;border-radius:12px;object-fit:cover"><div><strong style="font-size:18px">OpenUtility Dashboard</strong><div style="color:#8996a8;font-size:12px">Connection problem</div></div></div><h1 style="font-size:25px;margin:0 0 8px">We couldn't load your dashboard.</h1><p style="color:#8996a8;line-height:1.6">${escapeHtml(message)} Check your connection or sign in again.</p><div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:20px"><button onclick="location.reload()" style="border:0;border-radius:10px;background:#5865f2;color:#fff;padding:11px 15px;font-weight:750">Try again</button><a href="${LOGIN_URL}" style="display:inline-flex;align-items:center;border:1px solid #253247;border-radius:10px;color:#f2f3f5;text-decoration:none;padding:10px 15px;font-weight:700">Sign in again</a></div></section></main>`;
}
window.__openutilityBootError=bootError;
function escapeHtml(value){return String(value).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]))}
function fixAssets(){
  document.querySelectorAll('img[src="./assets/openutility-bot-logo.jpg"],link[href="./assets/openutility-bot-logo.jpg"]').forEach(el=>{el.src?el.src=ASSET:el.href=ASSET});
  document.querySelectorAll('img.logo,img.avatar').forEach(img=>{img.addEventListener('error',()=>{if(!img.dataset.fallback){img.dataset.fallback='1';img.src='/assets/openutility-bot-logo.jpg'}},{once:true})});
}
function installApiGuard(){
  if(typeof originalApi!=='function')return;
  window.api=async function(path,opts={}){
    const method=String(opts.method||'GET').toUpperCase();
    let lastError;
    for(let attempt=0;attempt<(method==='GET'?3:1);attempt++){
      const controller=new AbortController();
      const timer=setTimeout(()=>controller.abort(),12000);
      try{
        const next={...opts,signal:controller.signal};
        const result=await originalApi(path,next);
        clearTimeout(timer);
        return result;
      }catch(error){
        clearTimeout(timer);lastError=error;
        const msg=String(error?.message||'');
        if(/401|unauthorized|not authenticated|session/i.test(msg)){showMessage('Your dashboard session expired. Please sign in again.');throw error}
        if(attempt<2){await new Promise(resolve=>setTimeout(resolve,500*(attempt+1)));continue}
      }
    }
    const message=lastError?.name==='AbortError'?'The request timed out. Please try again.':String(lastError?.message||'The request failed.');
    showMessage(message);throw new Error(message);
  };
}
function addConnectionState(){
  const banner=document.createElement('div');banner.id='ouConnectionBanner';banner.style.cssText='display:none;position:fixed;left:12px;right:12px;top:74px;z-index:9999;background:#ed4245;color:#fff;padding:10px 13px;border-radius:9px;font:700 12px system-ui;text-align:center;box-shadow:0 10px 30px #0006';banner.textContent='You are offline. Changes will not be saved until the connection returns.';document.body.appendChild(banner);
  const update=()=>banner.style.display=navigator.onLine?'none':'block';window.addEventListener('online',update);window.addEventListener('offline',update);update();
}
function hardenTabs(){
  if(typeof window.tab!=='function')return;
  const originalTab=window.tab;
  window.tab=function(name){
    try{return originalTab(name)}catch(error){showMessage('Could not open that dashboard section.');console.error(error)}
  };
}
function start(){fixAssets();installApiGuard();addConnectionState();hardenTabs();window.addEventListener('error',event=>{if(event.error)console.error('[OpenUtility]',event.error)});window.addEventListener('unhandledrejection',event=>{console.error('[OpenUtility]',event.reason);if(event.reason?.message)showMessage(event.reason.message)});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
