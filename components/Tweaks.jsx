// Tweaks panel — appears when the host activates edit mode
const { useState: useStateT, useEffect: useEffectT } = React;

function Tweaks(){
  const [visible, setVisible] = useStateT(false);
  const [tw, setTw] = useStateT(()=>({...window.__TWEAKS__}));

  useEffectT(()=>{
    const handler = (e)=>{
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setVisible(true);
      if (e.data.type === '__deactivate_edit_mode') setVisible(false);
    };
    window.addEventListener('message', handler);
    // Announce availability *after* the listener is registered
    window.parent.postMessage({type:'__edit_mode_available'}, '*');
    return ()=> window.removeEventListener('message', handler);
  },[]);

  const setKey = (k, v) => {
    const next = {...tw, [k]: v};
    setTw(next);
    window.__TWEAKS__ = next;
    // Apply live to CSS
    if (k === 'accent') document.documentElement.style.setProperty('--accent', v);
    // For map changes we need a re-render → broadcast
    window.dispatchEvent(new CustomEvent('__tweak_changed', {detail: next}));
    // Persist
    window.parent.postMessage({type:'__edit_mode_set_keys', edits:{[k]: v}}, '*');
  };

  if (!visible) return null;

  return (
    <div style={twStyles.panel}>
      <div style={twStyles.head}>
        <div className="mono" style={twStyles.title}>TWEAKS</div>
        <div className="mono" style={twStyles.sub}>Valkur · ajustes vivos</div>
      </div>

      <div style={twStyles.group}>
        <label style={twStyles.label}>Acento (champagne / oro)</label>
        <div style={twStyles.row}>
          {['#369D65','#B8860B','#E6C88C','#9AB8D4','#C64A3A','#8A8A8F'].map(c=>(
            <button key={c} onClick={()=>setKey('accent', c)}
              style={{
                width:28, height:28, borderRadius:2, border: tw.accent===c?'2px solid #fff':'1px solid #2a2a30',
                background:c, cursor:'pointer',
              }}/>
          ))}
        </div>
      </div>

      <div style={twStyles.group}>
        <label style={twStyles.label}>Estilo del mapa</label>
        <div style={twStyles.row}>
          {[['solid','SÓLIDO'],['dots','PUNTOS'],['line','LÍNEA']].map(([v,l])=>(
            <button key={v} onClick={()=>setKey('mapStyle', v)} className="mono"
              style={{...twStyles.chip, borderColor: tw.mapStyle===v ? 'var(--accent)' : '#2a2a30', color: tw.mapStyle===v ? 'var(--accent)' : 'var(--ink-dim)'}}>{l}</button>
          ))}
        </div>
      </div>

      <div style={twStyles.group}>
        <label style={twStyles.label}>Densidad de constelación</label>
        <input type="range" min=".6" max="1.8" step=".1" value={tw.constellationDensity}
          onChange={e=>setKey('constellationDensity', parseFloat(e.target.value))}
          style={{width:'100%'}}/>
        <div className="mono" style={twStyles.value}>{tw.constellationDensity.toFixed(1)}×</div>
      </div>

      <div style={twStyles.group}>
        <label style={twStyles.label}>Meridianos de fondo</label>
        <div style={twStyles.row}>
          {[true,false].map(v=>(
            <button key={String(v)} onClick={()=>setKey('showMeridians', v)}
              className="mono"
              style={{
                ...twStyles.chip,
                borderColor: tw.showMeridians===v ? 'var(--accent)' : '#2a2a30',
                color: tw.showMeridians===v ? 'var(--accent)' : 'var(--ink-dim)',
              }}>
              {v ? 'MOSTRAR' : 'OCULTAR'}
            </button>
          ))}
        </div>
      </div>

      <div style={twStyles.foot}>
        <div className="mono" style={{fontSize:9, letterSpacing:'.22em', color:'var(--ink-mute)'}}>
          LOS AJUSTES SE PERSISTEN AL ARCHIVO
        </div>
      </div>
    </div>
  );
}

const twStyles = {
  panel:{
    position:'fixed', right:24, bottom:24, zIndex:99,
    width:300, padding:20,
    background:'rgba(14,14,17,.96)',
    border:'1px solid rgba(54,157,101,.25)',
    borderRadius:2,
    boxShadow:'0 30px 60px -20px rgba(0,0,0,.9)',
    backdropFilter:'blur(12px)',
    fontFamily:'var(--sans)',
  },
  head:{ marginBottom:20, paddingBottom:14, borderBottom:'1px solid #222' },
  title:{ fontSize:11, letterSpacing:'.3em', color:'var(--accent)' },
  sub:{ fontSize:9, letterSpacing:'.2em', color:'var(--ink-mute)', marginTop:4 },
  group:{ marginBottom:18 },
  label:{
    display:'block', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase',
    color:'var(--ink-dim)', marginBottom:10, fontFamily:'var(--mono)',
  },
  row:{ display:'flex', gap:8, flexWrap:'wrap' },
  chip:{
    padding:'6px 12px', fontSize:10, letterSpacing:'.2em',
    background:'transparent', border:'1px solid #2a2a30', color:'var(--ink-dim)',
    cursor:'pointer', borderRadius:2,
  },
  value:{ fontSize:10, letterSpacing:'.15em', color:'var(--ink-mute)', marginTop:6 },
  foot:{ marginTop:6, paddingTop:14, borderTop:'1px solid #222' },
};

window.Tweaks = Tweaks;
