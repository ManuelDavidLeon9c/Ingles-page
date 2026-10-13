/* Animación de aparición al hacer scroll (con reserva si el navegador no soporta IntersectionObserver) */
(function(){
  const els=[...document.querySelectorAll('.rv')];
  if(!('IntersectionObserver' in window)){els.forEach(el=>el.classList.add('in'));return;}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.1});
  els.forEach(el=>io.observe(el));
})();
