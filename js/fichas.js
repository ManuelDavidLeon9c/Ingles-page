/* ================= FICHAS ================= */
(function buildCards(){
  const g=document.getElementById('cardsGrid');
  g.innerHTML=TENSES.map(t=>`
  <article class="t-card time-${t.time} rv" id="${t.id}">
    <div class="tc-strip"></div>
    <div class="tc-body">
      <div class="tc-top">
        <div><span class="t-pill">${TIME_ES[t.time]}</span>
          <h3>${t.en}</h3><div class="t-es">${t.es}</div></div>
        <div class="tc-ico" title="Aspecto ${ASPECT_ES[t.aspect].toLowerCase()}">${aspectIcon(t.aspect)}</div>
      </div>
      <div class="tc-block"><h4>Fórmula</h4>
        <div class="tc-formula">
          <div><span class="sign plus">+</span><code>${t.formula[0]}</code></div>
          <div><span class="sign minus">−</span><code>${t.formula[1]}</code></div>
          <div><span class="sign q">?</span><code>${t.formula[2]}</code></div>
        </div>
      </div>
      <div class="tc-block tc-uses"><h4>¿Cuándo se usa?</h4>
        <ul>${t.uses.map(u=>`<li>${u}</li>`).join('')}${t.warn?`<li class="warn">⚠ ${t.warn}</li>`:''}</ul>
      </div>
      <div class="tc-block"><h4>Ejemplos</h4>
        ${t.examples.map(e=>`<div class="ex"><div class="en">${e.en}</div><div class="es">${e.es}</div></div>`).join('')}
      </div>
      <div class="tc-foot">
        <div class="tc-tl">
          ${['past','present','future'].map(z=>`<span class="${z===t.time?'on':''} ${t.from===z?'from':''}">${TIME_ES[z]}</span>`).join('')}
        </div>
        <div class="tc-caption">${t.caption}</div>
        <div class="tc-chips"><span class="lbl">PISTAS →</span>${t.markers.map(m=>`<span class="chip">${m}</span>`).join('')}</div>
      </div>
    </div>
  </article>`).join('');
})();

/* Si llegamos con un hash (#present-simple), resaltamos esa ficha */
(function flashFromHash(){
  const id = location.hash.slice(1);
  if(!id) return;
  const card = document.getElementById(id);
  if(!card) return;
  // en index.html el scrollspy gestiona ya el desplazamiento a la sección:
  // solo saltamos a la ficha si estamos en la página dedicada (tiempos.html)
  const inFullPage = !!document.getElementById('quizCard');
  requestAnimationFrame(()=>{
    if(!inFullPage) card.scrollIntoView({behavior:'smooth',block:'center'});
    card.classList.add('in');
    card.classList.remove('flash'); void card.offsetWidth; card.classList.add('flash');
  });
})();
