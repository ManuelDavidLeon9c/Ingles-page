/* ================= MAPA ================= */
(function buildMap(){
  const g=document.getElementById('mapGrid');
  let html='<div class="map-corner">aspecto ↓ · tiempo →</div>';
  ['past','present','future'].forEach(t=>html+=`<div class="map-col ${t}">${TIME_WORD[t]}</div>`);
  ['simple','continuous','perfect','perfect-continuous'].forEach(a=>{
    html+=`<div class="map-rowlabel">${aspectIcon(a)} ${ASPECT_ES[a].toUpperCase()}</div>`;
    ['past','present','future'].forEach(t=>{
      const tn=TENSES.find(x=>x.time===t&&x.aspect===a);
      const page=document.getElementById('cardsGrid')?'':('tiempos.html');
      html+=`<a class="map-cell time-${t}" href="${page}#${tn.id}">
        <span class="mc-en">${tn.en}</span><span class="mc-form">${tn.short}</span></a>`;
    });
  });
  g.innerHTML=html;
})();

