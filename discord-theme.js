(()=>{
  const css=`
:root{--discord-bg:#313338;--discord-sidebar:#2b2d31;--discord-sidebar-2:#1e1f22;--discord-channel:#949ba4;--discord-muted:#b5bac1;--discord-text:#f2f3f5;--discord-card:#2b2d31;--discord-hover:#35373c;--discord-active:#404249;--discord-blurple:#5865f2;--discord-green:#23a559;--discord-red:#da373c;--discord-line:#1e1f22}
html,body{background:var(--discord-bg)!important;color:var(--discord-text)!important}
body{font-family:Whitney,"Helvetica Neue",Helvetica,Arial,sans-serif!important;background:var(--discord-bg)!important}
.nav{height:48px!important;background:var(--discord-sidebar-2)!important;border-bottom:1px solid #111214!important;backdrop-filter:none!important;box-shadow:0 1px 0 #111214}
.navin{width:100%!important;padding:0 16px!important}.brand{font-size:15px!important}.logo{width:32px!important;height:32px!important;border-radius:50%!important}.user{color:var(--discord-muted)!important}
.layout{width:100%!important;max-width:none!important;display:grid!important;grid-template-columns:240px minmax(0,1fr)!important;gap:0!important;padding:0!important;min-height:calc(100vh - 48px)}
.side{position:sticky!important;top:48px!important;height:calc(100vh - 48px)!important;background:var(--discord-sidebar)!important;border:0!important;border-radius:0!important;padding:8px!important;overflow-y:auto!important}
.side small{color:#949ba4!important;font-size:11px!important;letter-spacing:.4px!important;padding:16px 8px 6px!important}.side button{color:var(--discord-channel)!important;font-weight:600!important;padding:9px 10px!important;border-radius:4px!important}.side button:hover{background:#35373c!important;color:#dbdee1!important}.side button.active{background:var(--discord-active)!important;color:#fff!important}
.content{background:var(--discord-bg)!important;min-width:0!important;padding:0 32px 80px!important}.serverbar{padding-top:16px!important;margin-bottom:8px!important}.select{background:var(--discord-sidebar-2)!important;border:1px solid #111214!important;border-radius:4px!important;color:#dbdee1!important;min-height:40px!important}
.content h1{font-size:24px!important;letter-spacing:0!important;font-weight:700!important}.sub{color:var(--discord-muted)!important}.panel,.stat{background:var(--discord-card)!important;border:0!important;border-radius:8px!important;box-shadow:none!important}.panel{padding:20px!important}.panel h2{font-size:16px!important}.panel p,.field label,.stat span{color:var(--discord-muted)!important}.input,.textarea{background:var(--discord-sidebar-2)!important;border:1px solid #1e1f22!important;color:var(--discord-text)!important;border-radius:3px!important}.input:focus,.textarea:focus{border-color:var(--discord-blurple)!important;box-shadow:0 0 0 1px var(--discord-blurple)!important}
.btn{background:#4e5058!important;border:0!important;border-radius:3px!important;color:#fff!important;transform:none!important}.btn:hover{background:#6d6f78!important}.primary{background:var(--discord-blurple)!important}.primary:hover{background:#4752c4!important}.danger{background:var(--discord-red)!important;color:#fff!important}.action{background:var(--discord-sidebar)!important;border:0!important;border-radius:4px!important}.action:hover{background:var(--discord-hover)!important;border:0!important}.action strong{color:#fff!important}.action small{color:var(--discord-muted)!important}
.notice{background:#2b2d31!important;border:0!important;border-left:4px solid var(--discord-blurple)!important;border-radius:4px!important}.preview{background:var(--discord-sidebar)!important;border:0!important;border-left:4px solid var(--discord-blurple)!important;border-radius:4px!important}.template{background:var(--discord-sidebar)!important;border:0!important;border-radius:4px!important}.toast{background:var(--discord-sidebar-2)!important;border:1px solid #111214!important;border-radius:4px!important}.mobilebar{background:var(--discord-sidebar-2)!important;border-top:1px solid #111214!important}
.analytics-item{background:var(--discord-sidebar)!important;border:0!important;border-radius:4px!important}.prodstatus{background:var(--discord-sidebar)!important;border:0!important;color:var(--discord-muted)!important}.prod-overlay{background:var(--discord-bg)!important}
.check{color:var(--discord-text)!important}.status{color:#57f287!important}
.section{max-width:1100px;margin:0 auto}.cards{grid-template-columns:repeat(4,1fr)!important}
@media(max-width:950px){.layout{grid-template-columns:1fr!important}.side{position:static!important;height:auto!important;display:flex!important;overflow:auto!important}.content{padding:16px!important}.cards{grid-template-columns:repeat(2,1fr)!important}}
@media(max-width:650px){.nav{height:56px!important}.layout{min-height:calc(100vh - 56px)}.side{display:none!important}.content{padding:12px!important}.cards{grid-template-columns:1fr 1fr!important}}
`;
  const style=document.createElement('style');style.id='discord-theme';style.textContent=css;document.head.appendChild(style);
  const labels={
    'Overview':'🏠  Overview','Configuration':'⚙️  Configuration','Moderation':'🛡️  Moderation','Logging':'📋  Logging','Embed Builder':'✦  Embed Builder','Log out':'🚪  Log out',
    'Configuration Center':'⚙️ Configuration Center','Moderation Center':'🛡️ Moderation Center','Advanced Logging':'📋 Advanced Logging','Embed Builder':'✦ Embed Builder','Server Dashboard':'🏠 Server Dashboard'
  };
  const apply=()=>{document.querySelectorAll('.side button,.content h1,.action strong,.panel h2').forEach(el=>{const t=el.textContent.trim();if(labels[t])el.textContent=labels[t]});
    const brand=document.querySelector('.brand span');if(brand)brand.textContent='OpenUtility • Discord Dashboard';
  };
  apply();new MutationObserver(apply).observe(document.body,{subtree:true,childList:true});
})();
