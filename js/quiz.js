/* ================= QUIZ ================= */
let qList=[],qI=0,qScore=0,qLock=false;
const quizBox=document.getElementById('quizCard');
function quizIntro(){
  quizBox.innerHTML=`<div class="qz-intro">
    <h3 class="df">¿Cuántos tiempos dominas ya?</h3>
    <p>8 preguntas elegidas al azar entre 14. Cada respuesta incluye la explicación del tiempo, para que aprendas incluso cuando fallas.</p>
    <button class="btn btn-primary" id="qStart">Empezar el quiz →</button></div>`;
  document.getElementById('qStart').addEventListener('click',quizStart);
}
function quizStart(){
  qList=[...QUESTIONS].sort(()=>Math.random()-.5).slice(0,8);
  qI=0;qScore=0;qLock=false;drawQ();
}
function drawQ(){
  qLock=false;
  const q=qList[qI];
  const sent=q.s.replace('___','<span class="blank">&nbsp;____&nbsp;</span>');
  quizBox.innerHTML=`
    <div class="qz-top"><span class="qz-count">PREGUNTA ${qI+1} / ${qList.length}</span>
      <span class="qz-score">⭐ ${qScore} aciertos</span></div>
    <div class="qz-bar"><i style="width:${(qI/qList.length)*100}%"></i></div>
    <div class="qz-sent">${sent}</div>
    <div class="qz-opts">${q.o.map((o,i)=>
      `<button class="qz-opt" data-i="${i}"><span class="L">${'ABCD'[i]}</span>${o}</button>`).join('')}</div>
    <div id="qzExtra"></div>`;
  quizBox.querySelectorAll('.qz-opt').forEach(b=>b.addEventListener('click',()=>answer(+b.dataset.i)));
}
function answer(i){
  if(qLock)return;qLock=true;
  const q=qList[qI],ok=i===q.a;if(ok)qScore++;
  quizBox.querySelectorAll('.qz-opt').forEach((b,bi)=>{
    b.disabled=true;
    if(bi===q.a)b.classList.add('correct');
    if(bi===i&&!ok)b.classList.add('wrong');
  });
  const blank=quizBox.querySelector('.blank');
  if(blank){blank.innerHTML=q.o[q.a];blank.classList.add('filled');}
  const last=qI===qList.length-1;
  document.getElementById('qzExtra').innerHTML=`
    <div class="qz-fb ${ok?'ok':'ko'}">
      <div class="tt"><span>${ok?'✅ ¡Correcto!':'❌ Casi…'}</span><span class="tense-tag">${q.t}</span></div>
      ${q.w}</div>
    <button class="btn btn-primary qz-next" id="qNext">${last?'Ver mi resultado →':'Siguiente pregunta →'}</button>`;
  document.getElementById('qNext').addEventListener('click',()=>{
    qI++;qI<qList.length?drawQ():quizEnd();
  });
}
function quizEnd(){
  const n=qList.length,p=qScore/n;
  const msg=p===1?'🏆 ¡Perfecto! Nivel nativo a la vista.':p>=.75?'💪 ¡Muy bien! Ya casi los tienes.':p>=.5?'🙂 Vas por buen camino: repasa las fichas que fallaste.':'📚 Repasa el mapa y las fichas… ¡y vuelve a intentarlo!';
  quizBox.innerHTML=`<div class="qz-end">
    <h3 class="df">Resultado</h3>
    <div class="big">${qScore}<span style="font-size:34px;color:rgba(27,42,36,.4)"> / ${n}</span></div>
    <div class="msg">${msg}</div>
    <button class="btn btn-primary" id="qAgain">Repetir con otras preguntas</button>
    <a class="btn btn-ghost" href="tiempos.html" style="margin-left:10px">Repasar las fichas</a></div>`;
  document.getElementById('qAgain').addEventListener('click',quizStart);
}
quizIntro();
document.addEventListener('keydown',e=>{
  if(qLock||quizBox.querySelector('.qz-intro')||quizBox.querySelector('.qz-end'))return;
  const k=+e.key;if(k>=1&&k<=4){const b=quizBox.querySelector(`.qz-opt[data-i="${k-1}"]`);if(b)b.click();}
});

