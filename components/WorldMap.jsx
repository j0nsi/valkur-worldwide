// LatAm map — real Natural Earth geometry (world-atlas 110m) rendered with d3-geo.
// Styles (Tweak "mapStyle"): solid | dots | line
const { useRef, useEffect, useState, useMemo } = React;

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';
const COUNTRIES = [
  { code:'AR', id:'032', lon:-58.38, lat:-34.60, url:'https://valkur.com.ar', side:'right' },
  { code:'CL', id:'152', lon:-70.66, lat:-33.45, url:'https://valkur.cl',     side:'left'  },
  { code:'PE', id:'604', lon:-77.04, lat:-12.05, url:'https://valkur.com.pe', side:'left'  },
];
const ACTIVE_IDS = { '032':'AR', '152':'CL', '604':'PE' };

let _latamPromise = null;
function loadLatAm(){
  if (_latamPromise) return _latamPromise;
  _latamPromise = fetch(GEO_URL).then(r=>r.json()).then(topo=>{
    const all = topojson.feature(topo, topo.objects.countries).features;
    const out = {};
    all.forEach(f=>{
      const g = f.geometry; if (!g) return;
      const polys = g.type==='Polygon' ? [g.coordinates] : g.type==='MultiPolygon' ? g.coordinates : [];
      polys.forEach(p=>{
        const c = d3.geoCentroid({type:'Polygon', coordinates:p});
        if (c[0]>-120 && c[0]<-28 && c[1]<33 && c[1]>-60){
          if (!out[f.id]) out[f.id] = {type:'Feature', id:f.id, properties:f.properties, geometry:{type:'MultiPolygon', coordinates:[]}};
          out[f.id].geometry.coordinates.push(p);
        }
      });
    });
    return Object.values(out);
  });
  return _latamPromise;
}

function FlagDisc({code, size=26}){
  const r = size/2, id = `f${code}${size}`;
  const ring = <circle cx={r} cy={r} r={r-.5} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth=".8"/>;
  let body = null;
  if (code==='AR') body = (<g><rect width={size} height={size/3} fill="#74ACDF"/><rect width={size} height={size/3} y={size/3} fill="#fff"/><rect width={size} height={size/3} y={2*size/3} fill="#74ACDF"/><circle cx={r} cy={r} r={size*0.13} fill="#F6B40E"/></g>);
  if (code==='CL') body = (<g><rect width={size} height={size/2} fill="#fff"/><rect y={size/2} width={size} height={size/2} fill="#D52B1E"/><rect width={size/2.2} height={size/2} fill="#0039A6"/><text x={size/4.4} y={size/2.4} textAnchor="middle" fill="#fff" fontSize={size*0.42} fontWeight="900">★</text></g>);
  if (code==='PE') body = (<g><rect width={size/3} height={size} fill="#D91023"/><rect x={size/3} width={size/3} height={size} fill="#fff"/><rect x={2*size/3} width={size/3} height={size} fill="#D91023"/></g>);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs><clipPath id={id}><circle cx={r} cy={r} r={r}/></clipPath></defs>
      <g clipPath={`url(#${id})`}>{body}</g>{ring}
    </svg>
  );
}

function WorldMap(){
  const t = useT();
  const wrapRef = useRef(null);
  const [size, setSize] = useState({w:1000, h:720});
  const [features, setFeatures] = useState(null);
  const [hovered, setHovered] = useState(null);
  const tw = window.__TWEAKS__ || {};
  const style = tw.mapStyle || 'solid';
  const density = tw.constellationDensity || 1;

  useEffect(()=>{ loadLatAm().then(setFeatures).catch(()=>setFeatures([])); },[]);
  useEffect(()=>{
    const el = wrapRef.current; if(!el) return;
    const ro = new ResizeObserver(([e])=>{
      const w = e.contentRect.width;
      setSize({w, h: Math.min(Math.max(w*0.7, 560), 820)});
    });
    ro.observe(el);
    return ()=>ro.disconnect();
  },[]);

  const geo = useMemo(()=>{
    if (!features || !features.length) return null;
    const pad = 24;
    const projection = d3.geoMercator().fitExtent([[pad,pad],[size.w-pad,size.h-pad]], {type:'FeatureCollection', features});
    const path = d3.geoPath(projection);
    const shapes = features.map(f=>({ id:f.id, code:ACTIVE_IDS[f.id] || null, d:path(f) }));
    const graticule = path(d3.geoGraticule().step([10,10]).extent([[-130,-60],[-20,40]])());
    const eqY = projection([-60,0])[1];
    const capY = projection([-60,-23.44])[1];
    const capitals = COUNTRIES.map(c=>{ const [x,y] = projection([c.lon,c.lat]); return {...c, x, y}; });

    let dots = [];
    if (style==='dots'){
      const cv = document.createElement('canvas');
      cv.width = Math.ceil(size.w); cv.height = Math.ceil(size.h);
      const ctx = cv.getContext('2d', {willReadFrequently:true});
      const cpath = d3.geoPath(projection, ctx);
      features.forEach((f,i)=>{ ctx.beginPath(); cpath(f); ctx.fillStyle = `rgb(${(i+1)%256},${Math.floor((i+1)/256)},0)`; ctx.fill(); });
      const data = ctx.getImageData(0,0,cv.width,cv.height).data;
      const step = 7/density;
      for (let y=step/2; y<size.h; y+=step){
        for (let x=step/2; x<size.w; x+=step){
          const k = (Math.floor(y)*cv.width + Math.floor(x))*4;
          if (data[k+3] !== 255) continue;
          const idx = data[k] + data[k+1]*256 - 1;
          const f = features[idx]; if (!f) continue;
          dots.push({x, y, code: ACTIVE_IDS[f.id] || null});
        }
      }
    }
    return { shapes, graticule, eqY, capY, capitals, dots };
  }, [features, size, style, density]);

  const active = hovered;
  const activeCap = geo && geo.capitals.find(c=>c.code===active);

  const baseFill = style==='solid' ? '#17171C' : 'none';
  const baseStroke = style==='solid' ? '#2A2A31' : style==='line' ? '#3A3A44' : 'none';

  return (
    <div ref={wrapRef} style={{position:'relative', width:'100%'}}>
      <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} style={{display:'block', userSelect:'none'}}>
        <defs>
          <filter id="mapGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {geo && tw.showMeridians !== false && (
          <path d={geo.graticule} fill="none" stroke="#17171D" strokeWidth=".6" strokeDasharray="1 5"/>
        )}
        {geo && (
          <g pointerEvents="none">
            <line x1={0} x2={size.w} y1={geo.eqY} y2={geo.eqY} style={{stroke:'var(--accent)'}} strokeWidth=".5" opacity=".22" strokeDasharray="4 4"/>
            <text x={12} y={geo.eqY-6} fill="var(--ink-mute)" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="2">{t('map.equator')}</text>
            <line x1={0} x2={size.w} y1={geo.capY} y2={geo.capY} style={{stroke:'var(--accent)'}} strokeWidth=".4" opacity=".14" strokeDasharray="2 6"/>
            <text x={12} y={geo.capY-6} fill="var(--ink-mute)" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="2">{t('map.tropic')}</text>
          </g>
        )}

        {/* Base countries */}
        {geo && style!=='dots' && (
          <g pointerEvents="none">
            {geo.shapes.filter(s=>!s.code).map(s=>(
              <path key={s.id} d={s.d} fill={baseFill} stroke={baseStroke} strokeWidth=".6" strokeLinejoin="round"/>
            ))}
          </g>
        )}
        {geo && style==='dots' && (
          <g pointerEvents="none">
            {geo.dots.map((d,i)=>(
              <circle key={i} cx={d.x} cy={d.y} r={d.code ? 1.9 : 1.3}
                style={{fill: d.code ? 'var(--accent)' : '#34343D', opacity: d.code ? (active && active!==d.code ? .55 : 1) : .9}}/>
            ))}
          </g>
        )}

        {/* Active countries */}
        {geo && geo.shapes.filter(s=>s.code).map(s=>{
          const on = active===s.code;
          const url = COUNTRIES.find(c=>c.code===s.code).url;
          const visible = style==='dots'
            ? {fill:'transparent', stroke: on ? 'var(--accent)' : 'transparent', strokeWidth:1}
            : style==='line'
              ? {fill:'var(--accent)', fillOpacity: on ? .45 : .22, stroke:'var(--accent)', strokeWidth: on ? 1.6 : 1.1}
              : {fill:'var(--accent)', fillOpacity: on ? 1 : .82, stroke:'#DDEFE2', strokeOpacity: on ? .9 : .4, strokeWidth: on ? 1.2 : .7};
          return (
            <a key={s.id} href={url} target="_blank" rel="noopener" aria-label={`Valkur ${t('countries.'+s.code+'.name')}`}>
              <path d={s.d} strokeLinejoin="round"
                filter={on && style!=='dots' ? 'url(#mapGlow)' : undefined}
                style={{...visible, cursor:'pointer', transition:'fill-opacity .25s, stroke-width .25s'}}
                onMouseEnter={()=>setHovered(s.code)} onMouseLeave={()=>setHovered(null)}/>
            </a>
          );
        })}

        {/* Connectors */}
        {geo && (
          <polyline pointerEvents="none" points={[2,1,0].map(i=>`${geo.capitals[i].x},${geo.capitals[i].y}`).join(' ')}
            fill="none" style={{stroke:'#DDEFE2'}} strokeWidth=".6" strokeDasharray="2 5" opacity=".35"/>
        )}

        {/* Capitals + labels */}
        {geo && geo.capitals.map(c=>{
          const on = active===c.code;
          const dir = c.side==='right' ? 1 : -1;
          return (
            <g key={c.code} transform={`translate(${c.x},${c.y})`} pointerEvents="none">
              <circle r={on?6:5} fill="#0A0A0C" stroke="#DDEFE2" strokeWidth="1.4"/>
              <circle r="2" fill="#DDEFE2"/>
              <g opacity={on?0:1} style={{transition:'opacity .2s'}}>
                <line x1={12*dir} y1={0} x2={44*dir} y2={0} style={{stroke:'var(--accent)'}} strokeWidth=".8"/>
                <text x={50*dir} y={3.5} textAnchor={dir>0?'start':'end'} fill="#EDEAE3" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="2.5" fontWeight="500">{t('countries.'+c.code+'.label')}</text>
              </g>
            </g>
          );
        })}

        {/* Compass */}
        <g transform={`translate(${size.w-60}, 60)`} pointerEvents="none" opacity=".45">
          <circle r="22" fill="none" stroke="var(--ink-mute)" strokeWidth=".5"/>
          <line x1="0" y1="-22" x2="0" y2="22" stroke="var(--ink-mute)" strokeWidth=".5"/>
          <line x1="-22" y1="0" x2="22" y2="0" stroke="var(--ink-mute)" strokeWidth=".5"/>
          <polygon points="0,-22 -3,-2 0,0 3,-2" style={{fill:'var(--accent)'}}/>
          <text y="-27" textAnchor="middle" style={{fill:'var(--accent)'}} fontFamily="JetBrains Mono" fontSize="9" letterSpacing="2">N</text>
        </g>
      </svg>

      {activeCap && (
        <a href={activeCap.url} target="_blank" rel="noopener"
          onMouseEnter={()=>setHovered(activeCap.code)} onMouseLeave={()=>setHovered(null)}
          style={{position:'absolute', left:activeCap.x, top:activeCap.y, transform:'translate(-50%, calc(-100% - 14px))', zIndex:5}}>
          <div style={pinStyles.wrap}>
            <div style={pinStyles.card}>
              <FlagDisc code={activeCap.code} size={32}/>
              <div style={pinStyles.textCol}>
                <div style={pinStyles.eyebrow} className="mono">{activeCap.code} · {t('countries.'+activeCap.code+'.city').toUpperCase()}</div>
                <div style={pinStyles.name} className="serif">{t('countries.'+activeCap.code+'.name')}</div>
                <div style={pinStyles.url} className="mono">{activeCap.url.replace('https://','')}<span style={{marginLeft:8, color:'var(--accent)'}}>↗</span></div>
              </div>
            </div>
            <div style={pinStyles.stem}></div>
          </div>
        </a>
      )}

      <div style={indexStrip.wrap}>
        {COUNTRIES.map((c,i)=>(
          <a key={c.code} href={c.url} target="_blank" rel="noopener"
            onMouseEnter={()=>setHovered(c.code)} onMouseLeave={()=>setHovered(null)}
            style={{...indexStrip.item, borderColor: active===c.code ? 'var(--accent)' : 'var(--line)', background: active===c.code ? 'rgba(54,157,101,.06)' : 'transparent'}}>
            <FlagDisc code={c.code} size={24}/>
            <div style={{display:'flex', flexDirection:'column', gap:2}}>
              <div className="mono" style={{fontSize:10, letterSpacing:'.18em', color:'var(--ink-mute)'}}>0{i+1} / 03</div>
              <div className="serif" style={{fontSize:22, lineHeight:1}}>{t('countries.'+c.code+'.name')}</div>
            </div>
            <div className="mono" style={{marginLeft:'auto', fontSize:11, color:'var(--ink-dim)'}}>{c.url.replace('https://','')}</div>
            <span style={{color:'var(--accent)', fontSize:14}}>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

const pinStyles = {
  wrap:{ display:'flex', flexDirection:'column', alignItems:'center' },
  card:{ display:'flex', alignItems:'center', gap:14, padding:'12px 18px 13px 14px', background:'rgba(14,14,17,.97)', border:'1px solid rgba(54,157,101,.45)', boxShadow:'0 24px 50px -22px rgba(0,0,0,.95)', borderRadius:2, minWidth:240 },
  textCol:{ display:'flex', flexDirection:'column', gap:2 },
  eyebrow:{ fontSize:9, letterSpacing:'.22em', color:'var(--ink-dim)' },
  name:{ fontSize:24, lineHeight:1, color:'var(--ink)', marginTop:2 },
  url:{ fontSize:10, color:'var(--ink-dim)', marginTop:5, letterSpacing:'.06em' },
  stem:{ width:1, height:14, background:'rgba(54,157,101,.6)' },
};
const indexStrip = {
  wrap:{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:10, marginTop:40, paddingTop:28, borderTop:'1px solid var(--line)' },
  item:{ display:'flex', alignItems:'center', gap:14, padding:'14px 18px', border:'1px solid var(--line)', borderRadius:2, transition:'all .25s ease', color:'inherit' },
};

window.WorldMap = WorldMap;
