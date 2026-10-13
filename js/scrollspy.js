/* Resalta el enlace activo del menú (solo en la página completa con todas las secciones) */
(function(){
  const navLinks=[...document.querySelectorAll('#mainNav a')];
  const secs=navLinks.map(a=>document.querySelector(a.getAttribute('href')));
  if(secs.some(s=>!s))return;
  let spyTick=false;
  window.addEventListener('scroll',()=>{
    if(spyTick)return;spyTick=true;
    requestAnimationFrame(()=>{
      let cur=0;
      secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<=140)cur=i;});
      navLinks.forEach((a,i)=>a.classList.toggle('active',i===cur));
      spyTick=false;
    });
  },{passive:true});
})();
