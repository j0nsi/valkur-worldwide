// Internationalization — Spanish (default) + English
// Usage: const t = useT(); then t('key.path') or t('key', {var: 'value'})

const TRANSLATIONS = {
  es: {
    nav: {
      est: 'EST.',
      colecciones: 'Colecciones',
      historia: 'Historia',
      presencia: 'Presencia',
      contacto: 'Contacto',
    },
    hero: {
      eyebrow: 'BUENOS AIRES · SANTIAGO · LIMA',
      title1: 'Hacemos relojes',
      title2: 'desde el año',
      title3: '2017.',
      manifestoLabel: 'MANIFIESTO — N°01',
      manifestoLine1: 'El tiempo no solo se mide,',
      manifestoLine2: 'se honra.',
      scrollLabel: 'PRESENCIA GLOBAL',
      scrollCue: '↓ EXPLORAR',
    },
    presencia: {
      eyebrow: 'I · PRESENCIA INTERNACIONAL',
      titleA: 'Tres países.',
      titleB: 'Una misma obsesión.',
      meta: 'La visión relojera de Valkur tiene presencia oficial en Argentina, Chile y Perú. Cada operación mantiene el mismo estándar de diseño, garantía y servicio que definió la marca desde Buenos Aires en 2017.',
      hint: 'Haz click en un país resaltado para visitar su sitio oficial',
      mapLabel: 'PROYECCIÓN · MERCATOR',
      mapStamp: 'VALKUR / MMXXVI',
    },
    colecciones: {
      eyebrow: 'II · COLECCIONES',
      titleA: 'Piezas que',
      titleB: 'honran el tiempo.',
      intro: 'Cuatro colecciones, cada una como una mirada distinta sobre la relojería contemporánea. Acero noble, cuero honesto y un movimiento calibrado en el justo peso de la muñeca.',
      cta: 'Descubrir pieza',
      taglines: {
        'VK-001': 'Automático · 40mm',
        'VK-014': 'GMT · Acero cepillado',
        'VK-022': 'Esfera negra lacada',
        'VK-033': 'Edición Patagonia · 38mm',
      },
      priceLabel: 'Desde USD',
    },
    historia: {
      eyebrow: 'III · NUESTRA HISTORIA',
      titleA: 'Una obsesión',
      titleAEm: 'heredada',
      titleAEnd: ',',
      titleB: 'una mirada',
      titleBEm: 'propia',
      titleBEnd: '.',
      origin: 'ORIGEN',
      originValue: 'Buenos Aires, Argentina',
      founded: 'FUNDACIÓN',
      foundedValue: '2017',
      presence: 'PRESENCIA OFICIAL',
      presenceValue: 'Argentina · Chile · Perú',
      lead: 'Nuestra historia comenzó en <b>2017</b>, en la provincia de Buenos Aires. Desde el primer día, nos movió una obsesión: entender el reloj como algo más que un objeto para medir el tiempo.',
      p1: 'Detrás de cada diseño hubo siempre una búsqueda: equilibrio, precisión y carácter. Empezamos dibujando, bocetando, soñando con piezas que combinaran la nobleza de la relojería tradicional con una mirada contemporánea.',
      quote: '"Cuando muchos creían que el reloj estaba perdiendo sentido en la era digital, nosotros vimos una misión."',
      p2: 'Decidimos ir contra la corriente, porque sabíamos que el reloj seguía teniendo un valor que ningún dispositivo puede reemplazar: el de detener el tiempo y darle significado a cada instante. Todo eso, sucediendo en tu muñeca.',
      p3: 'Con el paso de los años, ese compromiso nos permitió crecer. Valkur nació en Argentina, pero ya tiene presencia oficial en Chile y Perú, llevando nuestra visión relojera a toda la región.',
      closing1: 'Cada reloj Valkur es una declaración de principios.',
      closing2A: 'Porque hacemos relojes,',
      closing2B: 'no vendemos gorras.',
    },
    footer: {
      official: 'SITIOS OFICIALES',
      house: 'CASA',
      contact: 'CONTACTO',
      manifesto: 'MANIFIESTO',
      argentina: 'Argentina',
      chile: 'Chile',
      peru: 'Perú',
      collections: 'Colecciones',
      story: 'Historia',
      boutiques: 'Boutiques',
      service: 'Servicio técnico',
      manifestoText1: 'El tiempo no solo se mide,',
      manifestoText2: 'se honra.',
      copyright: '© 2017 — 2026 · VALKUR · BUENOS AIRES',
      rights: 'TODOS LOS DERECHOS RESERVADOS',
      tagline: 'HECHO CON RESPETO POR EL TIEMPO',
    },
    countries: {
      AR: { name: 'Argentina', city: 'Buenos Aires', label: 'ARGENTINA' },
      CL: { name: 'Chile',     city: 'Santiago',     label: 'CHILE' },
      PE: { name: 'Perú',      city: 'Lima',         label: 'PERÚ' },
    },
    map: {
      equator: 'ECUADOR · 0°',
      tropic: 'TRÓPICO DE CAPRICORNIO · 23.4°S',
    },
  },
  en: {
    nav: {
      est: 'EST.',
      colecciones: 'Collections',
      historia: 'Story',
      presencia: 'Presence',
      contacto: 'Contact',
    },
    hero: {
      eyebrow: 'BUENOS AIRES · SANTIAGO · LIMA',
      title1: 'We have been crafting',
      title2: 'watches since',
      title3: '2017.',
      manifestoLabel: 'MANIFESTO — N°01',
      manifestoLine1: 'Time is not only measured,',
      manifestoLine2: 'it is honored.',
      scrollLabel: 'GLOBAL PRESENCE',
      scrollCue: '↓ EXPLORE',
    },
    presencia: {
      eyebrow: 'I · INTERNATIONAL PRESENCE',
      titleA: 'Three countries.',
      titleB: 'One same obsession.',
      meta: 'Valkur\'s watchmaking vision has official presence in Argentina, Chile and Peru. Each operation upholds the same standard of design, warranty and service that defined the brand from Buenos Aires in 2017.',
      hint: 'Click a highlighted country to visit its official site',
      mapLabel: 'PROJECTION · MERCATOR',
      mapStamp: 'VALKUR / MMXXVI',
    },
    colecciones: {
      eyebrow: 'II · COLLECTIONS',
      titleA: 'Pieces that',
      titleB: 'honor time.',
      intro: 'Four collections, each one a distinct take on contemporary watchmaking. Noble steel, honest leather, and a movement calibrated to the exact weight on the wrist.',
      cta: 'Discover piece',
      taglines: {
        'VK-001': 'Automatic · 40mm',
        'VK-014': 'GMT · Brushed steel',
        'VK-022': 'Lacquered black dial',
        'VK-033': 'Patagonia Edition · 38mm',
      },
      priceLabel: 'From USD',
    },
    historia: {
      eyebrow: 'III · OUR STORY',
      titleA: 'An',
      titleAEm: 'inherited',
      titleAEnd: ' obsession,',
      titleB: 'a',
      titleBEm: ' singular',
      titleBEnd: ' vision.',
      origin: 'ORIGIN',
      originValue: 'Buenos Aires, Argentina',
      founded: 'FOUNDED',
      foundedValue: '2017',
      presence: 'OFFICIAL PRESENCE',
      presenceValue: 'Argentina · Chile · Peru',
      lead: 'Our story began in <b>2017</b>, in the province of Buenos Aires. From day one, we were driven by an obsession: understanding the watch as something more than an object to measure time.',
      p1: 'Behind every design there has always been a pursuit: balance, precision and character. We started by sketching, drafting, dreaming of pieces that would combine the nobility of traditional watchmaking with a contemporary point of view.',
      quote: '"When many believed the watch was losing meaning in the digital age, we saw a mission."',
      p2: 'We decided to go against the current, because we knew the watch still held a value no device can replace: the ability to pause time and give meaning to every instant. All of it, happening on your wrist.',
      p3: 'Over the years, that commitment allowed us to grow. Valkur was born in Argentina, but it already has official presence in Chile and Peru, carrying our watchmaking vision throughout the region.',
      closing1: 'Every Valkur watch is a statement of principles.',
      closing2A: 'Because we make watches,',
      closing2B: 'we don\'t sell caps.',
    },
    footer: {
      official: 'OFFICIAL SITES',
      house: 'HOUSE',
      contact: 'CONTACT',
      manifesto: 'MANIFESTO',
      argentina: 'Argentina',
      chile: 'Chile',
      peru: 'Peru',
      collections: 'Collections',
      story: 'Story',
      boutiques: 'Boutiques',
      service: 'After-sales service',
      manifestoText1: 'Time is not only measured,',
      manifestoText2: 'it is honored.',
      copyright: '© 2017 — 2026 · VALKUR · BUENOS AIRES',
      rights: 'ALL RIGHTS RESERVED',
      tagline: 'CRAFTED WITH RESPECT FOR TIME',
    },
    countries: {
      AR: { name: 'Argentina', city: 'Buenos Aires', label: 'ARGENTINA' },
      CL: { name: 'Chile',     city: 'Santiago',     label: 'CHILE' },
      PE: { name: 'Peru',      city: 'Lima',         label: 'PERU' },
    },
    map: {
      equator: 'EQUATOR · 0°',
      tropic: 'TROPIC OF CAPRICORN · 23.4°S',
    },
  },
};

// Resolve dotted path
function resolve(obj, path){
  return path.split('.').reduce((acc, k) => (acc && acc[k] !== undefined) ? acc[k] : undefined, obj);
}

// Singleton lang state with subscribers
const I18N = {
  lang: (typeof localStorage !== 'undefined' && localStorage.getItem('valkur.lang')) || 'es',
  subs: new Set(),
  set(lang){
    if (lang !== 'es' && lang !== 'en') return;
    this.lang = lang;
    try { localStorage.setItem('valkur.lang', lang); } catch(_){}
    document.documentElement.lang = lang;
    this.subs.forEach(fn => fn(lang));
  },
  toggle(){ this.set(this.lang === 'es' ? 'en' : 'es'); },
  t(path){
    const dict = TRANSLATIONS[this.lang] || TRANSLATIONS.es;
    const v = resolve(dict, path);
    return v !== undefined ? v : path;
  },
};

// Hook
function useT(){
  const [, set] = React.useState(0);
  React.useEffect(()=>{
    const fn = ()=> set(x=>x+1);
    I18N.subs.add(fn);
    return ()=> I18N.subs.delete(fn);
  },[]);
  // Return the t fn bound to current lang
  return (path) => I18N.t(path);
}

function useLang(){
  const [lang, setLang] = React.useState(I18N.lang);
  React.useEffect(()=>{
    const fn = (l)=> setLang(l);
    I18N.subs.add(fn);
    return ()=> I18N.subs.delete(fn);
  },[]);
  return [lang, (l)=> I18N.set(l)];
}

window.I18N = I18N;
window.useT = useT;
window.useLang = useLang;
