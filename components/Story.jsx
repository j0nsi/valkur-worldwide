function Story(){
  const t = useT();
  return (
    <section id="historia" className="v-story" style={storyStyles.wrap}>
      <div className="v-story-inner" style={storyStyles.inner}>
        <div className="v-story-left" style={storyStyles.left}>
          <div className="mono" style={storyStyles.eyebrow}>{t('historia.eyebrow')}</div>
          <h2 className="serif" style={storyStyles.h2}>
            {t('historia.titleA')} <em style={{color:'var(--accent)'}}>{t('historia.titleAEm')}</em>{t('historia.titleAEnd')}<br/>
            {t('historia.titleB')} <em style={{color:'var(--accent)'}}>{t('historia.titleBEm')}</em>{t('historia.titleBEnd')}
          </h2>
          <div style={storyStyles.meta}>
            <div>
              <div className="mono" style={storyStyles.metaLabel}>{t('historia.origin')}</div>
              <div style={storyStyles.metaValue}>{t('historia.originValue')}</div>
            </div>
            <div>
              <div className="mono" style={storyStyles.metaLabel}>{t('historia.founded')}</div>
              <div style={storyStyles.metaValue}>{t('historia.foundedValue')}</div>
            </div>
            <div>
              <div className="mono" style={storyStyles.metaLabel}>{t('historia.presence')}</div>
              <div style={storyStyles.metaValue}>{t('historia.presenceValue')}</div>
            </div>
          </div>
        </div>

        <div className="v-story-right" style={storyStyles.right}>
          <p style={storyStyles.pLead} dangerouslySetInnerHTML={{__html: t('historia.lead')}}/>
          <p style={storyStyles.p}>{t('historia.p1')}</p>
          <blockquote style={storyStyles.quote} className="serif v-story-quote">{t('historia.quote')}</blockquote>
          <p style={storyStyles.p}>{t('historia.p2')}</p>
          <p style={storyStyles.p}>{t('historia.p3')}</p>

          <div style={storyStyles.closing}>
            <div className="serif v-story-close" style={storyStyles.closingLine}>{t('historia.closing1')}</div>
            <div className="serif v-story-close" style={{...storyStyles.closingLine, color:'var(--accent)', fontStyle:'italic'}}>
              {t('historia.closing2A')}<br/>{t('historia.closing2B')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const storyStyles = {
  wrap:{
    padding:'160px 48px',
    borderTop:'1px solid var(--line)',
    background:'linear-gradient(180deg, var(--bg) 0%, #0B0B0D 100%)',
  },
  inner:{
    maxWidth:1440, margin:'0 auto',
    display:'grid', gridTemplateColumns:'.85fr 1fr', gap:100,
  },
  left:{ position:'sticky', top:120, alignSelf:'start', height:'fit-content' },
  eyebrow:{ fontSize:11, letterSpacing:'.3em', color:'var(--ink-mute)', marginBottom:28 },
  h2:{
    margin:0,
    fontSize:'clamp(42px, 4.4vw, 64px)',
    lineHeight:1.05,
    fontWeight:300,
    letterSpacing:'-.01em',
    marginBottom:48,
  },
  meta:{
    display:'flex', flexDirection:'column', gap:24,
    paddingTop:36, borderTop:'1px solid var(--line)',
  },
  metaLabel:{ fontSize:10, letterSpacing:'.3em', color:'var(--ink-mute)', marginBottom:6 },
  metaValue:{ fontSize:15, color:'var(--ink)', fontFamily:'var(--serif)', fontSize:22, fontWeight:400, letterSpacing:'.005em' },

  right:{ paddingTop:60 },
  pLead:{
    margin:'0 0 32px', fontSize:19, lineHeight:1.65, color:'var(--ink)',
    fontFamily:'var(--sans)', fontWeight:300,
  },
  p:{
    margin:'0 0 28px', fontSize:15.5, lineHeight:1.75, color:'var(--ink-dim)',
    fontFamily:'var(--sans)', fontWeight:300,
  },
  quote:{
    margin:'48px 0', padding:'28px 0 28px 32px',
    borderLeft:'1px solid var(--accent)',
    fontSize:26, lineHeight:1.35, color:'var(--ink)',
    fontStyle:'italic', fontWeight:400,
    fontFamily:'var(--serif)',
  },
  closing:{
    marginTop:64, paddingTop:40,
    borderTop:'1px solid var(--line)',
    display:'flex', flexDirection:'column', gap:18,
  },
  closingLine:{
    fontSize:28, lineHeight:1.2, fontWeight:400, letterSpacing:'-.005em',
  },
};

window.Story = Story;
