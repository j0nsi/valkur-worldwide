function Footer(){
  const t = useT();
  return (
    <footer id="contacto" style={footStyles.wrap}>
      <div style={footStyles.inner}>
        <div style={footStyles.giantWrap}>
          <img src="assets/valkur-logo.png" alt="Valkur" style={footStyles.giantImg}/>
        </div>

        <div style={footStyles.grid}>
          <div style={footStyles.col}>
            <div className="mono" style={footStyles.colHead}>{t('footer.official')}</div>
            <a href="https://valkur.com.ar" target="_blank" rel="noopener" style={footStyles.link}>
              {t('footer.argentina')} <span style={footStyles.linkSub}>valkur.com.ar</span>
            </a>
            <a href="https://valkur.cl" target="_blank" rel="noopener" style={footStyles.link}>
              {t('footer.chile')} <span style={footStyles.linkSub}>valkur.cl</span>
            </a>
            <a href="https://valkur.com.pe" target="_blank" rel="noopener" style={footStyles.link}>
              {t('footer.peru')} <span style={footStyles.linkSub}>valkur.com.pe</span>
            </a>
          </div>
          <div style={footStyles.col}>
            <div className="mono" style={footStyles.colHead}>{t('footer.house')}</div>
            <a href={/index\.html$|\/$/.test(location.pathname) ? "#historia" : "index.html#historia"} style={footStyles.link}>{t('footer.story')}</a>
            <a href="boutiques.html" style={footStyles.link}>{t('footer.boutiques')}</a>
            <a href="servicio-tecnico.html" style={footStyles.link}>{t('footer.service')}</a>
          </div>
          <div style={footStyles.col}>
            <div className="mono" style={footStyles.colHead}>{t('footer.contact')}</div>
            <a href="mailto:hola@valkurwatches.com" style={footStyles.link}>hola@valkurwatches.com</a>
            <a href="tel:+541121714153" style={footStyles.link}>+54 11 2171 4153</a>
          </div>
          <div style={footStyles.col}>
            <div className="mono" style={footStyles.colHead}>{t('footer.manifesto')}</div>
            <p style={footStyles.manifesto}>
              {t('footer.manifestoText1')}<br/>
              <em className="serif" style={{fontSize:18, color:'var(--accent)'}}>{t('footer.manifestoText2')}</em>
            </p>
          </div>
        </div>

        <div style={footStyles.bottom}>
          <div className="mono" style={footStyles.fine}>{t('footer.copyright')}</div>
          <div className="mono" style={footStyles.fine}>{t('footer.rights')}</div>
          <div className="mono" style={footStyles.fine}>{t('footer.tagline')}</div>
        </div>
      </div>
    </footer>
  );
}

const footStyles = {
  wrap:{
    padding:'120px 48px 40px',
    borderTop:'1px solid var(--line)',
    background:'#06060A',
  },
  inner:{ maxWidth:1440, margin:'0 auto' },
  giantWrap:{
    width:'100%',
    display:'flex',
    justifyContent:'center',
    marginBottom:80,
    userSelect:'none',
  },
  giantImg:{
    width:'92%',
    maxWidth:1280,
    height:'auto',
    display:'block',
    opacity:.92,
    filter:'brightness(1.02)',
  },
  grid:{
    display:'grid', gridTemplateColumns:'1.1fr 1fr 1fr 1fr', gap:60,
    paddingBottom:60,
    borderBottom:'1px solid var(--line)',
  },
  col:{ display:'flex', flexDirection:'column', gap:14 },
  colHead:{ fontSize:10, letterSpacing:'.3em', color:'var(--ink-mute)', marginBottom:8 },
  link:{
    fontFamily:'var(--serif)', fontSize:22, color:'var(--ink)',
    display:'flex', alignItems:'baseline', gap:12,
    cursor:'pointer', transition:'color .2s',
    textDecoration:'none',
  },
  linkSub:{
    fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.1em', color:'var(--ink-mute)',
  },
  manifesto:{
    margin:0, fontSize:14, lineHeight:1.6, color:'var(--ink-dim)',
  },
  bottom:{
    display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20,
    paddingTop:28,
    fontSize:10, letterSpacing:'.2em', color:'var(--ink-mute)',
  },
  fine:{
    textAlign:'left',
  },
};

window.Footer = Footer;
