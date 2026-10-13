/* ================= ERRORES ================= */
document.getElementById('flipsGrid').innerHTML=MISTAKES.map((m,i)=>`
  <div class="flip rv" style="transition-delay:${(i%4)*60}ms" tabindex="0" role="button" aria-label="Girar tarjeta">
    <div class="flip-inner">
      <div class="flip-face flip-front"><span class="fmark">✗ ERROR FRECUENTE</span>
        <span class="bad">${m.bad}</span><span class="flip-hint">toca para girar ↻</span></div>
      <div class="flip-face flip-back"><span class="fmark">✓ MEJOR DI…</span>
        <span class="good">${m.good}</span><span class="why">${m.why}</span>
        <span class="flip-hint">↻</span></div>
    </div>
  </div>`).join('');
document.getElementById('flipsGrid').addEventListener('click',e=>{
  const f=e.target.closest('.flip');if(f)f.classList.toggle('on');
});
document.getElementById('flipsGrid').addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){const f=e.target.closest('.flip');if(f){e.preventDefault();f.classList.toggle('on');}}
});

