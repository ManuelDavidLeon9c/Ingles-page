/* ================= DATOS ================= */
const TIME_ES = {past:'PASADO', present:'PRESENTE', future:'FUTURO'};
const TIME_WORD = {past:'Pasado', present:'Presente', future:'Futuro'};

const TENSES = [
{id:'present-simple',en:'Present Simple',es:'Presente simple',time:'present',aspect:'simple',short:'study / studies',
 formula:['S + verbo (he/she/it: +s)','S + don’t / doesn’t + verbo','Do / Does + S + verbo?'],
 uses:['Rutinas y hábitos: cosas que ocurren siempre, normalmente o nunca.','Verdades generales y hechos científicos.','Horarios y calendarios, aunque sean futuros: trenes, clases, vuelos.'],
 examples:[{en:'She <b>works</b> in a hospital.',es:'Trabaja en un hospital.'},
           {en:'Water <b>boils</b> at 100 °C.',es:'El agua hierve a 100 °C.'},
           {en:'The train <b>leaves</b> at 8:10 tomorrow.',es:'El tren sale mañana a las 8:10.'}],
 markers:['always','usually','often','never','every day','on Mondays'],caption:'siempre · cada día · verdades'},
{id:'present-continuous',en:'Present Continuous',es:'Presente continuo',time:'present',aspect:'continuous',short:'am studying',
 formula:['S + am/is/are + verbo-ing','S + am/is/are + not + verbo-ing','Am / Is / Are + S + verbo-ing?'],
 uses:['Acciones en progreso ahora mismo.','Situaciones temporales: this week, these days.','Planes futuros ya confirmados con hora o lugar.','Tendencias y cambios: “Prices are rising”.'],
 examples:[{en:'I <b>am studying</b> English right now.',es:'Estoy estudiando inglés ahora mismo.'},
           {en:'She <b>is living</b> with her aunt this month.',es:'Está viviendo en casa de su tía este mes.'},
           {en:'We <b>are meeting</b> them for dinner tonight.',es:'Quedamos con ellos para cenar esta noche.'}],
 markers:['now','right now','at the moment','this week','Look!','Listen!'],caption:'ahora mismo · temporal'},
{id:'present-perfect',en:'Present Perfect',es:'Pretérito perfecto',time:'present',aspect:'perfect',short:'have studied',from:'past',
 formula:['S + have/has + participio','S + haven’t / hasn’t + participio','Have / Has + S + participio?'],
 uses:['Experiencias de vida: importa el “qué”, no el “cuándo”.','Acciones pasadas con resultado visible en el presente.','Situaciones que empezaron en el pasado y siguen (con since/for).'],
 warn:'Si dices CUÁNDO exactamente (yesterday, in 2019…), cambia a Past Simple.',
 examples:[{en:'I <b>have visited</b> London three times.',es:'He visitado Londres tres veces.'},
           {en:'She <b>has</b> just <b>finished</b> the report.',es:'Acaba de terminar el informe.'},
           {en:'They <b>have lived</b> here since 2015.',es:'Viven aquí desde 2015.'}],
 markers:['ever','never','just','already','yet','since','for','recently'],caption:'empezó antes → importa ahora'},
{id:'present-perfect-continuous',en:'Present Perfect Continuous',es:'Perfecto continuo',time:'present',aspect:'perfect-continuous',short:'have been studying',from:'past',
 formula:['S + have/has + been + verbo-ing','S + haven’t / hasn’t + been + verbo-ing','Have / Has + S + been + verbo-ing?'],
 uses:['Acciones empezadas en el pasado que siguen ahora: subraya la duración.','Actividades recientes con efecto visible (cansancio, la calle mojada…).'],
 examples:[{en:'I <b>have been learning</b> English for two years.',es:'Llevo dos años aprendiendo inglés.'},
           {en:'It <b>has been raining</b>: the street is wet.',es:'Ha estado lloviendo: la calle está mojada.'},
           {en:'<b>Have</b> you <b>been working</b> late? You look tired.',es:'¿Has estado trabajando hasta tarde? Te veo cansado.'}],
 markers:['for','since','all day','lately','how long…?'],caption:'duración hasta ahora'},
{id:'past-simple',en:'Past Simple',es:'Pretérito indefinido',time:'past',aspect:'simple',short:'studied',
 formula:['S + verbo en pasado (-ed o irregular)','S + didn’t + verbo','Did + S + verbo?'],
 uses:['Acciones terminadas en un momento concreto del pasado.','Secuencias en una historia: “I woke up, had breakfast and left”.','Hábitos del pasado que ya acabaron.'],
 examples:[{en:'We <b>watched</b> a film yesterday.',es:'Vimos una película ayer.'},
           {en:'Shakespeare <b>wrote</b> 37 plays.',es:'Shakespeare escribió 37 obras.'},
           {en:'She <b>didn’t come</b> to the party.',es:'No vino a la fiesta.'}],
 markers:['yesterday','last week','in 2010','two days ago','when I was a child'],caption:'un momento terminado'},
{id:'past-continuous',en:'Past Continuous',es:'Pasado continuo',time:'past',aspect:'continuous',short:'was studying',
 formula:['S + was/were + verbo-ing','S + wasn’t / weren’t + verbo-ing','Was / Were + S + verbo-ing?'],
 uses:['Acción en progreso en un momento del pasado: el escenario de la historia.','Acción larga interrumpida por otra corta (while / when).','Dos acciones largas a la vez: “I was cooking while he was reading”.'],
 examples:[{en:'I <b>was reading</b> when you called.',es:'Estaba leyendo cuando llamaste.'},
           {en:'It <b>was raining</b> all evening.',es:'Estuvo lloviendo toda la noche.'}],
 markers:['while','when','at 8 pm yesterday','all morning'],caption:'en progreso entonces'},
{id:'past-perfect',en:'Past Perfect',es:'Pluscuamperfecto',time:'past',aspect:'perfect',short:'had studied',
 formula:['S + had + participio','S + hadn’t + participio','Had + S + participio?'],
 uses:['El “pasado del pasado”: la acción anterior a otra acción pasada.','Compañeros frecuentes: by the time, before, after, already.'],
 examples:[{en:'When we arrived, the film <b>had</b> already <b>started</b>.',es:'Cuando llegamos, la película ya había empezado.'},
           {en:'She <b>had never seen</b> snow before that trip.',es:'Nunca había visto la nieve antes de ese viaje.'}],
 markers:['before','after','by the time','already','until then'],caption:'anterior a otro pasado'},
{id:'past-perfect-continuous',en:'Past Perfect Continuous',es:'Pluscuamperfecto continuo',time:'past',aspect:'perfect-continuous',short:'had been studying',
 formula:['S + had been + verbo-ing','S + hadn’t been + verbo-ing','Had + S + been + verbo-ing?'],
 uses:['Duración de una acción anterior a un momento del pasado.','Explica la causa de un estado pasado: estaba agotado porque…'],
 examples:[{en:'He was exhausted: he <b>had been working</b> for ten hours.',es:'Estaba agotado: llevaba diez horas trabajando.'},
           {en:'They <b>had been waiting</b> for an hour when the bus finally came.',es:'Llevaban una hora esperando cuando por fin llegó el autobús.'}],
 markers:['for','since','all day','how long'],caption:'duración antes de ese pasado'},
{id:'future-simple',en:'Future Simple',es:'Futuro simple',time:'future',aspect:'simple',short:'will study',
 formula:['S + will + verbo','S + won’t + verbo','Will + S + verbo?'],
 uses:['Predicciones basadas en opinión: I think, probably…','Decisiones espontáneas y promesas.','Hechos futuros inevitables.'],
 warn:'Extra — “be going to”: para planes e intenciones (“I’m going to call him”) y predicciones con evidencia (“Look at those clouds!”).',
 examples:[{en:'I think it <b>will rain</b> tomorrow.',es:'Creo que lloverá mañana.'},
           {en:'Don’t worry — I <b>’ll help</b> you, I promise.',es:'No te preocupes: te ayudaré, te lo prometo.'},
           {en:'We<b>’re going to travel</b> around Japan in spring.',es:'Vamos a viajar por Japón en primavera.'}],
 markers:['tomorrow','next week','in 2050','soon','probably','I think'],caption:'después de ahora'},
{id:'future-continuous',en:'Future Continuous',es:'Futuro continuo',time:'future',aspect:'continuous',short:'will be studying',
 formula:['S + will be + verbo-ing','S + won’t be + verbo-ing','Will + S + be + verbo-ing?'],
 uses:['Acción en progreso en un momento concreto del futuro.','Preguntas educadas sobre los planes de alguien.'],
 examples:[{en:'This time tomorrow, I <b>will be flying</b> to Paris.',es:'Mañana a esta hora estaré volando a París.'},
           {en:'<b>Will</b> you <b>be using</b> the car tonight?',es:'¿Vas a usar el coche esta noche?'}],
 markers:['this time tomorrow','at 9 pm tomorrow','in two days’ time'],caption:'en progreso en ese futuro'},
{id:'future-perfect',en:'Future Perfect',es:'Futuro perfecto',time:'future',aspect:'perfect',short:'will have studied',
 formula:['S + will have + participio','S + won’t have + participio','Will + S + have + participio?'],
 uses:['Acción terminada antes de un momento futuro: casi siempre aparece “by…”.','Miradas atrás desde el futuro: “By 2050, the city will have changed”.'],
 examples:[{en:'By 2030, scientists <b>will have found</b> a cure.',es:'Para 2030, los científicos habrán encontrado una cura.'},
           {en:'I <b>will have finished</b> the book by Friday.',es:'Habré terminado el libro para el viernes.'}],
 markers:['by tomorrow','by next week','by 2030','by the time'],caption:'terminado antes de ese futuro'},
{id:'future-perfect-continuous',en:'Future Perfect Continuous',es:'Futuro perfecto continuo',time:'future',aspect:'perfect-continuous',short:'will have been studying',
 formula:['S + will have been + verbo-ing','S + won’t have been + verbo-ing','Will + S + have been + verbo-ing?'],
 uses:['Duración acumulada hasta un punto del futuro.','Suena formal y se usa poco… pero cierra el sistema de los 12. ¡Ya los tienes todos!'],
 examples:[{en:'In June, I <b>will have been studying</b> English for five years.',es:'En junio llevaré cinco años estudiando inglés.'},
           {en:'By midnight, they <b>will have been driving</b> for twelve hours.',es:'Para medianoche llevarán doce horas conduciendo.'}],
 markers:['by June','by then','for + tiempo + by…'],caption:'duración hasta ese futuro'}
];

const QUESTIONS = [
{s:'Look! It ___ outside.',o:['rains','is raining','rained','has rained'],a:1,t:'Present Continuous',w:'“Look!” señala que la acción está ocurriendo en este preciso momento.'},
{s:'I ___ in this city since 2019.',o:['live','am living','have lived','lived'],a:2,t:'Present Perfect',w:'“Since” + punto de inicio → la situación continúa hoy: have lived.'},
{s:'She ___ to Rome last summer.',o:['goes','has gone','was going','went'],a:3,t:'Past Simple',w:'“Last summer” es un momento terminado del pasado: Past Simple.'},
{s:'The train ___ at 7:45 every morning.',o:['leaves','is leaving','will leaving','has left'],a:0,t:'Present Simple',w:'Los horarios fijos usan Present Simple, ¡incluso hablando del futuro!'},
{s:'When we arrived, the film ___ already ___.',o:['has … started','had … started','was … starting','did … start'],a:1,t:'Past Perfect',w:'La película empezó ANTES de la llegada: es el pasado del pasado.'},
{s:'Don’t worry. I ___ you with your homework, I promise.',o:['help','am helping','will help','have helped'],a:2,t:'Future Simple',w:'Promesas y decisiones del momento → will + verbo.'},
{s:'He looks exhausted. He ___ in the garden all morning.',o:['works','worked','has been working','will work'],a:2,t:'Present Perfect Continuous',w:'Efecto visible en el presente + duración de la actividad: has been working.'},
{s:'While I ___ dinner, the phone rang.',o:['made','was making','have made','make'],a:1,t:'Past Continuous',w:'Acción larga en progreso (was making) interrumpida por una corta (rang).'},
{s:'This time next week, I ___ on a beach in Mexico.',o:['will lie','will be lying','am lying','have lain'],a:1,t:'Future Continuous',w:'Acción en progreso en un momento concreto del futuro.'},
{s:'By 2030, engineers ___ the new bridge.',o:['will finish','finish','will have finished','have finished'],a:2,t:'Future Perfect',w:'“By + momento futuro” → acción completada antes de ese momento.'},
{s:'I ___ sushi in my life.',o:['never tried','have never tried','never try','was never trying'],a:1,t:'Present Perfect',w:'Experiencia de vida sin fecha concreta: never + Present Perfect.'},
{s:'Water ___ at 100 degrees Celsius.',o:['boils','is boiling','boiled','has boiled'],a:0,t:'Present Simple',w:'Hechos científicos y verdades generales → Present Simple.'},
{s:'She was angry because she ___ for over an hour.',o:['waited','has waited','had been waiting','waits'],a:2,t:'Past Perfect Continuous',w:'Duración previa que explica un estado pasado.'},
{s:'In June, we ___ together for ten years.',o:['will be','will have been','are','have been'],a:1,t:'Future Perfect',w:'Una situación que alcanzará una cifra redonda en un punto del futuro.'}
];

const MISTAKES = [
{bad:'I have 25 years.',good:'I am 25 (years old).',why:'La edad en inglés se ES (be), no se tiene. “Have” solo para posesión.'},
{bad:'I am agree with you.',good:'I agree with you.',why:'“Agree” es un verbo, no un adjetivo: no lleva “am”. Igual: “I disagree”.'},
{bad:'I live here since three years.',good:'I have lived here for three years.',why:'Since + punto de inicio (2021); for + duración (three years). Y con “desde hace…”, presente perfecto.'},
{bad:'I have gone to Paris in 2019.',good:'I went to Paris in 2019.',why:'Si hay un momento concreto y terminado del pasado, manda el Past Simple.'},
{bad:'She is married with a doctor.',good:'She is married to a doctor.',why:'En inglés te casas “to” alguien, no “with”. Igual: “engaged to”.'},
{bad:'Can you explain me this?',good:'Can you explain this to me?',why:'“Explain” no admite doble objeto: la cosa va primero, la persona con “to”.'},
{bad:'I didn’t went.',good:'I didn’t go.',why:'Después de “didn’t” el verbo vuelve a su forma base. El pasado ya lo lleva “did”.'},
{bad:'People is very friendly.',good:'People are very friendly.',why:'“People” es plural (de “person”). También plurales: police, children.'}
];

/* ===== IRREGULARES (126) ===== */
const IRR = [
['arise','arose','arisen','surgir'],['awake','awoke','awoken','despertarse'],
['be','was / were','been','ser · estar'],['bear','bore','borne','soportar · parir'],
['beat','beat','beaten','golpear · vencer'],['become','became','become','convertirse'],
['begin','began','begun','empezar'],['bend','bent','bent','doblar'],
['bet','bet','bet','apostar'],['bind','bound','bound','atar · encuadernar'],
['bite','bit','bitten','morder'],['bleed','bled','bled','sangrar'],
['blow','blew','blown','soplar'],['break','broke','broken','romper'],
['breed','bred','bred','criar'],['bring','brought','brought','traer'],
['broadcast','broadcast','broadcast','emitir'],['build','built','built','construir'],
['burn','burned/burnt','burned/burnt','quemar'],['burst','burst','burst','estallar'],
['buy','bought','bought','comprar'],['cast','cast','cast','lanzar · emitir'],
['catch','caught','caught','atrapar'],['choose','chose','chosen','elegir'],
['cling','clung','clung','aferrarse'],['come','came','come','venir'],
['cost','cost','cost','costar'],['creep','crept','crept','arrastrarse'],
['cut','cut','cut','cortar'],['deal','dealt','dealt','tratar · repartir'],
['dig','dug','dug','cavar'],['do','did','done','hacer'],
['draw','drew','drawn','dibujar'],['dream','dreamed/dreamt','dreamed/dreamt','soñar'],
['drink','drank','drunk','beber'],['drive','drove','driven','conducir'],
['eat','ate','eaten','comer'],['fall','fell','fallen','caer'],
['feed','fed','fed','alimentar'],['feel','felt','felt','sentir'],
['fight','fought','fought','luchar'],['find','found','found','encontrar'],
['flee','fled','fled','huir'],['fling','flung','flung','arrojar'],
['fly','flew','flown','volar'],['forbid','forbade','forbidden','prohibir'],
['forget','forgot','forgotten','olvidar'],['forgive','forgave','forgiven','perdonar'],
['freeze','froze','frozen','congelar'],['get','got','got(ten)','conseguir'],
['give','gave','given','dar'],['go','went','gone','ir'],
['grind','ground','ground','moler'],['grow','grew','grown','crecer · cultivar'],
['hang','hung','hung','colgar'],['have','had','had','tener · haber'],
['hear','heard','heard','oír'],['hide','hid','hidden','esconder'],
['hit','hit','hit','golpear'],['hold','held','held','sostener'],
['hurt','hurt','hurt','herir · doler'],['keep','kept','kept','guardar · mantener'],
['kneel','knelt','knelt','arrodillarse'],['knit','knit/knitted','knit/knitted','tejer'],
['know','knew','known','saber · conocer'],['lay','laid','laid','poner · colocar'],
['lead','led','led','liderar'],['lean','leaned/leant','leaned/leant','apoyarse'],
['leap','leaped/leapt','leaped/leapt','saltar'],['learn','learned/learnt','learned/learnt','aprender'],
['leave','left','left','irse · dejar'],['lend','lent','lent','prestar'],
['let','let','let','dejar · permitir'],['lie','lay','lain','estar acostado (≠ mentir: lied)'],
['light','lit/lighted','lit/lighted','encender'],['lose','lost','lost','perder'],
['make','made','made','hacer · fabricar'],['mean','meant','meant','significar'],
['meet','met','met','conocer · reunirse'],['mislead','misled','misled','engañar'],
['misunderstand','misunderstood','misunderstood','malinterpretar'],['overcome','overcame','overcome','superar'],
['pay','paid','paid','pagar'],['prove','proved','proven','demostrar'],
['put','put','put','poner'],['quit','quit','quit','renunciar · dejar'],
['read','read','read','leer'],['ride','rode','ridden','montar'],
['ring','rang','rung','sonar · llamar'],['rise','rose','risen','subir · levantarse'],
['run','ran','run','correr'],['say','said','said','decir'],
['see','saw','seen','ver'],['seek','sought','sought','buscar'],
['sell','sold','sold','vender'],['send','sent','sent','enviar'],
['set','set','set','establecer · ponerse el sol'],['sew','sewed','sewn','coser'],
['shake','shook','shaken','sacudir'],['shed','shed','shed','derramar · mudar'],
['shine','shone','shone','brillar'],['shoot','shot','shot','disparar'],
['show','showed','shown','mostrar'],['shrink','shrank','shrunk','encoger'],
['shut','shut','shut','cerrar'],['sing','sang','sung','cantar'],
['sink','sank','sunk','hundir'],['sit','sat','sat','sentarse'],
['sleep','slept','slept','dormir'],['slide','slid','slid','resbalar'],
['sling','slung','slung','lanzar · colgar'],['smell','smelled/smelt','smelled/smelt','oler'],
['sow','sowed','sown','sembrar'],['speak','spoke','spoken','hablar'],
['speed','sped/speeded','sped/speeded','acelerar'],['spell','spelled/spelt','spelled/spelt','deletrear'],
['spend','spent','spent','gastar · pasar tiempo'],['spill','spilled/spilt','spilled/spilt','derramar'],
['spin','spun','spun','girar'],['spit','spat/spit','spat/spit','escupir'],
['split','split','split','dividir'],['spoil','spoiled/spoilt','spoiled/spoilt','estropear'],
['spread','spread','spread','extender · untar'],['spring','sprang','sprung','brotar · saltar'],
['stand','stood','stood','estar de pie · soportar'],['steal','stole','stolen','robar'],
['stick','stuck','stuck','pegar · clavar'],['sting','stung','stung','picar'],
['stink','stank','stunk','apestar'],['strike','struck','struck','golpear · hacer huelga'],
['swear','swore','sworn','jurar'],['sweep','swept','swept','barrer'],
['swell','swelled','swollen','hinchar'],['swim','swam','swum','nadar'],
['swing','swung','swung','balancearse'],['take','took','taken','tomar · llevar'],
['teach','taught','taught','enseñar'],['tear','tore','torn','rasgar'],
['tell','told','told','decir · contar'],['think','thought','thought','pensar'],
['throw','threw','thrown','lanzar'],['thrust','thrust','thrust','empujar'],
['tread','trod','trodden','pisar'],['understand','understood','understood','entender'],
['undertake','undertook','undertaken','emprender'],['wake','woke','woken','despertarse'],
['wear','wore','worn','llevar puesto'],['weave','wove','woven','tejer'],
['weep','wept','wept','llorar'],['wet','wet/wetted','wet/wetted','mojar'],
['win','won','won','ganar'],['wind','wound','wound','enrollar'],
['withdraw','withdrew','withdrawn','retirar'],['wring','wrung','wrung','retorcer'],
['write','wrote','written','escribir']
];

/* ===== REGULARES (115) → su pasado se calcula con las reglas de -ed ===== */
const REG = [
['accept','aceptar'],['add','añadir'],['admire','admirar'],['admit','admitir'],
['agree','estar de acuerdo'],['allow','permitir'],['answer','responder'],['arrive','llegar'],
['ask','preguntar · pedir'],['attack','atacar'],['avoid','evitar'],['bake','hornear'],
['believe','creer'],['borrow','pedir prestado'],['call','llamar'],['carry','llevar · cargar'],
['celebrate','celebrar'],['change','cambiar'],['clean','limpiar'],['climb','escalar'],
['close','cerrar'],['collect','coleccionar'],['compare','comparar'],['complain','quejarse'],
['cook','cocinar'],['copy','copiar'],['count','contar'],['cross','cruzar'],
['cry','llorar'],['dance','bailar'],['decide','decidir'],['deliver','entregar'],
['deserve','merecer'],['destroy','destruir'],['develop','desarrollar'],['die','morir'],
['discover','descubrir'],['enjoy','disfrutar'],['escape','escapar'],['examine','examinar'],
['exercise','hacer ejercicio'],['explain','explicar'],['finish','terminar'],['fix','arreglar'],
['follow','seguir'],['guess','adivinar'],['happen','ocurrir'],['help','ayudar'],
['hope','esperar'],['hug','abrazar'],['imagine','imaginar'],['improve','mejorar'],
['invite','invitar'],['join','unirse'],['jump','saltar'],['kick','patear'],
['kiss','besar'],['laugh','reír'],['like','gustar'],['listen','escuchar'],
['live','vivir'],['look','mirar'],['love','amar'],['marry','casarse'],
['miss','echar de menos'],['move','mudarse · mover'],['need','necesitar'],['notice','notar'],
['offer','ofrecer'],['open','abrir'],['order','pedir · ordenar'],['paint','pintar'],
['park','aparcar'],['pass','pasar'],['plan','planear'],['play','jugar · tocar'],
['practice','practicar'],['prefer','preferir'],['prepare','preparar'],['pretend','fingir'],
['promise','prometer'],['pull','tirar de'],['push','empujar'],['rain','llover'],
['reach','alcanzar'],['relax','relajarse'],['remember','recordar'],['remove','quitar'],
['repeat','repetir'],['repair','reparar'],['reply','contestar'],['rescue','rescatar'],
['rest','descansar'],['return','volver · devolver'],['save','guardar · salvar'],['scream','gritar'],
['search','buscar'],['share','compartir'],['shout','gritar'],['smile','sonreír'],
['snow','nevar'],['start','empezar'],['stay','quedarse'],['stop','parar'],
['study','estudiar'],['talk','hablar'],['taste','probar · saber a'],['touch','tocar'],
['train','entrenar'],['travel','viajar'],['try','intentar'],['turn','girar'],
['type','teclear'],['use','usar'],['visit','visitar'],['wait','esperar'],
['walk','caminar'],['want','querer'],['warn','advertir'],['wash','lavar'],
['watch','mirar · observar'],['wish','desear'],['work','trabajar'],['worry','preocuparse']
];

const QUICK = ['study','be','go','work','write','have','stop','fly'];

/* ================= ICONOS DE ASPECTO ================= */
function aspectIcon(a){
  const s={simple:'<circle cx="12" cy="12" r="5.2" fill="currentColor"/>',
  continuous:'<path d="M2.5 12 C5 6.5, 8 6.5, 11 12 S 17.5 17.5, 21.5 12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
  perfect:'<circle cx="9" cy="12" r="5.6" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="15" cy="12" r="5.6" fill="none" stroke="currentColor" stroke-width="2.2"/>',
  'perfect-continuous':'<circle cx="12" cy="8.5" r="4.8" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M4 19 C6 15.8, 8.5 15.8, 11 19 S 16.5 22, 20 19" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'};
  return `<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">${s[a]}</svg>`;
}
const ASPECT_ES={simple:'Simple',continuous:'Continuo',perfect:'Perfecto','perfect-continuous':'Perf. continuo'};

/* ===== REGLAS MORFOLÓGICAS (-ed / -ing / -s) — usadas por el conjugador y por la tabla de verbos ===== */
// limpia formas alternativas: "got(ten)" → "got", "burned/burnt" → "burned"
function cleanForm(s){return s.split('/')[0].replace(/\([^)]*\)/g,'').trim();}
const IRRV={};IRR.forEach(r=>IRRV[r[0]]=[cleanForm(r[1]),cleanForm(r[2])]);

// verbos que SIEMPRE doblan la última consonante (sílaba tónica al final)
const DOUBLE_ALWAYS=new Set(['prefer','refer','occur','admit','commit','submit','permit','regret',
 'control','infer','transfer','concur','deter','equip','excel','omit','allot','patrol','worship']);
function cvDoubling(v){
  if(!/[^aeiou][aeiou][^aeiou]$/.test(v))return false;
  if(/[wxy]$/.test(v))return false;
  if(DOUBLE_ALWAYS.has(v))return true;
  if(v.length<=3)return true;
  return (v.match(/[aeiou]/g)||[]).length===1;
}
function pastReg(v){
  if(/e$/.test(v))return v+'d';
  if(/[^aeiou]y$/.test(v))return v.slice(0,-1)+'ied';
  if(cvDoubling(v))return v+v[v.length-1]+'ed';
  return v+'ed';
}
function ingReg(v){
  if(/ie$/.test(v))return v.slice(0,-2)+'ying';
  if(/[^e]e$/.test(v)&&!/ee$/.test(v))return v.slice(0,-1)+'ing';
  if(cvDoubling(v))return v+v[v.length-1]+'ing';
  return v+'ing';
}
function thirdReg(v){
  if(/(s|sh|ch|x|z|o)$/.test(v))return v+'es';
  if(/[^aeiou]y$/.test(v))return v.slice(0,-1)+'ies';
  return v+'s';
}
