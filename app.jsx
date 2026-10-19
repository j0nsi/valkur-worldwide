// Main app — composes all sections

function Presencia(){
  const t = useT();
  const [_, force] = React.useState(0);
  React.useEffect(()=>{
    const h = () => force(x=>x+1);
    window.addEventListener('__tweak_changed', h);
    return ()=> window.removeEventListener('__tweak_changed', h);
  },[]);
  // Also re-render on lang change so the map updates
  const [, setLang] = React.useState(window.I18N && window.I18N.lang);
  React.useEffect(()=>{
    if (!window.I18N) return;
    const fn = (l)=> setLang(l);
    window.I18N.subs.add(fn);
    return ()=> window.I18N.subs.delete(fn);
  },[]);
  return (
    <section id="presencia" style={presStyles.wrap}>
      <div style={presStyles.inner}>
        <div style={presStyles.header}>
          <div>
            <div className="mono" style={presStyles.eyebrow}>{t('presencia.eyebrow')}</div>
            <h2 className="serif" style={presStyles.h2}>
              {t('presencia.titleA')}<br/>
              <em style={{color:'var(--accent)'}}>{t('presencia.titleB')}</em>
            </h2>
          </div>
          <div style={presStyles.meta}>
            <div className="mono" style={presStyles.metaText}>{t('presencia.meta')}</div>
            <div className="mono" style={presStyles.hint}>
              <span style={{color:'var(--accent)'}}>◈</span>&nbsp;&nbsp;{t('presencia.hint')}
            </div>
          </div>
        </div>

        <div style={presStyles.mapHolder}>
          <div style={presStyles.mapFrame}>
            <div style={presStyles.frameCorner1}/>
            <div style={presStyles.frameCorner2}/>
            <div style={presStyles.frameCorner3}/>
            <div style={presStyles.frameCorner4}/>
            <div style={presStyles.mapLabel} className="mono">
              <span>{t('presencia.mapLabel')}</span>
              <span style={{color:'var(--accent)'}}>{t('presencia.mapStamp')}</span>
            </div>
            <window.WorldMap key={JSON.stringify(window.__TWEAKS__) + (window.I18N ? window.I18N.lang : '')}/>
          </div>
        </div>
      </div>
    </section>
  );
}

const presStyles = {
  wrap:{ padding:'120px 48px 80px', borderTop:'1px solid var(--line)' },
  inner:{ maxWidth:1440, margin:'0 auto' },
  header:{
    display:'grid', gridTemplateColumns:'1fr 1fr', gap:80,
    alignItems:'end', marginBottom:60,
    paddingBottom:32, borderBottom:'1px solid var(--line)',
  },
  eyebrow:{ fontSize:11, letterSpacing:'.3em', color:'var(--ink-mute)', marginBottom:24 },
  h2:{ margin:0, fontSize:'clamp(48px, 6vw, 88px)', lineHeight:1, fontWeight:300, letterSpacing:'-.01em' },
  meta:{ display:'flex', flexDirection:'column', gap:20, paddingBottom:8 },
  metaText:{ fontFamily:'var(--sans)', fontWeight:300, fontSize:14, lineHeight:1.7, color:'var(--ink-dim)', letterSpacing:0 },
  hint:{ fontSize:10, letterSpacing:'.22em', color:'var(--ink-mute)' },

  mapHolder:{
    position:'relative',
  },
  mapFrame:{
    position:'relative',
    padding:'44px 28px 28px',
    border:'1px solid var(--line)',
    background:'radial-gradient(ellipse at center, #0A0A0D 0%, #06060A 100%)',
  },
  frameCorner1:{ position:'absolute', top:-1, left:-1, width:14, height:14, borderTop:'1px solid var(--accent)', borderLeft:'1px solid var(--accent)' },
  frameCorner2:{ position:'absolute', top:-1, right:-1, width:14, height:14, borderTop:'1px solid var(--accent)', borderRight:'1px solid var(--accent)' },
  frameCorner3:{ position:'absolute', bottom:-1, left:-1, width:14, height:14, borderBottom:'1px solid var(--accent)', borderLeft:'1px solid var(--accent)' },
  frameCorner4:{ position:'absolute', bottom:-1, right:-1, width:14, height:14, borderBottom:'1px solid var(--accent)', borderRight:'1px solid var(--accent)' },
  mapLabel:{
    position:'absolute', top:16, left:28, right:28,
    display:'flex', justifyContent:'space-between',
    fontSize:9, letterSpacing:'.3em', color:'var(--ink-mute)',
    pointerEvents:'none',
  },
};

function App(){
  return (
    <>
      <window.Nav/>
      <main id="top">
        <window.Hero/>
        <Presencia/>
        <window.Story/>
      </main>
      <window.Footer/>
      <window.Tweaks/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
