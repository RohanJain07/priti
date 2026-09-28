const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

const passwordScreen=$("#passwordScreen"), passwordInput=$("#passwordInput"), unlockBtn=$("#unlockBtn"), passwordError=$("#passwordError");
function unlockWebsite(){
  if(passwordInput.value==="Priti"){
    passwordError.textContent="Unlocked ✦"; passwordScreen.classList.add("hide");
    setTimeout(()=>{passwordScreen.style.display="none";passwordInput.value=""},700);
  }else{
    passwordError.textContent="That password isn't correct. Try again."; passwordInput.value="";
    passwordInput.animate([{transform:"translateX(0)"},{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0)"}],{duration:300});
  }
}
unlockBtn.onclick=unlockWebsite;
passwordInput.onkeydown=e=>{if(e.key==="Enter")unlockWebsite()};

addEventListener("load",()=>setTimeout(()=>$("#loader").classList.add("hide"),1700));
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.14});
$$(".reveal").forEach(el=>observer.observe(el));
$$("[data-scroll]").forEach(btn=>btn.onclick=()=>document.querySelector(btn.dataset.scroll).scrollIntoView({behavior:"smooth"}));

const envelope=$("#envelope");
envelope.querySelector(".env-button").onclick=e=>{e.stopPropagation();envelope.classList.toggle("open");e.target.textContent=envelope.classList.contains("open")?"Close":"Open"};

$$(".star").forEach(star=>star.onclick=()=>{
  $("#skyMessage").textContent=star.dataset.message;
  $("#skyMessage").style.transform="translate(-50%,-50%) scale(1.05)";
  setTimeout(()=>$("#skyMessage").style.transform="translate(-50%,-50%) scale(1)",300);
});
$$(".gift-box").forEach(box=>box.onclick=()=>{
  $("#giftResult").textContent=box.dataset.gift;
  box.animate([{transform:"scale(1)"},{transform:"scale(1.08) rotate(-2deg)"},{transform:"scale(1)"}],{duration:450});
});

$("#celebrateBtn").onclick=()=>{
  $("#finalMessage").textContent="✨ You found the final surprise. Keep smiling, Priti. ✨"; burst();
};
function burst(){
  const c=$("#particles"),ctx=c.getContext("2d");c.width=innerWidth;c.height=innerHeight;
  const p=Array.from({length:90},()=>({x:innerWidth/2,y:innerHeight*.55,vx:(Math.random()-.5)*11,vy:(Math.random()-.8)*11,life:80+Math.random()*50,size:3+Math.random()*5,char:["✦","♡","✿","•"][Math.floor(Math.random()*4)]}));
  function f(){ctx.clearRect(0,0,c.width,c.height);p.forEach(x=>{x.x+=x.vx;x.y+=x.vy;x.vy+=.12;x.life--;ctx.globalAlpha=Math.max(0,x.life/100);ctx.font=`${x.size*4}px serif`;ctx.fillText(x.char,x.x,x.y)});if(p.some(x=>x.life>0))requestAnimationFrame(f);else ctx.clearRect(0,0,c.width,c.height)}f();
}
addEventListener("resize",()=>{$("#particles").width=innerWidth;$("#particles").height=innerHeight});

const music=$("#bgMusic"),musicBtn=$("#musicBtn");let musicOn=false;
musicBtn.onclick=async()=>{
  try{
    if(musicOn){music.pause();musicBtn.textContent="♪";musicOn=false}
    else{await music.play();musicBtn.textContent="♫";musicOn=true}
  }catch(e){alert("Make sure your file is named music.mp3 and is inside the assets folder.")}
};

document.addEventListener("pointermove",e=>{
  if(innerWidth<700)return;
  const d=document.createElement("span");d.textContent="·";
  d.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;color:#ef8fbb;pointer-events:none;z-index:50;font-size:16px;animation:fadeDot .7s forwards`;
  document.body.appendChild(d);setTimeout(()=>d.remove(),700);
});
const st=document.createElement("style");st.textContent="@keyframes fadeDot{to{opacity:0;transform:translateY(-15px) scale(1.8)}}";document.head.appendChild(st);
