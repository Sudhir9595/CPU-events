/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --navy: #080e2b; --navy2: #0f1a48; --gold: #f4b942;
      --red: #e84545; --green: #2ec97e; --blue: #3a8dde;
      --cyan: #22d3ee; --purple: #8b5cf6;
      --glass: rgba(255,255,255,0.07); --glass-border: rgba(255,255,255,0.14);
      --text-primary: #f0e9d8; --text-muted: #8c9ab7; --card-bg: rgba(10,18,60,0.88);
    }
    body { background: var(--navy); color: var(--text-primary); font-family: 'DM Sans', sans-serif; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

    @keyframes fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
    @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
    @keyframes spin    { to { transform: rotate(360deg); } }
    @keyframes float   { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-8px); } }
    @keyframes bgPan   { 0%{ background-position:0% 50%; } 100%{ background-position:100% 50%; } }

    .fu  { animation: fadeUp .5s ease both; }
    .fu2 { animation: fadeUp .5s .12s ease both; }
    .fu3 { animation: fadeUp .5s .22s ease both; }
    .fu4 { animation: fadeUp .5s .32s ease both; }
    .fu5 { animation: fadeUp .5s .42s ease both; }
    .fi  { animation: fadeIn .35s ease both; }

    /* ── AUTH LAYOUT ── */
    .auth-root { min-height:100vh; display:flex; align-items:stretch; }
    .auth-left { flex:1; position:relative; overflow:hidden; display:none; }
    @media(min-width:900px){ .auth-left { display:block; } }
    .auth-left-bg {
      position:absolute; inset:0;
      background: linear-gradient(160deg, rgba(8,14,43,.6) 0%, rgba(10,20,50,.4) 100%),
        linear-gradient(135deg,#0d2137 0%,#1a3a5c 20%,#0a2a1a 40%,#1c3a10 55%,#0d2a40 75%,#08142b 100%);
      background-size:400% 400%; animation: bgPan 14s ease infinite alternate;
    }
    .auth-left-scene { position:absolute; bottom:0; left:0; right:0; height:52%; }
    .bldg { position:absolute; bottom:0; background:rgba(255,255,255,.055); border:1px solid rgba(255,255,255,.08); border-bottom:none; border-radius:4px 4px 0 0; }
    .bldg-wins { position:absolute; top:10px; left:6px; right:6px; display:grid; grid-template-columns:repeat(3,1fr); gap:4px; }
    .bw { height:8px; border-radius:1px; background:rgba(255,230,120,.18); }
    .bw.lit { background:rgba(255,230,120,.72); }
    .auth-left-overlay {
      position:absolute; inset:0;
      background:linear-gradient(to top,rgba(8,14,43,.88) 0%,transparent 55%);
      display:flex; flex-direction:column; justify-content:flex-end; padding:3rem;
    }
    .auth-panel-logo { position:absolute; top:2.5rem; left:2.5rem; display:flex; align-items:center; gap:.75rem; }
    .panel-logo-box { width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg,#2563eb,#1d4ed8); display:flex; align-items:center; justify-content:center; font-weight:900; font-size:1rem; color:#fff; }
    .panel-logo-text { font-size:1.2rem; font-weight:700; color:#fff; }
    .panel-logo-text em { color:var(--cyan); font-style:normal; }
    .auth-quote { font-family:'Fraunces',serif; font-size:2rem; font-weight:700; color:#fff; line-height:1.25; margin-bottom:.7rem; }
    .auth-quote em { color:var(--gold); font-style:italic; }
    .auth-quote-sub { color:rgba(255,255,255,.5); font-size:.9rem; }
    .auth-dots { display:flex; gap:.4rem; margin-top:1.1rem; }
    .adot { width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,.22); }
    .adot.active { background:var(--gold); width:22px; border-radius:4px; }

    .auth-right {
      width:100%; max-width:480px; min-height:100vh;
      background:rgba(8,14,43,.98);
      display:flex; flex-direction:column; justify-content:center;
      padding:3rem 2.5rem; position:relative; overflow-y:auto;
      border-left:1px solid var(--glass-border);
    }
    @media(max-width:899px){ .auth-right{ max-width:100%; border-left:none; } }

    .mobile-logo { display:flex; align-items:center; gap:.65rem; margin-bottom:1.75rem; }
    @media(min-width:900px){ .mobile-logo{ display:none; } }
    .mob-logo-box { width:36px; height:36px; border-radius:9px; background:linear-gradient(135deg,#2563eb,#1d4ed8); display:flex; align-items:center; justify-content:center; font-weight:900; font-size:.88rem; color:#fff; }
    .mob-logo-text { font-weight:700; color:#fff; }
    .mob-logo-text em { color:var(--cyan); font-style:normal; }

    .auth-heading { font-family:'Fraunces',serif; font-size:1.9rem; font-weight:700; margin-bottom:.3rem; }
    .auth-sub { color:var(--text-muted); font-size:.875rem; margin-bottom:1.6rem; }

    .google-btn { width:100%; padding:.72rem 1.2rem; background:rgba(255,255,255,.06); border:1.5px solid var(--glass-border); border-radius:12px; color:var(--text-primary); font-family:'DM Sans',sans-serif; font-size:.9rem; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:.75rem; transition:all .2s; margin-bottom:1.2rem; }
    .google-btn:hover { background:rgba(255,255,255,.1); }
    .g-icon { width:22px; height:22px; border-radius:50%; background:#fff; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:.78rem; color:#4285F4; flex-shrink:0; }

    .or-div { display:flex; align-items:center; gap:.9rem; margin-bottom:1.2rem; }
    .or-line { flex:1; height:1px; background:var(--glass-border); }
    .or-txt { font-size:.76rem; color:var(--text-muted); white-space:nowrap; }

    .form-row { display:grid; grid-template-columns:1fr 1fr; gap:.8rem; }
    .form-group { margin-bottom:.9rem; }
    .form-label { display:block; font-size:.73rem; font-weight:600; color:var(--text-muted); margin-bottom:.38rem; letter-spacing:.04em; text-transform:uppercase; }
    .form-input { width:100%; padding:.7rem 1rem; border-radius:11px; background:rgba(255,255,255,.05); border:1.5px solid var(--glass-border); color:var(--text-primary); font-family:'DM Sans',sans-serif; font-size:.875rem; transition:all .2s; outline:none; }
    .form-input:focus { border-color:var(--blue); background:rgba(58,141,222,.06); box-shadow:0 0 0 3px rgba(58,141,222,.12); }
    .form-input::placeholder { color:var(--text-muted); }
    .form-input.err { border-color:var(--red); }
    select.form-input option { background:var(--navy2); }
    textarea.form-input { resize:vertical; }

    .role-pills { display:flex; gap:.45rem; }
    .role-pill { flex:1; padding:.6rem .4rem; border-radius:10px; border:1.5px solid var(--glass-border); background:rgba(255,255,255,.04); color:var(--text-muted); font-family:'DM Sans',sans-serif; font-size:.8rem; font-weight:600; cursor:pointer; transition:all .2s; text-align:center; }
    .role-pill.active { background:rgba(37,99,235,.18); border-color:#3b82f6; color:#93c5fd; }

    .pw-wrap { position:relative; }
    .pw-eye { position:absolute; right:.85rem; top:50%; transform:translateY(-50%); background:none; border:none; color:var(--text-muted); cursor:pointer; display:flex; }

    .pw-bars { display:flex; gap:3px; margin-top:.38rem; }
    .pw-bar { flex:1; height:3px; border-radius:2px; background:rgba(255,255,255,.09); transition:background .3s; }

    .auth-btn { width:100%; padding:.8rem 1.25rem; background:linear-gradient(135deg,#2563eb,#1d4ed8); border:none; border-radius:12px; color:#fff; font-family:'DM Sans',sans-serif; font-size:.93rem; font-weight:700; cursor:pointer; transition:all .2s; margin-top:.2rem; display:flex; align-items:center; justify-content:center; gap:.5rem; box-shadow:0 6px 22px rgba(37,99,235,.33); }
    .auth-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 30px rgba(37,99,235,.43); }
    .auth-btn:disabled { opacity:.6; cursor:not-allowed; }

    /* ── FIX: switch link as button ── */
    .auth-switch { text-align:center; margin-top:1.15rem; font-size:.86rem; color:var(--text-muted); }
    .link-btn { background:none; border:none; color:#60a5fa; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:.86rem; padding:0; }
    .link-btn:hover { text-decoration:underline; }

    .demo-hint { margin-top:.9rem; padding:.7rem 1rem; background:rgba(244,185,66,.06); border:1px solid rgba(244,185,66,.15); border-radius:10px; }
    .demo-hint p { font-size:.73rem; }
    .demo-hint p:first-child { color:var(--text-muted); margin-bottom:.22rem; }
    .demo-hint p + p { color:var(--gold); }

    .quick-btns { display:flex; gap:.5rem; margin-bottom:.9rem; }
    .err-box { padding:.65rem 1rem; background:rgba(232,69,69,.12); border:1px solid rgba(232,69,69,.3); border-radius:10px; color:#f87272; font-size:.82rem; margin-bottom:.85rem; display:flex; align-items:center; gap:.5rem; }

    /* ── MAIN APP ── */
    .app-layout { min-height:100vh; display:flex; flex-direction:column; position:relative; }
    .stars-bg { position:fixed; inset:0; z-index:0; pointer-events:none; background: radial-gradient(ellipse at 20% 60%,#1a1060 0%,transparent 50%), radial-gradient(ellipse at 80% 10%,#102050 0%,transparent 40%), var(--navy); }

    .nav { position:sticky; top:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 2.5rem; height:62px; background:rgba(8,14,43,.92); backdrop-filter:blur(16px); border-bottom:1px solid var(--glass-border); }
    .nav-logo { display:flex; align-items:center; gap:.6rem; cursor:pointer; }
    .nav-logo-icon { width:34px; height:34px; border-radius:9px; background:linear-gradient(135deg,#2563eb,#1d4ed8); display:flex; align-items:center; justify-content:center; font-weight:900; font-size:.9rem; color:#fff; }
    .nav-logo-text { font-weight:700; font-size:1rem; color:#fff; }
    .nav-logo-text em { color:var(--cyan); font-style:normal; }
    .nav-right { display:flex; align-items:center; gap:.8rem; }
    .nav-av { width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg,var(--gold),#c47f00); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:.78rem; color:var(--navy); border:2px solid rgba(244,185,66,.38); }
    .nav-name { font-size:.84rem; font-weight:600; }
    .nav-badge { font-size:.67rem; font-weight:700; letter-spacing:.05em; text-transform:uppercase; padding:2px 8px; border-radius:20px; }
    .badge-admin   { background:rgba(244,185,66,.14); color:var(--gold); border:1px solid rgba(244,185,66,.28); }
    .badge-student { background:rgba(58,141,222,.14); color:#6ab4f5;    border:1px solid rgba(58,141,222,.28); }
    .btn-icon { width:33px; height:33px; border-radius:8px; border:1px solid var(--glass-border); background:var(--glass); color:var(--text-muted); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .2s; }
    .btn-icon:hover { background:rgba(232,69,69,.12); color:#f87272; border-color:rgba(232,69,69,.3); }

    .main { flex:1; padding:2rem 2.5rem; max-width:1400px; margin:0 auto; width:100%; position:relative; z-index:1; }
    @media(max-width:768px){ .main{ padding:1rem; } .nav{ padding:0 1rem; } }

    .hero { border-radius:20px; padding:2.5rem 3rem; background:linear-gradient(135deg,#1a2860,#0d1840); border:1px solid var(--glass-border); margin-bottom:2rem; position:relative; overflow:hidden; }
    .hero::before { content:''; position:absolute; top:-40%; right:-8%; width:360px; height:360px; border-radius:50%; background:radial-gradient(circle,rgba(244,185,66,.09) 0,transparent 70%); }
    .hero-title { font-family:'Fraunces',serif; font-size:2rem; font-weight:700; line-height:1.2; margin-bottom:.5rem; }
    .hero-title em { color:var(--gold); font-style:italic; }
    .hero-sub { color:var(--text-muted); font-size:.875rem; max-width:460px; }
    .hero-stats { display:flex; gap:2rem; margin-top:1.35rem; }
    .hs-num { font-family:'Fraunces',serif; font-size:1.7rem; font-weight:700; color:var(--gold); }
    .hs-lbl { font-size:.72rem; color:var(--text-muted); }
    @media(max-width:600px){ .hero{ padding:1.5rem; } .hero-title{ font-size:1.5rem; } }

    .sw { position:relative; margin-bottom:1.2rem; }
    .sw svg { position:absolute; left:1rem; top:50%; transform:translateY(-50%); color:var(--text-muted); }
    .sinp { width:100%; padding:.7rem 1rem .7rem 2.7rem; border-radius:12px; border:1.5px solid var(--glass-border); background:rgba(255,255,255,.05); color:var(--text-primary); font-family:'DM Sans',sans-serif; font-size:.875rem; outline:none; transition:all .2s; }
    .sinp:focus { border-color:var(--blue); }
    .sinp::placeholder { color:var(--text-muted); }

    .chips { display:flex; flex-wrap:wrap; gap:.48rem; margin-bottom:1.35rem; }
    .chip { padding:.3rem .82rem; border-radius:20px; border:1.5px solid var(--glass-border); background:var(--glass); color:var(--text-muted); font-size:.77rem; font-weight:500; cursor:pointer; transition:all .2s; }
    .chip:hover { border-color:var(--gold); color:var(--gold); }
    .chip.active { background:rgba(244,185,66,.12); border-color:var(--gold); color:var(--gold); }

    .sec-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.05rem; }
    .sec-title { font-family:'Fraunces',serif; font-size:1.25rem; font-weight:700; }
    .sec-title em { color:var(--gold); font-style:italic; }
    .sec-cnt { font-size:.76rem; color:var(--text-muted); background:var(--glass); padding:3px 10px; border-radius:20px; border:1px solid var(--glass-border); }

    .tabs { display:flex; gap:2px; background:rgba(0,0,0,.25); border-radius:12px; padding:4px; margin-bottom:1.7rem; width:fit-content; }
    .tab { padding:.46rem 1.1rem; border-radius:9px; border:none; font-family:'DM Sans',sans-serif; font-size:.83rem; font-weight:600; cursor:pointer; transition:all .2s; color:var(--text-muted); background:transparent; }
    .tab.active { background:rgba(244,185,66,.13); color:var(--gold); border:1px solid rgba(244,185,66,.2); }
    .tab:hover:not(.active) { color:var(--text-primary); background:var(--glass); }

    .btn { display:inline-flex; align-items:center; gap:.42rem; padding:.5rem 1.1rem; border-radius:10px; border:none; font-family:'DM Sans',sans-serif; font-size:.83rem; font-weight:600; cursor:pointer; transition:all .2s; }
    .btn:disabled { opacity:.5; cursor:not-allowed; }
    .btn-primary { background:linear-gradient(135deg,#2563eb,#1d4ed8); color:#fff; box-shadow:0 4px 14px rgba(37,99,235,.28); }
    .btn-primary:hover:not(:disabled) { transform:translateY(-1px); }
    .btn-gold { background:linear-gradient(135deg,var(--gold),#d4940a); color:var(--navy); box-shadow:0 4px 14px rgba(244,185,66,.24); }
    .btn-gold:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 6px 20px rgba(244,185,66,.34); }
    .btn-ghost { background:var(--glass); color:var(--text-primary); border:1px solid var(--glass-border); }
    .btn-ghost:hover:not(:disabled) { background:rgba(255,255,255,.1); }
    .btn-danger { background:rgba(232,69,69,.13); color:#f87272; border:1px solid rgba(232,69,69,.27); }
    .btn-danger:hover:not(:disabled) { background:rgba(232,69,69,.23); }
    .btn-success { background:rgba(46,201,126,.12); color:var(--green); border:1px solid rgba(46,201,126,.26); }
    .btn-sm { padding:.3rem .78rem; font-size:.76rem; }
    .btn-lg { padding:.72rem 1.7rem; font-size:.93rem; border-radius:12px; }
    .btn-full { width:100%; justify-content:center; }

    .evgrid { display:grid; grid-template-columns:repeat(auto-fill,minmax(285px,1fr)); gap:1.1rem; }
    .evcard { background:rgba(10,18,60,.85); border:1px solid var(--glass-border); border-radius:18px; overflow:hidden; transition:all .25s; cursor:pointer; position:relative; }
    .evcard:hover { transform:translateY(-4px); border-color:rgba(244,185,66,.28); box-shadow:0 14px 42px rgba(0,0,0,.38); }
    .ev-banner { height:118px; display:flex; align-items:center; justify-content:center; font-size:2.7rem; position:relative; }
    .ev-body { padding:1.05rem; }
    .ev-cat { display:inline-flex; align-items:center; gap:.38rem; font-size:.68rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; margin-bottom:.5rem; }
    .dot6 { width:6px; height:6px; border-radius:50%; display:inline-block; flex-shrink:0; }
    .ev-title { font-family:'Fraunces',serif; font-size:.98rem; font-weight:700; margin-bottom:.35rem; line-height:1.3; }
    .ev-meta { color:var(--text-muted); font-size:.76rem; display:flex; flex-direction:column; gap:.2rem; margin-bottom:.8rem; }
    .ev-meta-row { display:flex; align-items:center; gap:.35rem; }
    .capbw { height:4px; background:rgba(255,255,255,.07); border-radius:2px; margin-bottom:.42rem; }
    .capb  { height:100%; border-radius:2px; transition:width .4s; }
    .capt  { font-size:.68rem; color:var(--text-muted); }
    .ev-footer { display:flex; align-items:center; justify-content:space-between; }
    .reg-badge  { position:absolute; top:.65rem; right:.65rem; background:rgba(46,201,126,.18); color:var(--green); border:1px solid rgba(46,201,126,.35); border-radius:20px; padding:2px 9px; font-size:.67rem; font-weight:700; }
    .past-badge { position:absolute; top:.65rem; right:.65rem; background:rgba(0,0,0,.35); color:var(--text-muted); border:1px solid var(--glass-border); border-radius:20px; padding:2px 9px; font-size:.67rem; font-weight:700; }

    .mo   { position:fixed; inset:0; z-index:200; background:rgba(0,0,0,.72); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; padding:1.5rem; }
    .mbox { width:100%; max-width:530px; max-height:90vh; overflow-y:auto; background:#0d1848; border:1px solid var(--glass-border); border-radius:22px; padding:1.7rem; box-shadow:0 28px 70px rgba(0,0,0,.6); animation:fadeUp .3s ease; }
    .m-hdr { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:1.2rem; }
    .m-title { font-family:'Fraunces',serif; font-size:1.35rem; font-weight:700; }
    .m-close { width:30px; height:30px; border-radius:7px; border:1px solid var(--glass-border); background:var(--glass); color:var(--text-muted); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .2s; flex-shrink:0; }
    .m-close:hover { background:rgba(232,69,69,.14); color:var(--red); }
    .m-banner { height:148px; border-radius:13px; display:flex; align-items:center; justify-content:center; font-size:3.7rem; margin-bottom:1.05rem; }
    .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:.62rem; margin-bottom:1.05rem; }
    .ibox { background:rgba(255,255,255,.04); border:1px solid var(--glass-border); border-radius:9px; padding:.62rem .88rem; }
    .ilbl { font-size:.67rem; text-transform:uppercase; letter-spacing:.06em; color:var(--text-muted); margin-bottom:.16rem; }
    .ival { font-size:.86rem; font-weight:600; }
    .ev-desc { color:var(--text-muted); font-size:.84rem; line-height:1.65; margin-bottom:1.05rem; }

    .stat-row { display:grid; grid-template-columns:repeat(4,1fr); gap:.88rem; margin-bottom:1.55rem; }
    @media(max-width:700px){ .stat-row{ grid-template-columns:1fr 1fr; } }
    .sc { background:rgba(10,18,60,.85); border:1px solid var(--glass-border); border-radius:15px; padding:1.1rem 1.3rem; }
    .slbl { font-size:.7rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:.06em; margin-bottom:.22rem; }
    .sval { font-family:'Fraunces',serif; font-size:1.85rem; font-weight:700; }
    .ssub { font-size:.7rem; color:var(--text-muted); margin-top:.18rem; }

    .tbl-wrap { background:rgba(10,18,60,.85); border:1px solid var(--glass-border); border-radius:16px; overflow:hidden; overflow-x:auto; }
    .tbl { width:100%; border-collapse:collapse; }
    .tbl th { padding:.82rem 1.05rem; text-align:left; font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--text-muted); border-bottom:1px solid var(--glass-border); background:rgba(255,255,255,.02); white-space:nowrap; }
    .tbl td { padding:.82rem 1.05rem; border-bottom:1px solid rgba(255,255,255,.04); font-size:.84rem; }
    .tbl tr:last-child td { border-bottom:none; }
    .tbl tr:hover td { background:rgba(255,255,255,.02); }
    .sbadge { display:inline-flex; align-items:center; padding:3px 9px; border-radius:20px; font-size:.68rem; font-weight:700; text-transform:uppercase; }
    .sb-up   { background:rgba(58,141,222,.12); color:#6ab4f5; border:1px solid rgba(58,141,222,.22); }
    .sb-past { background:rgba(100,100,100,.12); color:#888; border:1px solid rgba(100,100,100,.18); }
    .sb-pub  { background:rgba(46,201,126,.1);  color:var(--green); border:1px solid rgba(46,201,126,.2); }
    .sb-dft  { background:rgba(244,185,66,.09); color:var(--gold);  border:1px solid rgba(244,185,66,.2); }

    .reg-list { display:flex; flex-direction:column; gap:.52rem; }
    .reg-item { display:flex; align-items:center; gap:.88rem; padding:.82rem 1.05rem; background:rgba(255,255,255,.03); border:1px solid var(--glass-border); border-radius:11px; }
    .reg-av { width:35px; height:35px; border-radius:50%; background:linear-gradient(135deg,var(--blue),var(--purple)); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:.78rem; color:#fff; flex-shrink:0; }
    .reg-name  { font-weight:600; font-size:.86rem; }
    .reg-email { font-size:.73rem; color:var(--text-muted); }

    .ce-grid { display:grid; grid-template-columns:1fr 1fr; gap:.82rem; }
    @media(max-width:580px){ .ce-grid{ grid-template-columns:1fr; } }
    .divider { border:none; border-top:1px solid var(--glass-border); margin:1.2rem 0; }

    .toast-wrap { position:fixed; top:70px; right:1.2rem; z-index:300; display:flex; flex-direction:column; gap:.42rem; }
    .toast { padding:.68rem 1.1rem; border-radius:11px; font-size:.84rem; font-weight:500; min-width:245px; max-width:315px; border:1px solid; box-shadow:0 6px 20px rgba(0,0,0,.4); animation:fadeUp .3s ease; display:flex; align-items:center; gap:.52rem; }
    .t-success { background:rgba(46,201,126,.13); border-color:rgba(46,201,126,.3); color:var(--green); }
    .t-error   { background:rgba(232,69,69,.13);  border-color:rgba(232,69,69,.3);  color:#f87272; }
    .t-info    { background:rgba(58,141,222,.13);  border-color:rgba(58,141,222,.3);  color:#6ab4f5; }

    .empty { text-align:center; padding:3.5rem 2rem; }
    .empty-icon  { font-size:2.9rem; margin-bottom:.85rem; animation:float 3s ease infinite; }
    .empty-title { font-family:'Fraunces',serif; font-size:1.15rem; margin-bottom:.38rem; }
    .empty-sub   { color:var(--text-muted); font-size:.86rem; }
    .spinner { border:2.5px solid rgba(255,255,255,.14); border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite; }
  `}</style>
);

/* ── Data ── */
const CATS = [
  { id:"all",      label:"All Events", color:"#f4b942" },
  { id:"tech",     label:"Tech",       color:"#3a8dde" },
  { id:"cultural", label:"Cultural",   color:"#8b5cf6" },
  { id:"sports",   label:"Sports",     color:"#2ec97e" },
  { id:"academic", label:"Academic",   color:"#f87272" },
  { id:"workshop", label:"Workshop",   color:"#fb923c" },
];
const BANNERS = {
  tech:     { bg:"linear-gradient(135deg,#0f3460,#1a6098)", e:"💻" },
  cultural: { bg:"linear-gradient(135deg,#3a0060,#7c00a0)", e:"🎭" },
  sports:   { bg:"linear-gradient(135deg,#004d26,#007a3d)", e:"⚽" },
  academic: { bg:"linear-gradient(135deg,#600000,#9e0000)", e:"🎓" },
  workshop: { bg:"linear-gradient(135deg,#5a2d00,#a05a00)", e:"🛠️" },
};
const today   = new Date();
const addDays = d => { const x = new Date(today); x.setDate(x.getDate() + d); return x.toISOString().slice(0,10); };
const isPast  = s => new Date(s) < new Date(today.toDateString());
const fmtDate = d => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
const ini     = n => n.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2);

const SEED_USERS = [
  { id:"s1", name:"Arjun Mehta",      email:"arjun@college.edu", mobile:"9876543210", password:"student123", role:"student" },
  { id:"s2", name:"Priya Sharma",     email:"priya@college.edu", mobile:"9876543211", password:"student123", role:"student" },
  { id:"a1", name:"Dr. Rajesh Kumar", email:"admin@college.edu", mobile:"9876543200", password:"admin123",   role:"admin"   },
];
const SEED_EVENTS = [
  { id:1, title:"AI & Machine Learning Summit",  cat:"tech",     date:addDays(3),  time:"10:00 AM", venue:"Auditorium A",    org:"CS Dept.",       cap:150, desc:"Explore cutting-edge AI and ML. Industry experts share insights on transformers, RL, and AI ethics.",    pub:true, regs:[] },
  { id:2, title:"Annual Cultural Fest 2025",      cat:"cultural", date:addDays(7),  time:"5:00 PM",  venue:"Open Ground",     org:"Student Council", cap:500, desc:"Vibrant celebration of diverse cultures, dance, music, and art.",                                         pub:true, regs:[] },
  { id:3, title:"Inter-College Cricket Tourney",  cat:"sports",   date:addDays(10), time:"8:00 AM",  venue:"Sports Complex",  org:"Sports Dept.",    cap:200, desc:"Cheer for your college team in the biggest inter-college cricket tournament!",                             pub:true, regs:[] },
  { id:4, title:"Research Paper Symposium",       cat:"academic", date:addDays(5),  time:"9:00 AM",  venue:"Seminar Hall B",  org:"Research Cell",   cap:80,  desc:"Present and discuss undergraduate research papers across CS, physics, biotech, and economics.",            pub:true, regs:[] },
  { id:5, title:"Full-Stack Dev Bootcamp",        cat:"workshop", date:addDays(14), time:"2:00 PM",  venue:"Lab 301",         org:"DevClub",         cap:40,  desc:"Hands-on intensive covering React, Node.js, Express, and MySQL. Build a full-stack app from scratch.",   pub:true, regs:[] },
  { id:6, title:"Hackathon 36hr Edition",         cat:"tech",     date:addDays(21), time:"6:00 PM",  venue:"Innovation Hub",  org:"CS Dept.",        cap:120, desc:"36 continuous hours of coding and innovation. Solo or team of up to 4. Exciting prizes await.",          pub:true, regs:[] },
  { id:7, title:"Photography Exhibition",         cat:"cultural", date:addDays(-3), time:"11:00 AM", venue:"Art Gallery",     org:"Photo Club",      cap:100, desc:"Extraordinary work from students across campus. Over 200 photographs on display.",                        pub:true, regs:[] },
  { id:8, title:"Entrepreneurship Conclave",      cat:"academic", date:addDays(18), time:"10:00 AM", venue:"Conference Hall", org:"E-Cell",          cap:250, desc:"Connect with alumni entrepreneurs and VCs. Pitch your ideas, win funding.",                               pub:true, regs:[] },
];

/* ── Hooks ── */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = (msg, type = "info") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };
  return { toasts, success: m => add(m,"success"), error: m => add(m,"error"), info: m => add(m,"info") };
}

/* ── SVG Icons ── */
const EyeOn  = () => <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx={12} cy={12} r={3}/></svg>;
const EyeOff = () => <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1={1} y1={1} x2={23} y2={23}/></svg>;
const XIcon  = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><line x1={18} y1={6} x2={6} y2={18}/><line x1={6} y1={6} x2={18} y2={18}/></svg>;
const PlusIco= () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><line x1={12} y1={5} x2={12} y2={19}/><line x1={5} y1={12} x2={19} y2={12}/></svg>;
const LogOut = () => <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1={21} y1={12} x2={9} y2={12}/></svg>;
const UsrIco = () => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx={9} cy={7} r={4}/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
const TrshIco= () => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>;
const SearchIco = () => <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx={11} cy={11} r={8}/><path d="M21 21l-4.35-4.35"/></svg>;

/* ── Toasts ── */
function Toasts({ toasts }) {
  const ic = { success:"✅", error:"❌", info:"ℹ️" };
  return (
    <div className="toast-wrap">
      {toasts.map(t => <div key={t.id} className={`toast t-${t.type}`}>{ic[t.type]} {t.msg}</div>)}
    </div>
  );
}

/* ── Password strength ── */
function PwStrength({ pw }) {
  const s = pw.length === 0 ? 0 : pw.length < 5 ? 1 : pw.length < 8 ? 2 : /[A-Z]/.test(pw) && /[0-9]/.test(pw) ? 4 : 3;
  const c = ["","#ef4444","#f97316","#eab308","#22c55e"];
  return (
    <div className="pw-bars">
      {[1,2,3,4].map(i => <div key={i} className="pw-bar" style={{ background: i <= s ? c[s] : undefined }} />)}
    </div>
  );
}

/* ── Campus left panel ── */
function CampusPanel() {
  const bldgs = [
    {l:"4%",  w:"16%", h:"52%", n:12},
    {l:"21%", w:"20%", h:"70%", n:18},
    {l:"43%", w:"15%", h:"46%", n:9 },
    {l:"60%", w:"22%", h:"63%", n:15},
    {l:"84%", w:"14%", h:"40%", n:6 },
  ];
  return (
    <div className="auth-left">
      <div className="auth-left-bg" />
      <div className="auth-left-scene">
        {bldgs.map((b, i) => (
          <div key={i} className="bldg" style={{ left:b.l, width:b.w, height:b.h }}>
            <div className="bldg-wins">
              {Array.from({ length: b.n }).map((_, j) => (
                <div key={j} className={`bw ${Math.random() > .45 ? "lit" : ""}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="auth-panel-logo">
        <div className="panel-logo-box">CE</div>
        <span className="panel-logo-text">Campus<em>Events</em></span>
      </div>
      <div className="auth-left-overlay">
        <p className="auth-quote">Discover <em>amazing</em> events on your campus</p>
        <p className="auth-quote-sub">Register, explore, and never miss what's happening around you.</p>
        <div className="auth-dots">
          <div className="adot active" /><div className="adot" /><div className="adot" />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   SIGNUP
════════════════════════════════════════ */
function Signup({ onSwitch, onLogin, toast, users, setUsers }) {
  const [form, setForm]     = useState({ name:"", email:"", mobile:"", password:"", role:"student" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr]       = useState("");

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErr(""); };

  const validate = () => {
    if (!form.name.trim())                      return "Full name is required.";
    if (!form.email.includes("@"))              return "Enter a valid email address.";
    if (users.find(u => u.email === form.email)) return "Email already registered — sign in instead.";
    if (!/^\d{10}$/.test(form.mobile))          return "Enter a valid 10-digit mobile number.";
    if (form.password.length < 6)               return "Password must be at least 6 characters.";
    return "";
  };

  const submit = () => {
    const e = validate();
    if (e) { setErr(e); return; }
    setLoading(true);
    setTimeout(() => {
      const nu = { id: "u" + Date.now(), ...form };
      setUsers(prev => [...prev, nu]);
      toast.success(`Welcome, ${form.name.split(" ")[0]}! Account created 🎉`);
      onLogin(nu);
    }, 900);
  };

  return (
    <div className="auth-root">
      <CampusPanel />
      <div className="auth-right">
        <div className="mobile-logo fu">
          <div className="mob-logo-box">CE</div>
          <span className="mob-logo-text">Campus<em>Events</em></span>
        </div>
        <h1 className="auth-heading fu">Create account</h1>
        <p className="auth-sub fu">Register to access college events</p>

        {err && <div className="err-box fi">⚠️ {err}</div>}

        <div className="form-row fu2">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              className={`form-input ${err && !form.name.trim() ? "err" : ""}`}
              placeholder="Rahul Verma"
              value={form.name}
              onChange={e => set("name", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <div className="role-pills">
              <button className={`role-pill ${form.role === "student" ? "active" : ""}`} onClick={() => set("role","student")}>👨‍🎓 Student</button>
              <button className={`role-pill ${form.role === "admin"   ? "active" : ""}`} onClick={() => set("role","admin")}>🔧 Admin</button>
            </div>
          </div>
        </div>

        <div className="form-group fu2">
          <label className="form-label">Email Address *</label>
          <input className="form-input" type="email" placeholder="you@college.edu"
            value={form.email} onChange={e => set("email", e.target.value)} />
        </div>

        <div className="form-group fu3">
          <label className="form-label">Mobile Number *</label>
          <div className="pw-wrap">
            <span style={{ position:"absolute", left:"1rem", top:"50%", transform:"translateY(-50%)", color:"var(--text-muted)", fontSize:".84rem", fontWeight:600 }}>+91</span>
            <input className="form-input" placeholder="98765 43210" style={{ paddingLeft:"3.2rem" }}
              value={form.mobile} onChange={e => set("mobile", e.target.value.replace(/\D/g,"").slice(0,10))} />
          </div>
        </div>

        <div className="form-group fu3">
          <label className="form-label">Password * <span style={{ color:"var(--text-muted)", textTransform:"none", letterSpacing:0, fontWeight:400 }}>(min 6 chars)</span></label>
          <div className="pw-wrap">
            <input className="form-input" type={showPw ? "text" : "password"} placeholder="••••••••"
              style={{ paddingRight:"2.8rem" }} value={form.password}
              onChange={e => set("password", e.target.value)}
              onKeyDown={e => e.key === "Enter" && submit()} />
            <button className="pw-eye" onClick={() => setShowPw(v => !v)}>{showPw ? <EyeOff /> : <EyeOn />}</button>
          </div>
          {form.password && <PwStrength pw={form.password} />}
        </div>

        <button className="auth-btn fu4" onClick={submit} disabled={loading}>
          {loading ? <span className="spinner" style={{ width:18, height:18 }} /> : "Create Account →"}
        </button>

        {/* ✅ FIX: use <button> instead of <a> */}
        <p className="auth-switch fu5">
          Already registered?{" "}
          <button className="link-btn" onClick={onSwitch}>Sign in</button>
        </p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   LOGIN
════════════════════════════════════════ */
function Login({ onSwitch, onLogin, toast, users }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [err,      setErr]      = useState("");

  const submit = () => {
    if (!email || !password) { setErr("Please fill in both fields."); return; }
    setLoading(true);
    setTimeout(() => {
      const u = users.find(u => u.email === email && u.password === password);
      if (u) { toast.success(`Welcome back, ${u.name.split(" ")[0]}! 👋`); onLogin(u); }
      else   { setErr("Incorrect email or password."); setLoading(false); }
    }, 850);
  };

  const quickFill = (role) => {
    setEmail(role === "admin" ? "admin@college.edu" : "arjun@college.edu");
    setPassword(role === "admin" ? "admin123" : "student123");
    setErr("");
  };

  return (
    <div className="auth-root">
      <CampusPanel />
      <div className="auth-right">
        <div className="mobile-logo fu">
          <div className="mob-logo-box">CE</div>
          <span className="mob-logo-text">Campus<em>Events</em></span>
        </div>
        <h1 className="auth-heading fu">Welcome back</h1>
        <p className="auth-sub fu">Sign in to your campus account</p>

        <button className="google-btn fu2" onClick={() => toast.info("Google sign-in coming soon!")}>
          <div className="g-icon">G</div>
          Continue with Google
        </button>

        <div className="or-div fu2">
          <div className="or-line" /><span className="or-txt">or sign in with email</span><div className="or-line" />
        </div>

        {err && <div className="err-box fi">⚠️ {err}</div>}

        <div className="form-group fu3">
          <label className="form-label">Email Address</label>
          <input className="form-input" type="email" placeholder="you@college.edu"
            value={email} onChange={e => { setEmail(e.target.value); setErr(""); }} />
        </div>

        <div className="form-group fu3">
          <label className="form-label">Password</label>
          <div className="pw-wrap">
            <input className="form-input" type={showPw ? "text" : "password"} placeholder="••••••••"
              style={{ paddingRight:"2.8rem" }} value={password}
              onChange={e => { setPassword(e.target.value); setErr(""); }}
              onKeyDown={e => e.key === "Enter" && submit()} />
            <button className="pw-eye" onClick={() => setShowPw(v => !v)}>{showPw ? <EyeOff /> : <EyeOn />}</button>
          </div>
        </div>

        <div className="quick-btns fu3">
          <button className="btn btn-ghost btn-sm btn-full" onClick={() => quickFill("student")}>👨‍🎓 Demo Student</button>
          <button className="btn btn-ghost btn-sm btn-full" onClick={() => quickFill("admin")}>🔧 Demo Admin</button>
        </div>

        <button className="auth-btn fu4" onClick={submit} disabled={loading}>
          {loading ? <span className="spinner" style={{ width:18, height:18 }} /> : "Sign In →"}
        </button>

        {/* ✅ FIX: use <button> instead of <a> */}
        <p className="auth-switch fu5">
          No account?{" "}
          <button className="link-btn" onClick={onSwitch}>Create one</button>
        </p>

        <div className="demo-hint fu5">
          <p>🔑 Demo credentials:</p>
          <p>Student · arjun@college.edu / student123</p>
          <p>Admin &nbsp;· admin@college.edu / admin123</p>
        </div>
      </div>
    </div>
  );
}

/* ── Event Card ── */
function EventCard({ ev, user, onOpen, onReg }) {
  const cat  = CATS.find(c => c.id === ev.cat);
  const bn   = BANNERS[ev.cat];
  const past = isPast(ev.date);
  const regd = ev.regs.includes(user?.id);
  const full = ev.regs.length >= ev.cap;
  const pct  = Math.round((ev.regs.length / ev.cap) * 100);
  return (
    <div className="evcard fu" onClick={() => onOpen(ev)}>
      <div className="ev-banner" style={{ background: bn.bg }}>
        {bn.e}
        {regd && <span className="reg-badge">✓ Registered</span>}
        {past && !regd && <span className="past-badge">Past</span>}
      </div>
      <div className="ev-body">
        <div className="ev-cat" style={{ color: cat.color }}>
          <span className="dot6" style={{ background: cat.color }} />{cat.label}
        </div>
        <h3 className="ev-title">{ev.title}</h3>
        <div className="ev-meta">
          <div className="ev-meta-row">
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x={3} y={4} width={18} height={18} rx={2}/><line x1={3} y1={10} x2={21} y2={10}/></svg>
            {fmtDate(ev.date)} · {ev.time}
          </div>
          <div className="ev-meta-row">
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx={12} cy={10} r={3}/></svg>
            {ev.venue}
          </div>
        </div>
        <div className="capbw"><div className="capb" style={{ width:`${pct}%`, background: pct>85?"var(--red)":pct>60?"var(--gold)":"var(--green)" }}/></div>
        <div className="ev-footer">
          <span className="capt">{ev.regs.length}/{ev.cap} seats</span>
          {user?.role === "student" && !past && (
            <button
              className={`btn btn-sm ${regd ? "btn-danger" : full ? "btn-ghost" : "btn-gold"}`}
              style={full && !regd ? { opacity:.5, cursor:"not-allowed" } : {}}
              onClick={e => { e.stopPropagation(); if (!full || regd) onReg(ev); }}>
              {regd ? "Unregister" : full ? "Full" : "Register"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Event Detail Modal ── */
function EventModal({ ev, user, onClose, onReg }) {
  const cat  = CATS.find(c => c.id === ev.cat);
  const bn   = BANNERS[ev.cat];
  const past = isPast(ev.date);
  const regd = ev.regs.includes(user?.id);
  const full = ev.regs.length >= ev.cap;
  const pct  = Math.round((ev.regs.length / ev.cap) * 100);
  return (
    <div className="mo" onClick={onClose}>
      <div className="mbox" onClick={e => e.stopPropagation()}>
        <div className="m-hdr">
          <h2 className="m-title">{ev.title}</h2>
          <button className="m-close" onClick={onClose}><XIcon /></button>
        </div>
        <div className="m-banner" style={{ background: bn.bg }}>{bn.e}</div>
        <div style={{ display:"flex", alignItems:"center", gap:".48rem", marginBottom:".85rem" }}>
          <span className="dot6" style={{ background: cat.color, width:8, height:8 }} />
          <span style={{ color: cat.color, fontSize:".72rem", fontWeight:700, textTransform:"uppercase", letterSpacing:".06em" }}>{cat.label}</span>
          <span className={`sbadge ${past ? "sb-past" : "sb-pub"}`} style={{ marginLeft:"auto" }}>{past ? "Past" : "Upcoming"}</span>
        </div>
        <p className="ev-desc">{ev.desc}</p>
        <div className="info-grid">
          {[["📅 Date", fmtDate(ev.date)], ["🕐 Time", ev.time], ["📍 Venue", ev.venue], ["🏛️ Organizer", ev.org]].map(([l,v]) => (
            <div key={l} className="ibox"><div className="ilbl">{l}</div><div className="ival">{v}</div></div>
          ))}
        </div>
        <div className="capbw" style={{ height:6, borderRadius:3 }}>
          <div className="capb" style={{ width:`${pct}%`, background: pct>85?"var(--red)":pct>60?"var(--gold)":"var(--green)", borderRadius:3 }} />
        </div>
        <p className="capt" style={{ margin:".32rem 0 1rem" }}>{ev.regs.length}/{ev.cap} seats filled ({pct}%)</p>
        {user?.role === "student" && !past && (
          <button
            className={`btn btn-full btn-lg ${regd ? "btn-danger" : full ? "btn-ghost" : "btn-gold"}`}
            style={full && !regd ? { opacity:.5, cursor:"not-allowed" } : {}}
            onClick={() => { if (!full || regd) { onReg(ev); onClose(); } }}>
            {regd ? "❌ Cancel Registration" : full ? "Event is Full" : "✅ Register for this Event"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   STUDENT DASHBOARD
════════════════════════════════════════ */
function StudentDash({ user, events, setEvents, toast }) {
  const [search, setSearch] = useState("");
  const [catF,   setCatF]   = useState("all");
  const [tab,    setTab]    = useState("discover");
  const [selEv,  setSelEv]  = useState(null);

  const handleReg = (ev) => {
    setEvents(evs => evs.map(e => {
      if (e.id !== ev.id) return e;
      const already = e.regs.includes(user.id);
      if (already) { toast.info(`Unregistered from "${e.title}"`); return { ...e, regs: e.regs.filter(id => id !== user.id) }; }
      toast.success(`Registered for "${e.title}" 🎉`);
      return { ...e, regs: [...e.regs, user.id] };
    }));
  };

  const upcoming = events.filter(e => e.pub && !isPast(e.date));
  const pastEvs  = events.filter(e => e.pub && isPast(e.date));
  const myRegs   = events.filter(e => e.regs.includes(user.id));
  const pool     = tab === "discover" ? upcoming : tab === "past" ? pastEvs : myRegs;
  const filtered = pool.filter(e => (catF === "all" || e.cat === catF) && e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="hero fu">
        <div className="hero-title">Discover <em>amazing</em> campus events</div>
        <p className="hero-sub">Register for events that excite you. Never miss what's happening on campus.</p>
        <div className="hero-stats">
          <div><div className="hs-num">{upcoming.length}</div><div className="hs-lbl">Upcoming</div></div>
          <div><div className="hs-num">{myRegs.length}</div><div className="hs-lbl">My Registrations</div></div>
          <div><div className="hs-num">{events.filter(e => !isPast(e.date) && e.regs.length < e.cap).length}</div><div className="hs-lbl">Open Spots</div></div>
        </div>
      </div>

      <div className="tabs fu2">
        <button className={`tab ${tab==="discover"?"active":""}`} onClick={() => setTab("discover")}>🔭 Discover</button>
        <button className={`tab ${tab==="past"?"active":""}`}     onClick={() => setTab("past")}>📋 Past</button>
        <button className={`tab ${tab==="mine"?"active":""}`}     onClick={() => setTab("mine")}>🎟️ My Tickets ({myRegs.length})</button>
      </div>

      <div className="sw fu2">
        <SearchIco />
        <input className="sinp" placeholder="Search events…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {tab !== "mine" && (
        <div className="chips fu3">
          {CATS.map(c => (
            <button key={c.id} className={`chip ${catF===c.id?"active":""}`}
              style={catF===c.id ? { borderColor:c.color, color:c.color, background:`${c.color}14` } : {}}
              onClick={() => setCatF(c.id)}>{c.label}
            </button>
          ))}
        </div>
      )}

      <div className="sec-hdr fu3">
        <h2 className="sec-title">
          {tab==="discover" ? <><span>Upcoming </span><em>Events</em></> : tab==="past" ? "Past Events" : <><span>My </span><em>Registrations</em></>}
        </h2>
        <span className="sec-cnt">{filtered.length} events</span>
      </div>

      {filtered.length === 0
        ? <div className="empty"><div className="empty-icon">{tab==="mine"?"🎟️":"🔍"}</div><h3 className="empty-title">{tab==="mine"?"No registrations yet":"No events found"}</h3><p className="empty-sub">{tab==="mine"?"Explore upcoming events and register.":"Try a different search or filter."}</p></div>
        : <div className="evgrid">{filtered.map(e => <EventCard key={e.id} ev={e} user={user} onOpen={setSelEv} onReg={handleReg} />)}</div>
      }

      {selEv && <EventModal ev={selEv} user={user} onClose={() => setSelEv(null)} onReg={ev => { handleReg(ev); setSelEv(null); }} />}
    </>
  );
}

/* ── Create Event Modal ── */
function CreateEvModal({ onClose, onCreate, toast }) {
  const [form, setForm]     = useState({ title:"", cat:"tech", date:addDays(7), time:"10:00 AM", venue:"", org:"", cap:100, desc:"", pub:true });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]:v }));
  const submit = () => {
    if (!form.title || !form.venue || !form.org || !form.desc) { toast.error("Fill all required fields."); return; }
    setLoading(true);
    setTimeout(() => { onCreate(form); toast.success(`"${form.title}" created!`); onClose(); }, 600);
  };
  return (
    <div className="mo" onClick={onClose}>
      <div className="mbox" style={{ maxWidth:600 }} onClick={e => e.stopPropagation()}>
        <div className="m-hdr"><h2 className="m-title">✨ Create New Event</h2><button className="m-close" onClick={onClose}><XIcon /></button></div>
        <div className="ce-grid">
          <div className="form-group" style={{ gridColumn:"1/-1" }}>
            <label className="form-label">Event Title *</label>
            <input className="form-input" placeholder="e.g. Spring Tech Conference" value={form.title} onChange={e => set("title", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-input" value={form.cat} onChange={e => set("cat", e.target.value)}>
              {CATS.filter(c => c.id !== "all").map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Organizer *</label>
            <input className="form-input" placeholder="e.g. CS Department" value={form.org} onChange={e => set("org", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input type="date" className="form-input" value={form.date} onChange={e => set("date", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Time</label>
            <input className="form-input" placeholder="10:00 AM" value={form.time} onChange={e => set("time", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Venue *</label>
            <input className="form-input" placeholder="e.g. Main Auditorium" value={form.venue} onChange={e => set("venue", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Capacity</label>
            <input type="number" className="form-input" min={10} max={2000} value={form.cap} onChange={e => set("cap", Number(e.target.value))} />
          </div>
          <div className="form-group" style={{ gridColumn:"1/-1" }}>
            <label className="form-label">Description *</label>
            <textarea className="form-input" rows={3} placeholder="Brief description…" value={form.desc} onChange={e => set("desc", e.target.value)} />
          </div>
          <div style={{ gridColumn:"1/-1", display:"flex", alignItems:"center", gap:".6rem" }}>
            <input type="checkbox" id="pub" checked={form.pub} onChange={e => set("pub", e.target.checked)} style={{ accentColor:"var(--gold)", width:15, height:15 }} />
            <label htmlFor="pub" style={{ fontSize:".875rem", cursor:"pointer" }}>Publish immediately (visible to students)</label>
          </div>
        </div>
        <hr className="divider" />
        <div style={{ display:"flex", gap:".62rem" }}>
          <button className="btn btn-ghost btn-full" onClick={onClose}>Cancel</button>
          <button className="btn btn-gold btn-full" onClick={submit} disabled={loading}>{loading ? "Creating…" : "Create Event →"}</button>
        </div>
      </div>
    </div>
  );
}

/* ── Registrations Modal ── */
function RegsModal({ ev, onClose, users }) {
  const evUsers = users.filter(u => ev.regs.includes(u.id));
  return (
    <div className="mo" onClick={onClose}>
      <div className="mbox" onClick={e => e.stopPropagation()}>
        <div className="m-hdr">
          <div><h2 className="m-title">Registrations</h2><p style={{ fontSize:".8rem", color:"var(--text-muted)", marginTop:".12rem" }}>{ev.title}</p></div>
          <button className="m-close" onClick={onClose}><XIcon /></button>
        </div>
        <div style={{ display:"flex", gap:".62rem", marginBottom:"1rem" }}>
          {[["Registered", ev.regs.length, "var(--green)"], ["Capacity", ev.cap, "var(--text-primary)"], ["Available", ev.cap - ev.regs.length, "var(--gold)"]].map(([l,v,c]) => (
            <div key={l} className="ibox" style={{ flex:1 }}><div className="ilbl">{l}</div><div className="ival" style={{ color:c }}>{v}</div></div>
          ))}
        </div>
        {evUsers.length === 0
          ? <div className="empty" style={{ padding:"2rem" }}><div className="empty-icon">👤</div><h3 className="empty-title">No registrations yet</h3></div>
          : <div className="reg-list">
              {evUsers.map(u => (
                <div key={u.id} className="reg-item">
                  <div className="reg-av">{ini(u.name)}</div>
                  <div><div className="reg-name">{u.name}</div><div className="reg-email">{u.email}</div></div>
                  <span style={{ marginLeft:"auto", fontSize:".72rem", color:"var(--green)" }}>✓</span>
                </div>
              ))}
            </div>
        }
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   ADMIN DASHBOARD
════════════════════════════════════════ */
function AdminDash({ user, events, setEvents, users, toast }) {
  const [tab,    setTab]    = useState("events");
  const [showCr, setShowCr] = useState(false);
  const [regEv,  setRegEv]  = useState(null);
  const [search, setSearch] = useState("");

  const totalReg = events.reduce((s, e) => s + e.regs.length, 0);
  const upcoming = events.filter(e => !isPast(e.date)).length;
  const pubCount = events.filter(e => e.pub).length;
  const studs    = [...new Set(events.flatMap(e => e.regs))].length;

  const handleCreate    = f  => setEvents(evs => [...evs, { ...f, id: Date.now(), regs: [] }]);
  const handleDelete    = id => { setEvents(evs => evs.filter(e => e.id !== id)); toast.info("Event deleted."); };
  const handleTogglePub = id => setEvents(evs => evs.map(e => e.id === id ? { ...e, pub: !e.pub } : e));

  const filtered     = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));
  const studentUsers = users.filter(u => u.role === "student");

  return (
    <>
      <div className="hero fu" style={{ background:"linear-gradient(135deg,#1a0f40,#2a1460)" }}>
        <div className="hero-title">Admin <em>Control Panel</em></div>
        <p className="hero-sub">Manage events, track registrations, and oversee campus activities.</p>
      </div>

      <div className="stat-row fu2">
        {[
          ["Total Events",        events.length, "var(--gold)",    `${upcoming} upcoming`],
          ["Published",           pubCount,       "var(--green)",   `${events.length - pubCount} drafts`],
          ["Total Registrations", totalReg,       "#60a5fa",        "across all events"],
          ["Active Students",     studs,          "#c084fc",        "registered ≥1 event"],
        ].map(([l,v,c,s]) => (
          <div key={l} className="sc"><div className="slbl">{l}</div><div className="sval" style={{ color:c }}>{v}</div><div className="ssub">{s}</div></div>
        ))}
      </div>

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.05rem" }}>
        <div className="tabs" style={{ margin:0 }}>
          <button className={`tab ${tab==="events"?"active":""}`}   onClick={() => setTab("events")}>📋 Events</button>
          <button className={`tab ${tab==="students"?"active":""}`} onClick={() => setTab("students")}>👥 Students ({studentUsers.length})</button>
        </div>
        <button className="btn btn-gold" onClick={() => setShowCr(true)}><PlusIco /> Create Event</button>
      </div>

      {tab === "events" && (
        <>
          <div className="sw" style={{ marginBottom:"1rem" }}>
            <SearchIco />
            <input className="sinp" placeholder="Search events…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="tbl-wrap fu3">
            <table className="tbl">
              <thead><tr><th>Event</th><th>Category</th><th>Date</th><th>Seats</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(e => {
                  const cat  = CATS.find(c => c.id === e.cat);
                  const past = isPast(e.date);
                  return (
                    <tr key={e.id}>
                      <td><span style={{ fontWeight:600 }}>{e.title}</span><br/><span style={{ fontSize:".72rem", color:"var(--text-muted)" }}>by {e.org}</span></td>
                      <td><span className="dot6" style={{ background: cat.color, marginRight:".38rem" }}/>{cat.label}</td>
                      <td style={{ fontSize:".78rem" }}>{fmtDate(e.date)}<br/><span style={{ color:"var(--text-muted)" }}>{e.time}</span></td>
                      <td><button className="btn btn-ghost btn-sm" onClick={() => setRegEv(e)}><UsrIco /> {e.regs.length}/{e.cap}</button></td>
                      <td><span className={`sbadge ${past?"sb-past":e.pub?"sb-pub":"sb-dft"}`}>{past?"Past":e.pub?"Published":"Draft"}</span></td>
                      <td>
                        <div style={{ display:"flex", gap:".32rem" }}>
                          {!past && <button className={`btn btn-sm ${e.pub?"btn-ghost":"btn-success"}`} onClick={() => handleTogglePub(e.id)}>{e.pub?"Unpublish":"Publish"}</button>}
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.id)}><TrshIco /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "students" && (
        <div className="tbl-wrap fu3">
          <table className="tbl">
            <thead><tr><th>Student</th><th>Email</th><th>Mobile</th><th>Events</th><th>Status</th></tr></thead>
            <tbody>
              {studentUsers.map(u => {
                const cnt = events.filter(e => e.regs.includes(u.id)).length;
                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display:"flex", alignItems:"center", gap:".65rem" }}>
                        <div className="reg-av" style={{ width:31, height:31, fontSize:".74rem" }}>{ini(u.name)}</div>
                        <span style={{ fontWeight:600 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ color:"var(--text-muted)", fontSize:".8rem" }}>{u.email}</td>
                    <td style={{ color:"var(--text-muted)", fontSize:".8rem" }}>{u.mobile || "—"}</td>
                    <td><span style={{ color: cnt>0?"var(--green)":"var(--text-muted)", fontWeight:600 }}>{cnt} event{cnt!==1?"s":""}</span></td>
                    <td><span className={`sbadge ${cnt>0?"sb-pub":"sb-past"}`}>{cnt>0?"Active":"Inactive"}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {showCr && <CreateEvModal onClose={() => setShowCr(false)} onCreate={handleCreate} toast={toast} />}
      {regEv  && <RegsModal ev={regEv} onClose={() => setRegEv(null)} users={users} />}
    </>
  );
}

/* ── Navbar ── */
function Navbar({ user, onLogout }) {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="nav-logo-icon">CE</div>
        <span className="nav-logo-text">Campus<em>Events</em></span>
      </div>
      <div className="nav-right">
        <div className="nav-av">{ini(user.name)}</div>
        <div>
          <div className="nav-name">{user.name}</div>
          <span className={`nav-badge ${user.role==="admin"?"badge-admin":"badge-student"}`}>
            {user.role==="admin" ? "🔧 Admin" : "👨‍🎓 Student"}
          </span>
        </div>
        <button className="btn-icon" onClick={onLogout} title="Sign out"><LogOut /></button>
      </div>
    </nav>
  );
}

/* ════════════════════════════════════════
   APP ROOT
════════════════════════════════════════ */
export default function App() {
  const [screen, setScreen] = useState("login");
  const [user,   setUser]   = useState(null);
  const [users,  setUsers]  = useState(SEED_USERS);
  const [events, setEvents] = useState(SEED_EVENTS);
  const toast = useToast();

  const handleLogin  = u  => setUser(u);
  const handleLogout = () => { setUser(null); setScreen("login"); };

  if (!user) return (
    <>
      <GlobalStyles />
      {screen === "login"
        ? <Login  onSwitch={() => setScreen("signup")} onLogin={handleLogin} toast={toast} users={users} />
        : <Signup onSwitch={() => setScreen("login")}  onLogin={handleLogin} toast={toast} users={users} setUsers={setUsers} />
      }
      <Toasts toasts={toast.toasts} />
    </>
  );

  return (
    <>
      <GlobalStyles />
      <div className="stars-bg" />
      <div className="app-layout">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="main">
          {user.role === "student"
            ? <StudentDash user={user} events={events} setEvents={setEvents} toast={toast} />
            : <AdminDash   user={user} events={events} setEvents={setEvents} users={users} toast={toast} />
          }
        </div>
      </div>
      <Toasts toasts={toast.toasts} />
    </>
  );
}