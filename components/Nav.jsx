function Nav(){
  const t = useT();
  const [lang, setLang] = useLang();
  return (
    <nav style={navStyles.wrap}>
      <div style={navStyles.left} className="mono">
        <span style={{color:'var(--ink-mute)'}}>{t('nav.est')}</span> 2017
      </div>
      <a href="#top" style={navStyles.center}>
        <img src="assets/valkur-logo.png" alt="Valkur" style={navStyles.logoImg}/>
      </a>
      <div style={navStyles.right}>
        <a href="#historia" style={navStyles.link}>{t('nav.historia')}</a>
        <a href="#presencia" style={navStyles.link}>{t('nav.presencia')}</a>
        <a href="#contacto" style={{...navStyles.link, color:'var(--accent)'}}>{t('nav.contacto')}</a>
        <LangToggle lang={lang} setLang={setLang}/>
      </div>
    </nav>
  );
}

function LangToggle({lang, setLang}){
  return (
    <div
      role="group"
      aria-label="Language"
      style={langStyles.wrap}
    >
      <button
        type="button"
        onClick={()=>setLang('es')}
        aria-pressed={lang==='es'}
        style={{
          ...langStyles.btn,
          color: lang==='es' ? 'var(--accent)' : 'var(--ink-mute)',
          background: lang==='es' ? 'rgba(54,157,101,.08)' : 'transparent',
        }}
      >ES</button>
      <span style={langStyles.divider}/>
      <button
        type="button"
        onClick={()=>setLang('en')}
        aria-pressed={lang==='en'}
        style={{
          ...langStyles.btn,
          color: lang==='en' ? 'var(--accent)' : 'var(--ink-mute)',
          background: lang==='en' ? 'rgba(54,157,101,.08)' : 'transparent',
        }}
      >EN</button>
    </div>
  );
}

const navStyles = {
  wrap:{
    position:'fixed', top:0, left:0, right:0, zIndex:50,
    display:'grid', gridTemplateColumns:'1fr auto 1fr',
    alignItems:'center',
    padding:'22px 48px',
    background:'linear-gradient(180deg, rgba(8,8,10,.85), rgba(8,8,10,.0))',
    backdropFilter:'blur(8px)',
  },
  left:{ fontSize:11, letterSpacing:'.22em' },
  center:{ textDecoration:'none', justifySelf:'center' },
  logoImg:{
    height:22,
    width:'auto',
    display:'block',
    filter:'brightness(1.05)',
  },
  right:{
    display:'flex', gap:32, justifyContent:'flex-end', alignItems:'center',
    fontSize:11, letterSpacing:'.2em', textTransform:'uppercase',
    color:'var(--ink-dim)', fontFamily:'var(--sans)', fontWeight:400,
  },
  link:{ color:'var(--ink-dim)', transition:'color .2s' },
};

const langStyles = {
  wrap:{
    display:'inline-flex', alignItems:'center',
    border:'1px solid var(--line)',
    borderRadius:1,
    marginLeft:8,
    height:28,
  },
  btn:{
    appearance:'none', border:0, outline:0, cursor:'pointer',
    fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.2em', fontWeight:500,
    padding:'0 12px', height:'100%',
    transition:'color .2s, background .2s',
  },
  divider:{
    width:1, height:14, background:'var(--line)',
  },
};

window.Nav = Nav;
