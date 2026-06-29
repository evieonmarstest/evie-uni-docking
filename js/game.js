// Evie on Mars — UNI Docking
// V30 Professional Structure
// Main game logic. Keep assets in /assets/images and styles in /css/style.css.
(()=>{
'use strict';
const W=1600,H=900,canvas=document.getElementById('game'),ctx=canvas.getContext('2d');
const LEVELS=[{"name":"Debris Gate","reward":1,"par":3,"launch":{"x":241,"y":676},"earth":{"x":60,"y":1015,"r":350,"g":165000},"moon":{"x":1200,"y":235,"r":120,"g":122000},"dock":{"x":980,"y":300,"r":78},"debris":[{"sprite":1,"x":525,"y":610,"w":92,"h":72},{"sprite":3,"x":710,"y":455,"w":78,"h":74},{"sprite":2,"x":905,"y":520,"w":86,"h":76}],"hint":"Clear debris, then UNI auto-docks for early training levels."},{"name":"Cargo Arc","reward":2,"par":4,"launch":{"x":237,"y":680},"earth":{"x":55,"y":1020,"r":352,"g":170000},"moon":{"x":1135,"y":225,"r":130,"g":126000},"dock":{"x":1145,"y":430,"r":78},"debris":[{"sprite":3,"x":685,"y":355,"w":78,"h":72},{"sprite":2,"x":850,"y":470,"w":90,"h":80},{"sprite":8,"x":680,"y":610,"w":84,"h":76},{"sprite":6,"x":985,"y":345,"w":96,"h":72}],"hint":"Clear debris, then UNI auto-docks for early training levels."},{"name":"Reactor Triangle","reward":3,"par":4,"launch":{"x":251,"y":670},"earth":{"x":75,"y":1000,"r":340,"g":162000},"moon":{"x":1060,"y":215,"r":132,"g":128000},"dock":{"x":835,"y":225,"r":80},"debris":[{"sprite":7,"x":610,"y":520,"w":108,"h":86,"reactor":true},{"sprite":5,"x":760,"y":310,"w":88,"h":78},{"sprite":4,"x":920,"y":440,"w":88,"h":80},{"sprite":2,"x":720,"y":220,"w":88,"h":78}],"hint":"Clear debris, then UNI auto-docks for early training levels."},{"name":"Moon Orbit Gate","reward":4,"par":5,"launch":{"x":231,"y":671},"earth":{"x":50,"y":1010,"r":350,"g":168000},"moon":{"x":1305,"y":460,"r":116,"g":118000},"dock":{"x":1055,"y":240,"r":80},"debris":[{"sprite":5,"x":600,"y":505,"w":92,"h":78},{"sprite":1,"x":790,"y":320,"w":96,"h":74},{"sprite":6,"x":1000,"y":385,"w":94,"h":74}],"hint":"MOVING DOCK \u00b7 launch from Earth \u00b7 clear debris, then manually shoot into the orbiting UNI gate.","dockOrbit":{"radius":150,"speed":0.34,"angle":2.35}},{"name":"Lunar Chase","reward":5,"par":5,"launch":{"x":228,"y":687},"earth":{"x":45,"y":1030,"r":355,"g":160000},"moon":{"x":915,"y":290,"r":168,"g":172000},"dock":{"x":1245,"y":625,"r":82},"debris":[{"sprite":1,"x":620,"y":655,"w":96,"h":74},{"sprite":3,"x":815,"y":470,"w":80,"h":74},{"sprite":7,"x":1030,"y":635,"w":104,"h":82,"reactor":true}],"hint":"MOVING DOCK \u00b7 launch from Earth \u00b7 clear debris, then manually shoot into the orbiting UNI gate.","dockOrbit":{"radius":165,"speed":-0.38,"angle":1.25}},{"name":"Halo Run","reward":6,"par":6,"launch":{"x":238,"y":672},"earth":{"x":55,"y":1015,"r":355,"g":172000},"moon":{"x":1240,"y":230,"r":140,"g":134000},"dock":{"x":1090,"y":315,"r":84},"debris":[{"sprite":1,"x":690,"y":575,"w":96,"h":74},{"sprite":7,"x":830,"y":410,"w":104,"h":84,"reactor":true},{"sprite":2,"x":980,"y":520,"w":88,"h":80}],"hint":"LEVEL 6 FIX \u00b7 clear visible debris only, then manually shoot into the orbiting UNI gate.","dockOrbit":{"radius":175,"speed":0.42,"angle":3.65}},{"name":"Moon Traffic Ring","reward":7,"par":6,"launch":{"x":241,"y":676},"earth":{"x":60,"y":1015,"r":350,"g":168000},"moon":{"x":1210,"y":280,"r":128,"g":138000},"dock":{"x":1040,"y":410,"r":82},"debris":[{"sprite":1,"x":760,"y":520,"w":96,"h":74},{"sprite":6,"x":0,"y":0,"w":94,"h":74,"orbit":{"center":"moon","radius":285,"speed":0.34,"angle":2.55}},{"sprite":3,"x":0,"y":0,"w":82,"h":76,"orbit":{"center":"moon","radius":335,"speed":-0.26,"angle":2.05}},{"sprite":5,"x":960,"y":595,"w":92,"h":78}],"hint":"LEVEL 7 \u00b7 moving debris traffic ring \u00b7 clear all, then manually dock.","dockOrbit":{"radius":182,"speed":0.46,"angle":2.45}},{"name":"Broken Satellite Belt","reward":8,"par":6,"launch":{"x":237,"y":680},"earth":{"x":55,"y":1020,"r":352,"g":170000},"moon":{"x":1135,"y":250,"r":132,"g":145000},"dock":{"x":1010,"y":430,"r":82},"debris":[{"sprite":7,"x":790,"y":470,"w":108,"h":86,"reactor":true},{"sprite":1,"x":690,"y":365,"w":96,"h":74},{"sprite":2,"x":930,"y":355,"w":90,"h":80},{"sprite":8,"x":1010,"y":535,"w":86,"h":78},{"sprite":6,"x":610,"y":585,"w":96,"h":72}],"hint":"LEVEL 8 \u00b7 hit the reactor debris to chain-clear the satellite belt.","dockOrbit":{"radius":188,"speed":-0.52,"angle":2.25}},{"name":"Dark Gravity Lane","reward":9,"par":7,"launch":{"x":251,"y":670},"earth":{"x":75,"y":1000,"r":340,"g":190000},"moon":{"x":1085,"y":250,"r":150,"g":178000},"dock":{"x":1280,"y":430,"r":84},"debris":[{"sprite":5,"x":580,"y":620,"w":92,"h":78},{"sprite":1,"x":725,"y":500,"w":96,"h":74},{"sprite":2,"x":870,"y":390,"w":90,"h":80},{"sprite":4,"x":1025,"y":570,"w":90,"h":82},{"sprite":3,"x":1185,"y":455,"w":82,"h":76}],"hint":"LEVEL 9 \u00b7 strong gravity lane \u00b7 use the curve, then catch the moving UNI gate.","dockOrbit":{"radius":218,"speed":0.58,"angle":1.05}}];
const evieImg=new Image(); evieImg.src='assets/images/evie_head.png';
const uniImg=new Image(); uniImg.src='assets/images/uni_head.png';
const coinImg=new Image(); coinImg.src='assets/images/fox_coin.png';
const earthImg=new Image(); earthImg.src='assets/images/earth_real.png';
const moonImg=new Image(); moonImg.src='assets/images/moon_real.png';
const debrisImgs=[null,(()=>{const i=new Image();i.src='assets/images/debris_1.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/debris_2.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/debris_3.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/debris_4.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/debris_5.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/debris_6.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/debris_7.png';return i;})(),(()=>{const i=new Image();i.src='assets/images/debris_8.png';return i;})()];
const storeKey='evie_uni_v30_professional_structure';
let save={coins:0,stars:Array(LEVELS.length).fill(0),lastLevel:0};
try{Object.assign(save, JSON.parse(localStorage.getItem(storeKey)||'{}')); if(!save.stars)save.stars=Array(LEVELS.length).fill(0);}catch(e){}
const urlLevelRaw=parseInt(new URLSearchParams(location.search).get('level')||'',10);const initialLevel=Number.isFinite(urlLevelRaw)?urlLevelRaw-1:(save.lastLevel||0);
const state={level:Math.max(0,Math.min(LEVELS.length-1,initialLevel)),mode:'aim',drag:false,ship:{x:0,y:0,vx:0,vy:0,rot:0,age:0},launchOrigin:{x:0,y:0},pointer:{x:0,y:0},currentLevel:null,shots:0,score:0,predict:[],trail:[],particles:[],timer:0,message:''};
const starsBg=Array.from({length:180},(_,i)=>({x:(Math.sin(i*97.2)*.5+.5)*W,y:(Math.cos(i*61.5)*.5+.5)*H,r:i%6===0?1.8:.9,a:.18+(i%5)*.13}));
function persist(){save.lastLevel=state.level; localStorage.setItem(storeKey, JSON.stringify(save));}
function dist(x1,y1,x2,y2){return Math.hypot(x2-x1,y2-y1);}
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function color(){return ['#73dfff','#5ffff5','#ffb347','#80ffaf','#bc8cff','#ff7777'][state.level%6];}
function makeLevel(idx){const s=LEVELS[idx];const lvl={name:s.name,reward:s.reward,par:s.par,hint:s.hint,launch:{...s.launch},earth:{...s.earth},moon:{...s.moon},dock:{...s.dock,open:false},dockOrbit:s.dockOrbit?{...s.dockOrbit}:null,debris:s.debris.map((d,i)=>({id:i+1,...d,baseX:d.x,baseY:d.y,dead:false,hp:d.hp||1,maxHp:d.hp||1,rot:(Math.random()-.5)*0.8,orbit:d.orbit?{...d.orbit}:null}))};if(lvl.dockOrbit){lvl.dock.x=lvl.moon.x+Math.cos(lvl.dockOrbit.angle)*lvl.dockOrbit.radius;lvl.dock.y=lvl.moon.y+Math.sin(lvl.dockOrbit.angle)*lvl.dockOrbit.radius;}for(const d of lvl.debris){if(d.orbit){const c=d.orbit.center==='moon'?lvl.moon:lvl.earth;d.x=c.x+Math.cos(d.orbit.angle)*d.orbit.radius;d.y=c.y+Math.sin(d.orbit.angle)*d.orbit.radius;}}return lvl;}
function enterLevel(idx){state.level=(idx+LEVELS.length)%LEVELS.length;state.currentLevel=makeLevel(state.level);state.shots=0;state.score=0;state.message='';state.mode='aim';state.drag=false;state.timer=0;const l=state.currentLevel;state.launchOrigin={x:l.launch.x,y:l.launch.y};state.pointer={x:l.launch.x,y:l.launch.y};state.ship={x:l.launch.x,y:l.launch.y,vx:0,vy:0,rot:-.2,age:0};state.predict=[];state.trail=[];state.particles=[];save.lastLevel=state.level;persist();}
function resetLevel(){enterLevel(state.level);}
function remaining(){return state.currentLevel.debris.filter(d=>!d.dead);}
function allCleared(){return remaining().length===0;}
function manualDockLevel(){return state.level>=3;}
function updateMovingDebris(dt){const l=state.currentLevel;if(!l)return;for(const d of l.debris){if(d.dead||!d.orbit)continue;const c=d.orbit.center==='moon'?l.moon:l.earth;d.orbit.angle+=d.orbit.speed*dt;d.x=c.x+Math.cos(d.orbit.angle)*d.orbit.radius;d.y=c.y+Math.sin(d.orbit.angle)*d.orbit.radius;d.rot+=d.orbit.speed*dt*.35;}}


function updateDockOrbit(dt){const l=state.currentLevel;if(!l||!l.dockOrbit)return;const o=l.dockOrbit;o.angle+=o.speed*dt;l.dock.x=l.moon.x+Math.cos(o.angle)*o.radius;l.dock.y=l.moon.y+Math.sin(o.angle)*o.radius;if(!isFinite(l.dock.x)||!isFinite(l.dock.y)){o.angle=0;l.dock.x=l.moon.x+o.radius;l.dock.y=l.moon.y;}}
function emit(x,y,color,count,minS,maxS){for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,s=minS+Math.random()*(maxS-minS);state.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.5+Math.random()*.8,color});}}
function pull(){let dx=state.pointer.x-state.launchOrigin.x,dy=state.pointer.y-state.launchOrigin.y;const len=Math.hypot(dx,dy),max=170;if(len>max){dx=dx/len*max;dy=dy/len*max;}return {dx,dy,len:Math.min(len,max)};}
function accelAt(x,y,lev=state.currentLevel){
  let ax=0, ay=0;
  let de=Math.max(120,dist(x,y,lev.earth.x,lev.earth.y));
  let fe=lev.earth.g/(de*de);
  ax += (lev.earth.x-x)/de*fe;
  ay += (lev.earth.y-y)/de*fe;
  let eOrbit=Math.max(0, 280-de)/280 * 0.22;
  ax += -(lev.earth.y-y)/de * fe * eOrbit;
  ay +=  (lev.earth.x-x)/de * fe * eOrbit;

  let dm=Math.max(100,dist(x,y,lev.moon.x,lev.moon.y));
  let fm=lev.moon.g/(dm*dm);
  ax += (lev.moon.x-x)/dm*fm;
  ay += (lev.moon.y-y)/dm*fm;
  let mOrbit=Math.max(0, 420-dm)/420 * 0.78;
  ax += -(lev.moon.y-y)/dm * fm * mOrbit;
  ay +=  (lev.moon.x-x)/dm * fm * mOrbit;
  return {ax,ay};
}
const POWER=4.95, MIN_SPEED=170, MAX_SPEED=840, DAMP=.94, ARC_FORCE=608;
function clamp(m){let sp=Math.hypot(m.vx,m.vy);if(sp>MAX_SPEED){m.vx=m.vx/sp*MAX_SPEED;m.vy=m.vy/sp*MAX_SPEED;sp=MAX_SPEED;}if(m.age>.22 && sp<MIN_SPEED && sp>0){let floor=MIN_SPEED;if(manualDockLevel()&&allCleared())floor=120;m.vx=m.vx/sp*floor;m.vy=m.vy/sp*floor;}}
function curveSign(){return state.level===3?-1:1}
function dockAssistFactor(x,y){
  if(!(manualDockLevel()&&allCleared())) return 1;
  const d=state.currentLevel.dock;
  const dd=dist(x,y,d.x,d.y);
  if(dd<320) return 0.22;
  if(dd<520) return 0.38;
  return 0.55;
}
function addArcForce(vx,vy,dt,age,x,y){
  const sp=Math.max(1,Math.hypot(vx,vy));
  const sign=curveSign();
  const ramp=Math.min(1,age/0.65);
  const moon=state.currentLevel.moon;
  const dm=dist(x,y,moon.x,moon.y);
  const moonBoost=Math.max(0, 520-dm)/520;
  let force=(ARC_FORCE*(0.65+moonBoost*1.25))*ramp;
  force*=dockAssistFactor(x,y);
  // perpendicular acceleration: visible arc, but weaker once the open dock should be reachable
  vx += (-vy/sp)*force*sign*dt;
  vy += ( vx/sp)*force*sign*dt;
  return {vx,vy};
}
function applyDockAssist(m,dt){
  if(!(manualDockLevel()&&allCleared())) return;
  const d=state.currentLevel.dock;
  const dx=d.x-m.x, dy=d.y-m.y;
  const dd=Math.hypot(dx,dy);
  if(dd<520){
    const pull=(dd<260?620:310)*(1-dd/520);
    if(dd>1){
      m.vx += dx/dd*pull*dt;
      m.vy += dy/dd*pull*dt;
    }
    if(dd<170){
      m.vx*=0.992;
      m.vy*=0.992;
    }
  }
}
function predictPath(){
  if(!state.drag||state.mode!=='aim')return[];
  const p=pull(),lev=state.currentLevel;
  let x=lev.launch.x,y=lev.launch.y,vx=-p.dx*POWER*.94,vy=-p.dy*POWER*.94,age=0,pts=[];
  for(let i=0;i<170;i++){
    age+=.058;
    const a=accelAt(x,y,lev);
    vx+=a.ax*.058; vy+=a.ay*.058;
    const curved=addArcForce(vx,vy,.058,age,x,y); vx=curved.vx; vy=curved.vy;
    vx*=.9985; vy*=.9985;
    let sp=Math.hypot(vx,vy);
    if(sp>MAX_SPEED){vx=vx/sp*MAX_SPEED;vy=vy/sp*MAX_SPEED;sp=MAX_SPEED;}
    if(age>.22&&sp<MIN_SPEED){vx=vx/sp*MIN_SPEED;vy=vy/sp*MIN_SPEED;}
    x+=vx*.058; y+=vy*.058;
    if(i%2===0)pts.push({x,y});
    if(x<-200||x>W+200||y<-200||y>H+200)break;
  }
  return pts;
}
function launch(){const p=pull(); if(p.len<10)return; state.mode='fly';state.drag=false;state.shots++;state.ship={x:state.launchOrigin.x,y:state.launchOrigin.y,vx:-p.dx*POWER,vy:-p.dy*POWER,rot:0,age:0};clamp(state.ship);state.ship.rot=Math.atan2(state.ship.vy,state.ship.vx);state.trail=[];state.predict=[];state.message='';emit(state.ship.x,state.ship.y,'#ffb347',18,90,220);}
function breakDebris(d){if(d.dead)return;d.hp=(d.hp||1)-1;if(d.hp>0){emit(d.x,d.y,'#ffb347',18,40,150);return;}d.dead=true;state.score+=d.reactor?35:20;emit(d.x,d.y,d.reactor?'#ffb347':'#77e0ff',d.reactor?72:38,50,d.reactor?330:220);if(d.reactor){for(const n of state.currentLevel.debris)if(!n.dead&&dist(d.x,d.y,n.x,n.y)<170){n.dead=true;state.score+=20;emit(n.x,n.y,'#77e0ff',30,40,180);}}}
function afterHit(){
if(allCleared()){
  state.currentLevel.dock.open=true;
  if(manualDockLevel()){
    state.message='UNI GATE OPEN - SHOOT TO DOCK';
    state.mode='return';
    state.timer=.70;
  }else{
    state.message='ALL DEBRIS CLEARED';
    state.mode='autodock';
    state.timer=.95;
  }
}else{
  state.message='DEBRIS CLEARED';
  state.mode='return';
  state.timer=.58;
}
}
function onWin(){const r=state.currentLevel.reward;let star=1;if(state.shots<=state.currentLevel.par+1)star=2;if(state.shots<=state.currentLevel.par)star=3;state.mode='won';state.message='MISSION CLEAR';save.coins=(save.coins||0)+r;save.stars[state.level]=Math.max(save.stars[state.level]||0,star);persist();emit(state.currentLevel.dock.x,state.currentLevel.dock.y,'#80ffaf',100,50,330);}
function onFail(type){state.mode='fail';state.timer=.9;state.message=type==='earth'?'EARTH CRASH':'FLIGHT LOST';emit(state.ship.x,state.ship.y,type==='earth'?'#ffb347':'#bc8cff',56,60,240);}
function update(dt){
  dt=Math.min(dt,.033);
  updateDockOrbit(dt);
  updateMovingDebris(dt);
  for(let i=state.particles.length-1;i>=0;i--){const p=state.particles[i];p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.985;p.vy*=.985;if(p.life<=0)state.particles.splice(i,1);}
  if(state.mode==='return'){state.timer-=dt;if(state.timer<=0){const l=state.currentLevel.launch;state.mode='aim';state.message='';state.drag=false;state.ship={x:l.x,y:l.y,vx:0,vy:0,rot:-.2,age:0};state.launchOrigin={x:l.x,y:l.y};state.pointer={x:l.x,y:l.y};state.trail=[];state.predict=[];}return;}
  if(state.mode==='autodock'){if(manualDockLevel()){state.mode='aim';state.message='UNI GATE OPEN - SHOOT TO DOCK';return;}const d=state.currentLevel.dock,m=state.ship;m.age+=dt;m.vx=(d.x-m.x)*3.2;m.vy=(d.y-m.y)*3.2;m.x+=m.vx*dt;m.y+=m.vy*dt;m.rot=Math.atan2(m.vy,m.vx);state.trail.push({x:m.x,y:m.y});if(state.trail.length>170)state.trail.shift();state.timer-=dt;if(dist(m.x,m.y,d.x,d.y)<18||state.timer<=0)onWin();return;}
  if(state.mode==='fly'){
    const l=state.currentLevel,m=state.ship,a=accelAt(m.x,m.y,l);
    if(manualDockLevel()&&allCleared()&&m.age>8.5){state.message='TRY DOCK AGAIN';state.mode='return';state.timer=.45;return;}
    m.age+=dt;
    m.vx+=a.ax*dt;
    m.vy+=a.ay*dt;
    const curved=addArcForce(m.vx,m.vy,dt,m.age,m.x,m.y);
    m.vx=curved.vx; m.vy=curved.vy;
    applyDockAssist(m,dt);
    m.vx*=.9985; m.vy*=.9985;
    clamp(m);
    m.x+=m.vx*dt; m.y+=m.vy*dt; m.rot=Math.atan2(m.vy,m.vx);
    state.trail.push({x:m.x,y:m.y}); if(state.trail.length>170)state.trail.shift();
    for(const d of l.debris){if(!d.dead&&dist(m.x,m.y,d.x,d.y)<Math.max(d.w,d.h)*.34+18){breakDebris(d);m.vx*=DAMP;m.vy*=DAMP;afterHit();return;}}
    if(allCleared()&&dist(m.x,m.y,l.dock.x,l.dock.y)<l.dock.r+30){l.dock.open=true;if(manualDockLevel()){onWin();return;}else{state.mode='autodock';state.timer=.65;return;}}
    if(m.age>.55&&dist(m.x,m.y,l.launch.x,l.launch.y)>90&&dist(m.x,m.y,l.earth.x,l.earth.y)<l.earth.r+8)onFail('earth');
    else if(dist(m.x,m.y,l.moon.x,l.moon.y)<l.moon.r+8)onFail('moon');
    else if(m.x<-450||m.x>W+450||m.y<-450||m.y>H+450)onFail('space');
    return;
  }
  if(state.mode==='won'||state.mode==='fail') state.timer=Math.max(0,state.timer-dt);
}
function bg(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#101a2d');g.addColorStop(.45,'#08111d');g.addColorStop(1,'#03050b');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);for(const s of starsBg){ctx.globalAlpha=s.a;ctx.fillStyle=s.r>1?'#dbe8ff':'#9ab7ff';ctx.fillRect(s.x,s.y,s.r,s.r);}ctx.globalAlpha=1;ctx.strokeStyle='rgba(97,139,214,.08)';for(let y=120;y<H;y+=80){ctx.beginPath();ctx.moveTo(0,y);ctx.bezierCurveTo(450,y-26,1000,y+22,W,y-12);ctx.stroke();}}
function drawPlanet(img,x,y,r,glow){ctx.save();ctx.shadowBlur=20;ctx.shadowColor=glow;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip(); if(img.complete) ctx.drawImage(img,x-r,y-r,r*2,r*2); else {ctx.fillStyle='#223';ctx.fillRect(x-r,y-r,r*2,r*2);} ctx.restore();ctx.strokeStyle=glow;ctx.lineWidth=4;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();}
function drawGravity(){const l=state.currentLevel;ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(100,210,255,.16)';ctx.lineWidth=2;for(let r=l.earth.r+18;r<l.earth.r+170;r+=34){ctx.beginPath();ctx.arc(l.earth.x,l.earth.y,r,-1.18,.12);ctx.stroke();}ctx.setLineDash([10,12]);ctx.strokeStyle='rgba(188,140,255,.24)';for(let r=l.moon.r+26;r<l.moon.r+170;r+=34){ctx.beginPath();ctx.arc(l.moon.x,l.moon.y,r,1.7,4.5);ctx.stroke();}ctx.restore();ctx.setLineDash([]);}
function drawDock(){const d=state.currentLevel.dock,col=allCleared()?'#80ffaf':color(),t=performance.now()/1000;ctx.save();ctx.translate(d.x,d.y);ctx.shadowBlur=22;ctx.shadowColor=col;for(let i=0;i<4;i++){ctx.save();ctx.rotate((i%2?-1:1)*(t*.32+i*.85));ctx.strokeStyle=i===2?'#ffb347':col;ctx.lineWidth=i===3?3:5;ctx.beginPath();ctx.arc(0,0,d.r+i*9,i*.9,i*.9+Math.PI*1.2);ctx.stroke();ctx.restore();}ctx.shadowBlur=0;ctx.fillStyle='rgba(12,22,44,.9)';ctx.beginPath();ctx.arc(0,0,d.r-15,0,Math.PI*2);ctx.fill();const faceR=d.r-37;ctx.save();ctx.beginPath();ctx.arc(0,0,faceR,0,Math.PI*2);ctx.clip();if(uniImg.complete)ctx.drawImage(uniImg,-faceR,-faceR,faceR*2,faceR*2);ctx.restore();ctx.textAlign='center';ctx.fillStyle=allCleared()?'#80ffaf':'#ffb347';ctx.font='700 16px Segoe UI,Arial';ctx.fillText(allCleared()?'OPEN':'CLEAR ALL',0,d.r+28);ctx.restore();}
function drawDebris(d){if(d.dead)return;const img=debrisImgs[d.sprite];ctx.save();ctx.translate(d.x,d.y);ctx.rotate(d.rot);ctx.shadowBlur=16;ctx.shadowColor='rgba(110,220,255,.55)';if(img&&img.complete)ctx.drawImage(img,-d.w/2,-d.h/2,d.w,d.h);else{ctx.fillStyle='#557';ctx.fillRect(-d.w/2,-d.h/2,d.w,d.h);}ctx.restore();}
function dots(arr,col,size){ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<arr.length;i++){const p=arr[i];ctx.globalAlpha=.10+(i/Math.max(1,arr.length))*.72;ctx.fillStyle=col;ctx.beginPath();ctx.arc(p.x,p.y,size,0,Math.PI*2);ctx.fill();}ctx.restore();ctx.globalAlpha=1;}
function drawLauncher(){
const l=state.currentLevel.launch;
const e=state.currentLevel.earth;

ctx.save();
ctx.strokeStyle='rgba(115,223,255,.45)';
ctx.lineWidth=5;
ctx.beginPath();
const anchorAngle=-1.1;
const ax=e.x+Math.cos(anchorAngle)*(e.r+4);
const ay=e.y+Math.sin(anchorAngle)*(e.r+4);
ctx.moveTo(ax,ay);
ctx.quadraticCurveTo((ax+l.x)/2-10,(ay+l.y)/2+20,l.x,l.y);
ctx.stroke();
ctx.restore();

ctx.save();
ctx.translate(l.x,l.y);
ctx.strokeStyle=color();
ctx.lineWidth=4;
ctx.beginPath();
ctx.arc(0,0,42,0,Math.PI*2);
ctx.stroke();
ctx.globalAlpha=.25;
ctx.beginPath();
ctx.arc(0,0,62,0,Math.PI*2);
ctx.stroke();
ctx.globalAlpha=1;
ctx.restore();

if(state.drag&&state.mode==='aim'){
  const p=pull();
  ctx.strokeStyle='rgba(255,179,71,.88)';
  ctx.lineWidth=5;
  ctx.beginPath();
  ctx.moveTo(state.launchOrigin.x,state.launchOrigin.y);
  ctx.lineTo(state.launchOrigin.x+p.dx,state.launchOrigin.y+p.dy);
  ctx.stroke();
  state.predict=predictPath();
}else if(state.mode==='aim'){state.predict=[]}
}
function portrait(img,x,y,r){ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();if(img.complete)ctx.drawImage(img,x-r,y-r,r*2,r*2);ctx.restore();ctx.strokeStyle='rgba(255,255,255,.98)';ctx.lineWidth=2.4;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();}
function portraitScreen(img,x,y,r){ctx.save();ctx.shadowBlur=14;ctx.shadowColor='rgba(130,220,255,.7)';ctx.fillStyle='rgba(10,18,32,.96)';ctx.beginPath();ctx.arc(x,y,r+4,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();if(img.complete)ctx.drawImage(img,x-r,y-r,r*2,r*2);ctx.restore();ctx.strokeStyle='rgba(255,255,255,.98)';ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();}
function drawShip(){let x=state.ship.x,y=state.ship.y,r=state.ship.rot;
if(state.drag&&state.mode==='aim'){x=state.launchOrigin.x;y=state.launchOrigin.y;const p=pull();r=Math.atan2(-p.dy,-p.dx);} 
const sc=.58;
ctx.save();
ctx.translate(x,y);ctx.rotate(r);ctx.scale(sc,sc);

// engine flame
if(state.mode==='fly'){
  ctx.globalCompositeOperation='lighter';
  ctx.fillStyle='rgba(255,160,60,.98)';
  ctx.beginPath();ctx.moveTo(-104,0);ctx.lineTo(-145,-17);ctx.lineTo(-160,0);ctx.lineTo(-145,17);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(255,230,170,.95)';
  ctx.beginPath();ctx.moveTo(-100,0);ctx.lineTo(-128,-9);ctx.lineTo(-138,0);ctx.lineTo(-128,9);ctx.closePath();ctx.fill();
  ctx.globalCompositeOperation='source-over';
}

// wings
ctx.fillStyle='rgba(67,90,140,.96)';
ctx.beginPath();ctx.moveTo(-10,-18);ctx.lineTo(-70,-62);ctx.lineTo(-30,-6);ctx.closePath();ctx.fill();
ctx.beginPath();ctx.moveTo(-10,18);ctx.lineTo(-70,62);ctx.lineTo(-30,6);ctx.closePath();ctx.fill();

// tail fins
ctx.fillStyle='rgba(76,103,160,.95)';
ctx.beginPath();ctx.moveTo(-74,-6);ctx.lineTo(-96,-32);ctx.lineTo(-56,-14);ctx.closePath();ctx.fill();
ctx.beginPath();ctx.moveTo(-74,6);ctx.lineTo(-96,32);ctx.lineTo(-56,14);ctx.closePath();ctx.fill();

// main hull
ctx.fillStyle='rgba(236,243,255,.99)';
ctx.beginPath();
ctx.moveTo(102,0);
ctx.lineTo(38,-28);
ctx.lineTo(-26,-26);
ctx.lineTo(-84,-12);
ctx.lineTo(-96,0);
ctx.lineTo(-84,12);
ctx.lineTo(-26,26);
ctx.lineTo(38,28);
ctx.closePath();
ctx.fill();

// top hull accent
ctx.fillStyle='rgba(134,190,255,.35)';
ctx.beginPath();ctx.moveTo(32,-18);ctx.lineTo(-12,-18);ctx.lineTo(-54,-8);ctx.lineTo(-14,-4);ctx.lineTo(46,-6);ctx.closePath();ctx.fill();

// cockpit bubble
ctx.fillStyle='rgba(8,16,30,.96)';
ctx.strokeStyle='rgba(160,235,255,.98)';
ctx.lineWidth=3;
ctx.beginPath();ctx.ellipse(14,0,33,25,0,0,Math.PI*2);ctx.fill();ctx.stroke();

// nose light
ctx.fillStyle='#ffb347';
ctx.beginPath();ctx.arc(93,0,7.5,0,Math.PI*2);ctx.fill();

// hull outline
ctx.strokeStyle='rgba(120,220,255,.98)';
ctx.lineWidth=2.8;
ctx.beginPath();
ctx.moveTo(102,0);
ctx.lineTo(38,-28);
ctx.lineTo(-26,-26);
ctx.lineTo(-84,-12);
ctx.lineTo(-96,0);
ctx.lineTo(-84,12);
ctx.lineTo(-26,26);
ctx.lineTo(38,28);
ctx.closePath();
ctx.stroke();
ctx.restore();

// Draw Evie face centered in the cockpit, screen-aligned for readability
const faceX=x+Math.cos(r)*(14*sc)-Math.sin(r)*(0);
const faceY=y+Math.sin(r)*(14*sc)+Math.cos(r)*(0);
portraitScreen(evieImg,faceX,faceY,19);
} 
function drawStar(cx,cy,r,fill){ctx.save();ctx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2===0?r:r*.45,x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.closePath();ctx.fillStyle=fill?'#ffc754':'rgba(15,20,30,.5)';ctx.strokeStyle='rgba(185,220,255,.55)';ctx.lineWidth=2;ctx.fill();ctx.stroke();ctx.restore();}
function drawHUD(){ctx.save();ctx.fillStyle='rgba(7,12,24,.66)';ctx.strokeStyle=color();ctx.globalAlpha=.95;ctx.lineWidth=1.5;rr(28,18,W-56,72,18);ctx.fill();ctx.stroke();ctx.globalAlpha=1;ctx.fillStyle='#eaf2ff';ctx.font='600 25px Segoe UI,Arial';ctx.fillText('LEVEL '+String(state.level+1).padStart(2,'0')+'/09 · '+state.currentLevel.name.toUpperCase(),60,62);ctx.font='700 26px Segoe UI,Arial';ctx.textAlign='center';ctx.fillText('FOX COINS '+(save.coins||0),W/2+50,63);ctx.textAlign='right';ctx.font='500 20px Segoe UI,Arial';ctx.fillText('SHOTS '+state.shots+' · DEBRIS LEFT '+remaining().length,W-110,60);ctx.textAlign='left';ctx.fillStyle='rgba(220,235,255,.82)';ctx.font='500 14px Segoe UI,Arial';ctx.fillText(state.currentLevel.hint,60,92);ctx.textAlign='right';for(let i=0;i<3;i++) drawStar(W-90+(i*32),48,12, i<(save.stars[state.level]||0));ctx.restore();}
function drawParticles(){ctx.save();ctx.globalCompositeOperation='lighter';for(const p of state.particles){ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,2.8,0,Math.PI*2);ctx.fill();}ctx.restore();ctx.globalAlpha=1;}
function drawOverlay(){if(state.message&&(state.mode==='return'||state.mode==='autodock')){ctx.save();ctx.textAlign='center';ctx.fillStyle='rgba(128,255,175,.95)';ctx.font='700 30px Segoe UI,Arial';ctx.fillText(state.message,W/2,150);ctx.restore();}if(state.mode==='won'||state.mode==='fail'){ctx.save();ctx.fillStyle='rgba(6,10,20,.86)';ctx.strokeStyle=state.mode==='won'?'#80ffaf':'#ffb347';ctx.lineWidth=2;rr(W/2-215,H/2-110,430,220,24);ctx.fill();ctx.stroke();ctx.textAlign='center';ctx.fillStyle='#eff7ff';ctx.font='700 38px Segoe UI,Arial';ctx.fillText(state.mode==='won'?'MISSION CLEAR':'RETRY',W/2,H/2-54);if(state.mode==='won'){for(let i=0;i<3;i++) drawStar(W/2-52+i*52,H/2+8,18,i<Math.max(1,Math.min(3,save.stars[state.level]||1)));ctx.fillStyle='rgba(128,255,175,.96)';ctx.font='700 26px Segoe UI,Arial';ctx.fillText('+'+state.currentLevel.reward+' FOX COIN'+(state.currentLevel.reward>1?'S':''),W/2,H/2+56);ctx.fillStyle='rgba(220,235,255,.88)';ctx.font='700 20px Segoe UI,Arial';ctx.fillText('CLICK / ENTER = NEXT LEVEL',W/2,H/2+84);}else{ctx.fillStyle='rgba(220,235,255,.88)';ctx.font='700 22px Segoe UI,Arial';ctx.fillText('CLICK / R = RETRY LEVEL',W/2,H/2+45);}ctx.restore();}}
function render(){bg();const l=state.currentLevel;drawPlanet(earthImg,l.earth.x,l.earth.y,l.earth.r,'#73dfff');drawPlanet(moonImg,l.moon.x,l.moon.y,l.moon.r,'#bc8cff');drawGravity();drawDock();for(const d of l.debris)drawDebris(d);dots(state.trail,color(),3);dots(state.predict,'#9f8cff',3);drawLauncher();drawShip();drawParticles();drawHUD();drawOverlay();}
function pos(e){const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height};}
canvas.addEventListener('pointerdown',e=>{state.pointer=pos(e);state.launchOrigin={...state.currentLevel.launch};if(state.mode==='won'){enterLevel(Math.min(state.level+1, LEVELS.length-1));return;}if(state.mode==='fail'){resetLevel();return;}if(state.mode==='aim'){state.drag=true;try{canvas.setPointerCapture(e.pointerId);}catch(err){}}});
canvas.addEventListener('pointermove',e=>{state.pointer=pos(e);});
canvas.addEventListener('pointerup',e=>{state.pointer=pos(e);if(state.drag&&state.mode==='aim')launch();state.drag=false;try{canvas.releasePointerCapture(e.pointerId);}catch(err){}});
canvas.addEventListener('pointercancel',()=>{state.drag=false;});
window.addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(state.mode==='won'&&(k==='enter'||k===' ')){enterLevel(Math.min(state.level+1, LEVELS.length-1));return;}if(k==='r'){resetLevel();return;}if(k==='n'){enterLevel(state.level+1);return;}if(k==='p'){enterLevel(state.level-1);return;} if(k>='1'&&k<='9'){enterLevel(parseInt(k)-1);return;}});
window.__EVIE_UNI_GAME_TEST__={enterLevel,resetLevel,state,remaining:()=>remaining().length};
enterLevel(state.level);

function runSelfTest(){
  const lines=[];
  const errors=[];
  const pass=(name,detail='')=>lines.push('PASS  '+name+(detail?' — '+detail:''));
  const fail=(name,detail='')=>{errors.push(name+(detail?' — '+detail:''));lines.push('FAIL  '+name+(detail?' — '+detail:''));};
  const warn=(name,detail='')=>lines.push('WARN  '+name+(detail?' — '+detail:''));

  function check(cond,name,detail=''){cond?pass(name,detail):fail(name,detail);}
  function d(x1,y1,x2,y2){return Math.hypot(x1-x2,y1-y2);}
  function getLaunchSimOK(levelIndex){
    const lev=makeLevel(levelIndex);
    let x=lev.launch.x,y=lev.launch.y;
    let vx=110*POWER,vy=-85*POWER,age=0;
    let moved=false,crashed=false,out=false;
    for(let step=0;step<180;step++){
      const dt=.016;
      age+=dt;
      const a=accelAt(x,y,lev);
      vx+=a.ax*dt; vy+=a.ay*dt;
      const sp=Math.max(1,Math.hypot(vx,vy));
      const sign=levelIndex===3?-1:1;
      const moon=lev.moon;
      const dm=d(x,y,moon.x,moon.y);
      const moonBoost=Math.max(0,520-dm)/520;
      const ramp=Math.min(1,age/.65);
      let force=(ARC_FORCE*(.65+moonBoost*1.25))*ramp;
      vx += (-vy/sp)*force*sign*dt;
      vy += ( vx/sp)*force*sign*dt;
      vx*=.9985; vy*=.9985;
      let sp2=Math.hypot(vx,vy);
      if(sp2>MAX_SPEED){vx=vx/sp2*MAX_SPEED;vy=vy/sp2*MAX_SPEED;sp2=MAX_SPEED;}
      if(age>.22&&sp2<MIN_SPEED&&sp2>0){vx=vx/sp2*MIN_SPEED;vy=vy/sp2*MIN_SPEED;}
      x+=vx*dt; y+=vy*dt;
      if(d(x,y,lev.launch.x,lev.launch.y)>55)moved=true;
      if(age>.55&&d(x,y,lev.launch.x,lev.launch.y)>90&&d(x,y,lev.earth.x,lev.earth.y)<lev.earth.r+8)crashed=true;
      if(x<-450||x>W+450||y<-450||y>H+450)out=true;
      if(crashed||out)break;
    }
    return {moved,crashed,out};
  }

  try{
    check(Array.isArray(LEVELS),'LEVELS array exists');
    check(LEVELS.length===9,'9 levels installed','found '+LEVELS.length);
    check(typeof enterLevel==='function','enterLevel function exists');
    check(typeof launch==='function','launch function exists');
    check(typeof updateMovingDebris==='function','moving debris system exists');
    check(typeof manualDockLevel==='function','manual dock rule exists');

    for(let i=0;i<LEVELS.length;i++){
      const lev=makeLevel(i);
      const label='Level '+String(i+1).padStart(2,'0');
      check(!!lev.launch&&Number.isFinite(lev.launch.x)&&Number.isFinite(lev.launch.y),label+' launcher exists');
      check(!!lev.earth&&lev.earth.r>0,label+' Earth exists');
      check(!!lev.moon&&lev.moon.r>0,label+' Moon exists');
      check(!!lev.dock&&lev.dock.r>0,label+' UNI dock exists');
      check(Array.isArray(lev.debris)&&lev.debris.length>0,label+' debris exists','count '+lev.debris.length);
      let hidden=0;
      for(const deb of lev.debris){
        let samples=[];
        if(deb.orbit){
          const c=deb.orbit.center==='moon'?lev.moon:lev.earth;
          for(let s=0;s<16;s++){
            const ang=deb.orbit.angle+deb.orbit.speed*s*.5;
            samples.push({x:c.x+Math.cos(ang)*deb.orbit.radius,y:c.y+Math.sin(ang)*deb.orbit.radius});
          }
        }else samples.push({x:deb.x,y:deb.y});
        for(const p of samples){
          if(d(p.x,p.y,lev.moon.x,lev.moon.y)<lev.moon.r+35)hidden++;
        }
      }
      check(hidden===0,label+' no debris hidden inside Moon zone',hidden?'hidden '+hidden:'clear');

      const sim=getLaunchSimOK(i);
      check(sim.moved,label+' launch simulation moves away from Earth');
      check(!sim.crashed,label+' launch simulation no instant Earth crash');
      check(!sim.out,label+' launch simulation stays in play window first seconds');

      if(i>=3){
        check(!!lev.dockOrbit,label+' Level 4+ orbiting dock exists');
        check(manualDockLevel.call({})=== (state.level>=3),'manualDockLevel callable');
      }
    }

    const l7=makeLevel(6);
    check(l7.debris.some(x=>x.orbit),'Level 07 moving debris exists');
    const l8=makeLevel(7);
    check(l8.debris.some(x=>x.reactor),'Level 08 reactor debris exists');
    const l9=makeLevel(8);
    check(l9.earth.g>180000&&l9.moon.g>160000,'Level 09 stronger gravity exists');

    // Test actual game entry for every level, then restore saved level
    const restore=state.level;
    for(let i=0;i<LEVELS.length;i++){
      enterLevel(i);
      check(state.level===i,'enterLevel '+String(i+1).padStart(2,'0')+' works');
      check(state.mode==='aim','Level '+String(i+1).padStart(2,'0')+' starts in aim mode');
      check(state.ship.x===state.currentLevel.launch.x&&state.ship.y===state.currentLevel.launch.y,'Level '+String(i+1).padStart(2,'0')+' ship starts at launcher');
    }
    enterLevel(restore);

    // Try one real internal launch without user drag, then reset.
    state.pointer={x:state.launchOrigin.x-125,y:state.launchOrigin.y+95};
    const beforeX=state.ship.x,beforeY=state.ship.y;
    launch();
    check(state.mode==='fly','internal launch enters fly mode');
    for(let t=0;t<45;t++)update(.016);
    check(d(state.ship.x,state.ship.y,beforeX,beforeY)>25,'internal launched ship visibly moves');
    resetLevel();

  }catch(e){
    fail('SELF TEST EXCEPTION',e.message||String(e));
  }

  const status=document.getElementById('selftestStatus');
  const log=document.getElementById('selftestLog');
  if(status&&log){
    if(errors.length){
      status.className='fail';
      status.textContent='FAIL — '+errors.length+' issue(s)';
    }else{
      status.className='pass';
      status.textContent='PASS — game structure and launch simulation OK';
    }
    log.textContent=lines.join('\n');
  }
  window.EVIE_SELF_TEST={ok:errors.length===0,errors,lines};
  return window.EVIE_SELF_TEST;
}

let last=performance.now(); function loop(now){const dt=(now-last)/1000;last=now;update(dt);render();requestAnimationFrame(loop);} requestAnimationFrame(loop);
})();
