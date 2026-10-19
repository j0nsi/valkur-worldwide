function Hero(){
  const t = useT();
  return (
    <section style={heroStyles.wrap}>
      <div style={heroStyles.gridLines}/>
      <div style={heroStyles.inner}>
        <div style={heroStyles.topRow}>
          <div className="mono" style={heroStyles.eyebrow}>
            <span style={{color:'var(--accent)'}}>◈</span>&nbsp;&nbsp;{t('hero.eyebrow')}
          </div>
          <div className="mono" style={heroStyles.coords}>
            LAT -34.6037 &nbsp; · &nbsp; LON -58.3816
          </div>
        </div>

        <h1 style={heroStyles.h1}>
          <span className="serif" style={{display:'block'}}>{t('hero.title1')}</span>
          <span className="serif" style={{display:'block', color:'var(--accent)', fontStyle:'italic', fontWeight:400}}>{t('hero.title2')}</span>
          <span className="serif" style={{display:'block', letterSpacing:'-.01em'}}>{t('hero.title3')}</span>
        </h1>

        <div style={heroStyles.bottomRow}>
          <div style={heroStyles.tagline}>
            <div className="mono" style={heroStyles.tagEyebrow}>{t('hero.manifestoLabel')}</div>
            <p style={heroStyles.tagText}>
              {t('hero.manifestoLine1')}<br/>
              <em style={{fontFamily:'var(--serif)', fontSize:'1.1em', color:'var(--ink)'}}>{t('hero.manifestoLine2')}</em>
            </p>
          </div>

          <div style={heroStyles.scrollCue}>
            <div className="mono" style={{fontSize:10, letterSpacing:'.3em', color:'var(--ink-mute)'}}>{t('hero.scrollLabel')}</div>
            <div style={heroStyles.scrollLine}/>
            <div className="mono" style={{fontSize:10, letterSpacing:'.3em', color:'var(--ink-mute)'}}>{t('hero.scrollCue')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const heroStyles = {
  wrap:{
    position:'relative',
    minHeight:'100vh',
    display:'flex', alignItems:'stretch',
    padding:'120px 48px 64px',
    overflow:'hidden',
  },
  gridLines:{
    position:'absolute', inset:0, pointerEvents:'none',
    backgroundImage:`
      linear-gradient(to right, rgba(255,255,255,.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,.02) 1px, transparent 1px)
    `,
    backgroundSize:'80px 80px',
    maskImage:'radial-gradient(ellipse at center, black 20%, transparent 80%)',
  },
  inner:{
    position:'relative', zIndex:2,
    width:'100%', maxWidth:1440, margin:'0 auto',
    display:'flex', flexDirection:'column', justifyContent:'space-between',
    gap:40,
  },
  topRow:{
    display:'flex', justifyContent:'space-between', alignItems:'center',
    paddingBottom:28, borderBottom:'1px solid var(--line-soft)',
  },
  eyebrow:{ fontSize:11, letterSpacing:'.22em', color:'var(--ink-dim)' },
  coords:{ fontSize:11, letterSpacing:'.22em', color:'var(--ink-mute)' },

  h1:{
    margin:'60px 0',
    fontSize:'clamp(72px, 13vw, 200px)',
    lineHeight:.92,
    letterSpacing:'-.02em',
    fontWeight:300,
    color:'var(--ink)',
  },

  bottomRow:{
    display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:48,
  },
  tagline:{ maxWidth:360 },
  tagEyebrow:{ fontSize:10, letterSpacing:'.3em', color:'var(--ink-mute)', marginBottom:14 },
  tagText:{
    fontFamily:'var(--sans)', fontWeight:300,
    fontSize:18, lineHeight:1.5, color:'var(--ink-dim)', margin:0,
  },
  scrollCue:{
    display:'flex', flexDirection:'column', alignItems:'flex-end', gap:14,
  },
  scrollLine:{ width:1, height:60, background:'linear-gradient(180deg, var(--accent), transparent)' },
};

window.Hero = Hero;
