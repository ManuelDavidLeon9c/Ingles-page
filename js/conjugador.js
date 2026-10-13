/* ================= MOTOR DE CONJUGACIÓN ================= */
function getForms(v){
  v=v.trim().toLowerCase().replace(/\s+/g,'');
  let third,ing,past,pp,irr=false;
  if(v==='be'){third='is';ing='being';past='was / were';pp='been';irr=true;}
  else if(v==='have'){third='has';ing='having';past='had';pp='had';irr=true;}
  else if(v==='do'){third='does';ing='doing';past='did';pp='done';irr=true;}
  else{
    third=thirdReg(v);ing=ingReg(v);
    if(IRRV[v]){[past,pp]=IRRV[v];irr=true;}
    else{past=pastReg(v);pp=past;}
  }
  return {base:v,third,ing,past,pp,irr};
}
const PERS=['I','you','he / she / it','we','you','they'];
const bePres=['am','are','is','are','are','are'];
const bePresNeg=['am not','aren’t','isn’t','aren’t','aren’t','aren’t'];
const bePast=['was','were','was','were','were','were'];
const bePastNeg=['wasn’t','weren’t','wasn’t','weren’t','weren’t','weren’t'];
const beQ=['Am I','Are you','Is she','Are we','Are you','Are they'];
const wasQ=['Was I','Were you','Was she','Were we','Were you','Were they'];
function restBase(t,f){return {
 'future-simple':f.base,'future-continuous':'be '+f.ing,
 'future-perfect':'have '+f.pp,'future-perfect-continuous':'have been '+f.ing}[t];}
function affirm(t,f){
  switch(t){
   case 'present-simple':return f.base==='be'?[...bePres]:PERS.map((_,i)=>i===2?f.third:f.base);
   case 'present-continuous':return bePres.map(b=>b+' '+f.ing);
   case 'present-perfect':return PERS.map((_,i)=>(i===2?'has':'have')+' '+f.pp);
   case 'present-perfect-continuous':return PERS.map((_,i)=>(i===2?'has':'have')+' been '+f.ing);
   case 'past-simple':return f.base==='be'?[...bePast]:PERS.map(()=>f.past);
   case 'past-continuous':return bePast.map(b=>b+' '+f.ing);
   case 'past-perfect':return PERS.map(()=> 'had '+f.pp);
   case 'past-perfect-continuous':return PERS.map(()=> 'had been '+f.ing);
   default:return PERS.map(()=> 'will '+restBase(t,f));
  }
}
function neg(t,f,i){
  switch(t){
   case 'present-simple':return f.base==='be'?bePresNeg[i]:(i===2?'doesn’t ':'don’t ')+f.base;
   case 'present-continuous':return bePresNeg[i]+' '+f.ing;
   case 'present-perfect':return (i===2?'hasn’t ':'haven’t ')+f.pp;
   case 'present-perfect-continuous':return (i===2?'hasn’t ':'haven’t ')+'been '+f.ing;
   case 'past-simple':return f.base==='be'?bePastNeg[i]:'didn’t '+f.base;
   case 'past-continuous':return bePastNeg[i]+' '+f.ing;
   case 'past-perfect':return 'hadn’t '+f.pp;
   case 'past-perfect-continuous':return 'hadn’t been '+f.ing;
   default:return 'won’t '+restBase(t,f);
  }
}
function ques(t,f,i){
  const s=i===2?'she':'I';
  switch(t){
   case 'present-simple':return f.base==='be'?beQ[i]+'?':(i===2?'Does she ':'Do I ')+f.base+'?';
   case 'present-continuous':return beQ[i]+' '+f.ing+'?';
   case 'present-perfect':return (i===2?'Has she ':'Have I ')+f.pp+'?';
   case 'present-perfect-continuous':return (i===2?'Has she ':'Have I ')+'been '+f.ing+'?';
   case 'past-simple':return f.base==='be'?wasQ[i]+'?':'Did '+s+' '+f.base+'?';
   case 'past-continuous':return wasQ[i]+' '+f.ing+'?';
   case 'past-perfect':return 'Had '+s+' '+f.pp+'?';
   case 'past-perfect-continuous':return 'Had '+s+' been '+f.ing+'?';
   default:return 'Will '+s+' '+restBase(t,f)+'?';
  }
}

/* UI del conjugador */
let selTense='present-simple';
(function buildConj(){
  const dl=document.getElementById('verbList');
  const verbs=[...IRR.map(r=>r[0]),...REG.map(r=>r[0])];
  dl.innerHTML=[...new Set(verbs)].map(v=>`<option value="${v}">`).join('');
  document.getElementById('quickVerbs').innerHTML=QUICK.map(v=>`<button type="button" data-v="${v}">${v}</button>`).join('');
  document.getElementById('quickVerbs').addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    document.getElementById('verbInput').value=b.dataset.v;conjugate();
  });
  document.getElementById('tensePills').innerHTML=TENSES.map(t=>
    `<button class="tpill ${t.id===selTense?'sel':''}" data-t="${t.id}">
      <span class="dot" style="background:var(--${t.time})"></span>${t.en}</button>`).join('');
  document.getElementById('tensePills').addEventListener('click',e=>{
    const b=e.target.closest('.tpill');if(!b)return;
    selTense=b.dataset.t;
    document.querySelectorAll('.tpill').forEach(p=>p.classList.toggle('sel',p.dataset.t===selTense));
    conjugate();
  });
  document.getElementById('goBtn').addEventListener('click',conjugate);
  document.getElementById('verbInput').addEventListener('keydown',e=>{if(e.key==='Enter')conjugate();});
  document.getElementById('verbInput').addEventListener('input',conjugate);
})();
function conjugate(){
  const inp=document.getElementById('verbInput');
  const v=inp.value.trim().toLowerCase();
  const box=document.getElementById('conjResult');
  if(!v||!/^[a-z][a-z\- ]*$/.test(v)){
    inp.classList.remove('shake');void inp.offsetWidth;inp.classList.add('shake');
    box.innerHTML='<div style="display:grid;place-items:center;height:100%;font-style:italic;color:rgba(27,42,36,.5)">Escribe un verbo en inglés…</div>';return;
  }
  const f=getForms(v),tn=TENSES.find(t=>t.id===selTense);
  const aff=affirm(selTense,f);
  const i2=2,i0=0;
  let note='';
  if(!f.irr){
    if(f.past.endsWith('ied'))note='Regla: termina en consonante + y → la y se convierte en i (study → studied).';
    else if(/([bdgklmnprt])\1ed$/.test(f.past))note='Regla: consonante-vocal-consonante → se dobla la última letra (stop → stopped, prefer → preferred).';
    else if(/d$/.test(f.past)&&f.past.length===f.base.length+1)note='Regla: ya termina en e → solo añadimos -d (dance → danced).';
    else note='Verbo regular: se forma con -ed / -ing siguiendo la regla general.';
  }
  box.innerHTML=`
    <div class="mr-head"><h3>${tn.en} · <i>${v}</i></h3>
      <span class="mr-badge ${f.irr?'irr':'reg'}">${f.irr?'IRREGULAR':'REGULAR'}</span></div>
    <div class="forms-strip">
      <span class="fchip"><small>BASE</small><b>${f.base}</b></span>
      <span class="fchip"><small>PASADO</small><b>${f.past}</b></span>
      <span class="fchip"><small>PARTICIPIO</small><b>${f.pp}</b></span>
      <span class="fchip"><small>-ING</small><b>${f.ing}</b></span>
      <span class="fchip"><small>3ª PERSONA</small><b>${f.third}</b></span>
    </div>
    <table class="c-table">${PERS.map((p,i)=>
      `<tr class="${i===2?'hot':''}"><td class="per">${p}</td><td class="frm"><b>${aff[i]}</b></td></tr>`).join('')}
    </table>
    <div class="nq">
      <div><span class="tag neg">NEGATIVA</span><code>I ${neg(selTense,f,i0)} · she ${neg(selTense,f,i2)}</code></div>
      <div><span class="tag int">PREGUNTA</span><code>${ques(selTense,f,i0)} · ${ques(selTense,f,i2)}</code></div>
    </div>
    ${note?`<div class="m-note">💡 ${note}</div>`:''}`;
}
conjugate();

