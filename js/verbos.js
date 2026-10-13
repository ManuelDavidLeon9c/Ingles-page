/* ================= TABLA DE VERBOS (irregulares + regulares) ================= */
let typeFilter='all';
const ALL_VERBS=[
  ...IRR.map(r=>({base:r[0],past:r[1],pp:r[2],es:r[3],type:'irr'})),
  ...REG.map(r=>{const ed=pastReg(r[0]);return {base:r[0],past:ed,pp:ed,es:r[1],type:'reg'};})
].sort((a,b)=>a.base.localeCompare(b.base));

function renderIrr(){
  const q=document.getElementById('irrFilter').value.trim().toLowerCase();
  const rows=ALL_VERBS.filter(v=>
    (typeFilter==='all'||v.type===typeFilter)&&
    (!q||v.base.includes(q)||v.past.toLowerCase().includes(q)||v.es.toLowerCase().includes(q)));
  document.getElementById('irrBody').innerHTML=rows.map(v=>
    `<tr><td class="b">${v.base}</td><td class="b">${v.past}</td><td class="b">${v.pp}</td>
     <td class="es">${v.es}</td>
     <td><span class="type-tag ${v.type}">${v.type==='irr'?'IRREG':'REG'}</span></td></tr>`).join('');
  const nI=ALL_VERBS.filter(v=>v.type==='irr').length;
  document.getElementById('irrCount').textContent=
    `${rows.length} de ${ALL_VERBS.length} · ${nI} irregulares / ${ALL_VERBS.length-nI} regulares`;
}
renderIrr();
document.getElementById('irrFilter').addEventListener('input',renderIrr);
document.getElementById('typeToggles').addEventListener('click',e=>{
  const b=e.target.closest('.type-btn');if(!b)return;
  typeFilter=b.dataset.type;
  document.querySelectorAll('.type-btn').forEach(x=>x.classList.toggle('sel',x===b));
  renderIrr();
});

