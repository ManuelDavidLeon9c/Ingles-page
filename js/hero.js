/* ================= CICLO DEL HERO ================= */
const CY=[
 {z:'present',t:'Present Simple',f:'I <b>study</b> English every day.'},
 {z:'present',t:'Present Continuous',f:'I <b>am studying</b> English right now.'},
 {z:'present',t:'Present Perfect',f:'I <b>have studied</b> English for years.'},
 {z:'present',t:'Present Perfect Continuous',f:'I <b>have been studying</b> English all morning.'},
 {z:'past',t:'Past Simple',f:'I <b>studied</b> English last year.'},
 {z:'past',t:'Past Continuous',f:'I <b>was studying</b> English when you called.'},
 {z:'past',t:'Past Perfect',f:'I <b>had studied</b> English before moving to London.'},
 {z:'past',t:'Past Perfect Continuous',f:'I <b>had been studying</b> for a year when I got the job.'},
 {z:'future',t:'Future Simple',f:'I <b>will study</b> English tomorrow.'},
 {z:'future',t:'Future Continuous',f:'I <b>will be studying</b> English at 8 pm.'},
 {z:'future',t:'Future Perfect',f:'By Friday I <b>will have studied</b> all twelve tenses.'},
 {z:'future',t:'Future Perfect Continuous',f:'In June I <b>will have been studying</b> English for five years.'}
];
let cyI=0, cyTimer;
const POS={past:'16.5%',present:'50%',future:'83.5%'};
const ZVAR=z=>z==='past'?'past':z==='present'?'present':'future';
function drawCycle(){
  const c=CY[cyI];
  document.getElementById('cyCount').textContent=String(cyI+1).padStart(2,'0')+'/12';
  document.getElementById('cyTense').textContent=c.t;
  document.getElementById('cyTense').style.color=`var(--${ZVAR(c.z)})`;
  const sent=document.getElementById('cySent');
  sent.innerHTML=c.f;
  sent.querySelector('b').style.color=`var(--${ZVAR(c.z)})`;
  const needle=document.getElementById('cyNeedle');
  needle.style.left=POS[c.z];
  needle.style.background=`var(--${ZVAR(c.z)})`;
  document.querySelectorAll('#cyTrack span').forEach(s=>{
    s.className=(s.dataset.z===c.z)?('on-'+s.dataset.z):'';
  });
}
function cycleNext(){cyI=(cyI+1)%CY.length;drawCycle();}
function cycleStart(){clearInterval(cyTimer);cyTimer=setInterval(cycleNext,3300);}
document.getElementById('cycler').addEventListener('click',()=>{cycleNext();cycleStart();});
document.getElementById('cycler').addEventListener('mouseenter',()=>clearInterval(cyTimer));
document.getElementById('cycler').addEventListener('mouseleave',cycleStart);
drawCycle();cycleStart();

