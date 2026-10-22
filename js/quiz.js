/* ================= QUIZ PRE-MENÚ & MOTOR MULTI-MODO ================= */

const MODE_LABELS = {
  choice: '🎯 Opción múltiple',
  image: '🖼️ ¿Qué pasa en la imagen?',
  sentence: '⚖️ ¿Oración bien o mal?',
  verb: '🔍 ¿Tiempo del verbo correcto?'
};

/* ---------- ESCENAS VISUALES SVG PARA LOS 12 TIEMPOS ---------- */
function renderSceneSVG(sceneKey) {
  const scenes = {
    'habit-train': `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="210" rx="10" fill="#143029"/>
        <rect x="0" y="162" width="520" height="48" fill="#0b1b16"/>
        <line x1="0" y1="168" x2="520" y2="168" stroke="#f2a53a" stroke-width="3" stroke-dasharray="14 10"/>
        <!-- Estación y reloj -->
        <rect x="30" y="26" width="130" height="44" rx="7" fill="#f7f2e3" stroke="#1b2a24" stroke-width="2.5"/>
        <text x="95" y="45" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" font-weight="700" fill="#ef5d43">EVERY DAY</text>
        <text x="95" y="62" text-anchor="middle" font-family="IBM Plex Mono" font-size="14" font-weight="700" fill="#1b2a24">⏰ 08:10 AM</text>
        <!-- Tren -->
        <rect x="145" y="84" width="290" height="72" rx="14" fill="#f7f2e3" stroke="#1b2a24" stroke-width="3"/>
        <rect x="145" y="122" width="290" height="16" fill="#ef5d43"/>
        <rect x="170" y="96" width="46" height="22" rx="4" fill="#56b6dd" stroke="#1b2a24" stroke-width="2"/>
        <rect x="230" y="96" width="46" height="22" rx="4" fill="#56b6dd" stroke="#1b2a24" stroke-width="2"/>
        <rect x="290" y="96" width="46" height="22" rx="4" fill="#56b6dd" stroke="#1b2a24" stroke-width="2"/>
        <rect x="355" y="94" width="60" height="26" rx="5" fill="#56b6dd" stroke="#1b2a24" stroke-width="2"/>
        <circle cx="190" cy="160" r="11" fill="#f2a53a" stroke="#1b2a24" stroke-width="3"/>
        <circle cx="250" cy="160" r="11" fill="#f2a53a" stroke="#1b2a24" stroke-width="3"/>
        <circle cx="375" cy="160" r="11" fill="#f2a53a" stroke="#1b2a24" stroke-width="3"/>
      </svg>`,
    'rain-now': `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="210" rx="10" fill="#132a24"/>
        <!-- Nubes y lluvia -->
        <g fill="#56b6dd" opacity="0.85">
          <circle cx="170" cy="48" r="26"/><circle cx="205" cy="42" r="32"/><circle cx="242" cy="50" r="24"/>
          <circle cx="330" cy="52" r="24"/><circle cx="362" cy="45" r="28"/><circle cx="392" cy="54" r="22"/>
        </g>
        <g stroke="#56b6dd" stroke-width="2.5" stroke-linecap="round">
          <line x1="165" y1="84" x2="155" y2="112"/><line x1="195" y1="88" x2="185" y2="118"/>
          <line x1="225" y1="84" x2="215" y2="112"/><line x1="335" y1="88" x2="325" y2="116"/>
          <line x1="365" y1="84" x2="355" y2="114"/><line x1="390" y1="90" x2="380" y2="118"/>
        </g>
        <!-- Paraguas y personaje mirando ahora mismo -->
        <path d="M220 130 Q275 82 330 130 Z" fill="#f2a53a" stroke="#1b2a24" stroke-width="3"/>
        <line x1="275" y1="130" x2="275" y2="175" stroke="#f7f2e3" stroke-width="3"/>
        <circle cx="262" cy="152" r="13" fill="#f7f2e3" stroke="#1b2a24" stroke-width="2.5"/>
        <rect x="247" y="166" width="30" height="36" rx="8" fill="#ef5d43" stroke="#1b2a24" stroke-width="2.5"/>
        <rect x="26" y="24" width="115" height="36" rx="7" fill="#ef5d43"/>
        <text x="83" y="47" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" font-weight="700" fill="#fff">LOOK! NOW</text>
      </svg>`,
    'london-trips': `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="210" rx="10" fill="#143029"/>
        <!-- Pasaporte con 3 sellos de Londres -->
        <rect x="70" y="28" width="380" height="154" rx="12" fill="#f7f2e3" stroke="#1b2a24" stroke-width="3"/>
        <line x1="260" y1="28" x2="260" y2="182" stroke="#1b2a24" stroke-width="2" stroke-dasharray="6 6"/>
        <text x="165" y="64" text-anchor="middle" font-family="Fraunces" font-size="18" font-weight="900" fill="#1b2a24">PASSPORT</text>
        <text x="165" y="88" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" fill="#1b2a24">EXPERIENCIAS DE VIDA</text>
        <rect x="105" y="106" width="120" height="48" rx="8" fill="#eee5cf" stroke="#1b2a24" stroke-width="2"/>
        <text x="165" y="135" text-anchor="middle" font-family="IBM Plex Mono" font-size="13" font-weight="700" fill="#ef5d43">3 TIMES ✓</text>
        <!-- Sellos -->
        <g transform="translate(290,46)">
          <rect width="130" height="34" rx="6" fill="#7cc796" stroke="#1b2a24" stroke-width="2"/>
          <text x="65" y="22" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" font-weight="700" fill="#1b2a24">✈ LONDON #1</text>
        </g>
        <g transform="translate(290,88)">
          <rect width="130" height="34" rx="6" fill="#f2a53a" stroke="#1b2a24" stroke-width="2"/>
          <text x="65" y="22" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" font-weight="700" fill="#1b2a24">✈ LONDON #2</text>
        </g>
        <g transform="translate(290,130)">
          <rect width="130" height="34" rx="6" fill="#56b6dd" stroke="#1b2a24" stroke-width="2"/>
          <text x="65" y="22" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" font-weight="700" fill="#1b2a24">✈ LONDON #3</text>
        </g>
      </svg>`,
    'study-duration': `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="210" rx="10" fill="#143029"/>
        <!-- Línea temporal continua desde hace 3 horas hasta ahora -->
        <rect x="40" y="32" width="440" height="46" rx="10" fill="#0b1b16" stroke="#7cc796" stroke-width="2"/>
        <line x1="75" y1="55" x2="445" y2="55" stroke="#f2a53a" stroke-width="5"/>
        <circle cx="75" cy="55" r="8" fill="#f2a53a"/>
        <circle cx="445" cy="55" r="9" fill="#ef5d43" stroke="#fff" stroke-width="2"/>
        <text x="260" y="48" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" font-weight="700" fill="#f7f2e3">FOR 3 HOURS ➔ STILL STUDYING NOW</text>
        <!-- Mesa con libros y lámpara -->
        <rect x="110" y="156" width="300" height="14" rx="5" fill="#f2a53a" stroke="#1b2a24" stroke-width="2"/>
        <rect x="150" y="118" width="75" height="38" rx="4" fill="#ef5d43" stroke="#1b2a24" stroke-width="2"/>
        <rect x="156" y="102" width="66" height="16" rx="3" fill="#56b6dd" stroke="#1b2a24" stroke-width="2"/>
        <rect x="255" y="106" width="95" height="50" rx="6" fill="#f7f2e3" stroke="#1b2a24" stroke-width="2.5"/>
        <text x="302" y="136" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" font-weight="700" fill="#1b2a24">ENGLISH</text>
      </svg>`,
    'rome-yesterday': `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="210" rx="10" fill="#143029"/>
        <!-- Calendario pasado terminado -->
        <rect x="44" y="34" width="150" height="142" rx="12" fill="#f7f2e3" stroke="#1b2a24" stroke-width="3"/>
        <rect x="44" y="34" width="150" height="38" rx="10" fill="#f2a53a" stroke="#1b2a24" stroke-width="3"/>
        <text x="119" y="58" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" font-weight="700" fill="#1b2a24">YESTERDAY</text>
        <text x="119" y="118" text-anchor="middle" font-family="Fraunces" font-size="34" font-weight="900" fill="#1b2a24">14</text>
        <text x="119" y="154" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" font-weight="700" fill="#ef5d43">FINISHED ✓</text>
        <!-- Pantalla de cine / película vista ayer -->
        <rect x="235" y="36" width="240" height="138" rx="12" fill="#eee5cf" stroke="#1b2a24" stroke-width="3"/>
        <polygon points="335,82 335,128 378,105" fill="#ef5d43" stroke="#1b2a24" stroke-width="2.5"/>
        <text x="355" y="62" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" font-weight="700" fill="#1b2a24">🎬 CINEMA NIGHT</text>
        <text x="355" y="156" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#1b2a24">8:00 PM - 10:00 PM (ENDED)</text>
      </svg>`,
    'cooking-phone': `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="210" rx="10" fill="#143029"/>
        <!-- Olla humeante (acción en progreso) -->
        <rect x="65" y="40" width="175" height="134" rx="12" fill="#f7f2e3" stroke="#1b2a24" stroke-width="2.5"/>
        <text x="152" y="64" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" font-weight="700" fill="#1b2a24">WHILE (EN PROGRESO)</text>
        <rect x="110" y="112" width="84" height="44" rx="8" fill="#ef5d43" stroke="#1b2a24" stroke-width="2.5"/>
        <path d="M132 102 Q126 88 136 78 M152 102 Q146 88 156 78 M172 102 Q166 88 176 78" stroke="#1b2a24" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Flecha de interrupción -->
        <text x="262" y="115" text-anchor="middle" font-family="Fraunces" font-size="28" font-weight="900" fill="#f2a53a">⚡</text>
        <!-- Teléfono sonando (acción que interrumpe) -->
        <rect x="285" y="40" width="175" height="134" rx="12" fill="#f2a53a" stroke="#1b2a24" stroke-width="2.5"/>
        <text x="372" y="64" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" font-weight="700" fill="#1b2a24">WHEN (INTERRUPCIÓN)</text>
        <rect x="348" y="80" width="48" height="76" rx="8" fill="#1b2a24"/>
        <rect x="354" y="88" width="36" height="54" rx="4" fill="#56b6dd"/>
        <text x="372" y="120" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" font-weight="700" fill="#1b2a24">RING!</text>
      </svg>`,
    'cinema-late': `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="210" rx="10" fill="#143029"/>
        <!-- Evento 1 (7:00 PM) vs Evento 2 (7:20 PM) -->
        <rect x="40" y="38" width="205" height="134" rx="12" fill="#f2a53a" stroke="#1b2a24" stroke-width="2.5"/>
        <text x="142" y="64" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" font-weight="700" fill="#1b2a24">1º PASADO ANTERIOR (20:00)</text>
        <rect x="72" y="78" width="140" height="68" rx="8" fill="#1b2a24"/>
        <text x="142" y="116" text-anchor="middle" font-family="Fraunces" font-size="16" font-weight="900" fill="#f7f2e3">FILM STARTED</text>
        <text x="262" y="112" text-anchor="middle" font-family="IBM Plex Mono" font-size="20" font-weight="700" fill="#f7f2e3">➔</text>
        <rect x="278" y="38" width="202" height="134" rx="12" fill="#f7f2e3" stroke="#1b2a24" stroke-width="2.5"/>
        <text x="379" y="64" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" font-weight="700" fill="#ef5d43">2º LLEGADA TARDE (20:20)</text>
        <text x="379" y="114" text-anchor="middle" font-family="Fraunces" font-size="18" font-weight="900" fill="#1b2a24">WE ARRIVED LATE</text>
        <text x="379" y="140" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" fill="#1b2a24">“Already started!”</text>
      </svg>`,
    'bus-wait-past': `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="210" rx="10" fill="#143029"/>
        <!-- Parada de autobús tras 1 hora de espera antes de llegar el bus -->
        <rect x="42" y="34" width="436" height="44" rx="9" fill="#0b1b16" stroke="#f2a53a" stroke-width="2"/>
        <text x="260" y="61" text-anchor="middle" font-family="IBM Plex Mono" font-size="12.5" font-weight="700" fill="#f2a53a">⏳ 60 MIN WAITING ➔ THEN THE BUS ARRIVED</text>
        <!-- Señal de parada y autobús llegando -->
        <line x1="115" y1="95" x2="115" y2="180" stroke="#f7f2e3" stroke-width="4"/>
        <circle cx="115" cy="95" r="16" fill="#ef5d43" stroke="#f7f2e3" stroke-width="2.5"/>
        <text x="115" y="99" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" font-weight="700" fill="#fff">BUS</text>
        <rect x="230" y="102" width="220" height="72" rx="12" fill="#f2a53a" stroke="#1b2a24" stroke-width="3"/>
        <rect x="250" y="114" width="45" height="26" rx="4" fill="#f7f2e3"/>
        <rect x="308" y="114" width="45" height="26" rx="4" fill="#f7f2e3"/>
        <rect x="366" y="114" width="64" height="26" rx="4" fill="#56b6dd"/>
        <circle cx="275" cy="176" r="12" fill="#1b2a24"/><circle cx="405" cy="176" r="12" fill="#1b2a24"/>
      </svg>`,
    'promise-help': `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="210" rx="10" fill="#143029"/>
        <!-- Bocadillo de decisión espontánea / promesa -->
        <rect x="65" y="34" width="390" height="140" rx="16" fill="#f7f2e3" stroke="#1b2a24" stroke-width="3"/>
        <rect x="92" y="54" width="160" height="28" rx="6" fill="#56b6dd"/>
        <text x="172" y="73" text-anchor="middle" font-family="IBM Plex Mono" font-size="11.5" font-weight="700" fill="#1b2a24">INSTANT PROMISE 💬</text>
        <text x="260" y="114" text-anchor="middle" font-family="Fraunces" font-size="22" font-weight="900" fill="#1b2a24">“The bags look heavy — I’ll carry them!”</text>
        <text x="260" y="146" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" fill="#1b2a24">Decisión tomada en el momento de hablar</text>
      </svg>`,
    'flight-tomorrow': `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="210" rx="10" fill="#143029"/>
        <!-- Cielo y nubes -->
        <circle cx="430" cy="52" r="28" fill="#f2a53a"/>
        <rect x="34" y="26" width="215" height="36" rx="8" fill="#56b6dd"/>
        <text x="141" y="49" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" font-weight="700" fill="#1b2a24">THIS TIME TOMORROW ✈</text>
        <!-- Avión en pleno vuelo -->
        <g transform="translate(115,82)">
          <rect x="20" y="28" width="240" height="42" rx="21" fill="#f7f2e3" stroke="#1b2a24" stroke-width="3"/>
          <polygon points="110,28 155,-12 178,-12 150,28" fill="#56b6dd" stroke="#1b2a24" stroke-width="2.5"/>
          <polygon points="110,70 155,106 178,106 150,70" fill="#56b6dd" stroke="#1b2a24" stroke-width="2.5"/>
          <polygon points="20,28 -5,4 18,4 42,28" fill="#ef5d43" stroke="#1b2a24" stroke-width="2.5"/>
          <circle cx="75" cy="48" r="6" fill="#56b6dd"/><circle cx="105" cy="48" r="6" fill="#56b6dd"/>
          <circle cx="135" cy="48" r="6" fill="#56b6dd"/><circle cx="165" cy="48" r="6" fill="#56b6dd"/>
          <circle cx="195" cy="48" r="6" fill="#56b6dd"/>
        </g>
      </svg>`,
    'bridge-2030': `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="210" rx="10" fill="#143029"/>
        <!-- Meta futura completada: BY 2030 -->
        <rect x="32" y="24" width="180" height="36" rx="8" fill="#7cc796" stroke="#1b2a24" stroke-width="2"/>
        <text x="122" y="47" text-anchor="middle" font-family="IBM Plex Mono" font-size="12" font-weight="700" fill="#1b2a24">BY 2030 · COMPLETED ✓</text>
        <!-- Puente colgante terminado -->
        <rect x="0" y="166" width="520" height="44" fill="#56b6dd" opacity="0.45"/>
        <line x1="40" y1="142" x2="480" y2="142" stroke="#f7f2e3" stroke-width="6"/>
        <rect x="135" y="68" width="16" height="102" fill="#f2a53a" stroke="#1b2a24" stroke-width="2"/>
        <rect x="365" y="68" width="16" height="102" fill="#f2a53a" stroke="#1b2a24" stroke-width="2"/>
        <path d="M40 140 Q143 75 143 72 Q260 155 373 72 Q373 75 480 140" fill="none" stroke="#f7f2e3" stroke-width="3"/>
      </svg>`,
    'anniversary-future': `
      <svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="210" rx="10" fill="#143029"/>
        <!-- Duración acumulada hacia una fecha futura -->
        <rect x="44" y="34" width="432" height="142" rx="14" fill="#f7f2e3" stroke="#1b2a24" stroke-width="3"/>
        <rect x="72" y="54" width="376" height="34" rx="8" fill="#56b6dd" stroke="#1b2a24" stroke-width="2"/>
        <text x="260" y="76" text-anchor="middle" font-family="IBM Plex Mono" font-size="12.5" font-weight="700" fill="#1b2a24">BY NEXT JUNE · 5 YEARS ACCUMULATED</text>
        <line x1="90" y1="126" x2="430" y2="126" stroke="#1b2a24" stroke-width="4"/>
        <circle cx="90" cy="126" r="9" fill="#f2a53a" stroke="#1b2a24" stroke-width="2"/>
        <circle cx="260" cy="126" r="9" fill="#ef5d43" stroke="#1b2a24" stroke-width="2"/>
        <circle cx="430" cy="126" r="10" fill="#56b6dd" stroke="#1b2a24" stroke-width="2"/>
        <text x="90" y="154" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#1b2a24">START (2022)</text>
        <text x="260" y="154" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#1b2a24">NOW</text>
        <text x="430" y="154" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" font-weight="700" fill="#1b2a24">NEXT JUNE (5 YRS)</text>
      </svg>`
  };
  return scenes[sceneKey] || scenes['rain-now'];
}

/* ---------- BANCO COMPLETO DE PREGUNTAS POR MODO Y TIEMPO (LOS 12 TIEMPOS) ---------- */

// 1. MODO OPCIÓN MÚLTIPLE (Completar la oración)
const CHOICE_BANK = [
  { tenseId: 'present-simple', t: 'Present Simple', s: 'The first train to Manchester ___ at 7:45 every morning.', o: ['leaves', 'is leaving', 'will leave', 'has left'], a: 0, w: 'Los horarios fijos (trenes, vuelos, clases) usan siempre Present Simple.' },
  { tenseId: 'present-simple', t: 'Present Simple', s: 'Water ___ at 100 degrees Celsius at sea level.', o: ['boils', 'is boiling', 'boiled', 'has boiled'], a: 0, w: 'Las leyes científicas y verdades universales van en Present Simple.' },
  { tenseId: 'present-continuous', t: 'Present Continuous', s: 'Look! It ___ heavily outside right now.', o: ['rains', 'is raining', 'rained', 'has rained'], a: 1, w: '“Look!” y “right now” indican una acción en progreso en este preciso instante.' },
  { tenseId: 'present-continuous', t: 'Present Continuous', s: 'Please be quiet — the baby ___ in the next room.', o: ['sleeps', 'is sleeping', 'has slept', 'slept'], a: 1, w: 'La acción ocurre ahora mismo mientras hablamos: am/is/are + -ing.' },
  { tenseId: 'present-perfect', t: 'Present Perfect', s: 'I ___ in this neighbourhood since 2019.', o: ['live', 'am living', 'have lived', 'lived'], a: 2, w: '“Since + año de inicio” conecta el pasado con el presente: Present Perfect.' },
  { tenseId: 'present-perfect', t: 'Present Perfect', s: 'She ___ sushi in her entire life.', o: ['never tried', 'has never tried', 'never tries', 'was never trying'], a: 1, w: 'Experiencias vitales sin fecha concreta usan Present Perfect con ever/never.' },
  { tenseId: 'present-perfect-continuous', t: 'Present Perfect Continuous', s: 'He looks exhausted because he ___ in the garden all morning.', o: ['works', 'worked', 'has been working', 'will work'], a: 2, w: 'Actividad reciente cuya duración deja un efecto visible ahora mismo: has been working.' },
  { tenseId: 'present-perfect-continuous', t: 'Present Perfect Continuous', s: 'How long ___ you ___ for the doctor?', o: ['do … wait', 'have … been waiting', 'are … waiting', 'did … wait'], a: 1, w: '“How long…?” preguntando por una espera que sigue activa usa Present Perfect Continuous.' },
  { tenseId: 'past-simple', t: 'Past Simple', s: 'She ___ to Rome with her cousins last summer.', o: ['goes', 'has gone', 'was going', 'went'], a: 3, w: '“Last summer” es un periodo cerrado en el pasado: manda el Past Simple (went).' },
  { tenseId: 'past-simple', t: 'Past Simple', s: 'Shakespeare ___ 37 plays during his lifetime.', o: ['has written', 'wrote', 'was writing', 'had written'], a: 1, w: 'Acciones históricas terminadas llevan siempre Past Simple.' },
  { tenseId: 'past-continuous', t: 'Past Continuous', s: 'While I ___ dinner, the doorbell suddenly rang.', o: ['made', 'was making', 'have made', 'had made'], a: 1, w: 'Acción larga en desarrollo (was making) interrumpida por una corta en pasado (rang).' },
  { tenseId: 'past-continuous', t: 'Past Continuous', s: 'At 9 pm yesterday, we ___ a documentary on TV.', o: ['watched', 'were watching', 'have watched', 'had watched'], a: 1, w: 'Hora exacta del pasado (“at 9 pm yesterday”) = acción en curso en ese momento.' },
  { tenseId: 'past-perfect', t: 'Past Perfect', s: 'When we arrived at the cinema, the film ___ already ___.', o: ['has … started', 'had … started', 'was … starting', 'did … start'], a: 1, w: 'La película empezó ANTES de que llegáramos: el pasado del pasado es Past Perfect.' },
  { tenseId: 'past-perfect', t: 'Past Perfect', s: 'She ___ snow before her trip to Norway in 2021.', o: ['never saw', 'has never seen', 'had never seen', 'wasn’t seeing'], a: 2, w: 'Experiencia previa a un momento pasado (“before her trip”) → had never seen.' },
  { tenseId: 'past-perfect-continuous', t: 'Past Perfect Continuous', s: 'She was angry because she ___ for over an hour when he finally showed up.', o: ['waited', 'has waited', 'had been waiting', 'was waiting'], a: 2, w: 'Subraya la duración acumulada antes de un evento pasado: had been waiting.' },
  { tenseId: 'past-perfect-continuous', t: 'Past Perfect Continuous', s: 'The ground was wet because it ___ all night.', o: ['rained', 'has been raining', 'had been raining', 'was raining'], a: 2, w: 'Causa continuada anterior a un efecto en el pasado (“was wet”) → had been raining.' },
  { tenseId: 'future-simple', t: 'Future Simple', s: 'Don’t worry about the exam. I ___ you study tonight, I promise.', o: ['help', 'am helping', 'will help', 'have helped'], a: 2, w: 'Las promesas y decisiones espontáneas se expresan con will + infinitivo.' },
  { tenseId: 'future-simple', t: 'Future Simple', s: 'I think scientists ___ life on Europa one day.', o: ['discover', 'are discovering', 'will discover', 'have discovered'], a: 2, w: 'Predicciones basadas en opinión (“I think…”) usan Future Simple (will).' },
  { tenseId: 'future-continuous', t: 'Future Continuous', s: 'This time next week, I ___ on a beach in Mexico.', o: ['will lie', 'will be lying', 'am lying', 'have lain'], a: 1, w: '“This time next week” señala una acción en progreso en un punto del futuro.' },
  { tenseId: 'future-continuous', t: 'Future Continuous', s: 'Don’t call at 8 pm tomorrow — we ___ dinner then.', o: ['will have', 'will be having', 'have', 'will have had'], a: 1, w: 'Acción que estará en pleno desarrollo a una hora concreta de mañana: will be having.' },
  { tenseId: 'future-perfect', t: 'Future Perfect', s: 'By 2030, engineers ___ the new high-speed bridge.', o: ['will finish', 'finish', 'will have finished', 'are finishing'], a: 2, w: '“By + fecha futura” indica que la acción ya estará completada antes de ese límite.' },
  { tenseId: 'future-perfect', t: 'Future Perfect', s: 'I ___ reading this report by Friday afternoon.', o: ['will finish', 'will have finished', 'am finishing', 'have finished'], a: 1, w: 'Para el viernes por la tarde ya estará terminado: will have + participio.' },
  { tenseId: 'future-perfect-continuous', t: 'Future Perfect Continuous', s: 'By next June, I ___ at this company for ten years.', o: ['will work', 'will have been working', 'am working', 'have been working'], a: 1, w: 'Duración continua acumulada hasta una fecha futura (“By next June… for ten years”).' },
  { tenseId: 'future-perfect-continuous', t: 'Future Perfect Continuous', s: 'By midnight, they ___ non-stop for twelve hours.', o: ['will drive', 'will be driving', 'will have been driving', 'have driven'], a: 2, w: 'Subraya cuántas horas llevarán haciendo la acción al llegar la medianoche.' }
];

// 2. MODO IMAGEN (¿Qué está pasando en la imagen?)
const IMAGE_BANK = [
  {
    tenseId: 'present-simple', t: 'Present Simple', scene: 'habit-train',
    clue: 'PISTA VISUAL: EVERY DAY · 08:10 AM SCHEDULE',
    caption: 'Horario fijo de estación que se repite cada mañana.',
    prompt: '¿Qué oración describe correctamente lo que muestra la escena?',
    o: ['The train leaves at 8:10 every morning.', 'The train is leaving yesterday at 8:10.', 'The train has left tomorrow morning.', 'The train was leaving every day.'],
    a: 0, w: 'Los horarios fijos y rutinas diarias se expresan con Present Simple: “The train leaves at 8:10”.'
  },
  {
    tenseId: 'present-continuous', t: 'Present Continuous', scene: 'rain-now',
    clue: 'PISTA VISUAL: LOOK! RIGHT NOW ☔',
    caption: 'Está cayendo lluvia en este preciso instante.',
    prompt: '¿Qué está pasando en la imagen ahora mismo?',
    o: ['It rains yesterday afternoon.', 'Look! It is raining right now.', 'It had rained tomorrow.', 'It will have rained every day.'],
    a: 1, w: 'La acción está ocurriendo ante nuestros ojos ahora mismo (“Look! right now”) → Present Continuous.'
  },
  {
    tenseId: 'present-perfect', t: 'Present Perfect', scene: 'london-trips',
    clue: 'PISTA VISUAL: PASSPORT · 3 LONDON STAMPS SO FAR',
    caption: 'Experiencia acumulada en la vida (sin importar la fecha exacta).',
    prompt: '¿Qué oración describe la experiencia que muestra el pasaporte?',
    o: ['I have visited London three times.', 'I visit London yesterday.', 'I was visiting London tomorrow.', 'I had visited London next year.'],
    a: 0, w: 'Las experiencias de vida acumuladas hasta hoy sin fecha específica usan Present Perfect.'
  },
  {
    tenseId: 'present-perfect-continuous', t: 'Present Perfect Continuous', scene: 'study-duration',
    clue: 'PISTA VISUAL: STARTED 3 HOURS AGO ➔ STILL STUDYING NOW',
    caption: 'Empezó hace 3 horas y continúa estudiando en este momento.',
    prompt: '¿Qué oración refleja esta acción iniciada en el pasado que sigue activa?',
    o: ['She studied for three hours tomorrow.', 'She has been studying English for three hours.', 'She will study three hours ago.', 'She studies since three hours.'],
    a: 1, w: 'Para subrayar la duración de una acción que empezó antes y continúa ahora usamos Present Perfect Continuous.'
  },
  {
    tenseId: 'past-simple', t: 'Past Simple', scene: 'rome-yesterday',
    clue: 'PISTA VISUAL: YESTERDAY NIGHT (TERMINADO ✓)',
    caption: 'La sesión de cine ocurrió ayer por la noche y ya concluyó.',
    prompt: '¿Qué oración describe lo que ocurrió ayer según la imagen?',
    o: ['We watched a great film yesterday.', 'We have watched a film yesterday.', 'We are watching a film yesterday.', 'We will watch a film yesterday.'],
    a: 0, w: 'Con “yesterday” (tiempo cerrado en el pasado) es obligatorio usar Past Simple.'
  },
  {
    tenseId: 'past-continuous', t: 'Past Continuous', scene: 'cooking-phone',
    clue: 'PISTA VISUAL: WHILE COOKING ➔ PHONE RANG ⚡',
    caption: 'Estaba cocinando cuando de repente sonó el teléfono.',
    prompt: '¿Qué acción describe correctamente la escena en el pasado?',
    o: ['I was cooking dinner when the phone rang.', 'I cooked dinner while the phone is ringing.', 'I have cooked when the phone will ring.', 'I am cooking when the phone rang.'],
    a: 0, w: 'La acción en progreso en el pasado va en Past Continuous (“was cooking”) y la interrupción en Past Simple (“rang”).'
  },
  {
    tenseId: 'past-perfect', t: 'Past Perfect', scene: 'cinema-late',
    clue: 'PISTA VISUAL: 20:00 FILM STARTED ➔ 20:20 WE ARRIVED',
    caption: 'Cuando llegamos al cine a las 20:20, la película ya había empezado a las 20:00.',
    prompt: '¿Qué oración expresa el orden real de los hechos en la imagen?',
    o: ['When we arrived, the film had already started.', 'When we arrived, the film starts.', 'When we arrive, the film will start yesterday.', 'The film has started before we arrived yesterday.'],
    a: 0, w: 'La acción ocurrida ANTES de otra acción pasada va en Past Perfect (“had already started”).'
  },
  {
    tenseId: 'past-perfect-continuous', t: 'Past Perfect Continuous', scene: 'bus-wait-past',
    clue: 'PISTA VISUAL: 60 MIN WAITING ➔ THEN BUS ARRIVED',
    caption: 'Llevaban una hora esperando bajo la lluvia cuando por fin llegó el autobús.',
    prompt: '¿Qué oración describe la espera previa a la llegada del autobús?',
    o: ['They had been waiting for an hour when the bus came.', 'They are waiting for an hour when the bus came.', 'They will be waiting when the bus came.', 'They wait for an hour yesterday.'],
    a: 0, w: 'Para la duración continua anterior a un momento del pasado se usa Past Perfect Continuous (“had been waiting”).'
  },
  {
    tenseId: 'future-simple', t: 'Future Simple', scene: 'promise-help',
    clue: 'PISTA VISUAL: DECISIÓN ESPONTÁNEA Y PROMESA',
    caption: 'Ofrecimiento inmediato al ver que alguien lleva bolsas pesadas.',
    prompt: '¿Qué oración expresa esta decisión tomada en el instante de hablar?',
    o: ['Don’t worry, I will help you carry those bags!', 'I helped you carry those bags tomorrow.', 'I have helped you tomorrow.', 'I am helping you yesterday.'],
    a: 0, w: 'Los ofrecimientos y decisiones espontáneas del momento se construyen con “will + verbo base”.'
  },
  {
    tenseId: 'future-continuous', t: 'Future Continuous', scene: 'flight-tomorrow',
    clue: 'PISTA VISUAL: THIS TIME TOMORROW · IN FLIGHT ✈',
    caption: 'Mañana a esta misma hora el avión estará en pleno vuelo hacia París.',
    prompt: '¿Qué oración describe lo que estará ocurriendo mañana a esta hora?',
    o: ['This time tomorrow, I will be flying to Paris.', 'This time tomorrow, I flew to Paris.', 'This time tomorrow, I have flown to Paris.', 'This time tomorrow, I was flying to Paris.'],
    a: 0, w: 'Una acción en progreso en un momento específico del futuro usa Future Continuous (“will be flying”).'
  },
  {
    tenseId: 'future-perfect', t: 'Future Perfect', scene: 'bridge-2030',
    clue: 'PISTA VISUAL: BY 2030 · BRIDGE COMPLETED ✓',
    caption: 'Para el año 2030, la obra del puente ya estará 100% terminada.',
    prompt: '¿Qué oración indica que la obra habrá concluido antes de 2030?',
    o: ['By 2030, engineers will have finished the bridge.', 'By 2030, engineers finished the bridge.', 'By 2030, engineers were finishing the bridge.', 'By 2030, engineers have finished the bridge.'],
    a: 0, w: '“By + fecha futura” pide Future Perfect (“will have finished”) para indicar que ya estará completado.'
  },
  {
    tenseId: 'future-perfect-continuous', t: 'Future Perfect Continuous', scene: 'anniversary-future',
    clue: 'PISTA VISUAL: BY NEXT JUNE · 5 YEARS STUDYING',
    caption: 'En junio del próximo año se cumplirán 5 años ininterrumpidos estudiando inglés.',
    prompt: '¿Qué oración expresa esta duración acumulada hasta un punto del futuro?',
    o: ['By next June, I will have been studying English for five years.', 'By next June, I studied English for five years.', 'By next June, I am studying English for five years.', 'By next June, I was studying English for five years.'],
    a: 0, w: 'La duración acumulada hasta un hito futuro se expresa con Future Perfect Continuous (“will have been studying”).'
  }
];

// 3. MODO ORACIÓN (¿La oración está bien o mal?)
const SENTENCE_BANK = [
  { tenseId: 'present-simple', t: 'Present Simple', sent: 'She works in a hospital from Monday to Friday.', isCorrect: true, correction: 'She works in a hospital from Monday to Friday.', w: '¡Está perfecta! En 3ª persona singular (she) el verbo añade -s en Present Simple para rutinas.' },
  { tenseId: 'present-simple', t: 'Present Simple', sent: 'Does he lives near the university?', isCorrect: false, correction: 'Does he live near the university?', w: 'Incorrecta: cuando ya está el auxiliar “Does”, el verbo principal va en forma base sin -s (“live”).' },
  { tenseId: 'present-continuous', t: 'Present Continuous', sent: 'Listen! Somebody is knocking at the door right now.', isCorrect: true, correction: 'Listen! Somebody is knocking at the door right now.', w: '¡Correcta! “Listen!” y “right now” piden Present Continuous (is knocking).' },
  { tenseId: 'present-continuous', t: 'Present Continuous', sent: 'We are meet our friends for dinner tonight.', isCorrect: false, correction: 'We are meeting our friends for dinner tonight.', w: 'Incorrecta: en Present Continuous después de “are” el verbo debe llevar terminación -ing (“meeting”).' },
  { tenseId: 'present-perfect', t: 'Present Perfect', sent: 'I have gone to Paris in 2019.', isCorrect: false, correction: 'I went to Paris in 2019.', w: 'Incorrecta: si mencionas una fecha cerrada del pasado (“in 2019”), no puedes usar Present Perfect; debes usar Past Simple.' },
  { tenseId: 'present-perfect', t: 'Present Perfect', sent: 'They have lived in this flat since 2018.', isCorrect: true, correction: 'They have lived in this flat since 2018.', w: '¡Correcta! Empezaron a vivir allí en 2018 y siguen hoy: have lived + since 2018.' },
  { tenseId: 'present-perfect-continuous', t: 'Present Perfect Continuous', sent: 'It has been raining all afternoon and the streets are wet.', isCorrect: true, correction: 'It has been raining all afternoon and the streets are wet.', w: '¡Correcta! Acción continua reciente con resultado visible en el presente.' },
  { tenseId: 'present-perfect-continuous', t: 'Present Perfect Continuous', sent: 'I have been learn English for two years.', isCorrect: false, correction: 'I have been learning English for two years.', w: 'Incorrecta: tras “have been” el verbo debe ir en gerundio con -ing (“learning”).' },
  { tenseId: 'past-simple', t: 'Past Simple', sent: 'I didn’t went to the party last night.', isCorrect: false, correction: 'I didn’t go to the party last night.', w: 'Incorrecta: después del auxiliar negativo “didn’t”, el verbo vuelve a su forma base (“go”, nunca “went”).' },
  { tenseId: 'past-simple', t: 'Past Simple', sent: 'We watched a classic film at the cinema yesterday.', isCorrect: true, correction: 'We watched a classic film at the cinema yesterday.', w: '¡Correcta! Acción terminada en un momento concreto del pasado (“yesterday”).' },
  { tenseId: 'past-continuous', t: 'Past Continuous', sent: 'I was reading a book when you called me.', isCorrect: true, correction: 'I was reading a book when you called me.', w: '¡Correcta! Acción en desarrollo (was reading) interrumpida por una acción puntual (called).' },
  { tenseId: 'past-continuous', t: 'Past Continuous', sent: 'They was playing football all evening yesterday.', isCorrect: false, correction: 'They were playing football all evening yesterday.', w: 'Incorrecta: con “They” el pasado de be es “were”, no “was” (“They were playing”).' },
  { tenseId: 'past-perfect', t: 'Past Perfect', sent: 'When we arrived at the station, the train had already left.', isCorrect: true, correction: 'When we arrived at the station, the train had already left.', w: '¡Correcta! El tren salió antes de nuestra llegada: had + participio (left).' },
  { tenseId: 'past-perfect', t: 'Past Perfect', sent: 'She had never saw snow before that winter.', isCorrect: false, correction: 'She had never seen snow before that winter.', w: 'Incorrecta: después de “had” se usa el participio pasado (“seen”), no el pasado simple (“saw”).' },
  { tenseId: 'past-perfect-continuous', t: 'Past Perfect Continuous', sent: 'He was tired because he had been working for ten hours.', isCorrect: true, correction: 'He was tired because he had been working for ten hours.', w: '¡Correcta! Explica la duración previa que causó el cansancio en el pasado.' },
  { tenseId: 'past-perfect-continuous', t: 'Past Perfect Continuous', sent: 'They had been wait for an hour before the bus came.', isCorrect: false, correction: 'They had been waiting for an hour before the bus came.', w: 'Incorrecta: falta la terminación -ing en el verbo principal (“had been waiting”).' },
  { tenseId: 'future-simple', t: 'Future Simple', sent: 'I think it will rain tomorrow morning.', isCorrect: true, correction: 'I think it will rain tomorrow morning.', w: '¡Correcta! Predicción con “I think” usando will + verbo en forma base.' },
  { tenseId: 'future-simple', t: 'Future Simple', sent: 'She will calls you as soon as she arrives.', isCorrect: false, correction: 'She will call you as soon as she arrives.', w: 'Incorrecta: después del modal “will” el verbo nunca lleva -s en 3ª persona (“will call”).' },
  { tenseId: 'future-continuous', t: 'Future Continuous', sent: 'This time tomorrow, I will be flying to Paris.', isCorrect: true, correction: 'This time tomorrow, I will be flying to Paris.', w: '¡Correcta! Acción en progreso en un punto concreto del futuro (will be + -ing).' },
  { tenseId: 'future-continuous', t: 'Future Continuous', sent: 'At 9 pm tomorrow, we will be have dinner.', isCorrect: false, correction: 'At 9 pm tomorrow, we will be having dinner.', w: 'Incorrecta: el Future Continuous requiere “will be + verbo-ing” (“will be having”).' },
  { tenseId: 'future-perfect', t: 'Future Perfect', sent: 'By 2030, scientists will have found a cure.', isCorrect: true, correction: 'By 2030, scientists will have found a cure.', w: '¡Correcta! Acción que habrá concluido antes de una fecha futura (“By 2030”).' },
  { tenseId: 'future-perfect', t: 'Future Perfect', sent: 'By Friday, I will has finished the project.', isCorrect: false, correction: 'By Friday, I will have finished the project.', w: 'Incorrecta: detrás de “will” siempre va “have” en forma base, nunca “has”.' },
  { tenseId: 'future-perfect-continuous', t: 'Future Perfect Continuous', sent: 'In June, I will have been studying English for five years.', isCorrect: true, correction: 'In June, I will have been studying English for five years.', w: '¡Correcta! Estructura impecable de Future Perfect Continuous: will have been + -ing.' },
  { tenseId: 'future-perfect-continuous', t: 'Future Perfect Continuous', sent: 'By midnight, they will have been drove for twelve hours.', isCorrect: false, correction: 'By midnight, they will have been driving for twelve hours.', w: 'Incorrecta: tras “will have been” el verbo debe ir con -ing (“driving”), no en pasado.' }
];

// 4. MODO VERBO (¿El tiempo verbal de este verbo está bien?)
const VERB_BANK = [
  { tenseId: 'present-simple', t: 'Present Simple', sent: 'Water <mark>boils</mark> at 100 °C.', verb: 'boils', claimedTense: 'Present Simple', isCorrect: true, w: '¡Correcto! “boils” está en Present Simple (3ª persona singular) para un hecho científico.' },
  { tenseId: 'present-simple', t: 'Present Simple', sent: 'The train <mark>leaves</mark> at 8:10 tomorrow.', verb: 'leaves', claimedTense: 'Future Continuous', isCorrect: false, w: 'Incorrecto: aunque hable de mañana, la forma verbal “leaves” es Present Simple (usado para horarios fijos).' },
  { tenseId: 'present-continuous', t: 'Present Continuous', sent: 'I <mark>am studying</mark> English right now.', verb: 'am studying', claimedTense: 'Present Continuous', isCorrect: true, w: '¡Correcto! “am + studying” (be + -ing) es Present Continuous.' },
  { tenseId: 'present-continuous', t: 'Present Continuous', sent: 'She <mark>is living</mark> with her aunt this month.', verb: 'is living', claimedTense: 'Present Perfect', isCorrect: false, w: 'Incorrecto: “is living” es Present Continuous (am/is/are + -ing), no Present Perfect.' },
  { tenseId: 'present-perfect', t: 'Present Perfect', sent: 'I <mark>have visited</mark> London three times.', verb: 'have visited', claimedTense: 'Present Perfect', isCorrect: true, w: '¡Correcto! “have + participio (visited)” corresponde exactamente a Present Perfect.' },
  { tenseId: 'present-perfect', t: 'Present Perfect', sent: 'She <mark>has just finished</mark> the report.', verb: 'has just finished', claimedTense: 'Past Simple', isCorrect: false, w: 'Incorrecto: “has finished” lleva el auxiliar have/has + participio, por tanto es Present Perfect, no Past Simple.' },
  { tenseId: 'present-perfect-continuous', t: 'Present Perfect Continuous', sent: 'I <mark>have been learning</mark> English for two years.', verb: 'have been learning', claimedTense: 'Present Perfect Continuous', isCorrect: true, w: '¡Correcto! “have been + verbo-ing” es la fórmula exacta del Present Perfect Continuous.' },
  { tenseId: 'present-perfect-continuous', t: 'Present Perfect Continuous', sent: 'It <mark>has been raining</mark> all morning.', verb: 'has been raining', claimedTense: 'Past Continuous', isCorrect: false, w: 'Incorrecto: “has been raining” es Present Perfect Continuous (empezó antes y sigue afectando al presente).' },
  { tenseId: 'past-simple', t: 'Past Simple', sent: 'Shakespeare <mark>wrote</mark> 37 plays.', verb: 'wrote', claimedTense: 'Past Simple', isCorrect: true, w: '¡Correcto! “wrote” es el Past Simple irregular del verbo “write”.' },
  { tenseId: 'past-simple', t: 'Past Simple', sent: 'We <mark>watched</mark> a film yesterday.', verb: 'watched', claimedTense: 'Past Perfect', isCorrect: false, w: 'Incorrecto: “watched” no lleva “had”; es Past Simple, no Past Perfect.' },
  { tenseId: 'past-continuous', t: 'Past Continuous', sent: 'I <mark>was reading</mark> when you called.', verb: 'was reading', claimedTense: 'Past Continuous', isCorrect: true, w: '¡Correcto! “was/were + verbo-ing” (“was reading”) es Past Continuous.' },
  { tenseId: 'past-continuous', t: 'Past Continuous', sent: 'It <mark>was raining</mark> all evening.', verb: 'was raining', claimedTense: 'Present Continuous', isCorrect: false, w: 'Incorrecto: el auxiliar “was” está en pasado, por lo que “was raining” es Past Continuous.' },
  { tenseId: 'past-perfect', t: 'Past Perfect', sent: 'When we arrived, the film <mark>had started</mark>.', verb: 'had started', claimedTense: 'Past Perfect', isCorrect: true, w: '¡Correcto! “had + participio (started)” es Past Perfect (el pasado del pasado).' },
  { tenseId: 'past-perfect', t: 'Past Perfect', sent: 'She <mark>had never seen</mark> snow before that trip.', verb: 'had never seen', claimedTense: 'Present Perfect', isCorrect: false, w: 'Incorrecto: lleva “had” (pasado) y no “has”, por lo que es Past Perfect.' },
  { tenseId: 'past-perfect-continuous', t: 'Past Perfect Continuous', sent: 'He <mark>had been working</mark> for ten hours.', verb: 'had been working', claimedTense: 'Past Perfect Continuous', isCorrect: true, w: '¡Correcto! “had been + verbo-ing” es Past Perfect Continuous.' },
  { tenseId: 'past-perfect-continuous', t: 'Past Perfect Continuous', sent: 'They <mark>had been waiting</mark> for an hour when the bus came.', verb: 'had been waiting', claimedTense: 'Future Perfect Continuous', isCorrect: false, w: 'Incorrecto: “had been waiting” ocurre en el pasado antes del autobús: es Past Perfect Continuous.' },
  { tenseId: 'future-simple', t: 'Future Simple', sent: 'I think it <mark>will rain</mark> tomorrow.', verb: 'will rain', claimedTense: 'Future Simple', isCorrect: true, w: '¡Correcto! “will + verbo base (rain)” es Future Simple.' },
  { tenseId: 'future-simple', t: 'Future Simple', sent: 'Don’t worry, I <mark>will help</mark> you.', verb: 'will help', claimedTense: 'Future Perfect', isCorrect: false, w: 'Incorrecto: “will help” no tiene “have + participio”; es Future Simple.' },
  { tenseId: 'future-continuous', t: 'Future Continuous', sent: 'This time tomorrow, I <mark>will be flying</mark> to Paris.', verb: 'will be flying', claimedTense: 'Future Continuous', isCorrect: true, w: '¡Correcto! “will be + verbo-ing (flying)” es Future Continuous.' },
  { tenseId: 'future-continuous', t: 'Future Continuous', sent: '<mark>Will</mark> you <mark>be using</mark> the car tonight?', verb: 'will be using', claimedTense: 'Future Simple', isCorrect: false, w: 'Incorrecto: lleva “be + using (-ing)”, por tanto es Future Continuous, no Future Simple.' },
  { tenseId: 'future-perfect', t: 'Future Perfect', sent: 'By 2030, scientists <mark>will have found</mark> a cure.', verb: 'will have found', claimedTense: 'Future Perfect', isCorrect: true, w: '¡Correcto! “will have + participio (found)” es Future Perfect.' },
  { tenseId: 'future-perfect', t: 'Future Perfect', sent: 'I <mark>will have finished</mark> the book by Friday.', verb: 'will have finished', claimedTense: 'Present Perfect', isCorrect: false, w: 'Incorrecto: lleva “will have finished” mirando hacia el viernes futuro; es Future Perfect.' },
  { tenseId: 'future-perfect-continuous', t: 'Future Perfect Continuous', sent: 'In June, I <mark>will have been studying</mark> English for five years.', verb: 'will have been studying', claimedTense: 'Future Perfect Continuous', isCorrect: true, w: '¡Correcto! “will have been + verbo-ing” es Future Perfect Continuous.' },
  { tenseId: 'future-perfect-continuous', t: 'Future Perfect Continuous', sent: 'By midnight, they <mark>will have been driving</mark> for twelve hours.', verb: 'will have been driving', claimedTense: 'Future Continuous', isCorrect: false, w: 'Incorrecto: incluye “have been + driving”, por lo que es Future Perfect Continuous.' }
];

/* ---------- GENERADOR DINÁMICO EXTRA SI EL USUARIO PIDE MUCHAS PREGUNTAS DE POCOS TIEMPOS ---------- */
const EXTRA_VERBS = [
  { base: 'write', third: 'writes', ing: 'writing', past: 'wrote', pp: 'written', obj: 'a new article' },
  { base: 'build', third: 'builds', ing: 'building', past: 'built', pp: 'built', obj: 'the solar station' },
  { base: 'speak', third: 'speaks', ing: 'speaking', past: 'spoke', pp: 'spoken', obj: 'at the conference' },
  { base: 'drive', third: 'drives', ing: 'driving', past: 'drove', pp: 'driven', obj: 'across the coast' },
  { base: 'paint', third: 'paints', ing: 'painting', past: 'painted', pp: 'painted', obj: 'the studio wall' },
  { base: 'teach', third: 'teaches', ing: 'teaching', past: 'taught', pp: 'taught', obj: 'grammar lessons' }
];

function conjugateForSubject(tenseId, vObj) {
  switch (tenseId) {
    case 'present-simple': return vObj.third;
    case 'present-continuous': return 'is ' + vObj.ing;
    case 'present-perfect': return 'has ' + vObj.pp;
    case 'present-perfect-continuous': return 'has been ' + vObj.ing;
    case 'past-simple': return vObj.past;
    case 'past-continuous': return 'was ' + vObj.ing;
    case 'past-perfect': return 'had ' + vObj.pp;
    case 'past-perfect-continuous': return 'had been ' + vObj.ing;
    case 'future-simple': return 'will ' + vObj.base;
    case 'future-continuous': return 'will be ' + vObj.ing;
    case 'future-perfect': return 'will have ' + vObj.pp;
    case 'future-perfect-continuous': return 'will have been ' + vObj.ing;
    default: return vObj.base;
  }
}

function buildExtraQuestion(tenseId, mode, index) {
  const tn = TENSES.find(t => t.id === tenseId) || TENSES[0];
  const v = EXTRA_VERBS[index % EXTRA_VERBS.length];
  const marker = tn.markers[index % tn.markers.length] || 'every day';
  const correctForm = conjugateForSubject(tenseId, v);
  const otherTenses = TENSES.filter(t => t.id !== tenseId);

  if (mode === 'verb') {
    const isOk = index % 2 === 0;
    const wrongTense = otherTenses[index % otherTenses.length];
    return {
      mode: 'verb',
      tenseId,
      t: tn.en,
      sent: `She <mark>${correctForm}</mark> ${v.obj} (${marker}).`,
      verb: correctForm,
      claimedTense: isOk ? tn.en : wrongTense.en,
      o: ['✓ Sí, el verbo y tiempo son correctos', '✗ No, el tiempo verbal indicado no coincide'],
      a: isOk ? 0 : 1,
      w: isOk
        ? `¡Exacto! “${correctForm}” está conjugado en <b>${tn.en}</b> (${tn.formula[0]}).`
        : `No coincide: la forma “${correctForm}” pertenece a <b>${tn.en}</b>, no a ${wrongTense.en}.`
    };
  }

  if (mode === 'sentence') {
    const isOk = index % 2 === 0;
    const brokenForm = tenseId.includes('continuous') ? `is ${v.base}` : `has ${v.past === v.pp ? v.base : v.past}`;
    const shownForm = isOk ? correctForm : brokenForm;
    return {
      mode: 'sentence',
      tenseId,
      t: tn.en,
      sent: `She ${shownForm} ${v.obj} (${marker}).`,
      correction: `She ${correctForm} ${v.obj} (${marker}).`,
      o: ['✓ Sí, la oración es correcta', '✗ No, la oración tiene un error'],
      a: isOk ? 0 : 1,
      w: isOk
        ? `¡Correcta! Usa adecuadamente <b>${tn.en}</b>: “She ${correctForm} ${v.obj}”.`
        : `Tenía error. En <b>${tn.en}</b> la forma correcta es: <b>“She ${correctForm} ${v.obj}”</b>.`
    };
  }

  // Por defecto choice
  const distractors = [
    conjugateForSubject(otherTenses[(index + 1) % otherTenses.length].id, v),
    conjugateForSubject(otherTenses[(index + 4) % otherTenses.length].id, v),
    conjugateForSubject(otherTenses[(index + 7) % otherTenses.length].id, v)
  ];
  const opts = [correctForm, ...distractors];
  return {
    mode: 'choice',
    tenseId,
    t: tn.en,
    s: `She ___ ${v.obj} (${marker}).`,
    o: opts,
    a: 0,
    w: `La pista “${marker}” y la estructura corresponden a <b>${tn.en}</b>: “${correctForm}”.`
  };
}

/* =========================================================================
   PARTE 1: LÓGICA DEL CONFIGURADOR (PRE-MENÚ EN quiz.html)
   ========================================================================= */
const configuratorEl = document.getElementById('quizConfigurator');

if (configuratorEl) {
  let selectedTenses = new Set(TENSES.map(t => t.id));
  let selectedModes = new Set(['choice', 'image', 'sentence', 'verb']);
  let selectedTimer = 0;
  let selectedCount = 8;

  // Cargar configuración previa si existe en sessionStorage
  try {
    const saved = JSON.parse(sessionStorage.getItem('tenselab_quiz_cfg') || 'null');
    if (saved) {
      if (Array.isArray(saved.tenses) && saved.tenses.length) selectedTenses = new Set(saved.tenses);
      if (Array.isArray(saved.modes) && saved.modes.length) selectedModes = new Set(saved.modes);
      if (typeof saved.timer === 'number') selectedTimer = saved.timer;
      if (typeof saved.count === 'number') selectedCount = saved.count;
    }
  } catch (_) {}

  const tensesGrid = document.getElementById('cfgTensesGrid');
  const tenseCountEl = document.getElementById('cfgTenseCount');
  const modeCountEl = document.getElementById('cfgModeCount');
  const summaryTextEl = document.getElementById('cfgSummaryText');
  const warningEl = document.getElementById('cfgWarning');

  function renderTensesColumns() {
    const groups = [
      { key: 'past', label: 'Pasado (Past)', color: 'var(--past)' },
      { key: 'present', label: 'Presente (Present)', color: 'var(--present)' },
      { key: 'future', label: 'Futuro (Future)', color: 'var(--future)' }
    ];

    tensesGrid.innerHTML = groups.map(g => {
      const list = TENSES.filter(t => t.time === g.key);
      return `
        <div class="qcfg-time-col" style="--tcol:${g.color}">
          <div class="qcfg-time-col-head">
            <span>${g.label}</span>
            <button type="button" data-col-toggle="${g.key}">Marcar/Desmarcar</button>
          </div>
          ${list.map(t => {
            const isSel = selectedTenses.has(t.id);
            return `
              <button type="button" class="qcfg-tense-item ${isSel ? 'sel' : ''}" data-tense="${t.id}" style="--tcol:${g.color}">
                <span class="qcfg-check">✓</span>
                <span class="qcfg-tense-info">
                  <span class="qcfg-tense-en">${t.en}</span>
                  <span class="qcfg-tense-es">${t.es} · <i>${t.short}</i></span>
                </span>
              </button>
            `;
          }).join('')}
        </div>
      `;
    }).join('');
  }

  function syncUI() {
    // Actualizar items de tiempos
    tensesGrid.querySelectorAll('.qcfg-tense-item').forEach(btn => {
      const id = btn.dataset.tense;
      btn.classList.toggle('sel', selectedTenses.has(id));
    });
    tenseCountEl.textContent = `${selectedTenses.size} de 12 seleccionados`;

    // Actualizar tarjetas de modos
    document.querySelectorAll('#cfgModesGrid .qcfg-mode-card').forEach(card => {
      const m = card.dataset.mode;
      card.classList.toggle('sel', selectedModes.has(m));
    });
    modeCountEl.textContent = `${selectedModes.size} ${selectedModes.size === 1 ? 'modo activo' : 'modos activos'}`;

    // Actualizar pills de reloj
    document.querySelectorAll('#cfgTimerPills .qcfg-pill').forEach(p => {
      p.classList.toggle('sel', Number(p.dataset.timer) === selectedTimer);
    });

    // Actualizar pills de cantidad
    document.querySelectorAll('#cfgCountPills .qcfg-pill').forEach(p => {
      p.classList.toggle('sel', Number(p.dataset.count) === selectedCount);
    });

    // Resumen inferior
    const timerTxt = selectedTimer > 0 ? `⏱ Contrarreloj ${selectedTimer}s` : 'Sin límite de tiempo';
    const tenseTxt = selectedTenses.size === 12 ? 'Los 12 tiempos' : `${selectedTenses.size} tiempo${selectedTenses.size === 1 ? '' : 's'}`;
    const modeTxt = selectedModes.size === 4 ? '4 modos (Mixto)' : Array.from(selectedModes).map(m => MODE_LABELS[m]).join(' + ');
    summaryTextEl.textContent = `${tenseTxt} · ${modeTxt} · ${timerTxt} · ${selectedCount} preguntas`;

    const valid = selectedTenses.size > 0 && selectedModes.size > 0;
    warningEl.classList.toggle('show', !valid);
  }

  renderTensesColumns();
  syncUI();

  // Eventos de selección individual de tiempo o columna completa
  tensesGrid.addEventListener('click', e => {
    const colBtn = e.target.closest('[data-col-toggle]');
    if (colBtn) {
      const timeKey = colBtn.dataset.colToggle;
      const colIds = TENSES.filter(t => t.time === timeKey).map(t => t.id);
      const allSelected = colIds.every(id => selectedTenses.has(id));
      colIds.forEach(id => {
        if (allSelected && selectedTenses.size > colIds.length) selectedTenses.delete(id);
        else selectedTenses.add(id);
      });
      document.querySelectorAll('#cfgTensePresets .qcfg-preset').forEach(b => b.classList.remove('active'));
      syncUI();
      return;
    }

    const item = e.target.closest('.qcfg-tense-item');
    if (!item) return;
    const id = item.dataset.tense;
    if (selectedTenses.has(id)) {
      if (selectedTenses.size > 1) selectedTenses.delete(id);
    } else {
      selectedTenses.add(id);
    }
    document.querySelectorAll('#cfgTensePresets .qcfg-preset').forEach(b => b.classList.remove('active'));
    syncUI();
  });

  // Eventos de presets rápidos de tiempos
  document.getElementById('cfgTensePresets').addEventListener('click', e => {
    const btn = e.target.closest('.qcfg-preset');
    if (!btn) return;
    const preset = btn.dataset.preset;
    selectedTenses.clear();
    TENSES.forEach(t => {
      if (preset === 'all') selectedTenses.add(t.id);
      else if (preset === 'past' && t.time === 'past') selectedTenses.add(t.id);
      else if (preset === 'present' && t.time === 'present') selectedTenses.add(t.id);
      else if (preset === 'future' && t.time === 'future') selectedTenses.add(t.id);
      else if (preset === 'simple' && t.aspect === 'simple') selectedTenses.add(t.id);
      else if (preset === 'continuous' && t.aspect === 'continuous') selectedTenses.add(t.id);
      else if (preset === 'perfect' && t.aspect.includes('perfect')) selectedTenses.add(t.id);
    });
    document.querySelectorAll('#cfgTensePresets .qcfg-preset').forEach(b => b.classList.toggle('active', b === btn));
    syncUI();
  });

  // Eventos de selección de modos
  document.getElementById('cfgModesGrid').addEventListener('click', e => {
    const card = e.target.closest('.qcfg-mode-card');
    if (!card) return;
    const mode = card.dataset.mode;
    if (selectedModes.has(mode)) {
      if (selectedModes.size > 1) selectedModes.delete(mode);
    } else {
      selectedModes.add(mode);
    }
    syncUI();
  });

  document.getElementById('cfgSelectAllModes').addEventListener('click', () => {
    ['choice', 'image', 'sentence', 'verb'].forEach(m => selectedModes.add(m));
    syncUI();
  });

  // Eventos de contrarreloj
  document.getElementById('cfgTimerPills').addEventListener('click', e => {
    const pill = e.target.closest('.qcfg-pill');
    if (!pill) return;
    selectedTimer = Number(pill.dataset.timer);
    syncUI();
  });

  // Eventos de cantidad de preguntas
  document.getElementById('cfgCountPills').addEventListener('click', e => {
    const pill = e.target.closest('.qcfg-pill');
    if (!pill) return;
    selectedCount = Number(pill.dataset.count);
    syncUI();
  });

  // Botón de lanzar y redirigir a la página del quiz (quiz-play.html)
  document.getElementById('cfgLaunchBtn').addEventListener('click', () => {
    if (selectedTenses.size === 0 || selectedModes.size === 0) {
      warningEl.classList.add('show');
      return;
    }
    const cfg = {
      tenses: Array.from(selectedTenses),
      modes: Array.from(selectedModes),
      timer: selectedTimer,
      count: selectedCount
    };
    try {
      sessionStorage.setItem('tenselab_quiz_cfg', JSON.stringify(cfg));
    } catch (_) {}

    const params = new URLSearchParams();
    params.set('tenses', cfg.tenses.join(','));
    params.set('modes', cfg.modes.join(','));
    params.set('timer', String(cfg.timer));
    params.set('count', String(cfg.count));
    window.location.href = `quiz-play.html?${params.toString()}`;
  });
}

/* =========================================================================
   PARTE 2: MOTOR DE PARTIDA EN LA PÁGINA DEL QUIZ (quiz-play.html)
   ========================================================================= */
const quizBox = document.getElementById('quizCard');

if (quizBox) {
  let activeCfg = {
    tenses: TENSES.map(t => t.id),
    modes: ['choice', 'image', 'sentence', 'verb'],
    timer: 0,
    count: 8
  };

  // Leer configuración desde URL o sessionStorage
  (function loadActiveConfig() {
    const params = new URLSearchParams(window.location.search);
    const urlTenses = params.get('tenses');
    const urlModes = params.get('modes');
    const urlTimer = params.get('timer');
    const urlCount = params.get('count');

    if (urlTenses || urlModes || urlTimer || urlCount) {
      const validIds = new Set(TENSES.map(t => t.id));
      if (urlTenses) {
        const parsedT = urlTenses.split(',').filter(id => validIds.has(id));
        if (parsedT.length) activeCfg.tenses = parsedT;
      }
      if (urlModes) {
        const parsedM = urlModes.split(',').filter(m => MODE_LABELS[m]);
        if (parsedM.length) activeCfg.modes = parsedM;
      }
      if (urlTimer !== null && !isNaN(Number(urlTimer))) activeCfg.timer = Math.max(0, Number(urlTimer));
      if (urlCount !== null && !isNaN(Number(urlCount))) activeCfg.count = Math.min(40, Math.max(1, Number(urlCount)));
    } else {
      try {
        const saved = JSON.parse(sessionStorage.getItem('tenselab_quiz_cfg') || 'null');
        if (saved) activeCfg = { ...activeCfg, ...saved };
      } catch (_) {}
    }

    const metaEl = document.getElementById('quizActiveConfigMeta');
    if (metaEl) {
      const tLabel = activeCfg.tenses.length === 12 ? '12 tiempos' : `${activeCfg.tenses.length} tiempo(s)`;
      const mLabel = activeCfg.modes.length === 4 ? '4 modos (Mixto)' : `${activeCfg.modes.length} modo(s)`;
      const clockLabel = activeCfg.timer > 0 ? `⏱ ${activeCfg.timer}s / preg` : 'Sin límite de tiempo';
      metaEl.innerHTML = `<span>${tLabel}</span><span>·</span><span>${mLabel}</span><span>·</span><span>${clockLabel}</span><span>·</span><span>${activeCfg.count} preguntas</span>`;
    }
  })();

  let qList = [];
  let qI = 0;
  let qScore = 0;
  let qLock = false;
  let timerInterval = null;
  let timeRemainingMs = 0;

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function normalizeQuestionOptions(q) {
    if (q.mode === 'sentence' || q.mode === 'verb') return q;
    const correctText = q.o[q.a];
    const shuffledOpts = shuffleArray(q.o);
    return {
      ...q,
      o: shuffledOpts,
      a: shuffledOpts.indexOf(correctText)
    };
  }

  function generateSessionQuestions() {
    const allowedTenses = new Set(activeCfg.tenses);
    const allowedModes = new Set(activeCfg.modes);
    const pool = [];

    if (allowedModes.has('choice')) {
      CHOICE_BANK.filter(q => allowedTenses.has(q.tenseId)).forEach(q => {
        pool.push(normalizeQuestionOptions({ ...q, mode: 'choice' }));
      });
    }

    if (allowedModes.has('image')) {
      IMAGE_BANK.filter(q => allowedTenses.has(q.tenseId)).forEach(q => {
        pool.push(normalizeQuestionOptions({ ...q, mode: 'image' }));
      });
    }

    if (allowedModes.has('sentence')) {
      SENTENCE_BANK.filter(q => allowedTenses.has(q.tenseId)).forEach(q => {
        pool.push({
          ...q,
          mode: 'sentence',
          o: ['✓ Sí, la oración es correcta', '✗ No, la oración tiene un error'],
          a: q.isCorrect ? 0 : 1
        });
      });
    }

    if (allowedModes.has('verb')) {
      VERB_BANK.filter(q => allowedTenses.has(q.tenseId)).forEach(q => {
        pool.push({
          ...q,
          mode: 'verb',
          o: ['✓ Sí, el tiempo del verbo está bien', '✗ No, el tiempo verbal es incorrecto'],
          a: q.isCorrect ? 0 : 1
        });
      });
    }

    let shuffled = shuffleArray(pool);

    // Si el usuario pidió más preguntas de las que hay en el banco filtrado, generamos preguntas adicionales
    let extraIdx = 0;
    while (shuffled.length < activeCfg.count) {
      const tId = activeCfg.tenses[extraIdx % activeCfg.tenses.length];
      const mId = activeCfg.modes[extraIdx % activeCfg.modes.length];
      const fallbackMode = mId === 'image' ? 'choice' : mId;
      shuffled.push(normalizeQuestionOptions(buildExtraQuestion(tId, fallbackMode, extraIdx)));
      extraIdx++;
    }

    return shuffled.slice(0, activeCfg.count);
  }

  function stopQuestionTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function startQuestionTimer() {
    stopQuestionTimer();
    if (!activeCfg.timer || activeCfg.timer <= 0) return;

    const totalMs = activeCfg.timer * 1000;
    timeRemainingMs = totalMs;
    const badgeEl = document.getElementById('qzTimerBadge');
    const barFillEl = document.getElementById('qzTimerFill');

    timerInterval = setInterval(() => {
      if (qLock) {
        stopQuestionTimer();
        return;
      }
      timeRemainingMs = Math.max(0, timeRemainingMs - 100);
      const sec = (timeRemainingMs / 1000).toFixed(1);
      const pct = (timeRemainingMs / totalMs) * 100;
      const isUrgent = timeRemainingMs <= 3500;

      if (badgeEl) {
        badgeEl.textContent = `⏱ ${sec}s`;
        badgeEl.classList.toggle('urgent', isUrgent);
      }
      if (barFillEl) {
        barFillEl.style.width = `${pct}%`;
        barFillEl.classList.toggle('urgent', isUrgent);
      }

      if (timeRemainingMs <= 0) {
        stopQuestionTimer();
        answer(-1, true);
      }
    }, 100);
  }

  function quizStart() {
    qList = generateSessionQuestions();
    qI = 0;
    qScore = 0;
    qLock = false;
    drawQ();
  }

  function renderQuestionBody(q) {
    if (q.mode === 'image') {
      return `
        <div class="qz-prompt-kicker">OBSERVA LA ESCENA Y LA PISTA DE TIEMPO</div>
        <div class="qz-scene-box">
          <div class="qz-scene-head">
            <span class="qz-scene-clue">${q.clue}</span>
            <span>ESCENA VISUAL</span>
          </div>
          <div class="qz-scene-canvas">${renderSceneSVG(q.scene)}</div>
          <div class="qz-scene-caption">
            <span>${q.caption}</span>
          </div>
        </div>
        <div class="qz-sent" style="font-size:21px;margin-bottom:16px">${q.prompt}</div>
      `;
    }

    if (q.mode === 'sentence') {
      return `
        <div class="qz-prompt-kicker">¿ESTA ORACIÓN ESTÁ ESCRITA CORRECTAMENTE?</div>
        <div class="qz-inspect-box">
          <div class="qz-inspect-sent">“${q.sent}”</div>
        </div>
      `;
    }

    if (q.mode === 'verb') {
      return `
        <div class="qz-prompt-kicker">VERIFICA EL TIEMPO VERBAL DEL VERBO RESALTADO</div>
        <div class="qz-inspect-box">
          <div class="qz-inspect-sent">“${q.sent}”</div>
          <div class="qz-verb-meta">
            <span>Verbo analizado: <b>${q.verb}</b></span>
            <span>Tiempo verbal propuesto: <b>${q.claimedTense}</b></span>
          </div>
        </div>
      `;
    }

    // Modo choice
    const sent = q.s.replace(/___/g, '<span class="blank">&nbsp;____&nbsp;</span>');
    return `
      <div class="qz-prompt-kicker">ELIGE LA OPCIÓN QUE COMPLETA LA ORACIÓN</div>
      <div class="qz-sent">${sent}</div>
    `;
  }

  function drawQ() {
    qLock = false;
    const q = qList[qI];
    const isBinary = q.mode === 'sentence' || q.mode === 'verb';

    quizBox.innerHTML = `
      <div class="qz-top">
        <span class="qz-count">
          <span>PREGUNTA ${qI + 1} / ${qList.length}</span>
          <span class="qz-mode-label">${MODE_LABELS[q.mode] || 'Quiz'}</span>
        </span>
        <div class="qz-right-meta">
          ${activeCfg.timer > 0 ? `<span class="qz-timer-badge" id="qzTimerBadge">⏱ ${activeCfg.timer.toFixed(1)}s</span>` : ''}
          <span class="qz-score">⭐ ${qScore} aciertos</span>
        </div>
      </div>
      <div class="qz-bar"><i style="width:${(qI / qList.length) * 100}%"></i></div>
      ${activeCfg.timer > 0 ? `<div class="qz-timer-bar"><i id="qzTimerFill" style="width:100%"></i></div>` : ''}
      ${renderQuestionBody(q)}
      <div class="qz-opts">
        ${q.o.map((o, i) => `
          <button class="qz-opt ${isBinary ? 'qz-opt-bin' : ''}" data-i="${i}">
            <span class="L">${isBinary ? (i === 0 ? '1' : '2') : 'ABCD'[i]}</span>
            <span>${o}</span>
          </button>
        `).join('')}
      </div>
      <div id="qzExtra"></div>
    `;

    quizBox.querySelectorAll('.qz-opt').forEach(b => {
      b.addEventListener('click', () => answer(Number(b.dataset.i), false));
    });

    startQuestionTimer();
  }

  function answer(i, timedOut) {
    if (qLock) return;
    qLock = true;
    stopQuestionTimer();

    const q = qList[qI];
    const ok = !timedOut && i === q.a;
    if (ok) qScore++;

    quizBox.querySelectorAll('.qz-opt').forEach((b, bi) => {
      b.disabled = true;
      if (bi === q.a) b.classList.add('correct');
      if (bi === i && !ok) b.classList.add('wrong');
    });

    const blank = quizBox.querySelector('.blank');
    if (blank) {
      blank.innerHTML = q.o[q.a];
      blank.classList.add('filled');
    }

    const last = qI === qList.length - 1;
    const statusHeadline = timedOut
      ? '⏰ ¡Tiempo agotado!'
      : (ok ? '✅ ¡Correcto!' : '❌ Casi…');

    const extraCorrection = (q.mode === 'sentence' && !q.isCorrect && q.correction)
      ? `<div style="margin-top:6px;font-family:'IBM Plex Mono',monospace;font-size:13.5px">✓ Oración corregida: <b>${q.correction}</b></div>`
      : '';

    document.getElementById('qzExtra').innerHTML = `
      <div class="qz-fb ${ok ? 'ok' : 'ko'}">
        <div class="tt">
          <span>${statusHeadline}</span>
          <span class="tense-tag">${q.t}</span>
        </div>
        <div>${q.w}</div>
        ${extraCorrection}
      </div>
      <button class="btn btn-primary qz-next" id="qNext">${last ? 'Ver mi resultado final →' : 'Siguiente pregunta →'}</button>
    `;

    document.getElementById('qNext').addEventListener('click', () => {
      qI++;
      if (qI < qList.length) drawQ();
      else quizEnd();
    });
  }

  function quizEnd() {
    stopQuestionTimer();
    const n = qList.length;
    const p = qScore / n;
    const pct = Math.round(p * 100);
    const msg = p === 1
      ? '🏆 ¡Perfecto! Dominas por completo los tiempos seleccionados.'
      : p >= 0.75
      ? '💪 ¡Excelente resultado! Tienes muy clara la lógica verbal.'
      : p >= 0.5
      ? '🙂 Vas por buen camino: repasa las explicaciones donde dudaste.'
      : '📚 Repasa las fichas de estos tiempos y vuelve a intentarlo.';

    quizBox.innerHTML = `
      <div class="qz-end">
        <h3 class="df">Resultado de tu sesión</h3>
        <div class="big">${qScore}<span style="font-size:34px;color:rgba(27,42,36,.4)"> / ${n}</span></div>
        <div class="msg">${msg}</div>

        <div class="qz-stats-grid">
          <div class="qz-stat-box">
            <small>PRECISIÓN</small>
            <b>${pct}%</b>
          </div>
          <div class="qz-stat-box">
            <small>TIEMPOS EVALUADOS</small>
            <b>${activeCfg.tenses.length} / 12</b>
          </div>
          <div class="qz-stat-box">
            <small>CONTRARRELOJ</small>
            <b>${activeCfg.timer > 0 ? activeCfg.timer + 's' : 'Libre'}</b>
          </div>
        </div>

        <div class="qz-end-actions">
          <button class="btn btn-primary" id="qAgain">Jugar de nuevo (mismo filtro) ↻</button>
          <a class="btn btn-ghost" href="quiz.html" style="color:var(--ink);border-color:var(--ink)">Cambiar filtros del Quiz</a>
          <a class="btn btn-ghost" href="tiempos.html" style="color:var(--ink);border-color:rgba(27,42,36,.4)">Repasar fichas</a>
        </div>
      </div>
    `;

    document.getElementById('qAgain').addEventListener('click', quizStart);
  }

  // Iniciar automáticamente el quiz configurado al entrar a quiz-play.html
  quizStart();

  // Atajos de teclado (1-4 para responder, Enter/Espacio para avanzar a la siguiente pregunta)
  document.addEventListener('keydown', e => {
    if (quizBox.querySelector('.qz-end')) return;
    if (qLock) {
      if (e.key === 'Enter' || e.key === ' ') {
        const nextBtn = document.getElementById('qNext');
        if (nextBtn) {
          e.preventDefault();
          nextBtn.click();
        }
      }
      return;
    }
    const k = Number(e.key);
    if (k >= 1 && k <= 4) {
      const b = quizBox.querySelector(`.qz-opt[data-i="${k - 1}"]`);
      if (b) b.click();
    }
  });
}
